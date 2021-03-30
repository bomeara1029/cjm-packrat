/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import * as JOB from '../../interface';
import { JobPackrat } from './JobPackrat';
import * as COOK from '../Cook';
import * as LOG from '../../../utils/logger';
import * as CACHE from '../../../cache';
import * as DBAPI from '../../../db';

import * as NS from 'node-schedule';

class JobData {
    job: JobPackrat;
    dbJob: DBAPI.Job;
    dbJobRun: DBAPI.JobRun;

    constructor(job: JobPackrat, dbJob: DBAPI.Job, dbJobRun: DBAPI.JobRun) {
        this.job = job;
        this.dbJob = dbJob;
        this.dbJobRun = dbJobRun;
    }
}

export class JobEngine implements JOB.IJobEngine {
    private jobMap: Map<number, JobData> = new Map<number, JobData>();  // map from JobRun.idJobRun to JobData

    // #region IJobEngine interface
    async create(jobParams: JOB.JobCreationParameters): Promise<JOB.IJob | null> {
        const idJob: number | null = jobParams.idJob;
        let eJobType: CACHE.eVocabularyID | null = jobParams.eJobType;
        let dbJob: DBAPI.Job | null = null;
        const idAssetVersions: number[] | null = jobParams.idAssetVersions;
        const parameters: any = jobParams.parameters;
        const frequency: string | null = jobParams.frequency;

        if (idJob) {
            // look up job type
            dbJob = await DBAPI.Job.fetch(idJob);
            if (!dbJob) {
                LOG.logger.error(`JobEngine.create unable to fetch Job with ID ${idJob}`);
                return null;
            }
            const eJobType2: CACHE.eVocabularyID | undefined = await CACHE.VocabularyCache.vocabularyIdToEnum(dbJob.idVJobType);
            if (!eJobType2) {
                LOG.logger.error(`JobEngine.createByID unable to fetch Job type from ${JSON.stringify(dbJob)}`);
                return null;
            }

            if (eJobType === null)
                eJobType = eJobType2;
            else if (eJobType != eJobType2) {
                LOG.logger.error(`JobEngine.create called with contradictory idJob (job type ${CACHE.eVocabularyID[eJobType2]}) vs. job type ${CACHE.eVocabularyID[eJobType]}`);
                return null;
            }
        } else {
            if (!eJobType) {
                LOG.logger.error('JobEngine.create called with null values for idJob and eJobType');
                return null;
            }

            dbJob = await this.createJobDBRecord(eJobType, frequency);
            if (!dbJob)
                return null;
        }

        const dbJobRun: DBAPI.JobRun | null = await this.createJobRunDBRecord(dbJob, null, parameters);
        if (!dbJobRun) {
            LOG.logger.error('JobEngine.createWorker unable to create JobRun');
            return null;
        }

        const job: JobPackrat | null = await this.createJob(eJobType, idAssetVersions, parameters, frequency, dbJobRun);
        if (!job) {
            LOG.logger.error('JobEngine.createWorker unable to create Job');
            return null;
        }

        const configuration: string = JSON.stringify(job.configuration());
        if (configuration) {
            dbJobRun.Configuration = configuration;
            await dbJobRun.update();
        }

        this.jobMap.set(dbJobRun.idJobRun, new JobData(job, dbJob, dbJobRun));
        return job;
    }
    // #endregion

    // #region DB Record Maintenance
    private async createJobDBRecord(eJobType: CACHE.eVocabularyID, frequency: string | null): Promise<DBAPI.Job | null> {
        const idVJobType: number | undefined = await CACHE.VocabularyCache.vocabularyEnumToId(eJobType);
        if (!idVJobType) {
            LOG.logger.error(`JobEngine.createDBJob unable to fetch Job type from ${CACHE.eVocabularyID[eJobType]}`);
            return null;
        }

        // search existing jobs for a frequency match; use this if found
        const dbJobs: DBAPI.Job[] | null = await DBAPI.Job.fetchByType(idVJobType);
        let dbJob: DBAPI.Job | null = null;
        let Name: string = '';
        if (dbJobs && dbJobs.length > 0) {
            for (const dbJobWalker of dbJobs) {
                if (dbJobWalker.Frequency === frequency) {
                    dbJob = dbJobWalker;
                    break;
                }
                Name = dbJobWalker.Name;
            }
        }

        if (!dbJob) {
            dbJob = new DBAPI.Job({ idJob: 0, idVJobType, Name, Status: DBAPI.eJobStatus.eActive, Frequency: frequency || '' });
            if (!await dbJob.create()) {
                LOG.logger.error('JobEngine.createJobDBRecord failed');
                return null;
            }
        }

        return dbJob;
    }

    private async createJobRunDBRecord(dbJob: DBAPI.Job, configuration: any, parameters: any): Promise<DBAPI.JobRun | null> {
        const dbJobRun: DBAPI.JobRun = new DBAPI.JobRun({
            idJobRun: 0, idJob: dbJob.idJob, Status: DBAPI.eJobRunStatus.eUnitialized,
            Result: null, DateStart: null, DateEnd: null, Configuration: JSON.stringify(configuration),
            Parameters: JSON.stringify(parameters),
            Output: null, Error: null
        });

        if (!await dbJobRun.create()) {
            LOG.logger.error('JobEngine.createJobRunDBRecord failed');
            return null;
        }
        return dbJobRun;
    }
    // #endregion

    // #region Job Creation Factory
    private async createJob(eJobType: CACHE.eVocabularyID, idAssetVersions: number[] | null,
        parameters: any, frequency: string | null, dbJobRun: DBAPI.JobRun): Promise<JobPackrat | null> {
        // create job
        const job: JobPackrat | null = this.createJobWorker(eJobType, idAssetVersions, parameters, dbJobRun);
        if (!job)
            return null;

        // schedule/launch job
        if (frequency === null) // no frequency means just create the job
            return job;

        if (frequency === '') { // empty frequency means run it once, now
            LOG.logger.info(`JobEngine.createJob running now ${job.name()}`);
            job.executeJob(new Date()); // do not use await here, so that we remain unblocked while the job starts
        } else {                 // non-empty frequency means run job on schedule
            const nsJob: NS.Job = NS.scheduleJob(job.name(), frequency, job.executeJob);
            job.setNSJob(nsJob);
        }
        return job;
    }

    private createJobWorker(eJobType: CACHE.eVocabularyID, idAssetVersions: number[] | null, parameters: any, dbJobRun: DBAPI.JobRun): JobPackrat | null {
        switch (eJobType) {
            case CACHE.eVocabularyID.eJobJobTypeCookSIPackratInspect:
                // confirm that parameters is of type JobCookSIPackratInspectParameters
                if (parameters instanceof COOK.JobCookSIPackratInspectParameters)
                    return new COOK.JobCookSIPackratInspect(idAssetVersions, parameters, dbJobRun);
                else {
                    LOG.logger.error(`JobEngine.createJobWorker called with parameters not of type JobCookSIPackratInspect: ${JSON.stringify(parameters)}`);
                    return null;
                }
            default:
                LOG.logger.error(`JobEngine.createJobWorker unknown job type ${CACHE.eVocabularyID[eJobType]}`);
                return null;
        }
    }
    // #endregion
}
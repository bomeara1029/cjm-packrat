/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { JobPackrat } from  '../NS/JobPackrat';
import * as LOG from '../../../utils/logger';
import * as DBAPI from '../../../db';
import * as STORE from '../../../storage/interface';
import { Config } from '../../../config';
// import * as CACHE from '../../cache';
import * as H from '../../../utils/helpers';

import { v4 as uuidv4 } from 'uuid';
import * as NS from 'node-schedule';
import { createClient, WebDAVClient } from 'webdav';
import { Writable } from 'stream';
import axios from 'axios';

class JobCookConfiguration {
    clientId: string;
    jobName: string;
    recipeId: string;
    jobId: string;

    constructor(clientId: string, jobName: string, recipeId: string, jobId: string | null) {
        this.clientId = clientId;
        this.jobName = jobName;
        this.recipeId = recipeId;
        this.jobId = jobId || uuidv4(); // create a new JobID if we haven't provided one
    }
}

enum eJobCookPriority {
    eLow = 'low',
    eNormal = 'normal',
    eHigh = 'high'
}

class JobCookPostBody<T> {
    id: string;
    name: string;
    clientId: string;
    recipeId: string;
    parameters: T; // object with job parameters
    priority: string; // low, normal, high
    submission: string; // Date in ISO format

    constructor(configuration: JobCookConfiguration, parameters: T, ePriority: eJobCookPriority) {
        this.id = configuration.jobId;
        this.name = configuration.jobName;
        this.clientId = configuration.clientId;
        this.recipeId = configuration.recipeId;
        this.parameters = parameters;
        this.priority = eJobCookPriority[ePriority];
        this.submission = new Date().toISOString();
    }
}

export abstract class JobCook<T> extends JobPackrat {
    private _configuration: JobCookConfiguration;
    private _pollingJob: NS.Job | null = null;
    private _idAssetVersions: number[] | null;

    protected abstract getParameters(): T;

    // null jobId means create a new one
    constructor(clientId: string, jobName: string, recipeId: string, jobId: string | null,
        idAssetVersions: number[] | null, dbJobRun: DBAPI.JobRun) {
        super(dbJobRun);
        this._configuration = new JobCookConfiguration(clientId, jobName, recipeId, jobId);
        this._idAssetVersions = idAssetVersions;
    }

    name(): string {
        return `${this._configuration.jobName}: ${this._dbJobRun.idJobRun}`;
    }

    configuration(): any {
        return this._configuration;
    }

    async startJobWorker(fireDate: Date): Promise<H.IOResults> {
        LOG.logger.info(`JobCook ${this.name()} starting; scheduled for ${fireDate.toISOString()}`);

        // Create job via POST to /job
        const jobCookPostBody: JobCookPostBody<T> = new JobCookPostBody<T>(this._configuration, this.getParameters(), eJobCookPriority.eNormal);
        let requestUrl: string = Config.job.cookServerUrl + 'job';
        try {
            const axiosResponse = await axios.post(requestUrl, jobCookPostBody);
            if (axiosResponse.status !== 201)
                return { success: false, error: `JobCook ${this.name()} post ${requestUrl} failed: ${JSON.stringify(axiosResponse)}` };
        } catch (error) {
            return { success: false, error: `JobCook ${this.name()} post ${requestUrl}: ${JSON.stringify(error)}` };
        }

        // stage files
        const res: H.IOResults = await this.stageFiles();
        if (!res.success)
            return res;

        // Initiate job via PATCH to /clients/<CLIENTID>/jobs/<JOBID>/run
        requestUrl = Config.job.cookServerUrl + `clients/${this._configuration.clientId}/jobs/${this._configuration.jobId}/run`;
        try {
            const axiosResponse = await axios.patch(requestUrl);
            if (axiosResponse.status !== 202)
                return { success: false, error: `JobCook ${this.name()} patch ${requestUrl} failed: ${JSON.stringify(axiosResponse)}` };
        } catch (error) {
            return { success: false, error: `JobCook ${this.name()} patch ${requestUrl} failed: ${JSON.stringify(error)}` };
        }

        // schedule status polling, every 30 seconds:
        const dtNow: Date = new Date();
        const seconds1: number = Math.floor(dtNow.getSeconds());
        const seconds2: number = ((seconds1 + 30) % 60);
        this._pollingJob = NS.scheduleJob(`${this.name()}: status polling`, `${seconds1},${seconds2} * * * * *`, this.pollingCallback);

        LOG.logger.info(`JobCook ${this.name()} running`);
        return { success: true, error: '' };
    }

    async cancelJobWorker(): Promise<H.IOResults> {
        // Cancel job via PATCH to /clients/<CLIENTID>/jobs/<JOBID>/cancel
        LOG.logger.info(`JobCook ${this.name()} cancelling`);
        const requestUrl: string = Config.job.cookServerUrl + `clients/${this._configuration.clientId}/jobs/${this._configuration.jobId}/cancel`;
        try {
            const axiosResponse = await axios.patch(requestUrl);
            if (axiosResponse.status !== 200)
                return { success: false, error: `JobCook ${this.name()} patch ${requestUrl} failed: ${JSON.stringify(axiosResponse)}` };
        } catch (error) {
            return { success: false, error: `JobCook ${this.name()} patch ${requestUrl}: ${JSON.stringify(error)}` };
        }

        this.cancelPollingJob();

        LOG.logger.info(`JobCook ${this.name()} cancelled`);
        return { success: true, error: '' };
    }

    async pollingCallback(fireDate: Date): Promise<void> {
        LOG.logger.info(`JobCook ${this.name()} polling; scheduled for ${fireDate.toISOString()}`);

        // poll server for status update
        // Get job report via GET to /clients/<CLIENTID>/jobs/<JOBID>/report
        const requestUrl: string = Config.job.cookServerUrl + `clients/${this._configuration.clientId}/jobs/${this._configuration.jobId}/report`;
        try {
            const axiosResponse = await axios.patch(requestUrl);
            if (axiosResponse.status !== 200) {
                LOG.logger.error(`JobCook ${this.name()} polling get ${requestUrl} failed: ${JSON.stringify(axiosResponse)}`);
                return;
            }

            // look for completion in "state" member, via value of "done", "error", or "cancelled"; update eJobRunStatus and terminate polling job
            const cookJobReport = axiosResponse.data;
            switch (cookJobReport['state']) {
                case 'created':                                 await this.recordCreated();                                 break;
                case 'waiting':                                 await this.recordWaiting();                                 break;
                case 'running':                                 await this.recordStart();                                   break;
                case 'done':        this.cancelPollingJob();    await this.recordSuccess(JSON.stringify(cookJobReport));    break;
                case 'error':       this.cancelPollingJob();    await this.recordFailure(cookJobReport['error']);           break;
                case 'cancelled':   this.cancelPollingJob();    await this.recordCancel(cookJobReport['error']);            break;
            }
        } catch (error) {
            LOG.logger.error(`JobCook ${this.name()} polling get ${requestUrl} failed: ${JSON.stringify(error)}`);
        }
    }

    cancelPollingJob(): void {
        if (this._pollingJob) {
            NS.cancelJob(this._pollingJob);
            this._pollingJob = null;
        }
    }

    protected async stageFiles(): Promise<H.IOResults> {
        if (!this._idAssetVersions)
            return { success: true, error: '' };

        for (const idAssetVersion of this._idAssetVersions) {
            const RSR: STORE.ReadStreamResult = await STORE.AssetStorageAdapter.readAssetVersionByID(idAssetVersion);
            if (!RSR.success || !RSR.readStream || !RSR.fileName)
                return { success: false, error: `JobCook.stageFiles unable to read asset version ${idAssetVersion}: ${RSR.error}` };

            // transmit file to Cook work folder via WebDAV
            const destination: string = `/${this._configuration.jobId}/${RSR.fileName}`;
            LOG.logger.info(`JobCook.stageFiles staging ${RSR.fileName} on WebDAV host ${Config.job.cookServerUrl} at ${destination}`);
            const webdavClient: WebDAVClient = createClient(Config.job.cookServerUrl);
            const WS: Writable = webdavClient.createWriteStream(destination);
            const res: H.IOResults = await H.Helpers.writeStreamToStream(RSR.readStream, WS);
            if (!res.success)
                return { success: false, error: `JobCook.stageFiles unable to transmit file ${RSR.fileName} for asset version ${idAssetVersion}: ${RSR.error}` };
        }
        return { success: true, error: '' };
    }
}

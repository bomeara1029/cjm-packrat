/* eslint-disable camelcase */
import { Job as JobBase } from '@prisma/client';
import * as DBC from '../connection';
import * as LOG from '../../utils/logger';

export enum eJobStatus {
    eInactive = 0,
    eActive = 1,
    eTest = 2,
}

export class Job extends DBC.DBObject<JobBase> implements JobBase {
    idJob!: number;
    idVJobType!: number;
    Name!: string;
    Status!: number;
    Frequency!: string | null;

    constructor(input: JobBase) {
        super(input);
    }

    static convertJobStatusToEnum(Status: number): eJobStatus {
        switch (Status) {
            default:    return eJobStatus.eInactive;
            case 0:     return eJobStatus.eInactive;
            case 1:     return eJobStatus.eActive;
            case 2:     return eJobStatus.eTest;
        }
    }

    getStatus(): eJobStatus { return Job.convertJobStatusToEnum(this.Status); }
    setStatus(eStatus: eJobStatus): void { this.Status = eStatus; }

    protected updateCachedValues(): void { }

    protected async createWorker(): Promise<boolean> {
        try {
            const { idVJobType, Name, Status, Frequency } = this;
            ({ idJob: this.idJob, idVJobType: this.idVJobType, Name: this.Name, Status: this.Status, Frequency: this.Frequency } =
                await DBC.DBConnection.prisma.job.create({
                    data: {
                        Vocabulary: { connect: { idVocabulary: idVJobType }, },
                        Name,
                        Status,
                        Frequency
                    }
                }));
            return true;
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Job.create', error);
            return false;
        }
    }

    protected async updateWorker(): Promise<boolean> {
        try {
            const { idJob, idVJobType, Name, Status, Frequency } = this;
            return await DBC.DBConnection.prisma.job.update({
                where: { idJob, },
                data: {
                    Vocabulary: { connect: { idVocabulary: idVJobType }, },
                    Name,
                    Status,
                    Frequency
                }
            }) ? true : /* istanbul ignore next */ false;
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Job.update', error);
            return false;
        }
    }

    static async fetch(idJob: number): Promise<Job | null> {
        if (!idJob)
            return null;
        try {
            return DBC.CopyObject<JobBase, Job>(
                await DBC.DBConnection.prisma.job.findUnique({ where: { idJob, }, }), Job);
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Job.fetch', error);
            return null;
        }
    }

    static async fetchByType(idVJobType: number): Promise<Job[] | null> {
        if (!idVJobType)
            return null;
        try {
            return DBC.CopyArray<JobBase, Job>(
                await DBC.DBConnection.prisma.job.findMany({ where: { idVJobType, }, }), Job);
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Job.fetchByType', error);
            return null;
        }
    }
}

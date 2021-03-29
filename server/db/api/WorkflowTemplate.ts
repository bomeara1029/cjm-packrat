/* eslint-disable camelcase */
import { WorkflowTemplate as WorkflowTemplateBase } from '@prisma/client';
import * as DBC from '../connection';
import * as LOG from '../../utils/logger';

export class WorkflowTemplate extends DBC.DBObject<WorkflowTemplateBase> implements WorkflowTemplateBase {
    idWorkflowTemplate!: number;
    idVWorkflowType!: number;

    constructor(input: WorkflowTemplateBase) {
        super(input);
    }

    protected updateCachedValues(): void { }

    protected async createWorker(): Promise<boolean> {
        try {
            const { idVWorkflowType } = this;
            ({ idWorkflowTemplate: this.idWorkflowTemplate, idVWorkflowType: this.idVWorkflowType } =
                await DBC.DBConnection.prisma.workflowTemplate.create({
                    data: { Vocabulary: { connect: { idVocabulary: idVWorkflowType }, }, }
                }));
            return true;
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.WorkflowTemplate.create', error);
            return false;
        }
    }

    protected async updateWorker(): Promise<boolean> {
        try {
            const { idWorkflowTemplate, idVWorkflowType } = this;
            return await DBC.DBConnection.prisma.workflowTemplate.update({
                where: { idWorkflowTemplate, },
                data: { Vocabulary: { connect: { idVocabulary: idVWorkflowType }, }, },
            }) ? true : /* istanbul ignore next */ false;
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.WorkflowTemplate.update', error);
            return false;
        }
    }

    static async fetch(idWorkflowTemplate: number): Promise<WorkflowTemplate | null> {
        if (!idWorkflowTemplate)
            return null;
        try {
            return DBC.CopyObject<WorkflowTemplateBase, WorkflowTemplate>(
                await DBC.DBConnection.prisma.workflowTemplate.findUnique({ where: { idWorkflowTemplate, }, }), WorkflowTemplate);
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.WorkflowTemplate.fetch', error);
            return null;
        }
    }
}
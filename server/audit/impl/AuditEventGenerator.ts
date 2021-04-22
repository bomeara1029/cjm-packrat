/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import * as EVENT from '../../event/interface';

import { eDBObjectType, ObjectIDAndType, DBObjectTypeToName, eAuditType } from '../../db/api/ObjectType';
import * as LOG from '../../utils/logger';
import * as H from '../../utils/helpers';
import { ASL, LocalStore } from '../../utils/localStore';
import { Audit } from '@prisma/client';

//** Audit.idSystemObject is not populated here, to avoid using CACHE.SystemObjectCache */
export class AuditEventGenerator {
    static setEventEngine(eventEngine: EVENT.IEventEngine): void {
        LOG.info('AuditEventGenerator.setEventEngine called', LOG.LS.eAUDIT);
        AuditEventGenerator.eventEngine = eventEngine;
    }
    private static eventEngine: EVENT.IEventEngine | null = null;   // don't import EventFactory to avoid circular dependencies
    private eventProducer: EVENT.IEventProducer | null = null;
    private constructor() { }

    public static singleton: AuditEventGenerator = new AuditEventGenerator();

    public async auditDBObject(dbObject: any, oID: ObjectIDAndType, key: EVENT.eEventKey): Promise<boolean> {
        LOG.info(`AuditEventGenerator.auditDBObject {${DBObjectTypeToName(oID.eObjectType)}, id: ${oID.idObject}}: ${EVENT.eEventKey[key]}`, LOG.LS.eAUDIT);
        if (!this.eventProducer) {
            if (AuditEventGenerator.eventEngine)
                this.eventProducer = await AuditEventGenerator.eventEngine.createProducer();
            else
                return true; // LOG.error(`AuditEventGenerator.auditDBObject unable to fetch event engine instance: ${JSON.stringify(oID)}-${EVENT.eEventKey[key]}\n${JSON.stringify(dbObject, H.Helpers.stringifyMapsAndBigints)}`, LOG.LS.eEVENT);
        }

        if (this.eventProducer) {
            const eventDate: Date = new Date();
            const LS: LocalStore | undefined = ASL.getStore();
            const idUser: number | null = LS?.idUser || null;

            const DBObjectType: eDBObjectType = oID.eObjectType;
            const idDBObject: number = oID.idObject;

            let AuditType: eAuditType = eAuditType.eDBUpdate;
            switch (key) {
                case EVENT.eEventKey.eDBCreate: AuditType = eAuditType.eDBCreate; break;
                case EVENT.eEventKey.eDBUpdate: AuditType = eAuditType.eDBUpdate; break;
                case EVENT.eEventKey.eDBDelete: AuditType = eAuditType.eDBDelete; break;
            }

            const value: Audit = {
                idUser,
                AuditDate: eventDate,
                AuditType,
                DBObjectType,
                idDBObject,
                idSystemObject: null, // avoid computing with (await CACHE.SystemObjectCache.getSystemFromObjectID(oID))?.idSystemObject ?? null,
                Data: JSON.stringify(dbObject, H.Helpers.stringifyDatabaseRow),
                idAudit: 0
            };

            const data: EVENT.IEventData<EVENT.eEventKey, Audit> = {
                eventDate,
                key,
                value,
            };
            this.eventProducer.send(EVENT.eEventTopic.eDB, [data]);
            return true;
        } else {
            LOG.error('AuditEventGenerator.auditDBObject unable to fetch event producer', LOG.LS.eEVENT);
            return false;
        }

    }
}
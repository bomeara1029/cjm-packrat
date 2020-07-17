/* eslint-disable camelcase */
import { Subject as SubjectBase, SystemObject as SystemObjectBase } from '@prisma/client';
import { DBConnectionFactory, SystemObject } from '..';
import * as DBO from '../api/DBObject';
import * as LOG from '../../utils/logger';

export class Subject extends DBO.DBObject<SubjectBase> implements SubjectBase {
    idSubject!: number;
    idAssetThumbnail!: number | null;
    idGeoLocation!: number | null;
    idUnit!: number;
    Name!: string;

    private idAssetThumbnailOrig!: number | null;
    private idGeoLocationOrig!: number | null;

    constructor(input: SubjectBase) {
        super(input);
        this.updateCachedValues();
    }

    private updateCachedValues(): void {
        this.idAssetThumbnailOrig = this.idAssetThumbnail;
        this.idGeoLocationOrig = this.idGeoLocation;
    }

    async create(): Promise<boolean> {
        try {
            const { idUnit, idAssetThumbnail, idGeoLocation, Name } = this;
            ({ idSubject: this.idSubject, idUnit: this.idUnit, idAssetThumbnail: this.idAssetThumbnail,
                idGeoLocation: this.idGeoLocation, Name: this.Name } =
                await DBConnectionFactory.prisma.subject.create({
                    data: {
                        Unit:           { connect: { idUnit }, },
                        Asset:          idAssetThumbnail ? { connect: { idAsset: idAssetThumbnail }, } : undefined,
                        GeoLocation:    idGeoLocation ? { connect: { idGeoLocation }, } : undefined,
                        Name,
                        SystemObject:   { create: { Retired: false }, },
                    },
                }));
            this.updateCachedValues();
            return true;
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Subject.create', error);
            return false;
        }
    }

    async update(): Promise<boolean> {
        try {
            const { idSubject, idUnit, idAssetThumbnail, idGeoLocation, Name, idAssetThumbnailOrig, idGeoLocationOrig } = this;
            const retValue: boolean = await DBConnectionFactory.prisma.subject.update({
                where: { idSubject, },
                data: {
                    Unit:           { connect: { idUnit }, },
                    Asset:          idAssetThumbnail ? { connect: { idAsset: idAssetThumbnail }, } : idAssetThumbnailOrig ? { disconnect: true, } : undefined,
                    GeoLocation:    idGeoLocation ? { connect: { idGeoLocation }, } : idGeoLocationOrig ? { disconnect: true, } : undefined,
                    Name,
                },
            }) ? true : /* istanbul ignore next */ false;
            this.updateCachedValues();
            return retValue;
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Subject.update', error);
            return false;
        }
    }

    async fetchSystemObject(): Promise<SystemObject | null> {
        try {
            const { idSubject } = this;
            return DBO.CopyObject<SystemObjectBase, SystemObject>(
                await DBConnectionFactory.prisma.systemObject.findOne({ where: { idSubject, }, }), SystemObject);
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.subject.fetchSystemObject', error);
            return null;
        }
    }

    static async fetch(idSubject: number): Promise<Subject | null> {
        if (!idSubject)
            return null;
        try {
            return DBO.CopyObject<SubjectBase, Subject>(
                await DBConnectionFactory.prisma.subject.findOne({ where: { idSubject, }, }), Subject);
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Subject.fetch', error);
            return null;
        }
    }

    static async fetchFromUnit(idUnit: number): Promise<Subject[] | null> {
        if (!idUnit)
            return null;
        try {
            return DBO.CopyArray<SubjectBase, Subject>(
                await DBConnectionFactory.prisma.subject.findMany({ where: { idUnit } }), Subject);
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Subject.fetchFromUnit', error);
            return null;
        }
    }
}

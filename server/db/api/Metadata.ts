/* eslint-disable camelcase */
import { Metadata as MetadataBase } from '@prisma/client';
import * as DBC from '../connection';
import * as LOG from '../../utils/logger';

export class Metadata extends DBC.DBObject<MetadataBase> implements MetadataBase {
    idMetadata!: number;
    idAssetValue!: number | null;
    idSystemObject!: number | null;
    idUser!: number | null;
    idVMetadataSource!: number | null;
    Name!: string;
    ValueExtended!: string | null;
    ValueShort!: string | null;

    private idAssetValueOrig!: number | null;
    private idSystemObjectOrig!: number | null;
    private idUserOrig!: number | null;
    private idVMetadataSourceOrig!: number | null;

    constructor(input: MetadataBase) {
        super(input);
    }

    protected updateCachedValues(): void {
        this.idAssetValueOrig = this.idAssetValue;
        this.idSystemObjectOrig = this.idSystemObject;
        this.idUserOrig = this.idUser;
        this.idVMetadataSourceOrig = this.idVMetadataSource;
    }

    protected async createWorker(): Promise<boolean> {
        try {
            const { Name, ValueShort, ValueExtended, idAssetValue, idUser, idVMetadataSource, idSystemObject } = this;
            ({ idMetadata: this.idMetadata, Name: this.Name, ValueShort: this.ValueShort,
                ValueExtended: this.ValueExtended, idAssetValue: this.idAssetValue, idUser: this.idUser,
                idVMetadataSource: this.idVMetadataSource, idSystemObject: this.idSystemObject } =
                await DBC.DBConnection.prisma.metadata.create({
                    data: {
                        Name,
                        ValueShort:     ValueShort          ? ValueShort : undefined,
                        ValueExtended:  ValueExtended       ? ValueExtended : undefined,
                        Asset:          idAssetValue        ? { connect: { idAsset: idAssetValue }, } : undefined,
                        User:           idUser              ? { connect: { idUser }, } : undefined,
                        Vocabulary:     idVMetadataSource   ? { connect: { idVocabulary: idVMetadataSource }, } : undefined,
                        SystemObject:   idSystemObject      ? { connect: { idSystemObject }, } : undefined,
                    },
                }));
            return true;
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Metadata.create', error);
            return false;
        }
    }

    protected async updateWorker(): Promise<boolean> {
        try {
            const { idMetadata, Name, ValueShort, ValueExtended, idAssetValue, idUser, idVMetadataSource, idSystemObject,
                idAssetValueOrig, idUserOrig, idVMetadataSourceOrig, idSystemObjectOrig } = this;
            const retValue: boolean = await DBC.DBConnection.prisma.metadata.update({
                where: { idMetadata, },
                data: {
                    Name,
                    ValueShort:     ValueShort          ? ValueShort : undefined,
                    ValueExtended:  ValueExtended       ? ValueExtended : undefined,
                    Asset:          idAssetValue        ? { connect: { idAsset: idAssetValue }, } : idAssetValueOrig ? { disconnect: true, } : undefined,
                    User:           idUser              ? { connect: { idUser }, } : idUserOrig ? { disconnect: true, } : undefined,
                    Vocabulary:     idVMetadataSource   ? { connect: { idVocabulary: idVMetadataSource }, } : idVMetadataSourceOrig ? { disconnect: true, } : undefined,
                    SystemObject:   idSystemObject      ? { connect: { idSystemObject }, } : idSystemObjectOrig ? { disconnect: true, } : undefined,
                },
            }) ? true : /* istanbul ignore next */ false;
            return retValue;
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Metadata.update', error);
            return false;
        }
    }

    static async fetch(idMetadata: number): Promise<Metadata | null> {
        if (!idMetadata)
            return null;
        try {
            return DBC.CopyObject<MetadataBase, Metadata>(
                await DBC.DBConnection.prisma.metadata.findOne({ where: { idMetadata, }, }), Metadata);
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Metadata.fetch', error);
            return null;
        }
    }

    static async fetchFromUser(idUser: number): Promise<Metadata[] | null> {
        if (!idUser)
            return null;
        try {
            return DBC.CopyArray<MetadataBase, Metadata>(
                await DBC.DBConnection.prisma.metadata.findMany({ where: { idUser } }), Metadata);
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Metadata.fetchFromUser', error);
            return null;
        }
    }

    static async fetchFromSystemObject(idSystemObject: number): Promise<Metadata[] | null> {
        if (!idSystemObject)
            return null;
        try {
            return DBC.CopyArray<MetadataBase, Metadata>(
                await DBC.DBConnection.prisma.metadata.findMany({ where: { idSystemObject } }), Metadata);
        } catch (error) /* istanbul ignore next */ {
            LOG.logger.error('DBAPI.Metadata.fetchFromSystemObject', error);
            return null;
        }
    }
}
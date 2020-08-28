import * as DBAPI from '../../../db';
import * as CACHE from '../../../cache';
import * as UTIL from '../api';
//import * as LOG from '../../../utils/logger';

export class ObjectHierarchyTestSetup {
    user1: DBAPI.User | null = null;
    unit1: DBAPI.Unit | null = null;
    unit2: DBAPI.Unit | null = null;
    project1: DBAPI.Project | null = null;
    project2: DBAPI.Project | null = null;
    subject1: DBAPI.Subject | null = null;
    subject2: DBAPI.Subject | null = null;
    subject3: DBAPI.Subject | null = null;
    subject4: DBAPI.Subject | null = null;
    item1: DBAPI.Item | null = null;
    item2: DBAPI.Item | null = null;
    item3: DBAPI.Item | null = null;
    item4: DBAPI.Item | null = null;
    captureData1: DBAPI.CaptureData | null = null;
    captureData2: DBAPI.CaptureData | null = null;
    model1: DBAPI.Model | null = null;
    model2: DBAPI.Model | null = null;
    model3: DBAPI.Model | null = null;
    model4: DBAPI.Model | null = null;
    scene1: DBAPI.Scene | null = null;
    projectDocumentation1: DBAPI.ProjectDocumentation | null = null;
    intermediaryFile1: DBAPI.IntermediaryFile | null = null;
    actor1: DBAPI.Actor | null = null;
    actor2: DBAPI.Actor | null = null;
    stakeholder1: DBAPI.Stakeholder | null = null;
    stakeholder2: DBAPI.Stakeholder | null = null;
    asset1: DBAPI.Asset | null = null;
    asset2: DBAPI.Asset | null = null;
    asset3: DBAPI.Asset | null = null;
    asset4: DBAPI.Asset | null = null;
    asset5: DBAPI.Asset | null = null;
    asset6: DBAPI.Asset | null = null;
    asset7: DBAPI.Asset | null = null;
    asset8: DBAPI.Asset | null = null;
    asset9: DBAPI.Asset | null = null;
    asset10: DBAPI.Asset | null = null;
    assetVersion1: DBAPI.AssetVersion | null = null;
    assetVersion2: DBAPI.AssetVersion | null = null;
    assetVersion3a: DBAPI.AssetVersion | null = null;
    assetVersion3b: DBAPI.AssetVersion | null = null;
    assetVersion3c: DBAPI.AssetVersion | null = null;
    assetVersion4: DBAPI.AssetVersion | null = null;
    assetVersion5: DBAPI.AssetVersion | null = null;
    assetVersion6: DBAPI.AssetVersion | null = null;
    assetVersion7: DBAPI.AssetVersion | null = null;
    assetVersion8: DBAPI.AssetVersion | null = null;
    assetVersion9: DBAPI.AssetVersion | null = null;
    assetVersion10: DBAPI.AssetVersion | null = null;
    v1: DBAPI.Vocabulary | undefined;

    async initialize(): Promise<void> {
        let assigned: boolean = true;
        this.v1 = await CACHE.VocabularyCache.vocabularyByEnum(CACHE.eVocabularyID.eIdentifierIdentifierTypeARK);
        expect(this.v1).toBeTruthy();
        if (!this.v1)
            return;

        this.user1 = await UTIL.createUserTest({ Name: 'OA Test', EmailAddress: 'oatest@si.edu', SecurityID: 'OA Test', Active: true, DateActivated: UTIL.nowCleansed(), DateDisabled: null, WorkflowNotificationTime: UTIL.nowCleansed(), EmailSettings: 0, idUser: 0 });

        this.unit1 = await UTIL.createUnitTest({ Name: 'DPO', Abbreviation: 'DPO', ARKPrefix: 'http://dpo/', idUnit: 0 });
        this.unit2 = await UTIL.createUnitTest({ Name: 'NMNH', Abbreviation: 'NMNH', ARKPrefix: 'http://nmnh/', idUnit: 0 });
        this.project1 = await UTIL.createProjectTest({ Name: 'OA Test', Description: 'OA Test', idProject: 0 });
        this.project2 = await UTIL.createProjectTest({ Name: 'OA Test', Description: 'OA Test', idProject: 0 });

        this.asset1 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion1 = await UTIL.createAssetVersionTest({ idAsset: this.asset1.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.subject1 = await UTIL.createSubjectTest({ idUnit: this.unit1.idUnit, idAssetThumbnail: this.asset1.idAsset, idGeoLocation: null, Name: 'OA Test', idIdentifierPreferred: null, idSubject: 0 });
        assigned = await this.asset1.assignOwner(this.subject1); expect(assigned).toBeTruthy();
        this.subject2 = await UTIL.createSubjectTest({ idUnit: this.unit1.idUnit, idAssetThumbnail: null, idGeoLocation: null, Name: 'OA Test', idIdentifierPreferred: null, idSubject: 0 });
        this.subject3 = await UTIL.createSubjectTest({ idUnit: this.unit2.idUnit, idAssetThumbnail: null, idGeoLocation: null, Name: 'OA Test', idIdentifierPreferred: null, idSubject: 0 });
        this.subject4 = await UTIL.createSubjectTest({ idUnit: this.unit2.idUnit, idAssetThumbnail: null, idGeoLocation: null, Name: 'OA Test', idIdentifierPreferred: null, idSubject: 0 });

        this.asset2 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion2 = await UTIL.createAssetVersionTest({ idAsset: this.asset2.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.item1 = await UTIL.createItemTest({ idAssetThumbnail: this.asset2.idAsset, idGeoLocation: null, Name: 'OA Test', EntireSubject: true, idItem: 0 });
        assigned = await this.asset2.assignOwner(this.item1); expect(assigned).toBeTruthy();
        this.item2 = await UTIL.createItemTest({ idAssetThumbnail: null, idGeoLocation: null, Name: 'OA Test', EntireSubject: true, idItem: 0 });
        this.item3 = await UTIL.createItemTest({ idAssetThumbnail: null, idGeoLocation: null, Name: 'OA Test', EntireSubject: true, idItem: 0 });
        this.item4 = await UTIL.createItemTest({ idAssetThumbnail: null, idGeoLocation: null, Name: 'OA Test', EntireSubject: true, idItem: 0 });

        this.asset3 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion3a = await UTIL.createAssetVersionTest({ idAsset: this.asset3.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.assetVersion3b = await UTIL.createAssetVersionTest({ idAsset: this.asset3.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.assetVersion3c = await UTIL.createAssetVersionTest({ idAsset: this.asset3.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.captureData1 = await UTIL.createCaptureDataTest({ idVCaptureMethod: this.v1.idVocabulary, DateCaptured: UTIL.nowCleansed(), Description: 'OA Test', idAssetThumbnail: null, idCaptureData: 0 });
        assigned = await this.asset3.assignOwner(this.captureData1); expect(assigned).toBeTruthy();

        this.captureData2 = await UTIL.createCaptureDataTest({ idVCaptureMethod: this.v1.idVocabulary, DateCaptured: UTIL.nowCleansed(), Description: 'OA Test', idAssetThumbnail: null, idCaptureData: 0 });

        this.asset4 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion4 = await UTIL.createAssetVersionTest({ idAsset: this.asset4.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.model1 = await UTIL.createModelTest({ DateCreated: UTIL.nowCleansed(), idVCreationMethod: this.v1.idVocabulary, Master: true, Authoritative: true, idVModality: this.v1.idVocabulary,  idVUnits: this.v1.idVocabulary, idVPurpose: this.v1.idVocabulary, idAssetThumbnail: null, idModel: 0 });
        assigned = await this.asset4.assignOwner(this.model1); expect(assigned).toBeTruthy();

        this.asset5 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion5 = await UTIL.createAssetVersionTest({ idAsset: this.asset5.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.model2 = await UTIL.createModelTest({ DateCreated: UTIL.nowCleansed(), idVCreationMethod: this.v1.idVocabulary, Master: true, Authoritative: true, idVModality: this.v1.idVocabulary,  idVUnits: this.v1.idVocabulary, idVPurpose: this.v1.idVocabulary, idAssetThumbnail: null, idModel: 0 });
        assigned = await this.asset5.assignOwner(this.model2); expect(assigned).toBeTruthy();

        this.asset6 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion6 = await UTIL.createAssetVersionTest({ idAsset: this.asset6.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.model3 = await UTIL.createModelTest({ DateCreated: UTIL.nowCleansed(), idVCreationMethod: this.v1.idVocabulary, Master: true, Authoritative: true, idVModality: this.v1.idVocabulary,  idVUnits: this.v1.idVocabulary, idVPurpose: this.v1.idVocabulary, idAssetThumbnail: null, idModel: 0 });
        assigned = await this.asset6.assignOwner(this.model3); expect(assigned).toBeTruthy();

        this.asset7 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion7 = await UTIL.createAssetVersionTest({ idAsset: this.asset7.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.model4 = await UTIL.createModelTest({ DateCreated: UTIL.nowCleansed(), idVCreationMethod: this.v1.idVocabulary, Master: true, Authoritative: true, idVModality: this.v1.idVocabulary,  idVUnits: this.v1.idVocabulary, idVPurpose: this.v1.idVocabulary, idAssetThumbnail: null, idModel: 0 });
        assigned = await this.asset7.assignOwner(this.model4); expect(assigned).toBeTruthy();

        this.asset8 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion8 = await UTIL.createAssetVersionTest({ idAsset: this.asset8.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.scene1 = await UTIL.createSceneTest({ Name: 'OA Test', idAssetThumbnail: null, IsOriented: true, HasBeenQCd: true, idScene: 0 });
        assigned = await this.asset8.assignOwner(this.scene1); expect(assigned).toBeTruthy();

        this.asset9 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion9 = await UTIL.createAssetVersionTest({ idAsset: this.asset9.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.projectDocumentation1 = await UTIL.createProjectDocumentationTest({ idProject: this.project1.idProject, Name: 'OA Test', Description: 'OA Test', idProjectDocumentation: 0 });
        assigned = await this.asset9.assignOwner(this.projectDocumentation1); expect(assigned).toBeTruthy();

        this.asset10 = await UTIL.createAssetTest({ FileName: 'OA Test', FilePath: '/OA Test', idAssetGroup: null, idVAssetType: this.v1.idVocabulary, idSystemObject: null, StorageKey: UTIL.randomStorageKey('/'), idAsset: 0 });
        this.assetVersion10 = await UTIL.createAssetVersionTest({ idAsset: this.asset10.idAsset, idUserCreator: this.user1.idUser, DateCreated: UTIL.nowCleansed(), StorageHash: 'OA Test', StorageSize: 500, idAssetVersion: 0, Ingested: true, FileName: '', StorageKeyStaging: '', Version: 0 });
        this.intermediaryFile1 = await UTIL.createIntermediaryFileTest({ idAsset: this.asset10.idAsset, DateCreated: UTIL.nowCleansed(), idIntermediaryFile: 0 });
        assigned = await this.asset10.assignOwner(this.intermediaryFile1); expect(assigned).toBeTruthy();

        this.actor1 = await UTIL.createActorTest({ IndividualName: 'OA Test', OrganizationName: 'OA Test', idUnit: this.unit1.idUnit, idActor: 0 });
        this.actor2 = await UTIL.createActorTest({ IndividualName: 'OA Test', OrganizationName: 'OA Test', idUnit: 0, idActor: 0 });
        this.stakeholder1 = await UTIL.createStakeholderTest({ IndividualName: 'OA Test', OrganizationName: 'OA Test', EmailAddress: 'OA Test', PhoneNumberMobile: 'OA Test', PhoneNumberOffice: 'OA Test', MailingAddress: 'OA Test', idStakeholder: 0 });
        this.stakeholder2 = await UTIL.createStakeholderTest({ IndividualName: 'OA Test', OrganizationName: 'OA Test', EmailAddress: 'OA Test', PhoneNumberMobile: 'OA Test', PhoneNumberOffice: 'OA Test', MailingAddress: 'OA Test', idStakeholder: 0 });
    }

    async wire(): Promise<void> {
        await UTIL.createXref(this.unit1, this.project1);
        await UTIL.createXref(this.unit2, this.project1);
        await UTIL.createXref(this.unit2, this.project2);
        // unit-subject is defined via subject.idUnit
        await UTIL.createXref(this.project1, this.subject2);
        await UTIL.createXref(this.project1, this.subject3);
        await UTIL.createXref(this.project1, this.subject4);
        await UTIL.createXref(this.project2, this.subject4);
        await UTIL.createXref(this.subject1, this.item1);
        await UTIL.createXref(this.subject1, this.item2);
        await UTIL.createXref(this.subject2, this.item3);
        await UTIL.createXref(this.subject2, this.item4);
        await UTIL.createXref(this.subject4, this.item4);
        await UTIL.createXref(this.item1, this.captureData1);
        await UTIL.createXref(this.item1, this.captureData2);
        await UTIL.createXref(this.item1, this.model1);
        await UTIL.createXref(this.item1, this.scene1);
        await UTIL.createXref(this.captureData1, this.model1);
        await UTIL.createXref(this.captureData2, this.model1);
        await UTIL.createXref(this.model1, this.model2);
        await UTIL.createXref(this.model1, this.model3);
        await UTIL.createXref(this.model1, this.model4);
        await UTIL.createXref(this.model1, this.scene1);
        await UTIL.createXref(this.scene1, this.model2);
        await UTIL.createXref(this.scene1, this.model3);
        await UTIL.createXref(this.scene1, this.model4);
        await UTIL.createXref(this.item3, this.intermediaryFile1);

        // XXX-asset relationships defined via Asset.idSystemObject
        // this.asset1; Thumbnail for this.subject1
        // this.asset2; Thumbnail for this.item1
        // await UTIL.createXref(this.captureData1, this.asset3);
        // await UTIL.createXref(this.model1, this.asset4);
        // await UTIL.createXref(this.model2, this.asset5);
        // await UTIL.createXref(this.model3, this.asset6);
        // await UTIL.createXref(this.model4, this.asset7);
        // await UTIL.createXref(this.scene1, this.asset8);

        // unit-actor is defined via actor.idUnit
        await UTIL.createXref(this.captureData1, this.actor1);
        await UTIL.createXref(this.captureData1, this.actor2);
        await UTIL.createXref(this.project1, this.stakeholder1);
        await UTIL.createXref(this.project1, this.stakeholder2);
        await UTIL.createXref(this.unit1, this.stakeholder1);
        await UTIL.createXref(this.unit2, this.stakeholder2);

        // Asset-AssetVersion is defined via AssetVersion.idAsset
    }

    static async testObjectAncestryFetch(SOBased: DBAPI.SystemObjectBased | null,
        expectValidHierarchy: boolean = true, expectNoCycles: boolean = true): Promise<DBAPI.ObjectAncestry | null> {
        const SO: DBAPI.SystemObject | null = SOBased ? await SOBased.fetchSystemObject() : null;
        expect(SO).toBeTruthy();
        if (!SO)
            return null;

        const OA: DBAPI.ObjectAncestry = new DBAPI.ObjectAncestry(SO.idSystemObject);
        const OAFetched: boolean = await OA.fetch();
        expect(OAFetched).toBeTruthy();
        if (!OAFetched)
            return null;
        expect(expectValidHierarchy ? OA.validHierarchy : !OA.validHierarchy).toBeTruthy();
        expect(expectNoCycles ? OA.noCycles : !OA.noCycles).toBeTruthy();
        return OA;
    }
}
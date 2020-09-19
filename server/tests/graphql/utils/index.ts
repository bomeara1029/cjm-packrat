/**
 * TestSuiteUtils
 * This test suite utils helps with setting up jest environment
 * for testing graphql api
 */
import GraphQLApi from '../../../graphql';
import * as DBC from '../../../db/connection';
// import * as H from '../../../utils/helpers';
import {
    CreateUserInput,
    CreateVocabularySetInput,
    CreateVocabularyInput,
    CreateUnitInput,
    CreateSubjectInput,
    CreateItemInput,
    CreateProjectInput,
    CreateSceneInput,
    CreateModelInput,
    CreateCaptureDataInput,
    CreateCaptureDataPhotoInput,
    VocabularyEntry,
    Vocabulary
} from '../../../types/graphql';
import { Asset, AssetVersion } from '@prisma/client';
import { randomStorageKey, nowCleansed } from '../../db/utils';
import { eVocabularySetID } from '../../../cache';

class TestSuiteUtils {
    graphQLApi!: GraphQLApi;

    setupJest = (): void => {
        global.beforeAll(this.beforeAll);
        global.afterAll(this.afterAll);
    };

    private beforeAll = (): void => {
        this.graphQLApi = new GraphQLApi();
    };

    private afterAll = async (done: () => void): Promise<void> => {
        // await H.Helpers.sleep(5000);
        await DBC.DBConnection.disconnect();
        done();
    };

    createUserInput = (): CreateUserInput => {
        return {
            Name: 'Test User',
            EmailAddress: 'test@si.edu',
            SecurityID: 'SECURITY_ID'
        };
    };

    createVocabularyInput = (idVocabularySet: number): CreateVocabularyInput => {
        return {
            idVocabularySet,
            SortOrder: 0,
            Term: 'Test Vocabulary'
        };
    };

    createVocabularySetInput = (): CreateVocabularySetInput => {
        return {
            Name: 'Test Vocabulary Set',
            SystemMaintained: false
        };
    };

    createUnitInput = (): CreateUnitInput => {
        return {
            Name: 'Test Name',
            Abbreviation: 'Test Abbreviation',
            ARKPrefix: 'Test ARKPrefix'
        };
    };

    createSubjectInput = (idUnit: number): CreateSubjectInput => {
        return {
            idUnit,
            Name: 'Test Subject'
        };
    };

    createItemInput = (): CreateItemInput => {
        return {
            Name: 'Test Item',
            EntireSubject: true
        };
    };

    createProjectInput = (): CreateProjectInput => {
        return {
            Name: 'Test Name',
            Description: 'Test Description'
        };
    };

    createSceneInput = (): CreateSceneInput => {
        return {
            Name: 'Test Scene',
            HasBeenQCd: true,
            IsOriented: true
        };
    };

    createModelInput = (idVocabulary: number): CreateModelInput => {
        return {
            Authoritative: true,
            idVCreationMethod: idVocabulary,
            idVModality: idVocabulary,
            idVPurpose: idVocabulary,
            idVUnits: idVocabulary,
            Master: true
        };
    };

    createCaptureDataInput = (idVocabulary: number): CreateCaptureDataInput => {
        return {
            idVCaptureMethod: idVocabulary,
            DateCaptured: new Date(),
            Description: 'Test Description'
        };
    };

    createCaptureDataPhotoInput = (idCaptureData: number, idVocabulary: number): CreateCaptureDataPhotoInput => {
        return {
            idCaptureData,
            idVCaptureDatasetType: idVocabulary,
            CaptureDatasetFieldID: 0,
            ItemPositionFieldID: 0,
            ItemArrangementFieldID: 0,
            idVBackgroundRemovalMethod: idVocabulary,
            ClusterGeometryFieldID: 0,
            CameraSettingsUniform: true,
            idVItemPositionType: idVocabulary,
            idVFocusType: idVocabulary,
            idVLightSourceType: idVocabulary,
            idVClusterType: idVocabulary
        };
    };

    createAssetInput = (idVAssetType: number): Asset => {
        return {
            FileName: 'Test Asset Thumbnail',
            FilePath: '/test/asset/path',
            idSystemObject: null,
            idAssetGroup: null,
            idVAssetType,
            StorageKey: randomStorageKey('/test/asset/path/'),
            idAsset: 0
        };
    };

    createAssetVersionInput = (idAsset: number, idUser: number): AssetVersion => {
        return {
            idAsset,
            FileName: 'Test file',
            idUserCreator: idUser,
            DateCreated: nowCleansed(),
            StorageHash: 'Asset Checksum',
            StorageKeyStaging: '',
            StorageSize: 50,
            idAssetVersion: 0,
            Ingested: false,
            BulkIngest: false,
            Version: 0
        };
    };

    getVocabularyEntryMap = (vocabularyEntries: VocabularyEntry[]): Map<number, Vocabulary[]> => {
        const vocabularyMap = new Map<number, Vocabulary[]>();

        vocabularyEntries.forEach(({ eVocabSetID, Vocabulary }) => {
            vocabularyMap.set(eVocabSetID, Vocabulary);
        });

        return vocabularyMap;
    };

    getInitialEntryWithVocabularies = (vocabularies: Map<number, Vocabulary[]>, eVocabularyID: eVocabularySetID): number | null => {
        const vocabularyEntry = vocabularies.get(eVocabularyID);

        if (vocabularyEntry) {
            return vocabularyEntry[0].idVocabulary;
        }

        return null;
    };
}

export default TestSuiteUtils;

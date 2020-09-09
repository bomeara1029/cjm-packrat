import * as path from 'path';

import * as STORE from '../../../storage/interface/';
import * as ST from '../../../storage/impl/LocalStorage/SharedTypes';

import * as DBAPI from '../../../db';
import * as CACHE from '../../../cache';
import * as H from '../../../utils/helpers';
import * as LOG from '../../../utils/logger';
import Config from '../../../config';
import { ObjectGraphTestSetup } from '../../db/composite/ObjectGraph.setup';
import { AssetVersionContent } from '../../../types/graphql';

const mockPathZip: string = path.join(__dirname, '../../mock/utils/zip/PackratTest.zip');
const mockPathBagit1: string = path.join(__dirname, '../../mock/utils/bagit/PackratTestValidMultiHash.zip');
const mockPathBagit2: string = path.join(__dirname, '../../mock/utils/zip/PackratTest.zip');

type AssetStorageAdapterTestCase = {
    asset: DBAPI.Asset,
    assetVersion: DBAPI.AssetVersion,
    SOBased: DBAPI.SystemObjectBased | null
};

const OHTS: ObjectGraphTestSetup = new ObjectGraphTestSetup();
let vAssetTypePhoto: DBAPI.Vocabulary;
let vAssetTypeBulk: DBAPI.Vocabulary;
let vAssetTypeOther: DBAPI.Vocabulary;
let opInfo: STORE.OperationInfo;
let TestCase1: AssetStorageAdapterTestCase;
let rootRepositoryOrig: string;
let rootRepositoryNew: string;
let rootStagingOrig: string;
let rootStagingNew: string;

beforeAll(() => {
    rootRepositoryOrig = Config.storage.rootRepository;
    rootStagingOrig = Config.storage.rootStaging;

    rootRepositoryNew = path.join('var', 'test', H.Helpers.randomSlug());
    rootStagingNew = path.join('var', 'test', H.Helpers.randomSlug());

    Config.storage.rootRepository = rootRepositoryNew;
    Config.storage.rootStaging = rootStagingNew;
});

afterAll(async done => {
    Config.storage.rootRepository = rootRepositoryOrig;
    Config.storage.rootStaging = rootStagingOrig;
    await H.Helpers.removeDirectory(rootRepositoryNew, true);
    await H.Helpers.removeDirectory(rootStagingNew, true);
    // jest.setTimeout(3000);
    // await H.Helpers.sleep(2000);
    done();
});

describe('AssetStorageAdapter Init', () => {
    test('Object Hierarchy Test Setup', async() => {
        await OHTS.initialize();
        await OHTS.wire();
        opInfo = {
            message: '1',
            idUser: OHTS.user1 ? OHTS.user1.idUser : 0,
            userEmailAddress: OHTS.user1 ? OHTS.user1.EmailAddress : '',
            userName: OHTS.user1 ? OHTS.user1.Name : ''
        };

        let vAssetTypeLookup: DBAPI.Vocabulary | undefined = await CACHE.VocabularyCache.vocabularyByEnum(CACHE.eVocabularyID.eAssetAssetTypeCaptureDataSetPhotogrammetry);
        expect(vAssetTypeLookup).toBeTruthy();
        if (!vAssetTypeLookup)
            return;
        vAssetTypePhoto = vAssetTypeLookup;

        vAssetTypeLookup = await CACHE.VocabularyCache.vocabularyByEnum(CACHE.eVocabularyID.eAssetAssetTypeBulkIngestion);
        expect(vAssetTypeLookup).toBeTruthy();
        if (!vAssetTypeLookup)
            return;
        vAssetTypeBulk = vAssetTypeLookup;

        vAssetTypeLookup = await CACHE.VocabularyCache.vocabularyByEnum(CACHE.eVocabularyID.eAssetAssetTypeOther);
        expect(vAssetTypeLookup).toBeTruthy();
        if (!vAssetTypeLookup)
            return;
        vAssetTypeOther = vAssetTypeLookup;
    });
});

describe('AssetStorageAdapter Methods', () => {
    test('AssetStorageAdapter.commitNewAsset', async() => {
        TestCase1 = await testCommitNewAsset(null, 10000, OHTS.captureData1);
        await testReadAsset(TestCase1, true);
    });

    test('AssetStorageAdapter.ingestAsset', async() => {
        await testIngestAsset(TestCase1, true);
        await testReadAsset(TestCase1, true);
    });

    test('AssetStorageAdapter.commitNewAsset 2', async() => {
        TestCase1 = await testCommitNewAsset(TestCase1, 12000, OHTS.model1);
        await testReadAsset(TestCase1, true);
    });

    test('AssetStorageAdapter.ingestAsset 2', async() => {
        await testIngestAsset(TestCase1, true);
        await testReadAsset(TestCase1, true);
    });

    test('AssetStorageAdapter.commitNewAsset 3', async() => {
        TestCase1 = await testCommitNewAsset(TestCase1, 14000, OHTS.model1); // don't change metadata this time for fuller code coverage
        await testReadAsset(TestCase1, true);
    });

    test('AssetStorageAdapter.ingestAsset 3', async() => {
        await testIngestAsset(TestCase1, true);
        await testReadAsset(TestCase1, true);
    });

    test('AssetStorageAdapter.renameAsset', async() => {
        await testRenameAsset(TestCase1, true);
        await testReadAsset(TestCase1, true);
    });

    test('AssetStorageAdapter.hideAsset', async() => {
        await testHideAsset(TestCase1, true);
        await testReadAsset(TestCase1, false); // Expected failure as asset was hidden
    });

    test('AssetStorageAdapter.reinstateAsset', async() => {
        await testReinstateAsset(TestCase1, -1, true);
        await testReadAsset(TestCase1, true);
    });

    test('AssetStorageAdapter.hideAsset', async() => {
        await testHideAsset(TestCase1, true);
        await testReadAsset(TestCase1, false); // Expected failure as asset was hidden
    });

    test('AssetStorageAdapter.reinstateAsset', async() => {
        await testReinstateAsset(TestCase1, 4, true);
        await testReadAsset(TestCase1, true);
    });
});

describe('AssetStorageAdapter Failures', () => {
    test('AssetStorageAdapter.commitNewAsset failure', async() => {
        await testCommitNewAssetFailure(TestCase1);
    });

    test('AssetStorageAdapter.ingestAsset failure', async() => {
        await testIngestAssetFailure(TestCase1);
    });
});

describe('AssetStorageAdapter getAssetVersionContents', () => {
    test('AssetStorageAdapter.getAssetVersionContents', async() => {
        await testGetAssetVersionContents(TestCase1, [TestCase1.assetVersion.FileName], []);
    });

    test('AssetStorageAdapter.getAssetVersionContents zip', async() => {
        const tcZip: AssetStorageAdapterTestCase = await testCommitNewAsset(null, 0, OHTS.captureData1, mockPathZip, vAssetTypeOther);
        await testGetAssetVersionContents(tcZip, ['bag-info.txt', 'bagit.txt', 'capture_datasets.csv', 'items.csv', 'manifest-sha1.txt', 'subjects.csv', 'tagmanifest-sha1.txt', 'nmnh_sea_turtle-1_low-01.jpg', 'nmnh_sea_turtle-1_low-02.jpg', 'nmnh_sea_turtle-1_low-01.dng', 'nmnh_sea_turtle-1_low-02.dng'], ['PackratTest', 'PackratTest/data/nmnh_sea_turtle-1_low/camera', 'PackratTest/data/nmnh_sea_turtle-1_low/raw']);
        await testIngestAsset(tcZip, true);
        await testGetAssetVersionContents(tcZip, ['bag-info.txt', 'bagit.txt', 'capture_datasets.csv', 'items.csv', 'manifest-sha1.txt', 'subjects.csv', 'tagmanifest-sha1.txt', 'nmnh_sea_turtle-1_low-01.jpg', 'nmnh_sea_turtle-1_low-02.jpg', 'nmnh_sea_turtle-1_low-01.dng', 'nmnh_sea_turtle-1_low-02.dng'], ['PackratTest', 'PackratTest/data/nmnh_sea_turtle-1_low/camera', 'PackratTest/data/nmnh_sea_turtle-1_low/raw']);
    });

    test('AssetStorageAdapter.getAssetVersionContents bagit', async() => {
        const tcBagit1: AssetStorageAdapterTestCase = await testCommitNewAsset(null, 0, OHTS.captureData1, mockPathBagit1, vAssetTypeBulk);
        await testGetAssetVersionContents(tcBagit1, ['hello.txt'], []);
        await testIngestAsset(tcBagit1, true);
        await testGetAssetVersionContents(tcBagit1, ['hello.txt'], []);

        const tcBagit2: AssetStorageAdapterTestCase = await testCommitNewAsset(null, 0, OHTS.captureData1, mockPathBagit2, vAssetTypeBulk);
        await testGetAssetVersionContents(tcBagit2, ['nmnh_sea_turtle-1_low-01.jpg', 'nmnh_sea_turtle-1_low-02.jpg', 'nmnh_sea_turtle-1_low-01.dng', 'nmnh_sea_turtle-1_low-02.dng'], ['nmnh_sea_turtle-1_low/camera', 'nmnh_sea_turtle-1_low/raw']);
        await testIngestAsset(tcBagit2, true);
        await testGetAssetVersionContents(tcBagit2, ['nmnh_sea_turtle-1_low-01.jpg', 'nmnh_sea_turtle-1_low-02.jpg', 'nmnh_sea_turtle-1_low-01.dng', 'nmnh_sea_turtle-1_low-02.dng'], ['nmnh_sea_turtle-1_low/camera', 'nmnh_sea_turtle-1_low/raw']);
    });
});


async function testCommitNewAsset(TestCase: AssetStorageAdapterTestCase | null, fileSize: number, SOBased: DBAPI.SystemObjectBased | null,
    fileName: string | null = null, vocabulary: DBAPI.Vocabulary | null = null): Promise<AssetStorageAdapterTestCase> {
    if (!vocabulary)
        vocabulary = vAssetTypePhoto;

    let newAsset: boolean;
    if (!TestCase) {
        const fileNameAsset: string = (fileName) ? path.basename(fileName) : H.Helpers.randomSlug();
        TestCase = {
            asset: new DBAPI.Asset({ idAsset: 0, FileName: fileNameAsset, FilePath: H.Helpers.randomSlug(), idAssetGroup: null, idVAssetType: vocabulary.idVocabulary, idSystemObject: null, StorageKey: '' }),
            assetVersion: new DBAPI.AssetVersion({ idAssetVersion: 0, idAsset: 0, FileName: fileNameAsset, idUserCreator: opInfo.idUser, DateCreated: new Date(), StorageHash: '', StorageSize: 0, StorageKeyStaging: '', Ingested: false, Version: 1 }),
            SOBased
        };
        newAsset = true;
    } else {
        TestCase.SOBased = SOBased;
        newAsset = false;
    }

    // Get storage interface
    const storage: STORE.IStorage | null = await STORE.StorageFactory.getInstance();
    expect(storage).toBeTruthy();
    if (!storage)
        return TestCase;

    // Use IStorage.writeStream to write bits
    LOG.logger.info('AssetStorageAdaterTest IStorage.writeStream');
    const WSR: STORE.WriteStreamResult = await storage.writeStream(TestCase.assetVersion.FileName);
    expect(WSR.success).toBeTruthy();
    expect(WSR.writeStream).toBeTruthy();
    expect(WSR.storageKey).toBeTruthy();
    if (!WSR.writeStream)
        return TestCase;
    if (!WSR.storageKey)
        return TestCase;

    // record storage key & stream bits to storage system
    TestCase.assetVersion.StorageKeyStaging = WSR.storageKey;
    let storageHash: string;
    if (!fileName) {
        storageHash = await H.Helpers.createRandomFile(WSR.writeStream, fileSize);
        expect(storageHash).toBeTruthy();
    } else {
        expect(await H.Helpers.writeFileToStream(fileName, WSR.writeStream)).toBeTruthy();
        const hashResults: H.HashResults = await H.Helpers.computeHashFromFile(fileName, 'sha512');
        expect(hashResults.success).toBeTruthy();
        storageHash = hashResults.hash;
    }

    // Use STORE.AssetStorageAdapter.commitNewAsset();
    const ASCNAI: STORE.AssetStorageCommitNewAssetInput = {
        storageKey: TestCase.assetVersion.StorageKeyStaging,
        storageHash,
        FileName: TestCase.asset.FileName,
        FilePath: TestCase.asset.FilePath,
        idAssetGroup: TestCase.asset.idAssetGroup,
        idVAssetType: TestCase.asset.idVAssetType,
        idUserCreator: TestCase.assetVersion.idUserCreator,
        DateCreated: TestCase.assetVersion.DateCreated
    };

    let ASR: STORE.AssetStorageResult;
    if (newAsset) {
        LOG.logger.info(`AssetStorageAdaterTest AssetStorageAdapter.commitNewAsset ${TestCase.asset.FileName}`);
        ASR = await STORE.AssetStorageAdapter.commitNewAsset(ASCNAI);
    } else {
        LOG.logger.info(`AssetStorageAdaterTest AssetStorageAdapter.commitNewAssetVersion ${TestCase.asset.FileName}`);
        ASR = await STORE.AssetStorageAdapter.commitNewAssetVersion({ storageKey: TestCase.assetVersion.StorageKeyStaging, storageHash },
            TestCase.asset, TestCase.assetVersion.idUserCreator, TestCase.assetVersion.DateCreated);
    }
    expect(ASR.success).toBeTruthy();
    if (!ASR.success) {
        LOG.logger.error(`AssetStorageAdaterTest AssetStorageAdapter.commitNewAsset: ${ASR.error}`);
        return TestCase;
    }

    expect(ASR.asset).toBeTruthy();
    expect(ASR.assetVersion).toBeTruthy();
    if (ASR.asset) {
        TestCase.asset = ASR.asset;
        expect(TestCase.asset.idAsset).toBeGreaterThan(0);
    }
    if (ASR.assetVersion) {
        TestCase.assetVersion = ASR.assetVersion;
        expect(TestCase.assetVersion.idAssetVersion).toBeGreaterThan(0);
        expect(TestCase.assetVersion.idAsset).toEqual(TestCase.asset.idAsset);
        expect(TestCase.assetVersion.Ingested).toBeFalsy();
    }

    return TestCase;
}

async function testReadAsset(TestCase: AssetStorageAdapterTestCase, expectSuccess: boolean): Promise<boolean> {
    LOG.logger.info(`AssetStorageAdaterTest AssetStorageAdapter.readAsset (Expecting ${expectSuccess ? 'Success' : 'Failure'})`);
    const RSR: STORE.ReadStreamResult = await STORE.AssetStorageAdapter.readAsset(TestCase.asset, TestCase.assetVersion);

    if (!RSR.success && expectSuccess)
        LOG.logger.error(`AssetStorageAdaterTest AssetStorageAdapter.readAsset: ${RSR.error}`);
    expect(RSR.success).toEqual(expectSuccess);
    if (!RSR.success)
        return !expectSuccess;

    expect(RSR.readStream).toBeTruthy();
    expect(RSR.storageHash).toEqual(TestCase.assetVersion.StorageHash);
    if (!RSR.readStream)
        return false;

    const hashResults: H.HashResults = await H.Helpers.computeHashFromStream(RSR.readStream, ST.OCFLDigestAlgorithm);
    expect(hashResults.success).toBeTruthy();
    expect(hashResults.hash).toEqual(RSR.storageHash);
    expect(hashResults.hash).toEqual(TestCase.assetVersion.StorageHash);
    return true;
}

async function testIngestAsset(TestCase: AssetStorageAdapterTestCase, expectSuccess: true): Promise<boolean> {
    expect(TestCase.SOBased).toBeTruthy();
    if (!TestCase.SOBased)
        return false;

    LOG.logger.info(`AssetStorageAdaterTest AssetStorageAdapter.ingestAsset (Expecting ${expectSuccess ? 'Success' : 'Failure'})`);
    const ASR: STORE.AssetStorageResult = await STORE.AssetStorageAdapter.ingestAsset(TestCase.asset, TestCase.assetVersion, TestCase.SOBased, opInfo);

    if (!ASR.success && expectSuccess)
        LOG.logger.error(`AssetStorageAdaterTest AssetStorageAdapter.ingestAsset: ${ASR.error}`);
    expect(ASR.success).toEqual(expectSuccess);
    if (!ASR.success)
        return !expectSuccess;

    expect(TestCase.assetVersion.StorageKeyStaging).toEqual('');
    expect(TestCase.assetVersion.Ingested).toBeTruthy();
    return true;
}

async function testRenameAsset(TestCase: AssetStorageAdapterTestCase, expectSuccess: true): Promise<boolean> {
    expect(TestCase.SOBased).toBeTruthy();
    if (!TestCase.SOBased)
        return false;

    const fileNameNew = H.Helpers.randomSlug();
    LOG.logger.info(`AssetStorageAdaterTest AssetStorageAdapter.renameAsset (Expecting ${expectSuccess ? 'Success' : 'Failure'})`);
    const ASR: STORE.AssetStorageResult = await STORE.AssetStorageAdapter.renameAsset(TestCase.asset, fileNameNew, opInfo);

    if (!ASR.success && expectSuccess)
        LOG.logger.error(`AssetStorageAdaterTest AssetStorageAdapter.renameAsset: ${ASR.error}`);
    expect(ASR.success).toEqual(expectSuccess);
    if (!ASR.success)
        return !expectSuccess;

    expect(ASR.asset).toBeTruthy();
    expect(ASR.assetVersion).toBeTruthy();
    expect(TestCase.asset.FileName).toEqual(fileNameNew);
    if (ASR.assetVersion) {
        expect(TestCase.assetVersion.Version + 1).toEqual(ASR.assetVersion.Version);
        TestCase.assetVersion = ASR.assetVersion;
    }
    return true;
}

async function testHideAsset(TestCase: AssetStorageAdapterTestCase, expectSuccess: true): Promise<boolean> {
    expect(TestCase.SOBased).toBeTruthy();
    if (!TestCase.SOBased)
        return false;

    LOG.logger.info(`AssetStorageAdaterTest AssetStorageAdapter.hideAsset (Expecting ${expectSuccess ? 'Success' : 'Failure'})`);
    const ASR: STORE.AssetStorageResult = await STORE.AssetStorageAdapter.hideAsset(TestCase.asset, opInfo);

    if (!ASR.success && expectSuccess)
        LOG.logger.error(`AssetStorageAdaterTest AssetStorageAdapter.hideAsset: ${ASR.error}`);
    expect(ASR.success).toEqual(expectSuccess);
    if (!ASR.success)
        return !expectSuccess;

    expect(ASR.asset).toBeTruthy();
    expect(ASR.assetVersion).toBeTruthy();
    if (ASR.assetVersion) {
        expect(TestCase.assetVersion.Version + 1).toEqual(ASR.assetVersion.Version);
        TestCase.assetVersion = ASR.assetVersion;
    }

    const SO: DBAPI.SystemObject | null = await TestCase.asset.fetchSystemObject();
    expect(SO).toBeTruthy();
    if (SO)
        expect(SO.Retired).toBeTruthy();
    return true;
}

async function testReinstateAsset(TestCase: AssetStorageAdapterTestCase, version: number, expectSuccess: true): Promise<boolean> {
    expect(TestCase.SOBased).toBeTruthy();
    if (!TestCase.SOBased)
        return false;

    let assetVersion: DBAPI.AssetVersion | null = null;
    if (version == TestCase.assetVersion.Version)
        assetVersion = TestCase.assetVersion;
    else if (version == -1)
        assetVersion = null;
    else {
        const assetVersionArray: DBAPI.AssetVersion[] | null = await DBAPI.AssetVersion.fetchByAssetAndVersion(TestCase.asset.idAsset, version);
        assetVersion = (assetVersionArray != null && assetVersionArray.length > 0) ? assetVersionArray[0] : null;
        if (expectSuccess)
            expect(assetVersion).toBeTruthy();
    }

    LOG.logger.info(`AssetStorageAdaterTest AssetStorageAdapter.reinstateAsset version ${version} (Expecting ${expectSuccess ? 'Success' : 'Failure'})`);
    const ASR: STORE.AssetStorageResult = await STORE.AssetStorageAdapter.reinstateAsset(TestCase.asset, assetVersion, opInfo);

    if (!ASR.success && expectSuccess)
        LOG.logger.error(`AssetStorageAdaterTest AssetStorageAdapter.reinstateAsset: ${ASR.error}`);
    expect(ASR.success).toEqual(expectSuccess);
    if (!ASR.success)
        return !expectSuccess;

    expect(ASR.asset).toBeTruthy();
    expect(ASR.assetVersion).toBeTruthy();
    if (ASR.assetVersion) {
        expect(TestCase.assetVersion.Version + 1).toEqual(ASR.assetVersion.Version);
        TestCase.assetVersion = ASR.assetVersion;
    }

    const SO: DBAPI.SystemObject | null = await TestCase.asset.fetchSystemObject();
    expect(SO).toBeTruthy();
    if (SO)
        expect(SO.Retired).toBeFalsy();
    return true;
}

async function testCommitNewAssetFailure(TestCase: AssetStorageAdapterTestCase): Promise<boolean> {
    const ASCNAI: STORE.AssetStorageCommitNewAssetInput = {
        storageKey: H.Helpers.randomSlug(),
        storageHash: H.Helpers.randomSlug(),
        FileName: TestCase.asset.FileName,
        FilePath: TestCase.asset.FilePath,
        idAssetGroup: TestCase.asset.idAssetGroup,
        idVAssetType: TestCase.asset.idVAssetType,
        idUserCreator: TestCase.assetVersion.idUserCreator,
        DateCreated: TestCase.assetVersion.DateCreated,
    };

    LOG.logger.info('AssetStorageAdaterTest AssetStorageAdapter.commitNewAsset Failure Expected');
    const ASR: STORE.AssetStorageResult = await STORE.AssetStorageAdapter.commitNewAsset(ASCNAI);
    expect(ASR.success).toBeFalsy();
    return !ASR.success;
}

async function testIngestAssetFailure(TestCase: AssetStorageAdapterTestCase): Promise<boolean> {
    expect(TestCase.SOBased).toBeTruthy();
    if (!TestCase.SOBased)
        return false;

    const storageKeyStagingOld: string = TestCase.assetVersion.StorageKeyStaging;
    TestCase.assetVersion.StorageKeyStaging = H.Helpers.randomSlug();
    LOG.logger.info('AssetStorageAdaterTest AssetStorageAdapter.ingestAsset (Expecting Failure)');
    const ASR: STORE.AssetStorageResult = await STORE.AssetStorageAdapter.ingestAsset(TestCase.asset, TestCase.assetVersion, TestCase.SOBased, opInfo);
    TestCase.assetVersion.StorageKeyStaging = storageKeyStagingOld;

    expect(ASR.success).toBeFalsy();
    return !ASR.success;
}

async function testGetAssetVersionContents(TestCase: AssetStorageAdapterTestCase, expectedFiles: string[], expectedDirs: string[]): Promise<void> {
    const AVC: AssetVersionContent = await STORE.AssetStorageAdapter.getAssetVersionContents(TestCase.assetVersion);
    expect(AVC.idAssetVersion).toEqual(TestCase.assetVersion.idAssetVersion);
    expect(AVC.all.length).toEqual(expectedFiles.length);
    expect(AVC.folders.length).toEqual(expectedDirs.length);

    expect(AVC.all).toEqual(expect.arrayContaining(expectedFiles));
    expect(expectedFiles).toEqual(expect.arrayContaining(AVC.all));
    expect(AVC.folders).toEqual(expect.arrayContaining(expectedDirs));
    expect(expectedDirs).toEqual(expect.arrayContaining(AVC.folders));
}

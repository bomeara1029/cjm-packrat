/* eslint-disable @typescript-eslint/no-explicit-any, camelcase */
import * as fs from 'fs-extra';
import * as COL from '../../collections/interface/';
import * as LOG from '../../utils/logger';
import * as H from '../../utils/helpers';
import * as L from 'lodash';
// import { join } from 'path';

afterAll(async done => {
    // await H.Helpers.sleep(3000);
    done();
});

type EdanResult = {
    id: string;
    name: string;
    unit: string;
    identifierPublic: string;
    identifierCollection: string;
    records: number;
    IDMap?: Map<string, string> | undefined;
    raw?: any;
};

enum eTestType {
    eRegressionSuite,
    e3DPackageFetchTest,
    eScrapeDPO,
    eScrapeMigration,
    eScrapeEDANListsMigration,
    eScrapeEDAN,
    eScrapeIDs,
    eOneOff,
}

const eTYPE: eTestType = +eTestType.eRegressionSuite; // + needed here so that compiler stops thinking eTYPE has a type of eTestType.eRegressionSuite!

const now: Date = new Date();
const yyyymmdd: string = now.toISOString().split('T')[0];
const slug: string = (Math.random().toString(16) + '0000000').substr(2, 12);
let idCounter: number = 0;

describe('Collections: EdanCollection', () => {
    jest.setTimeout(180000);
    const ICol: COL.ICollection = COL.CollectionFactory.getInstance();

    switch (eTYPE) {
        case eTestType.eOneOff:
            executeTestCreateEdan3DPackage(ICol);
            executeTestCreateMDM(ICol);
            break;

        case eTestType.eRegressionSuite:
            executeTestQuery(ICol, 'Armstrong Space Suit', false);
            executeTestQuery(ICol, 'A19730040000', false);
            executeTestQuery(ICol, 'edanmdm:nasm_A19730040000', false);
            executeTestQuery(ICol, 'http://n2t.net/ark:/65665/nv93248f8ce-b6c4-474d-aac7-88252a2daf73', false);
            executeTestQuery(ICol, '', false);
            executeTestQuery(ICol, 'jimmybobimmy', true);
            executeTestQuery(ICol, '<WHACKADOODLE>', true);
            executeTestQuery(ICol, 'nv93248f8ce-b6c4-474d-aac7-88252a2daf73', false);

            // custom search options:
            executeTestQuery(ICol, 'Armstrong Space Suit', false, false, '3d_package');
            executeTestQuery(ICol, 'A19730040000', false, true, '3d_package');
            executeTestQuery(ICol, 'edanmdm:nasm_A19730040000', false, false, '');
            executeTestQuery(ICol, 'http://n2t.net/ark:/65665/nv93248f8ce-b6c4-474d-aac7-88252a2daf73', false, true, '');
            executeTestQuery(ICol, '', false, false, '3d_package');
            executeTestQuery(ICol, 'jimmybobimmy', true, false, '3d_package');
            executeTestQuery(ICol, '<WHACKADOODLE>', true, false, '3d_package');
            executeTestQuery(ICol, 'nv93248f8ce-b6c4-474d-aac7-88252a2daf73', false, false, '3d_package');

            // edanmdm creation
            // executeTestCreateMDM(ICol);
            // executeTestCreateEdan3DPackage(ICol);

            test('Collections: EdanCollection Ark Tests', () => {
                executeArkTests(ICol);
            });
            break;

        case eTestType.e3DPackageFetchTest:
            executeFetch3DPackage(ICol);
            break;

        case eTestType.eScrapeDPO:
            test('Collections: EdanCollection.scrape DPO', async () => {
                await scrapeDPOEdanMDM(ICol, 'd:\\Work\\SI\\EdanScrape.DPO.txt');
            });
            break;

        case eTestType.eScrapeMigration:
            test('Collections: EdanCollection.scrape Migration', async () => {
                await scrapeDPOMigrationMDM(ICol, 'd:\\Work\\SI\\EdanScrape.Migration.txt');
            });
            break;

        case eTestType.eScrapeEDANListsMigration:
            test('Collections: EdanCollection.scrape edanlists Migration', async () => {
                await scrapeDPOEdanListsMigrationMDM(ICol, 'd:\\Work\\SI\\EdanScrape.EdanListsMigration.txt');
            });
            break;

        case eTestType.eScrapeEDAN:
            test('Collections: EdanCollection.scrape EDAN', async () => {
                await scrapeEdan(ICol, 'd:\\Work\\SI\\EdanScrape.EDAN.txt', 0);
            });
            break;

        case eTestType.eScrapeIDs:
            test('Collections: EdanCollection.scrape EDAN', async () => {
                await scrapeDPOIDs(ICol, 'd:\\Work\\SI\\EdanScrape.IDs.txt');
            });
            break;
    }
});


function executeTestQuery(ICol: COL.ICollection, query: string, expectNoResults: boolean,
    searchCollections: boolean = true, edanRecordType: string = ''): void {
    test('Collections: EdanCollection.queryCollection ' + query, async () => {
        let options: COL.CollectionQueryOptions | null = null;
        if (!searchCollections || edanRecordType)
            options = {
                searchMetadata: !searchCollections,
                recordType: edanRecordType
            };

        const results: COL.CollectionQueryResults | null = await ICol.queryCollection(query, 10, 0, options);

        expect(results).toBeTruthy();
        if (results) {
            expect(results.records).toBeTruthy();
            if (results.records) {
                expect(results.records.length).toBeLessThanOrEqual(results.rowCount);
                if (expectNoResults)
                    expect(results.records.length).toBe(0);
                else
                    expect(results.records.length).toBeGreaterThan(0);
            }
        }
    });
}

function executeArkTests(ICol: COL.ICollection) {
    const customShoulder: string = 'custom';
    const ArkNameMappingAuthority: string = ICol.getArkNameMappingAuthority();
    const ArkNameAssigningAuthority: string = ICol.getArkNameAssigningAuthority();

    const ArkDefaultShoulderNoPrepend: string = ICol.generateArk(null, false, false);
    const ArkDefaultShoulderNoPrependMedia: string = ICol.generateArk(null, false, true);
    const ArkDefaultShoulderPrepend: string = ICol.generateArk(null, true, false);
    const ArkDefaultShoulderPrependMedia: string = ICol.generateArk(null, true, true);
    const ArkCustomShoulderNoPrepend: string = ICol.generateArk(customShoulder, false, false);
    const ArkCustomShoulderNoPrependMedia: string = ICol.generateArk(customShoulder, false, true);
    const ArkCustomShoulderPrepend: string = ICol.generateArk(customShoulder, true, false);
    const ArkCustomShoulderPrependMedia: string = ICol.generateArk(customShoulder, true, true);
    const ArkInvalid: string = H.Helpers.randomSlug();

    expect(ArkDefaultShoulderNoPrepend.startsWith(ArkNameMappingAuthority)).toBeFalsy();
    expect(ArkDefaultShoulderNoPrependMedia.startsWith(ArkNameMappingAuthority)).toBeFalsy();
    expect(ArkDefaultShoulderPrepend.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkDefaultShoulderPrependMedia.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkCustomShoulderNoPrepend.startsWith(ArkNameMappingAuthority)).toBeFalsy();
    expect(ArkCustomShoulderNoPrependMedia.startsWith(ArkNameMappingAuthority)).toBeFalsy();
    expect(ArkCustomShoulderPrepend.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkCustomShoulderPrependMedia.startsWith(ArkNameMappingAuthority)).toBeTruthy();

    expect(ArkDefaultShoulderNoPrepend.includes(customShoulder)).toBeFalsy();
    expect(ArkDefaultShoulderNoPrependMedia.includes(customShoulder)).toBeFalsy();
    expect(ArkDefaultShoulderPrepend.includes(customShoulder)).toBeFalsy();
    expect(ArkDefaultShoulderPrependMedia.includes(customShoulder)).toBeFalsy();
    expect(ArkCustomShoulderNoPrepend.includes(customShoulder)).toBeTruthy();
    expect(ArkCustomShoulderNoPrependMedia.includes(customShoulder)).toBeTruthy();
    expect(ArkCustomShoulderPrepend.includes(customShoulder)).toBeTruthy();
    expect(ArkCustomShoulderPrependMedia.includes(customShoulder)).toBeTruthy();

    expect(ArkDefaultShoulderNoPrepend.includes(ArkNameAssigningAuthority)).toBeTruthy();
    expect(ArkDefaultShoulderNoPrependMedia.includes(ArkNameAssigningAuthority)).toBeTruthy();
    expect(ArkDefaultShoulderPrepend.includes(ArkNameAssigningAuthority)).toBeTruthy();
    expect(ArkDefaultShoulderPrependMedia.includes(ArkNameAssigningAuthority)).toBeTruthy();
    expect(ArkCustomShoulderNoPrepend.includes(ArkNameAssigningAuthority)).toBeTruthy();
    expect(ArkCustomShoulderNoPrependMedia.includes(ArkNameAssigningAuthority)).toBeTruthy();
    expect(ArkCustomShoulderPrepend.includes(ArkNameAssigningAuthority)).toBeTruthy();
    expect(ArkCustomShoulderPrependMedia.includes(ArkNameAssigningAuthority)).toBeTruthy();

    const ArkDefaultShoulderNoPrependExtract: string | null = ICol.extractArkFromUrl(ArkDefaultShoulderNoPrepend);
    const ArkDefaultShoulderNoPrependMediaExtract: string | null = ICol.extractArkFromUrl(ArkDefaultShoulderNoPrependMedia);
    const ArkDefaultShoulderPrependExtract: string | null = ICol.extractArkFromUrl(ArkDefaultShoulderPrepend);
    const ArkDefaultShoulderPrependMediaExtract: string | null = ICol.extractArkFromUrl(ArkDefaultShoulderPrependMedia);
    const ArkCustomShoulderNoPrependExtract: string | null = ICol.extractArkFromUrl(ArkCustomShoulderNoPrepend);
    const ArkCustomShoulderNoPrependMediaExtract: string | null = ICol.extractArkFromUrl(ArkCustomShoulderNoPrependMedia);
    const ArkCustomShoulderPrependExtract: string | null = ICol.extractArkFromUrl(ArkCustomShoulderPrepend);
    const ArkCustomShoulderPrependMediaExtract: string | null = ICol.extractArkFromUrl(ArkCustomShoulderPrependMedia);
    const ArkInvalidExtract: string | null = ICol.extractArkFromUrl(ArkInvalid);

    expect(ArkDefaultShoulderNoPrependExtract && ArkDefaultShoulderNoPrependExtract.startsWith('ark:')).toBeTruthy();
    expect(ArkDefaultShoulderNoPrependMediaExtract && ArkDefaultShoulderNoPrependMediaExtract.startsWith('ark:')).toBeTruthy();
    expect(ArkDefaultShoulderPrependExtract && ArkDefaultShoulderPrependExtract.startsWith('ark:')).toBeTruthy();
    expect(ArkDefaultShoulderPrependMediaExtract && ArkDefaultShoulderPrependMediaExtract.startsWith('ark:')).toBeTruthy();
    expect(ArkCustomShoulderNoPrependExtract && ArkCustomShoulderNoPrependExtract.startsWith('ark:')).toBeTruthy();
    expect(ArkCustomShoulderNoPrependMediaExtract && ArkCustomShoulderNoPrependMediaExtract.startsWith('ark:')).toBeTruthy();
    expect(ArkCustomShoulderPrependExtract && ArkCustomShoulderPrependExtract.startsWith('ark:')).toBeTruthy();
    expect(ArkCustomShoulderPrependMediaExtract && ArkCustomShoulderPrependMediaExtract.startsWith('ark:')).toBeTruthy();
    expect(ArkInvalidExtract).toBeFalsy();

    const ArkDefaultShoulderNoPrependUrl: string = ICol.transformArkIntoUrl(ArkDefaultShoulderNoPrependExtract ? ArkDefaultShoulderNoPrependExtract : '');
    const ArkDefaultShoulderNoPrependMediaUrl: string = ICol.transformArkIntoUrl(ArkDefaultShoulderNoPrependMediaExtract ? ArkDefaultShoulderNoPrependMediaExtract : '');
    const ArkDefaultShoulderPrependUrl: string = ICol.transformArkIntoUrl(ArkDefaultShoulderPrependExtract ? ArkDefaultShoulderPrependExtract : '');
    const ArkDefaultShoulderPrependMediaUrl: string = ICol.transformArkIntoUrl(ArkDefaultShoulderPrependMediaExtract ? ArkDefaultShoulderPrependMediaExtract : '');
    const ArkCustomShoulderNoPrependUrl: string = ICol.transformArkIntoUrl(ArkCustomShoulderNoPrependExtract ? ArkCustomShoulderNoPrependExtract : '');
    const ArkCustomShoulderNoPrependMediaUrl: string = ICol.transformArkIntoUrl(ArkCustomShoulderNoPrependMediaExtract ? ArkCustomShoulderNoPrependMediaExtract : '');
    const ArkCustomShoulderPrependUrl: string = ICol.transformArkIntoUrl(ArkCustomShoulderPrependExtract ? ArkCustomShoulderPrependExtract : '');
    const ArkCustomShoulderPrependMediaUrl: string = ICol.transformArkIntoUrl(ArkCustomShoulderPrependMediaExtract ? ArkCustomShoulderPrependMediaExtract : '');

    expect(ArkDefaultShoulderNoPrependUrl.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkDefaultShoulderNoPrependMediaUrl.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkDefaultShoulderPrependUrl.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkDefaultShoulderPrependMediaUrl.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkCustomShoulderNoPrependUrl.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkCustomShoulderNoPrependMediaUrl.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkCustomShoulderPrependUrl.startsWith(ArkNameMappingAuthority)).toBeTruthy();
    expect(ArkCustomShoulderPrependMediaUrl.startsWith(ArkNameMappingAuthority)).toBeTruthy();

    expect(ArkDefaultShoulderPrependUrl).toEqual(ArkDefaultShoulderPrepend);
    expect(ArkCustomShoulderPrependUrl).toEqual(ArkCustomShoulderPrepend);
}

// #region Create EDANMDM
function executeTestCreateMDM(ICol: COL.ICollection): void {
    const edanmdm: COL.EdanMDMContent = {
        descriptiveNonRepeating: {
            title: { label: 'Title', content: 'Packrat Test' },
            data_source: 'NMNH - Anthropology Dept.',
            record_ID: 'dpo_3d_test_',
            unit_code: 'OCIO_DPO3D',
            metadata_usage: { access: 'Usage conditions apply' }
        },
        indexedStructured: { },
        freetext: { }
    };

    let edanmdmClone: COL.EdanMDMContent = edanmdm;
    let status: number = 0;
    let publicSearch: boolean = true;
    for (let testCase: number = 0; testCase <= 8; testCase++) {
        const recordId: string = nextID();
        edanmdmClone = L.cloneDeep(edanmdmClone);
        edanmdmClone.descriptiveNonRepeating.title.content = 'Packrat Test Subject ' + recordId;
        edanmdmClone.descriptiveNonRepeating.record_ID = recordId;

        switch (testCase) {
            default: break;
            case 1:  edanmdmClone.descriptiveNonRepeating.online_media = { media: [{
                'thumbnail': 'https://3d-api.si.edu/content/document/3d_package:6ddc70e2-bdef-46fe-b5cb-90eb991afb15/scene-image-thumb.jpg',
                'content': 'https://3d-api.si.edu/voyager/3d_package:6ddc70e2-bdef-46fe-b5cb-90eb991afb15',
                'type': '3d_voyager',
                'voyagerId': '3d_package:6ddc70e2-bdef-46fe-b5cb-90eb991afb15',
                'usage': {
                    'access': 'Usage Conditions Apply',
                    'text': '',
                    'codes': ''
                }
            }], mediaCount: '1' }; break;
            case 2: edanmdmClone.indexedStructured!.date = ['2010s']; break; // eslint-disable-line @typescript-eslint/no-non-null-assertion
            case 3: edanmdmClone.indexedStructured!.object_type = ['Reliquaries']; break; // eslint-disable-line @typescript-eslint/no-non-null-assertion
            case 4: edanmdmClone.freetext!.notes = [{ label: 'Summary', content: 'Foobar' }]; break; // eslint-disable-line @typescript-eslint/no-non-null-assertion
            case 5: edanmdmClone.freetext!.name = [{ label: 'Collector', content: 'Zeebap' }]; break; // eslint-disable-line @typescript-eslint/no-non-null-assertion
            case 6: edanmdmClone.freetext!.place = [{ label: 'Site Name', content: 'CooVee' }]; break; // eslint-disable-line @typescript-eslint/no-non-null-assertion
            case 7: edanmdmClone.freetext!.dataSource = [{ label: 'Data Source', content: 'Vipers' }]; break; // eslint-disable-line @typescript-eslint/no-non-null-assertion
            case 8: edanmdmClone.freetext!.objectRights = [{ label: 'Credit Line', content: 'Foxtrot' }]; break; // eslint-disable-line @typescript-eslint/no-non-null-assertion
        }
        executeTestCreateMDMWorker(ICol, edanmdmClone, status, publicSearch);   // status: 0 and publicSearch: true are linked somehow
        status = 1 - status;                                                    // status: 1 and publicSearch: false are linked (not published to edan, not published API)
        publicSearch = !publicSearch;
    }
}

function executeTestCreateMDMWorker(ICol: COL.ICollection, edanmdm: COL.EdanMDMContent, status: number, publicSearch: boolean): void {
    test(`Collections: EdanCollection.createEdanMDM ${edanmdm.descriptiveNonRepeating.title.content}`, async () => {
        const edanRecord: COL.EdanRecord | null = await ICol.createEdanMDM(edanmdm, status, publicSearch);
        expect(edanRecord).toBeTruthy();
        LOG.info(`EdanCollection.test.executeTestCreateMDM created record ${JSON.stringify(edanRecord, H.Helpers.saferStringify)}`, LOG.LS.eTEST);

        if (edanRecord) {
            expect(edanRecord.status).toEqual(status);
            expect(edanRecord.publicSearch).toEqual(publicSearch);
            expect(edanRecord.content).toEqual(edanmdm);
        }

        /*
        // now query and compare query results to created subjects
        // Note that this query is done against EDAN production, whereas EDANMDM creation is done against EDAN 3D DEV ... so this won't work!
        const results: COL.CollectionQueryResults | null = await ICol.queryCollection(`edanmdm:${edanmdm.descriptiveNonRepeating.record_ID}`, 10, 0, { gatherRaw: true });
        expect(results).toBeTruthy();
        if (results) {
            expect(results.records.length).toBeGreaterThan(0);
            if (results.records.length) {
                expect(results.records[0].raw).toBeTruthy();
                expect(results.records[0].raw?.content).toMatchObject(edanmdm); // not sure if this works ... but we expect .raw to contain our edanmdm element as 'content'
            }
        }
        */
    });
}

function nextID(): string {
    const counter: string = ('00000' + (++idCounter).toString()).substr(-5);
    return `dpo_3d_test_${yyyymmdd}-${slug}-${counter}`;
}
// #endregion

// #region Create EDAN 3D Package
function executeTestCreateEdan3DPackage(ICol: COL.ICollection): void {
    // executeTestCreateEdan3DPackageWorker(ICol, 'file:///' + mockScenePath.replace(/\\/g, '/'), 'scene.svx.json');
    // executeTestCreateEdan3DPackageWorker(ICol, 'nfs:///si-3ddigi-staging/upload/ff607e3c-3d88-4422-a246-3976aa4839dc.zip', 'scene.svx.json');
    // executeTestCreateEdan3DPackageWorker(ICol, 'nfs:///si-3ddigi-staging/upload/fbcc6998-41a8-41cf-af57-81a82098f3ca.zip', 'scene.svx.json');
    executeTestCreateEdan3DPackageWorker(ICol, 'nfs:///si-3ddigi-staging/upload/f550015a-7e43-435b-90dc-e7c1367bc5fb.zip', 'scene.svx.json');
}

function executeTestCreateEdan3DPackageWorker(ICol: COL.ICollection, path: string, scene: string): void {
    test(`Collections: EdanCollection.createEdan3DPackage ${path}, ${scene}`, async () => {
        const edanRecord: COL.EdanRecord | null = await ICol.createEdan3DPackage(path);
        expect(edanRecord).toBeTruthy();
        LOG.info(`EdanCollection.test.executeTestCreateEdan3DPackage created record ${JSON.stringify(edanRecord, H.Helpers.saferStringify)}`, LOG.LS.eTEST);

        // if (edanRecord)
        //     expect(edanRecord.content).toMatch(path);
    });
}
// #endregion

// #region SCRAPE EDAN
const EDAN_SCRAPE_MAX_INIT: number = 14000000;
const EDAN_QUERY_MAX_ROWS: number = 100;
const EDAN_SIMUL: number = 4; // set to a higher number only with permission from OCIO, as even a moderate load seems to cause alarm!

export async function scrapeEdan(ICol: COL.ICollection, fileName: string, rowStart: number): Promise<void> {
    jest.setTimeout(1000 * 60 * 60 * 24 * 7);   // 1 week
    let writeStream: NodeJS.WritableStream | null = null;

    try {
        let scrapeEndRecord: number = EDAN_SCRAPE_MAX_INIT;
        let queryNumber: number = 0;
        let resultCount: number = 0;
        const unitMap: Map<string, number> = new Map<string, number>();
        writeStream = await fs.createWriteStream(fileName, { 'flags': 'a' });
        if (!writeStream)
            LOG.info(`Unable to create writeStream for ${fileName}`, LOG.LS.eTEST);

        for (; rowStart < scrapeEndRecord; ) {
            // run EDAN_SIMUL requests at once:
            const promiseArray: Promise<COL.CollectionQueryResults | null>[] = [];
            for (let simulReq: number = 0; simulReq < EDAN_SIMUL && rowStart < scrapeEndRecord; simulReq++) {
                promiseArray.push(ICol.queryCollection('*.*', EDAN_QUERY_MAX_ROWS, rowStart, null));
                rowStart += EDAN_QUERY_MAX_ROWS;
            }

            await Promise.all(promiseArray).then(resultArray => {
                for (const results of resultArray) {
                    if (!results) {
                        LOG.info('*** Edan Scrape: query returned no results', LOG.LS.eTEST);
                        continue;
                    }

                    if (results.error)
                        LOG.info(`*** Edan Scrape: encountered error ${results.error}`, LOG.LS.eTEST);
                    else if (scrapeEndRecord < results.rowCount) {
                        scrapeEndRecord = results.rowCount;
                        LOG.info(`*** Edan Scrape: Increasing scrape end record to ${scrapeEndRecord}`, LOG.LS.eTEST);
                    }

                    for (const record of results.records) {
                        if (writeStream)
                            writeStream.write(`${record.unit}\t${record.identifierPublic}\t${record.identifierCollection}\t${record.name}\n`);
                        const unitRecordCount: number | undefined = unitMap.get(record.unit);
                        unitMap.set(record.unit, (unitRecordCount ? unitRecordCount : 0) + 1);
                    }
                    resultCount += results.records.length;
                    queryNumber++;
                }
                logUnitMap(unitMap, queryNumber, resultCount);
            });
        }
        logUnitMap(unitMap, queryNumber, resultCount);
    } finally {
        if (writeStream)
            writeStream.end();
    }
}

function logUnitMap(unitMap: Map<string, number>, queryNumber: number, resultCount: number): void {
    let logArray: string[] = [];

    for (const [key, value] of unitMap)
        logArray.push(`${key}: ${value}`);
    logArray = logArray.sort((a: string, b: string) => a.localeCompare(b));

    let QN: string = '00000' + queryNumber.toString();
    const QNLen: number = QN.length;
    QN = QN.substring(QNLen - 6);
    logArray.splice(0, 0, `${new Date().toISOString()} Edan Scrape [${QN}]: ${resultCount} Results; Unit Counts:`);
    logArray.push('\n');

    LOG.info(logArray.join('\n'), LOG.LS.eTEST);
}
// #endregion

// #region SCRAPE DPO
export async function scrapeDPOEdanMDM(ICol: COL.ICollection, fileName: string): Promise<void> {
    jest.setTimeout(1000 * 60 * 60 * 4);   // 4 hours

    const WS: NodeJS.WritableStream = await fs.createWriteStream(fileName, { 'flags': 'a' });
    if (!WS)
        LOG.info(`Unable to create writeStream for ${fileName}`, LOG.LS.eTEST);

    // let results: COL.CollectionQueryResults | null = null;
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200001', 'dpo_3d_200001');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200002', 'dpo_3d_200002');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200003', 'dpo_3d_200003');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200004', 'dpo_3d_200004');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200005', 'dpo_3d_200005');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200006', 'dpo_3d_200006');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200007', 'dpo_3d_200007');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200008', 'dpo_3d_200008');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200009', 'dpo_3d_200009');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200010', 'dpo_3d_200010');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200011', 'dpo_3d_200011');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200012', 'dpo_3d_200012');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200013', 'dpo_3d_200013');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200014', 'dpo_3d_200014');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200015', 'dpo_3d_200015');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200016', 'dpo_3d_200016');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200017', 'dpo_3d_200017');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200018', 'dpo_3d_200018');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200019', 'dpo_3d_200019');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200020', 'dpo_3d_200020');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200021', 'dpo_3d_200021');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200022', 'dpo_3d_200022');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200023', 'dpo_3d_200023');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200024', 'dpo_3d_200024');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200025', 'dpo_3d_200025');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200026', 'dpo_3d_200026');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200027', 'dpo_3d_200027');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200028', 'dpo_3d_200028');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200029', 'dpo_3d_200029');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200030', 'dpo_3d_200030');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200031', 'dpo_3d_200031');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200032', 'dpo_3d_200032');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200033', 'dpo_3d_200033');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200034', 'dpo_3d_200034');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200035', 'dpo_3d_200035');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200036', 'dpo_3d_200036');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200037', 'dpo_3d_200037');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200038', 'dpo_3d_200038');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200039', 'dpo_3d_200039');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200040', 'dpo_3d_200040');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200041', 'dpo_3d_200041');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200042', 'dpo_3d_200042');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200043', 'dpo_3d_200043');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200044', 'dpo_3d_200044');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200045', 'dpo_3d_200045');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200046', 'dpo_3d_200046');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200047', 'dpo_3d_200047');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200048', 'dpo_3d_200048');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200049', 'dpo_3d_200049');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200050', 'dpo_3d_200050');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200051', 'dpo_3d_200051');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200052', 'dpo_3d_200052');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200053', 'dpo_3d_200053');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200054', 'dpo_3d_200054');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200055', 'dpo_3d_200055');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200056', 'dpo_3d_200056');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200057', 'dpo_3d_200057');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200058', 'dpo_3d_200058');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200059', 'dpo_3d_200059');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200060', 'dpo_3d_200060');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200061', 'dpo_3d_200061');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200062', 'dpo_3d_200062');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200063', 'dpo_3d_200063');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200064', 'dpo_3d_200064');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200065', 'dpo_3d_200065');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200066', 'dpo_3d_200066');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200067', 'dpo_3d_200067');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200068', 'dpo_3d_200068');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200069', 'dpo_3d_200069');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200070', 'dpo_3d_200070');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200071', 'dpo_3d_200071');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200072', 'dpo_3d_200072');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200073', 'dpo_3d_200073');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200074', 'dpo_3d_200074');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200075', 'dpo_3d_200075');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200076', 'dpo_3d_200076');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200077', 'dpo_3d_200077');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200078', 'dpo_3d_200078');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200079', 'dpo_3d_200079');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200080', 'dpo_3d_200080');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200081', 'dpo_3d_200081');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200082', 'dpo_3d_200082');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200083', 'dpo_3d_200083');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200084', 'dpo_3d_200084');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200085', 'dpo_3d_200085');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200086', 'dpo_3d_200086');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200087', 'dpo_3d_200087');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200088', 'dpo_3d_200088');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200089', 'dpo_3d_200089');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200090', 'dpo_3d_200090');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200091', 'dpo_3d_200091');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200092', 'dpo_3d_200092');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200093', 'dpo_3d_200093');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200094', 'dpo_3d_200094');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200095', 'dpo_3d_200095');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200096', 'dpo_3d_200096');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200097', 'dpo_3d_200097');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200098', 'dpo_3d_200098');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200099', 'dpo_3d_200099');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200100', 'dpo_3d_200100');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200101', 'dpo_3d_200101');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200102', 'dpo_3d_200102');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200103', 'dpo_3d_200103');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200104', 'dpo_3d_200104');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200105', 'dpo_3d_200105');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200106', 'dpo_3d_200106');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200107', 'dpo_3d_200107');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200108', 'dpo_3d_200108');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200109', 'dpo_3d_200109');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200110', 'dpo_3d_200110');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200111', 'dpo_3d_200111');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200112', 'dpo_3d_200112');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200113', 'dpo_3d_200113');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200114', 'dpo_3d_200114');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200115', 'dpo_3d_200115');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200116', 'dpo_3d_200116');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200117', 'dpo_3d_200117');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200118', 'dpo_3d_200118');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200119', 'dpo_3d_200119');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200120', 'dpo_3d_200120');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200121', 'dpo_3d_200121');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200122', 'dpo_3d_200122');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200123', 'dpo_3d_200123');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200124', 'dpo_3d_200124');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200125', 'dpo_3d_200125');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200126', 'dpo_3d_200126');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200127', 'dpo_3d_200127');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200128', 'dpo_3d_200128');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200129', 'dpo_3d_200129');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200130', 'dpo_3d_200130');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200131', 'dpo_3d_200131');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200132', 'dpo_3d_200132');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200133', 'dpo_3d_200133');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200134', 'dpo_3d_200134');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200135', 'dpo_3d_200135');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200136', 'dpo_3d_200136');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200137', 'dpo_3d_200137');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200138', 'dpo_3d_200138');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200139', 'dpo_3d_200139');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200140', 'dpo_3d_200140');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200141', 'dpo_3d_200141');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200142', 'dpo_3d_200142');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200143', 'dpo_3d_200143');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200144', 'dpo_3d_200144');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200145', 'dpo_3d_200145');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200146', 'dpo_3d_200146');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200147', 'dpo_3d_200147');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200148', 'dpo_3d_200148');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200149', 'dpo_3d_200149');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200150', 'dpo_3d_200150');

    if (WS)
        WS.end();
}


export async function scrapeDPOIDs(ICol: COL.ICollection, fileName: string): Promise<void> {
    jest.setTimeout(1000 * 60 * 60 * 4);   // 4 hours
    const IDLabelSet: Set<string> = new Set<string>();
    const records: EdanResult[] = [];

    const WS: NodeJS.WritableStream = await fs.createWriteStream(fileName, { 'flags': 'a' });
    if (!WS) {
        LOG.info(`Unable to create writeStream for ${fileName}`, LOG.LS.eTEST);
        return;
    }

    await scrapeDPOIDsWorker(ICol, IDLabelSet, records);

    const IDLabels: string[] = Array.from(IDLabelSet).sort((a, b) => a.localeCompare(b));

    WS.write('id\tname\tunit\tidentifierPublic\tidentifierCollection\trecords');
    for (const IDLabel of IDLabels)
        WS.write(`\t${IDLabel}`);
    WS.write('\n');

    for (const record of records) {
        WS.write(`${record.id}\t${record.name}\t${record.unit}\t${record.identifierPublic}\t${record.identifierCollection}\t${record.records}`);
        for (const IDLabel of IDLabels)
            WS.write(`\t${record.IDMap?.get(IDLabel) ?? ''}`);
        WS.write('\n');
    }

    WS.end();
}

export async function scrapeDPOMigrationMDM(ICol: COL.ICollection, fileName: string): Promise<void> {
    jest.setTimeout(1000 * 60 * 60);  // 1 hour

    const WS: NodeJS.WritableStream = await fs.createWriteStream(fileName, { 'flags': 'a' });
    if (!WS)
        LOG.info(`Unable to create writeStream for ${fileName}`, LOG.LS.eTEST);

    await handleResults(ICol, WS, ' BABOON', '630');
    await handleResults(ICol, WS, ' Crocodile', '631');
    await handleResults(ICol, WS, ' HAWK2', '632');
    await handleResults(ICol, WS, '1988_0062_0294', '317');
    await handleResults(ICol, WS, '2007_0116_274', '320');
    await handleResults(ICol, WS, '2017_01116_281', '329');
    await handleResults(ICol, WS, '2017_0116', '330');
    await handleResults(ICol, WS, '2018_0009_0002', '334');
    await handleResults(ICol, WS, '76-15-2 Ivory Tusk', '237');
    await handleResults(ICol, WS, '78-23-15 Ivory Tusk', '238');
    await handleResults(ICol, WS, '79_002_421', '364');
    await handleResults(ICol, WS, '79_112_cm1031', '370');
    await handleResults(ICol, WS, 'a240189_64a Wooden Bowl', '403');
    await handleResults(ICol, WS, 'A355722 Fire Board', '421');
    await handleResults(ICol, WS, 'Abydos Mummy 074586', '633');
    await handleResults(ICol, WS, 'Abydos Mummy 279283', '634');
    await handleResults(ICol, WS, 'Abydos Mummy 279286', '635');
    await handleResults(ICol, WS, 'Adult Mummy (Andrew)', '636');
    await handleResults(ICol, WS, 'allosaurus articulated skeleton', '835');
    await handleResults(ICol, WS, 'Amati, Nicolo Vn 1654, \'Brookings\' LOC', '260');
    await handleResults(ICol, WS, 'Amati, Nicolo Vn 1675 SI', '261');
    await handleResults(ICol, WS, 'ammonite', '828');
    await handleResults(ICol, WS, 'Argonauta Nodosa', '873');
    await handleResults(ICol, WS, 'Armstrong Space Suit Glove Savage Reproduction', '178');
    await handleResults(ICol, WS, 'Articulated Woolly Mammoth', '795');
    await handleResults(ICol, WS, 'Bombus Bee', '848');
    await handleResults(ICol, WS, 'boot ', '185');
    await handleResults(ICol, WS, 'boots ', '186');
    await handleResults(ICol, WS, 'Boy Mummy', '637');
    await handleResults(ICol, WS, 'Branta-sandvicensis C10', '587');
    await handleResults(ICol, WS, 'Branta-sandvicensis C3', '588');
    await handleResults(ICol, WS, 'Branta-sandvicensis Pelvis', '589');
    await handleResults(ICol, WS, 'bust nam ', '187');
    await handleResults(ICol, WS, 'Cab Calloway Case', '217');
    await handleResults(ICol, WS, 'camera arriflex16srii', '188');
    await handleResults(ICol, WS, 'camptosaurus articulated skeleton', '836');
    await handleResults(ICol, WS, 'Cast Iron Cauldron', '218');
    await handleResults(ICol, WS, 'Cat Mummy 2 381569', '638');
    await handleResults(ICol, WS, 'Cat Mummy 437431', '639');
    await handleResults(ICol, WS, 'checkerboard skirt ', '124');
    await handleResults(ICol, WS, 'chionecetes opilio (crabs)', '508');
    await handleResults(ICol, WS, 'chndm_Carnegie_Mansion', '31');
    await handleResults(ICol, WS, 'Clovis Drake1', '557');
    await handleResults(ICol, WS, 'Clovis Drake10', '558');
    await handleResults(ICol, WS, 'Clovis Drake11', '559');
    await handleResults(ICol, WS, 'Clovis Drake12', '560');
    await handleResults(ICol, WS, 'Clovis Drake2', '561');
    await handleResults(ICol, WS, 'Clovis Drake3', '562');
    await handleResults(ICol, WS, 'Clovis Drake4', '563');
    await handleResults(ICol, WS, 'Clovis Drake5', '564');
    await handleResults(ICol, WS, 'Clovis Drake6', '565');
    await handleResults(ICol, WS, 'Clovis Drake9', '566');
    await handleResults(ICol, WS, 'Coffee Grinder', '219');
    await handleResults(ICol, WS, 'Colonoware pot from Cooper River, Charleston County, SC', '843');
    await handleResults(ICol, WS, 'coryanthes-dried', '849');
    await handleResults(ICol, WS, 'Crocodile Mummy', '640');
    await handleResults(ICol, WS, 'diplodocus longus articulated skeleton', '837');
    await handleResults(ICol, WS, 'dpo_3d_200009', '784');
    await handleResults(ICol, WS, 'dpo_3d_200030', '393');
    await handleResults(ICol, WS, 'dpo_3d_200035', '399');
    await handleResults(ICol, WS, 'dpo_3d_200036', '399');
    await handleResults(ICol, WS, 'dtid-1047', '677');
    await handleResults(ICol, WS, 'dtid-270', '679');
    await handleResults(ICol, WS, 'dtid-609', '680');
    await handleResults(ICol, WS, 'edanmdm:chndm_1907-1-40', '20');
    await handleResults(ICol, WS, 'edanmdm:chndm_1910-12-1', '7');
    await handleResults(ICol, WS, 'edanmdm:chndm_1910-41-1', '3');
    await handleResults(ICol, WS, 'edanmdm:chndm_1913-45-9-a_b', '9');
    await handleResults(ICol, WS, 'edanmdm:chndm_1916-19-83-a_b', '12');
    await handleResults(ICol, WS, 'edanmdm:chndm_1924-6-1', '5');
    await handleResults(ICol, WS, 'edanmdm:chndm_1931-48-73', '24');
    await handleResults(ICol, WS, 'edanmdm:chndm_1938-57-306-a_b', '29');
    await handleResults(ICol, WS, 'edanmdm:chndm_1938-58-1083', '1');
    await handleResults(ICol, WS, 'edanmdm:chndm_1949-64-7', '11');
    await handleResults(ICol, WS, 'edanmdm:chndm_1959-144-1', '2');
    await handleResults(ICol, WS, 'edanmdm:chndm_1962-67-1', '25');
    await handleResults(ICol, WS, 'edanmdm:chndm_1971-48-12', '4');
    await handleResults(ICol, WS, 'edanmdm:chndm_1972-79-2', '21');
    await handleResults(ICol, WS, 'edanmdm:chndm_1984-84-36', '22');
    await handleResults(ICol, WS, 'edanmdm:chndm_1985-103-49', '17');
    await handleResults(ICol, WS, 'edanmdm:chndm_1985-103-50', '13');
    await handleResults(ICol, WS, 'edanmdm:chndm_1985-103-51', '16');
    await handleResults(ICol, WS, 'edanmdm:chndm_1985-103-52', '15');
    await handleResults(ICol, WS, 'edanmdm:chndm_1985-103-81', '14');
    await handleResults(ICol, WS, 'edanmdm:chndm_1985-103-82', '27');
    await handleResults(ICol, WS, 'edanmdm:chndm_1990-133-3', '30');
    await handleResults(ICol, WS, 'edanmdm:chndm_1994-73-2', '19');
    await handleResults(ICol, WS, 'edanmdm:chndm_2003-3-1', '18');
    await handleResults(ICol, WS, 'edanmdm:chndm_2006-5-1', '6');
    await handleResults(ICol, WS, 'edanmdm:chndm_2007-45-13', '23');
    await handleResults(ICol, WS, 'edanmdm:chndm_2007-45-14', '28');
    await handleResults(ICol, WS, 'edanmdm:chndm_2011-28-1', '8');
    await handleResults(ICol, WS, 'edanmdm:chndm_2011-31-1', '26');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200001', '146');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200002', '147');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200003', '148');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200004', '142');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200005', '143');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200006', '141');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200008', '145');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200010', '869');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200012', '872');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200013', '175');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200014', '883');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200015', '444');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200016', '446');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200017', '447');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200018', '443');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200019', '445');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200020', '442');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200021', '859');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200023', '861');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200026', '857');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200028', '391');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200029', '390');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200031', '395');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200032', '394');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200033', '396');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200034', '389');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200036', '398');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200038', '887');
    await handleResults(ICol, WS, 'edanmdm:dpo_3d_200039', '550');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1908.236', '877');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1915.109', '113');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1916.345', '110');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1921.1', '111');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1921.2', '112');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1923.15', '875');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1930.54a-b', '108');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1936.6a-b', '870');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1947.15a-b', '876');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1961.33a-b', '109');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1978.40', '45');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1980.14a-c', '57');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1980.191a-c', '55');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1980.192a-c', '56');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1980.193a-b', '64');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1980.194a-b', '63');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1982.15a-c', '62');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1982.16a-b', '93');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1982.17', '46');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1982.18a-b', '67');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1982.19a-b', '47');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1982.20a-b', '68');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1982.21a-b', '103');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1982.22a-b', '104');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1986.19a-b', '48');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1986.20a-b', '81');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1986.21a-c', '82');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1986.4a-b', '101');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1989.1', '65');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.46', '94');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.48a-b', '49');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.49', '69');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.50', '70');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.51', '95');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.58', '91');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.59', '105');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.60', '106');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.61a-b', '96');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1991.62', '97');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.10a-b', '88');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.11a-b', '87');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.13.1', '107');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.13.2', '50');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.14a-b', '89');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.15.1', '92');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.25', '80');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.27.1', '60');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.27.2', '61');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.3', '51');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.33', '66');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.34.1', '76');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.34.2', '77');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.46', '98');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.47.1', '58');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.47.2', '59');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.47.3a-b', '84');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.47.4a-c', '85');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.47.5a-b', '86');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.48.1', '79');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.48.2', '78');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.56', '102');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.6', '74');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1992.7', '75');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1993.10a-b', '83');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1993.7.1', '99');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1993.7.2', '100');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1994.26.1', '52');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1994.26.2', '71');
    await handleResults(ICol, WS, 'edanmdm:fsg_F1995.3.2a-b', '54');
    await handleResults(ICol, WS, 'edanmdm:fsg_F2002.10.1', '72');
    await handleResults(ICol, WS, 'edanmdm:fsg_F2002.10.2', '73');
    await handleResults(ICol, WS, 'edanmdm:fsg_F2004.37.1a-c', '53');
    await handleResults(ICol, WS, 'edanmdm:fsg_F2004.37.2a-c', '90');
    await handleResults(ICol, WS, 'edanmdm:hmsg_01.9', '137');
    await handleResults(ICol, WS, 'edanmdm:hmsg_06.15', '140');
    await handleResults(ICol, WS, 'edanmdm:hmsg_66.3867', '138');
    await handleResults(ICol, WS, 'edanmdm:hmsg_93.6', '136');
    await handleResults(ICol, WS, 'edanmdm:hmsg_94.13', '139');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19280021000', '184');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19330035008', '199');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19330055000', '191');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19510007000', '182');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19540108000', '201');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19610048000', '202');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19700102000', '176');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19730040000', '180');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19730040001', '172');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19730040002', '173');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19730040003', '174');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19791810000', '179');
    await handleResults(ICol, WS, 'edanmdm:nasm_A19850354000', '200');
    await handleResults(ICol, WS, 'edanmdm:nasm_A20050459000', '183');
    await handleResults(ICol, WS, 'edanmdm:nasm_A20110028000', '189');
    await handleResults(ICol, WS, 'edanmdm:nasm_A20120325000', '891');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2007.3.8.4ab', '206');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2007.5.1ab', '207');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2010.19.3', '227');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2011.118.4ab', '232');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2011.128.2ab', '210');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2011.143.3.2ab', '226');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2011.159.6', '213');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2011.163.8ab', '214');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2011.46.1', '220');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2011.51.3', '892');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2012.113.2', '209');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2013.141.1', '215');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2013.39.7', '208');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2013.57', '844');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2014.210.3', '216');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2014.2ab', '221');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2014.46.5ab', '231');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2014.63.59', '212');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2015.115.1ab', '228');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2015.2.4', '211');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2015.247.3', '878');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2016.152.2', '230');
    await handleResults(ICol, WS, 'edanmdm:nmaahc_2019.10.1a-g', '901');
    await handleResults(ICol, WS, 'edanmdm:nmafa_2005-6-17', '240');
    await handleResults(ICol, WS, 'edanmdm:nmafa_2005-6-9', '241');
    await handleResults(ICol, WS, 'edanmdm:nmafa_2007-1-1', '242');
    await handleResults(ICol, WS, 'edanmdm:nmafa_2007-1-2', '243');
    await handleResults(ICol, WS, 'edanmdm:nmafa_2007-1-3', '244');
    await handleResults(ICol, WS, 'edanmdm:nmafa_74-20-1', '247');
    await handleResults(ICol, WS, 'edanmdm:nmafa_74-20-2', '250');
    await handleResults(ICol, WS, 'edanmdm:nmafa_79-16-47', '253');
    await handleResults(ICol, WS, 'edanmdm:nmafa_96-28-1', '254');
    await handleResults(ICol, WS, 'edanmdm:nmafa_96-30-1', '255');
    await handleResults(ICol, WS, 'edanmdm:nmah_1000981', '296');
    await handleResults(ICol, WS, 'edanmdm:nmah_1000982', '294');
    await handleResults(ICol, WS, 'edanmdm:nmah_1000984', '295');
    await handleResults(ICol, WS, 'edanmdm:nmah_1004508', '258');
    await handleResults(ICol, WS, 'edanmdm:nmah_1029149', '276');
    await handleResults(ICol, WS, 'edanmdm:nmah_1029284', '277');
    await handleResults(ICol, WS, 'edanmdm:nmah_1096762', '39');
    await handleResults(ICol, WS, 'edanmdm:nmah_1105750', '127');
    await handleResults(ICol, WS, 'edanmdm:nmah_1108470', '383');
    await handleResults(ICol, WS, 'edanmdm:nmah_1199660', '893');
    await handleResults(ICol, WS, 'edanmdm:nmah_1250962', '372');
    await handleResults(ICol, WS, 'edanmdm:nmah_1251889', '318');
    await handleResults(ICol, WS, 'edanmdm:nmah_1251903', '335');
    await handleResults(ICol, WS, 'edanmdm:nmah_1272680', '315');
    await handleResults(ICol, WS, 'edanmdm:nmah_1449492', '120');
    await handleResults(ICol, WS, 'edanmdm:nmah_1449498', '120');
    await handleResults(ICol, WS, 'edanmdm:nmah_1764061', '126');
    await handleResults(ICol, WS, 'edanmdm:nmah_1816008', '308');
    await handleResults(ICol, WS, 'edanmdm:nmah_1816562', '358');
    await handleResults(ICol, WS, 'edanmdm:nmah_1816726', '350');
    await handleResults(ICol, WS, 'edanmdm:nmah_1816728', '351');
    await handleResults(ICol, WS, 'edanmdm:nmah_1818990', '362');
    await handleResults(ICol, WS, 'edanmdm:nmah_1819662', '352');
    await handleResults(ICol, WS, 'edanmdm:nmah_1820223', '314');
    await handleResults(ICol, WS, 'edanmdm:nmah_1820541', '363');
    await handleResults(ICol, WS, 'edanmdm:nmah_1821317', '359');
    await handleResults(ICol, WS, 'edanmdm:nmah_1822363', '360');
    await handleResults(ICol, WS, 'edanmdm:nmah_1827973', '340');
    await handleResults(ICol, WS, 'edanmdm:nmah_1827978', '344');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828021', '336');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828030', '337');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828078', '338');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828119', '339');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828170', '341');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828269', '342');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828429', '343');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828505', '345');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828510', '346');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828628', '347');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828648', '348');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828839', '307');
    await handleResults(ICol, WS, 'edanmdm:nmah_1828842', '349');
    await handleResults(ICol, WS, 'edanmdm:nmah_1829185', '380');
    await handleResults(ICol, WS, 'edanmdm:nmah_1829332', '373');
    await handleResults(ICol, WS, 'edanmdm:nmah_1829524', '374');
    await handleResults(ICol, WS, 'edanmdm:nmah_1829535', '375');
    await handleResults(ICol, WS, 'edanmdm:nmah_1829542', '376');
    await handleResults(ICol, WS, 'edanmdm:nmah_1830215', '377');
    await handleResults(ICol, WS, 'edanmdm:nmah_1832532', '321');
    await handleResults(ICol, WS, 'edanmdm:nmah_1832985', '378');
    await handleResults(ICol, WS, 'edanmdm:nmah_1837459', '298');
    await handleResults(ICol, WS, 'edanmdm:nmah_1837609', '322');
    await handleResults(ICol, WS, 'edanmdm:nmah_1837621', '323');
    await handleResults(ICol, WS, 'edanmdm:nmah_1838349', '299');
    await handleResults(ICol, WS, 'edanmdm:nmah_1838643', '324');
    await handleResults(ICol, WS, 'edanmdm:nmah_1838644', '325');
    await handleResults(ICol, WS, 'edanmdm:nmah_1838650', '326');
    await handleResults(ICol, WS, 'edanmdm:nmah_1838652', '327');
    await handleResults(ICol, WS, 'edanmdm:nmah_1838676', '300');
    await handleResults(ICol, WS, 'edanmdm:nmah_1841912', '353');
    await handleResults(ICol, WS, 'edanmdm:nmah_1841933', '354');
    await handleResults(ICol, WS, 'edanmdm:nmah_1842503', '355');
    await handleResults(ICol, WS, 'edanmdm:nmah_1843368', '301');
    await handleResults(ICol, WS, 'edanmdm:nmah_1845461', '316');
    await handleResults(ICol, WS, 'edanmdm:nmah_1846255', '331');
    await handleResults(ICol, WS, 'edanmdm:nmah_1846271', '303');
    await handleResults(ICol, WS, 'edanmdm:nmah_1846281', '304');
    await handleResults(ICol, WS, 'edanmdm:nmah_1846344', '305');
    await handleResults(ICol, WS, 'edanmdm:nmah_1846377', '332');
    await handleResults(ICol, WS, 'edanmdm:nmah_1846388', '306');
    await handleResults(ICol, WS, 'edanmdm:nmah_1846391', '319');
    await handleResults(ICol, WS, 'edanmdm:nmah_1847611', '132');
    await handleResults(ICol, WS, 'edanmdm:nmah_1847873', '328');
    await handleResults(ICol, WS, 'edanmdm:nmah_1848079', '302');
    await handleResults(ICol, WS, 'edanmdm:nmah_1849041', '356');
    await handleResults(ICol, WS, 'edanmdm:nmah_1849265', '333');
    await handleResults(ICol, WS, 'edanmdm:nmah_1850922', '309');
    await handleResults(ICol, WS, 'edanmdm:nmah_1851521', '357');
    await handleResults(ICol, WS, 'edanmdm:nmah_1853623', '381');
    await handleResults(ICol, WS, 'edanmdm:nmah_1872415', '379');
    await handleResults(ICol, WS, 'edanmdm:nmah_1896978', '117');
    await handleResults(ICol, WS, 'edanmdm:nmah_1900832', '118');
    await handleResults(ICol, WS, 'edanmdm:nmah_1904639', '121');
    await handleResults(ICol, WS, 'edanmdm:nmah_1904641', '121');
    await handleResults(ICol, WS, 'edanmdm:nmah_1904656', '121');
    await handleResults(ICol, WS, 'edanmdm:nmah_1927378', '115');
    await handleResults(ICol, WS, 'edanmdm:nmah_1939648', '115');
    await handleResults(ICol, WS, 'edanmdm:nmah_1939650', '115');
    await handleResults(ICol, WS, 'edanmdm:nmah_1939654', '115');
    await handleResults(ICol, WS, 'edanmdm:nmah_214477', '283');
    await handleResults(ICol, WS, 'edanmdm:nmah_361750', '123');
    await handleResults(ICol, WS, 'edanmdm:nmah_362153', '119');
    await handleResults(ICol, WS, 'edanmdm:nmah_363781', '128');
    await handleResults(ICol, WS, 'edanmdm:nmah_364445', '122');
    await handleResults(ICol, WS, 'edanmdm:nmah_365585', '134');
    await handleResults(ICol, WS, 'edanmdm:nmah_365586', '135');
    await handleResults(ICol, WS, 'edanmdm:nmah_368509', '133');
    await handleResults(ICol, WS, 'edanmdm:nmah_373625', '116');
    await handleResults(ICol, WS, 'edanmdm:nmah_375161', '131');
    await handleResults(ICol, WS, 'edanmdm:nmah_463506', '889');
    await handleResults(ICol, WS, 'edanmdm:nmah_605482', '256');
    await handleResults(ICol, WS, 'edanmdm:nmah_605485', '263');
    await handleResults(ICol, WS, 'edanmdm:nmah_605487', '264');
    await handleResults(ICol, WS, 'edanmdm:nmah_605498', '265');
    await handleResults(ICol, WS, 'edanmdm:nmah_605500', '267');
    await handleResults(ICol, WS, 'edanmdm:nmah_605503', '270');
    await handleResults(ICol, WS, 'edanmdm:nmah_605507', '271');
    await handleResults(ICol, WS, 'edanmdm:nmah_605519', '293');
    await handleResults(ICol, WS, 'edanmdm:nmah_605596', '274');
    await handleResults(ICol, WS, 'edanmdm:nmah_606746', '273');
    await handleResults(ICol, WS, 'edanmdm:nmah_607621', '272');
    await handleResults(ICol, WS, 'edanmdm:nmah_607647', '262');
    await handleResults(ICol, WS, 'edanmdm:nmah_689864', '36');
    await handleResults(ICol, WS, 'edanmdm:nmah_703292', '37');
    await handleResults(ICol, WS, 'edanmdm:nmah_703302', '38');
    await handleResults(ICol, WS, 'edanmdm:nmah_703318', '40');
    await handleResults(ICol, WS, 'edanmdm:nmah_703325', '43');
    await handleResults(ICol, WS, 'edanmdm:nmah_705564', '41');
    await handleResults(ICol, WS, 'edanmdm:nmah_712417', '44');
    await handleResults(ICol, WS, 'edanmdm:nmah_739714', '288');
    await handleResults(ICol, WS, 'edanmdm:nmah_739715', '290');
    await handleResults(ICol, WS, 'edanmdm:nmah_739716', '284');
    await handleResults(ICol, WS, 'edanmdm:nmah_748903', '114');
    await handleResults(ICol, WS, 'edanmdm:nmah_763853', '257');
    await handleResults(ICol, WS, 'edanmdm:nmah_911374', '310');
    await handleResults(ICol, WS, 'edanmdm:nmah_911375', '361');
    await handleResults(ICol, WS, 'edanmdm:nmah_920560', '311');
    await handleResults(ICol, WS, 'edanmdm:nmah_920740', '297');
    await handleResults(ICol, WS, 'edanmdm:nmah_923037', '365');
    await handleResults(ICol, WS, 'edanmdm:nmah_923043', '371');
    await handleResults(ICol, WS, 'edanmdm:nmah_923083', '366');
    await handleResults(ICol, WS, 'edanmdm:nmah_923113', '367');
    await handleResults(ICol, WS, 'edanmdm:nmah_923116', '368');
    await handleResults(ICol, WS, 'edanmdm:nmah_923122', '312');
    await handleResults(ICol, WS, 'edanmdm:nmah_923126', '369');
    await handleResults(ICol, WS, 'edanmdm:nmah_923135', '313');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8010183', '412');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8010185', '411');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8010270', '428');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8061118', '402');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8061135', '404');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8061530', '405');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8061534', '406');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8061757', '407');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8061963', '401');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8096367', '413');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8098412', '414');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8098584', '415');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8099755', '416');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8100879', '417');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8108582', '418');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8108704', '419');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8108706', '420');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8109761', '422');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8114628', '781');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8114952', '423');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8115528', '424');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8115597', '425');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8131572', '431');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8131573', '432');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8131574', '433');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8131634', '434');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8131636', '435');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8131639', '436');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8135263', '437');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8145707', '426');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8146561', '427');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8168564', '874');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8319024', '408');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8344757', '882');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8358271', '438');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8386869', '409');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8440830', '430');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8471498', '439');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8477947', '388');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8478070', '388');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8480378', '440');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8480424', '429');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8552275', '568');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8552277', '569');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8552280', '570');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8552281', '571');
    await handleResults(ICol, WS, 'edanmdm:nmnhanthropology_8939937', '410');
    await handleResults(ICol, WS, 'edanmdm:nmnheducation_11380100', '171');
    await handleResults(ICol, WS, 'edanmdm:nmnheducation_11380180', '167');
    await handleResults(ICol, WS, 'edanmdm:nmnheducation_11412946', '163');
    await handleResults(ICol, WS, 'edanmdm:nmnheducation_11413164', '168');
    await handleResults(ICol, WS, 'edanmdm:nmnheducation_15006160', '152');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_10041048', '461');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_10166790', '457');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_10197893', '524');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_10273681', '458');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_10530', '459');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_10703', '460');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_10795', '537');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_11009', '514');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_11042783', '472');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_11058167', '544');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_11162', '462');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_11277082', '510');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_11949', '463');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_12306', '465');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_12487', '466');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_13079', '467');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_13080', '468');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_13082', '469');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_13587547', '548');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_13935', '518');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_14138516', '525');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_14379', '470');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_14572', '523');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_14586', '522');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_14674', '471');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_14843', '539');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_14861', '473');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_15163', '519');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_15463', '475');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_16050', '521');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_16151', '520');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_16552', '476');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17174', '477');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17182', '478');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17325', '479');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17352', '480');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17355', '481');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17478', '482');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17480', '517');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17505', '483');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17599', '484');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17749', '485');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_17764', '448');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_18131', '505');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_22484', '488');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_22889', '549');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_28962', '535');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_29968', '509');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_30966', '489');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_31148', '490');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_323138', '504');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_36632', '491');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_38482', '492');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_42089', '493');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_44873', '512');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_45832', '494');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_45849', '495');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_46797', '496');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_48206', '497');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_48461', '498');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_51231', '528');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_53176', '526');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_536521', '534');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_55480', '499');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_55498', '515');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_61392', '500');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_62922', '501');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_62996', '502');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_65106', '503');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_65179', '516');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_79438', '532');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_810553', '513');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_821965', '533');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_9333269', '506');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_942321', '450');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_942505', '451');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_942916', '452');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_949688', '530');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_949712', '507');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_950401', '454');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_957075', '527');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_957085', '487');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_957944', '486');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_962463', '455');
    await handleResults(ICol, WS, 'edanmdm:nmnhinvertebratezoology_970701', '456');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_10016796', '716');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_10016797', '717');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_10016802', '718');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_10016803', '719');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_10016808', '720');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_10250729', '158');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_10369553', '553');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_10611715', '721');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_10611750', '744');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_11231535', '821');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_11467726', '695');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_11635207', '722');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_11825684', '809');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_11872942', '751');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307021', '698');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307068', '745');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307073', '708');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307093', '683');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307115', '749');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307176', '768');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307204', '678');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307212', '164');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307214', '770');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307233', '723');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307240', '724');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_12307243', '772');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3001151', '691');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3007346', '747');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3007506', '725');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3022367', '165');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3109802', '715');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3114250', '727');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3122122', '728');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3122141', '752');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3126953', '773');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3129300', '774');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3137102', '753');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3176889', '709');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3176892', '710');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3176902', '711');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3176903', '712');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3179870', '811');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3188143', '763');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3188192', '713');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3188200', '714');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3188809', '766');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3302876', '160');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3302895', '823');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3309799', '690');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3318324', '897');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3324894', '819');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3332832', '822');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3333940', '815');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3340244', '705');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3341924', '699');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3341937', '700');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3341954', '688');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3342215', '701');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3342697', '742');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3342978', '735');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3368445', '817');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3368446', '818');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3368531', '816');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3369538', '154');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3370783', '156');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3377843', '734');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3384611', '834');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3385086', '692');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3389255', '824');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3393299', '812');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3393300', '813');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3393301', '814');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3393407', '820');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3393409', '831');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3393470', '830');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3397958', '696');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3415628', '702');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3421187', '758');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3423820', '779');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3425397', '776');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3425518', '731');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3427467', '778');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3427676', '703');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3427760', '729');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3427936', '833');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3427971', '733');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3428171', '739');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3428214', '740');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3428388', '825');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3429219', '730');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3431464', '556');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3431469', '552');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3439417', '754');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3439470', '732');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3440470', '810');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3440721', '694');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3446186', '871');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3446197', '673');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3447044', '155');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3447759', '790');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3447777', '884');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3448898', '741');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3448991', '693');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3449928', '707');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3450090', '736');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3450091', '737');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3450092', '738');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3450132', '756');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3451037', '743');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3451097', '793');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3451166', '706');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3453577', '780');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3457273', '161');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3457297', '827');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3457406', '829');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3457407', '832');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3572783', '204');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3573298', '159');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3577488', '162');
    await handleResults(ICol, WS, 'edanmdm:nmnhpaleobiology_3580352', '157');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4091696', '611');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4092671', '593');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4103596', '578');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4103600', '584');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4105734', '617');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4113049', '599');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4113270', '602');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4113913', '620');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4114243', '581');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4114544', '572');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4115950', '625');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4119824', '614');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4123288', '590');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4123616', '596');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4125718', '575');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4175860', '608');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_4278661', '605');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_5036822', '453');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_5144419', '529');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_5148470', '464');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_5152704', '474');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_6341612', '511');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_7289628', '149');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_7413792', '551');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_7511097', '150');
    await handleResults(ICol, WS, 'edanmdm:nmnhvz_7511102', '151');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.2006.5', '800');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.2008.3', '801');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.70.4', '797');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.71.24', '798');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.71.26', '799');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.74.16', '804');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.75.16', '899');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.75.17', '898');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.76.27', '805');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.82.TC83', '806');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.85.8', '807');
    await handleResults(ICol, WS, 'edanmdm:npg_NPG.99.112', '808');
    await handleResults(ICol, WS, 'edanmdm:npg_S_NPG.71.6', '796');
    await handleResults(ICol, WS, 'edanmdm:npm_0.279483.3', '885');
    await handleResults(ICol, WS, 'edanmdm:ofeo-sg_2008-1264A', '847');
    await handleResults(ICol, WS, 'edanmdm:saam_1910.10.3', '886');
    await handleResults(ICol, WS, 'edanmdm:saam_1968.155.136', '840');
    await handleResults(ICol, WS, 'edanmdm:saam_1968.155.8', '841');
    await handleResults(ICol, WS, 'edanmdm:siris_sil_1044709', '888');
    await handleResults(ICol, WS, 'Eulaema Bee', '846');
    await handleResults(ICol, WS, 'ExhibitID-917', '681');
    await handleResults(ICol, WS, 'fedora lindbergh ', '190');
    await handleResults(ICol, WS, 'Fossil Whale MPC 677', '881');
    await handleResults(ICol, WS, 'Fossil Whale MPC 684', '879');
    await handleResults(ICol, WS, 'gongora', '850');
    await handleResults(ICol, WS, 'Grancino, Giovanni Vn SI', '266');
    await handleResults(ICol, WS, 'green helmet ', '192');
    await handleResults(ICol, WS, 'Guarneri del Gesu Vn \'Baron Vitta\' 1730 SIL LOC', '268');
    await handleResults(ICol, WS, 'Guarneri del Gesu Vn \'Kreisler\' 1732  LOC', '269');
    await handleResults(ICol, WS, 'Haw Mummy 454235', '641');
    await handleResults(ICol, WS, 'Hawkbill Turtle Taxidermy', '449');
    await handleResults(ICol, WS, 'helmet a', '193');
    await handleResults(ICol, WS, 'helmet type m1917 ', '194');
    await handleResults(ICol, WS, 'Honey Bee', '851');
    await handleResults(ICol, WS, 'http://n2t.net/ark:/65665/3c32276ea-e29b-49b7-b699-2a57a621b6e6', '567');
    await handleResults(ICol, WS, 'http://n2t.net/ark:/65665/3c34fa78d-02b8-4c1e-8a2a-2429ef6ab6a1', '689');
    await handleResults(ICol, WS, 'https://collection.cooperhewitt.org/objects/18726645/', '10');
    await handleResults(ICol, WS, 'Ibis Metal', '642');
    await handleResults(ICol, WS, 'Ibis Mummy', '643');
    await handleResults(ICol, WS, 'impeller unknown ', '196');
    await handleResults(ICol, WS, 'Ivory Tusk 2005-6-135', '239');
    await handleResults(ICol, WS, 'Ivory Tusk 72-33-14', '245');
    await handleResults(ICol, WS, 'Ivory Tusk 73-12-1', '246');
    await handleResults(ICol, WS, 'Jones Beaded Purse', '222');
    await handleResults(ICol, WS, 'JuJu Drumsticks', '223');
    await handleResults(ICol, WS, 'Kuduo Vessel', '224');
    await handleResults(ICol, WS, 'Leather Shoes', '225');
    await handleResults(ICol, WS, 'Library of Congress Ornament', '863');
    await handleResults(ICol, WS, 'lindbergh bank ', '197');
    await handleResults(ICol, WS, 'lycaste_aromatica', '852');
    await handleResults(ICol, WS, 'Mesa Redonda', '397');
    await handleResults(ICol, WS, 'Microfossil 401478', '166');
    await handleResults(ICol, WS, 'Microfossil 402809', '170');
    await handleResults(ICol, WS, 'Monticello Model', '233');
    await handleResults(ICol, WS, 'Mr Cox Mummy', '644');
    await handleResults(ICol, WS, 'Mr Jones Mummy', '645');
    await handleResults(ICol, WS, 'Ms Anni Mummy', '646');
    await handleResults(ICol, WS, 'Mummy A 126790', '647');
    await handleResults(ICol, WS, 'Mummy A 1564', '648');
    await handleResults(ICol, WS, 'Mummy A 1565', '649');
    await handleResults(ICol, WS, 'Mummy A 1566', '650');
    await handleResults(ICol, WS, 'Mummy A 278365', '651');
    await handleResults(ICol, WS, 'Mummy A 279283', '652');
    await handleResults(ICol, WS, 'Mummy A 279285', '653');
    await handleResults(ICol, WS, 'Mummy A 279286', '654');
    await handleResults(ICol, WS, 'Mummy A 279287', '655');
    await handleResults(ICol, WS, 'Mummy A 316508', '656');
    await handleResults(ICol, WS, 'Mummy A 381569', '657');
    await handleResults(ICol, WS, 'Mummy A 381570', '658');
    await handleResults(ICol, WS, 'Mummy A 381571', '659');
    await handleResults(ICol, WS, 'Mummy A 381572', '660');
    await handleResults(ICol, WS, 'Mummy A 435221', '661');
    await handleResults(ICol, WS, 'Mummy A 437431', '662');
    await handleResults(ICol, WS, 'Mummy A 454235', '663');
    await handleResults(ICol, WS, 'Mummy A 508142', '664');
    await handleResults(ICol, WS, 'Mummy A 528481-0', '665');
    await handleResults(ICol, WS, 'Mummy A 74579', '666');
    await handleResults(ICol, WS, 'Mummy A 74586', '667');
    await handleResults(ICol, WS, 'Mummy AT 5604', '668');
    await handleResults(ICol, WS, 'Mummy AT 5605', '669');
    await handleResults(ICol, WS, 'Mummy P 381235', '670');
    await handleResults(ICol, WS, 'Mummy S 39475', '671');
    await handleResults(ICol, WS, 'ndp-acrophoca', '682');
    await handleResults(ICol, WS, 'NMAH 20 dollar coin', '382');
    await handleResults(ICol, WS, 'NMAH bee pendant', '384');
    await handleResults(ICol, WS, 'NMAH Cornerstone', '894');
    await handleResults(ICol, WS, 'NMAH decadrachm', '385');
    await handleResults(ICol, WS, 'NMAH euro', '386');
    await handleResults(ICol, WS, 'NMAH tetradrachm', '387');
    await handleResults(ICol, WS, 'NMAH Vannevar Kiplinger Statue', '895');
    await handleResults(ICol, WS, 'NMNH Bonebed Analysis', '786');
    await handleResults(ICol, WS, 'NMNH Camptosaurus', '787');
    await handleResults(ICol, WS, 'NMNH Catfish', '788');
    await handleResults(ICol, WS, 'NMNH Chiton', '789');
    await handleResults(ICol, WS, 'NMNH Ichthyosaur', '441');
    await handleResults(ICol, WS, 'NMNH Jorge Fossil', '791');
    await handleResults(ICol, WS, 'NMNH Kennicott Bust', '628');
    await handleResults(ICol, WS, 'NMNH Kennicott Skull', '629');
    await handleResults(ICol, WS, 'NMNH OEC Tree (pella sp? tree)', '792');
    await handleResults(ICol, WS, 'nmnh-USNM_PAL_00095661', '760');
    await handleResults(ICol, WS, 'nmnh-USNM_S_0001170A', '775');
    await handleResults(ICol, WS, 'Ontocetus emmonsi (USNM PAL 329064)', '676');
    await handleResults(ICol, WS, 'oxygen bottle ', '198');
    await handleResults(ICol, WS, 'Peresson, Sergio Va 1986 SI', '275');
    await handleResults(ICol, WS, 'Presidents of Christmas Past and Present Ornament', '864');
    await handleResults(ICol, WS, 'Raqchi Qolcas', '392');
    await handleResults(ICol, WS, 'rmh-1990_011', '684');
    await handleResults(ICol, WS, 'rmh-2002_277', '685');
    await handleResults(ICol, WS, 'rmh-2005_703', '686');
    await handleResults(ICol, WS, 'Sauropod Vertebra', '794');
    await handleResults(ICol, WS, 'Sculpin Hat - Repaired Model', '785');
    await handleResults(ICol, WS, 'shell mermaids comb', '531');
    await handleResults(ICol, WS, 'Sleigh on the White House Ornament', '865');
    await handleResults(ICol, WS, 'slipper_orchid', '853');
    await handleResults(ICol, WS, 'Slippers with flag', '845');
    await handleResults(ICol, WS, 'sloth (upright) articulated skeleton', '838');
    await handleResults(ICol, WS, 'Snake Mummy', '672');
    await handleResults(ICol, WS, 'Stainer, Jacob Va 1678 SIL', '278');
    await handleResults(ICol, WS, 'Stainer, Jacob Vn 1645 SIL', '279');
    await handleResults(ICol, WS, 'Stainer, Jacob Vn 1661 SIL', '280');
    await handleResults(ICol, WS, 'Stainer, Jacob Vn c1650 SI', '281');
    await handleResults(ICol, WS, 'Star of Bliss Ornament', '866');
    await handleResults(ICol, WS, 'Stegosaurus articulated skeleton', '839');
    await handleResults(ICol, WS, 'Stoneware Jug', '229');
    await handleResults(ICol, WS, 'Stoneware jug created by Thomas Commeraw', '842');
    await handleResults(ICol, WS, 'Stradivari C \'Castelbarco\' 1697 LOC', '282');
    await handleResults(ICol, WS, 'Stradivari Va \'Cassavetti\' 1727 LOC', '285');
    await handleResults(ICol, WS, 'Stradivari Vn \'Betts\' 1704 LOC', '286');
    await handleResults(ICol, WS, 'Stradivari Vn \'Castelbarco\' 1699 LOC', '287');
    await handleResults(ICol, WS, 'Stradivari Vn \'Hellier\' 1679 SIL', '289');
    await handleResults(ICol, WS, 'Stradivari Vn \'Sunrise\' 1677 SIL', '291');
    await handleResults(ICol, WS, 'Stradivari Vn \'Ward\' 1700 LOC', '292');
    await handleResults(ICol, WS, 'Talpanas 3Dpring Pelvis', '623');
    await handleResults(ICol, WS, 'Talpanas C10', '624');
    await handleResults(ICol, WS, 'Thomas Jefferson Statue', '234');
    await handleResults(ICol, WS, 'Tusk: 68-23-53', '235');
    await handleResults(ICol, WS, 'Tusk: 71-17-12', '236');
    await handleResults(ICol, WS, 'Tyrannosaurus rex (individual bones)', '205');
    await handleResults(ICol, WS, 'Unknown Bee 1', '854');
    await handleResults(ICol, WS, 'Unknown Bee 2', '855');
    await handleResults(ICol, WS, 'Unknown Bee 4', '856');
    await handleResults(ICol, WS, 'usnm_pal_222302', '687');
    await handleResults(ICol, WS, 'usnm-pal-27088', '697');
    await handleResults(ICol, WS, 'usnm-s-1170a', '726');
    await handleResults(ICol, WS, 'violoncello piccolo pegbox/head', '896');
    await handleResults(ICol, WS, 'Whale MPC 675', '880');
    await handleResults(ICol, WS, 'Winter Holiday Snowflake Ornament', '867');
    await handleResults(ICol, WS, 'Winter Wonderland of Innovation Ornament', '868');
    await handleResults(ICol, WS, 'Wooly shirt', '125');
    await handleResults(ICol, WS, 'Wright Bicycle', '203');

    if (WS)
        WS.end();
}

export async function scrapeDPOEdanListsMigrationMDM(ICol: COL.ICollection, fileName: string): Promise<void> {
    jest.setTimeout(1000 * 60 * 60);   // 1 hour

    const WS: NodeJS.WritableStream = await fs.createWriteStream(fileName, { 'flags': 'a' });
    if (!WS)
        LOG.info(`Unable to create writeStream for ${fileName}`, LOG.LS.eTEST);
    WS.write('id\tname\tunit\tidentifierPublic\tidentifierCollection\trecords\n');

    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1580421846495-1581618317463-0', '141', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1580421846495-1581619988547-0', '399', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1580421846495-1581618462852-0', '180', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1580421846495-1581355895303-0', '173', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656586819890-1656639283574-0', '920', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656586819890-1656703024090-0', '911', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656414186682-1656702965563-0', '937', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656500476665-1656703241436-0', '903', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656586819890-1656703282186-0', '907', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656586819890-1656639432917-0', '934', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656414186682-1656639323814-0', '923', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1601388908954-1602191481746-0', '120', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656414186682-1656703065444-0', '914', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656586819890-1656639364064-0', '930', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656414186682-1656703126116-0', '916', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1601388908954-1602190270053-0', '121', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1601389276209-1602191757227-0', '115', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656586819890-1656639541754-0', '935', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1656414186682-1656702911409-0', '936', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1580421846495-1581628550322-0', '388', 'SI');
    await handleResultsEdanLists(ICol, WS, 'edanlists:p2b-1580421846495-1581618944850-0', '204', 'SI');
}
// #endregion

async function scrapeDPOIDsWorker(ICol: COL.ICollection, IDLabelSet: Set<string>, records: EdanResult[]): Promise<void> {
    // #region vz_migration
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049110', '12280', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049111', '12490', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049112', '10456', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049114', '12121', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049115', '11283', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049116', '11081', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049117', '11125', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049119', '10479', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049121', '11102', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049122', '12124', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049123', '12491', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049124', '11219', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049166', '11622', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049171', '12492', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049174', '11380', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049175', '10835', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049177', '10496', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049179', '12493', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049183', '10587', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049185', '12027', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049189', '12417', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049191', '11328', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049195', '10574', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049197', '12380', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049201', '12494', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049204', '12313', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049206', '12495', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10049207', '12496', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10058410', '12289', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10058413', '10457', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10058417', '11540', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10058436', '10148', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10058589', '11917', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10059183', '11494', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10201159', '11733', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10201163', '11227', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10201164', '10803', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10201165', '11009', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10201166', '11712', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10201168', '10258', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10201169', '12499', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10201171', '10265', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10201173', '10595', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10588160', '10286', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_10877555', '12500', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_6074558', '10499', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7001894', '11742', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7014817', '11155', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7015141', '10261', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7036160', '10288', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7036569', '11637', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7036573', '10463', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7036574', '10285', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7038560', '10363', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7038575', '10138', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7038579', '10142', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7045007', '10314', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047645', '10222', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047655', '10604', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047769', '11260', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047770', '10190', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047834', '10359', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047851', '10498', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047853', '11996', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047857', '10206', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047858', '10153', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7047890', '10420', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048355', '10725', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048361', '10144', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048365', '11220', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048366', '10339', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048367', '10413', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048368', '10561', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048369', '10567', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048370', '11961', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048374', '10612', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048733', '10340', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048735', '10446', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048737', '10800', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048738', '11337', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048740', '11442', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048741', '10386', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048746', '11952', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048747', '11347', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7048763', '10534', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7049175', '10611', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7049315', '10427', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7049543', '11097', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7049664', '10770', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7052220', '10236', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7052225', '10277', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7069506', '10226', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7071972', '10325', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7073771', '10101', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7073868', '10790', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7089922', '12551', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7146268', '12574', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7154787', '12597', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7154788', '12599', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7184509', '12601', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7226638', '10628', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7226906', '10862', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7226908', '11439', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7227753', '10794', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7228227', '10240', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7228228', '11100', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232000', '10158', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232002', '10263', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232003', '10315', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232004', '10264', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232006', '10184', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232008', '10134', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232009', '10237', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232010', '10260', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232011', '10151', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232012', '10225', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232013', '10116', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232014', '10199', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232015', '10192', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232016', '10154', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232017', '10282', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232018', '10096', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232019', '10186', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7232020', '10187', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7235149', '10316', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7235955', '10099', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7235956', '12620', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7235957', '12622', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7235958', '12624', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7235959', '12626', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236065', '12628', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236128', '10211', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236129', '10209', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236145', '10130', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236146', '10267', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236271', '12630', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236272', '12631', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236273', '12633', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236274', '10108', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236281', '10182', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236282', '10220', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236284', '10160', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236286', '10135', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236287', '10241', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236288', '10207', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236289', '10175', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236365', '10298', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236366', '10166', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236367', '10214', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236369', '10289', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236370', '10098', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236372', '11035', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7236431', '11876', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7237059', '10162', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7241006', '11560', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7241014', '10284', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7241148', '10301', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7241152', '10157', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7241154', '11193', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7242898', '10813', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7242901', '10536', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7242910', '10715', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7242911', '11662', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7242912', '12248', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243029', '11319', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243097', '11506', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243098', '10335', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243261', '11508', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243265', '11437', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243267', '11801', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243268', '10531', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243270', '11479', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243271', '11428', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243605', '11632', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243710', '10306', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243739', '11718', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243740', '12639', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243742', '10980', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7243743', '10683', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7244091', '11019', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7244092', '10481', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245472', '10752', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245536', '10185', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245540', '10553', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245544', '10276', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245548', '11497', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245554', '11101', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245555', '12093', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245557', '10716', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245558', '10579', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245559', '11571', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245560', '10556', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245561', '11291', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245562', '10543', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245566', '10517', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245732', '10125', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245734', '10985', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7245822', '10545', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246054', '12642', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246080', '11535', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246085', '10104', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246087', '12109', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246088', '10917', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246089', '11607', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246090', '10805', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246091', '10570', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246405', '10146', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246416', '10637', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246418', '10844', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246485', '10905', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246507', '11922', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246852', '10645', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246935', '12646', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7246973', '10183', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250589', '10990', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250602', '11184', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250603', '11070', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250604', '11131', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250605', '11042', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250606', '10969', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250608', '11427', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250995', '10380', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250996', '11059', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250997', '10323', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250998', '10714', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7250999', '11257', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251000', '11629', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251001', '11548', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251002', '12049', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251004', '11850', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251005', '11365', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251006', '10376', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251007', '10972', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251008', '10631', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251009', '12656', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251010', '12489', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251011', '10492', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251012', '11958', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251013', '11641', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251014', '12051', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251015', '10675', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251016', '12658', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251017', '10671', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251018', '10757', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251019', '10954', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251020', '11837', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251021', '10502', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251022', '10975', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251023', '11846', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251024', '10710', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251025', '12117', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251038', '10451', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251048', '11322', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251054', '10215', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251551', '10590', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251552', '11249', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251553', '10831', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251554', '11258', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251555', '11166', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251556', '10535', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251557', '11017', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251558', '10768', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251560', '10989', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251561', '11161', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251562', '11179', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251565', '11274', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251566', '11606', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251571', '10352', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251572', '10384', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251573', '10408', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251575', '10324', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251576', '10383', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251578', '10447', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251579', '10337', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251580', '10360', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251581', '10388', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251582', '10329', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251583', '10571', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251584', '10694', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251585', '10539', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251586', '10444', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251587', '10458', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251588', '10462', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251791', '10143', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251792', '10950', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251793', '11106', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251794', '10495', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251795', '11797', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7251992', '12683', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252126', '11424', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252513', '11547', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252514', '10347', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252515', '10606', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252516', '12468', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252517', '10432', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252518', '10356', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252519', '10348', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252520', '10351', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252521', '10333', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252522', '10411', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252523', '10361', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252524', '10640', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252525', '11491', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252526', '10622', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252527', '11037', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252528', '10681', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252529', '12724', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252530', '10509', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252531', '12726', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252532', '11057', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252533', '10599', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252536', '10646', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252537', '10281', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252538', '11221', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7252539', '10855', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254298', '11438', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254299', '10514', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254300', '11144', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254301', '12480', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254302', '11034', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254303', '10415', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254985', '10244', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254992', '11330', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254993', '10322', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254994', '11262', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254995', '11795', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7254996', '12057', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255000', '10670', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255001', '11820', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255002', '12041', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255003', '10978', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255004', '11591', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255005', '10751', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255006', '11158', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255007', '12448', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255008', '11624', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255009', '12140', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255010', '12733', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255011', '10486', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255012', '10405', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255013', '10358', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255014', '10957', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255015', '10788', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255016', '10828', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255017', '10387', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255018', '10660', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255019', '12465', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255020', '10465', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255021', '11463', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255022', '12236', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255023', '11716', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255024', '11968', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255025', '11335', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255026', '10999', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255224', '10435', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255226', '10475', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255227', '10762', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255228', '10727', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255229', '11951', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255230', '10776', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255295', '11289', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255296', '11199', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255341', '10916', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255342', '11415', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255558', '12740', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255559', '12742', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255795', '10332', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7255842', '10840', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7257408', '11198', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260119', '10515', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260120', '11093', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260888', '11182', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260889', '10430', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260890', '11661', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260891', '11151', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260892', '11503', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260893', '11429', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260894', '10586', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260895', '10379', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260897', '10722', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260898', '10860', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260899', '11394', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260900', '10899', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260901', '10357', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260903', '10439', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260904', '11242', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260905', '12074', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260906', '11049', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260907', '11507', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260908', '11089', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260909', '12749', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260910', '12413', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260911', '10563', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7260912', '11282', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261509', '11663', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261510', '12076', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261511', '10508', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261512', '11409', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261513', '11502', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261514', '10609', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261515', '10581', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261516', '11239', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261517', '11088', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261518', '11265', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261519', '12455', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261520', '11999', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261521', '12013', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261522', '12754', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261523', '10951', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261524', '10597', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261525', '12323', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261526', '11201', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261527', '10326', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261528', '10193', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261529', '10113', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261530', '10876', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261531', '10494', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261532', '10378', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261533', '10747', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261535', '10429', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261536', '10300', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261537', '10293', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261538', '10880', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261539', '10680', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261540', '11984', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261541', '10804', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261542', '10964', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261543', '10738', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261544', '12763', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261545', '10690', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261546', '11498', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7261968', '10256', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7263697', '10262', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7263727', '10290', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7264213', '11203', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266118', '12764', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266240', '10235', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266456', '12137', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266457', '10821', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266458', '10355', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266459', '10596', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266460', '10700', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266476', '10317', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266618', '10194', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266645', '10094', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266789', '11398', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266810', '10848', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266811', '10522', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266976', '12105', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266977', '10701', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266978', '10826', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266979', '10445', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266980', '10721', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266981', '11206', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266983', '11104', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266985', '11835', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7266990', '10095', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267002', '10171', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267206', '10269', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267215', '11928', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267216', '11412', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267217', '10920', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267218', '10936', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267436', '10490', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267437', '10504', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267438', '10449', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7267765', '10268', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7268466', '10783', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7268467', '10959', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7268468', '11331', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7274532', '12260', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275094', '12768', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275096', '12770', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275272', '11091', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275274', '10338', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275275', '10331', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275276', '11652', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275277', '10330', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275278', '10328', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275279', '11775', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275280', '12184', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275428', '10684', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275429', '10526', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275430', '10416', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275431', '10425', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275479', '10120', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275481', '12126', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275484', '10342', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7275656', '12783', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7282313', '10719', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7282368', '12785', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7282369', '12787', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7282372', '12789', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7282373', '12791', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7282468', '10589', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7282469', '11955', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7282474', '10484', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283143', '12792', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283144', '12794', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283697', '10942', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283698', '11393', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283884', '11367', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283926', '11691', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283927', '10487', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283928', '10513', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283929', '10575', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7283930', '10636', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284091', '10442', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284092', '11053', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284095', '11834', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284145', '11116', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284146', '11660', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284172', '10904', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284211', '10934', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284263', '10253', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284264', '10213', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284265', '10128', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284266', '10252', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284268', '10294', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7284289', '10755', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287783', '11273', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287784', '10765', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287800', '12164', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287801', '11730', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287802', '10532', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287803', '10346', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287804', '11177', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287876', '11640', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287877', '10749', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287878', '11628', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287879', '10713', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287880', '11195', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287881', '11281', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7287882', '10521', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7288093', '12800', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7288149', '10846', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7288150', '12015', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7288151', '12409', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7288160', '11445', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7288728', '10155', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7288827', '11782', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7288879', '10176', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289092', '10200', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289094', '10189', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289131', '10147', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289185', '10872', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289297', '10232', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289301', '10266', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289302', '10372', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289421', '10121', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289422', '10391', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289486', '11971', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289487', '11114', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289493', '11169', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289494', '11889', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289496', '10159', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289702', '10464', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7290162', '10292', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7290193', '10712', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7290498', '12335', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7290499', '11700', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7292666', '10382', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7293092', '12808', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7293196', '11720', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7293197', '10460', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7293232', '10674', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7293268', '11241', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7293507', '10279', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7293829', '10511', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7293836', '12810', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7293919', '10367', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7294026', '10109', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7294042', '11085', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7294043', '10858', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7294126', '12812', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7294138', '11368', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7294165', '10886', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7294169', '12814', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7296158', '12134', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7296466', '11553', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297147', '10127', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297149', '10181', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297150', '10319', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297152', '10283', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297155', '10245', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297156', '10124', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297157', '10318', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297158', '10149', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297159', '10123', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297160', '10208', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297161', '10115', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297162', '10238', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297163', '10219', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297167', '10313', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297169', '10201', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297170', '10145', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297172', '10246', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297174', '10259', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297175', '10243', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297176', '10165', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297178', '10140', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297181', '10197', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297186', '10205', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297188', '10106', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297189', '10172', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297190', '10097', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297192', '10178', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297193', '10111', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297195', '10302', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297197', '10228', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297198', '10251', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297200', '10304', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297238', '10271', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297240', '10169', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297311', '10223', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297315', '10321', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297489', '11162', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297593', '12206', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297619', '10224', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297726', '11593', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297799', '10659', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297859', '10132', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297865', '10133', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297893', '10161', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297894', '12815', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7297895', '10136', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7298326', '10114', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7301543', '10519', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7301698', '10873', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7301714', '10249', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7301758', '11525', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7301795', '10191', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7301920', '10309', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7302058', '10167', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7302061', '10102', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7302062', '10247', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7302064', '10139', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7302070', '10195', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7302266', '10270', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7302538', '11181', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7302619', '10864', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303110', '12819', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303464', '10126', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303589', '10272', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303593', '10305', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303595', '10198', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303602', '12482', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303682', '10216', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303795', '10373', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303800', '10993', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303801', '12249', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303802', '11470', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303803', '12182', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303948', '10576', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303955', '12823', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7303956', '11678', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7304571', '12047', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7304858', '11486', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7304916', '11324', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7305150', '10529', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7305281', '11255', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7305282', '11537', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306239', '10217', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306242', '10295', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306270', '10296', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306331', '10297', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306716', '10179', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306926', '10474', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306932', '11760', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306946', '10639', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306960', '11620', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306961', '11153', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306962', '10410', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306963', '10345', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306964', '11290', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306965', '10908', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306966', '10890', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306967', '11299', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306968', '10548', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306969', '10566', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306970', '11261', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306971', '10739', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7306972', '10686', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7308836', '11611', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7308842', '12250', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7309097', '10112', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7309550', '10156', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7309876', '10377', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7309877', '11741', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7309878', '12073', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7309898', '11916', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7309899', '11336', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7312291', '10845', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7312674', '10248', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7312711', '10218', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7312847', '10174', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7312972', '10275', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7312979', '10273', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7313139', '10254', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7313289', '10196', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7313290', '10312', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7313291', '10164', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7313292', '10230', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7313297', '10280', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7314939', '11307', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7314940', '11067', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7316933', '10103', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7316934', '10233', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7317217', '10141', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7317220', '10188', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7317842', '11163', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7317931', '12828', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7318144', '10117', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7319339', '12053', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7322081', '10110', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7332445', '10311', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7339497', '10231', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7339513', '12830', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7340275', '10168', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7340285', '10824', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7340306', '11549', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7340349', '10129', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7340356', '10299', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7340419', '10170', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7340421', '10307', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7346645', '10202', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7355845', '10274', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7356380', '10291', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7356390', '10173', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7356394', '10731', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7356396', '10469', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7359784', '11753', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7359866', '11074', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7359953', '11421', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7360716', '10830', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7360724', '10278', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7360725', '10250', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7360738', '12006', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7360741', '10802', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7360749', '10414', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7360750', '10341', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7367334', '11446', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7380633', '10119', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7381123', '10657', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7385077', '10210', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7389698', '10221', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7389725', '10287', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7389729', '10229', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7389876', '10242', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7389881', '10204', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7389882', '10100', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7389884', '10255', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7389886', '10308', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7389892', '10203', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7390059', '10150', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7390060', '10177', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7390061', '10234', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7391046', '11410', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7392012', '12855', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7392148', '10105', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7392551', '10482', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7393308', '11562', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7393309', '11099', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7403699', '12885', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7405438', '10320', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7405444', '10310', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7406075', '10122', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7409949', '10381', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412186', '10664', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412635', '10303', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412637', '10239', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412676', '10842', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412693', '10944', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412694', '10398', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412695', '10784', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412696', '10960', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412697', '10704', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412698', '10867', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412699', '10748', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412700', '10619', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412701', '11403', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412702', '10626', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412703', '10924', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7412704', '11748', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7413547', '11167', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7413910', '10923', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7413915', '10227', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7422943', '12892', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7422944', '12894', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7423399', '10118', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7423459', '10327', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7423465', '12899', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7423645', '12901', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7423646', '12903', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7423802', '10212', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7424525', '11865', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7424581', '12906', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7424582', '10472', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7424586', '10641', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7424604', '11714', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7424616', '10137', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7424645', '12909', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7424655', '10107', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7491715', '10131', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7491720', '11079', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7523533', '10257', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7523856', '10737', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7547483', '12911', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7580137', '10818', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7580805', '10393', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7582179', '10480', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7585817', '10782', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7587930', '12453', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7588046', '11464', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7588256', '10163', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7588274', '10436', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7592488', '10180', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7592490', '10152', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7598211', '10889', IDLabelSet, records);
    // #endregion

    // #region master_list
    await handleResultsWithIDs(ICol, 'edanmdm:acm_1996.0008.0001', '999', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1907-1-40', '20', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1910-12-1', '7', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1910-41-1', '3', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1913-45-9-a_b', '9', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1916-19-83-a_b', '12', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1924-6-1', '5', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1931-48-73', '24', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1938-57-306-a_b', '29', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1938-58-1083', '1', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1949-64-7', '11', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1959-144-1', '2', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1962-67-1', '25', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1971-48-12', '4', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1972-79-2', '21', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1984-84-36', '22', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1985-103-49', '17', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1985-103-50', '13', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1985-103-51', '16', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1985-103-52', '15', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1985-103-81', '14', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1985-103-82', '27', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1990-133-3', '30', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_1994-73-2', '19', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_2003-3-1', '18', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_2006-5-1', '6', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_2007-45-13', '23', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_2007-45-14', '28', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_2011-28-1', '8', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_2011-31-1', '26', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:chndm_Carnegie_Mansion', '33', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200001', '146', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200002', '147', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200003', '148', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200004', '142', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200005', '143', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200008', '145', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200009', '784', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200010', '869', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200012', '957', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200013', '175', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200014', '883', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200015', '444', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200016', '446', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200017', '447', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200018', '443', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200019', '445', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200020', '442', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200021', '859', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200023', '861', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200026', '857', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200028', '391', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200029', '390', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200030', '393', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200031', '395', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200032', '394', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200033', '396', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200034', '389', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200035', '400', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200036', '398', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200038', '887', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200039', '550', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200117', '953', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200118', '956', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200119', '958', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200120', '952', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200121', '959', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200122', '954', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200123', '951', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200124', '955', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:dpo_3d_200129', '1001', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1908.236', '877', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1915.109', '113', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1916.345', '110', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1921.1', '111', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1921.2', '112', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1923.15', '875', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1930.54a-b', '108', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1936.6a-b', '870', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1947.15a-b', '876', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1961.33a-b', '109', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1978.40', '45', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1980.14a-c', '57', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1980.191a-c', '55', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1980.192a-c', '56', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1980.193a-b', '64', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1980.194a-b', '63', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1982.15a-c', '62', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1982.16a-b', '93', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1982.17', '46', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1982.18a-b', '67', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1982.19a-b', '47', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1982.20a-b', '68', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1982.21a-b', '103', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1982.22a-b', '104', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1986.19a-b', '48', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1986.20a-b', '81', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1986.21a-c', '82', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1986.4a-b', '101', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1989.1', '65', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.46', '94', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.48a-b', '49', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.49', '69', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.50', '70', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.51', '95', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.58', '91', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.59', '105', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.60', '106', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.61a-b', '96', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1991.62', '97', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.10a-b', '88', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.11a-b', '87', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.13.1', '107', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.13.2', '50', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.14a-b', '89', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.15.1', '92', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.25', '80', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.27.1', '60', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.27.2', '61', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.3', '51', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.33', '66', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.34.1', '76', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.34.2', '77', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.46', '98', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.47.1', '58', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.47.2', '59', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.47.3a-b', '84', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.47.4a-c', '85', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.47.5a-b', '86', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.48.1', '79', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.48.2', '78', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.56', '102', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.6', '74', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1992.7', '75', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1993.10a-b', '83', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1993.7.1', '99', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1993.7.2', '100', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1994.26.1', '52', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1994.26.2', '71', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F1995.3.2a-b', '54', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F2002.10.1', '72', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F2002.10.2', '73', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F2004.37.1a-c', '53', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:fsg_F2004.37.2a-c', '90', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:hmsg_01.9', '137', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:hmsg_06.15', '140', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:hmsg_66.3867', '138', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:hmsg_93.6', '136', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:hmsg_94.13', '139', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19280021000', '184', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19330035008', '199', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19330055000', '191', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19510007000', '182', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19540108000', '201', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19610048000', '202', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19700102000', '176', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19730040001', '172', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19730040003', '174', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19791810000', '179', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A19850354000', '200', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A20050459000', '183', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A20110028000', '189', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nasm_A20120325000', '891', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2007.3.8.4ab', '206', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2007.5.1ab', '207', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2010.19.3', '227', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2010.22.5', '961', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2011.118.4ab', '232', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2011.128.2ab', '210', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2011.143.3.2ab', '226', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2011.159.6', '213', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2011.163.8ab', '214', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2011.46.1', '220', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2011.51.3', '892', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2012.113.2', '209', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2013.141.1', '215', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2013.203', '960', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2013.39.7', '208', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2013.57', '844', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2014.210.3', '216', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2014.2ab', '221', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2014.46.5ab', '231', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2014.63.59', '212', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2015.115.1ab', '228', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2015.2.4', '211', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2015.247.3', '878', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2016.152.2', '230', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmaahc_2019.10.1a-g', '901', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_2005-6-17', '240', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_2005-6-9', '241', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_2007-1-1', '242', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_2007-1-2', '243', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_2007-1-3', '244', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_74-20-1', '247', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_74-20-2', '250', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_79-16-47', '253', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_96-28-1', '254', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmafa_96-30-1', '255', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1000981', '296', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1000982', '294', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1000984', '295', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1004508', '258', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1029149', '276', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1029284', '277', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1067617', '931', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1096762', '39', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1105750', '127', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1108470', '383', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1115230', '995', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1119952', '912', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1119993', '915', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1119996', '913', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1176044', '977', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1190328', '921', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1199660', '893', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1213013', '932', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1250962', '372', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1251889', '318', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1251903', '335', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1272680', '315', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1299584', '964', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1313926', '942', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1362083', '908', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1373402', '910', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1442917', '922', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1466341', '996', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1764061', '126', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1814486', '943', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1814487', '944', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1816008', '308', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1816562', '358', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1816726', '350', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1816728', '351', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1818990', '362', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1819275', '924', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1819291', '925', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1819662', '352', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1820223', '314', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1820541', '363', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1821317', '359', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1822363', '360', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1827970', '949', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1827973', '340', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1827978', '344', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828021', '336', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828030', '337', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828078', '338', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828119', '339', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828170', '341', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828269', '342', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828429', '343', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828505', '345', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828510', '346', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828628', '347', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828648', '348', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828839', '307', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1828842', '349', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1829185', '380', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1829332', '373', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1829524', '374', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1829535', '375', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1829542', '376', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1830215', '377', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1832532', '321', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1832985', '378', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1837459', '298', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1837609', '322', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1837621', '323', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1838349', '299', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1838643', '324', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1838644', '325', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1838650', '326', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1838652', '327', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1838676', '300', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1841103', '904', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1841912', '353', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1841933', '354', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1842503', '355', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1843368', '301', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1845461', '316', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1846255', '331', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1846271', '303', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1846281', '304', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1846344', '305', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1846377', '332', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1846388', '306', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1846391', '319', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1847611', '132', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1847873', '328', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1848079', '302', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1849041', '356', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1849265', '333', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1850922', '309', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1851521', '357', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1853623', '381', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1856918', '976', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1859204', '926', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1864497', '965', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1864503', '972', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1872415', '379', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1883787', '905', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1892964', '980', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1896978', '117', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1900832', '118', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1914660', '927', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1918277', '948', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1918278', '947', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1918792', '963', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1918810', '975', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1919673', '979', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1919675', '969', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1922948', '971', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1922952', '974', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1922956', '968', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1922965', '973', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1952283', '962', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1952311', '967', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1952312', '978', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1954262', '918', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1968767', '950', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_1969723', '928', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_214477', '283', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_361750', '123', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_362153', '119', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_363781', '128', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_364445', '122', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_365584', '906', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_365585', '134', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_365586', '135', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_368509', '133', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_373625', '116', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_375161', '131', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_463506', '889', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_601110', '997', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_602097', '1000', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_602452', '998', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_605482', '256', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_605485', '263', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_605487', '264', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_605498', '265', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_605500', '267', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_605503', '270', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_605507', '271', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_605519', '293', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_605596', '274', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_606746', '273', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_607621', '272', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_607647', '262', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_676823', '970', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_679431', '933', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_682733', '902', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_688775', '966', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_689864', '36', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_703292', '37', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_703302', '38', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_703318', '40', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_703325', '43', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_705564', '42', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_712417', '44', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_739714', '288', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_739715', '290', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_739716', '284', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_748877', '945', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_748878', '917', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_748903', '114', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_763853', '257', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_911374', '310', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_911375', '361', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_920560', '311', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_920740', '297', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_923037', '365', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_923043', '371', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_923083', '366', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_923113', '367', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_923116', '368', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_923122', '312', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_923126', '369', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmah_923135', '313', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8010183', '412', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8010185', '411', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8010270', '428', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8061118', '402', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8061135', '404', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8061530', '405', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8061534', '406', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8061757', '407', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8061963', '401', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8096367', '413', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8098412', '414', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8098584', '415', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8099755', '416', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8100879', '417', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8108582', '418', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8108704', '419', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8108706', '420', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8109761', '422', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8114628', '781', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8114952', '423', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8115528', '424', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8115597', '425', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8131572', '431', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8131573', '432', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8131574', '433', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8131634', '434', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8131636', '435', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8131639', '436', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8135263', '437', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8145707', '426', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8146561', '427', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8168564', '874', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8319024', '408', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8344757', '882', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8358271', '438', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8386869', '409', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8440830', '430', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8471498', '439', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8480378', '440', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8480424', '429', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8552275', '568', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8552277', '569', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8552280', '570', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8552281', '571', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhanthropology_8939937', '410', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnheducation_11380100', '171', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnheducation_11380180', '167', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnheducation_11412946', '163', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnheducation_11413164', '168', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnheducation_15006160', '152', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_10041048', '461', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_10166790', '457', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_10197893', '524', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_10273681', '458', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_10530', '459', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_10703', '460', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_10795', '537', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_11009', '514', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_11042783', '472', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_11058167', '544', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_11162', '538', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_11277082', '510', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_11949', '463', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_12306', '465', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_12487', '466', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_13079', '467', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_13080', '468', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_13082', '469', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_13587547', '548', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_13935', '518', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_14138516', '525', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_14379', '470', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_14572', '523', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_14586', '522', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_14674', '471', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_14843', '539', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_14861', '473', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_15163', '519', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_15463', '475', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_16050', '521', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_16151', '520', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_16552', '476', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17174', '540', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17182', '478', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17325', '479', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17352', '480', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17355', '481', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17478', '482', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17480', '517', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17505', '483', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17599', '543', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17749', '485', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_17764', '448', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_18131', '505', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_22484', '488', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_22889', '549', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_28962', '535', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_29968', '509', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_30966', '489', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_31148', '490', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_323138', '504', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_36632', '491', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_38482', '492', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_42089', '493', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_44873', '512', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_45832', '494', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_45849', '547', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_46797', '496', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_48206', '497', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_48461', '498', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_51231', '528', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_53176', '526', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_536521', '534', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_55480', '499', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_55498', '515', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_61392', '500', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_62922', '501', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_62996', '502', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_65106', '503', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_65179', '516', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_79438', '532', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_810553', '513', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_821965', '533', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_9333269', '506', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_942321', '450', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_942505', '451', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_942916', '452', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_949688', '530', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_949712', '507', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_950401', '454', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_957075', '527', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_957085', '487', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_957944', '486', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_962463', '455', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhinvertebratezoology_970701', '456', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_10016796', '716', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_10016797', '717', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_10016802', '718', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_10016803', '719', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_10016808', '720', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_10250729', '158', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_10369553', '553', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_10611715', '721', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_10611750', '744', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_11231535', '821', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_11467726', '695', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_11635207', '722', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_11825684', '809', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_11872942', '751', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307021', '698', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307068', '745', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307073', '708', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307093', '683', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307115', '749', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307176', '768', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307204', '678', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307212', '164', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307214', '770', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307233', '723', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307240', '724', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_12307243', '772', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_16463872', '1002', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3001151', '691', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3007346', '747', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3007506', '725', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3022367', '165', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3109802', '715', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3114250', '727', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3122122', '728', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3122141', '752', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3126953', '773', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3129300', '774', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3137102', '753', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3176889', '709', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3176892', '710', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3176902', '711', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3176903', '712', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3179870', '811', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3188143', '763', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3188192', '713', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3188200', '714', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3188809', '766', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3302876', '160', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3302895', '823', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3309799', '690', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3318324', '897', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3324894', '819', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3332832', '822', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3333940', '815', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3340244', '705', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3341924', '699', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3341937', '700', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3341954', '688', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3342215', '701', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3342697', '742', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3342978', '735', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3368445', '817', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3368446', '818', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3368531', '816', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3369538', '154', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3370783', '156', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3377843', '734', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3384611', '834', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3385086', '692', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3389255', '824', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3393299', '812', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3393300', '813', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3393301', '814', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3393407', '820', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3393409', '831', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3393470', '830', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3397958', '696', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3415628', '702', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3421187', '758', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3423820', '779', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3425397', '776', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3425518', '731', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3427467', '778', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3427676', '703', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3427760', '729', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3427936', '833', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3427971', '733', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3428171', '739', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3428214', '740', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3428388', '826', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3429219', '730', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3431464', '556', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3431469', '552', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3439417', '754', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3439470', '732', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3440470', '810', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3440721', '694', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3446186', '871', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3446197', '673', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3447044', '155', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3447759', '790', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3447777', '884', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3448898', '741', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3448991', '693', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3449928', '746', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3450090', '755', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3450091', '737', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3450092', '738', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3450132', '756', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3451037', '743', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3451097', '793', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3451166', '706', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3453577', '780', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3457273', '161', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3457297', '827', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3457406', '829', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3457407', '832', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3572783', '900', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3577488', '162', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhpaleobiology_3580352', '157', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4091696', '611', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4092671', '593', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4103596', '578', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4103600', '584', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4105734', '617', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4113049', '599', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4113270', '602', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4113913', '620', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4114243', '581', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4114544', '572', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4115950', '625', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4119824', '614', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4123288', '590', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4123616', '596', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4125718', '575', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4175860', '608', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_4278661', '605', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_5036822', '453', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_5144419', '529', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_5148470', '464', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_5152704', '474', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_6341612', '511', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7289628', '149', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7413792', '551', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7511097', '150', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:nmnhvz_7511102', '151', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.2006.5', '800', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.2008.3', '801', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.70.4', '797', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.71.24', '802', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.71.26', '803', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.74.16', '804', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.75.16', '899', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.75.17', '898', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.76.27', '805', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.82.TC83', '806', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.85.8', '807', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_NPG.99.112', '808', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npg_S_NPG.71.6', '796', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:npm_0.279483.3', '885', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:ofeo-sg_2008-1264A', '847', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:saam_1910.10.3', '886', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:saam_1968.155.136', '840', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:saam_1968.155.8', '841', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'edanmdm:siris_sil_1044709', '888', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'http://n2t.net/ark:/65665/3c32276ea-e29b-49b7-b699-2a57a621b6e6', '567', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'http://n2t.net/ark:/65665/3c34fa78d-02b8-4c1e-8a2a-2429ef6ab6a1', '689', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'https://collection.cooperhewitt.org/objects/18726645/', '10', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Hawkbill Turtle Taxidermy', '449', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'checkerboard skirt', '124', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Slippers with flag', '845', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Medal Ceremony jersey from 2019 Women\'s World Cup Final worn by Kelley O\'Hara', '929', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Colonoware pot from Cooper River, Charleston County, SC', '843', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stoneware jug created by Thomas Commeraw', '842', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'shell mermaids comb', '531', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '"Y:\\01_Projects\\nmah-slc-latinos_and_baseball"', '985', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '"Y:\\01_Projects\\nmnh-paleo_3d_datasets"', '987', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '"Y:\\01_Projects\\nmnh-sitka_2012_turntable"', '988', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '1988_0062_0294', '317', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '2007_0116_274', '320', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '2017_01116_281', '329', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '2017_0116', '330', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '2018_0009_0002', '334', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '2019 U.S. Women\'s World Cup Final Jersey worn by Samantha Mewis', '919', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '76-15-2 Ivory Tusk', '237', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '78-23-15 Ivory Tusk', '238', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '79_002_421', '364', IDLabelSet, records);
    await handleResultsWithIDs(ICol, '79_112_cm1031', '370', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'a240189_64a Wooden Bowl', '403', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'A355722 Fire Board', '421', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Abydos Mummy 074586', '633', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Abydos Mummy 279283', '634', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Abydos Mummy 279286', '635', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Adi Topolosky sneakers, left', '941', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Adi Topolosky sneakers, right', '940', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Adult Mummy (Andrew)', '636', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'allosaurus articulated skeleton', '835', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Amati, Nicolo Vn 1654, \'Brookings\' LOC', '260', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Amati, Nicolo Vn 1675 SI', '261', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'ammonite', '828', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Argonauta Nodosa', '873', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Armstrong Space Suit Glove Savage Reproduction', '178', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Articulated Woolly Mammoth', '795', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'BABOON', '630', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Bombus Bee', '848', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'boot', '185', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'boots', '186', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Boy Mummy', '637', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Branta-sandvicensis C10', '587', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Branta-sandvicensis C3', '588', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Branta-sandvicensis Pelvis', '589', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'bust nam', '187', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Cab Calloway Case', '217', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'camera arriflex16srii', '188', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'camptosaurus articulated skeleton', '836', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Cast Iron Cauldron', '218', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Cat Mummy 2 381569', '638', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Cat Mummy 437431', '639', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'chionecetes opilio (crabs)', '508', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake1', '557', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake10', '558', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake11', '559', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake12', '560', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake2', '561', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake3', '562', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake4', '563', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake5', '564', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake6', '565', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Clovis Drake9', '566', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Coffee Grinder', '219', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'coryanthes-dried', '849', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Crocodile', '631', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Crocodile Mummy', '640', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Devils Tower', '990', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'diplodocus longus articulated skeleton', '837', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'dtid-1047', '677', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'dtid-270', '679', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'dtid-609', '680', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Eulaema Bee', '846', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'ExhibitID-917', '681', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'fedora lindbergh', '190', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Fossil Whale MPC 677', '881', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Fossil Whale MPC 684', '879', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'gongora', '850', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Grancino, Giovanni Vn SI', '266', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'green helmet', '192', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Guarneri del Gesu Vn \'Baron Vitta\' 1730 SIL LOC', '268', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Guarneri del Gesu Vn \'Kreisler\' 1732 LOC', '269', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Haw Mummy 454235', '641', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'HAWK2', '632', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'helmet a', '193', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'helmet type m1917', '194', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Honey Bee', '851', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Ibis Metal', '642', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Ibis Mummy', '643', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'impeller unknown', '196', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Ivory Tusk 2005-6-135', '239', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Ivory Tusk 72-33-14', '245', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Ivory Tusk 73-12-1', '246', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Jones Beaded Purse', '222', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'JuJu Drumsticks', '223', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Kuduo Vessel', '224', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Leather Shoes', '225', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Library of Congress Ornament', '863', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'lindbergh bank', '197', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'lycaste_aromatica', '852', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Martha Washington\'s Dress (no reproduction)', '939', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Martha Washington\'s Dress (with reproduction)', '938', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mesa Redonda', '397', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Microfossil 401478', '166', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Microfossil 402809', '170', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Monticello Model', '233', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mr Cox Mummy', '644', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mr Jones Mummy', '645', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Ms Anni Mummy', '646', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 126790', '647', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 1564', '648', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 1565', '649', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 1566', '650', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 278365', '651', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 279283', '652', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 279285', '653', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 279286', '654', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 279287', '655', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 316508', '656', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 381569', '657', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 381570', '658', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 381571', '659', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 381572', '660', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 435221', '661', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 437431', '662', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 454235', '663', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 508142', '664', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 528481-0', '665', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 74579', '666', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy A 74586', '667', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy AT 5604', '668', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy AT 5605', '669', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy P 381235', '670', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Mummy S 39475', '671', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Naomi Osaka’s tennis racquet from the 2020 U.S. Open Tennis Championship', '946', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'ndp-acrophoca', '682', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMAH 20 dollar coin', '382', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMAH bee pendant', '384', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMAH Cornerstone', '894', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMAH decadrachm', '385', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMAH euro', '386', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMAH tetradrachm', '387', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMAH Vannevar Kiplinger Statue', '895', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMNH Bonebed Analysis', '786', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMNH Camptosaurus', '787', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMNH Catfish', '788', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMNH Chiton', '789', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMNH Jorge Fossil', '791', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMNH Kennicott Bust', '628', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMNH Kennicott Skull', '629', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'NMNH OEC Tree (pella sp? tree)', '792', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'nmnh-USNM_PAL_00095661', '760', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'nmnh-USNM_S_0001170A', '775', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Ontocetus emmonsi (USNM PAL 329064)', '676', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'oxygen bottle', '198', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Peresson, Sergio Va 1986 SI', '275', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Presidents of Christmas Past and Present Ornament', '864', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Pullman Car', '991', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Raqchi Qolcas', '392', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'rmh-1990_011', '684', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'rmh-2002_277', '685', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'rmh-2005_703', '686', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Sauropod Vertebra', '794', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Sculpin Hat - Repaired Model', '785', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Sleigh on the White House Ornament', '865', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'slipper_orchid', '853', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'sloth (upright) articulated skeleton', '838', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Snake Mummy', '672', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stainer, Jacob Va 1678 SIL', '278', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stainer, Jacob Vn 1645 SIL', '279', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stainer, Jacob Vn 1661 SIL', '280', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stainer, Jacob Vn c1650 SI', '281', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Star of Bliss Ornament', '866', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stegosaurus articulated skeleton', '839', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stoneware Jug', '229', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stradivari C \'Castelbarco\' 1697 LOC', '282', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stradivari Va \'Cassavetti\' 1727 LOC', '285', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stradivari Vn \'Betts\' 1704 LOC', '286', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stradivari Vn \'Castelbarco\' 1699 LOC', '287', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stradivari Vn \'Hellier\' 1679 SIL', '289', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stradivari Vn \'Sunrise\' 1677 SIL', '291', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Stradivari Vn \'Ward\' 1700 LOC', '292', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Talpanas 3Dpring Pelvis', '623', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Talpanas C10', '624', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Thomas Jefferson Statue', '234', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Tusk: 68-23-53', '235', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Tusk: 71-17-12', '236', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Tyrannosaurus rex (individual bones)', '205', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Unknown Bee 1', '854', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Unknown Bee 2', '855', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Unknown Bee 4', '856', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'usnm_pal_222302', '687', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'usnm-pal-27088', '697', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'usnm-s-1170a', '726', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'violoncello piccolo pegbox/head', '896', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Whale MPC 675', '880', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Winter Holiday Snowflake Ornament', '867', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Winter Wonderland of Innovation Ornament', '868', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Wooly shirt', '125', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Wright Bicycle', '203', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Y:\\01_Projects\\nmah-awhi-girlhood', '992', IDLabelSet, records);
    await handleResultsWithIDs(ICol, 'Y:\\01_Projects\\nmah-awhi-girlhood_phase2', '993', IDLabelSet, records);
    // #endregion
}

// #region Handle Results
async function handleResults(ICol: COL.ICollection, WS: NodeJS.WritableStream | null, query: string, id: string,
    options?: COL.CollectionQueryOptions | undefined): Promise<boolean> {
    if (!options)
        options = { gatherRaw: true };

    for (let retry: number = 1; retry <= 5; retry++) {
        const results: COL.CollectionQueryResults | null = await ICol.queryCollection(query.trim(), 10, 0, options);
        // LOG.info(`*** Edan Scrape: ${H.Helpers.JSONStringify(results)}`, LOG.LS.eTEST);
        if (results) {
            if (results.error)
                LOG.info(`*** Edan Scrape [${id}] ERROR for '${query}': ${results.error}`, LOG.LS.eTEST);

            for (const record of results.records) {
                if (WS)
                    WS.write(`${id}\t${record.name.replace(/\r?\n|\r/g, ' ')}\t${record.unit}\t${record.identifierPublic}\t${record.identifierCollection}\t${results.records.length}\n`);
                    // WS.write(`${id}\t${record.name.replace(/\r?\n|\r/g, ' ')}\t${record.unit}\t${record.identifierPublic}\t${record.identifierCollection}\t${H.Helpers.JSONStringify(record.raw)}\n`);
                else
                    LOG.info(`EDAN Query(${query}): ${H.Helpers.JSONStringify(record)}`, LOG.LS.eTEST);
            }
            return true;
        }
    }
    LOG.error(`*** Edan Scrape [${id}] failed for '${query}'`, LOG.LS.eTEST);
    return false;
}

async function handleResultsEdanLists(ICol: COL.ICollection, WS: NodeJS.WritableStream | null, query: string, id: string, unitFilter?: string | undefined): Promise<boolean> {
    const options: COL.CollectionQueryOptions = { searchMetadata: true, gatherRaw: true };

    for (let retry: number = 1; retry <= 5; retry++) {
        const results: COL.CollectionQueryResults | null = await ICol.queryCollection(query.trim(), 10, 0, options);
        // LOG.info(`*** Edan Scrape: ${H.Helpers.JSONStringify(results)}`, LOG.LS.eTEST);
        if (results) {
            if (results.error)
                LOG.info(`*** Edan Scrape [${id}] ERROR for '${query}': ${results.error}`, LOG.LS.eTEST);

            for (const record of results.records) {
                const items = record?.raw?.content?.items;
                if (!WS)
                    LOG.info(`EDAN Query(${query}): ${H.Helpers.JSONStringify(record)}`, LOG.LS.eTEST);
                else if (items) {
                    for (const item of items) {
                        if (!unitFilter || record.unit == unitFilter)
                            WS.write(`${id}\t${record.name.replace(/\r?\n|\r/g, ' ')}\t${record.unit}\t${record.identifierPublic}\t${item}\t${results.records.length}\n`);
                    }
                } else if (!unitFilter || record.unit == unitFilter)
                    WS.write(`${id}\t${record.name.replace(/\r?\n|\r/g, ' ')}\t${record.unit}\t${record.identifierPublic}\t${record.identifierCollection}\t${results.records.length}\n`);
            }
            return true;
        }
    }
    LOG.error(`*** Edan Scrape [${id}] failed for '${query}'`, LOG.LS.eTEST);
    return false;
}

async function handleResultsWithIDs(ICol: COL.ICollection, query: string, id: string, IDLabelSet: Set<string>, records: EdanResult[]): Promise<boolean> {

    for (let retry: number = 1; retry <= 5; retry++) {
        const results: COL.CollectionQueryResults | null = await ICol.queryCollection(query.trim(), 10, 0, { gatherIDMap: true });
        // LOG.info(`*** Edan Scrape: ${H.Helpers.JSONStringify(results)}`, LOG.LS.eTEST);
        if (results) {
            if (results.error)
                LOG.info(`*** Edan Scrape [${id}] ERROR for '${query}': ${results.error}`, LOG.LS.eTEST);

            for (const record of results.records) {
                const IDMap: Map<string, string> = new Map<string, string>();
                if (record.identifierMap) {
                    for (const [ label, content ] of record.identifierMap) {
                        if (label && content) {
                            const labelNormalized = label.toLowerCase();
                            IDMap.set(labelNormalized, content);
                            IDLabelSet.add(labelNormalized);
                        }
                    }
                }

                records.push({
                    id,
                    name: record.name.replace(/\r?\n|\r/g, ' '),
                    unit: record.unit,
                    identifierPublic: record.identifierPublic,
                    identifierCollection: record.identifierCollection,
                    records: results.records.length,
                    IDMap,
                    raw: record.raw
                });

                // LOG.info(`EDAN Query(${query}): ${H.Helpers.JSONStringify(record)}`, LOG.LS.eTEST);
            }
            return true;
        }
    }
    LOG.error(`*** Edan Scrape [${id}] failed for '${query}'`, LOG.LS.eTEST);
    return false;
}
// #endregion

// #region SCRAPE 3D Packages
function executeFetch3DPackage(ICol: COL.ICollection): void {
    test('Collections: EdanCollection.Fetch3DPackage', async () => {
        await fetch3DPackage(ICol, 'b0bf6d44-af22-40dc-bd85-7d66255be4a7');
        await fetch3DPackage(ICol, 'ed99f44d-3c60-4111-b666-e2908e1b64ef');
        await fetch3DPackage(ICol, '341c96cd-f967-4540-8ed1-d3fc56d31f12');
        await fetch3DPackage(ICol, 'd8c62e5e-4ebc-11ea-b77f-2e728ce88125');
    });
}

async function fetch3DPackage(ICol: COL.ICollection, UUID: string): Promise<void> {
    await handle3DContentQuery(ICol, null, undefined, `3d_package:${UUID}`, UUID);
}

async function handle3DContentQuery(ICol: COL.ICollection, _WS: NodeJS.WritableStream | null,
    id: string | undefined, url: string | undefined, queryID: string): Promise<boolean> {
    for (let retry: number = 1; retry <= 5; retry++) {
        const edanRecord: COL.EdanRecord | null = await ICol.fetchContent(id, url);
        if (edanRecord) {
            LOG.info(`Content Query ${id ? id : ''}${url ? url : ''}: ${H.Helpers.JSONStringify(edanRecord)}`, LOG.LS.eTEST);
            const edan3DResources: COL.Edan3DResource[] | undefined = edanRecord?.content?.resources;
            if (edan3DResources) {
                for (const resource of edan3DResources)
                    LOG.info(`Content Query ${id ? id : ''}${url ? url : ''} resource: ${H.Helpers.JSONStringify(resource)}`, LOG.LS.eTEST);
            }
            return true;
        }
        if (retry < 5)
            await H.Helpers.sleep(2000); // wait and try again
    }
    LOG.error(`Content Query ${id ? id : ''}${url ? url : ''} [${queryID}] failed`, LOG.LS.eTEST);
    return false;
}
// #endregion
import * as path from 'path';
// import * as fs from 'fs';
// import { /* PassThrough, */ Stream } from 'stream';
import * as LOG from '../../utils/logger';
import * as H from '../../utils/helpers';

describe('Utils: Helpers', () => {
    test('Utils: Helpers.arraysEqual', () => {
        // Number 1
        // Number 2
        // Arrays of different lengths
        // Arrays of same lengths, different values
        // Arryas of same lengths, same values, different sort
        // Arryas of same lengths, same values, same sort
        const n1: number = 3;
        const n2: number = 5;
        const a1: number[] = [1, 2];
        const a2: number[] = [1, 2, 3];
        const a3: number[] = [1, 2, 4];
        const a4: number[] = [3, 1, 2];
        const a5: number[] = [1, 2, 3];
        const a6: string[] = ['one', 'two', 'three'];
        expect(H.Helpers.arraysEqual(n1, n1)).toBeFalsy();
        expect(H.Helpers.arraysEqual(n1, n2)).toBeFalsy();
        expect(H.Helpers.arraysEqual(n1, a1)).toBeFalsy();
        expect(H.Helpers.arraysEqual(a1, n1)).toBeFalsy();
        expect(H.Helpers.arraysEqual(a1, a2)).toBeFalsy();
        expect(H.Helpers.arraysEqual(a2, a3)).toBeFalsy();
        expect(H.Helpers.arraysEqual(a2, a4)).toBeTruthy();
        expect(H.Helpers.arraysEqual(a2, a5)).toBeTruthy();
        expect(H.Helpers.arraysEqual(a5, a6)).toBeFalsy();
    });

    // jest.mock('fs');
    const directoryPath: string = path.join('var', 'test', H.Helpers.randomSlug());
    const filePath: string = H.Helpers.randomFilename(directoryPath, '');
    const filePath2: string = H.Helpers.randomFilename(directoryPath, '');
    const filePath3: string = H.Helpers.randomFilename(directoryPath, '');
    const filePath4: string = H.Helpers.randomFilename(directoryPath, '');
    const filePath5: string = H.Helpers.randomFilename(directoryPath, '');
    const dirNestEmpty: string = path.join(directoryPath, H.Helpers.randomSlug());
    const dirNestNotEmpty: string = path.join(directoryPath, H.Helpers.randomSlug());

    test('Utils: Helpers.randomSlug', () => {
        const s1: string = H.Helpers.randomSlug();
        const s2: string = H.Helpers.randomSlug();
        expect(s1).toBeTruthy();
        expect(s2).toBeTruthy();
        expect(s1).not.toEqual(s2);
    });

    test('Utils: Helpers.randomFilename', () => {
        const s1: string = H.Helpers.randomFilename('filepath', '');
        const s2: string = H.Helpers.randomFilename('filepath', 'prefix');
        expect(s1).toBeTruthy();
        expect(s2).toBeTruthy();
        expect(s1.substring(0, 8)).toEqual('filepath');
        expect(s2.substring(9, 16)).toEqual('prefix-');
    });

    test('Utils: Helpers.validFilename', () => {
        expect(H.Helpers.validFilename(filePath)).toBeFalsy();
        expect(H.Helpers.validFilename('con')).toBeFalsy();
        expect(H.Helpers.validFilename('com1')).toBeFalsy();
        expect(H.Helpers.validFilename('prn')).toBeFalsy();
        expect(H.Helpers.validFilename('lpt5')).toBeFalsy();
        expect(H.Helpers.validFilename('foo:bar')).toBeFalsy();
        expect(H.Helpers.validFilename('foo/bar')).toBeFalsy();
        expect(H.Helpers.validFilename('foo\\bar')).toBeFalsy();
        expect(H.Helpers.validFilename('foo<bar')).toBeFalsy();
        expect(H.Helpers.validFilename('.lpt5')).toBeTruthy();
    });

    test('Utils: Helpers.createDirectory', () => {
        let res: H.IOResults = H.Helpers.createDirectory(directoryPath);
        expect(res.success).toBeTruthy();
        res = H.Helpers.fileOrDirExists(directoryPath);
        expect(res.success).toBeTruthy();
        res = H.Helpers.createDirectory(directoryPath);
        expect(res.success).toBeTruthy();
    });

    test('Utils: Helpers.ensureFileExists', () => {
        let res: H.IOResults = H.Helpers.ensureFileExists(filePath);
        expect(res.success).toBeTruthy();
        res = H.Helpers.fileOrDirExists(filePath);
        expect(res.success).toBeTruthy();
    });

    test('Utils: Helpers.stat', () => {
        let res: H.StatResults = H.Helpers.stat(filePath);
        expect(res.success).toBeTruthy();
        expect(res.stat).toBeTruthy();
        if (res.stat)
            expect(res.stat.size).toBe(0);

        res = H.Helpers.stat(H.Helpers.randomSlug());
        expect(res.success).toBeFalsy();
    });

    test('Utils: Helpers.computeHashFromFile', async () => {
        let res: H.HashResults = await H.Helpers.computeHashFromFile(filePath, 'sha512');
        expect(res.success).toBeTruthy();
        expect(res.hash).toBeTruthy();
        // hash of an empty file is always the same:
        expect(res.hash).toBe('cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e');

        res = await H.Helpers.computeHashFromFile(H.Helpers.randomSlug(), 'sha512');
        expect(res.success).toBeFalsy();
    });

    test('Utils: Helpers.computeHashFromString', async () => {
        const toHash: string = '';
        const hash: string = H.Helpers.computeHashFromString(toHash, 'sha512');
        expect(hash).toBe('cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e');
    });

    test('Utils: Helpers.writeJsonAndComputeHash', async () => {
        const obj = {
            abba: 1,
            dabba: 'doo'
        };
        const res1: H.HashResults = await H.Helpers.writeJsonAndComputeHash(filePath5, obj, 'sha512');
        expect(res1.success).toBeTruthy();
        const res2: H.HashResults = await H.Helpers.computeHashFromFile(filePath5, 'sha512');
        expect(res2.success).toBeTruthy();
        expect(res1.hash).toEqual(res2.hash);
    });

    test('Utils: Helpers.copyFile', () => {
        let res: H.IOResults = H.Helpers.copyFile(filePath, filePath2);
        expect(res.success).toBeTruthy();
        LOG.logger.info('NOTICE: The logged error that should follow is expected!');
        res = H.Helpers.copyFile(filePath, filePath2, false);
        expect(res.success).toBeFalsy();
    });

    test('Utils: Helpers.fileExists', () => {
        let res: H.IOResults = H.Helpers.fileOrDirExists(filePath);
        expect(res.success).toBeTruthy();
        res = H.Helpers.fileOrDirExists(filePath2);
        expect(res.success).toBeTruthy();
        res = H.Helpers.fileOrDirExists(filePath3);
        expect(res.success).toBeFalsy();
    });

    test('Utils: Helpers.initializeFile', () => {
        let res: H.IOResults;
        res = H.Helpers.initializeFile(filePath5, filePath, 'Destination exists');
        expect(res.success).toBeTruthy();
        res = H.Helpers.initializeFile(filePath5, filePath4, 'Destination does not exist, source exists');
        expect(res.success).toBeTruthy();
        res = H.Helpers.removeFile(filePath4);
        expect(res.success).toBeTruthy();
        res = H.Helpers.initializeFile(null, filePath4, 'Destination does not exist, no source');
        expect(res.success).toBeTruthy();
        res = H.Helpers.removeFile(filePath4);
        expect(res.success).toBeTruthy();
    });

    test('Utils: Helpers.filesMatch', () => {
        let res: H.IOResults = H.Helpers.filesMatch(filePath, filePath3);
        expect(res.success).toBeFalsy();
        res = H.Helpers.filesMatch(filePath3, filePath);
        expect(res.success).toBeFalsy();
        res = H.Helpers.filesMatch(filePath2, filePath5);
        expect(res.success).toBeFalsy();
        res = H.Helpers.filesMatch(filePath, filePath2);
        expect(res.success).toBeTruthy();
    });

    test('Utils: Helpers.initializeDirectory', () => {
        let res: H.IOResults = H.Helpers.initializeDirectory(dirNestEmpty, 'Nested Directory, Empty');
        expect(res.success).toBeTruthy();
        res = H.Helpers.initializeDirectory(dirNestNotEmpty, 'Nested Directory, Not Empty');
        expect(res.success).toBeTruthy();
        res = H.Helpers.initializeDirectory(dirNestNotEmpty, 'Nested Directory, Not Empty');
        expect(res.success).toBeTruthy();
    });

    test('Utils: Helpers.moveFile', () => {
        const moveDest: string = path.join(dirNestNotEmpty, path.basename(filePath5));
        let res: H.IOResults;
        res = H.Helpers.moveFile(filePath5, moveDest);
        expect(res.success).toBeTruthy();
        res = H.Helpers.moveFile(moveDest, filePath5);
        expect(res.success).toBeTruthy();
    });

    test('Utils: Helpers.getDirectoryEntriesRecursive', () => {
        const copiedFile: string = H.Helpers.randomFilename(dirNestNotEmpty, '');
        const res: H.IOResults = H.Helpers.copyFile(filePath5, copiedFile);
        expect(res.success).toBeTruthy();

        // static getDirectoryEntriesRecursive(directory: string, maxDepth: number = 32): string[] | null {
        const dirNotRecursive: string[] | null = H.Helpers.getDirectoryEntriesRecursive(directoryPath, 0);
        expect(dirNotRecursive).toBeTruthy();
        expect(dirNotRecursive).toEqual(expect.arrayContaining([filePath, filePath2, filePath5]));

        const dirRecursive: string[] | null = H.Helpers.getDirectoryEntriesRecursive(directoryPath);
        expect(dirRecursive).toBeTruthy();
        expect(dirRecursive).toEqual(expect.arrayContaining([filePath, filePath2, filePath5, copiedFile]));
    });

    /*
    test('Utils: Helpers.IO File Lock', async () => {
        const RS: fs.ReadStream = fs.createReadStream(filePath2);
        // const mockReadable = new PassThrough();
        await streamToFile(RS, filePath3);

        let res: H.IOResults = H.Helpers.removeFile(filePath2);
        expect(res.success).toBeTruthy();
        res = H.Helpers.copyFile(filePath, filePath2, true);
        expect(res.success).toBeFalsy();
        res = H.Helpers.removeDirectory(directoryPath);
        expect(res.success).toBeFalsy();
        RS.destroy();
    });
    */

    test('Utils: Helpers.removeFile', () => {
        let res: H.IOResults = H.Helpers.removeFile(filePath);
        expect(res.success).toBeTruthy();
        res = H.Helpers.removeFile(filePath2);
        expect(res.success).toBeTruthy();
        res = H.Helpers.removeFile(filePath3);
        expect(res.success).toBeTruthy();
        res = H.Helpers.removeFile(filePath4);
        expect(res.success).toBeTruthy();            // removing a non-existant file succeeds
    });

    test('Utils: Helpers.removeDirectory', () => {
        let res: H.IOResults = H.Helpers.removeDirectory(filePath);
        expect(res.success).toBeTruthy();    // removing a non-existant directory suceeds
        res = H.Helpers.removeDirectory(directoryPath, false); // removing a non-empty directory fails, when not in recurse mode
        expect(res.success).toBeFalsy();
        res = H.Helpers.removeDirectory(directoryPath, true);
        expect(res.success).toBeTruthy();
    });
});

/*
const streamToFile = (inputStream: Stream, filePath: string) => {
    return new Promise((resolve, reject) => {
        const fileWriteStream: fs.WriteStream = fs.createWriteStream(filePath);
        inputStream
            .pipe(fileWriteStream)
            .on('finish', resolve)
            .on('error', reject);
    });
};
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from 'path';
import * as L from 'lodash';
import { OperationInfo } from '../../interface/IStorage';
import * as INV from './OCFLInventory';
import * as ST from './SharedTypes';
import * as H from '../../../utils/helpers';
import * as LOG from '../../../utils/logger';

export type OCFLObjectInitResults = {
    ocflObject: OCFLObject | null,
    success: boolean,
    error: string,
};

export class OCFLObject {
    private _storageKey: string = '';
    private _forReading: boolean = false;

    private _objectRoot: string = '';
    private _ocflInventory: INV.OCFLInventory | null = null;
    private _newObject: boolean = false;

    async initialize(storageKey: string, objectRoot: string, forReading: boolean): Promise<OCFLObjectInitResults> {
        this._storageKey = storageKey;
        this._objectRoot = objectRoot;
        this._forReading = forReading;

        const retValue: OCFLObjectInitResults = {
            ocflObject: null,
            success: false,
            error: ''
        };

        // Verify structure / create structure
        let ioResults = await this.initializeStructure();
        if (!ioResults.success) {
            retValue.success = false;
            retValue.error = ioResults.error;
            return retValue;
        }

        // load inventory
        ioResults = this.ensureInventoryIsLoaded();
        if (!ioResults.success) {
            retValue.success = false;
            retValue.error = ioResults.error;
            return retValue;
        }

        retValue.success = true;
        retValue.ocflObject = this;
        return retValue;
    }

    /**
     * Addition: Adds a new file path and corresponding content to an OCFL Object. The path cannot exist in the previous version of the object,
     * and the content cannot have existed in any earlier versions of the object.
     * Updating: Changes the content pointed to by a content path. The path must exist in the previous version of the OCFL Object,
     * and the content cannot have existed in any earlier versions of the object.
     * @param pathOnDisk Full path to added content's bits on disk; may be null if only metadata is being updated
     * @param fileName Name (and path) of added content's bits; may be null if only metadata is being updated
     * @param metadata Optional metadata record that accompanies this content addition
     * @param opInfo Operation Info, specifying a message and user context for the operation
     */
    async addOrUpdate(pathOnDisk: string | null, fileName: string | null, metadata: any | null, opInfo: OperationInfo): Promise<H.IOResults> {
        // Prepare new version in inventory
        let results: H.IOResults = this.addVersion(opInfo);
        if (!results.success)
            return results;

        results = await this.addOrUpdateWorker(pathOnDisk, fileName, metadata);
        if (!results.success)
            this.rollbackVersion();
        return results;
    }

    private async addOrUpdateWorker (pathOnDisk: string | null, fileName: string | null, metadata: any | null): Promise<H.IOResults> {
        let results: H.IOResults = {
            success: false,
            error: ''
        };

        if (!pathOnDisk && !fileName && !metadata) {
            results.success = false;
            results.error = 'No information specified';
            return results;
        }

        // Read current inventory, if any
        /* istanbul ignore next */
        if (!this._ocflInventory) {
            results.success = false;
            results.error = 'Unable to compute OCFL Inventory';
            return results;
        }

        const version: number = this._ocflInventory.headVersion;
        const destFolder: string = this.versionContentFullPath(version);
        const contentPath: string = OCFLObject.versionContentPartialPath(version);
        let hashResults: H.HashResults;

        if (pathOnDisk && fileName) {
            // Compute hash
            hashResults = await H.Helpers.computeHashFromFile(pathOnDisk, ST.OCFLDigestAlgorithm);
            if (!hashResults.success)
                return hashResults;

            // Update Inventory
            this._ocflInventory.addContent(path.join(contentPath, fileName), fileName, hashResults.hash);

            // Move file to new version folder
            results = H.Helpers.moveFile(pathOnDisk, path.join(destFolder, fileName));
            if (!results.success)
                return results;
        }

        if (metadata) {
            // serialize metadata to new version folder & compute hash
            const metadataFilename: string = ST.OCFLMetadataFilename;
            hashResults = await H.Helpers.writeJsonAndComputeHash(path.join(destFolder, metadataFilename), metadata, ST.OCFLDigestAlgorithm);
            if (!hashResults.success)
                return hashResults;

            // Update Inventory
            this._ocflInventory.addContent(path.join(contentPath, metadataFilename), metadataFilename, hashResults.hash);
        }

        // Save Inventory and Inventory Digest to new version folder
        results = await this._ocflInventory.writeToDiskVersion(this);
        if (!results.success)
            return results;

        // Save Inventory and Inventory Digest to root folder
        results = await this._ocflInventory.writeToDisk(this);
        if (!results.success)
            return results;

        return results;
    }

    /**
     * Renaming: Changes the file path of existing content. The path cannot exist in the previous version of the OCFL Object,
     * and the content cannot have existed in any earlier versions of the object.
     * @param fileNameOld
     * @param fileNameNew
     */
    async rename(fileNameOld: string, fileNameNew: string, opInfo: OperationInfo): Promise<H.IOResults> {
        // Prepare new version in inventory
        let results: H.IOResults = this.addVersion(opInfo);
        if (!results.success)
            return results;

        results = await this.renameReinstateWorker(fileNameOld, fileNameNew, -1); // -1 means most recent version
        if (!results.success)
            this.rollbackVersion();
        return results;
    }

    /**
     * Reinstatement: Makes content from a version earlier than the previous version available in the current version
     * of an OCFL Object. The content must exist in an earlier version (removed "and not the previous version"). The file path may
     * exist in the previous version, effectively updating the file path with older content, or it may not, effectively
     * adding the older content as a new file.
     * @param fileName File to reinstate
     * @param version Version number to reinstate; -1 means most recent version
     */
    async reinstate(fileName: string, version: number, opInfo: OperationInfo): Promise<H.IOResults> {
        // Prepare new version in inventory
        let results: H.IOResults = this.addVersion(opInfo);
        if (!results.success)
            return results;

        results = await this.renameReinstateWorker(fileName, fileName, version);
        if (!results.success)
            this.rollbackVersion();
        return results;
    }

    async renameReinstateWorker(fileNameOld: string, fileNameNew: string, versionToReinstate: number): Promise<H.IOResults> {
        let results: H.IOResults;

        // update inventory with new version
        // Read current inventory, if any
        /* istanbul ignore next */
        if (!this._ocflInventory) {
            return {
                success: false,
                error: 'Unable to compute OCFL Inventory'
            };
        }

        // find the versionToReinstate of old file in inventory; -1 -> most recent version
        const { path: contentPathSource, hash } = this._ocflInventory.getContentPathAndHash(fileNameOld, versionToReinstate);
        if (!contentPathSource) {
            return {
                success: false,
                error: `OCFLObject.rename: Unable to locate old file ${fileNameOld}`
            };
        }

        const version: number = this._ocflInventory.headVersion;

        // copy old file to new file in new version
        const fullPathSource: string = path.join(this._objectRoot, contentPathSource);
        const fullPathDest: string = this.fileLocation(fileNameNew, version);
        // LOG.logger.info(`Copying ${fullPathSource} to ${fullPathDest}`);
        results = H.Helpers.copyFile(fullPathSource, fullPathDest, false);
        if (!results.success)
            return results;

        // record copied, renamed file
        const contentPathDest: string = path.join(OCFLObject.versionContentPartialPath(version), fileNameNew);
        // LOG.logger.info(`Calling OFCLInventory.addContent for ${fileNameNew} at ${contentPathDest}`);
        this._ocflInventory.addContent(contentPathDest, fileNameNew, hash);

        // remove old file from inventory, if we're changing names (reinstate uses this code, with fileNameOld === fileNameNew)
        // LOG.logger.info(`Calling OFCLInventory.removeContent for ${fileNameOld} at ${contentPathSource}`);
        if (fileNameOld != fileNameNew && !this._ocflInventory.removeContent(contentPathSource, fileNameOld, hash))
            return {
                success: false,
                error: `Unable to remove ${fileNameOld} from OCFL Inventory`
            };

        // Save Inventory and Inventory Digest to new version folder
        results = await this._ocflInventory.writeToDiskVersion(this);
        if (!results.success)
            return results;

        // Save Inventory and Inventory Digest to root folder
        results = await this._ocflInventory.writeToDisk(this);
        if (!results.success)
            return results;

        return results;
    }

    /**
     * Deletion: Removes a file path and corresponding content from the current version of an OCFL Object.
     * The path and content remain available in earlier versions of the object.
     */
    async delete(fileName: string, opInfo: OperationInfo): Promise<H.IOResults> {
        // Prepare new version in inventory
        let results: H.IOResults = this.addVersion(opInfo);
        if (!results.success)
            return results;

        results = await this.deleteWorker(fileName);
        if (!results.success)
            this.rollbackVersion();
        return results;
    }

    async deleteWorker(fileName: string): Promise<H.IOResults> {
        // update inventory with new version
        // Read current inventory, if any
        /* istanbul ignore next */
        if (!this._ocflInventory) {
            return {
                success: false,
                error: 'Unable to compute OCFL Inventory'
            };
        }

        // find most recent version of old file in inventory -- locate path
        const { path: contentPathSource, hash } = this._ocflInventory.getContentPathAndHash(fileName);
        if (!contentPathSource) {
            return {
                success: false,
                error: `OCFLObject.rename: Unable to locate old file ${fileName}`
            };
        }

        // remove old file from inventory
        if (!this._ocflInventory.removeContent(contentPathSource, fileName, hash))
            return {
                success: false,
                error: `Unable to remove ${fileName} from OCFL Inventory`
            };

        // Save Inventory and Inventory Digest to new version folder
        let results: H.IOResults = await this._ocflInventory.writeToDiskVersion(this);
        if (!results.success)
            return results;

        // Save Inventory and Inventory Digest to root folder
        results = await this._ocflInventory.writeToDisk(this);
        if (!results.success)
            return results;

        return results;
    }

    /**
     * Purging: (As distinct from deletion) covers the complete removal of a file path and corresponding content from all versions
     * of an OCFL Object.
     *
     * Sometimes a file needs to be deleted from all versions of an object, perhaps for legal reasons. Doing this to an OCFL Object breaks
     * the previous version immutability assumption. The correct way to do this is to create a new object that excludes the offending file,
     * with a revised version history taking this into account. The original object can then be deleted in its entirety. Creating the new object
     * first is good practice as it avoids any risk of data loss that may occur if an object were to be deleted before the new object is created.
     * The new object need not have the same identifier as the original object. In this case, the deleted object may be replaced by a placeholder
     * object using the original identifier and location in the OCFL Storage Root. This is a standard OCFL object with content that redirects users
     * and software to the new version - possibly with an indication of why the new object was created, if appropriate. The OCFL does not define
     * redirect mechanisms, the interpretation of object contents is purely a client application concern.
     *
     * @param fileName
     */
    async purge(fileName: string): Promise<H.IOResults> {
        const results: H.IOResults = {
            success: false,
            error: 'Not Implemented'
        };
        fileName;
        return results;
    }

    async validate(): Promise<H.IOResults> {
        let ioResults: H.IOResults;
        let dest: string = this._objectRoot;

        // Confirm directory exists
        ioResults = H.Helpers.fileOrDirExists(dest);
        if (!ioResults.success)
            return ioResults;

        // Confirm namaste exists and is valid
        dest = path.join(this._objectRoot, ST.OCFLStorageObjectNamasteFilename);
        ioResults = H.Helpers.fileOrDirExists(dest);
        if (!ioResults.success)
            return ioResults;

        ioResults = H.Helpers.filesMatch(dest, path.join(ST.OCFLSourceDocsPath, ST.OCFLStorageObjectNamasteFilename));
        if (!ioResults.success)
            return ioResults;

        // Confirm root inventory exists
        let invResults = INV.OCFLInventory.readFromDisk(this);
        if (!invResults.success || !invResults.ocflInventory) {
            ioResults.success = false;
            ioResults.error = invResults.error ? invResults.error : `Failed to read inventory for ${JSON.stringify(this)}`;
            return ioResults;
        }

        const ocflInventoryRoot: INV.OCFLInventory = invResults.ocflInventory;
        const maxVersion: number = ocflInventoryRoot.headVersion;
        if (maxVersion <= 0) {
            ioResults.success = false;
            ioResults.error = `Invalid inventory file for ${JSON.stringify(this)}`;
            LOG.logger.error(ioResults.error);
            return ioResults;
        }
        ioResults = await ocflInventoryRoot.validate(this, true);
        if (!ioResults.success) {
            LOG.logger.error(ioResults.error);
            return ioResults;
        }

        // Validate each inventory
        for (let version: number = 1; version <= maxVersion; version++) {
            invResults = INV.OCFLInventory.readFromDiskVersion(this, version);
            if (!invResults.success || !invResults.ocflInventory) {
                ioResults.success = false;
                ioResults.error = invResults.error ? invResults.error : `Failed to read inventory for ${JSON.stringify(this)}, version ${version}`;
                LOG.logger.error(ioResults.error);
                return ioResults;
            }

            const ocflInventory: INV.OCFLInventory = invResults.ocflInventory;
            ioResults = await ocflInventory.validate(this, false);
            if (!ioResults.success) {
                LOG.logger.error(ioResults.error);
                return ioResults;
            }

            // Confirm root inventory matches latest version inventory
            if (ocflInventory.headVersion == ocflInventoryRoot.headVersion) {
                if (!L.isEqual(ocflInventory, ocflInventoryRoot)) {
                    ioResults.success = false;
                    ioResults.error = `Root inventory ${JSON.stringify(ocflInventoryRoot)} does not match head inventory ${JSON.stringify(ocflInventory)}`;
                    LOG.logger.error(ioResults.error);
                    return ioResults;
                }
            }
        }

        // Confirm all files on disk are present in root inventory and have correct hashes
        const fileMap: Map<string, string> = ocflInventoryRoot.manifest.getFileMap();
        const fileList: string[] | null = H.Helpers.getDirectoryEntriesRecursive(this._objectRoot);
        if (!fileList) {
            ioResults.success = false;
            ioResults.error = `Unable to read filelist from directory from ${this._objectRoot}`;
            LOG.logger.error(ioResults.error);
            return ioResults;
        }

        for (const fileName of fileList) {
            const relName: string = path.relative(this._objectRoot, fileName);
            const baseName: string = path.basename(fileName);
            // LOG.logger.info(`Examining ${fileName}; relName ${relName}; basename ${baseName}`);

            // Skip Inventory, Inventory Digest, and Namaste file
            if (baseName == ST.OCFLStorageObjectInventoryFilename ||
                baseName == ST.OCFLStorageObjectInventoryDigestFilename ||
                baseName == ST.OCFLStorageObjectNamasteFilename)
                continue;

            const hash: string | undefined = fileMap.get(relName);
            if (!hash) {
                ioResults.success = false;
                ioResults.error = `No hash found for ${relName} in manifest ${JSON.stringify(fileMap)}`;
                LOG.logger.error(ioResults.error);
                return ioResults;
            }

            ioResults = H.Helpers.fileOrDirExists(fileName);
            if (!ioResults.success) {
                LOG.logger.error(ioResults.error);
                return ioResults;
            }

            const hashResults: H.HashResults = await H.Helpers.computeHashFromFile(fileName, ST.OCFLDigestAlgorithm);
            if (!hashResults.success) {
                LOG.logger.error(hashResults.error);
                return hashResults;
            }

            if (hash != hashResults.hash) {
                ioResults.success = false;
                ioResults.error = `Computed hash for ${fileName} does not match; expected ${hash}; observed ${hashResults.hash}`;
                LOG.logger.error(ioResults.error);
                return ioResults;
            }
        }

        ioResults.success = true;
        return ioResults;
    }

    get objectRoot(): string {
        return this._objectRoot;
    }

    /** e.g. STORAGEROOT/REPO/35/6a/19/356a192b7913b04c54574d18c28d46e6395428ab/v1 */
    versionRoot(version: number): string {
        return path.join(this._objectRoot, OCFLObject.versionFolderName(version));
    }

    /** e.g. STORAGEROOT/REPO/35/6a/19/356a192b7913b04c54574d18c28d46e6395428ab/v1/content */
    versionContentFullPath(version: number): string {
        return path.join(this.versionRoot(version), ST.OCFLStorageObjectContentFolder);
    }

    /** e.g. v1/content */
    static versionContentPartialPath(version: number): string {
        return path.join(OCFLObject.versionFolderName(version), ST.OCFLStorageObjectContentFolder);
    }

    /** e.g. v1 */
    static versionFolderName(version: number): string {
        return `v${version}`;
    }

    fileHash(fileName: string, version: number): string {
        return this._ocflInventory ? this._ocflInventory.hash(fileName, version) : '';
    }

    fileLocation(fileName: string, version: number): string {
        return path.join(this.versionContentFullPath(version), fileName);
    }

    headVersion(): number {
        return this._ocflInventory ? this._ocflInventory.headVersion : 0;
    }

    private async initializeStructure(): Promise<H.IOResults> {
        // Ensure object root directory exists
        let ioResults: H.IOResults;
        ioResults = H.Helpers.fileOrDirExists(this._objectRoot);
        if (!ioResults.success)
            this._newObject = true;
        if (!this._forReading)
            ioResults = H.Helpers.initializeDirectory(this._objectRoot, 'OCFL Object Root');
        if (!ioResults.success)
            return ioResults;

        // Ensure initialization of OCFL Object Root "NAMASTE" file
        const source: string = path.join(ST.OCFLSourceDocsPath, ST.OCFLStorageObjectNamasteFilename);
        const dest: string = path.join(this._objectRoot, ST.OCFLStorageObjectNamasteFilename);
        ioResults = this._forReading
            ? H.Helpers.fileOrDirExists(dest)
            : H.Helpers.initializeFile(source, dest, 'OCFL Object Root Namaste File');
        return ioResults;
    }

    private ensureInventoryIsLoaded(): H.IOResults {
        if (!this._ocflInventory) {
            if (!this._newObject) {
                const results = INV.OCFLInventory.readFromDisk(this);
                if (!results.success || !results.ocflInventory) {
                    return {
                        success: false,
                        error: results.error
                    };
                }
                this._ocflInventory = results.ocflInventory;
            } else {
                this._ocflInventory = new INV.OCFLInventory();
                this._ocflInventory.id = this._storageKey;
            }
        }
        return {
            success: true,
            error: ''
        };
    }

    private addVersion(opInfo: OperationInfo): H.IOResults {
        // Read current inventory, if any
        /* istanbul ignore next */
        if (!this._ocflInventory)
            return {
                success: false,
                error: 'Unable to compute OCFL Inventory',
            };

        // Prepare new version in inventory
        this._ocflInventory.addVersion(opInfo);

        // Ensure new version folder exists
        const version: number = this._ocflInventory.headVersion;
        const destFolder: string = this.versionContentFullPath(version);
        return H.Helpers.initializeDirectory(destFolder, 'OCFL Object new version folder');
    }

    private rollbackVersion(): H.IOResults {
        let retValue: H.IOResults = {
            success: false,
            error: ''
        };

        /* istanbul ignore next */
        if (!this._ocflInventory) {
            retValue.success = false;
            retValue.error = 'Unable to compute OCFL Inventory';
            return retValue;
        }

        const version: number = this._ocflInventory.headVersion;
        if (version) {
            const destFolder: string = this.versionRoot(version);
            retValue = H.Helpers.removeDirectory(destFolder, true);
        }
        /* istanbul ignore next */
        if (!this._ocflInventory.rollbackVersion()) {
            retValue.success = false;
            retValue.error = 'OCL Object Unable to roll back Inventory version';
            return retValue;
        }
        retValue.success = true;
        return retValue;
    }
}


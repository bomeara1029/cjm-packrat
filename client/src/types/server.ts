export enum eVocabularySetID {
    eCaptureDataCaptureMethod,
    eCaptureDataDatasetType,
    eCaptureDataItemPositionType,
    eCaptureDataFocusType,
    eCaptureDataLightSourceType,
    eCaptureDataBackgroundRemovalMethod,
    eCaptureDataClusterType,
    eCaptureDataFileVariantType,
    eModelCreationMethod,
    eModelModality,
    eModelUnits,
    eModelPurpose,
    eModelFileType,
    eModelProcessingActionStepActionMethod,
    eModelMaterialChannelMaterialType,
    eIdentifierIdentifierType,
    eIdentifierIdentifierTypeActor,
    eMetadataMetadataSource,
    eWorkflowStepWorkflowStepType,
    eAssetAssetType,
    eJobJobType,
    eWorkflowType,
    eNone = -1
}

export enum eVocabularyID {
    eIdentifierIdentifierTypeARK,
    eIdentifierIdentifierTypeDOI,
    eIdentifierIdentifierTypeUnitCMSID,
    eAssetAssetTypeBulkIngestion,
    eAssetAssetTypeCaptureDataSetPhotogrammetry,
    eAssetAssetTypeCaptureDataSetDiconde,
    eAssetAssetTypeCaptureDataSetDicom,
    eAssetAssetTypeCaptureDataSetLaserLine,
    eAssetAssetTypeCaptureDataSetSphericalLaser,
    eAssetAssetTypeCaptureDataSetStructuredLight,
    eAssetAssetTypeCaptureDataSetOther,
    eAssetAssetTypeCaptureDataFile,
    eAssetAssetTypeModel,
    eAssetAssetTypeModelGeometryFile,
    eAssetAssetTypeModelUVMapFile,
    eAssetAssetTypeScene,
    eAssetAssetTypeProjectDocumentation,
    eAssetAssetTypeIntermediaryFile,
    eAssetAssetTypeOther,
    eMetadataMetadataSourceBulkIngestion,
    eCaptureDataCaptureMethodPhotogrammetry,
    eCaptureDataCaptureMethodCT,
    eCaptureDataCaptureMethodStructuredLight,
    eCaptureDataCaptureMethodLaserLine,
    eCaptureDataCaptureMethodSphericalLaser,
    eCaptureDataFileVariantTypeRaw,
    eCaptureDataFileVariantTypeProcessed,
    eCaptureDataFileVariantTypeFromCamera,
    eModelCreationMethodScanToMesh,
    eModelCreationMethodCAD,
    eModelModalityPointCloud,
    eModelModalityMesh,
    eModelUnitsMicrometer,
    eModelUnitsMillimeter,
    eModelUnitsCentimeter,
    eModelUnitsMeter,
    eModelUnitsKilometer,
    eModelUnitsInch,
    eModelUnitsFoot,
    eModelUnitsYard,
    eModelUnitsMile,
    eModelUnitsAstronomicalUnit,
    eModelPurposeMaster,
    eModelPurposeWebDelivery,
    eModelPurposeDownload,
    eModelPurposeIntermediateProcessingStep,
    eModelFileTypeobj,
    eModelFileTypeply,
    eModelFileTypestl,
    eModelFileTypeglb,
    eModelFileTypegltf,
    eModelFileTypeusdz,
    eModelFileTypex3d,
    eModelFileTypewrl,
    eModelFileTypedae,
    eModelFileTypefbx,
    eModelFileTypema,
    eModelFileType3ds,
    eModelFileTypeptx,
    eModelFileTypepts,
    eJobJobTypeCookBake,
    eJobJobTypeCookDecimateUnwrap,
    eJobJobTypeCookDecimate,
    eJobJobTypeCookGenerateUsdz,
    eJobJobTypeCookGenerateWebGltf,
    eJobJobTypeCookInspectMesh,
    eJobJobTypeCookSIArBackfillFix,
    eJobJobTypeCookSIGenerateDownloads,
    eJobJobTypeCookSIOrientModelToSvx,
    eJobJobTypeCookSIPackratInspect,
    eJobJobTypeCookSIVoyagerAsset,
    eJobJobTypeCookSIVoyagerScene,
    eJobJobTypeCookUnwrap,
    eWorkflowTypeCookJob,
    eWorkflowTypeIngestion,
    eWorkflowStepTypeStart,
    eNone = -1
}

export enum eMetadata {
    eCommonName,
    eCommonDescription,
    eCommonIdentifier,
    eCommonDateCreated,
    eCommonOrganizationName,
    eHierarchyUnit,
    eHierarchyProject,
    eHierarchySubject,
    eHierarchyItem,
    eUnitARKPrefix,
    eSubjectIdentifierPreferred,
    eItemEntireSubject,
    eCDCaptureMethod,
    eCDDatasetType,
    eCDDatasetFieldID,
    eCDItemPositionType,
    eCDItemPositionFieldID,
    eCDItemArrangementFieldID,
    eCDFocusType,
    eCDLightSourceType,
    eCDBackgroundRemovalMethod,
    eCDClusterType,
    eCDClusterGeometryFieldID,
    eCDCameraSettingsUniform,
    eCDVariantType,
    eModelCreationMethod,
    eModelModality,
    eModelUnits,
    eModelPurpose,
    eModelFileType,
    eModelRoughness,
    eModelMetalness,
    eModelPointCount,
    eModelFaceCount,
    eModelIsWatertight,
    eModelHasNormals,
    eModelHasVertexColor,
    eModelHasUVSpace,
    eModelBoundingBoxP1X,
    eModelBoundingBoxP1Y,
    eModelBoundingBoxP1Z,
    eModelBoundingBoxP2X,
    eModelBoundingBoxP2Y,
    eModelBoundingBoxP2Z,
    eModelUVMapEdgeLength,
    eModelChannelPosition,
    eModelChannelWidth,
    eModelUVMapType,
    eSceneIsOriented,
    eSceneHasBeenQCd,
    eSceneCountScene,
    eSceneCountNode,
    eSceneCountCamera,
    eSceneCountLight,
    eSceneCountModel,
    eSceneCountMeta,
    eSceneCountSetup,
    eSceneCountTour,
    eAssetFileName,
    eAssetFilePath,
    eAssetType,
    eAVUserCreator,
    eAVStorageHash,
    eAVStorageSize,
    eAVIngested,
    eAVBulkIngest,
    eStakeholderEmailAddress,
    eStakeholderPhoneNumberMobile,
    eStakeholderPhoneNumberOffice,
    eStakeholderMailingAddress,
}

export enum eSystemObjectType {
    eUnknown = 0,
    eUnit = 1,
    eProject = 2,
    eSubject = 3,
    eItem = 4,
    eCaptureData = 5,
    eModel = 6,
    eScene = 7,
    eIntermediaryFile = 8,
    eProjectDocumentation = 9,
    eAsset = 10,
    eAssetVersion = 11,
    eActor = 12,
    eStakeholder = 13,
}

export enum ePublishedState {
    eNotPublished = 0,              // 'Not Published', default
    eRestricted = 1,                // 'Restricted',
    eViewOnly = 2,                  // 'View Only',
    eViewDownloadRestriction = 3,   // 'View and Download with usage restrictions',
    eViewDownloadCC0 = 4,           // 'View and Download CC0'
}

export enum eIdentifierIdentifierType {
    eARK = 79,
    eDOI = 80,
    eUnitCMSID = 81
}

export const PublishedStateEnumToString = (eState: ePublishedState): string => {
    switch (eState) {
        case ePublishedState.eRestricted: return 'Restricted';
        case ePublishedState.eViewOnly: return 'View Only';
        case ePublishedState.eViewDownloadRestriction: return 'View and Download with usage restrictions';
        case ePublishedState.eViewDownloadCC0: return 'View and Download CC0';
        default:
        case ePublishedState.eNotPublished: return 'Not Published';
    }
};

export enum eSubjectUnitIdentifierSortColumns {
    eUnitAbbreviation = 1,
    eSubjectName = 2,
    eIdentifierValue = 3,
    eDefault = 0
}

export enum eIcon {
    eIconDownload = 1
}

export enum eAssetGridColumnType {
    eString = 0,
    eNumber = 1,
    eBoolean = 2,
    eHyperLink = 3,
    eDate = 4,
    eFileSize = 5
}

export enum eLinkOrigin {
    eClient = 1,
    eServer = 2,
    eNone = 0
}

export const subjectUnitIdentifierStringToEnum = (col: string): eSubjectUnitIdentifierSortColumns => {
    switch (col) {
        case 'Unit': return eSubjectUnitIdentifierSortColumns.eUnitAbbreviation;
        case 'Name': return eSubjectUnitIdentifierSortColumns.eSubjectName;
        case 'Identifier': return eSubjectUnitIdentifierSortColumns.eIdentifierValue;
        default: return eSubjectUnitIdentifierSortColumns.eDefault;
    }
};

export enum eWorkflowJobRunStatus {
    eUnitialized = 0,
    eCreated = 1,
    eRunning = 2,
    eWaiting = 3,
    eDone = 4,
    eError = 5,
    eCancelled = 6,
}

export enum eWorkflowListSortColumns {
    eSet = 1,
    eType = 2,
    eState = 3,
    eOwner = 4,
    eStart = 5,
    eLast = 6,
    eError = 7,
    eDefault = 0
}

export const workflowListSortStringToEnum = (col: string): eWorkflowListSortColumns => {
    switch (col) {
        case 'idWorkflowSet': return eWorkflowListSortColumns.eSet;
        case 'Type': return eWorkflowListSortColumns.eType;
        case 'State': return eWorkflowListSortColumns.eState;
        case 'Owner': return eWorkflowListSortColumns.eOwner;
        case 'DateStart': return eWorkflowListSortColumns.eStart;
        case 'DateLast': return eWorkflowListSortColumns.eLast;
        case 'Error': return eWorkflowListSortColumns.eError;
        default: return eWorkflowListSortColumns.eDefault;
    }
};

export const workflowListSortEnumToString = (col: eWorkflowListSortColumns): string => {
    switch (col) {
        case eWorkflowListSortColumns.eType: return 'Type';
        case eWorkflowListSortColumns.eState: return 'State';
        case eWorkflowListSortColumns.eOwner: return 'Owner';
        case eWorkflowListSortColumns.eStart: return 'DateStart';
        case eWorkflowListSortColumns.eLast: return 'DateLast';
        case eWorkflowListSortColumns.eError: return 'Error';
        case eWorkflowListSortColumns.eSet: return 'idWorkflowSet';
        default: return 'idWorkflowSet';
    }
};

export const repositoryRowCount = 300;
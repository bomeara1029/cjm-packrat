import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
  BigInt: any;
};

export type Query = {
  __typename?: 'Query';
  areCameraSettingsUniform: AreCameraSettingsUniformResult;
  getAccessPolicy: GetAccessPolicyResult;
  getAllUsers: GetAllUsersResult;
  getAsset: GetAssetResult;
  getAssetDetailsForSystemObject: GetAssetDetailsForSystemObjectResult;
  getAssetVersionsDetails: GetAssetVersionsDetailsResult;
  getCaptureData: GetCaptureDataResult;
  getCaptureDataPhoto: GetCaptureDataPhotoResult;
  getContentsForAssetVersions: GetContentsForAssetVersionsResult;
  getCurrentUser: GetCurrentUserResult;
  getDetailsTabDataForObject: GetDetailsTabDataForObjectResult;
  getFilterViewData: GetFilterViewDataResult;
  getIngestionItemsForSubjects: GetIngestionItemsForSubjectsResult;
  getIngestionProjectsForSubjects: GetIngestionProjectsForSubjectsResult;
  getIntermediaryFile: GetIntermediaryFileResult;
  getItem: GetItemResult;
  getItemsForSubject: GetItemsForSubjectResult;
  getLicense: GetLicenseResult;
  getModel: GetModelResult;
  getModelConstellation: GetModelConstellationResult;
  getModelConstellationForAssetVersion: GetModelConstellationForAssetVersionResult;
  getObjectChildren: GetObjectChildrenResult;
  getObjectsForItem: GetObjectsForItemResult;
  getProject: GetProjectResult;
  getProjectDocumentation: GetProjectDocumentationResult;
  getProjectList: GetProjectListResult;
  getScene: GetSceneResult;
  getSourceObjectIdentifer: GetSourceObjectIdentiferResult;
  getSubject: GetSubjectResult;
  getSubjectsForUnit: GetSubjectsForUnitResult;
  getSystemObjectDetails: GetSystemObjectDetailsResult;
  getUnit: GetUnitResult;
  getUnitsFromNameSearch: GetUnitsFromNameSearchResult;
  getUploadedAssetVersion: GetUploadedAssetVersionResult;
  getUser: GetUserResult;
  getVersionsForSystemObject: GetVersionsForSystemObjectResult;
  getVocabulary: GetVocabularyResult;
  getVocabularyEntries: GetVocabularyEntriesResult;
  getWorkflow: GetWorkflowResult;
  searchIngestionSubjects: SearchIngestionSubjectsResult;
};


export type QueryAreCameraSettingsUniformArgs = {
  input: AreCameraSettingsUniformInput;
};


export type QueryGetAccessPolicyArgs = {
  input: GetAccessPolicyInput;
};


export type QueryGetAllUsersArgs = {
  input: GetAllUsersInput;
};


export type QueryGetAssetArgs = {
  input: GetAssetInput;
};


export type QueryGetAssetDetailsForSystemObjectArgs = {
  input: GetAssetDetailsForSystemObjectInput;
};


export type QueryGetAssetVersionsDetailsArgs = {
  input: GetAssetVersionsDetailsInput;
};


export type QueryGetCaptureDataArgs = {
  input: GetCaptureDataInput;
};


export type QueryGetCaptureDataPhotoArgs = {
  input: GetCaptureDataPhotoInput;
};


export type QueryGetContentsForAssetVersionsArgs = {
  input: GetContentsForAssetVersionsInput;
};


export type QueryGetDetailsTabDataForObjectArgs = {
  input: GetDetailsTabDataForObjectInput;
};


export type QueryGetIngestionItemsForSubjectsArgs = {
  input: GetIngestionItemsForSubjectsInput;
};


export type QueryGetIngestionProjectsForSubjectsArgs = {
  input: GetIngestionProjectsForSubjectsInput;
};


export type QueryGetIntermediaryFileArgs = {
  input: GetIntermediaryFileInput;
};


export type QueryGetItemArgs = {
  input: GetItemInput;
};


export type QueryGetItemsForSubjectArgs = {
  input: GetItemsForSubjectInput;
};


export type QueryGetLicenseArgs = {
  input: GetLicenseInput;
};


export type QueryGetModelArgs = {
  input: GetModelInput;
};


export type QueryGetModelConstellationArgs = {
  input: GetModelConstellationInput;
};


export type QueryGetModelConstellationForAssetVersionArgs = {
  input: GetModelConstellationForAssetVersionInput;
};


export type QueryGetObjectChildrenArgs = {
  input: GetObjectChildrenInput;
};


export type QueryGetObjectsForItemArgs = {
  input: GetObjectsForItemInput;
};


export type QueryGetProjectArgs = {
  input: GetProjectInput;
};


export type QueryGetProjectDocumentationArgs = {
  input: GetProjectDocumentationInput;
};


export type QueryGetProjectListArgs = {
  input: GetProjectListInput;
};


export type QueryGetSceneArgs = {
  input: GetSceneInput;
};


export type QueryGetSourceObjectIdentiferArgs = {
  input: GetSourceObjectIdentiferInput;
};


export type QueryGetSubjectArgs = {
  input: GetSubjectInput;
};


export type QueryGetSubjectsForUnitArgs = {
  input: GetSubjectsForUnitInput;
};


export type QueryGetSystemObjectDetailsArgs = {
  input: GetSystemObjectDetailsInput;
};


export type QueryGetUnitArgs = {
  input: GetUnitInput;
};


export type QueryGetUnitsFromNameSearchArgs = {
  input: GetUnitsFromNameSearchInput;
};


export type QueryGetUserArgs = {
  input: GetUserInput;
};


export type QueryGetVersionsForSystemObjectArgs = {
  input: GetVersionsForSystemObjectInput;
};


export type QueryGetVocabularyArgs = {
  input: GetVocabularyInput;
};


export type QueryGetVocabularyEntriesArgs = {
  input: GetVocabularyEntriesInput;
};


export type QueryGetWorkflowArgs = {
  input: GetWorkflowInput;
};


export type QuerySearchIngestionSubjectsArgs = {
  input: SearchIngestionSubjectsInput;
};

export type GetAccessPolicyInput = {
  idAccessPolicy: Scalars['Int'];
};

export type GetAccessPolicyResult = {
  __typename?: 'GetAccessPolicyResult';
  AccessPolicy?: Maybe<AccessPolicy>;
};


export type AccessAction = {
  __typename?: 'AccessAction';
  idAccessAction: Scalars['Int'];
  Name: Scalars['String'];
  SortOrder: Scalars['Int'];
  AccessRole?: Maybe<Array<Maybe<AccessRole>>>;
};

export type AccessContext = {
  __typename?: 'AccessContext';
  idAccessContext: Scalars['Int'];
  Authoritative: Scalars['Boolean'];
  CaptureData: Scalars['Boolean'];
  Global: Scalars['Boolean'];
  IntermediaryFile: Scalars['Boolean'];
  Model: Scalars['Boolean'];
  Scene: Scalars['Boolean'];
  AccessContextObject?: Maybe<Array<Maybe<AccessContextObject>>>;
  AccessPolicy?: Maybe<Array<Maybe<AccessPolicy>>>;
};

export type AccessContextObject = {
  __typename?: 'AccessContextObject';
  idAccessContextObject: Scalars['Int'];
  idAccessContext: Scalars['Int'];
  idSystemObject: Scalars['Int'];
  AccessContext?: Maybe<AccessContext>;
  SystemObject?: Maybe<SystemObject>;
};

export type AccessPolicy = {
  __typename?: 'AccessPolicy';
  idAccessPolicy: Scalars['Int'];
  idAccessContext: Scalars['Int'];
  idAccessRole: Scalars['Int'];
  idUser: Scalars['Int'];
  AccessContext?: Maybe<AccessContext>;
  AccessRole?: Maybe<AccessRole>;
  User?: Maybe<User>;
};

export type AccessRole = {
  __typename?: 'AccessRole';
  idAccessRole: Scalars['Int'];
  Name: Scalars['String'];
  AccessAction?: Maybe<Array<Maybe<AccessAction>>>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createCaptureData: CreateCaptureDataResult;
  createCaptureDataPhoto: CreateCaptureDataPhotoResult;
  createItem: CreateItemResult;
  createProject: CreateProjectResult;
  createScene: CreateSceneResult;
  createSubject: CreateSubjectResult;
  createUnit: CreateUnitResult;
  createUser: CreateUserResult;
  createVocabulary: CreateVocabularyResult;
  createVocabularySet: CreateVocabularySetResult;
  discardUploadedAssetVersions: DiscardUploadedAssetVersionsResult;
  ingestData: IngestDataResult;
  updateObjectDetails: UpdateObjectDetailsResult;
  updateUser: CreateUserResult;
  uploadAsset: UploadAssetResult;
};


export type MutationCreateCaptureDataArgs = {
  input: CreateCaptureDataInput;
};


export type MutationCreateCaptureDataPhotoArgs = {
  input: CreateCaptureDataPhotoInput;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateSceneArgs = {
  input: CreateSceneInput;
};


export type MutationCreateSubjectArgs = {
  input: CreateSubjectInput;
};


export type MutationCreateUnitArgs = {
  input: CreateUnitInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateVocabularyArgs = {
  input: CreateVocabularyInput;
};


export type MutationCreateVocabularySetArgs = {
  input: CreateVocabularySetInput;
};


export type MutationDiscardUploadedAssetVersionsArgs = {
  input: DiscardUploadedAssetVersionsInput;
};


export type MutationIngestDataArgs = {
  input: IngestDataInput;
};


export type MutationUpdateObjectDetailsArgs = {
  input: UpdateObjectDetailsInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUploadAssetArgs = {
  file: Scalars['Upload'];
  type: Scalars['Int'];
};

export type UploadAssetInput = {
  __typename?: 'UploadAssetInput';
  file: Scalars['Upload'];
  type: Scalars['Int'];
};

export enum UploadStatus {
  Complete = 'COMPLETE',
  Failed = 'FAILED'
}

export type UploadAssetResult = {
  __typename?: 'UploadAssetResult';
  status: UploadStatus;
  idAssetVersions?: Maybe<Array<Scalars['Int']>>;
  error?: Maybe<Scalars['String']>;
};

export type DiscardUploadedAssetVersionsInput = {
  idAssetVersions: Array<Scalars['Int']>;
};

export type DiscardUploadedAssetVersionsResult = {
  __typename?: 'DiscardUploadedAssetVersionsResult';
  success: Scalars['Boolean'];
};

export type GetAssetVersionsDetailsInput = {
  idAssetVersions: Array<Scalars['Int']>;
};

export type IngestIdentifier = {
  __typename?: 'IngestIdentifier';
  identifier: Scalars['String'];
  identifierType: Scalars['Int'];
};

export type IngestFolder = {
  __typename?: 'IngestFolder';
  name: Scalars['String'];
  variantType: Scalars['Int'];
};

export type IngestPhotogrammetry = {
  __typename?: 'IngestPhotogrammetry';
  idAssetVersion: Scalars['Int'];
  name: Scalars['String'];
  dateCaptured: Scalars['String'];
  datasetType: Scalars['Int'];
  systemCreated: Scalars['Boolean'];
  description: Scalars['String'];
  cameraSettingUniform: Scalars['Boolean'];
  datasetFieldId?: Maybe<Scalars['Int']>;
  itemPositionType?: Maybe<Scalars['Int']>;
  itemPositionFieldId?: Maybe<Scalars['Int']>;
  itemArrangementFieldId?: Maybe<Scalars['Int']>;
  focusType?: Maybe<Scalars['Int']>;
  lightsourceType?: Maybe<Scalars['Int']>;
  backgroundRemovalMethod?: Maybe<Scalars['Int']>;
  clusterType?: Maybe<Scalars['Int']>;
  clusterGeometryFieldId?: Maybe<Scalars['Int']>;
  directory: Scalars['String'];
  folders: Array<IngestFolder>;
  identifiers: Array<IngestIdentifier>;
};

export enum RelatedObjectType {
  Source = 'Source',
  Derived = 'Derived'
}

export type RelatedObject = {
  __typename?: 'RelatedObject';
  idSystemObject: Scalars['Int'];
  name: Scalars['String'];
  identifier?: Maybe<Scalars['String']>;
  objectType: Scalars['Int'];
};

export type IngestModel = {
  __typename?: 'IngestModel';
  idAssetVersion: Scalars['Int'];
  systemCreated: Scalars['Boolean'];
  name: Scalars['String'];
  master: Scalars['Boolean'];
  authoritative: Scalars['Boolean'];
  creationMethod: Scalars['Int'];
  modality: Scalars['Int'];
  purpose: Scalars['Int'];
  units: Scalars['Int'];
  dateCaptured: Scalars['String'];
  modelFileType: Scalars['Int'];
  directory: Scalars['String'];
  identifiers: Array<IngestIdentifier>;
  sourceObjects: Array<RelatedObject>;
};

export enum ReferenceModelAction {
  Update = 'Update',
  Ingest = 'Ingest'
}

export type ReferenceModel = {
  __typename?: 'ReferenceModel';
  idSystemObject: Scalars['Int'];
  name: Scalars['String'];
  fileSize: Scalars['BigInt'];
  resolution?: Maybe<Scalars['Int']>;
  boundingBoxP1X?: Maybe<Scalars['Float']>;
  boundingBoxP1Y?: Maybe<Scalars['Float']>;
  boundingBoxP1Z?: Maybe<Scalars['Float']>;
  boundingBoxP2X?: Maybe<Scalars['Float']>;
  boundingBoxP2Y?: Maybe<Scalars['Float']>;
  boundingBoxP2Z?: Maybe<Scalars['Float']>;
  action: ReferenceModelAction;
};

export type IngestScene = {
  __typename?: 'IngestScene';
  idAssetVersion: Scalars['Int'];
  systemCreated: Scalars['Boolean'];
  identifiers: Array<IngestIdentifier>;
  referenceModels: Array<ReferenceModel>;
};

export type GetAssetVersionDetailResult = {
  __typename?: 'GetAssetVersionDetailResult';
  idAssetVersion: Scalars['Int'];
  SubjectUnitIdentifier?: Maybe<SubjectUnitIdentifier>;
  Project?: Maybe<Array<Project>>;
  Item?: Maybe<Item>;
  CaptureDataPhoto?: Maybe<IngestPhotogrammetry>;
  Model?: Maybe<IngestModel>;
  Scene?: Maybe<IngestScene>;
};

export type GetAssetVersionsDetailsResult = {
  __typename?: 'GetAssetVersionsDetailsResult';
  valid: Scalars['Boolean'];
  Details: Array<GetAssetVersionDetailResult>;
};

export type GetAssetInput = {
  idAsset: Scalars['Int'];
};

export type GetAssetResult = {
  __typename?: 'GetAssetResult';
  Asset?: Maybe<Asset>;
};

export type GetUploadedAssetVersionResult = {
  __typename?: 'GetUploadedAssetVersionResult';
  AssetVersion: Array<AssetVersion>;
};

export type GetContentsForAssetVersionsInput = {
  idAssetVersions: Array<Scalars['Int']>;
};

export type AssetVersionContent = {
  __typename?: 'AssetVersionContent';
  idAssetVersion: Scalars['Int'];
  folders: Array<Scalars['String']>;
  all: Array<Scalars['String']>;
};

export type GetContentsForAssetVersionsResult = {
  __typename?: 'GetContentsForAssetVersionsResult';
  AssetVersionContent: Array<AssetVersionContent>;
};

export type GetModelConstellationForAssetVersionInput = {
  idAssetVersion: Scalars['Int'];
};

export type GetModelConstellationForAssetVersionResult = {
  __typename?: 'GetModelConstellationForAssetVersionResult';
  idAssetVersion: Scalars['Int'];
  ModelConstellation?: Maybe<ModelConstellation>;
};


export type Asset = {
  __typename?: 'Asset';
  idAsset: Scalars['Int'];
  FileName: Scalars['String'];
  FilePath: Scalars['String'];
  idAssetGroup?: Maybe<Scalars['Int']>;
  idVAssetType?: Maybe<Scalars['Int']>;
  idSystemObject?: Maybe<Scalars['Int']>;
  StorageKey?: Maybe<Scalars['String']>;
  AssetGroup?: Maybe<AssetGroup>;
  SystemObjectSource?: Maybe<SystemObject>;
  AssetVersion?: Maybe<Array<Maybe<AssetVersion>>>;
  VAssetType?: Maybe<Vocabulary>;
  SystemObject?: Maybe<SystemObject>;
};

export type AssetVersion = {
  __typename?: 'AssetVersion';
  idAssetVersion: Scalars['Int'];
  DateCreated: Scalars['DateTime'];
  idAsset: Scalars['Int'];
  idUserCreator: Scalars['Int'];
  StorageHash: Scalars['String'];
  StorageSize: Scalars['BigInt'];
  StorageKeyStaging: Scalars['String'];
  FileName: Scalars['String'];
  Ingested?: Maybe<Scalars['Boolean']>;
  Version: Scalars['Int'];
  Asset?: Maybe<Asset>;
  User?: Maybe<User>;
  SystemObject?: Maybe<SystemObject>;
};

export type AssetGroup = {
  __typename?: 'AssetGroup';
  idAssetGroup: Scalars['Int'];
  Asset?: Maybe<Array<Maybe<Asset>>>;
};

export type CreateCaptureDataInput = {
  Name: Scalars['String'];
  idVCaptureMethod: Scalars['Int'];
  DateCaptured: Scalars['DateTime'];
  Description: Scalars['String'];
  idAssetThumbnail?: Maybe<Scalars['Int']>;
};

export type CreateCaptureDataResult = {
  __typename?: 'CreateCaptureDataResult';
  CaptureData?: Maybe<CaptureData>;
};

export type CreateCaptureDataPhotoInput = {
  idCaptureData: Scalars['Int'];
  idVCaptureDatasetType: Scalars['Int'];
  CaptureDatasetFieldID: Scalars['Int'];
  ItemPositionFieldID: Scalars['Int'];
  ItemArrangementFieldID: Scalars['Int'];
  idVBackgroundRemovalMethod: Scalars['Int'];
  ClusterGeometryFieldID: Scalars['Int'];
  CameraSettingsUniform: Scalars['Boolean'];
  idVItemPositionType?: Maybe<Scalars['Int']>;
  idVFocusType?: Maybe<Scalars['Int']>;
  idVLightSourceType?: Maybe<Scalars['Int']>;
  idVClusterType?: Maybe<Scalars['Int']>;
};

export type CreateCaptureDataPhotoResult = {
  __typename?: 'CreateCaptureDataPhotoResult';
  CaptureDataPhoto?: Maybe<CaptureDataPhoto>;
};

export type GetCaptureDataInput = {
  idCaptureData: Scalars['Int'];
};

export type GetCaptureDataResult = {
  __typename?: 'GetCaptureDataResult';
  CaptureData?: Maybe<CaptureData>;
};

export type GetCaptureDataPhotoInput = {
  idCaptureDataPhoto: Scalars['Int'];
};

export type GetCaptureDataPhotoResult = {
  __typename?: 'GetCaptureDataPhotoResult';
  CaptureDataPhoto?: Maybe<CaptureDataPhoto>;
};

export type CaptureData = {
  __typename?: 'CaptureData';
  idCaptureData: Scalars['Int'];
  DateCaptured: Scalars['DateTime'];
  Description: Scalars['String'];
  idVCaptureMethod: Scalars['Int'];
  idAssetThumbnail?: Maybe<Scalars['Int']>;
  AssetThumbnail?: Maybe<Asset>;
  VCaptureMethod?: Maybe<Vocabulary>;
  CaptureDataFile?: Maybe<Array<Maybe<CaptureDataFile>>>;
  CaptureDataGroup?: Maybe<Array<Maybe<CaptureDataGroup>>>;
  CaptureDataPhoto?: Maybe<Array<Maybe<CaptureDataPhoto>>>;
  SystemObject?: Maybe<SystemObject>;
};

export type CaptureDataFile = {
  __typename?: 'CaptureDataFile';
  idCaptureDataFile: Scalars['Int'];
  CompressedMultipleFiles: Scalars['Boolean'];
  idAsset: Scalars['Int'];
  idCaptureData: Scalars['Int'];
  idVVariantType: Scalars['Int'];
  Asset?: Maybe<Asset>;
  CaptureData?: Maybe<CaptureData>;
  VVariantType?: Maybe<Vocabulary>;
};

export type CaptureDataGroup = {
  __typename?: 'CaptureDataGroup';
  idCaptureDataGroup: Scalars['Int'];
  CaptureData?: Maybe<Array<Maybe<CaptureData>>>;
};

export type CaptureDataPhoto = {
  __typename?: 'CaptureDataPhoto';
  idCaptureDataPhoto: Scalars['Int'];
  idCaptureData: Scalars['Int'];
  idVCaptureDatasetType: Scalars['Int'];
  CameraSettingsUniform?: Maybe<Scalars['Boolean']>;
  CaptureDatasetFieldID?: Maybe<Scalars['Int']>;
  ClusterGeometryFieldID?: Maybe<Scalars['Int']>;
  idVBackgroundRemovalMethod?: Maybe<Scalars['Int']>;
  idVClusterType?: Maybe<Scalars['Int']>;
  idVFocusType?: Maybe<Scalars['Int']>;
  idVItemPositionType?: Maybe<Scalars['Int']>;
  idVLightSourceType?: Maybe<Scalars['Int']>;
  ItemArrangementFieldID?: Maybe<Scalars['Int']>;
  ItemPositionFieldID?: Maybe<Scalars['Int']>;
  CaptureData?: Maybe<CaptureData>;
  VBackgroundRemovalMethod?: Maybe<Vocabulary>;
  VCaptureDatasetType?: Maybe<Vocabulary>;
  VClusterType?: Maybe<Vocabulary>;
  VFocusType?: Maybe<Vocabulary>;
  VItemPositionType?: Maybe<Vocabulary>;
  VLightSourceType?: Maybe<Vocabulary>;
};

export type IngestSubjectInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  arkId: Scalars['String'];
  unit: Scalars['String'];
};

export type IngestProjectInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type IngestItemInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  entireSubject: Scalars['Boolean'];
};

export type IngestIdentifierInput = {
  identifier: Scalars['String'];
  identifierType: Scalars['Int'];
};

export type IngestFolderInput = {
  name: Scalars['String'];
  variantType: Scalars['Int'];
};

export type IngestPhotogrammetryInput = {
  idAssetVersion: Scalars['Int'];
  name: Scalars['String'];
  dateCaptured: Scalars['String'];
  datasetType: Scalars['Int'];
  systemCreated: Scalars['Boolean'];
  description: Scalars['String'];
  cameraSettingUniform: Scalars['Boolean'];
  datasetFieldId?: Maybe<Scalars['Int']>;
  itemPositionType?: Maybe<Scalars['Int']>;
  itemPositionFieldId?: Maybe<Scalars['Int']>;
  itemArrangementFieldId?: Maybe<Scalars['Int']>;
  focusType?: Maybe<Scalars['Int']>;
  lightsourceType?: Maybe<Scalars['Int']>;
  backgroundRemovalMethod?: Maybe<Scalars['Int']>;
  clusterType?: Maybe<Scalars['Int']>;
  clusterGeometryFieldId?: Maybe<Scalars['Int']>;
  directory: Scalars['String'];
  folders: Array<IngestFolderInput>;
  identifiers: Array<IngestIdentifierInput>;
};

export type IngestUvMapInput = {
  name: Scalars['String'];
  edgeLength: Scalars['Int'];
  mapType: Scalars['Int'];
};

export type RelatedObjectInput = {
  idSystemObject: Scalars['Int'];
  name: Scalars['String'];
  identifier?: Maybe<Scalars['String']>;
  objectType: Scalars['Int'];
};

export type IngestModelInput = {
  idAssetVersion: Scalars['Int'];
  systemCreated: Scalars['Boolean'];
  name: Scalars['String'];
  master: Scalars['Boolean'];
  authoritative: Scalars['Boolean'];
  creationMethod: Scalars['Int'];
  modality: Scalars['Int'];
  purpose: Scalars['Int'];
  units: Scalars['Int'];
  dateCaptured: Scalars['String'];
  modelFileType: Scalars['Int'];
  directory: Scalars['String'];
  identifiers: Array<IngestIdentifierInput>;
  sourceObjects: Array<RelatedObjectInput>;
};

export type ReferenceModelInput = {
  idSystemObject: Scalars['Int'];
  name: Scalars['String'];
  fileSize: Scalars['BigInt'];
  resolution?: Maybe<Scalars['Int']>;
  boundingBoxP1X?: Maybe<Scalars['Float']>;
  boundingBoxP1Y?: Maybe<Scalars['Float']>;
  boundingBoxP1Z?: Maybe<Scalars['Float']>;
  boundingBoxP2X?: Maybe<Scalars['Float']>;
  boundingBoxP2Y?: Maybe<Scalars['Float']>;
  boundingBoxP2Z?: Maybe<Scalars['Float']>;
  action: ReferenceModelAction;
};

export type IngestSceneInput = {
  idAssetVersion: Scalars['Int'];
  systemCreated: Scalars['Boolean'];
  identifiers: Array<IngestIdentifierInput>;
  referenceModels: Array<ReferenceModelInput>;
};

export type IngestOtherInput = {
  idAssetVersion: Scalars['Int'];
  systemCreated: Scalars['Boolean'];
  identifiers: Array<IngestIdentifierInput>;
};

export type IngestDataInput = {
  subjects: Array<IngestSubjectInput>;
  project: IngestProjectInput;
  item: IngestItemInput;
  photogrammetry: Array<IngestPhotogrammetryInput>;
  model: Array<IngestModelInput>;
  scene: Array<IngestSceneInput>;
  other: Array<IngestOtherInput>;
};

export type IngestDataResult = {
  __typename?: 'IngestDataResult';
  success: Scalars['Boolean'];
};

export type AreCameraSettingsUniformInput = {
  idAssetVersion: Scalars['Int'];
};

export type AreCameraSettingsUniformResult = {
  __typename?: 'AreCameraSettingsUniformResult';
  isUniform: Scalars['Boolean'];
};

export type GetLicenseInput = {
  idLicense: Scalars['Int'];
};

export type GetLicenseResult = {
  __typename?: 'GetLicenseResult';
  License?: Maybe<License>;
};

export type License = {
  __typename?: 'License';
  idLicense: Scalars['Int'];
  Description: Scalars['String'];
  Name: Scalars['String'];
  LicenseAssignment?: Maybe<Array<Maybe<LicenseAssignment>>>;
};

export type LicenseAssignment = {
  __typename?: 'LicenseAssignment';
  idLicenseAssignment: Scalars['Int'];
  idLicense: Scalars['Int'];
  DateEnd?: Maybe<Scalars['DateTime']>;
  DateStart?: Maybe<Scalars['DateTime']>;
  idSystemObject?: Maybe<Scalars['Int']>;
  idUserCreator?: Maybe<Scalars['Int']>;
  License?: Maybe<License>;
  SystemObject?: Maybe<SystemObject>;
  UserCreator?: Maybe<User>;
};

export type GetModelInput = {
  idModel: Scalars['Int'];
};

export type GetModelResult = {
  __typename?: 'GetModelResult';
  Model?: Maybe<Model>;
};

export type GetModelConstellationInput = {
  idModel: Scalars['Int'];
};

export type GetModelConstellationResult = {
  __typename?: 'GetModelConstellationResult';
  ModelConstellation?: Maybe<ModelConstellation>;
};

export type Model = {
  __typename?: 'Model';
  idModel: Scalars['Int'];
  Name: Scalars['String'];
  DateCreated: Scalars['DateTime'];
  Master: Scalars['Boolean'];
  Authoritative: Scalars['Boolean'];
  idVCreationMethod: Scalars['Int'];
  idVModality: Scalars['Int'];
  idVPurpose: Scalars['Int'];
  idVUnits: Scalars['Int'];
  idVFileType: Scalars['Int'];
  idAssetThumbnail?: Maybe<Scalars['Int']>;
  CountAnimations?: Maybe<Scalars['Int']>;
  CountCameras?: Maybe<Scalars['Int']>;
  CountFaces?: Maybe<Scalars['Int']>;
  CountLights?: Maybe<Scalars['Int']>;
  CountMaterials?: Maybe<Scalars['Int']>;
  CountMeshes?: Maybe<Scalars['Int']>;
  CountVertices?: Maybe<Scalars['Int']>;
  CountEmbeddedTextures?: Maybe<Scalars['Int']>;
  CountLinkedTextures?: Maybe<Scalars['Int']>;
  FileEncoding?: Maybe<Scalars['String']>;
  ModelConstellation?: Maybe<ModelConstellation>;
  VCreationMethod?: Maybe<Vocabulary>;
  VModality?: Maybe<Vocabulary>;
  VPurpose?: Maybe<Vocabulary>;
  VUnits?: Maybe<Vocabulary>;
  VFileType?: Maybe<Vocabulary>;
  AssetThumbnail?: Maybe<Asset>;
  ModelObject?: Maybe<Array<Maybe<ModelObject>>>;
  ModelProcessingAction?: Maybe<Array<Maybe<ModelProcessingAction>>>;
  ModelSceneXref?: Maybe<Array<Maybe<ModelSceneXref>>>;
  SystemObject?: Maybe<SystemObject>;
};

export type ModelObjectModelMaterialXref = {
  __typename?: 'ModelObjectModelMaterialXref';
  idModelObjectModelMaterialXref: Scalars['Int'];
  idModelObject: Scalars['Int'];
  idModelMaterial: Scalars['Int'];
  ModelObject?: Maybe<ModelObject>;
  ModelMaterial?: Maybe<ModelMaterial>;
};

export type ModelMaterial = {
  __typename?: 'ModelMaterial';
  idModelMaterial: Scalars['Int'];
  Name?: Maybe<Scalars['String']>;
  ModelMaterialChannel?: Maybe<Array<Maybe<ModelMaterialChannel>>>;
};

export type ModelMaterialChannel = {
  __typename?: 'ModelMaterialChannel';
  idModelMaterialChannel: Scalars['Int'];
  idModelMaterial: Scalars['Int'];
  idVMaterialType?: Maybe<Scalars['Int']>;
  MaterialTypeOther?: Maybe<Scalars['String']>;
  idModelMaterialUVMap?: Maybe<Scalars['Int']>;
  UVMapEmbedded?: Maybe<Scalars['Boolean']>;
  ChannelPosition?: Maybe<Scalars['Int']>;
  ChannelWidth?: Maybe<Scalars['Int']>;
  Scalar1?: Maybe<Scalars['Float']>;
  Scalar2?: Maybe<Scalars['Float']>;
  Scalar3?: Maybe<Scalars['Float']>;
  Scalar4?: Maybe<Scalars['Float']>;
  AdditionalAttributes?: Maybe<Scalars['String']>;
  ModelMaterial?: Maybe<ModelMaterial>;
  VMaterialType?: Maybe<Vocabulary>;
  ModelMaterialUVMap?: Maybe<ModelMaterialUvMap>;
  Type?: Maybe<Scalars['String']>;
  Source?: Maybe<Scalars['String']>;
  Value?: Maybe<Scalars['String']>;
};

export type ModelMaterialUvMap = {
  __typename?: 'ModelMaterialUVMap';
  idModelMaterialUVMap: Scalars['Int'];
  idModel: Scalars['Int'];
  idAsset: Scalars['Int'];
  UVMapEdgeLength: Scalars['Int'];
  Model?: Maybe<Model>;
  Asset?: Maybe<Asset>;
};

export type ModelObject = {
  __typename?: 'ModelObject';
  idModelObject: Scalars['Int'];
  idModel: Scalars['Int'];
  BoundingBoxP1X?: Maybe<Scalars['Float']>;
  BoundingBoxP1Y?: Maybe<Scalars['Float']>;
  BoundingBoxP1Z?: Maybe<Scalars['Float']>;
  BoundingBoxP2X?: Maybe<Scalars['Float']>;
  BoundingBoxP2Y?: Maybe<Scalars['Float']>;
  BoundingBoxP2Z?: Maybe<Scalars['Float']>;
  CountVertices?: Maybe<Scalars['Int']>;
  CountFaces?: Maybe<Scalars['Int']>;
  CountColorChannels?: Maybe<Scalars['Int']>;
  CountTextureCoordinateChannels?: Maybe<Scalars['Int']>;
  HasBones?: Maybe<Scalars['Boolean']>;
  HasFaceNormals?: Maybe<Scalars['Boolean']>;
  HasTangents?: Maybe<Scalars['Boolean']>;
  HasTextureCoordinates?: Maybe<Scalars['Boolean']>;
  HasVertexNormals?: Maybe<Scalars['Boolean']>;
  HasVertexColor?: Maybe<Scalars['Boolean']>;
  IsTwoManifoldUnbounded?: Maybe<Scalars['Boolean']>;
  IsTwoManifoldBounded?: Maybe<Scalars['Boolean']>;
  IsWatertight?: Maybe<Scalars['Boolean']>;
  SelfIntersecting?: Maybe<Scalars['Boolean']>;
  Model?: Maybe<Model>;
};

export type ModelProcessingAction = {
  __typename?: 'ModelProcessingAction';
  idModelProcessingAction: Scalars['Int'];
  DateProcessed: Scalars['DateTime'];
  Description: Scalars['String'];
  idActor: Scalars['Int'];
  idModel: Scalars['Int'];
  ToolsUsed: Scalars['String'];
  Actor?: Maybe<Actor>;
  Model?: Maybe<Model>;
  ModelProcessingActionStep: Array<Maybe<ModelProcessingActionStep>>;
};

export type ModelProcessingActionStep = {
  __typename?: 'ModelProcessingActionStep';
  idModelProcessingActionStep: Scalars['Int'];
  Description: Scalars['String'];
  idModelProcessingAction: Scalars['Int'];
  idVActionMethod: Scalars['Int'];
  ModelProcessingAction?: Maybe<ModelProcessingAction>;
  VActionMethod?: Maybe<Vocabulary>;
};

export type ModelSceneXref = {
  __typename?: 'ModelSceneXref';
  idModelSceneXref: Scalars['Int'];
  idModel: Scalars['Int'];
  idScene: Scalars['Int'];
  R0?: Maybe<Scalars['Float']>;
  R1?: Maybe<Scalars['Float']>;
  R2?: Maybe<Scalars['Float']>;
  R3?: Maybe<Scalars['Float']>;
  TS0?: Maybe<Scalars['Float']>;
  TS1?: Maybe<Scalars['Float']>;
  TS2?: Maybe<Scalars['Float']>;
  Model?: Maybe<Model>;
  Scene?: Maybe<Scene>;
};

export type ModelAsset = {
  __typename?: 'ModelAsset';
  Asset: Asset;
  AssetVersion: AssetVersion;
  AssetName: Scalars['String'];
  AssetType: Scalars['String'];
};

export type ModelConstellation = {
  __typename?: 'ModelConstellation';
  Model: Model;
  ModelObjects?: Maybe<Array<ModelObject>>;
  ModelMaterials?: Maybe<Array<ModelMaterial>>;
  ModelMaterialChannels?: Maybe<Array<ModelMaterialChannel>>;
  ModelMaterialUVMaps?: Maybe<Array<ModelMaterialUvMap>>;
  ModelObjectModelMaterialXref?: Maybe<Array<ModelObjectModelMaterialXref>>;
  ModelAssets?: Maybe<Array<ModelAsset>>;
};

export type PaginationInput = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};

export type GetObjectChildrenInput = {
  idRoot: Scalars['Int'];
  objectTypes: Array<Scalars['Int']>;
  objectsToDisplay: Array<Scalars['Int']>;
  metadataColumns: Array<Scalars['Int']>;
  search: Scalars['String'];
  units: Array<Scalars['Int']>;
  projects: Array<Scalars['Int']>;
  has: Array<Scalars['Int']>;
  missing: Array<Scalars['Int']>;
  captureMethod: Array<Scalars['Int']>;
  variantType: Array<Scalars['Int']>;
  modelPurpose: Array<Scalars['Int']>;
  modelFileType: Array<Scalars['Int']>;
};

export type NavigationResultEntry = {
  __typename?: 'NavigationResultEntry';
  idSystemObject: Scalars['Int'];
  name: Scalars['String'];
  objectType: Scalars['Int'];
  idObject: Scalars['Int'];
  metadata: Array<Scalars['String']>;
};

export type GetObjectChildrenResult = {
  __typename?: 'GetObjectChildrenResult';
  success: Scalars['Boolean'];
  error: Scalars['String'];
  entries: Array<NavigationResultEntry>;
  metadataColumns: Array<Scalars['Int']>;
};

export type GetFilterViewDataResult = {
  __typename?: 'GetFilterViewDataResult';
  units: Array<Unit>;
  projects: Array<Project>;
};

export type CreateSceneInput = {
  Name: Scalars['String'];
  HasBeenQCd: Scalars['Boolean'];
  IsOriented: Scalars['Boolean'];
  idAssetThumbnail?: Maybe<Scalars['Int']>;
};

export type CreateSceneResult = {
  __typename?: 'CreateSceneResult';
  Scene?: Maybe<Scene>;
};

export type GetSceneInput = {
  idScene: Scalars['Int'];
};

export type GetSceneResult = {
  __typename?: 'GetSceneResult';
  Scene?: Maybe<Scene>;
};

export type GetIntermediaryFileInput = {
  idIntermediaryFile: Scalars['Int'];
};

export type GetIntermediaryFileResult = {
  __typename?: 'GetIntermediaryFileResult';
  IntermediaryFile?: Maybe<IntermediaryFile>;
};

export type Scene = {
  __typename?: 'Scene';
  idScene: Scalars['Int'];
  HasBeenQCd: Scalars['Boolean'];
  idAssetThumbnail?: Maybe<Scalars['Int']>;
  IsOriented: Scalars['Boolean'];
  Name: Scalars['String'];
  AssetThumbnail?: Maybe<Asset>;
  ModelSceneXref?: Maybe<Array<Maybe<ModelSceneXref>>>;
  SystemObject?: Maybe<SystemObject>;
};

export type Actor = {
  __typename?: 'Actor';
  idActor: Scalars['Int'];
  idUnit?: Maybe<Scalars['Int']>;
  IndividualName?: Maybe<Scalars['String']>;
  OrganizationName?: Maybe<Scalars['String']>;
  Unit?: Maybe<Unit>;
  SystemObject?: Maybe<SystemObject>;
};

export type IntermediaryFile = {
  __typename?: 'IntermediaryFile';
  idIntermediaryFile: Scalars['Int'];
  DateCreated: Scalars['DateTime'];
  idAsset: Scalars['Int'];
  Asset?: Maybe<Asset>;
  SystemObject?: Maybe<SystemObject>;
};

export type UpdateObjectDetailsInput = {
  idSystemObject: Scalars['Int'];
  idObject: Scalars['Int'];
  objectType: Scalars['Int'];
  data: UpdateObjectDetailsDataInput;
};

export type UnitDetailFieldsInput = {
  Abbreviation?: Maybe<Scalars['String']>;
  ARKPrefix?: Maybe<Scalars['String']>;
};

export type ProjectDetailFieldsInput = {
  Description?: Maybe<Scalars['String']>;
};

export type SubjectDetailFieldsInput = {
  Altitude?: Maybe<Scalars['Float']>;
  Latitude?: Maybe<Scalars['Float']>;
  Longitude?: Maybe<Scalars['Float']>;
  R0?: Maybe<Scalars['Float']>;
  R1?: Maybe<Scalars['Float']>;
  R2?: Maybe<Scalars['Float']>;
  R3?: Maybe<Scalars['Float']>;
  TS0?: Maybe<Scalars['Float']>;
  TS1?: Maybe<Scalars['Float']>;
  TS2?: Maybe<Scalars['Float']>;
};

export type ItemDetailFieldsInput = {
  EntireSubject?: Maybe<Scalars['Boolean']>;
  Altitude?: Maybe<Scalars['Float']>;
  Latitude?: Maybe<Scalars['Float']>;
  Longitude?: Maybe<Scalars['Float']>;
  R0?: Maybe<Scalars['Float']>;
  R1?: Maybe<Scalars['Float']>;
  R2?: Maybe<Scalars['Float']>;
  R3?: Maybe<Scalars['Float']>;
  TS0?: Maybe<Scalars['Float']>;
  TS1?: Maybe<Scalars['Float']>;
  TS2?: Maybe<Scalars['Float']>;
};

export type CaptureDataDetailFieldsInput = {
  captureMethod?: Maybe<Scalars['Int']>;
  dateCaptured?: Maybe<Scalars['DateTime']>;
  datasetType?: Maybe<Scalars['Int']>;
  systemCreated?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  cameraSettingUniform?: Maybe<Scalars['Boolean']>;
  datasetFieldId?: Maybe<Scalars['Int']>;
  itemPositionType?: Maybe<Scalars['Int']>;
  itemPositionFieldId?: Maybe<Scalars['Int']>;
  itemArrangementFieldId?: Maybe<Scalars['Int']>;
  focusType?: Maybe<Scalars['Int']>;
  lightsourceType?: Maybe<Scalars['Int']>;
  backgroundRemovalMethod?: Maybe<Scalars['Int']>;
  clusterType?: Maybe<Scalars['Int']>;
  clusterGeometryFieldId?: Maybe<Scalars['Int']>;
  folders: Array<IngestFolderInput>;
};

export type ModelDetailFieldsInput = {
  Name?: Maybe<Scalars['String']>;
  Master?: Maybe<Scalars['Boolean']>;
  Authoritative?: Maybe<Scalars['Boolean']>;
  CreationMethod?: Maybe<Scalars['Int']>;
  Modality?: Maybe<Scalars['Int']>;
  Purpose?: Maybe<Scalars['Int']>;
  Units?: Maybe<Scalars['Int']>;
  DateCaptured?: Maybe<Scalars['DateTime']>;
  ModelFileType?: Maybe<Scalars['Int']>;
};

export type SceneDetailFieldsInput = {
  Links: Array<Scalars['String']>;
  AssetType?: Maybe<Scalars['Int']>;
  Tours?: Maybe<Scalars['Int']>;
  Annotation?: Maybe<Scalars['Int']>;
  HasBeenQCd?: Maybe<Scalars['Boolean']>;
  IsOriented?: Maybe<Scalars['Boolean']>;
};

export type ProjectDocumentationDetailFieldsInput = {
  Description?: Maybe<Scalars['String']>;
};

export type AssetDetailFieldsInput = {
  FilePath?: Maybe<Scalars['String']>;
  AssetType?: Maybe<Scalars['Int']>;
};

export type AssetVersionDetailFieldsInput = {
  Creator?: Maybe<Scalars['String']>;
  DateCreated?: Maybe<Scalars['DateTime']>;
  Ingested?: Maybe<Scalars['Boolean']>;
  Version?: Maybe<Scalars['Int']>;
  StorageSize?: Maybe<Scalars['BigInt']>;
};

export type ActorDetailFieldsInput = {
  OrganizationName?: Maybe<Scalars['String']>;
};

export type StakeholderDetailFieldsInput = {
  OrganizationName?: Maybe<Scalars['String']>;
  MailingAddress?: Maybe<Scalars['String']>;
  EmailAddress?: Maybe<Scalars['String']>;
  PhoneNumberMobile?: Maybe<Scalars['String']>;
  PhoneNumberOffice?: Maybe<Scalars['String']>;
};

export type UpdateObjectDetailsDataInput = {
  Name?: Maybe<Scalars['String']>;
  Retired?: Maybe<Scalars['Boolean']>;
  Unit?: Maybe<UnitDetailFieldsInput>;
  Project?: Maybe<ProjectDetailFieldsInput>;
  Subject?: Maybe<SubjectDetailFieldsInput>;
  Item?: Maybe<ItemDetailFieldsInput>;
  CaptureData?: Maybe<CaptureDataDetailFieldsInput>;
  Model?: Maybe<ModelDetailFieldsInput>;
  Scene?: Maybe<SceneDetailFieldsInput>;
  ProjectDocumentation?: Maybe<ProjectDocumentationDetailFieldsInput>;
  Asset?: Maybe<AssetDetailFieldsInput>;
  AssetVersion?: Maybe<AssetVersionDetailFieldsInput>;
  Actor?: Maybe<ActorDetailFieldsInput>;
  Stakeholder?: Maybe<StakeholderDetailFieldsInput>;
};

export type UpdateObjectDetailsResult = {
  __typename?: 'UpdateObjectDetailsResult';
  success: Scalars['Boolean'];
};

export type GetDetailsTabDataForObjectInput = {
  idSystemObject: Scalars['Int'];
  objectType: Scalars['Int'];
};

export type UnitDetailFields = {
  __typename?: 'UnitDetailFields';
  Abbreviation?: Maybe<Scalars['String']>;
  ARKPrefix?: Maybe<Scalars['String']>;
};

export type ProjectDetailFields = {
  __typename?: 'ProjectDetailFields';
  Description?: Maybe<Scalars['String']>;
};

export type SubjectDetailFields = {
  __typename?: 'SubjectDetailFields';
  Altitude?: Maybe<Scalars['Float']>;
  Latitude?: Maybe<Scalars['Float']>;
  Longitude?: Maybe<Scalars['Float']>;
  R0?: Maybe<Scalars['Float']>;
  R1?: Maybe<Scalars['Float']>;
  R2?: Maybe<Scalars['Float']>;
  R3?: Maybe<Scalars['Float']>;
  TS0?: Maybe<Scalars['Float']>;
  TS1?: Maybe<Scalars['Float']>;
  TS2?: Maybe<Scalars['Float']>;
};

export type ItemDetailFields = {
  __typename?: 'ItemDetailFields';
  EntireSubject?: Maybe<Scalars['Boolean']>;
  Altitude?: Maybe<Scalars['Float']>;
  Latitude?: Maybe<Scalars['Float']>;
  Longitude?: Maybe<Scalars['Float']>;
  R0?: Maybe<Scalars['Float']>;
  R1?: Maybe<Scalars['Float']>;
  R2?: Maybe<Scalars['Float']>;
  R3?: Maybe<Scalars['Float']>;
  TS0?: Maybe<Scalars['Float']>;
  TS1?: Maybe<Scalars['Float']>;
  TS2?: Maybe<Scalars['Float']>;
};

export type CaptureDataDetailFields = {
  __typename?: 'CaptureDataDetailFields';
  captureMethod?: Maybe<Scalars['Int']>;
  dateCaptured?: Maybe<Scalars['String']>;
  datasetType?: Maybe<Scalars['Int']>;
  systemCreated?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  cameraSettingUniform?: Maybe<Scalars['Boolean']>;
  datasetFieldId?: Maybe<Scalars['Int']>;
  itemPositionType?: Maybe<Scalars['Int']>;
  itemPositionFieldId?: Maybe<Scalars['Int']>;
  itemArrangementFieldId?: Maybe<Scalars['Int']>;
  focusType?: Maybe<Scalars['Int']>;
  lightsourceType?: Maybe<Scalars['Int']>;
  backgroundRemovalMethod?: Maybe<Scalars['Int']>;
  clusterType?: Maybe<Scalars['Int']>;
  clusterGeometryFieldId?: Maybe<Scalars['Int']>;
  folders: Array<IngestFolder>;
};

export type SceneDetailFields = {
  __typename?: 'SceneDetailFields';
  Links: Array<Scalars['String']>;
  AssetType?: Maybe<Scalars['Int']>;
  Tours?: Maybe<Scalars['Int']>;
  Annotation?: Maybe<Scalars['Int']>;
  HasBeenQCd?: Maybe<Scalars['Boolean']>;
  IsOriented?: Maybe<Scalars['Boolean']>;
};

export type IntermediaryFileDetailFields = {
  __typename?: 'IntermediaryFileDetailFields';
  idIntermediaryFile: Scalars['Int'];
};

export type ProjectDocumentationDetailFields = {
  __typename?: 'ProjectDocumentationDetailFields';
  Description?: Maybe<Scalars['String']>;
};

export type AssetDetailFields = {
  __typename?: 'AssetDetailFields';
  FilePath?: Maybe<Scalars['String']>;
  AssetType?: Maybe<Scalars['Int']>;
};

export type AssetVersionDetailFields = {
  __typename?: 'AssetVersionDetailFields';
  Creator?: Maybe<Scalars['String']>;
  DateCreated?: Maybe<Scalars['DateTime']>;
  Ingested?: Maybe<Scalars['Boolean']>;
  Version?: Maybe<Scalars['Int']>;
  StorageSize?: Maybe<Scalars['BigInt']>;
};

export type ActorDetailFields = {
  __typename?: 'ActorDetailFields';
  OrganizationName?: Maybe<Scalars['String']>;
};

export type StakeholderDetailFields = {
  __typename?: 'StakeholderDetailFields';
  OrganizationName?: Maybe<Scalars['String']>;
  MailingAddress?: Maybe<Scalars['String']>;
  EmailAddress?: Maybe<Scalars['String']>;
  PhoneNumberMobile?: Maybe<Scalars['String']>;
  PhoneNumberOffice?: Maybe<Scalars['String']>;
};

export type GetDetailsTabDataForObjectResult = {
  __typename?: 'GetDetailsTabDataForObjectResult';
  Unit?: Maybe<UnitDetailFields>;
  Project?: Maybe<ProjectDetailFields>;
  Subject?: Maybe<SubjectDetailFields>;
  Item?: Maybe<ItemDetailFields>;
  CaptureData?: Maybe<CaptureDataDetailFields>;
  Model?: Maybe<ModelConstellation>;
  Scene?: Maybe<SceneDetailFields>;
  IntermediaryFile?: Maybe<IntermediaryFileDetailFields>;
  ProjectDocumentation?: Maybe<ProjectDocumentationDetailFields>;
  Asset?: Maybe<AssetDetailFields>;
  AssetVersion?: Maybe<AssetVersionDetailFields>;
  Actor?: Maybe<ActorDetailFields>;
  Stakeholder?: Maybe<StakeholderDetailFields>;
};

export type GetSystemObjectDetailsInput = {
  idSystemObject: Scalars['Int'];
};

export type RepositoryPath = {
  __typename?: 'RepositoryPath';
  idSystemObject: Scalars['Int'];
  name: Scalars['String'];
  objectType: Scalars['Int'];
};

export type GetSystemObjectDetailsResult = {
  __typename?: 'GetSystemObjectDetailsResult';
  idObject: Scalars['Int'];
  name: Scalars['String'];
  retired: Scalars['Boolean'];
  objectType: Scalars['Int'];
  allowed: Scalars['Boolean'];
  publishedState: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  identifiers: Array<IngestIdentifier>;
  objectAncestors: Array<Array<RepositoryPath>>;
  sourceObjects: Array<RelatedObject>;
  derivedObjects: Array<RelatedObject>;
  unit?: Maybe<RepositoryPath>;
  project?: Maybe<RepositoryPath>;
  subject?: Maybe<RepositoryPath>;
  item?: Maybe<RepositoryPath>;
};

export type GetSourceObjectIdentiferInput = {
  idSystemObjects: Array<Scalars['Int']>;
};

export type SourceObjectIdentifier = {
  __typename?: 'SourceObjectIdentifier';
  idSystemObject: Scalars['Int'];
  identifier?: Maybe<Scalars['String']>;
};

export type GetSourceObjectIdentiferResult = {
  __typename?: 'GetSourceObjectIdentiferResult';
  sourceObjectIdentifiers: Array<SourceObjectIdentifier>;
};

export type AssetDetail = {
  __typename?: 'AssetDetail';
  idSystemObject: Scalars['Int'];
  name: Scalars['String'];
  path: Scalars['String'];
  assetType: Scalars['Int'];
  version: Scalars['Int'];
  dateCreated: Scalars['DateTime'];
  size: Scalars['BigInt'];
};

export type GetAssetDetailsForSystemObjectInput = {
  idSystemObject: Scalars['Int'];
};

export type GetAssetDetailsForSystemObjectResult = {
  __typename?: 'GetAssetDetailsForSystemObjectResult';
  assetDetails: Array<AssetDetail>;
};

export type DetailVersion = {
  __typename?: 'DetailVersion';
  idSystemObject: Scalars['Int'];
  version: Scalars['Int'];
  name: Scalars['String'];
  creator: Scalars['String'];
  dateCreated: Scalars['DateTime'];
  size: Scalars['BigInt'];
};

export type GetVersionsForSystemObjectInput = {
  idSystemObject: Scalars['Int'];
};

export type GetVersionsForSystemObjectResult = {
  __typename?: 'GetVersionsForSystemObjectResult';
  versions: Array<DetailVersion>;
};

export type GetProjectListResult = {
  __typename?: 'GetProjectListResult';
  projects: Array<Project>;
};

export type GetProjectListInput = {
  search: Scalars['String'];
};

export type SystemObject = {
  __typename?: 'SystemObject';
  idSystemObject: Scalars['Int'];
  Retired: Scalars['Boolean'];
  idActor?: Maybe<Scalars['Int']>;
  idAsset?: Maybe<Scalars['Int']>;
  idAssetVersion?: Maybe<Scalars['Int']>;
  idCaptureData?: Maybe<Scalars['Int']>;
  idIntermediaryFile?: Maybe<Scalars['Int']>;
  idItem?: Maybe<Scalars['Int']>;
  idModel?: Maybe<Scalars['Int']>;
  idProject?: Maybe<Scalars['Int']>;
  idProjectDocumentation?: Maybe<Scalars['Int']>;
  idScene?: Maybe<Scalars['Int']>;
  idStakeholder?: Maybe<Scalars['Int']>;
  idSubject?: Maybe<Scalars['Int']>;
  idUnit?: Maybe<Scalars['Int']>;
  idWorkflow?: Maybe<Scalars['Int']>;
  idWorkflowStep?: Maybe<Scalars['Int']>;
  Actor?: Maybe<Actor>;
  Asset?: Maybe<Asset>;
  AssetVersion?: Maybe<AssetVersion>;
  CaptureData?: Maybe<CaptureData>;
  IntermediaryFile?: Maybe<IntermediaryFile>;
  Item?: Maybe<Item>;
  Model?: Maybe<Model>;
  Project?: Maybe<Project>;
  ProjectDocumentation?: Maybe<ProjectDocumentation>;
  Scene?: Maybe<Scene>;
  Stakeholder?: Maybe<Stakeholder>;
  Subject?: Maybe<Subject>;
  Unit?: Maybe<Unit>;
  Workflow?: Maybe<Workflow>;
  WorkflowStep?: Maybe<WorkflowStep>;
  AccessContextObject?: Maybe<Array<Maybe<AccessContextObject>>>;
  Identifier?: Maybe<Array<Maybe<Identifier>>>;
  LicenseAssignment?: Maybe<Array<Maybe<LicenseAssignment>>>;
  Metadata?: Maybe<Array<Maybe<Metadata>>>;
  SystemObjectVersion?: Maybe<Array<Maybe<SystemObjectVersion>>>;
  SystemObjectDerived?: Maybe<Array<Maybe<SystemObject>>>;
  SystemObjectMaster?: Maybe<Array<Maybe<SystemObject>>>;
  UserPersonalizationSystemObject?: Maybe<Array<Maybe<UserPersonalizationSystemObject>>>;
  WorkflowStepXref?: Maybe<Array<Maybe<WorkflowStep>>>;
};

export type SystemObjectVersion = {
  __typename?: 'SystemObjectVersion';
  idSystemObjectVersion: Scalars['Int'];
  idSystemObject: Scalars['Int'];
  PublishedState: Scalars['Int'];
  SystemObject?: Maybe<SystemObject>;
};

export type Identifier = {
  __typename?: 'Identifier';
  idIdentifier: Scalars['Int'];
  IdentifierValue: Scalars['String'];
  idSystemObject?: Maybe<Scalars['Int']>;
  idVIdentifierType?: Maybe<Scalars['Int']>;
  SystemObject?: Maybe<SystemObject>;
  VIdentifierType?: Maybe<Vocabulary>;
};

export type Metadata = {
  __typename?: 'Metadata';
  idMetadata: Scalars['Int'];
  Name: Scalars['String'];
  idAssetValue?: Maybe<Scalars['Int']>;
  idSystemObject?: Maybe<Scalars['Int']>;
  idUser?: Maybe<Scalars['Int']>;
  idVMetadataSource?: Maybe<Scalars['Int']>;
  ValueExtended?: Maybe<Scalars['String']>;
  ValueShort?: Maybe<Scalars['String']>;
  AssetValue?: Maybe<Asset>;
  SystemObject?: Maybe<SystemObject>;
  User?: Maybe<User>;
  VMetadataSource?: Maybe<Vocabulary>;
};

export type CreateUnitInput = {
  Name: Scalars['String'];
  Abbreviation: Scalars['String'];
  ARKPrefix: Scalars['String'];
};

export type CreateUnitResult = {
  __typename?: 'CreateUnitResult';
  Unit?: Maybe<Unit>;
};

export type CreateProjectInput = {
  Name: Scalars['String'];
  Description: Scalars['String'];
};

export type CreateProjectResult = {
  __typename?: 'CreateProjectResult';
  Project?: Maybe<Project>;
};

export type CreateSubjectInput = {
  idUnit: Scalars['Int'];
  Name: Scalars['String'];
  idAssetThumbnail?: Maybe<Scalars['Int']>;
  idGeoLocation?: Maybe<Scalars['Int']>;
  idIdentifierPreferred?: Maybe<Scalars['Int']>;
};

export type CreateSubjectResult = {
  __typename?: 'CreateSubjectResult';
  Subject?: Maybe<Subject>;
};

export type CreateItemInput = {
  Name: Scalars['String'];
  EntireSubject: Scalars['Boolean'];
  idAssetThumbnail?: Maybe<Scalars['Int']>;
  idGeoLocation?: Maybe<Scalars['Int']>;
};

export type CreateItemResult = {
  __typename?: 'CreateItemResult';
  Item?: Maybe<Item>;
};

export type GetSubjectsForUnitInput = {
  idUnit: Scalars['Int'];
  pagination?: Maybe<PaginationInput>;
};

export type GetSubjectsForUnitResult = {
  __typename?: 'GetSubjectsForUnitResult';
  Subject: Array<Subject>;
};

export type GetItemsForSubjectInput = {
  idSubject: Scalars['Int'];
  pagination?: Maybe<PaginationInput>;
};

export type GetItemsForSubjectResult = {
  __typename?: 'GetItemsForSubjectResult';
  Item: Array<Item>;
};

export type SubjectUnitIdentifier = {
  __typename?: 'SubjectUnitIdentifier';
  idSubject: Scalars['Int'];
  SubjectName: Scalars['String'];
  UnitAbbreviation: Scalars['String'];
  IdentifierPublic?: Maybe<Scalars['String']>;
  IdentifierCollection?: Maybe<Scalars['String']>;
};

export type GetObjectsForItemInput = {
  idItem: Scalars['Int'];
};

export type GetObjectsForItemResult = {
  __typename?: 'GetObjectsForItemResult';
  CaptureData: Array<CaptureData>;
  Model: Array<Model>;
  Scene: Array<Scene>;
  IntermediaryFile: Array<IntermediaryFile>;
  ProjectDocumentation: Array<ProjectDocumentation>;
};

export type SearchIngestionSubjectsInput = {
  query: Scalars['String'];
};

export type SearchIngestionSubjectsResult = {
  __typename?: 'SearchIngestionSubjectsResult';
  SubjectUnitIdentifier: Array<SubjectUnitIdentifier>;
};

export type GetIngestionItemsForSubjectsInput = {
  idSubjects: Array<Scalars['Int']>;
};

export type GetIngestionItemsForSubjectsResult = {
  __typename?: 'GetIngestionItemsForSubjectsResult';
  Item: Array<Item>;
};

export type GetIngestionProjectsForSubjectsInput = {
  idSubjects: Array<Scalars['Int']>;
};

export type GetIngestionProjectsForSubjectsResult = {
  __typename?: 'GetIngestionProjectsForSubjectsResult';
  Project: Array<Project>;
};

export type GetUnitInput = {
  idUnit: Scalars['Int'];
};

export type GetUnitResult = {
  __typename?: 'GetUnitResult';
  Unit?: Maybe<Unit>;
};

export type GetProjectInput = {
  idProject: Scalars['Int'];
};

export type GetProjectResult = {
  __typename?: 'GetProjectResult';
  Project?: Maybe<Project>;
};

export type GetProjectDocumentationInput = {
  idProjectDocumentation: Scalars['Int'];
};

export type GetProjectDocumentationResult = {
  __typename?: 'GetProjectDocumentationResult';
  ProjectDocumentation?: Maybe<ProjectDocumentation>;
};

export type GetSubjectInput = {
  idSubject: Scalars['Int'];
};

export type GetSubjectResult = {
  __typename?: 'GetSubjectResult';
  Subject?: Maybe<Subject>;
};

export type GetItemInput = {
  idItem: Scalars['Int'];
};

export type GetItemResult = {
  __typename?: 'GetItemResult';
  Item?: Maybe<Item>;
};

export type GetUnitsFromNameSearchResult = {
  __typename?: 'GetUnitsFromNameSearchResult';
  Units: Array<Unit>;
};

export type GetUnitsFromNameSearchInput = {
  search: Scalars['String'];
};

export type Unit = {
  __typename?: 'Unit';
  idUnit: Scalars['Int'];
  Abbreviation?: Maybe<Scalars['String']>;
  ARKPrefix?: Maybe<Scalars['String']>;
  Name: Scalars['String'];
  Actor?: Maybe<Array<Maybe<Actor>>>;
  Subject?: Maybe<Array<Maybe<Subject>>>;
  SystemObject?: Maybe<SystemObject>;
};

export type Project = {
  __typename?: 'Project';
  idProject: Scalars['Int'];
  Name: Scalars['String'];
  Description?: Maybe<Scalars['String']>;
  ProjectDocumentation?: Maybe<Array<Maybe<ProjectDocumentation>>>;
  SystemObject?: Maybe<SystemObject>;
  Workflow?: Maybe<Array<Maybe<Workflow>>>;
};

export type ProjectDocumentation = {
  __typename?: 'ProjectDocumentation';
  idProjectDocumentation: Scalars['Int'];
  Description: Scalars['String'];
  idProject: Scalars['Int'];
  Name: Scalars['String'];
  Project?: Maybe<Project>;
  SystemObject?: Maybe<SystemObject>;
};

export type Stakeholder = {
  __typename?: 'Stakeholder';
  idStakeholder: Scalars['Int'];
  IndividualName: Scalars['String'];
  OrganizationName: Scalars['String'];
  MailingAddress?: Maybe<Scalars['String']>;
  EmailAddress?: Maybe<Scalars['String']>;
  PhoneNumberMobile?: Maybe<Scalars['String']>;
  PhoneNumberOffice?: Maybe<Scalars['String']>;
  SystemObject?: Maybe<SystemObject>;
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  idGeoLocation: Scalars['Int'];
  Altitude?: Maybe<Scalars['Float']>;
  Latitude?: Maybe<Scalars['Float']>;
  Longitude?: Maybe<Scalars['Float']>;
  R0?: Maybe<Scalars['Float']>;
  R1?: Maybe<Scalars['Float']>;
  R2?: Maybe<Scalars['Float']>;
  R3?: Maybe<Scalars['Float']>;
  TS0?: Maybe<Scalars['Float']>;
  TS1?: Maybe<Scalars['Float']>;
  TS2?: Maybe<Scalars['Float']>;
};

export type Subject = {
  __typename?: 'Subject';
  idSubject: Scalars['Int'];
  idUnit: Scalars['Int'];
  Name: Scalars['String'];
  AssetThumbnail?: Maybe<Asset>;
  idAssetThumbnail?: Maybe<Scalars['Int']>;
  idGeoLocation?: Maybe<Scalars['Int']>;
  idIdentifierPreferred?: Maybe<Scalars['Int']>;
  GeoLocation?: Maybe<GeoLocation>;
  Unit?: Maybe<Unit>;
  IdentifierPreferred?: Maybe<Identifier>;
  Item?: Maybe<Array<Maybe<Item>>>;
  SystemObject?: Maybe<SystemObject>;
};

export type Item = {
  __typename?: 'Item';
  idItem: Scalars['Int'];
  EntireSubject: Scalars['Boolean'];
  Name: Scalars['String'];
  idAssetThumbnail?: Maybe<Scalars['Int']>;
  idGeoLocation?: Maybe<Scalars['Int']>;
  AssetThumbnail?: Maybe<Asset>;
  GeoLocation?: Maybe<GeoLocation>;
  Subject?: Maybe<Subject>;
  SystemObject?: Maybe<SystemObject>;
};

export type CreateUserInput = {
  Name: Scalars['String'];
  EmailAddress: Scalars['String'];
  SecurityID?: Maybe<Scalars['String']>;
  WorkflowNotificationTime?: Maybe<Scalars['DateTime']>;
  EmailSettings?: Maybe<Scalars['Int']>;
};

export type CreateUserResult = {
  __typename?: 'CreateUserResult';
  User?: Maybe<User>;
};

export type UpdateUserInput = {
  idUser: Scalars['Int'];
  Name: Scalars['String'];
  EmailAddress: Scalars['String'];
  Active: Scalars['Boolean'];
  EmailSettings: Scalars['Int'];
  WorkflowNotificationTime: Scalars['DateTime'];
};

export type GetCurrentUserResult = {
  __typename?: 'GetCurrentUserResult';
  User?: Maybe<User>;
};

export type GetUserInput = {
  idUser: Scalars['Int'];
};

export type GetUserResult = {
  __typename?: 'GetUserResult';
  User?: Maybe<User>;
};

export enum User_Status {
  EAll = 'eAll',
  EActive = 'eActive',
  EInactive = 'eInactive'
}

export type GetAllUsersInput = {
  search: Scalars['String'];
  active: User_Status;
};

export type GetAllUsersResult = {
  __typename?: 'GetAllUsersResult';
  User: Array<User>;
};

export type User = {
  __typename?: 'User';
  idUser: Scalars['Int'];
  Active: Scalars['Boolean'];
  DateActivated: Scalars['DateTime'];
  EmailAddress: Scalars['String'];
  Name: Scalars['String'];
  SecurityID: Scalars['String'];
  DateDisabled?: Maybe<Scalars['DateTime']>;
  EmailSettings?: Maybe<Scalars['Int']>;
  WorkflowNotificationTime?: Maybe<Scalars['DateTime']>;
  AccessPolicy?: Maybe<Array<Maybe<AccessPolicy>>>;
  AssetVersion?: Maybe<Array<Maybe<AssetVersion>>>;
  LicenseAssignment?: Maybe<Array<Maybe<LicenseAssignment>>>;
  Metadata?: Maybe<Array<Maybe<Metadata>>>;
  UserPersonalizationSystemObject?: Maybe<Array<Maybe<UserPersonalizationSystemObject>>>;
  UserPersonalizationUrl?: Maybe<Array<Maybe<UserPersonalizationUrl>>>;
  Workflow?: Maybe<Array<Maybe<Workflow>>>;
  WorkflowStep?: Maybe<Array<Maybe<WorkflowStep>>>;
};

export type UserPersonalizationSystemObject = {
  __typename?: 'UserPersonalizationSystemObject';
  idUserPersonalizationSystemObject: Scalars['Int'];
  idSystemObject: Scalars['Int'];
  idUser: Scalars['Int'];
  Personalization?: Maybe<Scalars['String']>;
  SystemObject?: Maybe<SystemObject>;
  User?: Maybe<User>;
};

export type UserPersonalizationUrl = {
  __typename?: 'UserPersonalizationUrl';
  idUserPersonalizationUrl: Scalars['Int'];
  idUser: Scalars['Int'];
  Personalization: Scalars['String'];
  URL: Scalars['String'];
  User?: Maybe<User>;
};

export type CreateVocabularyInput = {
  idVocabularySet: Scalars['Int'];
  SortOrder: Scalars['Int'];
  Term: Scalars['String'];
};

export type CreateVocabularyResult = {
  __typename?: 'CreateVocabularyResult';
  Vocabulary?: Maybe<Vocabulary>;
};

export type CreateVocabularySetInput = {
  Name: Scalars['String'];
  SystemMaintained: Scalars['Boolean'];
};

export type CreateVocabularySetResult = {
  __typename?: 'CreateVocabularySetResult';
  VocabularySet?: Maybe<VocabularySet>;
};

export type GetVocabularyInput = {
  idVocabulary: Scalars['Int'];
};

export type GetVocabularyResult = {
  __typename?: 'GetVocabularyResult';
  Vocabulary?: Maybe<Vocabulary>;
};

export type GetVocabularyEntriesInput = {
  eVocabSetIDs: Array<Scalars['Int']>;
};

export type VocabularyEntry = {
  __typename?: 'VocabularyEntry';
  eVocabSetID: Scalars['Int'];
  Vocabulary: Array<Vocabulary>;
};

export type GetVocabularyEntriesResult = {
  __typename?: 'GetVocabularyEntriesResult';
  VocabularyEntries: Array<VocabularyEntry>;
};

export type Vocabulary = {
  __typename?: 'Vocabulary';
  idVocabulary: Scalars['Int'];
  idVocabularySet: Scalars['Int'];
  SortOrder: Scalars['Int'];
  Term: Scalars['String'];
  eVocabID?: Maybe<Scalars['Int']>;
  VocabularySet?: Maybe<VocabularySet>;
};

export type VocabularySet = {
  __typename?: 'VocabularySet';
  idVocabularySet: Scalars['Int'];
  Name: Scalars['String'];
  SystemMaintained: Scalars['Boolean'];
  Vocabulary?: Maybe<Array<Maybe<Vocabulary>>>;
};

export type GetWorkflowInput = {
  idWorkflow: Scalars['Int'];
};

export type GetWorkflowResult = {
  __typename?: 'GetWorkflowResult';
  Workflow?: Maybe<Workflow>;
};

export type Job = {
  __typename?: 'Job';
  idJob: Scalars['Int'];
  idVJobType: Scalars['Int'];
  Name: Scalars['String'];
  Status?: Maybe<Scalars['Int']>;
  Frequency?: Maybe<Scalars['String']>;
  VJobType?: Maybe<Vocabulary>;
};

export type JobRun = {
  __typename?: 'JobRun';
  idJobRun: Scalars['Int'];
  idJob: Scalars['Int'];
  Status: Scalars['Int'];
  Result?: Maybe<Scalars['Boolean']>;
  DateStart?: Maybe<Scalars['DateTime']>;
  DateEnd?: Maybe<Scalars['DateTime']>;
  Configuration?: Maybe<Scalars['String']>;
  Parameters?: Maybe<Scalars['String']>;
  Output?: Maybe<Scalars['String']>;
  Error?: Maybe<Scalars['String']>;
  Job?: Maybe<Job>;
};

export type Workflow = {
  __typename?: 'Workflow';
  idWorkflow: Scalars['Int'];
  idVWorkflowType: Scalars['Int'];
  idProject?: Maybe<Scalars['Int']>;
  idUserInitiator?: Maybe<Scalars['Int']>;
  DateInitiated: Scalars['DateTime'];
  DateUpdated: Scalars['DateTime'];
  Parameters?: Maybe<Scalars['String']>;
  VWorkflowType?: Maybe<Vocabulary>;
  Project?: Maybe<Project>;
  UserInitiator?: Maybe<User>;
  WorkflowStep?: Maybe<Array<Maybe<WorkflowStep>>>;
};

export type WorkflowStep = {
  __typename?: 'WorkflowStep';
  idWorkflowStep: Scalars['Int'];
  JobRun?: Maybe<JobRun>;
  DateCreated: Scalars['DateTime'];
  idUserOwner: Scalars['Int'];
  idVWorkflowStepType: Scalars['Int'];
  idWorkflow: Scalars['Int'];
  State: Scalars['Int'];
  DateCompleted?: Maybe<Scalars['DateTime']>;
  User?: Maybe<User>;
  VWorkflowStepType?: Maybe<Vocabulary>;
  Workflow?: Maybe<Workflow>;
  WorkflowStepSystemObjectXref?: Maybe<Array<Maybe<WorkflowStepSystemObjectXref>>>;
};

export type WorkflowStepSystemObjectXref = {
  __typename?: 'WorkflowStepSystemObjectXref';
  idWorkflowStepSystemObjectXref: Scalars['Int'];
  idSystemObject: Scalars['Int'];
  idWorkflowStep: Scalars['Int'];
  Input: Scalars['Boolean'];
  SystemObject?: Maybe<SystemObject>;
  WorkflowStep?: Maybe<WorkflowStep>;
};

export type DiscardUploadedAssetVersionsMutationVariables = Exact<{
  input: DiscardUploadedAssetVersionsInput;
}>;


export type DiscardUploadedAssetVersionsMutation = (
  { __typename?: 'Mutation' }
  & { discardUploadedAssetVersions: (
    { __typename?: 'DiscardUploadedAssetVersionsResult' }
    & Pick<DiscardUploadedAssetVersionsResult, 'success'>
  ) }
);

export type UploadAssetMutationVariables = Exact<{
  file: Scalars['Upload'];
  type: Scalars['Int'];
}>;


export type UploadAssetMutation = (
  { __typename?: 'Mutation' }
  & { uploadAsset: (
    { __typename?: 'UploadAssetResult' }
    & Pick<UploadAssetResult, 'status' | 'idAssetVersions' | 'error'>
  ) }
);

export type CreateCaptureDataMutationVariables = Exact<{
  input: CreateCaptureDataInput;
}>;


export type CreateCaptureDataMutation = (
  { __typename?: 'Mutation' }
  & { createCaptureData: (
    { __typename?: 'CreateCaptureDataResult' }
    & { CaptureData?: Maybe<(
      { __typename?: 'CaptureData' }
      & Pick<CaptureData, 'idCaptureData'>
    )> }
  ) }
);

export type CreateCaptureDataPhotoMutationVariables = Exact<{
  input: CreateCaptureDataPhotoInput;
}>;


export type CreateCaptureDataPhotoMutation = (
  { __typename?: 'Mutation' }
  & { createCaptureDataPhoto: (
    { __typename?: 'CreateCaptureDataPhotoResult' }
    & { CaptureDataPhoto?: Maybe<(
      { __typename?: 'CaptureDataPhoto' }
      & Pick<CaptureDataPhoto, 'idCaptureDataPhoto'>
    )> }
  ) }
);

export type IngestDataMutationVariables = Exact<{
  input: IngestDataInput;
}>;


export type IngestDataMutation = (
  { __typename?: 'Mutation' }
  & { ingestData: (
    { __typename?: 'IngestDataResult' }
    & Pick<IngestDataResult, 'success'>
  ) }
);

export type CreateSceneMutationVariables = Exact<{
  input: CreateSceneInput;
}>;


export type CreateSceneMutation = (
  { __typename?: 'Mutation' }
  & { createScene: (
    { __typename?: 'CreateSceneResult' }
    & { Scene?: Maybe<(
      { __typename?: 'Scene' }
      & Pick<Scene, 'idScene'>
    )> }
  ) }
);

export type UpdateObjectDetailsMutationVariables = Exact<{
  input: UpdateObjectDetailsInput;
}>;


export type UpdateObjectDetailsMutation = (
  { __typename?: 'Mutation' }
  & { updateObjectDetails: (
    { __typename?: 'UpdateObjectDetailsResult' }
    & Pick<UpdateObjectDetailsResult, 'success'>
  ) }
);

export type CreateItemMutationVariables = Exact<{
  input: CreateItemInput;
}>;


export type CreateItemMutation = (
  { __typename?: 'Mutation' }
  & { createItem: (
    { __typename?: 'CreateItemResult' }
    & { Item?: Maybe<(
      { __typename?: 'Item' }
      & Pick<Item, 'idItem'>
    )> }
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'CreateProjectResult' }
    & { Project?: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'idProject'>
      & { SystemObject?: Maybe<(
        { __typename?: 'SystemObject' }
        & Pick<SystemObject, 'idSystemObject'>
      )> }
    )> }
  ) }
);

export type CreateSubjectMutationVariables = Exact<{
  input: CreateSubjectInput;
}>;


export type CreateSubjectMutation = (
  { __typename?: 'Mutation' }
  & { createSubject: (
    { __typename?: 'CreateSubjectResult' }
    & { Subject?: Maybe<(
      { __typename?: 'Subject' }
      & Pick<Subject, 'idSubject'>
    )> }
  ) }
);

export type CreateUnitMutationVariables = Exact<{
  input: CreateUnitInput;
}>;


export type CreateUnitMutation = (
  { __typename?: 'Mutation' }
  & { createUnit: (
    { __typename?: 'CreateUnitResult' }
    & { Unit?: Maybe<(
      { __typename?: 'Unit' }
      & Pick<Unit, 'idUnit'>
      & { SystemObject?: Maybe<(
        { __typename?: 'SystemObject' }
        & Pick<SystemObject, 'idSystemObject'>
      )> }
    )> }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'CreateUserResult' }
    & { User?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'idUser' | 'Name' | 'Active' | 'DateActivated' | 'WorkflowNotificationTime' | 'EmailSettings'>
    )> }
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'CreateUserResult' }
    & { User?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'idUser' | 'EmailAddress' | 'Name' | 'Active' | 'DateActivated' | 'DateDisabled' | 'EmailSettings' | 'WorkflowNotificationTime'>
    )> }
  ) }
);

export type CreateVocabularyMutationVariables = Exact<{
  input: CreateVocabularyInput;
}>;


export type CreateVocabularyMutation = (
  { __typename?: 'Mutation' }
  & { createVocabulary: (
    { __typename?: 'CreateVocabularyResult' }
    & { Vocabulary?: Maybe<(
      { __typename?: 'Vocabulary' }
      & Pick<Vocabulary, 'idVocabulary'>
    )> }
  ) }
);

export type CreateVocabularySetMutationVariables = Exact<{
  input: CreateVocabularySetInput;
}>;


export type CreateVocabularySetMutation = (
  { __typename?: 'Mutation' }
  & { createVocabularySet: (
    { __typename?: 'CreateVocabularySetResult' }
    & { VocabularySet?: Maybe<(
      { __typename?: 'VocabularySet' }
      & Pick<VocabularySet, 'idVocabularySet'>
    )> }
  ) }
);

export type GetAccessPolicyQueryVariables = Exact<{
  input: GetAccessPolicyInput;
}>;


export type GetAccessPolicyQuery = (
  { __typename?: 'Query' }
  & { getAccessPolicy: (
    { __typename?: 'GetAccessPolicyResult' }
    & { AccessPolicy?: Maybe<(
      { __typename?: 'AccessPolicy' }
      & Pick<AccessPolicy, 'idAccessPolicy'>
    )> }
  ) }
);

export type GetAssetQueryVariables = Exact<{
  input: GetAssetInput;
}>;


export type GetAssetQuery = (
  { __typename?: 'Query' }
  & { getAsset: (
    { __typename?: 'GetAssetResult' }
    & { Asset?: Maybe<(
      { __typename?: 'Asset' }
      & Pick<Asset, 'idAsset'>
    )> }
  ) }
);

export type GetAssetVersionsDetailsQueryVariables = Exact<{
  input: GetAssetVersionsDetailsInput;
}>;


export type GetAssetVersionsDetailsQuery = (
  { __typename?: 'Query' }
  & { getAssetVersionsDetails: (
    { __typename?: 'GetAssetVersionsDetailsResult' }
    & Pick<GetAssetVersionsDetailsResult, 'valid'>
    & { Details: Array<(
      { __typename?: 'GetAssetVersionDetailResult' }
      & Pick<GetAssetVersionDetailResult, 'idAssetVersion'>
      & { SubjectUnitIdentifier?: Maybe<(
        { __typename?: 'SubjectUnitIdentifier' }
        & Pick<SubjectUnitIdentifier, 'idSubject' | 'SubjectName' | 'UnitAbbreviation' | 'IdentifierPublic' | 'IdentifierCollection'>
      )>, Project?: Maybe<Array<(
        { __typename?: 'Project' }
        & Pick<Project, 'idProject' | 'Name'>
      )>>, Item?: Maybe<(
        { __typename?: 'Item' }
        & Pick<Item, 'idItem' | 'Name' | 'EntireSubject'>
      )>, CaptureDataPhoto?: Maybe<(
        { __typename?: 'IngestPhotogrammetry' }
        & Pick<IngestPhotogrammetry, 'idAssetVersion' | 'dateCaptured' | 'datasetType' | 'systemCreated' | 'description' | 'cameraSettingUniform' | 'datasetFieldId' | 'itemPositionType' | 'itemPositionFieldId' | 'itemArrangementFieldId' | 'focusType' | 'lightsourceType' | 'backgroundRemovalMethod' | 'clusterType' | 'clusterGeometryFieldId' | 'directory'>
        & { folders: Array<(
          { __typename?: 'IngestFolder' }
          & Pick<IngestFolder, 'name' | 'variantType'>
        )>, identifiers: Array<(
          { __typename?: 'IngestIdentifier' }
          & Pick<IngestIdentifier, 'identifier' | 'identifierType'>
        )> }
      )>, Model?: Maybe<(
        { __typename?: 'IngestModel' }
        & Pick<IngestModel, 'idAssetVersion' | 'systemCreated' | 'name' | 'master' | 'authoritative' | 'creationMethod' | 'modality' | 'purpose' | 'units' | 'dateCaptured' | 'modelFileType' | 'directory'>
        & { identifiers: Array<(
          { __typename?: 'IngestIdentifier' }
          & Pick<IngestIdentifier, 'identifier' | 'identifierType'>
        )> }
      )>, Scene?: Maybe<(
        { __typename?: 'IngestScene' }
        & Pick<IngestScene, 'idAssetVersion'>
        & { identifiers: Array<(
          { __typename?: 'IngestIdentifier' }
          & Pick<IngestIdentifier, 'identifier' | 'identifierType'>
        )> }
      )> }
    )> }
  ) }
);

export type GetContentsForAssetVersionsQueryVariables = Exact<{
  input: GetContentsForAssetVersionsInput;
}>;


export type GetContentsForAssetVersionsQuery = (
  { __typename?: 'Query' }
  & { getContentsForAssetVersions: (
    { __typename?: 'GetContentsForAssetVersionsResult' }
    & { AssetVersionContent: Array<(
      { __typename?: 'AssetVersionContent' }
      & Pick<AssetVersionContent, 'idAssetVersion' | 'folders' | 'all'>
    )> }
  ) }
);

export type GetModelConstellationForAssetVersionQueryVariables = Exact<{
  input: GetModelConstellationForAssetVersionInput;
}>;


export type GetModelConstellationForAssetVersionQuery = (
  { __typename?: 'Query' }
  & { getModelConstellationForAssetVersion: (
    { __typename?: 'GetModelConstellationForAssetVersionResult' }
    & Pick<GetModelConstellationForAssetVersionResult, 'idAssetVersion'>
    & { ModelConstellation?: Maybe<(
      { __typename?: 'ModelConstellation' }
      & { Model: (
        { __typename?: 'Model' }
        & Pick<Model, 'idModel' | 'CountVertices' | 'CountFaces' | 'CountAnimations' | 'CountCameras' | 'CountLights' | 'CountMaterials' | 'CountMeshes' | 'CountEmbeddedTextures' | 'CountLinkedTextures' | 'FileEncoding' | 'Name' | 'idVFileType'>
      ), ModelObjects?: Maybe<Array<(
        { __typename?: 'ModelObject' }
        & Pick<ModelObject, 'idModelObject' | 'BoundingBoxP1X' | 'BoundingBoxP1Y' | 'BoundingBoxP1Z' | 'BoundingBoxP2X' | 'BoundingBoxP2Y' | 'BoundingBoxP2Z' | 'CountVertices' | 'CountFaces' | 'CountColorChannels' | 'CountTextureCoordinateChannels' | 'HasBones' | 'HasFaceNormals' | 'HasTangents' | 'HasTextureCoordinates' | 'HasVertexNormals' | 'HasVertexColor' | 'IsTwoManifoldUnbounded' | 'IsTwoManifoldBounded' | 'IsWatertight' | 'SelfIntersecting'>
      )>>, ModelMaterials?: Maybe<Array<(
        { __typename?: 'ModelMaterial' }
        & Pick<ModelMaterial, 'idModelMaterial' | 'Name'>
      )>>, ModelMaterialChannels?: Maybe<Array<(
        { __typename?: 'ModelMaterialChannel' }
        & Pick<ModelMaterialChannel, 'Type' | 'Source' | 'Value' | 'AdditionalAttributes' | 'idModelMaterial' | 'idModelMaterialChannel'>
      )>>, ModelObjectModelMaterialXref?: Maybe<Array<(
        { __typename?: 'ModelObjectModelMaterialXref' }
        & Pick<ModelObjectModelMaterialXref, 'idModelObjectModelMaterialXref' | 'idModelObject' | 'idModelMaterial'>
      )>>, ModelAssets?: Maybe<Array<(
        { __typename?: 'ModelAsset' }
        & Pick<ModelAsset, 'AssetName' | 'AssetType'>
      )>> }
    )> }
  ) }
);

export type GetUploadedAssetVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUploadedAssetVersionQuery = (
  { __typename?: 'Query' }
  & { getUploadedAssetVersion: (
    { __typename?: 'GetUploadedAssetVersionResult' }
    & { AssetVersion: Array<(
      { __typename?: 'AssetVersion' }
      & Pick<AssetVersion, 'idAssetVersion' | 'StorageSize' | 'FileName' | 'DateCreated'>
      & { Asset?: Maybe<(
        { __typename?: 'Asset' }
        & Pick<Asset, 'idAsset'>
        & { VAssetType?: Maybe<(
          { __typename?: 'Vocabulary' }
          & Pick<Vocabulary, 'idVocabulary' | 'Term'>
        )> }
      )> }
    )> }
  ) }
);

export type GetCaptureDataQueryVariables = Exact<{
  input: GetCaptureDataInput;
}>;


export type GetCaptureDataQuery = (
  { __typename?: 'Query' }
  & { getCaptureData: (
    { __typename?: 'GetCaptureDataResult' }
    & { CaptureData?: Maybe<(
      { __typename?: 'CaptureData' }
      & Pick<CaptureData, 'idCaptureData'>
    )> }
  ) }
);

export type GetCaptureDataPhotoQueryVariables = Exact<{
  input: GetCaptureDataPhotoInput;
}>;


export type GetCaptureDataPhotoQuery = (
  { __typename?: 'Query' }
  & { getCaptureDataPhoto: (
    { __typename?: 'GetCaptureDataPhotoResult' }
    & { CaptureDataPhoto?: Maybe<(
      { __typename?: 'CaptureDataPhoto' }
      & Pick<CaptureDataPhoto, 'idCaptureDataPhoto'>
    )> }
  ) }
);

export type AreCameraSettingsUniformQueryVariables = Exact<{
  input: AreCameraSettingsUniformInput;
}>;


export type AreCameraSettingsUniformQuery = (
  { __typename?: 'Query' }
  & { areCameraSettingsUniform: (
    { __typename?: 'AreCameraSettingsUniformResult' }
    & Pick<AreCameraSettingsUniformResult, 'isUniform'>
  ) }
);

export type GetLicenseQueryVariables = Exact<{
  input: GetLicenseInput;
}>;


export type GetLicenseQuery = (
  { __typename?: 'Query' }
  & { getLicense: (
    { __typename?: 'GetLicenseResult' }
    & { License?: Maybe<(
      { __typename?: 'License' }
      & Pick<License, 'idLicense'>
    )> }
  ) }
);

export type GetModelQueryVariables = Exact<{
  input: GetModelInput;
}>;


export type GetModelQuery = (
  { __typename?: 'Query' }
  & { getModel: (
    { __typename?: 'GetModelResult' }
    & { Model?: Maybe<(
      { __typename?: 'Model' }
      & Pick<Model, 'idModel'>
    )> }
  ) }
);

export type GetModelConstellationQueryVariables = Exact<{
  input: GetModelConstellationInput;
}>;


export type GetModelConstellationQuery = (
  { __typename?: 'Query' }
  & { getModelConstellation: (
    { __typename?: 'GetModelConstellationResult' }
    & { ModelConstellation?: Maybe<(
      { __typename?: 'ModelConstellation' }
      & { Model: (
        { __typename?: 'Model' }
        & Pick<Model, 'idModel' | 'Name' | 'DateCreated' | 'Master' | 'Authoritative' | 'idAssetThumbnail' | 'CountAnimations' | 'CountCameras' | 'CountFaces' | 'CountLights' | 'CountMaterials' | 'CountMeshes' | 'CountVertices' | 'CountEmbeddedTextures' | 'CountLinkedTextures' | 'FileEncoding'>
        & { VCreationMethod?: Maybe<(
          { __typename?: 'Vocabulary' }
          & Pick<Vocabulary, 'Term'>
        )>, VModality?: Maybe<(
          { __typename?: 'Vocabulary' }
          & Pick<Vocabulary, 'Term'>
        )>, VPurpose?: Maybe<(
          { __typename?: 'Vocabulary' }
          & Pick<Vocabulary, 'Term'>
        )>, VUnits?: Maybe<(
          { __typename?: 'Vocabulary' }
          & Pick<Vocabulary, 'Term'>
        )>, VFileType?: Maybe<(
          { __typename?: 'Vocabulary' }
          & Pick<Vocabulary, 'Term'>
        )> }
      ), ModelObjects?: Maybe<Array<(
        { __typename?: 'ModelObject' }
        & Pick<ModelObject, 'idModelObject' | 'idModel' | 'BoundingBoxP1X' | 'BoundingBoxP1Y' | 'BoundingBoxP1Z' | 'BoundingBoxP2X' | 'BoundingBoxP2Y' | 'BoundingBoxP2Z' | 'CountVertices' | 'CountFaces' | 'CountColorChannels' | 'CountTextureCoordinateChannels' | 'HasBones' | 'HasFaceNormals' | 'HasTangents' | 'HasTextureCoordinates' | 'HasVertexNormals' | 'HasVertexColor' | 'IsTwoManifoldUnbounded' | 'IsTwoManifoldBounded' | 'IsWatertight' | 'SelfIntersecting'>
      )>>, ModelMaterials?: Maybe<Array<(
        { __typename?: 'ModelMaterial' }
        & Pick<ModelMaterial, 'idModelMaterial' | 'Name'>
      )>>, ModelMaterialChannels?: Maybe<Array<(
        { __typename?: 'ModelMaterialChannel' }
        & Pick<ModelMaterialChannel, 'idModelMaterialChannel' | 'idModelMaterial' | 'Type' | 'Source' | 'Value' | 'MaterialTypeOther' | 'idModelMaterialUVMap' | 'UVMapEmbedded' | 'ChannelPosition' | 'ChannelWidth' | 'Scalar1' | 'Scalar2' | 'Scalar3' | 'Scalar4' | 'AdditionalAttributes'>
        & { VMaterialType?: Maybe<(
          { __typename?: 'Vocabulary' }
          & Pick<Vocabulary, 'Term'>
        )> }
      )>>, ModelMaterialUVMaps?: Maybe<Array<(
        { __typename?: 'ModelMaterialUVMap' }
        & Pick<ModelMaterialUvMap, 'idModelMaterialUVMap' | 'idModel' | 'idAsset' | 'UVMapEdgeLength'>
      )>>, ModelObjectModelMaterialXref?: Maybe<Array<(
        { __typename?: 'ModelObjectModelMaterialXref' }
        & Pick<ModelObjectModelMaterialXref, 'idModelObject' | 'idModelMaterial'>
      )>>, ModelAssets?: Maybe<Array<(
        { __typename?: 'ModelAsset' }
        & Pick<ModelAsset, 'AssetName' | 'AssetType'>
        & { AssetVersion: (
          { __typename?: 'AssetVersion' }
          & Pick<AssetVersion, 'idAsset' | 'idAssetVersion' | 'FileName'>
        ) }
      )>> }
    )> }
  ) }
);

export type GetFilterViewDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilterViewDataQuery = (
  { __typename?: 'Query' }
  & { getFilterViewData: (
    { __typename?: 'GetFilterViewDataResult' }
    & { units: Array<(
      { __typename?: 'Unit' }
      & Pick<Unit, 'idUnit' | 'Name'>
      & { SystemObject?: Maybe<(
        { __typename?: 'SystemObject' }
        & Pick<SystemObject, 'idSystemObject'>
      )> }
    )>, projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'idProject' | 'Name'>
      & { SystemObject?: Maybe<(
        { __typename?: 'SystemObject' }
        & Pick<SystemObject, 'idSystemObject'>
      )> }
    )> }
  ) }
);

export type GetObjectChildrenQueryVariables = Exact<{
  input: GetObjectChildrenInput;
}>;


export type GetObjectChildrenQuery = (
  { __typename?: 'Query' }
  & { getObjectChildren: (
    { __typename?: 'GetObjectChildrenResult' }
    & Pick<GetObjectChildrenResult, 'success' | 'error' | 'metadataColumns'>
    & { entries: Array<(
      { __typename?: 'NavigationResultEntry' }
      & Pick<NavigationResultEntry, 'idSystemObject' | 'name' | 'objectType' | 'idObject' | 'metadata'>
    )> }
  ) }
);

export type GetIntermediaryFileQueryVariables = Exact<{
  input: GetIntermediaryFileInput;
}>;


export type GetIntermediaryFileQuery = (
  { __typename?: 'Query' }
  & { getIntermediaryFile: (
    { __typename?: 'GetIntermediaryFileResult' }
    & { IntermediaryFile?: Maybe<(
      { __typename?: 'IntermediaryFile' }
      & Pick<IntermediaryFile, 'idIntermediaryFile'>
    )> }
  ) }
);

export type GetSceneQueryVariables = Exact<{
  input: GetSceneInput;
}>;


export type GetSceneQuery = (
  { __typename?: 'Query' }
  & { getScene: (
    { __typename?: 'GetSceneResult' }
    & { Scene?: Maybe<(
      { __typename?: 'Scene' }
      & Pick<Scene, 'idScene'>
    )> }
  ) }
);

export type GetAssetDetailsForSystemObjectQueryVariables = Exact<{
  input: GetAssetDetailsForSystemObjectInput;
}>;


export type GetAssetDetailsForSystemObjectQuery = (
  { __typename?: 'Query' }
  & { getAssetDetailsForSystemObject: (
    { __typename?: 'GetAssetDetailsForSystemObjectResult' }
    & { assetDetails: Array<(
      { __typename?: 'AssetDetail' }
      & Pick<AssetDetail, 'idSystemObject' | 'name' | 'path' | 'assetType' | 'version' | 'dateCreated' | 'size'>
    )> }
  ) }
);

export type GetDetailsTabDataForObjectQueryVariables = Exact<{
  input: GetDetailsTabDataForObjectInput;
}>;


export type GetDetailsTabDataForObjectQuery = (
  { __typename?: 'Query' }
  & { getDetailsTabDataForObject: (
    { __typename?: 'GetDetailsTabDataForObjectResult' }
    & { Unit?: Maybe<(
      { __typename?: 'UnitDetailFields' }
      & Pick<UnitDetailFields, 'Abbreviation' | 'ARKPrefix'>
    )>, Project?: Maybe<(
      { __typename?: 'ProjectDetailFields' }
      & Pick<ProjectDetailFields, 'Description'>
    )>, Subject?: Maybe<(
      { __typename?: 'SubjectDetailFields' }
      & Pick<SubjectDetailFields, 'Altitude' | 'Latitude' | 'Longitude' | 'R0' | 'R1' | 'R2' | 'R3' | 'TS0' | 'TS1' | 'TS2'>
    )>, Item?: Maybe<(
      { __typename?: 'ItemDetailFields' }
      & Pick<ItemDetailFields, 'EntireSubject' | 'Altitude' | 'Latitude' | 'Longitude' | 'R0' | 'R1' | 'R2' | 'R3' | 'TS0' | 'TS1' | 'TS2'>
    )>, CaptureData?: Maybe<(
      { __typename?: 'CaptureDataDetailFields' }
      & Pick<CaptureDataDetailFields, 'captureMethod' | 'dateCaptured' | 'datasetType' | 'description' | 'cameraSettingUniform' | 'datasetFieldId' | 'itemPositionType' | 'itemPositionFieldId' | 'itemArrangementFieldId' | 'focusType' | 'lightsourceType' | 'backgroundRemovalMethod' | 'clusterType' | 'clusterGeometryFieldId'>
      & { folders: Array<(
        { __typename?: 'IngestFolder' }
        & Pick<IngestFolder, 'name' | 'variantType'>
      )> }
    )>, Model?: Maybe<(
      { __typename?: 'ModelConstellation' }
      & { Model: (
        { __typename?: 'Model' }
        & Pick<Model, 'idModel' | 'CountVertices' | 'CountFaces' | 'CountAnimations' | 'CountCameras' | 'CountLights' | 'CountMaterials' | 'CountMeshes' | 'CountEmbeddedTextures' | 'CountLinkedTextures' | 'FileEncoding' | 'Name' | 'DateCreated' | 'Master' | 'Authoritative' | 'idVCreationMethod' | 'idVModality' | 'idVUnits' | 'idVPurpose' | 'idVFileType'>
      ), ModelObjects?: Maybe<Array<(
        { __typename?: 'ModelObject' }
        & Pick<ModelObject, 'idModelObject' | 'BoundingBoxP1X' | 'BoundingBoxP1Y' | 'BoundingBoxP1Z' | 'BoundingBoxP2X' | 'BoundingBoxP2Y' | 'BoundingBoxP2Z' | 'CountVertices' | 'CountFaces' | 'CountColorChannels' | 'CountTextureCoordinateChannels' | 'HasBones' | 'HasFaceNormals' | 'HasTangents' | 'HasTextureCoordinates' | 'HasVertexNormals' | 'HasVertexColor' | 'IsTwoManifoldUnbounded' | 'IsTwoManifoldBounded' | 'IsWatertight' | 'SelfIntersecting'>
      )>>, ModelMaterials?: Maybe<Array<(
        { __typename?: 'ModelMaterial' }
        & Pick<ModelMaterial, 'idModelMaterial' | 'Name'>
      )>>, ModelMaterialChannels?: Maybe<Array<(
        { __typename?: 'ModelMaterialChannel' }
        & Pick<ModelMaterialChannel, 'Type' | 'Source' | 'Value' | 'AdditionalAttributes' | 'idModelMaterial' | 'idModelMaterialChannel'>
      )>>, ModelObjectModelMaterialXref?: Maybe<Array<(
        { __typename?: 'ModelObjectModelMaterialXref' }
        & Pick<ModelObjectModelMaterialXref, 'idModelObjectModelMaterialXref' | 'idModelObject' | 'idModelMaterial'>
      )>>, ModelAssets?: Maybe<Array<(
        { __typename?: 'ModelAsset' }
        & Pick<ModelAsset, 'AssetName' | 'AssetType'>
      )>> }
    )>, Scene?: Maybe<(
      { __typename?: 'SceneDetailFields' }
      & Pick<SceneDetailFields, 'Links' | 'AssetType' | 'Tours' | 'Annotation' | 'HasBeenQCd' | 'IsOriented'>
    )>, IntermediaryFile?: Maybe<(
      { __typename?: 'IntermediaryFileDetailFields' }
      & Pick<IntermediaryFileDetailFields, 'idIntermediaryFile'>
    )>, ProjectDocumentation?: Maybe<(
      { __typename?: 'ProjectDocumentationDetailFields' }
      & Pick<ProjectDocumentationDetailFields, 'Description'>
    )>, Asset?: Maybe<(
      { __typename?: 'AssetDetailFields' }
      & Pick<AssetDetailFields, 'FilePath' | 'AssetType'>
    )>, AssetVersion?: Maybe<(
      { __typename?: 'AssetVersionDetailFields' }
      & Pick<AssetVersionDetailFields, 'Creator' | 'DateCreated' | 'StorageSize' | 'Ingested' | 'Version'>
    )>, Actor?: Maybe<(
      { __typename?: 'ActorDetailFields' }
      & Pick<ActorDetailFields, 'OrganizationName'>
    )>, Stakeholder?: Maybe<(
      { __typename?: 'StakeholderDetailFields' }
      & Pick<StakeholderDetailFields, 'OrganizationName' | 'EmailAddress' | 'PhoneNumberMobile' | 'PhoneNumberOffice' | 'MailingAddress'>
    )> }
  ) }
);

export type GetProjectListQueryVariables = Exact<{
  input: GetProjectListInput;
}>;


export type GetProjectListQuery = (
  { __typename?: 'Query' }
  & { getProjectList: (
    { __typename?: 'GetProjectListResult' }
    & { projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'idProject' | 'Name'>
      & { SystemObject?: Maybe<(
        { __typename?: 'SystemObject' }
        & Pick<SystemObject, 'idSystemObject'>
      )> }
    )> }
  ) }
);

export type GetSourceObjectIdentiferQueryVariables = Exact<{
  input: GetSourceObjectIdentiferInput;
}>;


export type GetSourceObjectIdentiferQuery = (
  { __typename?: 'Query' }
  & { getSourceObjectIdentifer: (
    { __typename?: 'GetSourceObjectIdentiferResult' }
    & { sourceObjectIdentifiers: Array<(
      { __typename?: 'SourceObjectIdentifier' }
      & Pick<SourceObjectIdentifier, 'idSystemObject' | 'identifier'>
    )> }
  ) }
);

export type GetSystemObjectDetailsQueryVariables = Exact<{
  input: GetSystemObjectDetailsInput;
}>;


export type GetSystemObjectDetailsQuery = (
  { __typename?: 'Query' }
  & { getSystemObjectDetails: (
    { __typename?: 'GetSystemObjectDetailsResult' }
    & Pick<GetSystemObjectDetailsResult, 'idObject' | 'name' | 'retired' | 'objectType' | 'allowed' | 'publishedState' | 'thumbnail'>
    & { identifiers: Array<(
      { __typename?: 'IngestIdentifier' }
      & Pick<IngestIdentifier, 'identifier' | 'identifierType'>
    )>, unit?: Maybe<(
      { __typename?: 'RepositoryPath' }
      & Pick<RepositoryPath, 'idSystemObject' | 'name' | 'objectType'>
    )>, project?: Maybe<(
      { __typename?: 'RepositoryPath' }
      & Pick<RepositoryPath, 'idSystemObject' | 'name' | 'objectType'>
    )>, subject?: Maybe<(
      { __typename?: 'RepositoryPath' }
      & Pick<RepositoryPath, 'idSystemObject' | 'name' | 'objectType'>
    )>, item?: Maybe<(
      { __typename?: 'RepositoryPath' }
      & Pick<RepositoryPath, 'idSystemObject' | 'name' | 'objectType'>
    )>, objectAncestors: Array<Array<(
      { __typename?: 'RepositoryPath' }
      & Pick<RepositoryPath, 'idSystemObject' | 'name' | 'objectType'>
    )>>, sourceObjects: Array<(
      { __typename?: 'RelatedObject' }
      & Pick<RelatedObject, 'idSystemObject' | 'name' | 'identifier' | 'objectType'>
    )>, derivedObjects: Array<(
      { __typename?: 'RelatedObject' }
      & Pick<RelatedObject, 'idSystemObject' | 'name' | 'identifier' | 'objectType'>
    )> }
  ) }
);

export type GetVersionsForSystemObjectQueryVariables = Exact<{
  input: GetVersionsForSystemObjectInput;
}>;


export type GetVersionsForSystemObjectQuery = (
  { __typename?: 'Query' }
  & { getVersionsForSystemObject: (
    { __typename?: 'GetVersionsForSystemObjectResult' }
    & { versions: Array<(
      { __typename?: 'DetailVersion' }
      & Pick<DetailVersion, 'idSystemObject' | 'version' | 'name' | 'creator' | 'dateCreated' | 'size'>
    )> }
  ) }
);

export type GetIngestionItemsForSubjectsQueryVariables = Exact<{
  input: GetIngestionItemsForSubjectsInput;
}>;


export type GetIngestionItemsForSubjectsQuery = (
  { __typename?: 'Query' }
  & { getIngestionItemsForSubjects: (
    { __typename?: 'GetIngestionItemsForSubjectsResult' }
    & { Item: Array<(
      { __typename?: 'Item' }
      & Pick<Item, 'idItem' | 'EntireSubject' | 'Name'>
    )> }
  ) }
);

export type GetIngestionProjectsForSubjectsQueryVariables = Exact<{
  input: GetIngestionProjectsForSubjectsInput;
}>;


export type GetIngestionProjectsForSubjectsQuery = (
  { __typename?: 'Query' }
  & { getIngestionProjectsForSubjects: (
    { __typename?: 'GetIngestionProjectsForSubjectsResult' }
    & { Project: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'idProject' | 'Name'>
    )> }
  ) }
);

export type GetItemQueryVariables = Exact<{
  input: GetItemInput;
}>;


export type GetItemQuery = (
  { __typename?: 'Query' }
  & { getItem: (
    { __typename?: 'GetItemResult' }
    & { Item?: Maybe<(
      { __typename?: 'Item' }
      & Pick<Item, 'idItem'>
    )> }
  ) }
);

export type GetItemsForSubjectQueryVariables = Exact<{
  input: GetItemsForSubjectInput;
}>;


export type GetItemsForSubjectQuery = (
  { __typename?: 'Query' }
  & { getItemsForSubject: (
    { __typename?: 'GetItemsForSubjectResult' }
    & { Item: Array<(
      { __typename?: 'Item' }
      & Pick<Item, 'idItem' | 'Name'>
    )> }
  ) }
);

export type GetObjectsForItemQueryVariables = Exact<{
  input: GetObjectsForItemInput;
}>;


export type GetObjectsForItemQuery = (
  { __typename?: 'Query' }
  & { getObjectsForItem: (
    { __typename?: 'GetObjectsForItemResult' }
    & { CaptureData: Array<(
      { __typename?: 'CaptureData' }
      & Pick<CaptureData, 'idCaptureData' | 'DateCaptured' | 'Description'>
    )>, Model: Array<(
      { __typename?: 'Model' }
      & Pick<Model, 'idModel' | 'Authoritative' | 'DateCreated'>
    )>, Scene: Array<(
      { __typename?: 'Scene' }
      & Pick<Scene, 'idScene' | 'HasBeenQCd' | 'IsOriented' | 'Name'>
    )>, IntermediaryFile: Array<(
      { __typename?: 'IntermediaryFile' }
      & Pick<IntermediaryFile, 'idIntermediaryFile' | 'DateCreated'>
    )>, ProjectDocumentation: Array<(
      { __typename?: 'ProjectDocumentation' }
      & Pick<ProjectDocumentation, 'idProjectDocumentation' | 'Description' | 'Name'>
    )> }
  ) }
);

export type GetProjectQueryVariables = Exact<{
  input: GetProjectInput;
}>;


export type GetProjectQuery = (
  { __typename?: 'Query' }
  & { getProject: (
    { __typename?: 'GetProjectResult' }
    & { Project?: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'idProject'>
      & { SystemObject?: Maybe<(
        { __typename?: 'SystemObject' }
        & Pick<SystemObject, 'idSystemObject'>
      )> }
    )> }
  ) }
);

export type GetProjectDocumentationQueryVariables = Exact<{
  input: GetProjectDocumentationInput;
}>;


export type GetProjectDocumentationQuery = (
  { __typename?: 'Query' }
  & { getProjectDocumentation: (
    { __typename?: 'GetProjectDocumentationResult' }
    & { ProjectDocumentation?: Maybe<(
      { __typename?: 'ProjectDocumentation' }
      & Pick<ProjectDocumentation, 'idProjectDocumentation'>
    )> }
  ) }
);

export type GetSubjectQueryVariables = Exact<{
  input: GetSubjectInput;
}>;


export type GetSubjectQuery = (
  { __typename?: 'Query' }
  & { getSubject: (
    { __typename?: 'GetSubjectResult' }
    & { Subject?: Maybe<(
      { __typename?: 'Subject' }
      & Pick<Subject, 'idSubject'>
      & { SystemObject?: Maybe<(
        { __typename?: 'SystemObject' }
        & Pick<SystemObject, 'idSystemObject'>
      )> }
    )> }
  ) }
);

export type GetSubjectsForUnitQueryVariables = Exact<{
  input: GetSubjectsForUnitInput;
}>;


export type GetSubjectsForUnitQuery = (
  { __typename?: 'Query' }
  & { getSubjectsForUnit: (
    { __typename?: 'GetSubjectsForUnitResult' }
    & { Subject: Array<(
      { __typename?: 'Subject' }
      & Pick<Subject, 'idSubject' | 'Name'>
    )> }
  ) }
);

export type GetUnitQueryVariables = Exact<{
  input: GetUnitInput;
}>;


export type GetUnitQuery = (
  { __typename?: 'Query' }
  & { getUnit: (
    { __typename?: 'GetUnitResult' }
    & { Unit?: Maybe<(
      { __typename?: 'Unit' }
      & Pick<Unit, 'idUnit'>
    )> }
  ) }
);

export type GetUnitsFromNameSearchQueryVariables = Exact<{
  input: GetUnitsFromNameSearchInput;
}>;


export type GetUnitsFromNameSearchQuery = (
  { __typename?: 'Query' }
  & { getUnitsFromNameSearch: (
    { __typename?: 'GetUnitsFromNameSearchResult' }
    & { Units: Array<(
      { __typename?: 'Unit' }
      & Pick<Unit, 'idUnit' | 'Name' | 'Abbreviation'>
      & { SystemObject?: Maybe<(
        { __typename?: 'SystemObject' }
        & Pick<SystemObject, 'idSystemObject'>
      )> }
    )> }
  ) }
);

export type SearchIngestionSubjectsQueryVariables = Exact<{
  input: SearchIngestionSubjectsInput;
}>;


export type SearchIngestionSubjectsQuery = (
  { __typename?: 'Query' }
  & { searchIngestionSubjects: (
    { __typename?: 'SearchIngestionSubjectsResult' }
    & { SubjectUnitIdentifier: Array<(
      { __typename?: 'SubjectUnitIdentifier' }
      & Pick<SubjectUnitIdentifier, 'idSubject' | 'SubjectName' | 'UnitAbbreviation' | 'IdentifierPublic' | 'IdentifierCollection'>
    )> }
  ) }
);

export type GetAllUsersQueryVariables = Exact<{
  input: GetAllUsersInput;
}>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers: (
    { __typename?: 'GetAllUsersResult' }
    & { User: Array<(
      { __typename?: 'User' }
      & Pick<User, 'idUser' | 'Active' | 'DateActivated' | 'EmailAddress' | 'Name' | 'SecurityID' | 'DateDisabled' | 'EmailSettings' | 'WorkflowNotificationTime'>
    )> }
  ) }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser: (
    { __typename?: 'GetCurrentUserResult' }
    & { User?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'idUser' | 'Name' | 'Active' | 'DateActivated' | 'DateDisabled' | 'EmailAddress' | 'EmailSettings' | 'SecurityID' | 'WorkflowNotificationTime'>
    )> }
  ) }
);

export type GetUserQueryVariables = Exact<{
  input: GetUserInput;
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'GetUserResult' }
    & { User?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'idUser' | 'Name' | 'Active' | 'DateActivated' | 'DateDisabled' | 'EmailSettings' | 'EmailAddress' | 'WorkflowNotificationTime'>
    )> }
  ) }
);

export type GetVocabularyQueryVariables = Exact<{
  input: GetVocabularyInput;
}>;


export type GetVocabularyQuery = (
  { __typename?: 'Query' }
  & { getVocabulary: (
    { __typename?: 'GetVocabularyResult' }
    & { Vocabulary?: Maybe<(
      { __typename?: 'Vocabulary' }
      & Pick<Vocabulary, 'idVocabulary'>
    )> }
  ) }
);

export type GetVocabularyEntriesQueryVariables = Exact<{
  input: GetVocabularyEntriesInput;
}>;


export type GetVocabularyEntriesQuery = (
  { __typename?: 'Query' }
  & { getVocabularyEntries: (
    { __typename?: 'GetVocabularyEntriesResult' }
    & { VocabularyEntries: Array<(
      { __typename?: 'VocabularyEntry' }
      & Pick<VocabularyEntry, 'eVocabSetID'>
      & { Vocabulary: Array<(
        { __typename?: 'Vocabulary' }
        & Pick<Vocabulary, 'idVocabulary' | 'Term' | 'eVocabID'>
      )> }
    )> }
  ) }
);

export type GetWorkflowQueryVariables = Exact<{
  input: GetWorkflowInput;
}>;


export type GetWorkflowQuery = (
  { __typename?: 'Query' }
  & { getWorkflow: (
    { __typename?: 'GetWorkflowResult' }
    & { Workflow?: Maybe<(
      { __typename?: 'Workflow' }
      & Pick<Workflow, 'idWorkflow'>
    )> }
  ) }
);


export const DiscardUploadedAssetVersionsDocument = gql`
    mutation discardUploadedAssetVersions($input: DiscardUploadedAssetVersionsInput!) {
  discardUploadedAssetVersions(input: $input) {
    success
  }
}
    `;
export type DiscardUploadedAssetVersionsMutationFn = Apollo.MutationFunction<DiscardUploadedAssetVersionsMutation, DiscardUploadedAssetVersionsMutationVariables>;

/**
 * __useDiscardUploadedAssetVersionsMutation__
 *
 * To run a mutation, you first call `useDiscardUploadedAssetVersionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDiscardUploadedAssetVersionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [discardUploadedAssetVersionsMutation, { data, loading, error }] = useDiscardUploadedAssetVersionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDiscardUploadedAssetVersionsMutation(baseOptions?: Apollo.MutationHookOptions<DiscardUploadedAssetVersionsMutation, DiscardUploadedAssetVersionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DiscardUploadedAssetVersionsMutation, DiscardUploadedAssetVersionsMutationVariables>(DiscardUploadedAssetVersionsDocument, options);
      }
export type DiscardUploadedAssetVersionsMutationHookResult = ReturnType<typeof useDiscardUploadedAssetVersionsMutation>;
export type DiscardUploadedAssetVersionsMutationResult = Apollo.MutationResult<DiscardUploadedAssetVersionsMutation>;
export type DiscardUploadedAssetVersionsMutationOptions = Apollo.BaseMutationOptions<DiscardUploadedAssetVersionsMutation, DiscardUploadedAssetVersionsMutationVariables>;
export const UploadAssetDocument = gql`
    mutation uploadAsset($file: Upload!, $type: Int!) {
  uploadAsset(file: $file, type: $type) {
    status
    idAssetVersions
    error
  }
}
    `;
export type UploadAssetMutationFn = Apollo.MutationFunction<UploadAssetMutation, UploadAssetMutationVariables>;

/**
 * __useUploadAssetMutation__
 *
 * To run a mutation, you first call `useUploadAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAssetMutation, { data, loading, error }] = useUploadAssetMutation({
 *   variables: {
 *      file: // value for 'file'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUploadAssetMutation(baseOptions?: Apollo.MutationHookOptions<UploadAssetMutation, UploadAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAssetMutation, UploadAssetMutationVariables>(UploadAssetDocument, options);
      }
export type UploadAssetMutationHookResult = ReturnType<typeof useUploadAssetMutation>;
export type UploadAssetMutationResult = Apollo.MutationResult<UploadAssetMutation>;
export type UploadAssetMutationOptions = Apollo.BaseMutationOptions<UploadAssetMutation, UploadAssetMutationVariables>;
export const CreateCaptureDataDocument = gql`
    mutation createCaptureData($input: CreateCaptureDataInput!) {
  createCaptureData(input: $input) {
    CaptureData {
      idCaptureData
    }
  }
}
    `;
export type CreateCaptureDataMutationFn = Apollo.MutationFunction<CreateCaptureDataMutation, CreateCaptureDataMutationVariables>;

/**
 * __useCreateCaptureDataMutation__
 *
 * To run a mutation, you first call `useCreateCaptureDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCaptureDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCaptureDataMutation, { data, loading, error }] = useCreateCaptureDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCaptureDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateCaptureDataMutation, CreateCaptureDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCaptureDataMutation, CreateCaptureDataMutationVariables>(CreateCaptureDataDocument, options);
      }
export type CreateCaptureDataMutationHookResult = ReturnType<typeof useCreateCaptureDataMutation>;
export type CreateCaptureDataMutationResult = Apollo.MutationResult<CreateCaptureDataMutation>;
export type CreateCaptureDataMutationOptions = Apollo.BaseMutationOptions<CreateCaptureDataMutation, CreateCaptureDataMutationVariables>;
export const CreateCaptureDataPhotoDocument = gql`
    mutation createCaptureDataPhoto($input: CreateCaptureDataPhotoInput!) {
  createCaptureDataPhoto(input: $input) {
    CaptureDataPhoto {
      idCaptureDataPhoto
    }
  }
}
    `;
export type CreateCaptureDataPhotoMutationFn = Apollo.MutationFunction<CreateCaptureDataPhotoMutation, CreateCaptureDataPhotoMutationVariables>;

/**
 * __useCreateCaptureDataPhotoMutation__
 *
 * To run a mutation, you first call `useCreateCaptureDataPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCaptureDataPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCaptureDataPhotoMutation, { data, loading, error }] = useCreateCaptureDataPhotoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCaptureDataPhotoMutation(baseOptions?: Apollo.MutationHookOptions<CreateCaptureDataPhotoMutation, CreateCaptureDataPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCaptureDataPhotoMutation, CreateCaptureDataPhotoMutationVariables>(CreateCaptureDataPhotoDocument, options);
      }
export type CreateCaptureDataPhotoMutationHookResult = ReturnType<typeof useCreateCaptureDataPhotoMutation>;
export type CreateCaptureDataPhotoMutationResult = Apollo.MutationResult<CreateCaptureDataPhotoMutation>;
export type CreateCaptureDataPhotoMutationOptions = Apollo.BaseMutationOptions<CreateCaptureDataPhotoMutation, CreateCaptureDataPhotoMutationVariables>;
export const IngestDataDocument = gql`
    mutation ingestData($input: IngestDataInput!) {
  ingestData(input: $input) {
    success
  }
}
    `;
export type IngestDataMutationFn = Apollo.MutationFunction<IngestDataMutation, IngestDataMutationVariables>;

/**
 * __useIngestDataMutation__
 *
 * To run a mutation, you first call `useIngestDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIngestDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ingestDataMutation, { data, loading, error }] = useIngestDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIngestDataMutation(baseOptions?: Apollo.MutationHookOptions<IngestDataMutation, IngestDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IngestDataMutation, IngestDataMutationVariables>(IngestDataDocument, options);
      }
export type IngestDataMutationHookResult = ReturnType<typeof useIngestDataMutation>;
export type IngestDataMutationResult = Apollo.MutationResult<IngestDataMutation>;
export type IngestDataMutationOptions = Apollo.BaseMutationOptions<IngestDataMutation, IngestDataMutationVariables>;
export const CreateSceneDocument = gql`
    mutation createScene($input: CreateSceneInput!) {
  createScene(input: $input) {
    Scene {
      idScene
    }
  }
}
    `;
export type CreateSceneMutationFn = Apollo.MutationFunction<CreateSceneMutation, CreateSceneMutationVariables>;

/**
 * __useCreateSceneMutation__
 *
 * To run a mutation, you first call `useCreateSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSceneMutation, { data, loading, error }] = useCreateSceneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSceneMutation(baseOptions?: Apollo.MutationHookOptions<CreateSceneMutation, CreateSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSceneMutation, CreateSceneMutationVariables>(CreateSceneDocument, options);
      }
export type CreateSceneMutationHookResult = ReturnType<typeof useCreateSceneMutation>;
export type CreateSceneMutationResult = Apollo.MutationResult<CreateSceneMutation>;
export type CreateSceneMutationOptions = Apollo.BaseMutationOptions<CreateSceneMutation, CreateSceneMutationVariables>;
export const UpdateObjectDetailsDocument = gql`
    mutation updateObjectDetails($input: UpdateObjectDetailsInput!) {
  updateObjectDetails(input: $input) {
    success
  }
}
    `;
export type UpdateObjectDetailsMutationFn = Apollo.MutationFunction<UpdateObjectDetailsMutation, UpdateObjectDetailsMutationVariables>;

/**
 * __useUpdateObjectDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateObjectDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateObjectDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateObjectDetailsMutation, { data, loading, error }] = useUpdateObjectDetailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateObjectDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateObjectDetailsMutation, UpdateObjectDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateObjectDetailsMutation, UpdateObjectDetailsMutationVariables>(UpdateObjectDetailsDocument, options);
      }
export type UpdateObjectDetailsMutationHookResult = ReturnType<typeof useUpdateObjectDetailsMutation>;
export type UpdateObjectDetailsMutationResult = Apollo.MutationResult<UpdateObjectDetailsMutation>;
export type UpdateObjectDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateObjectDetailsMutation, UpdateObjectDetailsMutationVariables>;
export const CreateItemDocument = gql`
    mutation createItem($input: CreateItemInput!) {
  createItem(input: $input) {
    Item {
      idItem
    }
  }
}
    `;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    Project {
      idProject
      SystemObject {
        idSystemObject
      }
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateSubjectDocument = gql`
    mutation createSubject($input: CreateSubjectInput!) {
  createSubject(input: $input) {
    Subject {
      idSubject
    }
  }
}
    `;
export type CreateSubjectMutationFn = Apollo.MutationFunction<CreateSubjectMutation, CreateSubjectMutationVariables>;

/**
 * __useCreateSubjectMutation__
 *
 * To run a mutation, you first call `useCreateSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubjectMutation, { data, loading, error }] = useCreateSubjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubjectMutation, CreateSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubjectMutation, CreateSubjectMutationVariables>(CreateSubjectDocument, options);
      }
export type CreateSubjectMutationHookResult = ReturnType<typeof useCreateSubjectMutation>;
export type CreateSubjectMutationResult = Apollo.MutationResult<CreateSubjectMutation>;
export type CreateSubjectMutationOptions = Apollo.BaseMutationOptions<CreateSubjectMutation, CreateSubjectMutationVariables>;
export const CreateUnitDocument = gql`
    mutation createUnit($input: CreateUnitInput!) {
  createUnit(input: $input) {
    Unit {
      idUnit
      SystemObject {
        idSystemObject
      }
    }
  }
}
    `;
export type CreateUnitMutationFn = Apollo.MutationFunction<CreateUnitMutation, CreateUnitMutationVariables>;

/**
 * __useCreateUnitMutation__
 *
 * To run a mutation, you first call `useCreateUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnitMutation, { data, loading, error }] = useCreateUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUnitMutation(baseOptions?: Apollo.MutationHookOptions<CreateUnitMutation, CreateUnitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUnitMutation, CreateUnitMutationVariables>(CreateUnitDocument, options);
      }
export type CreateUnitMutationHookResult = ReturnType<typeof useCreateUnitMutation>;
export type CreateUnitMutationResult = Apollo.MutationResult<CreateUnitMutation>;
export type CreateUnitMutationOptions = Apollo.BaseMutationOptions<CreateUnitMutation, CreateUnitMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    User {
      idUser
      Name
      Active
      DateActivated
      WorkflowNotificationTime
      EmailSettings
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    User {
      idUser
      EmailAddress
      Name
      Active
      DateActivated
      DateDisabled
      EmailSettings
      WorkflowNotificationTime
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateVocabularyDocument = gql`
    mutation createVocabulary($input: CreateVocabularyInput!) {
  createVocabulary(input: $input) {
    Vocabulary {
      idVocabulary
    }
  }
}
    `;
export type CreateVocabularyMutationFn = Apollo.MutationFunction<CreateVocabularyMutation, CreateVocabularyMutationVariables>;

/**
 * __useCreateVocabularyMutation__
 *
 * To run a mutation, you first call `useCreateVocabularyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVocabularyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVocabularyMutation, { data, loading, error }] = useCreateVocabularyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVocabularyMutation(baseOptions?: Apollo.MutationHookOptions<CreateVocabularyMutation, CreateVocabularyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVocabularyMutation, CreateVocabularyMutationVariables>(CreateVocabularyDocument, options);
      }
export type CreateVocabularyMutationHookResult = ReturnType<typeof useCreateVocabularyMutation>;
export type CreateVocabularyMutationResult = Apollo.MutationResult<CreateVocabularyMutation>;
export type CreateVocabularyMutationOptions = Apollo.BaseMutationOptions<CreateVocabularyMutation, CreateVocabularyMutationVariables>;
export const CreateVocabularySetDocument = gql`
    mutation createVocabularySet($input: CreateVocabularySetInput!) {
  createVocabularySet(input: $input) {
    VocabularySet {
      idVocabularySet
    }
  }
}
    `;
export type CreateVocabularySetMutationFn = Apollo.MutationFunction<CreateVocabularySetMutation, CreateVocabularySetMutationVariables>;

/**
 * __useCreateVocabularySetMutation__
 *
 * To run a mutation, you first call `useCreateVocabularySetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVocabularySetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVocabularySetMutation, { data, loading, error }] = useCreateVocabularySetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVocabularySetMutation(baseOptions?: Apollo.MutationHookOptions<CreateVocabularySetMutation, CreateVocabularySetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVocabularySetMutation, CreateVocabularySetMutationVariables>(CreateVocabularySetDocument, options);
      }
export type CreateVocabularySetMutationHookResult = ReturnType<typeof useCreateVocabularySetMutation>;
export type CreateVocabularySetMutationResult = Apollo.MutationResult<CreateVocabularySetMutation>;
export type CreateVocabularySetMutationOptions = Apollo.BaseMutationOptions<CreateVocabularySetMutation, CreateVocabularySetMutationVariables>;
export const GetAccessPolicyDocument = gql`
    query getAccessPolicy($input: GetAccessPolicyInput!) {
  getAccessPolicy(input: $input) {
    AccessPolicy {
      idAccessPolicy
    }
  }
}
    `;

/**
 * __useGetAccessPolicyQuery__
 *
 * To run a query within a React component, call `useGetAccessPolicyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccessPolicyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccessPolicyQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAccessPolicyQuery(baseOptions: Apollo.QueryHookOptions<GetAccessPolicyQuery, GetAccessPolicyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccessPolicyQuery, GetAccessPolicyQueryVariables>(GetAccessPolicyDocument, options);
      }
export function useGetAccessPolicyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccessPolicyQuery, GetAccessPolicyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccessPolicyQuery, GetAccessPolicyQueryVariables>(GetAccessPolicyDocument, options);
        }
export type GetAccessPolicyQueryHookResult = ReturnType<typeof useGetAccessPolicyQuery>;
export type GetAccessPolicyLazyQueryHookResult = ReturnType<typeof useGetAccessPolicyLazyQuery>;
export type GetAccessPolicyQueryResult = Apollo.QueryResult<GetAccessPolicyQuery, GetAccessPolicyQueryVariables>;
export const GetAssetDocument = gql`
    query getAsset($input: GetAssetInput!) {
  getAsset(input: $input) {
    Asset {
      idAsset
    }
  }
}
    `;

/**
 * __useGetAssetQuery__
 *
 * To run a query within a React component, call `useGetAssetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAssetQuery(baseOptions: Apollo.QueryHookOptions<GetAssetQuery, GetAssetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetQuery, GetAssetQueryVariables>(GetAssetDocument, options);
      }
export function useGetAssetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetQuery, GetAssetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetQuery, GetAssetQueryVariables>(GetAssetDocument, options);
        }
export type GetAssetQueryHookResult = ReturnType<typeof useGetAssetQuery>;
export type GetAssetLazyQueryHookResult = ReturnType<typeof useGetAssetLazyQuery>;
export type GetAssetQueryResult = Apollo.QueryResult<GetAssetQuery, GetAssetQueryVariables>;
export const GetAssetVersionsDetailsDocument = gql`
    query getAssetVersionsDetails($input: GetAssetVersionsDetailsInput!) {
  getAssetVersionsDetails(input: $input) {
    valid
    Details {
      idAssetVersion
      SubjectUnitIdentifier {
        idSubject
        SubjectName
        UnitAbbreviation
        IdentifierPublic
        IdentifierCollection
      }
      Project {
        idProject
        Name
      }
      Item {
        idItem
        Name
        EntireSubject
      }
      CaptureDataPhoto {
        idAssetVersion
        dateCaptured
        datasetType
        systemCreated
        description
        cameraSettingUniform
        datasetFieldId
        itemPositionType
        itemPositionFieldId
        itemArrangementFieldId
        focusType
        lightsourceType
        backgroundRemovalMethod
        clusterType
        clusterGeometryFieldId
        directory
        folders {
          name
          variantType
        }
        identifiers {
          identifier
          identifierType
        }
      }
      Model {
        idAssetVersion
        systemCreated
        name
        master
        authoritative
        creationMethod
        modality
        purpose
        units
        dateCaptured
        modelFileType
        directory
        identifiers {
          identifier
          identifierType
        }
      }
      Scene {
        idAssetVersion
        identifiers {
          identifier
          identifierType
        }
      }
    }
  }
}
    `;

/**
 * __useGetAssetVersionsDetailsQuery__
 *
 * To run a query within a React component, call `useGetAssetVersionsDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetVersionsDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetVersionsDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAssetVersionsDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetAssetVersionsDetailsQuery, GetAssetVersionsDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetVersionsDetailsQuery, GetAssetVersionsDetailsQueryVariables>(GetAssetVersionsDetailsDocument, options);
      }
export function useGetAssetVersionsDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetVersionsDetailsQuery, GetAssetVersionsDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetVersionsDetailsQuery, GetAssetVersionsDetailsQueryVariables>(GetAssetVersionsDetailsDocument, options);
        }
export type GetAssetVersionsDetailsQueryHookResult = ReturnType<typeof useGetAssetVersionsDetailsQuery>;
export type GetAssetVersionsDetailsLazyQueryHookResult = ReturnType<typeof useGetAssetVersionsDetailsLazyQuery>;
export type GetAssetVersionsDetailsQueryResult = Apollo.QueryResult<GetAssetVersionsDetailsQuery, GetAssetVersionsDetailsQueryVariables>;
export const GetContentsForAssetVersionsDocument = gql`
    query getContentsForAssetVersions($input: GetContentsForAssetVersionsInput!) {
  getContentsForAssetVersions(input: $input) {
    AssetVersionContent {
      idAssetVersion
      folders
      all
    }
  }
}
    `;

/**
 * __useGetContentsForAssetVersionsQuery__
 *
 * To run a query within a React component, call `useGetContentsForAssetVersionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentsForAssetVersionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentsForAssetVersionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetContentsForAssetVersionsQuery(baseOptions: Apollo.QueryHookOptions<GetContentsForAssetVersionsQuery, GetContentsForAssetVersionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentsForAssetVersionsQuery, GetContentsForAssetVersionsQueryVariables>(GetContentsForAssetVersionsDocument, options);
      }
export function useGetContentsForAssetVersionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentsForAssetVersionsQuery, GetContentsForAssetVersionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentsForAssetVersionsQuery, GetContentsForAssetVersionsQueryVariables>(GetContentsForAssetVersionsDocument, options);
        }
export type GetContentsForAssetVersionsQueryHookResult = ReturnType<typeof useGetContentsForAssetVersionsQuery>;
export type GetContentsForAssetVersionsLazyQueryHookResult = ReturnType<typeof useGetContentsForAssetVersionsLazyQuery>;
export type GetContentsForAssetVersionsQueryResult = Apollo.QueryResult<GetContentsForAssetVersionsQuery, GetContentsForAssetVersionsQueryVariables>;
export const GetModelConstellationForAssetVersionDocument = gql`
    query getModelConstellationForAssetVersion($input: GetModelConstellationForAssetVersionInput!) {
  getModelConstellationForAssetVersion(input: $input) {
    idAssetVersion
    ModelConstellation {
      Model {
        idModel
        CountVertices
        CountFaces
        CountAnimations
        CountCameras
        CountLights
        CountMaterials
        CountMeshes
        CountEmbeddedTextures
        CountLinkedTextures
        FileEncoding
        Name
        idVFileType
      }
      ModelObjects {
        idModelObject
        BoundingBoxP1X
        BoundingBoxP1Y
        BoundingBoxP1Z
        BoundingBoxP1Z
        BoundingBoxP2X
        BoundingBoxP2Y
        BoundingBoxP2Z
        CountVertices
        CountFaces
        CountColorChannels
        CountTextureCoordinateChannels
        HasBones
        HasFaceNormals
        HasTangents
        HasTextureCoordinates
        HasVertexNormals
        HasVertexColor
        IsTwoManifoldUnbounded
        IsTwoManifoldBounded
        IsWatertight
        SelfIntersecting
      }
      ModelMaterials {
        idModelMaterial
        Name
      }
      ModelMaterialChannels {
        Type
        Source
        Value
        AdditionalAttributes
        idModelMaterial
        idModelMaterialChannel
      }
      ModelObjectModelMaterialXref {
        idModelObjectModelMaterialXref
        idModelObject
        idModelMaterial
      }
      ModelAssets {
        AssetName
        AssetType
      }
    }
  }
}
    `;

/**
 * __useGetModelConstellationForAssetVersionQuery__
 *
 * To run a query within a React component, call `useGetModelConstellationForAssetVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModelConstellationForAssetVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModelConstellationForAssetVersionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetModelConstellationForAssetVersionQuery(baseOptions: Apollo.QueryHookOptions<GetModelConstellationForAssetVersionQuery, GetModelConstellationForAssetVersionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetModelConstellationForAssetVersionQuery, GetModelConstellationForAssetVersionQueryVariables>(GetModelConstellationForAssetVersionDocument, options);
      }
export function useGetModelConstellationForAssetVersionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetModelConstellationForAssetVersionQuery, GetModelConstellationForAssetVersionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetModelConstellationForAssetVersionQuery, GetModelConstellationForAssetVersionQueryVariables>(GetModelConstellationForAssetVersionDocument, options);
        }
export type GetModelConstellationForAssetVersionQueryHookResult = ReturnType<typeof useGetModelConstellationForAssetVersionQuery>;
export type GetModelConstellationForAssetVersionLazyQueryHookResult = ReturnType<typeof useGetModelConstellationForAssetVersionLazyQuery>;
export type GetModelConstellationForAssetVersionQueryResult = Apollo.QueryResult<GetModelConstellationForAssetVersionQuery, GetModelConstellationForAssetVersionQueryVariables>;
export const GetUploadedAssetVersionDocument = gql`
    query getUploadedAssetVersion {
  getUploadedAssetVersion {
    AssetVersion {
      idAssetVersion
      StorageSize
      FileName
      DateCreated
      Asset {
        idAsset
        VAssetType {
          idVocabulary
          Term
        }
      }
    }
  }
}
    `;

/**
 * __useGetUploadedAssetVersionQuery__
 *
 * To run a query within a React component, call `useGetUploadedAssetVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUploadedAssetVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUploadedAssetVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUploadedAssetVersionQuery(baseOptions?: Apollo.QueryHookOptions<GetUploadedAssetVersionQuery, GetUploadedAssetVersionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUploadedAssetVersionQuery, GetUploadedAssetVersionQueryVariables>(GetUploadedAssetVersionDocument, options);
      }
export function useGetUploadedAssetVersionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUploadedAssetVersionQuery, GetUploadedAssetVersionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUploadedAssetVersionQuery, GetUploadedAssetVersionQueryVariables>(GetUploadedAssetVersionDocument, options);
        }
export type GetUploadedAssetVersionQueryHookResult = ReturnType<typeof useGetUploadedAssetVersionQuery>;
export type GetUploadedAssetVersionLazyQueryHookResult = ReturnType<typeof useGetUploadedAssetVersionLazyQuery>;
export type GetUploadedAssetVersionQueryResult = Apollo.QueryResult<GetUploadedAssetVersionQuery, GetUploadedAssetVersionQueryVariables>;
export const GetCaptureDataDocument = gql`
    query getCaptureData($input: GetCaptureDataInput!) {
  getCaptureData(input: $input) {
    CaptureData {
      idCaptureData
    }
  }
}
    `;

/**
 * __useGetCaptureDataQuery__
 *
 * To run a query within a React component, call `useGetCaptureDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCaptureDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCaptureDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCaptureDataQuery(baseOptions: Apollo.QueryHookOptions<GetCaptureDataQuery, GetCaptureDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCaptureDataQuery, GetCaptureDataQueryVariables>(GetCaptureDataDocument, options);
      }
export function useGetCaptureDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCaptureDataQuery, GetCaptureDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCaptureDataQuery, GetCaptureDataQueryVariables>(GetCaptureDataDocument, options);
        }
export type GetCaptureDataQueryHookResult = ReturnType<typeof useGetCaptureDataQuery>;
export type GetCaptureDataLazyQueryHookResult = ReturnType<typeof useGetCaptureDataLazyQuery>;
export type GetCaptureDataQueryResult = Apollo.QueryResult<GetCaptureDataQuery, GetCaptureDataQueryVariables>;
export const GetCaptureDataPhotoDocument = gql`
    query getCaptureDataPhoto($input: GetCaptureDataPhotoInput!) {
  getCaptureDataPhoto(input: $input) {
    CaptureDataPhoto {
      idCaptureDataPhoto
    }
  }
}
    `;

/**
 * __useGetCaptureDataPhotoQuery__
 *
 * To run a query within a React component, call `useGetCaptureDataPhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCaptureDataPhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCaptureDataPhotoQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCaptureDataPhotoQuery(baseOptions: Apollo.QueryHookOptions<GetCaptureDataPhotoQuery, GetCaptureDataPhotoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCaptureDataPhotoQuery, GetCaptureDataPhotoQueryVariables>(GetCaptureDataPhotoDocument, options);
      }
export function useGetCaptureDataPhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCaptureDataPhotoQuery, GetCaptureDataPhotoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCaptureDataPhotoQuery, GetCaptureDataPhotoQueryVariables>(GetCaptureDataPhotoDocument, options);
        }
export type GetCaptureDataPhotoQueryHookResult = ReturnType<typeof useGetCaptureDataPhotoQuery>;
export type GetCaptureDataPhotoLazyQueryHookResult = ReturnType<typeof useGetCaptureDataPhotoLazyQuery>;
export type GetCaptureDataPhotoQueryResult = Apollo.QueryResult<GetCaptureDataPhotoQuery, GetCaptureDataPhotoQueryVariables>;
export const AreCameraSettingsUniformDocument = gql`
    query areCameraSettingsUniform($input: AreCameraSettingsUniformInput!) {
  areCameraSettingsUniform(input: $input) {
    isUniform
  }
}
    `;

/**
 * __useAreCameraSettingsUniformQuery__
 *
 * To run a query within a React component, call `useAreCameraSettingsUniformQuery` and pass it any options that fit your needs.
 * When your component renders, `useAreCameraSettingsUniformQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAreCameraSettingsUniformQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAreCameraSettingsUniformQuery(baseOptions: Apollo.QueryHookOptions<AreCameraSettingsUniformQuery, AreCameraSettingsUniformQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AreCameraSettingsUniformQuery, AreCameraSettingsUniformQueryVariables>(AreCameraSettingsUniformDocument, options);
      }
export function useAreCameraSettingsUniformLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AreCameraSettingsUniformQuery, AreCameraSettingsUniformQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AreCameraSettingsUniformQuery, AreCameraSettingsUniformQueryVariables>(AreCameraSettingsUniformDocument, options);
        }
export type AreCameraSettingsUniformQueryHookResult = ReturnType<typeof useAreCameraSettingsUniformQuery>;
export type AreCameraSettingsUniformLazyQueryHookResult = ReturnType<typeof useAreCameraSettingsUniformLazyQuery>;
export type AreCameraSettingsUniformQueryResult = Apollo.QueryResult<AreCameraSettingsUniformQuery, AreCameraSettingsUniformQueryVariables>;
export const GetLicenseDocument = gql`
    query getLicense($input: GetLicenseInput!) {
  getLicense(input: $input) {
    License {
      idLicense
    }
  }
}
    `;

/**
 * __useGetLicenseQuery__
 *
 * To run a query within a React component, call `useGetLicenseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLicenseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLicenseQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLicenseQuery(baseOptions: Apollo.QueryHookOptions<GetLicenseQuery, GetLicenseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLicenseQuery, GetLicenseQueryVariables>(GetLicenseDocument, options);
      }
export function useGetLicenseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLicenseQuery, GetLicenseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLicenseQuery, GetLicenseQueryVariables>(GetLicenseDocument, options);
        }
export type GetLicenseQueryHookResult = ReturnType<typeof useGetLicenseQuery>;
export type GetLicenseLazyQueryHookResult = ReturnType<typeof useGetLicenseLazyQuery>;
export type GetLicenseQueryResult = Apollo.QueryResult<GetLicenseQuery, GetLicenseQueryVariables>;
export const GetModelDocument = gql`
    query getModel($input: GetModelInput!) {
  getModel(input: $input) {
    Model {
      idModel
    }
  }
}
    `;

/**
 * __useGetModelQuery__
 *
 * To run a query within a React component, call `useGetModelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModelQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetModelQuery(baseOptions: Apollo.QueryHookOptions<GetModelQuery, GetModelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetModelQuery, GetModelQueryVariables>(GetModelDocument, options);
      }
export function useGetModelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetModelQuery, GetModelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetModelQuery, GetModelQueryVariables>(GetModelDocument, options);
        }
export type GetModelQueryHookResult = ReturnType<typeof useGetModelQuery>;
export type GetModelLazyQueryHookResult = ReturnType<typeof useGetModelLazyQuery>;
export type GetModelQueryResult = Apollo.QueryResult<GetModelQuery, GetModelQueryVariables>;
export const GetModelConstellationDocument = gql`
    query getModelConstellation($input: GetModelConstellationInput!) {
  getModelConstellation(input: $input) {
    ModelConstellation {
      Model {
        idModel
        Name
        DateCreated
        Master
        Authoritative
        VCreationMethod {
          Term
        }
        VModality {
          Term
        }
        VPurpose {
          Term
        }
        VUnits {
          Term
        }
        VFileType {
          Term
        }
        idAssetThumbnail
        CountAnimations
        CountCameras
        CountFaces
        CountLights
        CountMaterials
        CountMeshes
        CountVertices
        CountEmbeddedTextures
        CountLinkedTextures
        FileEncoding
      }
      ModelObjects {
        idModelObject
        idModel
        BoundingBoxP1X
        BoundingBoxP1Y
        BoundingBoxP1Z
        BoundingBoxP2X
        BoundingBoxP2Y
        BoundingBoxP2Z
        CountVertices
        CountFaces
        CountColorChannels
        CountTextureCoordinateChannels
        HasBones
        HasFaceNormals
        HasTangents
        HasTextureCoordinates
        HasVertexNormals
        HasVertexColor
        IsTwoManifoldUnbounded
        IsTwoManifoldBounded
        IsWatertight
        SelfIntersecting
      }
      ModelMaterials {
        idModelMaterial
        Name
      }
      ModelMaterialChannels {
        idModelMaterialChannel
        idModelMaterial
        Type
        Source
        Value
        VMaterialType {
          Term
        }
        MaterialTypeOther
        idModelMaterialUVMap
        UVMapEmbedded
        ChannelPosition
        ChannelWidth
        Scalar1
        Scalar2
        Scalar3
        Scalar4
        AdditionalAttributes
      }
      ModelMaterialUVMaps {
        idModelMaterialUVMap
        idModel
        idAsset
        UVMapEdgeLength
      }
      ModelObjectModelMaterialXref {
        idModelObject
        idModelMaterial
      }
      ModelAssets {
        AssetName
        AssetType
        AssetVersion {
          idAsset
          idAssetVersion
          FileName
        }
      }
    }
  }
}
    `;

/**
 * __useGetModelConstellationQuery__
 *
 * To run a query within a React component, call `useGetModelConstellationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModelConstellationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModelConstellationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetModelConstellationQuery(baseOptions: Apollo.QueryHookOptions<GetModelConstellationQuery, GetModelConstellationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetModelConstellationQuery, GetModelConstellationQueryVariables>(GetModelConstellationDocument, options);
      }
export function useGetModelConstellationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetModelConstellationQuery, GetModelConstellationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetModelConstellationQuery, GetModelConstellationQueryVariables>(GetModelConstellationDocument, options);
        }
export type GetModelConstellationQueryHookResult = ReturnType<typeof useGetModelConstellationQuery>;
export type GetModelConstellationLazyQueryHookResult = ReturnType<typeof useGetModelConstellationLazyQuery>;
export type GetModelConstellationQueryResult = Apollo.QueryResult<GetModelConstellationQuery, GetModelConstellationQueryVariables>;
export const GetFilterViewDataDocument = gql`
    query getFilterViewData {
  getFilterViewData {
    units {
      idUnit
      Name
      SystemObject {
        idSystemObject
      }
    }
    projects {
      idProject
      Name
      SystemObject {
        idSystemObject
      }
    }
  }
}
    `;

/**
 * __useGetFilterViewDataQuery__
 *
 * To run a query within a React component, call `useGetFilterViewDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilterViewDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilterViewDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFilterViewDataQuery(baseOptions?: Apollo.QueryHookOptions<GetFilterViewDataQuery, GetFilterViewDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilterViewDataQuery, GetFilterViewDataQueryVariables>(GetFilterViewDataDocument, options);
      }
export function useGetFilterViewDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilterViewDataQuery, GetFilterViewDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilterViewDataQuery, GetFilterViewDataQueryVariables>(GetFilterViewDataDocument, options);
        }
export type GetFilterViewDataQueryHookResult = ReturnType<typeof useGetFilterViewDataQuery>;
export type GetFilterViewDataLazyQueryHookResult = ReturnType<typeof useGetFilterViewDataLazyQuery>;
export type GetFilterViewDataQueryResult = Apollo.QueryResult<GetFilterViewDataQuery, GetFilterViewDataQueryVariables>;
export const GetObjectChildrenDocument = gql`
    query getObjectChildren($input: GetObjectChildrenInput!) {
  getObjectChildren(input: $input) {
    success
    error
    entries {
      idSystemObject
      name
      objectType
      idObject
      metadata
    }
    metadataColumns
  }
}
    `;

/**
 * __useGetObjectChildrenQuery__
 *
 * To run a query within a React component, call `useGetObjectChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetObjectChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetObjectChildrenQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetObjectChildrenQuery(baseOptions: Apollo.QueryHookOptions<GetObjectChildrenQuery, GetObjectChildrenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetObjectChildrenQuery, GetObjectChildrenQueryVariables>(GetObjectChildrenDocument, options);
      }
export function useGetObjectChildrenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetObjectChildrenQuery, GetObjectChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetObjectChildrenQuery, GetObjectChildrenQueryVariables>(GetObjectChildrenDocument, options);
        }
export type GetObjectChildrenQueryHookResult = ReturnType<typeof useGetObjectChildrenQuery>;
export type GetObjectChildrenLazyQueryHookResult = ReturnType<typeof useGetObjectChildrenLazyQuery>;
export type GetObjectChildrenQueryResult = Apollo.QueryResult<GetObjectChildrenQuery, GetObjectChildrenQueryVariables>;
export const GetIntermediaryFileDocument = gql`
    query getIntermediaryFile($input: GetIntermediaryFileInput!) {
  getIntermediaryFile(input: $input) {
    IntermediaryFile {
      idIntermediaryFile
    }
  }
}
    `;

/**
 * __useGetIntermediaryFileQuery__
 *
 * To run a query within a React component, call `useGetIntermediaryFileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIntermediaryFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIntermediaryFileQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetIntermediaryFileQuery(baseOptions: Apollo.QueryHookOptions<GetIntermediaryFileQuery, GetIntermediaryFileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIntermediaryFileQuery, GetIntermediaryFileQueryVariables>(GetIntermediaryFileDocument, options);
      }
export function useGetIntermediaryFileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIntermediaryFileQuery, GetIntermediaryFileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIntermediaryFileQuery, GetIntermediaryFileQueryVariables>(GetIntermediaryFileDocument, options);
        }
export type GetIntermediaryFileQueryHookResult = ReturnType<typeof useGetIntermediaryFileQuery>;
export type GetIntermediaryFileLazyQueryHookResult = ReturnType<typeof useGetIntermediaryFileLazyQuery>;
export type GetIntermediaryFileQueryResult = Apollo.QueryResult<GetIntermediaryFileQuery, GetIntermediaryFileQueryVariables>;
export const GetSceneDocument = gql`
    query getScene($input: GetSceneInput!) {
  getScene(input: $input) {
    Scene {
      idScene
    }
  }
}
    `;

/**
 * __useGetSceneQuery__
 *
 * To run a query within a React component, call `useGetSceneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSceneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSceneQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSceneQuery(baseOptions: Apollo.QueryHookOptions<GetSceneQuery, GetSceneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSceneQuery, GetSceneQueryVariables>(GetSceneDocument, options);
      }
export function useGetSceneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSceneQuery, GetSceneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSceneQuery, GetSceneQueryVariables>(GetSceneDocument, options);
        }
export type GetSceneQueryHookResult = ReturnType<typeof useGetSceneQuery>;
export type GetSceneLazyQueryHookResult = ReturnType<typeof useGetSceneLazyQuery>;
export type GetSceneQueryResult = Apollo.QueryResult<GetSceneQuery, GetSceneQueryVariables>;
export const GetAssetDetailsForSystemObjectDocument = gql`
    query getAssetDetailsForSystemObject($input: GetAssetDetailsForSystemObjectInput!) {
  getAssetDetailsForSystemObject(input: $input) {
    assetDetails {
      idSystemObject
      name
      path
      assetType
      version
      dateCreated
      size
    }
  }
}
    `;

/**
 * __useGetAssetDetailsForSystemObjectQuery__
 *
 * To run a query within a React component, call `useGetAssetDetailsForSystemObjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetDetailsForSystemObjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetDetailsForSystemObjectQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAssetDetailsForSystemObjectQuery(baseOptions: Apollo.QueryHookOptions<GetAssetDetailsForSystemObjectQuery, GetAssetDetailsForSystemObjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetDetailsForSystemObjectQuery, GetAssetDetailsForSystemObjectQueryVariables>(GetAssetDetailsForSystemObjectDocument, options);
      }
export function useGetAssetDetailsForSystemObjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetDetailsForSystemObjectQuery, GetAssetDetailsForSystemObjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetDetailsForSystemObjectQuery, GetAssetDetailsForSystemObjectQueryVariables>(GetAssetDetailsForSystemObjectDocument, options);
        }
export type GetAssetDetailsForSystemObjectQueryHookResult = ReturnType<typeof useGetAssetDetailsForSystemObjectQuery>;
export type GetAssetDetailsForSystemObjectLazyQueryHookResult = ReturnType<typeof useGetAssetDetailsForSystemObjectLazyQuery>;
export type GetAssetDetailsForSystemObjectQueryResult = Apollo.QueryResult<GetAssetDetailsForSystemObjectQuery, GetAssetDetailsForSystemObjectQueryVariables>;
export const GetDetailsTabDataForObjectDocument = gql`
    query getDetailsTabDataForObject($input: GetDetailsTabDataForObjectInput!) {
  getDetailsTabDataForObject(input: $input) {
    Unit {
      Abbreviation
      ARKPrefix
    }
    Project {
      Description
    }
    Subject {
      Altitude
      Latitude
      Longitude
      R0
      R1
      R2
      R3
      TS0
      TS1
      TS2
    }
    Item {
      EntireSubject
      Altitude
      Latitude
      Longitude
      R0
      R1
      R2
      R3
      TS0
      TS1
      TS2
    }
    CaptureData {
      captureMethod
      dateCaptured
      datasetType
      description
      cameraSettingUniform
      datasetFieldId
      itemPositionType
      itemPositionFieldId
      itemArrangementFieldId
      focusType
      lightsourceType
      backgroundRemovalMethod
      clusterType
      clusterGeometryFieldId
      folders {
        name
        variantType
      }
    }
    Model {
      Model {
        idModel
        CountVertices
        CountFaces
        CountAnimations
        CountCameras
        CountLights
        CountMaterials
        CountMeshes
        CountEmbeddedTextures
        CountLinkedTextures
        FileEncoding
        Name
        DateCreated
        Master
        Authoritative
        idVCreationMethod
        idVModality
        idVUnits
        idVPurpose
        idVFileType
      }
      ModelObjects {
        idModelObject
        BoundingBoxP1X
        BoundingBoxP1Y
        BoundingBoxP1Z
        BoundingBoxP1Z
        BoundingBoxP2X
        BoundingBoxP2Y
        BoundingBoxP2Z
        CountVertices
        CountFaces
        CountColorChannels
        CountTextureCoordinateChannels
        HasBones
        HasFaceNormals
        HasTangents
        HasTextureCoordinates
        HasVertexNormals
        HasVertexColor
        IsTwoManifoldUnbounded
        IsTwoManifoldBounded
        IsWatertight
        SelfIntersecting
      }
      ModelMaterials {
        idModelMaterial
        Name
      }
      ModelMaterialChannels {
        Type
        Source
        Value
        AdditionalAttributes
        idModelMaterial
        idModelMaterialChannel
      }
      ModelObjectModelMaterialXref {
        idModelObjectModelMaterialXref
        idModelObject
        idModelMaterial
      }
      ModelAssets {
        AssetName
        AssetType
      }
    }
    Scene {
      Links
      AssetType
      Tours
      Annotation
      HasBeenQCd
      IsOriented
    }
    IntermediaryFile {
      idIntermediaryFile
    }
    ProjectDocumentation {
      Description
    }
    Asset {
      FilePath
      AssetType
    }
    AssetVersion {
      Creator
      DateCreated
      StorageSize
      Ingested
      Version
    }
    Actor {
      OrganizationName
    }
    Stakeholder {
      OrganizationName
      EmailAddress
      PhoneNumberMobile
      PhoneNumberOffice
      MailingAddress
    }
  }
}
    `;

/**
 * __useGetDetailsTabDataForObjectQuery__
 *
 * To run a query within a React component, call `useGetDetailsTabDataForObjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDetailsTabDataForObjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDetailsTabDataForObjectQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetDetailsTabDataForObjectQuery(baseOptions: Apollo.QueryHookOptions<GetDetailsTabDataForObjectQuery, GetDetailsTabDataForObjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDetailsTabDataForObjectQuery, GetDetailsTabDataForObjectQueryVariables>(GetDetailsTabDataForObjectDocument, options);
      }
export function useGetDetailsTabDataForObjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDetailsTabDataForObjectQuery, GetDetailsTabDataForObjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDetailsTabDataForObjectQuery, GetDetailsTabDataForObjectQueryVariables>(GetDetailsTabDataForObjectDocument, options);
        }
export type GetDetailsTabDataForObjectQueryHookResult = ReturnType<typeof useGetDetailsTabDataForObjectQuery>;
export type GetDetailsTabDataForObjectLazyQueryHookResult = ReturnType<typeof useGetDetailsTabDataForObjectLazyQuery>;
export type GetDetailsTabDataForObjectQueryResult = Apollo.QueryResult<GetDetailsTabDataForObjectQuery, GetDetailsTabDataForObjectQueryVariables>;
export const GetProjectListDocument = gql`
    query getProjectList($input: GetProjectListInput!) {
  getProjectList(input: $input) {
    projects {
      idProject
      Name
      SystemObject {
        idSystemObject
      }
    }
  }
}
    `;

/**
 * __useGetProjectListQuery__
 *
 * To run a query within a React component, call `useGetProjectListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProjectListQuery(baseOptions: Apollo.QueryHookOptions<GetProjectListQuery, GetProjectListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectListQuery, GetProjectListQueryVariables>(GetProjectListDocument, options);
      }
export function useGetProjectListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectListQuery, GetProjectListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectListQuery, GetProjectListQueryVariables>(GetProjectListDocument, options);
        }
export type GetProjectListQueryHookResult = ReturnType<typeof useGetProjectListQuery>;
export type GetProjectListLazyQueryHookResult = ReturnType<typeof useGetProjectListLazyQuery>;
export type GetProjectListQueryResult = Apollo.QueryResult<GetProjectListQuery, GetProjectListQueryVariables>;
export const GetSourceObjectIdentiferDocument = gql`
    query getSourceObjectIdentifer($input: GetSourceObjectIdentiferInput!) {
  getSourceObjectIdentifer(input: $input) {
    sourceObjectIdentifiers {
      idSystemObject
      identifier
    }
  }
}
    `;

/**
 * __useGetSourceObjectIdentiferQuery__
 *
 * To run a query within a React component, call `useGetSourceObjectIdentiferQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSourceObjectIdentiferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSourceObjectIdentiferQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSourceObjectIdentiferQuery(baseOptions: Apollo.QueryHookOptions<GetSourceObjectIdentiferQuery, GetSourceObjectIdentiferQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSourceObjectIdentiferQuery, GetSourceObjectIdentiferQueryVariables>(GetSourceObjectIdentiferDocument, options);
      }
export function useGetSourceObjectIdentiferLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSourceObjectIdentiferQuery, GetSourceObjectIdentiferQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSourceObjectIdentiferQuery, GetSourceObjectIdentiferQueryVariables>(GetSourceObjectIdentiferDocument, options);
        }
export type GetSourceObjectIdentiferQueryHookResult = ReturnType<typeof useGetSourceObjectIdentiferQuery>;
export type GetSourceObjectIdentiferLazyQueryHookResult = ReturnType<typeof useGetSourceObjectIdentiferLazyQuery>;
export type GetSourceObjectIdentiferQueryResult = Apollo.QueryResult<GetSourceObjectIdentiferQuery, GetSourceObjectIdentiferQueryVariables>;
export const GetSystemObjectDetailsDocument = gql`
    query getSystemObjectDetails($input: GetSystemObjectDetailsInput!) {
  getSystemObjectDetails(input: $input) {
    idObject
    name
    retired
    objectType
    allowed
    publishedState
    thumbnail
    identifiers {
      identifier
      identifierType
    }
    unit {
      idSystemObject
      name
      objectType
    }
    project {
      idSystemObject
      name
      objectType
    }
    subject {
      idSystemObject
      name
      objectType
    }
    item {
      idSystemObject
      name
      objectType
    }
    objectAncestors {
      idSystemObject
      name
      objectType
    }
    sourceObjects {
      idSystemObject
      name
      identifier
      objectType
    }
    derivedObjects {
      idSystemObject
      name
      identifier
      objectType
    }
  }
}
    `;

/**
 * __useGetSystemObjectDetailsQuery__
 *
 * To run a query within a React component, call `useGetSystemObjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSystemObjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSystemObjectDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSystemObjectDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetSystemObjectDetailsQuery, GetSystemObjectDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSystemObjectDetailsQuery, GetSystemObjectDetailsQueryVariables>(GetSystemObjectDetailsDocument, options);
      }
export function useGetSystemObjectDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSystemObjectDetailsQuery, GetSystemObjectDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSystemObjectDetailsQuery, GetSystemObjectDetailsQueryVariables>(GetSystemObjectDetailsDocument, options);
        }
export type GetSystemObjectDetailsQueryHookResult = ReturnType<typeof useGetSystemObjectDetailsQuery>;
export type GetSystemObjectDetailsLazyQueryHookResult = ReturnType<typeof useGetSystemObjectDetailsLazyQuery>;
export type GetSystemObjectDetailsQueryResult = Apollo.QueryResult<GetSystemObjectDetailsQuery, GetSystemObjectDetailsQueryVariables>;
export const GetVersionsForSystemObjectDocument = gql`
    query getVersionsForSystemObject($input: GetVersionsForSystemObjectInput!) {
  getVersionsForSystemObject(input: $input) {
    versions {
      idSystemObject
      version
      name
      creator
      dateCreated
      size
    }
  }
}
    `;

/**
 * __useGetVersionsForSystemObjectQuery__
 *
 * To run a query within a React component, call `useGetVersionsForSystemObjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVersionsForSystemObjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVersionsForSystemObjectQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetVersionsForSystemObjectQuery(baseOptions: Apollo.QueryHookOptions<GetVersionsForSystemObjectQuery, GetVersionsForSystemObjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVersionsForSystemObjectQuery, GetVersionsForSystemObjectQueryVariables>(GetVersionsForSystemObjectDocument, options);
      }
export function useGetVersionsForSystemObjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVersionsForSystemObjectQuery, GetVersionsForSystemObjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVersionsForSystemObjectQuery, GetVersionsForSystemObjectQueryVariables>(GetVersionsForSystemObjectDocument, options);
        }
export type GetVersionsForSystemObjectQueryHookResult = ReturnType<typeof useGetVersionsForSystemObjectQuery>;
export type GetVersionsForSystemObjectLazyQueryHookResult = ReturnType<typeof useGetVersionsForSystemObjectLazyQuery>;
export type GetVersionsForSystemObjectQueryResult = Apollo.QueryResult<GetVersionsForSystemObjectQuery, GetVersionsForSystemObjectQueryVariables>;
export const GetIngestionItemsForSubjectsDocument = gql`
    query getIngestionItemsForSubjects($input: GetIngestionItemsForSubjectsInput!) {
  getIngestionItemsForSubjects(input: $input) {
    Item {
      idItem
      EntireSubject
      Name
    }
  }
}
    `;

/**
 * __useGetIngestionItemsForSubjectsQuery__
 *
 * To run a query within a React component, call `useGetIngestionItemsForSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIngestionItemsForSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIngestionItemsForSubjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetIngestionItemsForSubjectsQuery(baseOptions: Apollo.QueryHookOptions<GetIngestionItemsForSubjectsQuery, GetIngestionItemsForSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIngestionItemsForSubjectsQuery, GetIngestionItemsForSubjectsQueryVariables>(GetIngestionItemsForSubjectsDocument, options);
      }
export function useGetIngestionItemsForSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIngestionItemsForSubjectsQuery, GetIngestionItemsForSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIngestionItemsForSubjectsQuery, GetIngestionItemsForSubjectsQueryVariables>(GetIngestionItemsForSubjectsDocument, options);
        }
export type GetIngestionItemsForSubjectsQueryHookResult = ReturnType<typeof useGetIngestionItemsForSubjectsQuery>;
export type GetIngestionItemsForSubjectsLazyQueryHookResult = ReturnType<typeof useGetIngestionItemsForSubjectsLazyQuery>;
export type GetIngestionItemsForSubjectsQueryResult = Apollo.QueryResult<GetIngestionItemsForSubjectsQuery, GetIngestionItemsForSubjectsQueryVariables>;
export const GetIngestionProjectsForSubjectsDocument = gql`
    query getIngestionProjectsForSubjects($input: GetIngestionProjectsForSubjectsInput!) {
  getIngestionProjectsForSubjects(input: $input) {
    Project {
      idProject
      Name
    }
  }
}
    `;

/**
 * __useGetIngestionProjectsForSubjectsQuery__
 *
 * To run a query within a React component, call `useGetIngestionProjectsForSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIngestionProjectsForSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIngestionProjectsForSubjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetIngestionProjectsForSubjectsQuery(baseOptions: Apollo.QueryHookOptions<GetIngestionProjectsForSubjectsQuery, GetIngestionProjectsForSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIngestionProjectsForSubjectsQuery, GetIngestionProjectsForSubjectsQueryVariables>(GetIngestionProjectsForSubjectsDocument, options);
      }
export function useGetIngestionProjectsForSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIngestionProjectsForSubjectsQuery, GetIngestionProjectsForSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIngestionProjectsForSubjectsQuery, GetIngestionProjectsForSubjectsQueryVariables>(GetIngestionProjectsForSubjectsDocument, options);
        }
export type GetIngestionProjectsForSubjectsQueryHookResult = ReturnType<typeof useGetIngestionProjectsForSubjectsQuery>;
export type GetIngestionProjectsForSubjectsLazyQueryHookResult = ReturnType<typeof useGetIngestionProjectsForSubjectsLazyQuery>;
export type GetIngestionProjectsForSubjectsQueryResult = Apollo.QueryResult<GetIngestionProjectsForSubjectsQuery, GetIngestionProjectsForSubjectsQueryVariables>;
export const GetItemDocument = gql`
    query getItem($input: GetItemInput!) {
  getItem(input: $input) {
    Item {
      idItem
    }
  }
}
    `;

/**
 * __useGetItemQuery__
 *
 * To run a query within a React component, call `useGetItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetItemQuery(baseOptions: Apollo.QueryHookOptions<GetItemQuery, GetItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemQuery, GetItemQueryVariables>(GetItemDocument, options);
      }
export function useGetItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemQuery, GetItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemQuery, GetItemQueryVariables>(GetItemDocument, options);
        }
export type GetItemQueryHookResult = ReturnType<typeof useGetItemQuery>;
export type GetItemLazyQueryHookResult = ReturnType<typeof useGetItemLazyQuery>;
export type GetItemQueryResult = Apollo.QueryResult<GetItemQuery, GetItemQueryVariables>;
export const GetItemsForSubjectDocument = gql`
    query getItemsForSubject($input: GetItemsForSubjectInput!) {
  getItemsForSubject(input: $input) {
    Item {
      idItem
      Name
    }
  }
}
    `;

/**
 * __useGetItemsForSubjectQuery__
 *
 * To run a query within a React component, call `useGetItemsForSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsForSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsForSubjectQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetItemsForSubjectQuery(baseOptions: Apollo.QueryHookOptions<GetItemsForSubjectQuery, GetItemsForSubjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemsForSubjectQuery, GetItemsForSubjectQueryVariables>(GetItemsForSubjectDocument, options);
      }
export function useGetItemsForSubjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemsForSubjectQuery, GetItemsForSubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemsForSubjectQuery, GetItemsForSubjectQueryVariables>(GetItemsForSubjectDocument, options);
        }
export type GetItemsForSubjectQueryHookResult = ReturnType<typeof useGetItemsForSubjectQuery>;
export type GetItemsForSubjectLazyQueryHookResult = ReturnType<typeof useGetItemsForSubjectLazyQuery>;
export type GetItemsForSubjectQueryResult = Apollo.QueryResult<GetItemsForSubjectQuery, GetItemsForSubjectQueryVariables>;
export const GetObjectsForItemDocument = gql`
    query getObjectsForItem($input: GetObjectsForItemInput!) {
  getObjectsForItem(input: $input) {
    CaptureData {
      idCaptureData
      DateCaptured
      Description
    }
    Model {
      idModel
      Authoritative
      DateCreated
    }
    Scene {
      idScene
      HasBeenQCd
      IsOriented
      Name
    }
    IntermediaryFile {
      idIntermediaryFile
      DateCreated
    }
    ProjectDocumentation {
      idProjectDocumentation
      Description
      Name
    }
  }
}
    `;

/**
 * __useGetObjectsForItemQuery__
 *
 * To run a query within a React component, call `useGetObjectsForItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetObjectsForItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetObjectsForItemQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetObjectsForItemQuery(baseOptions: Apollo.QueryHookOptions<GetObjectsForItemQuery, GetObjectsForItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetObjectsForItemQuery, GetObjectsForItemQueryVariables>(GetObjectsForItemDocument, options);
      }
export function useGetObjectsForItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetObjectsForItemQuery, GetObjectsForItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetObjectsForItemQuery, GetObjectsForItemQueryVariables>(GetObjectsForItemDocument, options);
        }
export type GetObjectsForItemQueryHookResult = ReturnType<typeof useGetObjectsForItemQuery>;
export type GetObjectsForItemLazyQueryHookResult = ReturnType<typeof useGetObjectsForItemLazyQuery>;
export type GetObjectsForItemQueryResult = Apollo.QueryResult<GetObjectsForItemQuery, GetObjectsForItemQueryVariables>;
export const GetProjectDocument = gql`
    query getProject($input: GetProjectInput!) {
  getProject(input: $input) {
    Project {
      idProject
      SystemObject {
        idSystemObject
      }
    }
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetProjectDocumentationDocument = gql`
    query getProjectDocumentation($input: GetProjectDocumentationInput!) {
  getProjectDocumentation(input: $input) {
    ProjectDocumentation {
      idProjectDocumentation
    }
  }
}
    `;

/**
 * __useGetProjectDocumentationQuery__
 *
 * To run a query within a React component, call `useGetProjectDocumentationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDocumentationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDocumentationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProjectDocumentationQuery(baseOptions: Apollo.QueryHookOptions<GetProjectDocumentationQuery, GetProjectDocumentationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectDocumentationQuery, GetProjectDocumentationQueryVariables>(GetProjectDocumentationDocument, options);
      }
export function useGetProjectDocumentationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDocumentationQuery, GetProjectDocumentationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectDocumentationQuery, GetProjectDocumentationQueryVariables>(GetProjectDocumentationDocument, options);
        }
export type GetProjectDocumentationQueryHookResult = ReturnType<typeof useGetProjectDocumentationQuery>;
export type GetProjectDocumentationLazyQueryHookResult = ReturnType<typeof useGetProjectDocumentationLazyQuery>;
export type GetProjectDocumentationQueryResult = Apollo.QueryResult<GetProjectDocumentationQuery, GetProjectDocumentationQueryVariables>;
export const GetSubjectDocument = gql`
    query getSubject($input: GetSubjectInput!) {
  getSubject(input: $input) {
    Subject {
      idSubject
      SystemObject {
        idSystemObject
      }
    }
  }
}
    `;

/**
 * __useGetSubjectQuery__
 *
 * To run a query within a React component, call `useGetSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSubjectQuery(baseOptions: Apollo.QueryHookOptions<GetSubjectQuery, GetSubjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectQuery, GetSubjectQueryVariables>(GetSubjectDocument, options);
      }
export function useGetSubjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectQuery, GetSubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectQuery, GetSubjectQueryVariables>(GetSubjectDocument, options);
        }
export type GetSubjectQueryHookResult = ReturnType<typeof useGetSubjectQuery>;
export type GetSubjectLazyQueryHookResult = ReturnType<typeof useGetSubjectLazyQuery>;
export type GetSubjectQueryResult = Apollo.QueryResult<GetSubjectQuery, GetSubjectQueryVariables>;
export const GetSubjectsForUnitDocument = gql`
    query getSubjectsForUnit($input: GetSubjectsForUnitInput!) {
  getSubjectsForUnit(input: $input) {
    Subject {
      idSubject
      Name
    }
  }
}
    `;

/**
 * __useGetSubjectsForUnitQuery__
 *
 * To run a query within a React component, call `useGetSubjectsForUnitQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectsForUnitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectsForUnitQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSubjectsForUnitQuery(baseOptions: Apollo.QueryHookOptions<GetSubjectsForUnitQuery, GetSubjectsForUnitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectsForUnitQuery, GetSubjectsForUnitQueryVariables>(GetSubjectsForUnitDocument, options);
      }
export function useGetSubjectsForUnitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectsForUnitQuery, GetSubjectsForUnitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectsForUnitQuery, GetSubjectsForUnitQueryVariables>(GetSubjectsForUnitDocument, options);
        }
export type GetSubjectsForUnitQueryHookResult = ReturnType<typeof useGetSubjectsForUnitQuery>;
export type GetSubjectsForUnitLazyQueryHookResult = ReturnType<typeof useGetSubjectsForUnitLazyQuery>;
export type GetSubjectsForUnitQueryResult = Apollo.QueryResult<GetSubjectsForUnitQuery, GetSubjectsForUnitQueryVariables>;
export const GetUnitDocument = gql`
    query getUnit($input: GetUnitInput!) {
  getUnit(input: $input) {
    Unit {
      idUnit
    }
  }
}
    `;

/**
 * __useGetUnitQuery__
 *
 * To run a query within a React component, call `useGetUnitQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUnitQuery(baseOptions: Apollo.QueryHookOptions<GetUnitQuery, GetUnitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnitQuery, GetUnitQueryVariables>(GetUnitDocument, options);
      }
export function useGetUnitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnitQuery, GetUnitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnitQuery, GetUnitQueryVariables>(GetUnitDocument, options);
        }
export type GetUnitQueryHookResult = ReturnType<typeof useGetUnitQuery>;
export type GetUnitLazyQueryHookResult = ReturnType<typeof useGetUnitLazyQuery>;
export type GetUnitQueryResult = Apollo.QueryResult<GetUnitQuery, GetUnitQueryVariables>;
export const GetUnitsFromNameSearchDocument = gql`
    query getUnitsFromNameSearch($input: GetUnitsFromNameSearchInput!) {
  getUnitsFromNameSearch(input: $input) {
    Units {
      idUnit
      Name
      Abbreviation
      SystemObject {
        idSystemObject
      }
    }
  }
}
    `;

/**
 * __useGetUnitsFromNameSearchQuery__
 *
 * To run a query within a React component, call `useGetUnitsFromNameSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitsFromNameSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitsFromNameSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUnitsFromNameSearchQuery(baseOptions: Apollo.QueryHookOptions<GetUnitsFromNameSearchQuery, GetUnitsFromNameSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnitsFromNameSearchQuery, GetUnitsFromNameSearchQueryVariables>(GetUnitsFromNameSearchDocument, options);
      }
export function useGetUnitsFromNameSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnitsFromNameSearchQuery, GetUnitsFromNameSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnitsFromNameSearchQuery, GetUnitsFromNameSearchQueryVariables>(GetUnitsFromNameSearchDocument, options);
        }
export type GetUnitsFromNameSearchQueryHookResult = ReturnType<typeof useGetUnitsFromNameSearchQuery>;
export type GetUnitsFromNameSearchLazyQueryHookResult = ReturnType<typeof useGetUnitsFromNameSearchLazyQuery>;
export type GetUnitsFromNameSearchQueryResult = Apollo.QueryResult<GetUnitsFromNameSearchQuery, GetUnitsFromNameSearchQueryVariables>;
export const SearchIngestionSubjectsDocument = gql`
    query searchIngestionSubjects($input: SearchIngestionSubjectsInput!) {
  searchIngestionSubjects(input: $input) {
    SubjectUnitIdentifier {
      idSubject
      SubjectName
      UnitAbbreviation
      IdentifierPublic
      IdentifierCollection
    }
  }
}
    `;

/**
 * __useSearchIngestionSubjectsQuery__
 *
 * To run a query within a React component, call `useSearchIngestionSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchIngestionSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchIngestionSubjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchIngestionSubjectsQuery(baseOptions: Apollo.QueryHookOptions<SearchIngestionSubjectsQuery, SearchIngestionSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchIngestionSubjectsQuery, SearchIngestionSubjectsQueryVariables>(SearchIngestionSubjectsDocument, options);
      }
export function useSearchIngestionSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchIngestionSubjectsQuery, SearchIngestionSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchIngestionSubjectsQuery, SearchIngestionSubjectsQueryVariables>(SearchIngestionSubjectsDocument, options);
        }
export type SearchIngestionSubjectsQueryHookResult = ReturnType<typeof useSearchIngestionSubjectsQuery>;
export type SearchIngestionSubjectsLazyQueryHookResult = ReturnType<typeof useSearchIngestionSubjectsLazyQuery>;
export type SearchIngestionSubjectsQueryResult = Apollo.QueryResult<SearchIngestionSubjectsQuery, SearchIngestionSubjectsQueryVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers($input: GetAllUsersInput!) {
  getAllUsers(input: $input) {
    User {
      idUser
      Active
      DateActivated
      EmailAddress
      Name
      SecurityID
      DateDisabled
      EmailSettings
      WorkflowNotificationTime
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  getCurrentUser {
    User {
      idUser
      Name
      Active
      DateActivated
      DateDisabled
      EmailAddress
      EmailSettings
      SecurityID
      WorkflowNotificationTime
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserDocument = gql`
    query getUser($input: GetUserInput!) {
  getUser(input: $input) {
    User {
      idUser
      Name
      Active
      DateActivated
      DateDisabled
      EmailSettings
      EmailAddress
      WorkflowNotificationTime
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetVocabularyDocument = gql`
    query getVocabulary($input: GetVocabularyInput!) {
  getVocabulary(input: $input) {
    Vocabulary {
      idVocabulary
    }
  }
}
    `;

/**
 * __useGetVocabularyQuery__
 *
 * To run a query within a React component, call `useGetVocabularyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVocabularyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVocabularyQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetVocabularyQuery(baseOptions: Apollo.QueryHookOptions<GetVocabularyQuery, GetVocabularyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVocabularyQuery, GetVocabularyQueryVariables>(GetVocabularyDocument, options);
      }
export function useGetVocabularyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVocabularyQuery, GetVocabularyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVocabularyQuery, GetVocabularyQueryVariables>(GetVocabularyDocument, options);
        }
export type GetVocabularyQueryHookResult = ReturnType<typeof useGetVocabularyQuery>;
export type GetVocabularyLazyQueryHookResult = ReturnType<typeof useGetVocabularyLazyQuery>;
export type GetVocabularyQueryResult = Apollo.QueryResult<GetVocabularyQuery, GetVocabularyQueryVariables>;
export const GetVocabularyEntriesDocument = gql`
    query getVocabularyEntries($input: GetVocabularyEntriesInput!) {
  getVocabularyEntries(input: $input) {
    VocabularyEntries {
      eVocabSetID
      Vocabulary {
        idVocabulary
        Term
        eVocabID
      }
    }
  }
}
    `;

/**
 * __useGetVocabularyEntriesQuery__
 *
 * To run a query within a React component, call `useGetVocabularyEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVocabularyEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVocabularyEntriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetVocabularyEntriesQuery(baseOptions: Apollo.QueryHookOptions<GetVocabularyEntriesQuery, GetVocabularyEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVocabularyEntriesQuery, GetVocabularyEntriesQueryVariables>(GetVocabularyEntriesDocument, options);
      }
export function useGetVocabularyEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVocabularyEntriesQuery, GetVocabularyEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVocabularyEntriesQuery, GetVocabularyEntriesQueryVariables>(GetVocabularyEntriesDocument, options);
        }
export type GetVocabularyEntriesQueryHookResult = ReturnType<typeof useGetVocabularyEntriesQuery>;
export type GetVocabularyEntriesLazyQueryHookResult = ReturnType<typeof useGetVocabularyEntriesLazyQuery>;
export type GetVocabularyEntriesQueryResult = Apollo.QueryResult<GetVocabularyEntriesQuery, GetVocabularyEntriesQueryVariables>;
export const GetWorkflowDocument = gql`
    query getWorkflow($input: GetWorkflowInput!) {
  getWorkflow(input: $input) {
    Workflow {
      idWorkflow
    }
  }
}
    `;

/**
 * __useGetWorkflowQuery__
 *
 * To run a query within a React component, call `useGetWorkflowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkflowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkflowQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetWorkflowQuery(baseOptions: Apollo.QueryHookOptions<GetWorkflowQuery, GetWorkflowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, options);
      }
export function useGetWorkflowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkflowQuery, GetWorkflowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, options);
        }
export type GetWorkflowQueryHookResult = ReturnType<typeof useGetWorkflowQuery>;
export type GetWorkflowLazyQueryHookResult = ReturnType<typeof useGetWorkflowLazyQuery>;
export type GetWorkflowQueryResult = Apollo.QueryResult<GetWorkflowQuery, GetWorkflowQueryVariables>;
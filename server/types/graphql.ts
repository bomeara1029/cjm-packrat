export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  JSON: any;
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
  getEdanUnitsNamed: GetEdanUnitsNamedResult;
  getFilterViewData: GetFilterViewDataResult;
  getIngestionItemsForSubjects: GetIngestionItemsForSubjectsResult;
  getIngestionProjectsForSubjects: GetIngestionProjectsForSubjectsResult;
  getIntermediaryFile: GetIntermediaryFileResult;
  getItem: GetItemResult;
  getItemsForSubject: GetItemsForSubjectResult;
  getLicense: GetLicenseResult;
  getLicenseList: GetLicenseListResult;
  getModel: GetModelResult;
  getModelConstellation: GetModelConstellationResult;
  getModelConstellationForAssetVersion: GetModelConstellationForAssetVersionResult;
  getObjectChildren: GetObjectChildrenResult;
  getObjectsForItem: GetObjectsForItemResult;
  getProject: GetProjectResult;
  getProjectDocumentation: GetProjectDocumentationResult;
  getProjectList: GetProjectListResult;
  getScene: GetSceneResult;
  getSceneForAssetVersion: GetSceneForAssetVersionResult;
  getSourceObjectIdentifer: GetSourceObjectIdentiferResult;
  getSubject: GetSubjectResult;
  getSubjectList: GetSubjectListResult;
  getSubjectsForUnit: GetSubjectsForUnitResult;
  getSystemObjectDetails: GetSystemObjectDetailsResult;
  getUnit: GetUnitResult;
  getUnitsFromEdanAbbreviation: GetUnitsFromEdanAbbreviationResult;
  getUnitsFromNameSearch: GetUnitsFromNameSearchResult;
  getUploadedAssetVersion: GetUploadedAssetVersionResult;
  getUser: GetUserResult;
  getVersionsForAsset: GetVersionsForAssetResult;
  getVocabulary: GetVocabularyResult;
  getVocabularyEntries: GetVocabularyEntriesResult;
  getWorkflow: GetWorkflowResult;
  getWorkflowList: GetWorkflowListResult;
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


export type QueryGetLicenseListArgs = {
  input: GetLicenseListInput;
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


export type QueryGetSceneForAssetVersionArgs = {
  input: GetSceneForAssetVersionInput;
};


export type QueryGetSourceObjectIdentiferArgs = {
  input: GetSourceObjectIdentiferInput;
};


export type QueryGetSubjectArgs = {
  input: GetSubjectInput;
};


export type QueryGetSubjectListArgs = {
  input: GetSubjectListInput;
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


export type QueryGetUnitsFromEdanAbbreviationArgs = {
  input: GetUnitsFromEdanAbbreviationInput;
};


export type QueryGetUnitsFromNameSearchArgs = {
  input: GetUnitsFromNameSearchInput;
};


export type QueryGetUserArgs = {
  input: GetUserInput;
};


export type QueryGetVersionsForAssetArgs = {
  input: GetVersionsForAssetInput;
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


export type QueryGetWorkflowListArgs = {
  input: GetWorkflowListInput;
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
  assignLicense: AssignLicenseResult;
  clearLicenseAssignment: ClearLicenseAssignmentResult;
  createCaptureData: CreateCaptureDataResult;
  createCaptureDataPhoto: CreateCaptureDataPhotoResult;
  createGeoLocation: CreateGeoLocationResult;
  createItem: CreateItemResult;
  createLicense: CreateLicenseResult;
  createProject: CreateProjectResult;
  createScene: CreateSceneResult;
  createSubject: CreateSubjectResult;
  createSubjectWithIdentifiers: CreateSubjectWithIdentifiersResult;
  createUnit: CreateUnitResult;
  createUser: CreateUserResult;
  createVocabulary: CreateVocabularyResult;
  createVocabularySet: CreateVocabularySetResult;
  deleteIdentifier: DeleteIdentifierResult;
  deleteMetadata: DeleteMetadataResult;
  deleteObjectConnection: DeleteObjectConnectionResult;
  discardUploadedAssetVersions: DiscardUploadedAssetVersionsResult;
  ingestData: IngestDataResult;
  publish: PublishResult;
  rollbackSystemObjectVersion: RollbackSystemObjectVersionResult;
  updateDerivedObjects: UpdateDerivedObjectsResult;
  updateLicense: CreateLicenseResult;
  updateObjectDetails: UpdateObjectDetailsResult;
  updateSourceObjects: UpdateSourceObjectsResult;
  updateUser: CreateUserResult;
  uploadAsset: UploadAssetResult;
};


export type MutationAssignLicenseArgs = {
  input: AssignLicenseInput;
};


export type MutationClearLicenseAssignmentArgs = {
  input: ClearLicenseAssignmentInput;
};


export type MutationCreateCaptureDataArgs = {
  input: CreateCaptureDataInput;
};


export type MutationCreateCaptureDataPhotoArgs = {
  input: CreateCaptureDataPhotoInput;
};


export type MutationCreateGeoLocationArgs = {
  input: CreateGeoLocationInput;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationCreateLicenseArgs = {
  input: CreateLicenseInput;
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


export type MutationCreateSubjectWithIdentifiersArgs = {
  input: CreateSubjectWithIdentifiersInput;
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


export type MutationDeleteIdentifierArgs = {
  input: DeleteIdentifierInput;
};


export type MutationDeleteMetadataArgs = {
  input: DeleteMetadataInput;
};


export type MutationDeleteObjectConnectionArgs = {
  input: DeleteObjectConnectionInput;
};


export type MutationDiscardUploadedAssetVersionsArgs = {
  input: DiscardUploadedAssetVersionsInput;
};


export type MutationIngestDataArgs = {
  input: IngestDataInput;
};


export type MutationPublishArgs = {
  input: PublishInput;
};


export type MutationRollbackSystemObjectVersionArgs = {
  input: RollbackSystemObjectVersionInput;
};


export type MutationUpdateDerivedObjectsArgs = {
  input: UpdateDerivedObjectsInput;
};


export type MutationUpdateLicenseArgs = {
  input: UpdateLicenseInput;
};


export type MutationUpdateObjectDetailsArgs = {
  input: UpdateObjectDetailsInput;
};


export type MutationUpdateSourceObjectsArgs = {
  input: UpdateSourceObjectsInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUploadAssetArgs = {
  file: Scalars['Upload'];
  type: Scalars['Int'];
  idAsset?: Maybe<Scalars['Int']>;
  idSOAttachment?: Maybe<Scalars['Int']>;
};

export type UploadAssetInput = {
  __typename?: 'UploadAssetInput';
  file: Scalars['Upload'];
  type: Scalars['Int'];
  idAsset?: Maybe<Scalars['Int']>;
  idSOAttachment?: Maybe<Scalars['Int']>;
};

export enum UploadStatus {
  Complete = 'COMPLETE',
  Failed = 'FAILED',
  Noauth = 'NOAUTH'
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
  idIdentifier: Scalars['Int'];
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
  sourceObjects: Array<RelatedObject>;
  derivedObjects: Array<RelatedObject>;
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
  creationMethod: Scalars['Int'];
  modality: Scalars['Int'];
  purpose: Scalars['Int'];
  units: Scalars['Int'];
  dateCaptured: Scalars['String'];
  modelFileType: Scalars['Int'];
  directory: Scalars['String'];
  identifiers: Array<IngestIdentifier>;
  sourceObjects: Array<RelatedObject>;
  derivedObjects: Array<RelatedObject>;
};

export enum ReferenceModelAction {
  Update = 'Update',
  Ingest = 'Ingest'
}

export type ReferenceModel = {
  __typename?: 'ReferenceModel';
  idSystemObject: Scalars['Int'];
  name: Scalars['String'];
  usage: Scalars['String'];
  quality: Scalars['String'];
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
  name: Scalars['String'];
  approvedForPublication: Scalars['Boolean'];
  posedAndQCd: Scalars['Boolean'];
  directory: Scalars['String'];
  identifiers: Array<IngestIdentifier>;
  referenceModels: Array<ReferenceModel>;
  sourceObjects: Array<RelatedObject>;
  derivedObjects: Array<RelatedObject>;
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

export type UpdatePhotogrammetryMetadata = {
  __typename?: 'UpdatePhotogrammetryMetadata';
  name: Scalars['String'];
  dateCaptured: Scalars['String'];
  datasetType: Scalars['Int'];
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
  folders: Array<IngestFolder>;
};

export type UpdateModelMetadata = {
  __typename?: 'UpdateModelMetadata';
  name: Scalars['String'];
  creationMethod: Scalars['Int'];
  modality: Scalars['Int'];
  purpose: Scalars['Int'];
  units: Scalars['Int'];
  dateCaptured: Scalars['String'];
  modelFileType: Scalars['Int'];
};

export type UpdateSceneMetadata = {
  __typename?: 'UpdateSceneMetadata';
  name: Scalars['String'];
  approvedForPublication: Scalars['Boolean'];
  posedAndQCd: Scalars['Boolean'];
  referenceModels?: Maybe<Array<ReferenceModel>>;
};

export type UpdatedAssetVersionMetadata = {
  __typename?: 'UpdatedAssetVersionMetadata';
  idAssetVersion: Scalars['Int'];
  CaptureDataPhoto?: Maybe<UpdatePhotogrammetryMetadata>;
  Model?: Maybe<UpdateModelMetadata>;
  Scene?: Maybe<UpdateSceneMetadata>;
};

export type GetUploadedAssetVersionResult = {
  __typename?: 'GetUploadedAssetVersionResult';
  AssetVersion: Array<AssetVersion>;
  idAssetVersionsUpdated: Array<Scalars['Int']>;
  UpdatedAssetVersionMetadata: Array<UpdatedAssetVersionMetadata>;
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

export type GetSceneForAssetVersionInput = {
  idAssetVersion: Scalars['Int'];
  directory?: Maybe<Scalars['String']>;
};

export type GetSceneForAssetVersionResult = {
  __typename?: 'GetSceneForAssetVersionResult';
  idAssetVersion: Scalars['Int'];
  SceneConstellation?: Maybe<SceneConstellation>;
};


export type Asset = {
  __typename?: 'Asset';
  idAsset: Scalars['Int'];
  FileName: Scalars['String'];
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
  idSOAttachment?: Maybe<Scalars['Int']>;
  FilePath: Scalars['String'];
  Asset?: Maybe<Asset>;
  User?: Maybe<User>;
  SystemObject?: Maybe<SystemObject>;
  SOAttachment?: Maybe<SystemObject>;
  SOAttachmentObjectType?: Maybe<Scalars['Int']>;
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
  idIdentifier: Scalars['Int'];
};

export type IngestFolderInput = {
  name: Scalars['String'];
  variantType: Scalars['Int'];
};

export type IngestPhotogrammetryInput = {
  idAssetVersion: Scalars['Int'];
  idAsset?: Maybe<Scalars['Int']>;
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
  sourceObjects: Array<RelatedObjectInput>;
  derivedObjects: Array<RelatedObjectInput>;
  updateNotes?: Maybe<Scalars['String']>;
};

export type RelatedObjectInput = {
  idSystemObject: Scalars['Int'];
  name: Scalars['String'];
  identifier?: Maybe<Scalars['String']>;
  objectType: Scalars['Int'];
};

export type IngestModelInput = {
  idAssetVersion: Scalars['Int'];
  idAsset?: Maybe<Scalars['Int']>;
  systemCreated: Scalars['Boolean'];
  name: Scalars['String'];
  creationMethod: Scalars['Int'];
  modality: Scalars['Int'];
  purpose: Scalars['Int'];
  units: Scalars['Int'];
  dateCreated: Scalars['String'];
  modelFileType: Scalars['Int'];
  directory: Scalars['String'];
  identifiers: Array<IngestIdentifierInput>;
  sourceObjects: Array<RelatedObjectInput>;
  derivedObjects: Array<RelatedObjectInput>;
  updateNotes?: Maybe<Scalars['String']>;
};

export type IngestSceneInput = {
  idAssetVersion: Scalars['Int'];
  idAsset?: Maybe<Scalars['Int']>;
  systemCreated: Scalars['Boolean'];
  name: Scalars['String'];
  approvedForPublication: Scalars['Boolean'];
  posedAndQCd: Scalars['Boolean'];
  directory: Scalars['String'];
  identifiers: Array<IngestIdentifierInput>;
  sourceObjects: Array<RelatedObjectInput>;
  derivedObjects: Array<RelatedObjectInput>;
  updateNotes?: Maybe<Scalars['String']>;
};

export type IngestOtherInput = {
  idAssetVersion: Scalars['Int'];
  idAsset?: Maybe<Scalars['Int']>;
  systemCreated: Scalars['Boolean'];
  identifiers: Array<IngestIdentifierInput>;
  updateNotes?: Maybe<Scalars['String']>;
};

export type IngestSceneAttachmentInput = {
  type?: Maybe<Scalars['Int']>;
  category?: Maybe<Scalars['Int']>;
  units?: Maybe<Scalars['Int']>;
  modelType?: Maybe<Scalars['Int']>;
  fileType?: Maybe<Scalars['Int']>;
  gltfStandardized?: Maybe<Scalars['Boolean']>;
  dracoCompressed?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
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
  sceneAttachment: Array<IngestSceneAttachmentInput>;
};

export type IngestDataResult = {
  __typename?: 'IngestDataResult';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type AreCameraSettingsUniformInput = {
  idAssetVersion: Scalars['Int'];
};

export type AreCameraSettingsUniformResult = {
  __typename?: 'AreCameraSettingsUniformResult';
  isUniform: Scalars['Boolean'];
};

export type CreateLicenseInput = {
  Name: Scalars['String'];
  Description: Scalars['String'];
  RestrictLevel: Scalars['Int'];
};

export type CreateLicenseResult = {
  __typename?: 'CreateLicenseResult';
  License?: Maybe<License>;
};

export type UpdateLicenseInput = {
  idLicense: Scalars['Int'];
  Name: Scalars['String'];
  Description: Scalars['String'];
  RestrictLevel: Scalars['Int'];
};

export type ClearLicenseAssignmentInput = {
  idSystemObject: Scalars['Int'];
  clearAll?: Maybe<Scalars['Boolean']>;
};

export type ClearLicenseAssignmentResult = {
  __typename?: 'ClearLicenseAssignmentResult';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type AssignLicenseInput = {
  idSystemObject: Scalars['Int'];
  idLicense: Scalars['Int'];
};

export type AssignLicenseResult = {
  __typename?: 'AssignLicenseResult';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GetLicenseInput = {
  idLicense: Scalars['Int'];
};

export type GetLicenseResult = {
  __typename?: 'GetLicenseResult';
  License?: Maybe<License>;
};

export type GetLicenseListInput = {
  search?: Maybe<Scalars['String']>;
};

export type GetLicenseListResult = {
  __typename?: 'GetLicenseListResult';
  Licenses: Array<License>;
};

export type License = {
  __typename?: 'License';
  idLicense: Scalars['Int'];
  Description: Scalars['String'];
  Name: Scalars['String'];
  RestrictLevel: Scalars['Int'];
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
  idVCreationMethod?: Maybe<Scalars['Int']>;
  idVModality?: Maybe<Scalars['Int']>;
  idVPurpose?: Maybe<Scalars['Int']>;
  idVUnits?: Maybe<Scalars['Int']>;
  idVFileType?: Maybe<Scalars['Int']>;
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
  IsDracoCompressed?: Maybe<Scalars['Boolean']>;
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
  Name?: Maybe<Scalars['String']>;
  Usage?: Maybe<Scalars['String']>;
  Quality?: Maybe<Scalars['String']>;
  FileSize?: Maybe<Scalars['BigInt']>;
  UVResolution?: Maybe<Scalars['Int']>;
  BoundingBoxP1X?: Maybe<Scalars['Float']>;
  BoundingBoxP1Y?: Maybe<Scalars['Float']>;
  BoundingBoxP1Z?: Maybe<Scalars['Float']>;
  BoundingBoxP2X?: Maybe<Scalars['Float']>;
  BoundingBoxP2Y?: Maybe<Scalars['Float']>;
  BoundingBoxP2Z?: Maybe<Scalars['Float']>;
  TS0?: Maybe<Scalars['Float']>;
  TS1?: Maybe<Scalars['Float']>;
  TS2?: Maybe<Scalars['Float']>;
  R0?: Maybe<Scalars['Float']>;
  R1?: Maybe<Scalars['Float']>;
  R2?: Maybe<Scalars['Float']>;
  R3?: Maybe<Scalars['Float']>;
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
  dateCreatedFrom?: Maybe<Scalars['DateTime']>;
  dateCreatedTo?: Maybe<Scalars['DateTime']>;
  rows: Scalars['Int'];
  cursorMark: Scalars['String'];
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
  error?: Maybe<Scalars['String']>;
  entries: Array<NavigationResultEntry>;
  metadataColumns: Array<Scalars['Int']>;
  cursorMark?: Maybe<Scalars['String']>;
};

export type GetFilterViewDataResult = {
  __typename?: 'GetFilterViewDataResult';
  units: Array<Unit>;
  projects: Array<Project>;
};

export type CreateSceneInput = {
  Name: Scalars['String'];
  idAssetThumbnail?: Maybe<Scalars['Int']>;
  CountScene?: Maybe<Scalars['Int']>;
  CountNode?: Maybe<Scalars['Int']>;
  CountCamera?: Maybe<Scalars['Int']>;
  CountLight?: Maybe<Scalars['Int']>;
  CountModel?: Maybe<Scalars['Int']>;
  CountMeta?: Maybe<Scalars['Int']>;
  CountSetup?: Maybe<Scalars['Int']>;
  CountTour?: Maybe<Scalars['Int']>;
  EdanUUID?: Maybe<Scalars['String']>;
  ApprovedForPublication: Scalars['Boolean'];
  PosedAndQCd: Scalars['Boolean'];
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
  idAssetThumbnail?: Maybe<Scalars['Int']>;
  Name: Scalars['String'];
  CountScene?: Maybe<Scalars['Int']>;
  CountNode?: Maybe<Scalars['Int']>;
  CountCamera?: Maybe<Scalars['Int']>;
  CountLight?: Maybe<Scalars['Int']>;
  CountModel?: Maybe<Scalars['Int']>;
  CountMeta?: Maybe<Scalars['Int']>;
  CountSetup?: Maybe<Scalars['Int']>;
  CountTour?: Maybe<Scalars['Int']>;
  EdanUUID?: Maybe<Scalars['String']>;
  ApprovedForPublication: Scalars['Boolean'];
  PosedAndQCd: Scalars['Boolean'];
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

export type SceneConstellation = {
  __typename?: 'SceneConstellation';
  Scene?: Maybe<Scene>;
  ModelSceneXref?: Maybe<Array<Maybe<ModelSceneXref>>>;
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
  idIdentifierPreferred?: Maybe<Scalars['Int']>;
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
  isValidData?: Maybe<Scalars['Boolean']>;
};

export type ModelDetailFieldsInput = {
  Name?: Maybe<Scalars['String']>;
  CreationMethod?: Maybe<Scalars['Int']>;
  Modality?: Maybe<Scalars['Int']>;
  Purpose?: Maybe<Scalars['Int']>;
  Units?: Maybe<Scalars['Int']>;
  DateCaptured?: Maybe<Scalars['DateTime']>;
  ModelFileType?: Maybe<Scalars['Int']>;
};

export type SceneDetailFieldsInput = {
  AssetType?: Maybe<Scalars['Int']>;
  Tours?: Maybe<Scalars['Int']>;
  Annotation?: Maybe<Scalars['Int']>;
  ApprovedForPublication?: Maybe<Scalars['Boolean']>;
  PosedAndQCd?: Maybe<Scalars['Boolean']>;
};

export type ProjectDocumentationDetailFieldsInput = {
  Description?: Maybe<Scalars['String']>;
};

export type AssetDetailFieldsInput = {
  AssetType?: Maybe<Scalars['Int']>;
};

export type AssetVersionDetailFieldsInput = {
  FilePath?: Maybe<Scalars['String']>;
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

export type MetadataInput = {
  idMetadata?: Maybe<Scalars['Int']>;
  Name: Scalars['String'];
  Label: Scalars['String'];
  Value: Scalars['String'];
};

export type UpdateObjectDetailsDataInput = {
  Name?: Maybe<Scalars['String']>;
  Retired?: Maybe<Scalars['Boolean']>;
  License?: Maybe<Scalars['Int']>;
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
  Metadata?: Maybe<Array<MetadataInput>>;
  Identifiers?: Maybe<Array<UpdateIdentifier>>;
};

export type UpdateObjectDetailsResult = {
  __typename?: 'UpdateObjectDetailsResult';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type ExistingRelationship = {
  idSystemObject: Scalars['Int'];
  objectType: Scalars['Int'];
};

export type UpdateDerivedObjectsInput = {
  idSystemObject: Scalars['Int'];
  ParentObjectType: Scalars['Int'];
  Derivatives: Array<ExistingRelationship>;
  PreviouslySelected: Array<ExistingRelationship>;
};

export type UpdateDerivedObjectsResult = {
  __typename?: 'UpdateDerivedObjectsResult';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type UpdateSourceObjectsInput = {
  idSystemObject: Scalars['Int'];
  ChildObjectType: Scalars['Int'];
  Sources: Array<ExistingRelationship>;
  PreviouslySelected: Array<ExistingRelationship>;
};

export type UpdateSourceObjectsResult = {
  __typename?: 'UpdateSourceObjectsResult';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type UpdateIdentifier = {
  id: Scalars['Int'];
  identifier: Scalars['String'];
  identifierType: Scalars['Int'];
  idSystemObject: Scalars['Int'];
  idIdentifier: Scalars['Int'];
  preferred?: Maybe<Scalars['Boolean']>;
};

export type DeleteObjectConnectionResult = {
  __typename?: 'DeleteObjectConnectionResult';
  success: Scalars['Boolean'];
  details: Scalars['String'];
};

export type DeleteObjectConnectionInput = {
  idSystemObjectMaster: Scalars['Int'];
  objectTypeMaster: Scalars['Int'];
  idSystemObjectDerived: Scalars['Int'];
  objectTypeDerived: Scalars['Int'];
};

export type DeleteIdentifierResult = {
  __typename?: 'DeleteIdentifierResult';
  success: Scalars['Boolean'];
};

export type DeleteIdentifierInput = {
  idIdentifier: Scalars['Int'];
};

export type DeleteMetadataResult = {
  __typename?: 'DeleteMetadataResult';
  success: Scalars['Boolean'];
};

export type DeleteMetadataInput = {
  idMetadata: Scalars['Int'];
};

export type RollbackSystemObjectVersionResult = {
  __typename?: 'RollbackSystemObjectVersionResult';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type RollbackSystemObjectVersionInput = {
  idSystemObjectVersion: Scalars['Int'];
  rollbackNotes: Scalars['String'];
};

export type CreateSubjectWithIdentifiersResult = {
  __typename?: 'CreateSubjectWithIdentifiersResult';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type CreateSubjectWithIdentifiersInput = {
  identifiers: Array<CreateIdentifierInput>;
  subject: CreateSubjectInput;
  systemCreated: Scalars['Boolean'];
  metadata?: Maybe<Array<MetadataInput>>;
};

export type CreateIdentifierInput = {
  identifierValue: Scalars['String'];
  identifierType: Scalars['Int'];
  idSystemObject?: Maybe<Scalars['Int']>;
  preferred?: Maybe<Scalars['Boolean']>;
};

export type PublishInput = {
  idSystemObject: Scalars['Int'];
  eState: Scalars['Int'];
};

export type PublishResult = {
  __typename?: 'PublishResult';
  success: Scalars['Boolean'];
  eState?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
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
  idIdentifierPreferred?: Maybe<Scalars['Int']>;
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
  isValidData?: Maybe<Scalars['Boolean']>;
};

export type SceneDetailFields = {
  __typename?: 'SceneDetailFields';
  Links: Array<Scalars['String']>;
  AssetType?: Maybe<Scalars['Int']>;
  Tours?: Maybe<Scalars['Int']>;
  Annotation?: Maybe<Scalars['Int']>;
  CountScene?: Maybe<Scalars['Int']>;
  CountNode?: Maybe<Scalars['Int']>;
  CountCamera?: Maybe<Scalars['Int']>;
  CountLight?: Maybe<Scalars['Int']>;
  CountModel?: Maybe<Scalars['Int']>;
  CountMeta?: Maybe<Scalars['Int']>;
  CountSetup?: Maybe<Scalars['Int']>;
  CountTour?: Maybe<Scalars['Int']>;
  EdanUUID?: Maybe<Scalars['String']>;
  ApprovedForPublication?: Maybe<Scalars['Boolean']>;
  PublicationApprover?: Maybe<Scalars['String']>;
  PosedAndQCd?: Maybe<Scalars['Boolean']>;
  idScene?: Maybe<Scalars['Int']>;
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
  AssetType?: Maybe<Scalars['Int']>;
  Asset?: Maybe<Asset>;
  idAsset?: Maybe<Scalars['Int']>;
};

export type AssetVersionDetailFields = {
  __typename?: 'AssetVersionDetailFields';
  FilePath?: Maybe<Scalars['String']>;
  Creator?: Maybe<Scalars['String']>;
  DateCreated?: Maybe<Scalars['DateTime']>;
  Ingested?: Maybe<Scalars['Boolean']>;
  Version?: Maybe<Scalars['Int']>;
  StorageSize?: Maybe<Scalars['BigInt']>;
  AssetVersion?: Maybe<AssetVersion>;
  idAsset?: Maybe<Scalars['Int']>;
  idAssetVersion?: Maybe<Scalars['Int']>;
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
  idSystemObject: Scalars['Int'];
  idObject: Scalars['Int'];
  name: Scalars['String'];
  retired: Scalars['Boolean'];
  objectType: Scalars['Int'];
  allowed: Scalars['Boolean'];
  publishedState: Scalars['String'];
  publishedEnum: Scalars['Int'];
  publishable: Scalars['Boolean'];
  thumbnail?: Maybe<Scalars['String']>;
  identifiers: Array<IngestIdentifier>;
  objectAncestors: Array<Array<RepositoryPath>>;
  sourceObjects: Array<RelatedObject>;
  derivedObjects: Array<RelatedObject>;
  objectVersions: Array<SystemObjectVersion>;
  metadata: Array<Metadata>;
  unit?: Maybe<RepositoryPath>;
  project?: Maybe<RepositoryPath>;
  subject?: Maybe<RepositoryPath>;
  item?: Maybe<RepositoryPath>;
  asset?: Maybe<RepositoryPath>;
  assetOwner?: Maybe<RepositoryPath>;
  license?: Maybe<License>;
  licenseInheritance?: Maybe<Scalars['Int']>;
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

export type ColumnDefinition = {
  __typename?: 'ColumnDefinition';
  colName: Scalars['String'];
  colLabel: Scalars['String'];
  colDisplay: Scalars['Boolean'];
  colType: Scalars['Int'];
  colAlign: Scalars['String'];
};

export type GetAssetDetailsForSystemObjectInput = {
  idSystemObject: Scalars['Int'];
};

export type GetAssetDetailsForSystemObjectResult = {
  __typename?: 'GetAssetDetailsForSystemObjectResult';
  columns: Array<ColumnDefinition>;
  assetDetailRows: Array<Scalars['JSON']>;
};

export type DetailVersion = {
  __typename?: 'DetailVersion';
  idSystemObject: Scalars['Int'];
  idAssetVersion: Scalars['Int'];
  version: Scalars['Int'];
  name: Scalars['String'];
  creator: Scalars['String'];
  dateCreated: Scalars['DateTime'];
  size: Scalars['BigInt'];
  ingested: Scalars['Boolean'];
};

export type GetVersionsForAssetInput = {
  idSystemObject: Scalars['Int'];
};

export type GetVersionsForAssetResult = {
  __typename?: 'GetVersionsForAssetResult';
  versions: Array<DetailVersion>;
};

export type GetProjectListResult = {
  __typename?: 'GetProjectListResult';
  projects: Array<Project>;
};

export type GetProjectListInput = {
  search: Scalars['String'];
};

export type GetSubjectListResult = {
  __typename?: 'GetSubjectListResult';
  subjects: Array<SubjectUnitIdentifier>;
};

export type GetSubjectListInput = {
  search: Scalars['String'];
  idUnit?: Maybe<Scalars['Int']>;
  pageNumber?: Maybe<Scalars['Int']>;
  rowCount?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['Int']>;
  sortOrder?: Maybe<Scalars['Boolean']>;
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
  DateCreated: Scalars['DateTime'];
  Comment?: Maybe<Scalars['String']>;
  SystemObject?: Maybe<SystemObject>;
  CommentLink?: Maybe<Scalars['String']>;
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
  ValueShort?: Maybe<Scalars['String']>;
  ValueExtended?: Maybe<Scalars['String']>;
  idAssetVersionValue?: Maybe<Scalars['Int']>;
  idUser?: Maybe<Scalars['Int']>;
  idVMetadataSource?: Maybe<Scalars['Int']>;
  idSystemObject?: Maybe<Scalars['Int']>;
  idSystemObjectParent?: Maybe<Scalars['Int']>;
  AssetVersionValue?: Maybe<AssetVersion>;
  SystemObject?: Maybe<SystemObject>;
  SystemObjectParent?: Maybe<SystemObject>;
  User?: Maybe<User>;
  VMetadataSource?: Maybe<Vocabulary>;
  Label?: Maybe<Scalars['String']>;
  Value?: Maybe<Scalars['String']>;
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
  Unit: Scalars['Int'];
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

export type CreateGeoLocationInput = {
  Latitude?: Maybe<Scalars['Int']>;
  Longitude?: Maybe<Scalars['Int']>;
  Altitude?: Maybe<Scalars['Int']>;
  TS0?: Maybe<Scalars['Int']>;
  TS1?: Maybe<Scalars['Int']>;
  TS2?: Maybe<Scalars['Int']>;
  R0?: Maybe<Scalars['Int']>;
  R1?: Maybe<Scalars['Int']>;
  R2?: Maybe<Scalars['Int']>;
  R3?: Maybe<Scalars['Int']>;
};

export type CreateGeoLocationResult = {
  __typename?: 'CreateGeoLocationResult';
  GeoLocation?: Maybe<GeoLocation>;
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
  idSystemObject: Scalars['Int'];
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
  EdanOnly?: Maybe<Scalars['Boolean']>;
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
  Default: Scalars['Boolean'];
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

export type GetUnitsFromEdanAbbreviationResult = {
  __typename?: 'GetUnitsFromEdanAbbreviationResult';
  Units: Array<Unit>;
};

export type GetUnitsFromEdanAbbreviationInput = {
  abbreviation: Scalars['String'];
};

export type GetEdanUnitsNamedResult = {
  __typename?: 'GetEdanUnitsNamedResult';
  UnitEdan?: Maybe<Array<UnitEdan>>;
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

export type UnitEdan = {
  __typename?: 'UnitEdan';
  idUnitEdan: Scalars['Int'];
  idUnit?: Maybe<Scalars['Int']>;
  Name?: Maybe<Scalars['String']>;
  Abbreviation: Scalars['String'];
  Unit?: Maybe<Unit>;
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

export type GetWorkflowListInput = {
  idVWorkflowType?: Maybe<Array<Scalars['Int']>>;
  idVJobType?: Maybe<Array<Scalars['Int']>>;
  State?: Maybe<Array<Scalars['Int']>>;
  DateFrom?: Maybe<Scalars['DateTime']>;
  DateTo?: Maybe<Scalars['DateTime']>;
  idUserInitiator?: Maybe<Array<Scalars['Int']>>;
  idUserOwner?: Maybe<Array<Scalars['Int']>>;
  pageNumber?: Maybe<Scalars['Int']>;
  rowCount?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['Int']>;
  sortOrder?: Maybe<Scalars['Boolean']>;
};

export type GetWorkflowResult = {
  __typename?: 'GetWorkflowResult';
  Workflow?: Maybe<Workflow>;
};

export type GetWorkflowListResult = {
  __typename?: 'GetWorkflowListResult';
  WorkflowList?: Maybe<Array<Maybe<WorkflowListResult>>>;
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

export type WorkflowReport = {
  __typename?: 'WorkflowReport';
  idWorkflowReport: Scalars['Int'];
  idWorkflow: Scalars['Int'];
  MimeType: Scalars['String'];
  Data: Scalars['String'];
  Workflow?: Maybe<Workflow>;
};

export type WorkflowSet = {
  __typename?: 'WorkflowSet';
  idWorkflowSet: Scalars['Int'];
  Workflow?: Maybe<Array<Maybe<Workflow>>>;
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

export type WorkflowListResult = {
  __typename?: 'WorkflowListResult';
  idWorkflow: Scalars['Int'];
  idWorkflowSet?: Maybe<Scalars['Int']>;
  idWorkflowReport?: Maybe<Scalars['Int']>;
  idJobRun?: Maybe<Scalars['Int']>;
  Type?: Maybe<Scalars['String']>;
  State?: Maybe<Scalars['String']>;
  idUserInitiator?: Maybe<Scalars['Int']>;
  idOwner?: Maybe<Scalars['Int']>;
  DateStart?: Maybe<Scalars['DateTime']>;
  DateLast?: Maybe<Scalars['DateTime']>;
  Error?: Maybe<Scalars['String']>;
  UserInitiator?: Maybe<User>;
  Owner?: Maybe<User>;
  Workflow?: Maybe<Workflow>;
  WorkflowReport?: Maybe<WorkflowReport>;
  WorkflowSet?: Maybe<WorkflowSet>;
  JobRun?: Maybe<JobRun>;
  HyperlinkReport?: Maybe<Scalars['String']>;
  HyperlinkSet?: Maybe<Scalars['String']>;
  HyperlinkJob?: Maybe<Scalars['String']>;
};

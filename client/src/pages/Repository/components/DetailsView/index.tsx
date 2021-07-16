/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */

/**
 * DetailsView
 *
 * This component renders repository details view for the Repository UI.
 */
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { LoadingButton } from '../../../../components';
import IdentifierList from '../../../../components/shared/IdentifierList';
import { /*parseIdentifiersToState,*/ useVocabularyStore, useRepositoryStore, useIdentifierStore, useDetailTabStore, ModelDetailsType } from '../../../../store';
import {
    ActorDetailFieldsInput,
    AssetDetailFieldsInput,
    AssetVersionDetailFieldsInput,
    CaptureDataDetailFields,
    CaptureDataDetailFieldsInput,
    ItemDetailFieldsInput,
    ModelDetailFieldsInput,
    ProjectDetailFieldsInput,
    ProjectDocumentationDetailFieldsInput,
    SceneDetailFieldsInput,
    StakeholderDetailFieldsInput,
    SubjectDetailFieldsInput,
    UnitDetailFieldsInput,
    UpdateIdentifier,
    UpdateObjectDetailsDataInput
} from '../../../../types/graphql';
import { eSystemObjectType, eVocabularySetID } from '../../../../types/server';
import { withDefaultValueBoolean, withDefaultValueNumber } from '../../../../utils/shared';
import ObjectSelectModal from '../../../Ingestion/components/Metadata/Model/ObjectSelectModal';
import { updateDetailsTabData, useObjectDetails, deleteIdentifier, getDetailsTabDataForObject } from '../../hooks/useDetailsView';
import DetailsHeader from './DetailsHeader';
import DetailsTab, { UpdateDataFields } from './DetailsTab';
import DetailsThumbnail from './DetailsThumbnail';
import ObjectDetails from './ObjectDetails';
import ObjectNotFoundView from './ObjectNotFoundView';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 140px)',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        overflowY: 'scroll',
        backgroundColor: palette.primary.light,
        [breakpoints.down('lg')]: {
            maxHeight: 'calc(100vh - 120px)',
            padding: 10
        }
    },
    updateButton: {
        height: 35,
        width: 100,
        marginTop: 10,
        color: palette.background.paper,
        [breakpoints.down('lg')]: {
            height: 30
        }
    }
}));

type DetailsParams = {
    idSystemObject: string;
};

type DetailsFields = {
    name?: string;
    retired?: boolean;
    idLicense?: number;
};

function DetailsView(): React.ReactElement {
    const classes = useStyles();
    const params = useParams<DetailsParams>();
    const [modalOpen, setModalOpen] = useState(false);
    const [details, setDetails] = useState<DetailsFields>({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [detailQuery, setDetailQuery] = useState<any>({});
    const [isUpdatingData, setIsUpdatingData] = useState(false);
    const [objectRelationship, setObjectRelationship] = useState('');

    const idSystemObject: number = Number.parseInt(params.idSystemObject, 10);
    const { data, loading } = useObjectDetails(idSystemObject);
    let [updatedData, setUpdatedData] = useState<UpdateObjectDetailsDataInput>({});

    const getEntries = useVocabularyStore(state => state.getEntries);
    const [stateIdentifiers, addNewIdentifier, initializeIdentifierState, removeTargetIdentifier, updateIdentifier, checkIdentifiersBeforeUpdate] = useIdentifierStore(state => [
        state.stateIdentifiers,
        state.addNewIdentifier,
        state.initializeIdentifierState,
        state.removeTargetIdentifier,
        state.updateIdentifier,
        state.checkIdentifiersBeforeUpdate
    ]);
    const [resetRepositoryFilter, resetKeywordSearch, initializeTree] = useRepositoryStore(state => [state.resetRepositoryFilter, state.resetKeywordSearch, state.initializeTree]);
    const [initializeDetailFields, getDetail, getDetailsViewFieldErrors] = useDetailTabStore(state => [
        state.initializeDetailFields,
        state.getDetail,
        state.getDetailsViewFieldErrors
    ]);
    const objectDetailsData = data;

    useEffect(() => {
        if (data && !loading) {
            const { name, retired, license } = data.getSystemObjectDetails;
            setDetails({ name, retired, idLicense: license?.idLicense || 0 });
            initializeIdentifierState(data.getSystemObjectDetails.identifiers);
        }
    }, [data, loading, initializeIdentifierState]);

    // new function for setting state
    useEffect(() => {
        if (data) {
            const fetchDetailTabDataAndInitializeStateStore = async () => {
                const detailsTabData = await getDetailsTabDataForObject(idSystemObject, objectType);
                setDetailQuery(detailsTabData);
                initializeDetailFields(detailsTabData, objectType);
            };

            fetchDetailTabDataAndInitializeStateStore();
        }
    }, [idSystemObject, data]);

    if (!data || !params.idSystemObject) {
        return <ObjectNotFoundView loading={loading} />;
    }

    const {
        idObject,
        objectType,
        allowed,
        publishedState,
        thumbnail,
        unit,
        project,
        subject,
        item,
        objectAncestors,
        sourceObjects,
        derivedObjects,
        objectVersions,
        licenseInherited = null
    } = data.getSystemObjectDetails;

    const disabled: boolean = !allowed;

    const addIdentifer = () => {
        addNewIdentifier();
    };

    const removeIdentifier = async (idIdentifier: number, id: number) => {
        // handles deleting exisiting identifiers and newly added ones
        if (idIdentifier) {
            const confirm = window.confirm('Are you sure you wish to remove this?');
            if (!confirm) return;
            const deleteIdentifierSuccess = await deleteIdentifier(idIdentifier);
            if (deleteIdentifierSuccess) {
                removeTargetIdentifier(idIdentifier);
                toast.success('Identifier removed');
            } else {
                toast.error('Error when removing identifier');
            }
        } else {
            removeTargetIdentifier(0, id);
        }
    };

    const updateIdentifierFields = (id: number, name: string, value) => {
        updateIdentifier(id, name, value);
    };

    const onModalClose = () => {
        setModalOpen(false);
        setObjectRelationship('');
        resetRepositoryFilter();
    };

    const onAddSourceObject = () => {
        setObjectRelationship('Source');
        resetKeywordSearch();
        resetRepositoryFilter();
        initializeTree();
        setModalOpen(true);
    };

    const onAddDerivedObject = () => {
        setObjectRelationship('Derived');
        resetKeywordSearch();
        resetRepositoryFilter();
        initializeTree();
        setModalOpen(true);
    };

    const onNameUpdate = ({ target }): void => {
        const updatedDataFields: UpdateObjectDetailsDataInput = { ...updatedData };
        setDetails(details => ({ ...details, name: target.value }));
        updatedDataFields.Name = target.value;
        setUpdatedData(updatedDataFields);
    };

    const onRetiredUpdate = ({ target }): void => {
        const updatedDataFields: UpdateObjectDetailsDataInput = { ...updatedData };
        setDetails(details => ({ ...details, retired: target.checked }));
        updatedDataFields.Retired = target.checked;
        setUpdatedData(updatedDataFields);
    };

    const onLicenseUpdate = ({ target }): void => {
        const updatedDataFields: UpdateObjectDetailsDataInput = { ...updatedData };
        setDetails(details => ({ ...details, idLicense: target.value }));
        updatedDataFields.License = target.value;
        setUpdatedData(updatedDataFields);
    };

    const onUpdateDetail = (objectType: number, data: UpdateDataFields): void => {
        // console.log('onUpdateDetail', objectType, data);
        const updatedDataFields: UpdateObjectDetailsDataInput = {
            ...updatedData,
            Name: details.name,
            Retired: details.retired
        };

        switch (objectType) {
            case eSystemObjectType.eUnit:
                updatedDataFields.Unit = data as UnitDetailFieldsInput;
                break;
            case eSystemObjectType.eProject:
                updatedDataFields.Project = data as ProjectDetailFieldsInput;
                break;
            case eSystemObjectType.eSubject:
                updatedDataFields.Subject = data as SubjectDetailFieldsInput;
                break;
            case eSystemObjectType.eItem:
                updatedDataFields.Item = data as ItemDetailFieldsInput;
                break;
            case eSystemObjectType.eCaptureData:
                updatedDataFields.CaptureData = data as CaptureDataDetailFieldsInput;
                break;
            case eSystemObjectType.eModel:
                updatedDataFields.Model = data as ModelDetailFieldsInput;
                break;
            case eSystemObjectType.eScene:
                updatedDataFields.Scene = data as SceneDetailFieldsInput;
                break;
            case eSystemObjectType.eIntermediaryFile:
                break;
            case eSystemObjectType.eProjectDocumentation:
                updatedDataFields.ProjectDocumentation = data as ProjectDocumentationDetailFieldsInput;
                break;
            case eSystemObjectType.eAsset:
                updatedDataFields.Asset = data as AssetDetailFieldsInput;
                break;
            case eSystemObjectType.eAssetVersion:
                updatedDataFields.AssetVersion = data as AssetVersionDetailFieldsInput;
                break;
            case eSystemObjectType.eActor:
                updatedDataFields.Actor = data as ActorDetailFieldsInput;
                break;
            case eSystemObjectType.eStakeholder:
                updatedDataFields.Stakeholder = data as StakeholderDetailFieldsInput;
                break;
            default:
                break;
        }

        setUpdatedData(updatedDataFields);
    };

    const updateData = async (): Promise<void> => {
        toast.dismiss();
        setIsUpdatingData(true);
        const identifierCheck = checkIdentifiersBeforeUpdate();
        if (identifierCheck.length) {
            identifierCheck.forEach(error => toast.error(error));
            setIsUpdatingData(false);
            return;
        }

        // Create another validation here to make sure that the appropriate SO types are being checked
        const errors = getDetailsViewFieldErrors(updatedData, objectType);
        if (errors.length) {
            errors.forEach(error => toast.error(`Please input a valid ${error}`, { autoClose: false }));
            setIsUpdatingData(false);
            return;
        }

        try {
            // TODO: Model, Scene, and CD are currently updating in a way that
            // requires the fields to be populated.
            if (objectType === eSystemObjectType.eModel) {
                const ModelDetails = getDetail(objectType) as ModelDetailsType;
                const { DateCaptured, idVCreationMethod, idVModality, idVPurpose, idVUnits, idVFileType } = ModelDetails;

                updatedData.Model = {
                    Name: updatedData?.Name,
                    CreationMethod: idVCreationMethod,
                    Modality: idVModality,
                    Purpose: idVPurpose,
                    Units: idVUnits,
                    ModelFileType: idVFileType,
                    DateCaptured
                };
            }

            if (objectType === eSystemObjectType.eScene && updatedData.Scene) {
                const { IsOriented, HasBeenQCd } = updatedData.Scene;
                updatedData.Scene = { IsOriented, HasBeenQCd };
            }

            if (objectType === eSystemObjectType.eCaptureData && !updatedData.CaptureData) {
                const CaptureDataDetails = getDetail(objectType) as CaptureDataDetailFields;
                const {
                    captureMethod,
                    dateCaptured,
                    datasetType,
                    systemCreated,
                    description,
                    cameraSettingUniform,
                    datasetFieldId,
                    itemPositionType,
                    itemPositionFieldId,
                    itemArrangementFieldId,
                    focusType,
                    lightsourceType,
                    backgroundRemovalMethod,
                    clusterType,
                    clusterGeometryFieldId,
                    folders
                } = CaptureDataDetails;

                updatedData.CaptureData = {
                    captureMethod,
                    dateCaptured,
                    datasetType,
                    systemCreated,
                    description,
                    cameraSettingUniform,
                    datasetFieldId,
                    itemPositionType,
                    itemPositionFieldId,
                    itemArrangementFieldId,
                    focusType,
                    lightsourceType,
                    backgroundRemovalMethod,
                    clusterType,
                    clusterGeometryFieldId,
                    folders
                };
            }

            const stateIdentifiersWithIdSystemObject: UpdateIdentifier[] = stateIdentifiers.map(({ id, identifier, identifierType, selected, idIdentifier }) => {
                return {
                    id,
                    identifier,
                    identifierType,
                    selected,
                    idSystemObject,
                    idIdentifier
                };
            });

            updatedData.Retired = updatedData?.Retired || details?.retired;
            updatedData.Name = updatedData?.Name || objectDetailsData?.getSystemObjectDetails.name;
            updatedData.Identifiers = stateIdentifiersWithIdSystemObject || [];
            const { data } = await updateDetailsTabData(idSystemObject, idObject, objectType, updatedData);
            if (data?.updateObjectDetails?.success) {
                toast.success('Data saved successfully');
            } else {
                throw new Error(data?.updateObjectDetails?.message);
            }
        } catch (error) {
            toast.error(error || 'Failed to save updated data');
        } finally {
            setIsUpdatingData(false);
        }
    };

    return (
        <Box className={classes.container}>
            <DetailsHeader
                originalFields={data.getSystemObjectDetails}
                name={details.name}
                disabled={disabled}
                objectType={objectType}
                path={objectAncestors}
                onNameUpdate={onNameUpdate}
            />

            <Box display='flex' mt={2}>
                <ObjectDetails
                    unit={unit}
                    project={project}
                    subject={subject}
                    item={item}
                    onRetiredUpdate={onRetiredUpdate}
                    onLicenseUpdate={onLicenseUpdate}
                    publishedState={publishedState}
                    originalFields={data.getSystemObjectDetails}
                    retired={withDefaultValueBoolean(details.retired, false)}
                    license={withDefaultValueNumber(details.idLicense, 0)}
                    disabled={disabled}
                    idSystemObject={idSystemObject}
                    licenseInherited={licenseInherited}
                    path={objectAncestors}
                />
                <Box display='flex' flex={2.2} flexDirection='column'>
                    <IdentifierList
                        viewMode
                        disabled={disabled}
                        identifiers={stateIdentifiers || []}
                        identifierTypes={getEntries(eVocabularySetID.eIdentifierIdentifierType)}
                        onAdd={addIdentifer}
                        onRemove={removeIdentifier}
                        onUpdate={updateIdentifierFields}
                    />
                </Box>
            </Box>

            <Box display='flex'>
                <DetailsTab
                    disabled={disabled}
                    idSystemObject={idSystemObject}
                    objectType={objectType}
                    sourceObjects={sourceObjects}
                    derivedObjects={derivedObjects}
                    onAddSourceObject={onAddSourceObject}
                    onAddDerivedObject={onAddDerivedObject}
                    onUpdateDetail={onUpdateDetail}
                    objectVersions={objectVersions}
                    detailQuery={detailQuery}
                />
                <Box display='flex' flex={1} padding={2}>
                    <DetailsThumbnail thumbnail={thumbnail} idSystemObject={idSystemObject} objectType={objectType} />
                </Box>
            </Box>

            <LoadingButton className={classes.updateButton} onClick={updateData} disableElevation loading={isUpdatingData}>
                Update
            </LoadingButton>

            <ObjectSelectModal
                open={modalOpen}
                onModalClose={onModalClose}
                selectedObjects={objectRelationship === 'Source' ? sourceObjects : derivedObjects}
                idSystemObject={idSystemObject}
                relationship={objectRelationship}
            />
        </Box>
    );
}

export default DetailsView;

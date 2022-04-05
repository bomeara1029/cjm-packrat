/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-max-props-per-line */

/**
 * Metadata - Model
 *
 * This component renders the metadata fields specific to model asset.
 */
import { Box, makeStyles, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Select, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { AssetIdentifiers, DateInputField, ReadOnlyRow, TextArea } from '../../../../../components';
import { StateIdentifier, StateRelatedObject, useSubjectStore, useMetadataStore, useVocabularyStore, useRepositoryStore, FieldErrors } from '../../../../../store';
import { MetadataType } from '../../../../../store/metadata';
import { GetModelConstellationForAssetVersionDocument, RelatedObjectType, useGetSubjectQuery } from '../../../../../types/graphql';
import { eSystemObjectType, eVocabularySetID } from '@dpo-packrat/common';
import ObjectSelectModal from './ObjectSelectModal';
import RelatedObjectsList from './RelatedObjectsList';
import ObjectMeshTable from './ObjectMeshTable';
import AssetFilesTable from './AssetFilesTable';
import { extractModelConstellation } from '../../../../../constants';
import { apolloClient } from '../../../../../graphql/index';
import { useStyles as useTableStyles } from '../../../../Repository/components/DetailsView/DetailsTab/CaptureDataDetails';
import { errorFieldStyling } from '../Photogrammetry';
import SubtitleControl from '../Control/SubtitleControl';
import clsx from 'clsx';
import lodash from 'lodash';
import { toast } from 'react-toastify';

const useStyles = makeStyles(({ palette }) => ({
    container: {
        marginTop: 20
    },
    notRequiredFields: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: palette.secondary.light,
        width: 'fit-content',
        height: 'fit-content',
        padding: '5px',
        outline: '1px solid rgba(141, 171, 196, 0.4)'
    },
    dataEntry: {
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        height: 'fit-content',
        backgroundColor: palette.secondary.light,
        borderRadius: 5,
        outline: '1px solid rgba(141, 171, 196, 0.4)'
    },
    modelDetailsAndSubtitleContainer: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: palette.primary.light,
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column'
    },
    modelDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: palette.primary.light,
        width: '100%',
        columnGap: 10,
        rowGap: 10,
        flexWrap: 'wrap'
    },
    caption: {
        flex: '1 1 0%',
        width: '100%',
        display: 'flex',
        marginBottom: '8px',
        flexDirection: 'row',
        color: 'grey',
    },
    readOnlyRowsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.secondary.light,
        width: '200px'
    },
}));

interface ModelProps {
    readonly metadataIndex: number;
    fieldErrors?: FieldErrors
}

function Model(props: ModelProps): React.ReactElement {
    const { metadataIndex, fieldErrors } = props;
    const classes = useStyles();
    const tableClasses = useTableStyles();
    const metadata = useMetadataStore(state => state.metadatas[metadataIndex]);
    const { model, file } = metadata;
    const { idAsset } = file;
    const [updateMetadataField] = useMetadataStore(state => [state.updateMetadataField]);
    const [getEntries] = useVocabularyStore(state => [state.getEntries]);
    const [setDefaultIngestionFilters, closeRepositoryBrowser, resetRepositoryBrowserRoot] = useRepositoryStore(state => [state.setDefaultIngestionFilters, state.closeRepositoryBrowser, state.resetRepositoryBrowserRoot]);
    const [subjects] = useSubjectStore(state => [state.subjects]);
    const [objectRelationship, setObjectRelationship] = useState<RelatedObjectType>(RelatedObjectType.Source);
    const [modalOpen, setModalOpen] = useState(false);
    const [ingestionModel, setIngestionModel] = useState<any>({
        CountVertices: null,
        CountFaces: null,
        CountTriangles: null,
        CountAnimations: null,
        CountCameras: null,
        CountLights: null,
        CountMaterials: null,
        CountMeshes: null,
        CountEmbeddedTextures: null,
        CountLinkedTextures: null,
        FileEncoding: '',
        IsDracoCompressed: null,
        idVFileType: null
    });
    const [assetFiles, setAssetFiles] = useState([{ assetName: '', assetType: '' }]);
    const [modelObjects, setModelObjects] = useState<any>([
        {
            idModelObject: null,
            CountPoint: null,
            CountFace: null,
            CountTriangles: null,
            CountColorChannel: null,
            CountTextureCoordinateChannel: null,
            HasBones: null,
            HasFaceNormals: null,
            HasTangents: null,
            HasTextureCoordinates: null,
            HasVertextNormals: null,
            HasVertexColor: null,
            IsTwoManifoldUnbounded: null,
            IsTwoManifoldBounded: null,
            IsWatertight: null,
            SelfIntersecting: null,
            BoundingBoxP1X: null,
            BoundingBoxP1Y: null,
            BoundingBoxP1Z: null,
            BoundingBoxP2X: null,
            BoundingBoxP2Y: null,
            BoundingBoxP2Z: null,
            ModelMaterials: []
        }
    ]);
    // const [fieldErrors, setFieldErrors] = useState<FieldErrors>();

    // setFieldErrors(getFieldErrors(metadata))
    const urlParams = new URLSearchParams(window.location.search);
    const idAssetVersion = urlParams.get('fileId');

    useEffect(() => {
        if (idAsset)
            updateMetadataField(metadataIndex, 'idAsset', idAsset, MetadataType.model);
    }, [metadataIndex, idAsset, updateMetadataField]);

    useEffect(() => {
        async function fetchModelConstellation() {
            const { data } = await apolloClient.query({
                query: GetModelConstellationForAssetVersionDocument,
                variables: {
                    input: {
                        idAssetVersion: Number(idAssetVersion)
                    }
                }
            });
            // console.log(`data=${JSON.stringify(data)}`);
            if (data.getModelConstellationForAssetVersion.ModelConstellation) {
                const modelConstellation = data.getModelConstellationForAssetVersion.ModelConstellation;
                // console.log(`modelConstellation=${JSON.stringify(modelConstellation)}`);
                const { ingestionModel, modelObjects, assets } = extractModelConstellation(modelConstellation);
                // if we're not in update mode, set the name:

                // handles 0 and non-numeric idVFileTypes
                if (modelConstellation.Model.idVFileType)
                    updateMetadataField(metadataIndex, 'modelFileType', Number(modelConstellation.Model.idVFileType), MetadataType.model);

                // console.log(`ingestionModel=${JSON.stringify(ingestionModel)}`);
                // console.log(`modelObjects=${JSON.stringify(modelObjects)}`);
                setIngestionModel(ingestionModel);
                setModelObjects(modelObjects);
                setAssetFiles(assets);
            }
        }

        fetchModelConstellation();
    }, [idAssetVersion, idAsset, metadataIndex, updateMetadataField]);

    // use subject's idSystemObject as the root to initialize the repository browser
    const validSubjectId = subjects.find((subject) => subject.id > 0)?.id ?? 0;
    const subjectIdSystemObject = useGetSubjectQuery({
        variables: {
            input: {
                idSubject: validSubjectId
            }
        }
    });
    const idSystemObject: number | undefined = subjects.length > 0 ? subjectIdSystemObject?.data?.getSubject?.Subject?.SystemObject?.idSystemObject : undefined;

    const onIdentifersChange = (identifiers: StateIdentifier[]): void => {
        updateMetadataField(metadataIndex, 'identifiers', identifiers, MetadataType.model);
    };

    const setCheckboxField = ({ target }): void => {
        const { name, checked } = target;
        updateMetadataField(metadataIndex, name, checked, MetadataType.model);
    };

    const setIdField = ({ target }): void => {
        const { name, value } = target;
        let idFieldValue: number | null = null;

        if (value) {
            idFieldValue = Number.parseInt(value, 10);
        }

        updateMetadataField(metadataIndex, name, idFieldValue, MetadataType.model);
    };

    const setDateField = (name: string, value?: string | null): void => {
        if (value) {
            const date = new Date(value);
            updateMetadataField(metadataIndex, name, date, MetadataType.model);
        }
    };

    const setNameField = ({ target }): void => {
        const { name, value } = target;
        updateMetadataField(metadataIndex, name, value, MetadataType.model);
    };

    const openSourceObjectModal = async () => {
        await setDefaultIngestionFilters(eSystemObjectType.eModel, idSystemObject);
        await setObjectRelationship(RelatedObjectType.Source);
        await setModalOpen(true);
    };

    const openDerivedObjectModal = async () => {
        await setDefaultIngestionFilters(eSystemObjectType.eModel, idSystemObject);
        await setObjectRelationship(RelatedObjectType.Derived);
        await setModalOpen(true);
    };

    const onRemoveSourceObject = (idSystemObject: number): void => {
        const { sourceObjects } = model;
        const updatedSourceObjects = sourceObjects.filter(sourceObject => sourceObject.idSystemObject !== idSystemObject);
        updateMetadataField(metadataIndex, 'sourceObjects', updatedSourceObjects, MetadataType.model);
    };

    const onRemoveDerivedObject = (idSystemObject: number): void => {
        const { derivedObjects } = model;
        const updatedDerivedObjects = derivedObjects.filter(sourceObject => sourceObject.idSystemObject !== idSystemObject);
        updateMetadataField(metadataIndex, 'derivedObjects', updatedDerivedObjects, MetadataType.model);
    };

    const onModalClose = () => {
        setModalOpen(false);
        setObjectRelationship(RelatedObjectType.Source);
        closeRepositoryBrowser();
        resetRepositoryBrowserRoot();
    };

    const onSelectedObjects = (newSourceObjects: StateRelatedObject[]) => {
        updateMetadataField(metadataIndex, objectRelationship === RelatedObjectType.Source ? 'sourceObjects' : 'derivedObjects', newSourceObjects, MetadataType.model);
        onModalClose();
    };

    const onSelectSubtitle = (id: number) => {
        const updatedSubtitles = model.subtitles.map((subtitle) => {
            return {
                id: subtitle.id,
                value: subtitle.value,
                subtitleOption: subtitle.subtitleOption,
                selected: id === subtitle.id
            };
        });
        updateMetadataField(metadataIndex, 'subtitles', updatedSubtitles, MetadataType.model);
    };

    const onUpdateCustomSubtitle = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const subtitlesCopy = lodash.cloneDeep(model.subtitles);
        const targetSubtitle = subtitlesCopy.find(subtitle => subtitle.id === id);

        if (!targetSubtitle) {
            toast.warn('Something went wrong with updating the subtitle. Please try again');
            return;
        }

        targetSubtitle.value = event.target.value;
        updateMetadataField(metadataIndex, 'subtitles', subtitlesCopy, MetadataType.model);
    };

    return (
        <React.Fragment>
            <Box className={classes.container}>
                {idAsset && (
                    <Box mb={2}>
                        <TextArea label='Update Notes' value={model.updateNotes} name='updateNotes' onChange={setNameField} placeholder='Update notes...' />
                    </Box>
                )}

                <Box mb={2} width='52vw'>
                    <AssetIdentifiers
                        systemCreated={model.systemCreated}
                        identifiers={model.identifiers}
                        onSystemCreatedChange={setCheckboxField}
                        onAddIdentifer={onIdentifersChange}
                        onUpdateIdentifer={onIdentifersChange}
                        onRemoveIdentifer={onIdentifersChange}
                    />
                </Box>

                {!idAsset && (
                    <React.Fragment>
                        <Box mb={2}>
                            <RelatedObjectsList
                                type={RelatedObjectType.Source}
                                relatedObjects={model.sourceObjects}
                                onAdd={openSourceObjectModal}
                                onRemove={onRemoveSourceObject}
                                relationshipLanguage='Parents'
                            />
                        </Box>
                        <Box mb={2}>
                            <RelatedObjectsList
                                type={RelatedObjectType.Derived}
                                relatedObjects={model.derivedObjects}
                                onAdd={openDerivedObjectModal}
                                onRemove={onRemoveDerivedObject}
                                relationshipLanguage='Children'
                            />
                        </Box>
                        <Box mb={2}>
                            <AssetFilesTable files={assetFiles} />
                        </Box>
                    </React.Fragment>
                )}
                <Box className={classes.modelDetailsAndSubtitleContainer}>
                    {!idAsset && (
                        <Box style={{ marginBottom: 10 }}>
                            <SubtitleControl
                                subtitles={model.subtitles}
                                objectName={model.name}
                                onSelectSubtitle={onSelectSubtitle}
                                onUpdateCustomSubtitle={onUpdateCustomSubtitle}
                                hasPrimaryTheme={false}
                            />
                        </Box>
                    )}
                    <Box className={classes.modelDetailsContainer}>
                        <Box display='flex' flexDirection='column' className={classes.dataEntry}>
                            <TableContainer component={Paper} elevation={0} className={tableClasses.captureMethodTableContainer} style={{ backgroundColor: 'rgb(255, 252, 209', paddingTop: '10px' }}>
                                <Table className={tableClasses.table}>
                                    <TableBody>
                                        <TableRow className={tableClasses.tableRow} style={errorFieldStyling(fieldErrors?.model?.dateCreated || false)}>
                                            <TableCell className={tableClasses.tableCell}><Typography className={tableClasses.labelText}>Date Created</Typography></TableCell>
                                            <TableCell className={tableClasses.tableCell}>
                                                <DateInputField value={model.dateCreated} onChange={(_, value) => setDateField('dateCreated', value)} dateHeight='22px' />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={tableClasses.tableRow} style={errorFieldStyling(fieldErrors?.model?.creationMethod || false)}>
                                            <TableCell className={tableClasses.tableCell}><Typography className={tableClasses.labelText}>Creation Method</Typography></TableCell>
                                            <TableCell className={tableClasses.tableCell}>
                                                <Select
                                                    value={model.creationMethod}
                                                    name='creationMethod'
                                                    onChange={setIdField}
                                                    disableUnderline
                                                    className={clsx(tableClasses.select, tableClasses.datasetFieldSelect)}
                                                    SelectDisplayProps={{ style: { paddingLeft: '10px', borderRadius: '5px' } }}
                                                >
                                                    {getEntries(eVocabularySetID.eModelCreationMethod).map(({ idVocabulary, Term }, index) => <MenuItem key={index} value={idVocabulary}>{Term}</MenuItem>)}
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={tableClasses.tableRow} style={errorFieldStyling(fieldErrors?.model?.modality || false)}>
                                            <TableCell className={tableClasses.tableCell}><Typography className={tableClasses.labelText}>Modality</Typography></TableCell>
                                            <TableCell className={tableClasses.tableCell}>
                                                <Select
                                                    value={model.modality}
                                                    name='modality'
                                                    onChange={setIdField}
                                                    disableUnderline
                                                    className={clsx(tableClasses.select, tableClasses.datasetFieldSelect)}
                                                    SelectDisplayProps={{ style: { paddingLeft: '10px', borderRadius: '5px' } }}
                                                >
                                                    {getEntries(eVocabularySetID.eModelModality).map(({ idVocabulary, Term }, index) => <MenuItem key={index} value={idVocabulary}>{Term}</MenuItem>)}
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={tableClasses.tableRow} style={errorFieldStyling(fieldErrors?.model?.units || false)}>
                                            <TableCell className={tableClasses.tableCell}><Typography className={tableClasses.labelText}>Units</Typography></TableCell>
                                            <TableCell className={tableClasses.tableCell}>
                                                <Select
                                                    value={model.units}
                                                    name='units'
                                                    onChange={setIdField}
                                                    disableUnderline
                                                    className={clsx(tableClasses.select, tableClasses.datasetFieldSelect)}
                                                    SelectDisplayProps={{ style: { paddingLeft: '10px', borderRadius: '5px' } }}
                                                >
                                                    {getEntries(eVocabularySetID.eModelUnits).map(({ idVocabulary, Term }, index) => <MenuItem key={index} value={idVocabulary}>{Term}</MenuItem>)}
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={tableClasses.tableRow} style={errorFieldStyling(fieldErrors?.model?.purpose || false)}>
                                            <TableCell className={tableClasses.tableCell}><Typography className={tableClasses.labelText}>Purpose</Typography></TableCell>
                                            <TableCell className={tableClasses.tableCell}>
                                                <Select
                                                    value={model.purpose}
                                                    name='purpose'
                                                    onChange={setIdField}
                                                    disableUnderline
                                                    className={clsx(tableClasses.select, tableClasses.datasetFieldSelect)}
                                                    SelectDisplayProps={{ style: { paddingLeft: '10px', borderRadius: '5px' } }}
                                                >
                                                    {getEntries(eVocabularySetID.eModelPurpose).map(({ idVocabulary, Term }, index) => <MenuItem key={index} value={idVocabulary}>{Term}</MenuItem>)}
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={tableClasses.tableRow} style={errorFieldStyling(fieldErrors?.model?.modelFileType || false)}>
                                            <TableCell className={tableClasses.tableCell}><Typography className={tableClasses.labelText}>Model File Type</Typography></TableCell>
                                            <TableCell className={tableClasses.tableCell}>
                                                <Select
                                                    value={model.modelFileType}
                                                    name='modelFileType'
                                                    onChange={setIdField}
                                                    disableUnderline
                                                    className={clsx(tableClasses.select, tableClasses.datasetFieldSelect)}
                                                    SelectDisplayProps={{ style: { paddingLeft: '10px', borderRadius: '5px' } }}
                                                >
                                                    {getEntries(eVocabularySetID.eModelFileType).map(({ idVocabulary, Term }, index) => <MenuItem key={index} value={idVocabulary}>{Term}</MenuItem>)}
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box className={classes.notRequiredFields}>
                            <Box className={classes.caption}>
                                <Typography variant='caption'>Model</Typography>
                            </Box>
                            <Box className={classes.readOnlyRowsContainer}>
                                <ReadOnlyRow label='Vertex Count' value={ingestionModel?.CountVertices} paddingString='0px' />
                                <ReadOnlyRow label='Face Count' value={ingestionModel?.CountFaces} paddingString='0px' />
                                <ReadOnlyRow label='Triangle Count' value={ingestionModel?.CountTriangles} paddingString='0px' />
                                <ReadOnlyRow label='Animation Count' value={ingestionModel?.CountAnimations} paddingString='0px' />
                                <ReadOnlyRow label='Camera Count' value={ingestionModel?.CountCameras} paddingString='0px' />
                                <ReadOnlyRow label='Light Count' value={ingestionModel?.CountLights} paddingString='0px' />
                                <ReadOnlyRow label='Material Count' value={ingestionModel?.CountMaterials} paddingString='0px' />
                                <ReadOnlyRow label='Mesh Count' value={ingestionModel?.CountMeshes} paddingString='0px' />
                                <ReadOnlyRow label='Embedded Texture Count' value={ingestionModel?.CountEmbeddedTextures} paddingString='0px' />
                                <ReadOnlyRow label='Linked Texture Count' value={ingestionModel?.CountLinkedTextures} paddingString='0px' />
                                <ReadOnlyRow label='File Encoding' value={ingestionModel?.FileEncoding} paddingString='0px' />
                                <ReadOnlyRow label='Draco Compressed' value={ingestionModel?.IsDracoCompressed ? 'true' : 'false'} paddingString='0px' />
                            </Box>
                        </Box>

                        <ObjectMeshTable modelObjects={modelObjects} />

                    </Box>
                </Box>

                {/* <SidebarBottomNavigator
                    rightLoading={rightLoading}
                    leftLabel='Previous'
                    onClickLeft={onPrevious}
                    rightLabel={isLast ? 'Finish' : 'Next'}
                    onClickRight={() => { setFieldErrors(getFieldErrors(metadata)); onClickRight();  }}
                    disableNavigation={disableNavigation}
                /> */}
            </Box>
            <ObjectSelectModal
                open={modalOpen}
                onSelectedObjects={onSelectedObjects}
                onModalClose={onModalClose}
                selectedObjects={objectRelationship === RelatedObjectType.Source ? model.sourceObjects : model.derivedObjects}
                relationship={objectRelationship}
                objectType={eSystemObjectType.eModel}
            />
        </React.Fragment>
    );
}

export default Model;
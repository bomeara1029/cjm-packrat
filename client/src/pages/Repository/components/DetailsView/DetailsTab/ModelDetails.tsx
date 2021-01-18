/* eslint-disable react-hooks/exhaustive-deps */
/**
 * ModelDetails
 *
 * This component renders details tab for Model specific details used in DetailsTab component.
 */
import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CheckboxField, DateInputField, FieldType, InputField, Loader, SelectField } from '../../../../../components';
import { parseUVMapsToState, useVocabularyStore } from '../../../../../store';
import { ModelDetailFields } from '../../../../../types/graphql';
import { eVocabularySetID } from '../../../../../types/server';
import { isFieldUpdated } from '../../../../../utils/repository';
import { withDefaultValueNumber } from '../../../../../utils/shared';
import { formatBytes } from '../../../../../utils/upload';
import BoundingBoxInput from '../../../../Ingestion/components/Metadata/Model/BoundingBoxInput';
import UVContents from '../../../../Ingestion/components/Metadata/Model/UVContents';
import { DetailComponentProps } from './index';

export const useStyles = makeStyles(({ palette }) => ({
    value: {
        fontSize: '0.8em',
        color: palette.primary.dark
    }
}));

function ModelDetails(props: DetailComponentProps): React.ReactElement {
    const classes = useStyles();
    const { data, loading, disabled, onUpdateDetail, objectType } = props;
    const [details, setDetails] = useState<ModelDetailFields>({
        uvMaps: []
    });

    const [getInitialEntry, getEntries] = useVocabularyStore(state => [state.getInitialEntry, state.getEntries]);

    useEffect(() => {
        onUpdateDetail(objectType, details);
    }, [details]);

    useEffect(() => {
        if (data && !loading) {
            const { Model } = data.getDetailsTabDataForObject;
            setDetails({
                size: Model?.size,
                master: Model?.master,
                authoritative: Model?.authoritative,
                creationMethod: Model?.creationMethod,
                modality: Model?.modality,
                purpose: Model?.purpose,
                units: Model?.units,
                dateCaptured: Model?.dateCaptured,
                modelFileType: Model?.modelFileType,
                uvMaps: Model?.uvMaps || [],
                roughness: Model?.roughness,
                metalness: Model?.metalness,
                pointCount: Model?.pointCount,
                faceCount: Model?.faceCount,
                isWatertight: Model?.isWatertight,
                hasNormals: Model?.hasNormals,
                hasVertexColor: Model?.hasVertexColor,
                hasUVSpace: Model?.hasUVSpace,
                boundingBoxP1X: Model?.boundingBoxP1X,
                boundingBoxP1Y: Model?.boundingBoxP1Y,
                boundingBoxP1Z: Model?.boundingBoxP1Z,
                boundingBoxP2X: Model?.boundingBoxP2X,
                boundingBoxP2Y: Model?.boundingBoxP2Y,
                boundingBoxP2Z: Model?.boundingBoxP2Z,
            });
        }
    }, [data, loading]);

    if (!data || loading) {
        return <Loader minHeight='15vh' />;
    }

    const updateUVMapsVariant = () => {
        alert('TODO: KARAN: Update UV Maps');
    };

    const setDateField = (name: string, value?: string | null): void => {
        if (value) {
            const date = new Date(value);
            setDetails(details => ({ ...details, [name]: date }));
        }
    };

    const setIdField = ({ target }): void => {
        const { name, value } = target;
        let idFieldValue: number | null = null;

        if (value) {
            idFieldValue = Number.parseInt(value, 10);
        }

        setDetails(details => ({ ...details, [name]: idFieldValue }));
    };


    const setCheckboxField = ({ target }): void => {
        const { name, checked } = target;
        setDetails(details => ({ ...details, [name]: checked }));
    };

    const rowFieldProps = { alignItems: 'center', justifyContent: 'space-between', style: { borderRadius: 0 } };

    const modelData = data.getDetailsTabDataForObject?.Model;

    return (
        <Box display='flex'>
            <Box display='flex' flex={1} flexDirection='column'>
                <FieldType
                    required
                    label='Total Size'
                    direction='row'
                    containerProps={rowFieldProps}
                    width='auto'
                >
                    <Typography className={classes.value}>{formatBytes(details?.size ?? 0)}</Typography>
                </FieldType>
                <FieldType
                    required
                    label='Date Captured'
                    direction='row'
                    width='auto'
                    containerProps={rowFieldProps}
                >
                    <DateInputField
                        value={new Date(details?.dateCaptured ?? Date.now())}
                        updated={isFieldUpdated(details, modelData, 'dateCaptured')}
                        disabled={disabled}
                        onChange={(_, value) => setDateField('dateCaptured', value)}
                    />
                </FieldType>

                <SelectField
                    viewMode
                    required
                    updated={isFieldUpdated(details, modelData, 'creationMethod')}
                    disabled={disabled}
                    label='Creation Method'
                    value={withDefaultValueNumber(details.creationMethod, getInitialEntry(eVocabularySetID.eModelCreationMethod))}
                    name='creationMethod'
                    onChange={setIdField}
                    options={getEntries(eVocabularySetID.eModelCreationMethod)}
                />

                <CheckboxField
                    viewMode
                    required
                    updated={isFieldUpdated(details, modelData, 'master')}
                    disabled={disabled}
                    name='master'
                    label='Master Model'
                    value={details.master ?? false}
                    onChange={setCheckboxField}
                />

                <CheckboxField
                    viewMode
                    required
                    updated={isFieldUpdated(details, modelData, 'authoritative')}
                    disabled={disabled}
                    name='authoritative'
                    label='Authoritative Model'
                    value={details.authoritative ?? false}
                    onChange={setCheckboxField}
                />

                <SelectField
                    viewMode
                    required
                    updated={isFieldUpdated(details, modelData, 'modality')}
                    disabled={disabled}
                    label='Modality'
                    value={withDefaultValueNumber(details.modality, getInitialEntry(eVocabularySetID.eModelModality))}
                    name='modality'
                    onChange={setIdField}
                    options={getEntries(eVocabularySetID.eModelModality)}
                />

                <SelectField
                    viewMode
                    required
                    updated={isFieldUpdated(details, modelData, 'units')}
                    disabled={disabled}
                    label='Units'
                    value={withDefaultValueNumber(details.units, getInitialEntry(eVocabularySetID.eModelUnits))}
                    name='units'
                    onChange={setIdField}
                    options={getEntries(eVocabularySetID.eModelUnits)}
                />

                <SelectField
                    viewMode
                    required
                    updated={isFieldUpdated(details, modelData, 'purpose')}
                    disabled={disabled}
                    label='Purpose'
                    value={withDefaultValueNumber(details.purpose, getInitialEntry(eVocabularySetID.eModelPurpose))}
                    name='purpose'
                    onChange={setIdField}
                    options={getEntries(eVocabularySetID.eModelPurpose)}
                />

                <SelectField
                    viewMode
                    required
                    updated={isFieldUpdated(details, modelData, 'modelFileType')}
                    disabled={disabled}
                    label='Model File Type'
                    value={withDefaultValueNumber(details.modelFileType, getInitialEntry(eVocabularySetID.eModelGeometryFileModelFileType))}
                    name='modelFileType'
                    onChange={setIdField}
                    options={getEntries(eVocabularySetID.eModelGeometryFileModelFileType)}
                />
                <UVContents
                    viewMode
                    disabled={disabled}
                    initialEntry={getInitialEntry(eVocabularySetID.eModelUVMapChannelUVMapType)}
                    uvMaps={parseUVMapsToState(details?.uvMaps ?? [])}
                    options={getEntries(eVocabularySetID.eModelUVMapChannelUVMapType)}
                    onUpdate={updateUVMapsVariant}
                />
            </Box>
            <Box display='flex' flex={1} flexDirection='column' ml={1}>
                <InputField
                    viewMode
                    updated={isFieldUpdated(details, modelData, 'roughness')}
                    disabled={disabled}
                    type='number'
                    label='Roughness'
                    value={details?.roughness}
                    name='roughness'
                    onChange={setIdField}
                />
                <InputField
                    viewMode
                    updated={isFieldUpdated(details, modelData, 'metalness')}
                    disabled={disabled}
                    type='number'
                    label='Metalness'
                    value={details?.metalness}
                    name='metalness'
                    onChange={setIdField}
                />
                <InputField
                    viewMode
                    updated={isFieldUpdated(details, modelData, 'pointCount')}
                    disabled={disabled}
                    type='number'
                    label='Point Count'
                    value={details?.pointCount}
                    name='pointCount'
                    onChange={setIdField}
                />
                <InputField
                    viewMode
                    updated={isFieldUpdated(details, modelData, 'faceCount')}
                    disabled={disabled}
                    type='number'
                    label='Face Count'
                    value={details?.faceCount}
                    name='faceCount'
                    onChange={setIdField}
                />
                <CheckboxField
                    viewMode
                    updated={isFieldUpdated(details, modelData, 'isWatertight')}
                    disabled={disabled}
                    name='isWatertight'
                    label='Is Watertight?'
                    value={details?.isWatertight ?? false}
                    onChange={setCheckboxField}
                />
                <CheckboxField
                    viewMode
                    updated={isFieldUpdated(details, modelData, 'hasNormals')}
                    disabled={disabled}
                    name='hasNormals'
                    label='Has Normals?'
                    value={details?.hasNormals ?? false}
                    onChange={setCheckboxField}
                />
                <CheckboxField
                    viewMode
                    updated={isFieldUpdated(details, modelData, 'hasVertexColor')}
                    disabled={disabled}
                    name='hasVertexColor'
                    label='Has Vertex Color?'
                    value={details?.hasVertexColor ?? false}
                    onChange={setCheckboxField}
                />
                <CheckboxField
                    viewMode
                    updated={isFieldUpdated(details, modelData, 'hasUVSpace')}
                    disabled={disabled}
                    name='hasUVSpace'
                    label='Has UV Space?'
                    value={details?.hasUVSpace ?? false}
                    onChange={setCheckboxField}
                />
                <BoundingBoxInput
                    viewMode
                    modelFields={modelData}
                    disabled={disabled}
                    boundingBoxP1X={details?.boundingBoxP1X}
                    boundingBoxP1Y={details?.boundingBoxP1Y}
                    boundingBoxP1Z={details?.boundingBoxP1Z}
                    boundingBoxP2X={details?.boundingBoxP2X}
                    boundingBoxP2Y={details?.boundingBoxP2Y}
                    boundingBoxP2Z={details?.boundingBoxP2Z}
                    onChange={setIdField}
                />
            </Box>
        </Box>
    );
}

export default ModelDetails;
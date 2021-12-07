/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-props-per-line */
/**
 * AssetVersionDetails
 *
 * This component renders details tab for AssetVersion specific details used in DetailsTab component.
 */
import { Box, makeStyles, Typography, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckboxField, InputField, FieldType, Loader } from '../../../../../components';
import { isFieldUpdated } from '../../../../../utils/repository';
import { formatBytes } from '../../../../../utils/upload';
import { DetailComponentProps } from './index';
import { sharedButtonProps } from '../../../../../utils/shared';
import { updateSystemObjectUploadRedirect } from '../../../../../constants';
import { eSystemObjectType } from '../../../../../types/server';
import { apolloClient } from '../../../../../graphql';
import { GetAssetDocument } from '../../../../../types/graphql';
import { useDetailTabStore } from '../../../../../store';

export const useStyles = makeStyles(({ palette }) => ({
    value: {
        fontSize: '0.8em',
        color: palette.primary.dark
    },
    button: sharedButtonProps
}));

function AssetVersionDetails(props: DetailComponentProps): React.ReactElement {
    const classes = useStyles();
    const { data, loading, onUpdateDetail, objectType } = props;
    const { disabled } = props;
    const history = useHistory();
    const [AssetVersionDetails, updateDetailField] = useDetailTabStore(state => [state.AssetVersionDetails, state.updateDetailField]);

    useEffect(() => {
        onUpdateDetail(objectType, AssetVersionDetails);
    }, [AssetVersionDetails]);

    if (!data || loading) {
        return <Loader minHeight='15vh' />;
    }

    const onSetField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        updateDetailField(eSystemObjectType.eAssetVersion, name, value);
    };

    const setCheckboxField = ({ target }): void => {
        const { name, checked } = target;
        updateDetailField(eSystemObjectType.eAssetVersion, name, checked);
    };

    const rowFieldProps = { alignItems: 'center', justifyContent: 'space-between', style: { borderRadius: 0 } };

    const assetVersionData = data.getDetailsTabDataForObject?.AssetVersion;

    let redirect = () => {};
    if (assetVersionData) {
        // redirect function fetches assetType so that uploads remembers the assetType for uploads
        redirect = async () => {
            const {
                data: {
                    getAsset: {
                        Asset: { idVAssetType }
                    }
                }
            } = await apolloClient.query({
                query: GetAssetDocument,
                variables: { input: { idAsset: assetVersionData.idAsset } }
            });
            const newEndpoint = updateSystemObjectUploadRedirect(assetVersionData.idAsset, assetVersionData.idAssetVersion, eSystemObjectType.eAssetVersion, idVAssetType);
            history.push(newEndpoint);
        };
    }

    return (
        <Box>
            <FieldType required label='Version' direction='row' containerProps={rowFieldProps} width='auto'>
                <Typography className={classes.value}>{AssetVersionDetails.Version}</Typography>
            </FieldType>
            <InputField
                viewMode
                required
                updated={isFieldUpdated(AssetVersionDetails, assetVersionData, 'FilePath')}
                disabled={disabled}
                label='File Path'
                value={assetVersionData?.FilePath}
                name='FilePath'
                onChange={onSetField}
            />
            <FieldType required label='Creator' direction='row' containerProps={rowFieldProps} width='auto'>
                <Typography className={classes.value}>{AssetVersionDetails.Creator}</Typography>
            </FieldType>
            <FieldType required label='Date Created' direction='row' containerProps={rowFieldProps} width='auto'>
                <Typography className={classes.value}>{AssetVersionDetails.DateCreated}</Typography>
            </FieldType>
            <FieldType required label='Storage Size' direction='row' containerProps={rowFieldProps} width='auto'>
                <Typography className={classes.value}>{formatBytes(AssetVersionDetails.StorageSize ?? 0)}</Typography>
            </FieldType>

            <CheckboxField
                viewMode
                required
                updated={isFieldUpdated(AssetVersionDetails, assetVersionData, 'Ingested')}
                disabled
                name='Ingested'
                label='Ingested'
                value={AssetVersionDetails.Ingested ?? false}
                onChange={setCheckboxField}
            />

            <Button className={classes.button} variant='contained' color='primary' style={{ width: 'fit-content', marginTop: '7px' }} onClick={redirect}>
                Add Version
            </Button>
        </Box>
    );
}

export default AssetVersionDetails;

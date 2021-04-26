/* eslint-disable react/jsx-max-props-per-line */

/**
 * AssetDetailsTable
 *
 * This component renders asset details table tab for the DetailsTab component.
 */
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { EmptyTable, NewTabLink } from '../../../../../components';
import { StateAssetDetail, useVocabularyStore } from '../../../../../store';
import { eVocabularySetID } from '../../../../../types/server';
import { getDetailsUrlForObject, getDownloadAllAssetsUrlForObject, getDownloadAssetUrlForObject } from '../../../../../utils/repository';
import { formatBytes } from '../../../../../utils/upload';
import { useObjectAssets } from '../../../hooks/useDetailsView';
import GetAppIcon from '@material-ui/icons/GetApp';
import { sharedButtonProps } from '../../../../../utils/shared';

export const useStyles = makeStyles(({ palette }) => ({
    container: {
        width: '100%',
        background: palette.secondary.light,
        padding: 5,
        borderRadius: 5
    },
    header: {
        fontSize: '0.9em',
        color: palette.primary.dark,
        fontWeight: 'bold'
    },
    value: {
        fontSize: '0.8em',
        color: palette.primary.dark
    },
    empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        background: palette.secondary.light,
        padding: 40,
        borderRadius: 5
    },
    link: {
        textDecoration: 'underline'
    },
    btn: sharedButtonProps
}));

interface AssetDetailsTableProps {
    idSystemObject: number;
}

function AssetDetailsTable(props: AssetDetailsTableProps): React.ReactElement {
    const classes = useStyles();
    const { idSystemObject } = props;
    const { REACT_APP_PACKRAT_SERVER_ENDPOINT } = process.env;
    const { data, loading } = useObjectAssets(idSystemObject);
    const getVocabularyTerm = useVocabularyStore(state => state.getVocabularyTerm);

    const headers: string[] = ['Link', 'Name', 'Path', 'Asset Type', 'Version', 'Date Created', 'Size'];

    if (!data || loading) {
        return <EmptyTable />;
    }

    const { assetDetails } = data.getAssetDetailsForSystemObject;

    return (
        <table className={classes.container}>
            <thead>
                <tr>
                    {headers.map((header, index: number) => (
                        <th key={index} align='left'>
                            <Typography className={classes.header}>{header}</Typography>
                        </th>
                    ))}
                </tr>
                <tr>
                    <td colSpan={headers.length}>
                        <hr />
                    </td>
                </tr>
            </thead>

            <tbody>
                {assetDetails.map((assetDetail: StateAssetDetail, index: number) => (
                    <tr key={index}>
                        <td>
                            <a href={getDownloadAssetUrlForObject(REACT_APP_PACKRAT_SERVER_ENDPOINT, assetDetail.idAsset)} style={{ textDecoration: 'none', color: 'black' }}>
                                <GetAppIcon />
                            </a>
                        </td>
                        <td>
                            <NewTabLink to={getDetailsUrlForObject(assetDetail.idSystemObject)}>
                                <Typography className={clsx(classes.value, classes.link)}>{assetDetail.name}</Typography>
                            </NewTabLink>
                        </td>
                        <td>
                            <Typography className={classes.value}>{assetDetail.path}</Typography>
                        </td>
                        <td>
                            <Typography className={classes.value}>{getVocabularyTerm(eVocabularySetID.eAssetAssetType, assetDetail.assetType)}</Typography>
                        </td>
                        <td align='left'>
                            <Typography className={classes.value}>{assetDetail.version}</Typography>
                        </td>
                        <td>
                            <Typography className={classes.value}>{assetDetail.dateCreated}</Typography>
                        </td>
                        <td>
                            <Typography className={classes.value}>{formatBytes(assetDetail.size)}</Typography>
                        </td>
                    </tr>
                ))}
                {assetDetails.length && (
                    <tr>
                        <td>
                            <a href={getDownloadAllAssetsUrlForObject(REACT_APP_PACKRAT_SERVER_ENDPOINT, idSystemObject)} style={{ textDecoration: 'none' }}>
                                <Button disableElevation color='primary' variant='contained' className={classes.btn} style={{ fontSize: '0.4em' }}>
                                    Download All
                                </Button>
                            </a>
                        </td>
                    </tr>
                )}
                <tr>
                    <td colSpan={headers.length}>
                        {!assetDetails.length && (
                            <Box my={2}>
                                <Typography align='center' className={classes.value}>
                                    No assets found
                                </Typography>
                            </Box>
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default AssetDetailsTable;

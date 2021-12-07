/**
 * MetadataControlTable
 *
 * This component renders the control table for metadata in repository details and subject creation.
 * This is the bottom table
 */

import React from 'react';
import { Box, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField, Select, MenuItem, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useObjectMetadataStore, useLicenseStore, MetadataState, eObjectMetadataType, isRequired, noLabel } from '../../../../../store';
import { Metadata } from '../../../../../types/graphql';
// import { eVocabularySetID } from '../../../../../types/server';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { useAllUnits } from '../../../hooks/useDetailsView';
import { makeStyles } from '@material-ui/core/styles';
import { sharedButtonProps } from '../../../../../utils/shared';
import clsx from 'clsx';


const useStyles = makeStyles(({ palette, typography }) => ({
    btn: {
        ...sharedButtonProps,
        width: 'fit-content',
        marginBottom: '5px'
    },
    container: {
        backgroundColor: palette.secondary.light
    },
    headerRow: {
        borderBottom: '1.5px solid black'
    },
    tableBanner: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    textField: {
        width: '95%'
    },
    text: {
        fontWeight: typography.fontWeightRegular,
        fontFamily: typography.fontFamily,
        fontSize: '0.8em'
    },
    row: {
        height: '30px'
    }
}));

type MetadataControlTableProps = {
    type: eObjectMetadataType;
    metadataData: Metadata[]
};

type MetadataControlRowProps = {
    type: eObjectMetadataType;
    metadata: MetadataState;
    updateMetadata: (id: number, index: number, field: string, value: string) => void;
    deleteMetadata: (id: number, index: number) => Promise<void>;
    index: number;
    licenses: string[];
    units: string[];
    options: string[];
    style: {[className: string]: string}
};

/*
    TODO Styling:
        font and font size across both tables
*/

function MetadataControlTable(props: MetadataControlTableProps): React.ReactElement {
    const { type /* metadataData*/ } = props;
    const classes = useStyles();
    const { data } = useAllUnits();
    const [getLicenses] = useLicenseStore(state => [state.getEntries]);
    const licenses = getLicenses().map(license => license.Name);
    const units = data?.getUnitsFromNameSearch?.Units.map(unit => unit.Name) ?? [];
    const [metadata, updateMetadata, createMetadata, deleteMetadata, getAllMdmFieldsArr /*, initializeMdm, resetMetadata*/, ] = useObjectMetadataStore(state => [state.metadataControl, state.updateMetadata, state.createMetadata, state.deleteMetadata, state.getAllMdmFieldsArr /*state.initializeMdmEntries, state.resetMetadata*/]);
    const mdmFields: string[] = getAllMdmFieldsArr();

    const rows = metadata.map((row, index) => {
        return (
            <MetadataControlRow
                key={index}
                metadata={row}
                index={index}
                updateMetadata={updateMetadata}
                deleteMetadata={deleteMetadata}
                units={units}
                licenses={licenses}
                options={mdmFields}
                style={classes}
                type={type}
            />
        );
    });

    return (
        <React.Fragment>
            <Button className={classes.btn} variant='contained' color='primary' onClick={() => createMetadata()}>Add Field</Button>
            {
                metadata.length > 0 ? (
                    <Box className={classes.container}>
                        { type !== eObjectMetadataType.eDetailView && (
                            <Box className={classes.tableBanner}>
                                <Typography>Fields marked with * are required</Typography>
                            </Box>
                        )}
                        <Table>
                            <TableHead>
                                <TableRow className={classes.headerRow}>
                                    <TableCell width='20%'>Name</TableCell>
                                    <TableCell width='15%'>Label</TableCell>
                                    <TableCell width='61%'>Value</TableCell>
                                    <TableCell width='2%'></TableCell>
                                    <TableCell width='2%'></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows}
                            </TableBody>
                        </Table>
                    </Box>
                ) : null
            }
        </React.Fragment>
    );
}

function MetadataControlRow(props: MetadataControlRowProps): React.ReactElement {
    const { metadata, updateMetadata, deleteMetadata, index, licenses, units, options, style, type } = props;
    const { Name, Label, Value, idMetadata, isImmutable } = metadata;

    let valueInput = <TextField onChange={(e) => updateMetadata(idMetadata ?? 0, index, 'Value', e.target.value)} value={Value} InputProps={{ className: style.text }} style={{ width: '95%' }} />;
    if (type === eObjectMetadataType.eDetailView) {
        return (
            <TableRow className={style.row}>
                <TableCell padding='none'>
                    <TextField onChange={(e) => updateMetadata(idMetadata ?? 0, index, 'Name', e.target.value)} value={Name} InputProps={{ className: style.text }} style={{ width: '95%' }} />
                </TableCell>
                <TableCell padding='none'></TableCell>
                <TableCell padding='none'>{valueInput}</TableCell>
                <TableCell padding='none'></TableCell>
                <TableCell padding='none'><MdRemoveCircleOutline onClick={() => deleteMetadata(idMetadata ?? 0, index)} style={{ cursor: 'pointer' }} /></TableCell>
            </TableRow>
        );
    }

    if (Name === 'License') {
        valueInput = (
            <Select onChange={(e) => updateMetadata(idMetadata ?? 0, index, 'Value', e.target.value as string)} className={clsx(style.textField, style.text)} value={Value}>
                {licenses.map(license => (
                    <MenuItem value={license} key={license}>
                        {license}
                    </MenuItem>
                ))}
            </Select>
        );
    }
    if (Name === 'Unit') {
        valueInput = (
            <Select onChange={(e) => updateMetadata(idMetadata ?? 0, index, 'Value', e.target.value as string)} className={clsx(style.textField, style.text)} value={Value}>
                {units.map(unit => (
                    <MenuItem value={unit} key={unit}>
                        {unit}
                    </MenuItem>
                ))}
            </Select>
        );
    }
    const row = (
        <TableRow className={style.row}>
            <TableCell padding='none'>
                {isImmutable ?
                    <Typography className={clsx(style.textField, style.text)}>{Name}</Typography> :
                    <Autocomplete
                        value={Name}
                        classes={{ inputRoot: clsx(style.text, style.textField) }}
                        freeSolo
                        renderInput={(params) => <TextField {...params} />}
                        options={options}
                        onInputChange={(_e, value) => { updateMetadata(idMetadata ?? 0, index, 'Name', value); updateMetadata(idMetadata ?? 0, index, 'Value', ''); updateMetadata(idMetadata ?? 0, index, 'Label', ''); }}
                    />
                }
            </TableCell>
            <TableCell padding='none'>{noLabel.has(Name) ? null : <TextField onChange={(e) => updateMetadata(idMetadata ?? 0, index, 'Label', e.target.value)} value={Label} InputProps={{ className: style.text }} style={{ width: '95%' }} />}</TableCell>
            <TableCell padding='none'>{valueInput}</TableCell>
            <TableCell padding='none'>{isRequired.has(Name) ? '*' : null}</TableCell>
            <TableCell padding='none'><MdRemoveCircleOutline onClick={() => deleteMetadata(idMetadata ?? 0, index)} style={{ cursor: 'pointer' }} /></TableCell>
        </TableRow>
    );
    return row;
}

export default MetadataControlTable;
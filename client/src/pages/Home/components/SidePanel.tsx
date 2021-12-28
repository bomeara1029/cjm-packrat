/**
 * SidePanel
 *
 * This component renders the collapsable left side panel in homepage UI.
 */
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import React, { memo, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useParams } from 'react-router';
import { HOME_ROUTES } from '../../../constants';
import { Colors } from '../../../theme';
import SidePanelOption, { SidePanelOptionProps } from './SidePanelOption';
import { getDownloadSiteMapXMLLink } from '../../../constants';

const useStyles = makeStyles(({ palette, spacing }) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.primary.dark,
        maxWidth: (sideBarExpanded: boolean) => (sideBarExpanded ? '13vw' : '8vw')
    },
    menuOptions: {
        display: 'flex',
        flex: 1
    },
    bottomOptions: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: spacing(2)
    },
    anchor: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
        borderRadius: 10,
        transition: 'all 250ms linear',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: fade(palette.primary.light, 0.2)
        }
    },
    footer: {
        display: 'flex',
        flexDirection: 'column'
    },
    footerRow: {
        color: 'white'
    }
}));

interface SidePanelProps {
    isExpanded: boolean;
    onToggle: () => void;
}

type SidePanelParams = {
    type: string;
};

function SidePanel(props: SidePanelProps): React.ReactElement {
    const { isExpanded, onToggle } = props;
    const { type }: SidePanelParams = useParams();
    const { REACT_APP_PACKRAT_SERVER_ENDPOINT } = process.env;

    const [selectedOption, setSelectedOption] = useState(type || HOME_ROUTES.INGESTION);

    useEffect(() => {
        setSelectedOption(type);
    }, [type]);

    const classes = useStyles(isExpanded);

    const Options: SidePanelOptionProps[] = [
        // {
        //     title: 'Dashboard',
        //     type: HOME_ROUTES.DASHBOARD,
        //     color: Colors.sidebarOptions.dashboard,
        //     isExpanded,
        //     isSelected: selectedOption === HOME_ROUTES.DASHBOARD
        // },
        {
            title: 'Repository',
            type: HOME_ROUTES.REPOSITORY,
            color: Colors.sidebarOptions.repository,
            isExpanded,
            isSelected: selectedOption === HOME_ROUTES.REPOSITORY
        },
        {
            title: 'Ingestion',
            type: HOME_ROUTES.INGESTION,
            color: Colors.sidebarOptions.ingestion,
            isExpanded,
            isSelected: selectedOption === HOME_ROUTES.INGESTION
        },
        {
            title: 'Workflow',
            type: HOME_ROUTES.WORKFLOW,
            color: Colors.sidebarOptions.workflow,
            isExpanded,
            isSelected: selectedOption === HOME_ROUTES.WORKFLOW
        },
        // {
        //     title: 'Reporting',
        //     type: HOME_ROUTES.REPORTING,
        //     color: Colors.sidebarOptions.reporting,
        //     isExpanded,
        //     isSelected: selectedOption === HOME_ROUTES.REPORTING

        // },
        {
            title: 'Admin',
            type: HOME_ROUTES.ADMIN,
            color: Colors.sidebarOptions.admin,
            isExpanded,
            isSelected: selectedOption === HOME_ROUTES.ADMIN
        }
    ];

    return (
        <Box className={classes.container}>
            <Grid container className={classes.menuOptions} direction='column'>
                {Options.map((props, index) => (
                    <SidePanelOption key={index} {...props} />
                ))}
            </Grid>
            <Box display='flex' flex={1} />
            <Box className={classes.bottomOptions}>
                {isExpanded ? (
                    <Box className={classes.footer}>
                        <Typography><a className={classes.footerRow} href={getDownloadSiteMapXMLLink(REACT_APP_PACKRAT_SERVER_ENDPOINT)} target='_blank' rel='noopener noreferrer'>Site Map</a></Typography>
                        <Typography className={classes.footerRow}>{`(C) 2020 - ${(new Date().getFullYear())} by Smithsonian Institution`}</Typography>
                    </Box>
                ): null}

                {isExpanded ? (
                    <Box alignSelf={'flex-end'}>
                        <FaChevronLeft className={classes.anchor} size={20} color={Colors.defaults.white} onClick={onToggle} />
                    </Box>
                ) : (
                    <FaChevronRight className={classes.anchor} size={20} color={Colors.defaults.white} onClick={onToggle} />
                )}
            </Box>
        </Box>
    );
}

export default memo(SidePanel);

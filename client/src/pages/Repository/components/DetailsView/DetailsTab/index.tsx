/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * DetailsTab
 *
 * This component renders details tab for the DetailsView component.
 */
import { Box, Tab, TabProps, Tabs } from '@material-ui/core';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { StateRelatedObject } from '../../../../../store';
import { RelatedObjectType } from '../../../../../types/graphql';
import { eSystemObjectType } from '../../../../../types/server';
import RelatedObjectsList from '../../../../Ingestion/components/Metadata/Model/RelatedObjectsList';
import { useDetailsTabData } from '../../../hooks/useDetailsView';
import ActorDetails from './ActorDetails';
import AssetDetails from './AssetDetails';
import AssetDetailsTable from './AssetDetailsTable';
import AssetVersionDetails from './AssetVersionDetails';
import AssetVersionsTable from './AssetVersionsTable';
import CaptureDataDetails from './CaptureDataDetails';
import IntermediaryFileDetails from './IntermediaryFileDetails';
import ItemDetails from './ItemDetails';
import ModelDetails from './ModelDetails';
import ProjectDetails from './ProjectDetails';
import ProjectDocumentationDetails from './ProjectDocumentationDetails';
import SceneDetails from './SceneDetails';
import StakeholderDetails from './StakeholderDetails';
import SubjectDetails from './SubjectDetails';
import UnitDetails from './UnitDetails';

const useStyles = makeStyles(({ palette }) => ({
    tab: {
        backgroundColor: fade(palette.primary.main, 0.25)
    },
    tabpanel: {
        backgroundColor: fade(palette.primary.main, 0.25)
    }
}));

type DetailsTabParams = {
    disabled: boolean;
    idSystemObject: number;
    objectType: eSystemObjectType;
    sourceObjects: StateRelatedObject[];
    derivedObjects: StateRelatedObject[];
    onAddSourceObject: () => void;
    onAddDerivedObject: () => void;
};

function DetailsTab(props: DetailsTabParams): React.ReactElement {
    const { disabled, idSystemObject, objectType, sourceObjects, derivedObjects, onAddSourceObject, onAddDerivedObject } = props;
    const [tab, setTab] = useState(0);
    const classes = useStyles();

    const handleTabChange = (_, nextTab: number) => {
        setTab(nextTab);
    };

    const detailsQueryResult = useDetailsTabData(idSystemObject, objectType);

    let tabs: string[] = [];

    let tabPanels: React.ReactNode = null;

    const RelatedTab = (index: number) => (
        <TabPanel value={tab} index={index}>
            <RelatedObjectsList
                viewMode
                disabled={disabled}
                type={RelatedObjectType.Source}
                relatedObjects={sourceObjects}
                onAdd={onAddSourceObject}
            />
            <RelatedObjectsList
                viewMode
                disabled={disabled}
                type={RelatedObjectType.Derived}
                relatedObjects={derivedObjects}
                onAdd={onAddDerivedObject}
            />
        </TabPanel>
    );

    switch (objectType) {
        case eSystemObjectType.eUnit:
            tabs = ['Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <UnitDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(1)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eProject:
            tabs = ['Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <ProjectDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(1)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eSubject:
            tabs = ['Assets', 'Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <AssetDetailsTable idSystemObject={idSystemObject} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <SubjectDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(2)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eItem:
            tabs = ['Assets', 'Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <AssetDetailsTable idSystemObject={idSystemObject} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <ItemDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(2)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eCaptureData:
            tabs = ['Assets', 'Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <AssetDetailsTable idSystemObject={idSystemObject} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <CaptureDataDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(2)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eModel:
            tabs = ['Assets', 'Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <AssetDetailsTable idSystemObject={idSystemObject} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <ModelDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(2)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eScene:
            tabs = ['Assets', 'Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <AssetDetailsTable idSystemObject={idSystemObject} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <SceneDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(2)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eIntermediaryFile:
            tabs = ['Assets', 'Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <AssetDetailsTable idSystemObject={idSystemObject} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <IntermediaryFileDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(2)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eProjectDocumentation:
            tabs = ['Assets', 'Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <AssetDetailsTable idSystemObject={idSystemObject} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <ProjectDocumentationDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(2)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eAsset:
            tabs = ['Versions', 'Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <AssetVersionsTable idSystemObject={idSystemObject} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <AssetDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(2)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eAssetVersion:
            tabs = ['Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <AssetVersionDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(1)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eActor:
            tabs = ['Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <ActorDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(1)}
                </React.Fragment>
            );
            break;
        case eSystemObjectType.eStakeholder:
            tabs = ['Details', 'Related'];
            tabPanels = (
                <React.Fragment>
                    <TabPanel value={tab} index={0}>
                        <StakeholderDetails {...detailsQueryResult} disabled={disabled} />
                    </TabPanel>
                    {RelatedTab(1)}
                </React.Fragment>
            );
            break;
        default:
            tabs = ['Unknown'];
            break;
    }

    return (
        <Box display='flex' flex={1} flexDirection='column' mt={2}>
            <Tabs
                value={tab}
                classes={{ root: classes.tab }}
                indicatorColor='primary'
                textColor='primary'
                onChange={handleTabChange}
            >
                {tabs.map((tab: string, index: number) => <StyledTab key={index} label={tab} />)}
            </Tabs>
            {tabPanels}
        </Box>
    );
}

function TabPanel(props: any): React.ReactElement {
    const { children, value, index, ...rest } = props;
    const classes = useStyles();

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            aria-labelledby={`tab-${index}`}
            {...rest}
        >
            {value === index && (
                <Box p={1} className={classes.tabpanel} minHeight='20vh' width='50vw'>
                    {children}
                </Box>
            )}
        </div>
    );
}

const StyledTab = withStyles(({ palette }) => ({
    root: {
        color: palette.background.paper,
        '&:focus': {
            opacity: 1
        },
    },
}))((props: TabProps) => <Tab disableRipple {...props} />);

export default DetailsTab;
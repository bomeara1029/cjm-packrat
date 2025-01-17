/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Repository
 *
 * This component renders Repository UI and all the sub-components like Filter and
 * TreeView.
 */
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router';
import { REPOSITORY_ROUTE, resolveRoute } from '../../constants';
import { useControlStore, useRepositoryStore } from '../../store';
import { eMetadata, eSystemObjectType } from '@dpo-packrat/common';
import { generateRepositoryUrl, parseRepositoryUrl } from '../../utils/repository';
import DetailsView from './components/DetailsView';
import RepositoryFilterView from './components/RepositoryFilterView';
import RepositoryTreeView from './components/RepositoryTreeView';
import { Helmet } from 'react-helmet';
import VoyagerStoryView from './components/DetailsView/VoyagerStoryView';

const useStyles = makeStyles(({ breakpoints }) => ({
    container: {
        display: 'flex',
        flex: 1,
        width: 'fit-content',
        maxWidth: '100%',
        flexDirection: 'column',
        padding: 20,
        paddingBottom: 0,
        paddingRight: 0,
        [breakpoints.down('lg')]: {
            paddingRight: 20
        },
        height: 'calc(100vh - 80px)',
        overflowY: 'auto'
    }
}));

export type RepositoryFilter = {
    search: string;
    keyword: string;
    repositoryRootType: eSystemObjectType[];
    objectsToDisplay: eSystemObjectType[];
    metadataToDisplay: eMetadata[];
    units: number[];
    projects: number[];
    has: eSystemObjectType[];
    missing: eSystemObjectType[];
    captureMethod: number[];
    variantType: number[];
    modelPurpose: number[];
    modelFileType: number[];
    dateCreatedFrom?: Date | string | null;
    dateCreatedTo?: Date | string | null;
    cursorMark?: string | null;
    idRoot?: number | null;
};

function Repository(): React.ReactElement {

    return (
        <Routes>
            <Route path='details/:idSystemObject' element={<DetailsView />} />
            <Route path={resolveRoute(REPOSITORY_ROUTE.ROUTES.VOYAGER)} element={<VoyagerStoryView />} />
            <Route path={resolveRoute(REPOSITORY_ROUTE.ROUTES.VIEW)} element={<TreeViewPage />} />
        </Routes>
    );
}

function TreeViewPage(): React.ReactElement {
    const sideBarExpanded = useControlStore(state => state.sideBarExpanded);
    const classes = useStyles(sideBarExpanded);

    const location = useLocation();
    const {
        search,
        repositoryRootType,
        objectsToDisplay,
        metadataToDisplay,
        units,
        projects,
        has,
        missing,
        captureMethod,
        variantType,
        modelPurpose,
        modelFileType,
        dateCreatedFrom,
        dateCreatedTo,
        idRoot,
        updateRepositoryFilter
    } = useRepositoryStore();
    const queries: RepositoryFilter = parseRepositoryUrl(location.search);
    const isRepository = location.pathname.startsWith('/repository');

    const setDefaultFilterSelectionsCookie = () => {
        document.cookie = `filterSelections=${JSON.stringify({
            repositoryRootType: [],
            objectsToDisplay: [],
            metadataToDisplay: [eMetadata.eHierarchyUnit, eMetadata.eHierarchySubject, eMetadata.eHierarchyItem],
            units: [],
            projects: [],
            has: [],
            missing: [],
            captureMethod: [],
            variantType: [],
            modelPurpose: [],
            modelFileType: [],
            dateCreatedFrom: null,
            dateCreatedTo: null,
            idRoot: null
        })};path=/`;
    };

    /*
        Sets up a default cookie if no filterSelection cookie exists.
        If a filterSelection cookie exists, component will read that
        and generate URL and state based on cookie.
    */
    let cookieFilterSelections;
    (function setRepositoryViewCookies() {
        if ((!document.cookie.length || document.cookie.indexOf('filterSelections') === -1) && isRepository) {
            setDefaultFilterSelectionsCookie();
        }
        cookieFilterSelections = document.cookie.split(';');
        cookieFilterSelections = cookieFilterSelections.find(entry => entry.trim().startsWith('filterSelections'));
        if (cookieFilterSelections) cookieFilterSelections = JSON.parse(cookieFilterSelections.split('=')[1]);
    })();

    const initialFilterState = Object.keys(queries).length ? queries : cookieFilterSelections;

    useEffect(() => {
        const newUrl = generateRepositoryUrl(initialFilterState);
        // console.log(`*** src/pages/Repository/index.tsx TreeViewPage useEffect window.history.pushState(path: ${route}, '', ${newUrl})`);
        window.history.pushState({ path: route }, '', newUrl);
        updateRepositoryFilter(initialFilterState, true);
    }, [updateRepositoryFilter, location.search]);

    const newRepositoryFilterState: any = {
        search,
        repositoryRootType,
        objectsToDisplay,
        metadataToDisplay,
        units,
        projects,
        has,
        missing,
        captureMethod,
        variantType,
        modelPurpose,
        modelFileType,
        dateCreatedFrom,
        dateCreatedTo,
        idRoot
    };
    const route = generateRepositoryUrl(newRepositoryFilterState) || generateRepositoryUrl(cookieFilterSelections);
    if (route !== location.search) {
        window.history.pushState({ path: route }, '', route);
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Repository</title>
            </Helmet>
            <Box className={classes.container}>

                <RepositoryFilterView />
                <RepositoryTreeView />
            </Box>
        </React.Fragment>
    );
}

export default Repository;

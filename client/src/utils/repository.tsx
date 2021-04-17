/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Repository utilities
 *
 * Utilities for components associated with Repository UI.
 */
import { CheckboxProps } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import lodash from 'lodash';
import * as qs from 'query-string';
import React from 'react';
import { AiOutlineFileText } from 'react-icons/ai';
import { RepositoryIcon, RepositoryIconProps } from '../components';
import { RepositoryFilter } from '../pages/Repository';
import { TreeViewColumn } from '../pages/Repository/components/RepositoryTreeView/MetadataView';
import { metadataToDisplayOptions } from '../pages/Repository/components/RepositoryFilterView/RepositoryFilterOptions';
import { StateRelatedObject } from '../store';
import { palette } from '../theme';
import Colors, { RepositoryColorVariant } from '../theme/colors';
import { NavigationResultEntry } from '../types/graphql';
import { eMetadata, eSystemObjectType } from '../types/server';

export function getSystemObjectTypesForFilter(filter: RepositoryFilter): eSystemObjectType[] {
    const objectTypes: eSystemObjectType[] = [];

    if (filter.units) {
        objectTypes.push(eSystemObjectType.eUnit);
    }

    if (filter.projects) {
        objectTypes.push(eSystemObjectType.eProject);
    }

    return objectTypes;
}

// prettier-ignore
export function getTermForSystemObjectType(objectType: eSystemObjectType): string {
    switch (objectType) {
        case eSystemObjectType.eUnit:                   return 'Unit';
        case eSystemObjectType.eProject:                return 'Project';
        case eSystemObjectType.eSubject:                return 'Subject';
        case eSystemObjectType.eItem:                   return 'Item';
        case eSystemObjectType.eCaptureData:            return 'Capture Data';
        case eSystemObjectType.eModel:                  return 'Model';
        case eSystemObjectType.eScene:                  return 'Scene';
        case eSystemObjectType.eIntermediaryFile:       return 'Intermediary File';
        case eSystemObjectType.eProjectDocumentation:   return 'Project Documentation';
        case eSystemObjectType.eAsset:                  return 'Asset';
        case eSystemObjectType.eAssetVersion:           return 'Asset Version';
        case eSystemObjectType.eActor:                  return 'Actor';
        case eSystemObjectType.eStakeholder:            return 'Stakeholder';
        default:                                        return 'Unknown';
    }
}

export function getRepositoryTreeNodeId(idSystemObject: number, objectType: eSystemObjectType, idObject: number): string {
    return `${idSystemObject}-${eSystemObjectType[objectType]}-${idObject}`;
}

type ParsedNodeId = {
    idSystemObject: number;
    idObject: number;
    objectType: eSystemObjectType;
};

export function parseRepositoryTreeNodeId(nodeId: string): ParsedNodeId {
    const [nodeSystemObjectId, nodeObjectType, nodeObjectId] = nodeId.split('-');
    const idSystemObject = Number.parseInt(nodeSystemObjectId, 10);
    const objectType = Number.parseInt(nodeObjectType, 10);
    const idObject = Number.parseInt(nodeObjectId, 10);

    return {
        idSystemObject,
        objectType,
        idObject
    };
}

export function getSortedTreeEntries(entries: NavigationResultEntry[]): NavigationResultEntry[] {
    return lodash.orderBy(entries, [(entry: NavigationResultEntry) => entry.name.toLowerCase()], 'asc');
}

export function trimmedMetadataField(value: string, start: number, end: number): string {
    const { length } = value;
    if (length < 30) return value;
    return `${value.substring(0, start)}...${value.substring(length - end, length)}`;
}

export function parseRepositoryUrl(search: string): any {
    return qs.parse(search, {
        parseBooleans: true,
        parseNumbers: true,
        arrayFormat: 'comma'
    });
}

export function generateRepositoryUrl(filter: RepositoryFilter): string {
    return `?${qs.stringify(filter, {
        arrayFormat: 'comma',
        skipEmptyString: true
    })}`;
}

export function getTreeWidth(columnSize: number, sideBarExpanded: boolean, fullWidth: boolean): string {
    const computedWidth = 50 + columnSize * 10;
    const isXLScreen = window.innerWidth >= 1600;

    if (fullWidth) {
        return '98vw';
    }

    if (computedWidth <= 80) {
        if (isXLScreen) {
            if (sideBarExpanded) return '85vw';
            return '93vw';
        } else {
            if (sideBarExpanded) return '81.5vw';
            return '91vw';
        }
    }

    return `${computedWidth}vw`;
}

export function getTreeColorVariant(index: number): RepositoryColorVariant {
    return index % 2 ? RepositoryColorVariant.light : RepositoryColorVariant.regular;
}

// cached data, computed once
let metadataTitleMap: Map<eMetadata, string> | null = null;

// prettier-ignore
export function getTreeViewColumns(metadataColumns: eMetadata[], isHeader: boolean, values?: string[]): TreeViewColumn[] {
    const treeColumns: TreeViewColumn[] = [];
    const MIN_SIZE = 5;

    if (!metadataTitleMap) {
        metadataTitleMap = new Map<eMetadata, string>();
        for (const filterOption of metadataToDisplayOptions)
            metadataTitleMap.set(filterOption.value, filterOption.label);
    }

    metadataColumns.forEach((metadataColumn, index: number) => {
        const treeColumn: TreeViewColumn = {
            metadataColumn,
            label: values ? values[index] : 'Unknown',
            size: MIN_SIZE
        };

        if (isHeader)
            treeColumn.label = metadataTitleMap ? (metadataTitleMap.get(metadataColumn) || 'Unknown') : 'Unknown';

        switch (metadataColumn) {
            case eMetadata.eHierarchySubject:   treeColumn.size = MIN_SIZE * 3; break;
            case eMetadata.eHierarchyItem:      treeColumn.size = MIN_SIZE * 3; break;
            default: break;
        }

        treeColumns.push(treeColumn);
    });

    return treeColumns;
}

export function computeMetadataViewWidth(treeColumns: TreeViewColumn[]): string {
    return `${treeColumns.reduce((prev, current) => prev + current.size, 0)}vw`;
}

type ObjectInterfaceDetails = {
    icon: React.ReactNode;
    color: string;
};

// prettier-ignore
export function getObjectInterfaceDetails(objectType: eSystemObjectType, variant: RepositoryColorVariant): ObjectInterfaceDetails {
    const color: string = Colors.repository[objectType][variant];
    const textColor: string = Colors.defaults.white;
    const backgroundColor: string = Colors.repository[objectType][RepositoryColorVariant.dark] || Colors.repository.default[RepositoryColorVariant.dark];

    const iconProps: RepositoryIconProps = { objectType, backgroundColor, textColor, overrideText: undefined };

    switch (objectType) {
        default:                                        break;
        case eSystemObjectType.eIntermediaryFile:       iconProps.overrideText = 'IF'; break;
        case eSystemObjectType.eProjectDocumentation:   iconProps.overrideText = 'PD'; break;
        case eSystemObjectType.eActor:                  iconProps.overrideText = 'AC'; break;
        case eSystemObjectType.eStakeholder:            iconProps.overrideText = 'ST'; break;

        case eSystemObjectType.eAsset:
        case eSystemObjectType.eAssetVersion:
            return { icon: <AiOutlineFileText />, color };
    }
    return { icon: <RepositoryIcon {...iconProps} />, color };
}

export function sortEntriesAlphabetically(entries: NavigationResultEntry[]): NavigationResultEntry[] {
    return lodash.orderBy(entries, [entry => entry.name.toLowerCase().trim()], ['asc']);
}

export function isRepositoryItemSelected(nodeId: string, sourceObjects: StateRelatedObject[]): boolean {
    const { idSystemObject } = parseRepositoryTreeNodeId(nodeId);
    const idSystemObjects: number[] = sourceObjects.map(({ idSystemObject }) => idSystemObject);

    return idSystemObjects.includes(idSystemObject);
}

export function getDetailsUrlForObject(idSystemObject: number): string {
    return `/repository/details/${idSystemObject}`;
}

// prettier-ignore
export function getTreeViewStyleHeight(isExpanded: boolean, isModal: boolean, breakpoint: Breakpoint): string {
    const isSmallScreen: boolean = breakpoint === 'lg';

    if (isExpanded) {
        if (isModal) return isSmallScreen ? '45vh' : '55vh';
        else return isSmallScreen ? '54vh' : '62vh';
    } else {
        if (isModal) return isSmallScreen ? '70vh' : '75vh';
        else return isSmallScreen ? '79vh' : '82vh';
    }
}

export function getTreeViewStyleWidth(sideBarExpanded: boolean, breakpoint: Breakpoint): string {
    const isSmallScreen: boolean = breakpoint === 'lg';

    if (sideBarExpanded) return isSmallScreen ? '81.5vw' : '85vw';
    else return isSmallScreen ? '92vw' : '93vw';
}

export function validateArray<T>(value: T[], defaultValue: T[]): T[] {
    const result: T[] = [];

    if (!value) {
        result.push(...defaultValue);
    } else if (Array.isArray(value)) {
        result.push(...value);
    } else {
        result.push(value);
    }

    return result;
}

export function isFieldUpdated(updatedData: any, originalData: any, fieldName: string): boolean {
    return originalData?.[fieldName] !== updatedData?.[fieldName];
}

export function getUpdatedCheckboxProps(updated: boolean): CheckboxProps {
    return {
        style: { border: `1px solid ${updated ? palette.secondary.main : 'transparent'}` },
        color: updated ? 'secondary' : 'primary'
    };
}
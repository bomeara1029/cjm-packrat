/**
 * Shared utilities
 *
 * Shared utilities for components, functionality.
 */
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const withDefaultValueBoolean = (value: boolean | null, defaultValue: boolean): boolean => value || defaultValue;

export const withDefaultValueNumber = (value: number | null, defaultValue: number | null): number => {
    if (value) {
        return value;
    }

    if (defaultValue === null) throw new Error('Default value is null');

    return defaultValue;
};

export function nonNullValue<T>(name: string, value: T | null | undefined): T {
    if (value === null || value === undefined) throw new Error(`Provided ${name} is null`);

    return value;
}

export const actionOnKeyPress = (key: string, actionKey: string, func: () => void): void => {
    if (key === actionKey) {
        func();
    }
};

export const multiIncludes = (text: string, values: string[]): boolean => {
    const expression = new RegExp(values.join('|'));
    return expression.test(text);
};

export const scrollBarProperties = (vertical: boolean, horizontal: boolean, backgroundColor: string): CSSProperties => ({
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': {
        '-webkit-appearance': 'none',
        maxWidth: 8
    },
    '&::-webkit-scrollbar:vertical': vertical ? { width: 12 } : null,
    '&::-webkit-scrollbar:horizontal': horizontal ? { height: 12 } : null,
    '&::-webkit-scrollbar-thumb': {
        borderRadius: 10,
        backgroundColor
    }
});

import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import lodash from 'lodash';
import React from 'react';
import { useProject } from '../../../../store';

const useStyles = makeStyles(({ palette }) => ({
    projectSelect: {
        width: '100%',
        padding: '0px 10px',
        backgroundColor: palette.background.paper,
        fontSize: '0.8em'
    }
}));

function ProjectList(): React.ReactElement {
    const classes = useStyles();
    const [projects, getSelectedProject, updateSelectedProject] = useProject(state => [state.projects, state.getSelectedProject, state.updateSelectedProject]);

    const noProjects = !projects.length;
    const selectedProject = getSelectedProject();

    const uniqueSortedProjects = lodash.uniqBy(lodash.orderBy(projects, 'name', 'asc'), 'name');

    return (
        <Select
            value={selectedProject?.id || 'none'}
            disabled={noProjects}
            className={classes.projectSelect}
            renderValue={() => `${selectedProject?.name || 'none'}`}
            onChange={({ target: { value } }) => updateSelectedProject(value as number)}
            disableUnderline
        >
            <MenuItem value='none'>none</MenuItem>
            {uniqueSortedProjects.map(({ id, name }, index: number) => <MenuItem key={index} value={id}>{name}</MenuItem>)}
        </Select>
    );
}

export default ProjectList;
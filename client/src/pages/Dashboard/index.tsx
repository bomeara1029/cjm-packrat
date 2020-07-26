import React, { useContext } from 'react';
import { Box, Typography, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../constants';
import API from '../../api';
import { AppContext } from '../../context';

const useStyles = makeStyles(({ spacing }) => ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutButton: {
        marginTop: spacing(5)
    }
}));

function Dashboard(): React.ReactElement {
    const { user, updateUser } = useContext(AppContext);
    const classes = useStyles();
    const history = useHistory();

    const onLogout = async () => {
        const { success } = await API.logout();

        if (success) {
            updateUser(null);
            history.push(Routes.LOGIN);
        }
    };

    return (
        <Box className={classes.container}>
            <Typography color='primary' variant='h4'>Dashboard</Typography>
            <Typography color='primary' variant='body1'>Welcome, {user?.Name}</Typography>
            <Button
                onClick={onLogout}
                className={classes.logoutButton}
                variant='outlined'
                color='primary'
                endIcon={<Icon>logout</Icon>}
            >
                Logout
            </Button>
        </Box>
    );
}

export default Dashboard;
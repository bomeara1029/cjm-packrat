import { ApolloProvider } from '@apollo/client';
import { Box, CircularProgress, ThemeProvider } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrivateRoute, PublicRoute } from './components';
import { ROUTES } from './constants';
import { AppContext, AppContextProvider } from './context';
import './global/root.css';
import { apolloClient } from './graphql';
import { About, Home, Login } from './pages';
import theme from './theme';
import { getAuthenticatedUser } from './utils/auth';
import { AliveScope } from 'react-activation';
import * as serviceWorker from './serviceWorker';

function AppRouter(): React.ReactElement {
    const [loading, setLoading] = useState(true);
    const { user, updateUser } = useContext(AppContext);

    const initialize = useCallback(async () => {
        if (!user) {
            const authenticatedUser = await getAuthenticatedUser();
            updateUser(authenticatedUser);
            setLoading(false);
        }
    }, [user, updateUser]);

    useEffect(() => {
        initialize();
    }, [initialize]);


    return (
        <Router>
            {loading ? (
                <Box display='flex' flex={1} alignItems='center' justifyContent='center'>
                    <CircularProgress color='primary' size={30} />
                </Box>
            ) : (
                <React.Fragment>
                    <Switch>
                        <PublicRoute restricted exact path={ROUTES.LOGIN} component={Login} />
                        <PublicRoute exact path={ROUTES.ABOUT} component={About} />
                        <PrivateRoute path={ROUTES.HOME}>
                            <AliveScope>
                                <Home />
                            </AliveScope>
                        </PrivateRoute>
                    </Switch>
                </React.Fragment>
            )}
        </Router>
    );
}

function App(): React.ReactElement {
    return (
        <ApolloProvider client={apolloClient}>
            <AppContextProvider>
                <ThemeProvider theme={theme}>
                    <AppRouter />
                    <ToastContainer
                        transition={Slide}
                        position='bottom-right'
                        autoClose={5000}
                        closeOnClick
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </ThemeProvider>
            </AppContextProvider>
        </ApolloProvider>
    );
}

serviceWorker.unregister();
ReactDOM.render(<App />, document.getElementById('root'));

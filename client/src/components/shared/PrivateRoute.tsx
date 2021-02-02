/**
 * PrivateRoute
 *
 * Renders a route only if the user is authenticated else redirects to login.
 */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useUserStore } from '../../store';

interface PrivateRouteProps extends RouteProps {
    component?: React.ComponentType<unknown>;
    children?: React.ReactNode;
}

function PrivateRoute({ component: Component, children, ...rest }: PrivateRouteProps): React.ReactElement {
    const user = useUserStore(state => state.user);

    const render = props => {
        if (!user) {
            return <Redirect to={ROUTES.LOGIN} />;
        } else {
            if (Component) {
                return <Component {...props} />;
            } else {
                return children;
            }
        }
    };

    return <Route {...rest} render={render} />;
}

export default PrivateRoute;
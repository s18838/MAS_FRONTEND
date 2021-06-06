import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { authenticationService } from '../../_services/authentication.service'

interface PrivateRouteProp extends RouteProps {
    roles?: string[]
}

export const PrivateRoute = ({ component, roles, ...rest }: PrivateRouteProp) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;

        console.log(currentUser)
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/authorize', state: { from: props.location } }} />;
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />;
        }

        // authorised so return component
        return <Route {...props} component={component}/>;
    }} />
)

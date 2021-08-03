import React, { useContext } from 'react';
import { AuthContext } from '../provider/auth';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {

    const { user } = useContext(AuthContext);

    return (
        <Route 
            {...rest}
            render={props =>
                ((user.token && user.token.length > 1)) ? (
                    <Component {...rest}/>
                ) : (
                    <Redirect to={{pathname: "/", state: { from: props.location } }} />
                )
            }
        />
    )
}

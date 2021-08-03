import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Crud from '../pages/Crud/Index';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>

            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/crud" component={Crud}/>

            <Route path="/err" component={NotFound}/>
            <Redirect to="/err" from="*"/>
        </Switch>
    </BrowserRouter>
);

export default Routes;
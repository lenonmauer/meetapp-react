import React from 'react';

import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';

import Main from '../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Preferences from '../pages/Preferences';
import Profile from '../pages/Profile';
import Logout from '../pages/Logout';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <PrivateRoute exact path="/main" component={Main} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <PrivateRoute exact path="/preferences" component={Preferences} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <Route exact path="/logout" component={Logout} />
  </Switch>
);

export default Routes;

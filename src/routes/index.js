import React from 'react';

import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Preferences from '../pages/Preferences';
import NewMeetup from '../pages/NewMeetup';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import Logout from '../pages/Logout';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/logout" component={Logout} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/preferences" component={Preferences} />
    <PrivateRoute exact path="/new-meetup" component={NewMeetup} />
    <PrivateRoute exact path="/search" component={Search} />
    <PrivateRoute exact path="/profile" component={Profile} />
  </Switch>
);

export default Routes;

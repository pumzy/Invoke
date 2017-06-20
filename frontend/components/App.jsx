import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import DefaultHomePage from './default_home_page'
import LoggedInHomePage from './logged_in_home_page'
import SessionForm from './session_form'

const App = () =>(
  <div>
    <AuthRoute path="/" component={DefaultHomePage} />
    <AuthRoute path="/login" component={SessionForm} />
    <AuthRoute path="/signup" component={SessionForm} />
  </div>
);

export default App;
// <ProtectedRoute exact path="/stream" component={LoggedInHomePage} />

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import DefaultHomePage from './default_home_page'
import LoggedInHomePage from './logged_in_home_page'

const App = () =>(
  <div>
    <Switch>
      <AuthRoute exact path="/" component={DefaultHomePage} />
      <ProtectedRoute exact path="/stream" component={LoggedInHomePage} />
    </Switch>
  </div>
);

export default App;

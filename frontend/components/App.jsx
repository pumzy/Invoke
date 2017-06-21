import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import DefaultHomePage from './default_home_page'
import LoggedInHomePage from './logged_in_home_page'
import SessionForm from './session_form'
import SongIndex from './songsindexcontainer'
import BottomPlayBar from './bottomplaybar'

const App = () =>(
  <div className="invisible">
    <AuthRoute path="/" component={DefaultHomePage} />
    <ProtectedRoute exact path="/stream" component={LoggedInHomePage} />
    <ProtectedRoute exact path="/stream" component={SongIndex} />
    <ProtectedRoute exact path="/test" component={SongIndex} />
    <ProtectedRoute path="/" component={BottomPlayBar} />
  </div>
);

export default App;

// <AuthRoute path="/login" component={SessionForm} />
// <AuthRoute path="/signup" component={SessionForm} />

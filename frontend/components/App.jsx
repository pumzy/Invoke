import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import DefaultHomePage from './default_home_page'
import LoggedInHomePage from './logged_in_home_page'
import SessionForm from './session_form'
import SongIndex from './songsindexcontainer'
import BottomPlayBar from './bottomplaybar'
import NavBar from './navbar'
import UserPage from './userpage'
import SongPage from './songpage'
import Error404 from './404page'
import SongUpdate from './edit';
import SongUpload from './upload'
import SongChartIndex from './songchartindex'
import Search from './search'




const App = () =>(
  <div className="centerme">
  <header><ProtectedRoute path="/" component={NavBar} /></header>
  <div className="invisible">
  <AuthRoute path="/" component={DefaultHomePage} />
    <Switch>
      <ProtectedRoute exact path="/stream" component={LoggedInHomePage} />
      <ProtectedRoute exact path="/charts" component={SongChartIndex} />
      <ProtectedRoute path="/areyoulost" component={Error404} />
      <ProtectedRoute path="/upload" component={SongUpload} />
      <ProtectedRoute path='/search' component={Search} />
      <ProtectedRoute exact path="/:username" component={UserPage} />
      <ProtectedRoute exact path="/:username/:title/edit" component={SongUpdate} />
      <ProtectedRoute exact path="/you/:path" component={Error404} />
      <ProtectedRoute exact path="/:username/:title" component={SongPage} />
    </Switch>
  </div>
  <ProtectedRoute path="/" component={BottomPlayBar} />
  </div>
);

export default App;

// <ProtectedRoute exact path="/stream" component={SongIndex} />

// <AuthRoute path="/login" component={SessionForm} />
// <AuthRoute path="/signup" component={SessionForm} />

// <div>
// <header><ProtectedRoute exact path="/" component={NavBar} /></header>
// <div className="invisible">
//   <AuthRoute path="/" component={DefaultHomePage} />
//   <ProtectedRoute exact path="/stream" component={LoggedInHomePage} />
//   <ProtectedRoute exact path="/stream" component={SongIndex} />
//   <ProtectedRoute exact path="/test" component={SongIndex} />
// </div>
// <ProtectedRoute path="/" component={BottomPlayBar} />
// </div>

import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/session_actions'
import NavBar from './navbar'
import SongIndex from './songsindexcontainer'


class LoggedInHomePage extends React.Component {
  // constructor(){
  //   // this.currentUser = this.props.currentUser;
  // }

  handleLogout(){
    this.props.logout().then(() => this.props.history.push("/login") )
  }

  render(){
      return (
        <div>
          <Route exact path="/stream" component={SongIndex} />
        </div>
      );
    }
  }



const mapStateToProps = (state) => {
  return { currentUser: state.session.currentUser }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInHomePage);

// <NavBar />

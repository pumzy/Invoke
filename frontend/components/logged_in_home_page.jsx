import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/session_actions'

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
          <h1> Welcome {this.props.currentUser.username} </h1>
          <button onClick={this.props.logout}>Log Out!</button>
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

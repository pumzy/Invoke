import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/session_actions'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionForm from './session_form'



class Greeting extends React.Component   {
  // constructor(){
  //   // this.currentUser = this.props.currentUser;
  // }
  handleLogout(){
    this.props.logout().then(() => this.props.history.push("/login") )
  }

  render(){
    let heading = <h1>This will appear on both pages</h1>
    if (this.props.currentUser) {
      return (
        <div>
          {heading}
          <h1> Welcome {this.props.currentUser.username} </h1>
          <button onClick={this.props.logout}> Log Out!</button>
        </div>
      );
    } else {
      return (
        <div>
          {heading}
        <Link to='/signup'> Sign Up </Link>
        <Link to='/login'> Log In </Link>
        </div>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);






// <AuthRoute path="/login" component={SessionForm} />
// <AuthRoute path="/signup" component={SessionForm} />

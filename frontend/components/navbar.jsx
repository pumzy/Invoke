import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/session_actions'



class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.wildcard =  "/" + `${this.props.currentUser.id}`;

    this.logout = this.props.logout.bind(this)
  }

  render(){

    return(
    <div className="navbar-container">
    <nav className="navbar">
      <ul className="navigation-left">
        <li> <NavLink to="/stream" > <div className="navbarlogo"></div> </NavLink> </li>
        <li> <NavLink to="/stream" > Home </NavLink> </li>
        <li> <NavLink to="/you/collection"> Collection </NavLink> </li>
      </ul>
        <ul>
          <input type="search" placeholder="Search" className="nav-search"/>
        </ul>
      <ul className="navigation-right">
        <li> <NavLink to="/upload"> Upload </NavLink></li>
        <li className="user-dropdown" > <a> <img src={this.props.currentUser.avatar_url} className="nav-profile-photo"/ > <span className="nav-username" >{this.props.currentUser.username} </span></a>
          <ul className="user-dropdown-ul">
          <li className="user-dropdown-li first-child"> <NavLink to={`/${this.props.currentUser.username}`}> Profile </NavLink></li>
          <li className="user-dropdown-li"> <NavLink to="/you/likes"> Likes </NavLink> </li>
          <li className="user-dropdown-li"> <NavLink to="/you/following"> Following </NavLink> </li>
          <li className="user-dropdown-li"> <NavLink to="/discover"> Discover </NavLink> </li>
          <li className="user-dropdown-li"> <a onClick={this.logout} className="navbar-logout">Logout</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

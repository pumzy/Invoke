import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/session_actions'




class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.wildcard =  "/" + `${this.props.currentUser.id}`;
    this.results = null;
    this.logout = this.props.logout.bind(this)
    this.update = this.update.bind(this);
    this.queryusers = null;
    this.querysongs = null;
    this.state = {
      query: ""
    }
  }

  update(field) {


    this.querysongs = [...new Set(this.props.songs)].slice(0,5).filter(song => song.includes(this.state.query)).map(song => <li className="navbar-search-item">{song}</li>)
    this.queryusers = [...new Set(this.props.users)].slice(0,5).filter(user => user.includes(this.state.query)).map(user => <li className="navbar-search-item">{user}</li>)


    if (this.state.query !== ""){

    this.results = <ul className="navbar-search-dropdown-ul">
        <li className="navbar-search-dropdown-header-1">Search for <q>{this.state.query}</q></li>
              <li className="navbar-search-dropdown-header">{this.querysongs.length > 0 ? "Songs" : null}</li>
              {this.querysongs}
              <li className="navbar-search-dropdown-header">{this.queryusers.length > 0 ? "Users" : null}</li>
              {this.queryusers}
                  </ul>
  } else {
    this.results = null;
  }
  return e => this.setState({
    [field]: e.currentTarget.value
  });

  }


  render(){



    return(
    <div className="navbar-container">
    <div className="navbar-color"></div>
    <nav className="navbar">
      <ul className="navigation-left">
        <li className="navbarlogo"> <NavLink to="/stream" > <div className=""></div> </NavLink> </li>
        <li> <NavLink to="/stream" > Home </NavLink> </li>
        <li> <NavLink to="/you/collection"> Collection </NavLink> </li>
      </ul>
        <ul>
          <input type="search" placeholder="Search" className="nav-search" value={this.state.query} onChange={this.update("query")}/>
          {this.results}
        </ul>
      <ul className="navigation-right">
        <li> <NavLink to="/upload"> Upload </NavLink></li>
        <li className="line" />
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
    currentUser: state.session.currentUser,
    songs: state.songs.allsongs.map(song => song.title),
    users: state.users.allusers.map(user => user.username)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

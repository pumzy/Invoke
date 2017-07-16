import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/session_actions'
import {clearUsers} from '../actions/user_actions'
import {removeSongs} from '../actions/song_actions'




class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.wildcard =  "/" + `${this.props.currentUser.id}`;
    this.results = null;
    this.logout = this.props.logout.bind(this)
    this.update = this.update.bind(this);
    this.search = this.search.bind(this)
    this.queryusers = null;
    this.querysongs = null;
    this.searchKeypress = this.searchKeypress.bind(this)
    this.songs = {}
    this.users = {}
    this.state = {
      query: ""
    }
  }

  search(){
    // his.props.removeSongs()
    // this.props.clearUsers()
    this.setState({query: ""})
    this.props.history.push(`search?q=${this.state.query}`)
  }

  searchKeypress(e){
    if (e.key === 'Enter'){
      // this.props.removeSongs()
      // this.props.clearUsers()
      this.setState({query: ""})
      this.props.history.push(`search?q=${this.state.query}`)
    }
  }

  update(field) {


    this.querysongs = Object.keys(this.songs).filter(song => song.toLowerCase().includes(this.state.query.toLowerCase())).map(song => <li className="navbar-search-item" onClick={() => {
      this.props.history.push(`/${this.songs[song]}/${song}`)
      this.setState({query: ""})}}>{song}</li>)
    this.queryusers = Object.keys(this.users).filter(user => user.toLowerCase().includes(this.state.query.toLowerCase())).map(user => <li className="navbar-search-item" onClick={() => {
      this.props.history.push(`/${user}`)
      this.setState({query: ""})}}>{user}</li>)


    if (this.state.query !== ""){

    this.results = <ul className="navbar-search-dropdown-ul">
        <li className="navbar-search-dropdown-header-1" onClick={this.search}>Search for <q>{this.state.query}</q></li>
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

  componentWillReceiveProps(nextProps){

    for (var i = 0; i < nextProps.users.length; i++) {
      this.users[nextProps.users[i]] = true
    }
    for (var i = 0; i < nextProps.songs.length; i++) {
      this.songs[nextProps.songs[i].title] = nextProps.songs[i].username
    }
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
          <input type="search" placeholder="Search" className="nav-search" value={this.state.query} onChange={this.update("query")} onKeyPress={this.searchKeypress}/>
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
    songs: state.songs.allsongs.map(song => ({title: song.title, username: song.user.username})),
    users: state.users.allusers.map(user => user.username)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    clearUsers: () => dispatch(clearUsers()),
    removeSongs: () => dispatch(removeSongs())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

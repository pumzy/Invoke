import React from 'react'
import { fetchSongsByUserID, removeSongs } from '../actions/song_actions.js'
import { fetchOneUserByID, fetchOneUser } from '../actions/user_actions.js'
import Error404 from './404page'
import {connect} from 'react-redux'
import { NavLink, Route, Switch, Redirect, Link } from 'react-router-dom';

import SongPlay from './songplaycontainer'



class UserPage extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchOneUser(this.props.match.params.username).then(response => {
      this.props.fetchSongsByUserID(response.user.id)
    });

  }

  componentWillReceiveProps(nextProps){
    if (nextProps.match.params.username !== this.props.match.params.username){
    this.props.removeSongs()
    }
  }

  componentWillUnmount(){
  }

  componentWillUpdate(nextProps){
    if (nextProps.match.params.username !== this.props.match.params.username){
      this.props.fetchOneUser(nextProps.match.params.username).then(response => {
        this.props.fetchSongsByUserID(response.user.id)
      });
    }
  }


  render(){

    let result;
    if (!this.props.user){
      result = <Error404 />
    } else {
      let songs = this.props.songs.map(song => (<SongPlay song={song} key={song.id} />));

let links =  <ul className='user-page-navlinks'>
                <li><NavLink to={`/${this.props.user.username}`}>All</NavLink></li>
                <li><NavLink to={`/${this.props.user.username}/songs`}>Tracks</NavLink></li>
                <li><NavLink to={`/${this.props.user.username}/playlists`}>Playlists</NavLink></li>
                <li><NavLink to={`/${this.props.user.username}/albums`}>Albums</NavLink></li>
                <li><NavLink to={`/${this.props.user.username}/reposts`}>Reposts</NavLink></li>
            </ul>

    result =
      <div className="usersongindex">
        <div className="user-page">
          <div className="user-page-overall">
            <div className='user-header'>
              <div className="header-replacement"></div>
              <ul className='user-information'>
                <li>
                  <span>{this.props.user.username}</span>
                </li>
              </ul>
              <div className='user-avatar' >
                <img src={this.props.user.avatar_url} />
              </div>
            </div>
            {links}
          </div>
        </div>
        <div className="userpage-belowheader">

        <ul className="songindexlist">
          {songs}
        </ul>
      </div>
      </div>

    }

    return result;
  }


}




const mapStateToProps = (state, ownProps) => {
    // let username = location.location.pathname.slice(1)
    // let user = null;
    // const getuser = new Promise((resolve, reject) => resolve(store.dispatch(fetchOneUserByID(username)))).then( () => ({user: state.users.byUsername[state.users.allusers[0]]}));
    return {user: state.users.byUsername[ownProps.match.params.username],
            songs: state.songs.allsongs }
          }
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongsByUserID: (id) => dispatch(fetchSongsByUserID(id)),
    fetchOneUser: (username) => dispatch(fetchOneUser(username)),
    removeSongs: () => dispatch(removeSongs())
  }
}

// Need to change this to a selector which gets all the songs by the artist

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

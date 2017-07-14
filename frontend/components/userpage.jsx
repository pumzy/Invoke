import React from 'react'
import { fetchSongsByUserID, removeSongs } from '../actions/song_actions.js'
import { fetchOneUserByID, fetchOneUser } from '../actions/user_actions.js'
import {  requestAudioPlaybackTime } from '../actions/audio_actions'
import Error404 from './404page'
import {connect} from 'react-redux'
import { NavLink, Route, Switch, Redirect, Link } from 'react-router-dom';
import { removeLikes } from '../actions/like_actions'
import { fetchCurrentUserFollows, fetchFollowsByUserID, removeFollows, createFollow, deleteFollow } from '../actions/follow_actions'

import SongPlay from './songplaycontainer'



class UserPage extends React.Component {

  constructor(props){
    super(props)
    this.followUser = this.followUser.bind(this )
    this.unfollowUser = this.unfollowUser.bind(this )
  }

  componentDidMount(){
    this.props.fetchOneUser(this.props.match.params.username).then(response => {
      this.props.fetchSongsByUserID(response.user.id)
      this.props.fetchFollowsByUserID(response.user.id)
    });

  }

  componentWillReceiveProps(nextProps){
    if (nextProps.match.params.username !== this.props.match.params.username){
    this.props.removeSongs()
    }
  }

  componentWillUnmount(){
    this.props.removeLikes()
    this.props.removeFollows()
  }

  componentWillUpdate(nextProps){
    if (nextProps.match.params.username !== this.props.match.params.username){
      this.props.fetchOneUser(nextProps.match.params.username).then(response => {
        this.props.fetchSongsByUserID(response.user.id)
      });
    }
  }


  followUser(e){
    e.preventDefault()
    this.props.createFollow({follow: {followee_id: this.props.user.id}})

  }

  unfollowUser(e){
    e.preventDefault()
    this.props.deleteFollow({follow: {followee_id: this.props.user.id}})

  }


  render(){


        let followbutton;
        let followedUsers =  Object.keys(this.props.follows.byFollowerID).join(",").split(",").map(key => parseInt(key))
        let followcount = followedUsers.length


        if (!isNaN(followedUsers[0])){
          if (followedUsers.includes(this.props.currentUser.id)) {
            followbutton = <button onClick={this.unfollowUser} className='userpage-follow-button-unfollow'  > Unfollow </button>
          } else {
            followbutton = <button onClick={this.followUser} className='userpage-follow-button-follow'>  Follow </button>
          }
          followcount = followedUsers.length
        } else {
          followcount = 0;
          followbutton = <button onClick={this.followUser} className='userpage-follow-button-follow'> Follow </button>
        }

    let result;
    if (!this.props.user){
      result = <Error404 />
    } else {
      let likes = [];
      if(this.props.likes.length > 0 ){
        likes = this.props.likes;
      }



      let songs = this.props.songs.map(song => (<SongPlay song={song} key={song.id} likes={likes.filter(like => like.song_id === song.id)}/>));



let links =  <ul className='user-page-navlinks'>
                <li><NavLink to={`/${this.props.user.username}`}>All</NavLink></li>
                <li><NavLink to={`/${this.props.user.username}/songs`}>Tracks</NavLink></li>
                <li><NavLink to={`/${this.props.user.username}/playlists`}>Playlists</NavLink></li>
                <li><NavLink to={`/${this.props.user.username}/albums`}>Albums</NavLink></li>
                <li><NavLink to={`/${this.props.user.username}/reposts`}>Reposts</NavLink></li>
                {followbutton}
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
        <div className='userpage-sidebar'>
          <div >
            <table className='stats'>
              <tbody className='userpage-stats-tbody'><tr>
                <td className="sidebar-stats-td">

                    <h3 className="sidebar-stats-header">Followers</h3>
                    <div className="sidebar-stats-value">{followcount}</div>

                </td>
                <td className="sidebar-stats-td">

                    <h3 className="sidebar-stats-header">Following</h3>
                    <div className="sidebar-stats-value">1</div>

                </td>
                <td className="sidebar-stats-td">

                    <h3 className="sidebar-stats-header">Tracks</h3>
                    <div className="sidebar-stats-value">{this.props.songs.length}</div>

                </td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
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
            songs: state.songs.allsongs,
          likes: state.likes.alllikes,
          follows: state.follows,
          currentUser: state.session.currentUser}
          }

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongsByUserID: (id) => dispatch(fetchSongsByUserID(id)),
    fetchOneUser: (username) => dispatch(fetchOneUser(username)),
    removeSongs: () => dispatch(removeSongs()),
    removeLikes: () => dispatch(removeLikes()),
    fetchCurrentUserFollows: () => dispatch(fetchCurrentUserFollows()),
    fetchFollowsByUserID: (userid) => dispatch(fetchFollowsByUserID(userid)),
    removeFollows: () => dispatch(removeFollows()),
    createFollow: (follow) => dispatch(createFollow(follow)),
    deleteFollow: (follow) => dispatch(deleteFollow(follow)),
    requestAudioPlaybackTime: () => dispatch(requestAudioPlaybackTime())
  }
}

// Need to change this to a selector which gets all the songs by the artist

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

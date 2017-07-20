import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { fetchSongs, removeSongs, fetchSongsByUserID, removeSong } from '../actions/song_actions'
import { fetchUsers, clearUsers } from '../actions/user_actions'
import { removeAudioToken} from '../actions/audio_actions'
import { connect } from 'react-redux'
import SongPlay from './songplaycontainer'
import { fetchLikes, removeLikes } from '../actions/like_actions'
import { fetchCurrentUserFollows, removeFollows} from '../actions/follow_actions'
import {fetchOneUser, fetchOneUserByID} from '../actions/user_actions'
import Sidebar from './sidebar'

// import SongCurrentPlay from './songcurrentplayingButton.jsx'

class SongsIndex extends React.Component {
  constructor(props){
    super(props)
    this.likes = [];
    this.user;
    this.newfollows = {}
    this.donefollows = {}


  }

  componentDidMount() {
    if(!this.user){
      this.props.fetchOneUser(this.props.currentUser.username).then((response) =>{
        this.user = response.user
        this.props.fetchUsers()
        for (var i = 0; i < this.user.followed_user_ids.length; i++) {
          this.props.fetchSongsByUserID(this.user.followed_user_ids[i])

        }
      })

    }





    this.props.fetchLikes()

    if (Math.random()  < 0.5){

      $('.sidebar-feature')[0].style.display = 'none'
    }

  }



  componentWillReceiveProps(nextProps){

    for (var i = 0; i < nextProps.allfollows.length; i++) {
      this.newfollows[nextProps.allfollows[i].id] = nextProps.allfollows[i]
    }

    // basically setting internal state

    let follows = Object.keys(this.newfollows).map(el => parseInt(el))
    let followV2 = nextProps.allfollows.map(follow => follow.id)
    // setting up the follow arrays

    for (var i = 0; i < follows.length; i++) {
      if (followV2.includes(follows[i]) === false){
        let userID = this.newfollows[follows[i].toString()].followee_id
        delete this.newfollows[follows[i].toString()]
        let allsongs = this.props.allsongs
        for (var i = 0; i < allsongs.length; i++) {

          if (allsongs[i].user_id === userID){
            this.props.removeSong(allsongs[i])
          }
        }
      }
    }

    // if allfollows does not include any of the keys, we delete the thing at that key

    if (Object.keys(this.newfollows).length > 0 ){
      let newfollowarray = Object.values(this.newfollows)
      for (var i = 0; i < newfollowarray.length; i++) {
        if(!this.donefollows[newfollowarray[i].id]){
          nextProps.fetchOneUserByID(newfollowarray[i].followee_id)
          nextProps.fetchSongsByUserID(newfollowarray[i].followee_id)
          this.donefollows[newfollowarray[i].id] = true
        }
      }
    }

    // fetch follows

  }

  componentWillUnmount(){
    this.props.removeSongs()
    this.props.clearUsers()
    this.props.removeFollows()
    this.props.removeLikes()
    // this.props.removeLikes()

    // this.props.removeAudioToken();

  }

  render() {
    // let likes = [];
    // if (this.props.likes){
    //
    //   likes = this.props.likes
    // }
    let likes = [];
    if(this.props.likes.length > 0 ){
      likes = this.props.likes;
    }

    return (
    <div className="index">
      <div className="Homepagenavdiv">
      <nav className='homepage-nav'>
            <ul className="homepage-nav-list">
              <li className="flexfoo"><NavLink to='/stream'>Stream</NavLink></li>
              <li className="flexfoo"><NavLink to='/charts'>Charts</NavLink></li>
              <li className="flexfoo"><NavLink to='/discover'>Discover</NavLink></li>
            </ul>
          </nav>
        </div>
     <section className="songindexlist">
       <h2 className="streamheader">Hear the latest posts from the people you’re following: </h2>
        <ul>
          {
            this.props.allsongs.slice(0,10).map(song => (
              <li key={`song_${song.id}`}  className="indexlist">
                <SongPlay likes={likes.filter(like => like.song_id === song.id)}
                  waveformid={song.id} song={song}
                  user={this.props.usersbyID[song.user_id]} />
              </li>
            ))
          }
        </ul>
      </section>
      <Sidebar currentUser={this.user}></Sidebar>
    </div>
    );
  }
}



const mapStateToProps = (state) => {

  return { byUsername: state.songs.byUsername,
           allsongs: state.songs.allsongs,
           usersbyID: state.users.byID,
          audio: state.audio,
          likes: state.likes.alllikes,
          currentUser: state.session.currentUser,
          allfollows: state.follows.allfollows}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
    removeSongs: () => dispatch(removeSongs()),
    fetchUsers: () => dispatch(fetchUsers()),
    clearUsers: () => dispatch(clearUsers()),
    removeAudioToken: () => dispatch(removeAudioToken()),
    fetchLikes: () => dispatch(fetchLikes()),
    removeLikes: () => dispatch(removeLikes()),
    fetchCurrentUserFollows: () => dispatch(fetchCurrentUserFollows()),
    removeFollows: () => dispatch(removeFollows()),
    fetchSongsByUserID: (id) => dispatch(fetchSongsByUserID(id)),
    fetchOneUser: (username) => dispatch(fetchOneUser(username)),
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id)),
    removeSong: (song) => dispatch(removeSong(song))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsIndex);

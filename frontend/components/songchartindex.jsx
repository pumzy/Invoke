import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { fetchChartSongs, removeSongs, fetchSongsByUserID } from '../actions/song_actions'
import { fetchUsers, clearUser, fetchOneUserByID } from '../actions/user_actions'
import { removeAudioToken} from '../actions/audio_actions'
import { connect } from 'react-redux'
import SongChartPlay from './songchartplay'
import { fetchLikes, removeLikes } from '../actions/like_actions'
import { fetchCurrentUserFollows, removeFollows} from '../actions/follow_actions'
import {fetchOneUser} from '../actions/user_actions'

// import SongCurrentPlay from './songcurrentplayingButton.jsx'

class SongChartIndex extends React.Component {
  constructor(props){
    super(props)
    this.likes = [];
    this.user;
    this.num = 10;
  }

  componentDidMount() {

      this.props.fetchChartSongs(this.num).then((response) =>{
        for (var i = 0; i < response.songs.length; i++) {
          if (Object.keys(this.props.usersbyID).includes([response.songs[i].user_id]) === false){
            this.props.fetchOneUserByID(response.songs[i].user_id)
          }
        }
      })

    this.props.fetchLikes()
  }

  componentWillReceiveProps(nextProps){


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

      if (this.props.allusers.length >= this.num){

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
           <h2 className="streamheader">The most played tracks on Invoke of all time: </h2>
           <div className='chart-header'>
             <div className='chart-header-hash'>#</div>
             <div className='chart-header-track'>Track</div>
             <div className='chart-header-playnum'>Plays (All time)</div>
           </div>
            <ul>
              {
                this.props.allsongs.slice(0,10).map((song, i) => (
                  <li key={`song_${song.id}`}  className="indexlist" id='chartlist-li'>
                    <div className='chart-rank'>{i}</div>
                    <SongChartPlay likes={likes.filter(like => like.song_id === song.id)}
                      waveformid={song.id} song={song}
                      user={this.props.usersbyID[song.user_id]} />
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
        );
      } else {
        return <div>loading</div>
      }
  }
}



const mapStateToProps = (state) => {

  return { byUsername: state.songs.byUsername,
           allsongs: state.songs.allsongs,
           usersbyID: state.users.byID,
          audio: state.audio,
          likes: state.likes.alllikes,
          currentUser: state.session.currentUser,
          newFollows: state.follows.newFollows,
          allusers: state.users.allusers}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChartSongs: (num) => dispatch(fetchChartSongs(num)),
    removeSongs: () => dispatch(removeSongs()),
    fetchUsers: () => dispatch(fetchUsers()),
    clearUsers: () => dispatch(clearUsers()),
    removeAudioToken: () => dispatch(removeAudioToken()),
    fetchLikes: () => dispatch(fetchLikes()),
    removeLikes: () => dispatch(removeLikes()),
    fetchCurrentUserFollows: () => dispatch(fetchCurrentUserFollows()),
    removeFollows: () => dispatch(removeFollows()),
    fetchSongsByUserID: (id) => dispatch(fetchSongsByUserID(id)),
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongChartIndex);

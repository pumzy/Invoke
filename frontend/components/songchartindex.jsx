import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { fetchChartSongs, removeSongs, fetchSongsByUserID } from '../actions/song_actions'
import { fetchUsers, clearUsers, fetchOneUserByID } from '../actions/user_actions'
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
    this.checknum = this.checknum.bind(this)
    this.checkgenre = this.checkgenre.bind(this)
    this.num = 10;
    this.genre = 'all';
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

  checknum(e){
    let num = parseInt(e.target.selectedOptions[0].value)
    if (num !== this.num){
      this.num = num
      this.props.removeSongs()
      this.props.clearUsers()
      this.props.removeFollows()
      this.props.removeLikes()
      this.props.fetchChartSongs(this.num, this.genre).then((response) =>{
        for (var i = 0; i < response.songs.length; i++) {
          if (Object.keys(this.props.usersbyID).includes([response.songs[i].user_id]) === false){
            this.props.fetchOneUserByID(response.songs[i].user_id)
          }
        }
      })

    this.props.fetchLikes()
  }


  }

  checkgenre(e){
    let genre = e.target.selectedOptions[0].value
    if (genre !== this.genre){
      this.genre = genre
      this.props.removeSongs()
      this.props.clearUsers()
      this.props.removeFollows()
      this.props.removeLikes()
      this.props.fetchChartSongs(this.num, this.genre).then((response) =>{
        for (var i = 0; i < response.songs.length; i++) {
          if (Object.keys(this.props.usersbyID).includes([response.songs[i].user_id]) === false){
            this.props.fetchOneUserByID(response.songs[i].user_id)
          }
        }
      })

    this.props.fetchLikes()
  }

  }

  render() {

    let likes = [];
    if(this.props.likes.length > 0 ){
      likes = this.props.likes;
    }

      if (this.props.allusers.length >= this.props.allsongs.length){

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
           <div className='chart-select-buttons'>
             <select className='chart-number-select' onChange={this.checknum}>
               <option value='5'>Top 5</option>
               <option selected='selected' value='10'>Top 10</option>
               <option value='20'>Top 20</option>
             </select>
             <select className='chart-genre-select' onChange={this.checkgenre}>
               <option selected='selected' value='all'>All Music Genres</option>
               <option value='Rock'>Rock</option>
               <option value='Indie'>Indie</option>
               <option value='Hip Hop'>Hip Hop</option>
             </select>
             <select className='chart-region-select'>
               <option selected='selected'>World</option>
             </select>
           </div>
           <h2 className="streamheader" id='streamheader-chart'>The most played tracks on Invoke of all time: </h2>
           <div className='chart-header'>
             <div className='chart-header-hash'>#</div>
             <div className='chart-header-track'>Track</div>
             <div className='chart-header-playnum'>Plays (All time)</div>
           </div>
            <ul>
              {
                this.props.allsongs.slice(0,this.num).map((song, i) => (
                  <li key={`song_${song.id}`}  className="indexlist" id='chartlist-li'>
                    <div className='chart-rank'>{i + 1}</div>
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
        return(
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
           <div className='chart-select-buttons'>
             <select className='chart-number-select'>
               <option>Top 5</option>
               <option selected='selected'>Top 10</option>
               <option>Top 20</option>
             </select>
             <select className='chart-genre-select'>
               <option selected='selected'>All Music Genres</option>
               <option>Rock</option>
               <option>Indie</option>
               <option>Hip Hop</option>
             </select>
             <select className='chart-region-select'>
               <option selected='selected'>World</option>
             </select>
           </div>
           <h2 className="streamheader" id='streamheader-chart'>The most played tracks on Invoke of all time: </h2>
           <div className='chart-header'>
             <div className='chart-header-hash'>#</div>
             <div className='chart-header-track'>Track</div>
             <div className='chart-header-playnum'>Plays (All time)</div>
           </div>
            <div className="loader">Loading...</div>
          </section>
        </div>
      )}
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
    fetchChartSongs: (num, genre) => dispatch(fetchChartSongs(num, genre)),
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

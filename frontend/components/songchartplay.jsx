import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { receiveAudio, removeAudio, changePlaybackTime, requestAudioPlaybackTime } from '../actions/audio_actions'
import { fetchOneUserByID, clearUsers } from '../actions/user_actions.js'
import SongPlayButton from './songplaybuttoncontainer'
import SongCurrentPlayButton from './songcurrentlyplayingbutton'
import { fetchLikes, fetchLikesBySongID, removeLikes, createLike, deleteLike } from '../actions/like_actions'

class SongChartPlay extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.goToSong = this.goToSong.bind(this)
    this.goToUser = this.goToUser.bind(this)
    // this.likeSong = this.likeSong.bind(this);
    // this.unlikeSong = this.unlikeSong.bind(this);
  }

  handleClick(){

    if(this.props.user){
      let path = `/${username}/${this.props.song.title}`
      this.props.history.push(path)
    }
  }

  goToSong(){
    
    this.props.history.push(`/${this.props.user.username}/${this.props.song.title}`)
  }
  goToUser(){

    this.props.history.push(`/${this.props.user.username}`)
  }

  componentWillUnmount(){
    if (this.props.song.id  === this.props.audio.id){
        this.props.requestAudioPlaybackTime();
      }
  }

  componentDidMount(){

    if (this.props.audio.id === this.props.song.id) this.props.requestAudioPlaybackTime();
  }

  render(){
    let date;
    let date1 = new Date(`${this.props.song.created_at}`);
    let datenow = new Date()
    let timeDiff = Math.abs(datenow.getTime() - date1.getTime());
    let daysago = Math.abs(timeDiff / (1000 * 3600 * 24));
    var daysresult;

    if (daysago < 1){
      var daysresult = `today`
    } else if (daysago < 2) {
      var daysresult = `yesterday`
    } else {
      daysago = Math.floor(daysago)
      var daysresult = `${daysago} days ago`
    }

    let genre = `#${this.props.song.genre}`

    let spb;
    if (this.props.audio.id === this.props.song.id ){
      spb  = <SongCurrentPlayButton song={this.props.song} playstate={this.props.audio.token}/>
    } else {
      spb = <SongPlayButton song={this.props.song} />
    }

    let likebutton;

    let userIds = this.props.likes.map(like => like.user_id)
    let likecount =  this.props.likes.length

    let a = 0;


      if (userIds.includes(this.props.currentUser.id)) {
        likebutton = <button onClick={this.unlikeSong}  className="songpage-likebutton-liked"></button>
      } else {
        likebutton = <button onClick={this.likeSong} className="songpage-likebutton-notliked"></button>
      }



      if (this.props.user !== null || this.props.user !== undefined){

      return(
        <div className='songplaybox-chart'>
        <div className="songplay-item-chart">
          <div className='songplay-coverart-chart' >
            <img onClick={this.goToSong} src={this.props.song.cover_art_url} />
          </div>
          <div className='songplay-song-chart'>
            <div className='songplay-song-information'>
              <div className="songplay-left-chart">
                <div className="infospan-chart">
                  <div className="songplay-artist-chart"> <span className="songplay-span-artist" onClick={this.goToUser}>{this.props.user.username}</span></div>
                  <div className="songplay-title-chart"> <span className="songplay-span-title" onClick={this.goToSong}>{this.props.song.title}</span></div>
                </div>
              </div>
              <div className="songplay-right-chart">
                <img className='stat-icon-playcontainer-chart' src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfcGxheSA0PC90aXRsZT48cGF0aCBkPSJNNCAxM1YzbDkgNS05IDV6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4='></img>
                <span className='container-playcount-chart'>{this.props.song.playcount}</span>
              </div>
            </div>
            <div className='songplay-buttonbar-chart'>
              {spb}
              {likebutton}
            </div>
            </div>
          </div>
        </div>
      )



    }}
  }





  const mapStateToProps = (state, passedDown) => {

    return {
      user: state.users.byID[passedDown.song.user_id],
      audio: state.audio,
      currentUser: state.session.currentUser
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      receiveAudio: (song) => dispatch(receiveAudio(song)),
      removeAudio: (song) => dispatch(removeAudio(song)),
      fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id)),
      changePlaybackTime: (time) => dispatch(changePlaybackTime(time)),
      requestAudioPlaybackTime: () => dispatch(requestAudioPlaybackTime()),
      fetchLikesBySongID: (id) => dispatch(fetchLikesBySongID(id)),
      removeLikes: () => dispatch(removeLikes()),
      createLike: (like) => dispatch(createLike(like)),
      deleteLike: (like) => dispatch(deleteLike(like))
    }
  }


  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongChartPlay));

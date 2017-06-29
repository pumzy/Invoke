import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { receiveAudio, removeAudio, changePlaybackTime, requestAudioPlaybackTime } from '../actions/audio_actions'
import { fetchOneUserByID, clearUsers } from '../actions/user_actions.js'
import SongPlayButton from './songplaybuttoncontainer'
import SongCurrentPlayButton from './songcurrentlyplayingbutton'
import Wavesurfer from 'react-wavesurfer'
import { fetchLikes, fetchLikesBySongID, removeLikes, createLike, deleteLike } from '../actions/like_actions'


class SongPlay extends React.Component {
  constructor(props){
    super(props);
    // this.giveToPlaybar = this.giveToPlaybar.bind(this
    this.props.fetchOneUserByID(this.props.song.user_id);
    // this.props.fetchLikesBySongID(this.props.song.id)
    // this.props.requestAudioPlaybackTime();
    this.handleClick = this.handleClick.bind(this)
    this.handleWaveformClick = this.handleWaveformClick.bind(this);
    this.goToSong = this.goToSong.bind(this)
    this.goToUser = this.goToUser.bind(this)
    this.wavesurfer = null;
    this.likeSong = this.likeSong.bind(this);
    this.unlikeSong = this.unlikeSong.bind(this);
    this.state = {
     playing: false,
     pos: 0,
     volume: 0
   };
   debugger

  //  this.handleTogglePlay = this.handleTogglePlay.bind(this);
   this.handlePosChange = this.handlePosChange.bind(this);
  }


    // handleTogglePlay() {
    //
    //   this.setState({
    //     playing: !this.state.playing
    //   });
    // }

  handleWaveformClick(e){

  }


  handlePosChange(e) {
    this.setState({
        pos: e.originalArgs[0]
      });
    }

  handleClick(){

    if(this.props.user){
      let path = `/${username}/${this.props.song.title}`
      this.props.history.push(path)
    }
  }

  // giveToPlaybar(song){
  //   const reset = new Promise((resolve, reject) => resolve(this.props.removeAudio()));
  //   reset.then(() => this.props.receiveAudio(song));
  // }

  goToSong(){
    this.props.history.push(`/${this.username}/${this.props.song.title}`)
  }
  goToUser(){
    this.props.history.push(`/${this.username}`)
  }

  likeSong(){
    debugger
    this.props.createLike({like: {song_id: this.props.song.id}})
  }

  unlikeSong(){
    this.props.deleteLike({like: {song_id: this.props.song.id}})
  }


  componentWillReceiveProps(nextProps){


    if (nextProps.audio.token === "PLAYING" && nextProps.audio.id === this.props.song.id) {
      this.setState({playing: true, volume: 0, pos: nextProps.audio.time})
    } else if (nextProps.audio.token === "PAUSED" && nextProps.audio.id === this.props.song.id) {
      this.setState({playing: false, volume: 0, pos: nextProps.audio.time})
    } else if(nextProps.audio.id !== this.props.song.id){

      this.setState({playing: false, volume: 0, pos: 0})
    }

  }

  componentWillUnmount(){
    if (this.props.song.id  === this.props.audio.id){
        this.props.requestAudioPlaybackTime();
      }
  }


  componentDidMount(){
    this.username = null
    let username;
    if (this.props.user){
      this.username = this.props.user.username
      // document[`wavesurfer${this.props.waveformid}`].setVolume(0);
      //
    }
    // this.props.fetchLikesBySongID(this.props.song.id)
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
    debugger



      if (userIds.includes(this.props.currentUser.id)) {
        likebutton = <button onClick={this.unlikeSong}  className="songpage-likebutton-liked">{likecount}</button>
      } else {
        likebutton = <button onClick={this.likeSong} className="songpage-likebutton-notliked">{likecount}</button>
      }





      if (this.props.user !== null || this.props.user !== undefined){

        return(
          <div className='songplaybox'>
          <div className="songplay-header">  <img src={`${this.props.user.avatar_url}`} className="songplay-avatar" onClick={this.goToSong}/> <Link to={`/${this.username}`}>  {this.username} posted a track {daysresult} </Link> </div>
          <div className="songplay-item">
            <div className='songplay-coverart' >
              <img onClick={this.goToSong} src={this.props.song.cover_art_url} />
            </div>
             {spb}
            <div className='songplay-song'>
              <div className='songplay-song-information'>
                <div className="songplay-left">
                  <div className="infospan">
                    <div className="songplay-artist"> <span className="songplay-span-artist" onClick={this.goToUser}>{this.username}</span></div>
                    <div className="songplay-title"> <span className="songplay-span-title" onClick={this.goToSong}>{this.props.song.title}</span></div>
                  </div>
                </div>
                <div className="songplay-right">
                  <div className="songplay-genre"><span className="genre-tag">{genre}</span></div>
                </div>
              </div>
              <div id={`waveform${this.props.waveformid}`} onClick={this.handleWaveformClick}>
                <Wavesurfer
                   audioFile={this.props.song.track_url}
                   container={`#waveform${this.props.waveformid}`}
                   onPosChange={this.handlePosChange}
                   pos={this.state.pos}
                   volume='0'
                   playing={this.state.playing}
                   options={{waveColor: '#ddd',
                     progressColor:'#ff7540'}}

                   ref={Wavesurfer => this.wavesurfer = Wavesurfer}
                   />
                 </div>
              <div className='songplay-buttonbar'>
                {likebutton}
              </div>
              </div>
            </div>
          </div>
        )
      }
  }
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongPlay));

// <Wavesurfer
//    audioFile={this.props.song.track_url}
//    container={`#waveform${this.props.waveformid}`}
//    pos={this.state.pos}
//    onPosChange={this.handlePosChange}
//    playing={this.state.playing}
//    ref={Wavesurfer => this.wavesurfer = Wavesurfer}
//    />

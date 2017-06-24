import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { receiveAudio, removeAudio } from '../actions/audio_actions'
import { fetchOneUserByID, clearUsers } from '../actions/user_actions.js'
import SongPlayButton from './songplaybuttoncontainer'

class SongPlay extends React.Component {
  constructor(props){
    super(props);
    // this.giveToPlaybar = this.giveToPlaybar.bind(this
    this.props.fetchOneUserByID(this.props.song.user_id);
    this.handleClick = this.handleClick.bind(this)
    this.goToSong = this.goToSong.bind(this)
    this.goToUser = this.goToUser.bind(this)
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

  componentWillMount(){
  }

  componentDidMount(){
    this.username = null
    let username;
    if (this.props.user){
      this.username = this.props.user.username
    }
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





      if (this.props.user !== null ){

        return(
          <div className='songplaybox'>
          <div className="songplay-header">  <img src={`${this.props.user.avatar_url}`} className="songplay-avatar" onClick={this.goToSong}/> <Link to={`/${this.username}`}>  {this.username} posted a track {daysresult} </Link> </div>
          <div className="songplay-item">
            <div className='songplay-coverart' >
              <img src={this.props.song.cover_art_url} />
            </div>
            <div className='songplay-song'>
              <div className='songplay-song-information'>
                <SongPlayButton song={this.props.song} />
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
              <div className='songplay-waveform'>
              </div>
              <div className='songplay-buttonbar'>
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
    user: state.users.byID[passedDown.song.user_id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveAudio: (song) => dispatch(receiveAudio(song)),
    removeAudio: (song) => dispatch(removeAudio(song)),
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongPlay));

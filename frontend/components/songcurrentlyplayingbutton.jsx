import { receiveAudio, removeAudio, removeAudioToken, receivePlayToken, receivePauseToken, requestAudioPlaybackTime  } from '../actions/audio_actions'
import { fetchOneUserByID, clearUsers } from '../actions/user_actions.js'
import React from 'react'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'


class SongCurrentPlayButton extends React.Component {
  constructor(props){
    super(props);
    this.giveToPlaybar = this.giveToPlaybar.bind(this);
    // this.handleClick = this.handleClick.bind(this);

  }

  componentWillUpdate(){
    if (this.props.audio.token === "PLAYING") {
      this.playbutton.src = "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-pausebutton.png"
    } else {
      this.playbutton.src = "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-playbutton.png"
    }
  }




  giveToPlaybar(){

    if (this.props.audio.id === this.props.song.id && this.props.audio.token === "PAUSED") {
      // this.playbutton.src = "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-playbutton.png"
      this.props.receivePlayToken()
      this.props.requestAudioPlaybackTime();

      // Dispatch the pause action, set the audio to pause.
      // Got to dispatch the pause action in the playbutton container

      // In the audio - this.music.pause

      // Change the photo back to the play photo
    } else if (this.props.audio.id === this.props.song.id && this.props.audio.token === "PLAYING"){
      // this.playbutton.src = "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-pausebutton.png"
      this.props.receivePauseToken();
      this.props.requestAudioPlaybackTime();

    }


    // this.playbutton.src = "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-pausebutton.png"
  }
  render(){




    const src = this.props.audio.token === "PLAYING" ?
    "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-pausebutton.png" :
    "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-playbutton.png"

    return(

      <div>
        <img src={src} onClick={this.giveToPlaybar} className="PlayinSongPage"  ref={img => this.playbutton = img}/>
      </div>
    )
  }
}

const mapStateToProps = (state, passedDown) => {
  debugger
  return {
    audio: state.audio
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    receiveAudio: (song) => dispatch(receiveAudio(song)),
    removeAudio: (song) => dispatch(removeAudio(song)),
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id)),
    removeAudioToken: () => dispatch(removeAudioToken()),
    receivePlayToken: () => dispatch(receivePlayToken()),
    receivePauseToken: () => dispatch(receivePauseToken()),
    requestAudioPlaybackTime: () => dispatch(requestAudioPlaybackTime()),
    updateSongCount: (id) => dispatch(updateSongCount(id))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongCurrentPlayButton));

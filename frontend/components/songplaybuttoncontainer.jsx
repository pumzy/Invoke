import { receiveAudio, removeAudio, removeAudioToken, receivePlayToken } from '../actions/audio_actions'
import { fetchOneUserByID, clearUsers } from '../actions/user_actions.js'
import React from 'react'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { updateSongCount } from '../actions/song_actions'



class SongPlayButton extends React.Component {
  constructor(props){
    super(props);
    this.giveToPlaybar = this.giveToPlaybar.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.props.fetchOneUserByID(this.props.song.user_id);
  }

  componentDidMount(){

  }


  // handleClick(){
  //     let path = `/${this.props.user.username}/${this.props.song.title}`
  //     this.props.history.push(path)
  // }

  giveToPlaybar(song){
    // if (this.props.audio.id === this.props.song.id && this.props.audio.token === "PAUSE") {
    //   this.playbutton.src = "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-playbutton.png"
    //
    //
    //
    //   // Dispatch the pause action, set the audio to pause.
    //   // Got to dispatch the pause action in the playbutton container
    //
    //   // In the audio - this.music.pause
    //
    //   // Change the photo back to the play photo
    // } else if (this.props.audio.id === this.props.song.id && this.props.audio.token === "PLAY"){
    //   this.playbutton.src = "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-pausebutton.png"
    // }

    // else {
      let allids = store.getState().songs.allsongs.map( song => song.id)
      let slicePos = allids.indexOf(this.props.song.id)
      let queue = this.props.allsongs.slice(slicePos)
      
      this.props.updateSongCount(this.props.song.id)
      const reset = new Promise((resolve, reject) => resolve(this.props.removeAudio()));
      reset.then(() => this.props.receiveAudio(Object.assign(song, {token: "PLAYING", queue: queue})));
    // }

    // this.props.receiveAudioPause(this.props.song)



    // this.playbutton.src = "https://s3.us-east-2.amazonaws.com/invoke-development/songshow-pausebutton.png"
  }
  render(){




    return(
      <div>
        <img src="https://s3.us-east-2.amazonaws.com/invoke-development/songshow-playbutton.png" onClick={() =>this.giveToPlaybar(this.props.song)} className="PlayinSongPage"  ref={img => this.playbutton = img}/>
      </div>
    )
  }
}

const mapStateToProps = (state, passedDown) => {
  return {
    audio: state.audio,
    allsongs: state.songs.allsongs
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    receiveAudio: (song) => dispatch(receiveAudio(song)),
    removeAudio: (song) => dispatch(removeAudio(song)),
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id)),
    removeAudioToken: () => dispatch(removeAudioToken()),
    receivePlayToken: () => dispatch(receivePlayToken()),
    updateSongCount: (id) => dispatch(updateSongCount(id))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongPlayButton));

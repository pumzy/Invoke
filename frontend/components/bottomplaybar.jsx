import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchOneUser, fetchOneUserByID, clearUsers } from '../actions/user_actions'




class BottomPlayBar extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.audio.track_url !== "" && nextProps.audio.id !== this.props.audio.id){
      this.props.fetchOneUserByID(nextProps.audio.user_id)
    }
  }

  // componentDidUpdate() AT SOME POINT WE WANT TO CLEAR ALL THE USERS UP FROM THE STATE



  handleClick(){
    if (this.music.paused){
      this.music.play()
      playbutton.className = "";
      playbutton.className = "pause";
    } else {
      this.music.pause();
		  playbutton.className = "";
		  playbutton.className = "play";
    };
  }

  // moveTracker(){
  // let duration;
  // var tracker  = document.getElementById("playhead")
  // var music = document.getElementById("audio")
  //
  // // timeupdate is when the tracker changes position
  // // adjust the CSS for the class?
  //
  // }


  render(){
    let audioplayer;

    const artist = this.props.artist
    if (this.props.audio.track_url !== "") {
      audioplayer = <div className="playbar">
                          <audio ref={audio => this.music = audio}>
                            <source src={this.props.audio.track_url}type="audio/ogg" />
                            <source src={this.props.audio.track_url} type="audio/mpeg" />
                          </audio>
                        <div className="controls">
                        <button id="playbutton" className="play" onClick={this.handleClick} />
                        </div>
                        <div className="progress">
                          <div>Placeholder For Progress bar</div>
                        </div>
                          <div className="currentSongInfo"> <img  className="song-coverart-playerslice" src={this.props.audio.cover_art_url} />
                          <div className="song-infoplayer-slice">
                          {this.props.audio.title} by
                          {artist.username}
                          </div>
                          </div>
                        </div>
    }

    // else {
    //   audioplayer = <h2>No song in queue</h2>
    // }

    // <div id="progess">
    //   <div id="tracker"> </div>
    // </div>

    return(
      <footer className="audiofooter">
        {audioplayer}
      </footer>
    )
  }
}

const selectSingleArtist = (state) => {
  return state.users.byID[state.audio.user_id] || { username: "" };
}

const mapStateToProps = (state) => {
  return { audio: state.audio,
  artist: selectSingleArtist(state) }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
    clearUsers: () => dispatch(clearUsers()),
    fetchOneUser: (username) => dispatch(fetchOneUser(username)),
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPlayBar);

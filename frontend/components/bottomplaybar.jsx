import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'




class BottomPlayBar extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }



  handleClick(){
    var music = document.getElementById("audio")
    if (music.paused){
      music.play()
      playbutton.className = "";
      playbutton.className = "pause";
    } else {
      music.pause();
		  playbutton.className = "";
		  playbutton.className = "play";
    };
  }


  render(){
    let audioplayer;
    if (this.props.audio.track_url !== "") {
      audioplayer = <div className="playbar">
                        <div id="playbutton" className="play" onClick={this.handleClick}>
                        <audio id="audio">
                          <source src={this.props.audio.track_url}type="audio/ogg" />
                          <source src={this.props.audio.track_url} type="audio/mpeg" />
                        </audio>
                        </div>
                    </div>
    } else {
      audioplayer = <h2>No song in queue</h2>
    }


    return(
      <div className="playbar">
        {audioplayer}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { audio: state.audio }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPlayBar);

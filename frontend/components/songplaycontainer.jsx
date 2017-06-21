import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { receiveAudio, removeAudio } from '../actions/audio_actions'

class SongPlay extends React.Component {
  constructor(props){
    super(props);
    this.giveToPlaybar = this.giveToPlaybar.bind(this);
  }

  giveToPlaybar(song){
    const reset = new Promise((resolve, reject) => resolve(this.props.removeAudio()));
    reset.then(() => this.props.receiveAudio(song));
  }

  render(){
    return(
      <div>
        <h3>{this.props.song.title}</h3>
        <button onClick={() => this.giveToPlaybar(this.props.song)}>Give to Playbar</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}
const mapDispatchToProps = (dispatch) => {
  return {
    receiveAudio: (song) => dispatch(receiveAudio(song)),
    removeAudio: (song) => dispatch(removeAudio(song))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongPlay);




//   <audio controls>
//     <source src={this.props.song.track_url} type="audio/mpeg" />
// </audio>

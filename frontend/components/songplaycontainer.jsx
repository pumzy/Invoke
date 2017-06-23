import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { receiveAudio, removeAudio } from '../actions/audio_actions'
import { fetchOneUserByID } from '../actions/user_actions'

class SongPlay extends React.Component {
  constructor(props){
    super(props);
    this.giveToPlaybar = this.giveToPlaybar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.props.fetchOneUserByID(this.props.song.user_id)
  }


  handleClick(){
      let path = `${this.props.user.username}/${this.props.song.title}`
      this.props.history.push(path)
  }

  giveToPlaybar(song){
    const reset = new Promise((resolve, reject) => resolve(this.props.removeAudio()));
    reset.then(() => this.props.receiveAudio(song));
  }

  render(){
    return(
      <div>
        <a onClick={this.handleClick}> {this.props.song.title}</a>
        <button onClick={() => this.giveToPlaybar(this.props.song)}>Give to Playbar</button>
      </div>
    )
  }
}

const mapStateToProps = (state, passedDown) => {
  return {
    user: state.users.byID[passedDown.song.user_id]
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    receiveAudio: (song) => dispatch(receiveAudio(song)),
    removeAudio: (song) => dispatch(removeAudio(song)),
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongPlay));




//   <audio controls>
//     <source src={this.props.song.track_url} type="audio/mpeg" />
// </audio>

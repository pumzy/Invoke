import { receiveAudio, removeAudio } from '../actions/audio_actions'
import { fetchOneUserByID, clearUsers } from '../actions/user_actions.js'
import React from 'react'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'


class SongPlayButton extends React.Component {
  constructor(props){
    super(props);
    this.giveToPlaybar = this.giveToPlaybar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.props.fetchOneUserByID(this.props.song.user_id)
  }


  handleClick(){
      let path = `/${this.props.user.username}/${this.props.song.title}`
      this.props.history.push(path)
  }

  giveToPlaybar(song){
    const reset = new Promise((resolve, reject) => resolve(this.props.removeAudio()));
    reset.then(() => this.props.receiveAudio(song));

  }
  render(){
    return(
      <div>
        <img src="https://s3.us-east-2.amazonaws.com/invoke-development/songshow-playbutton.png" onClick={() => this.giveToPlaybar(this.props.song)} className="PlayinSongPage" />
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongPlayButton));

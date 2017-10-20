import React from 'react'
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { receiveAudio, removeAudio, changePlaybackTime, requestAudioPlaybackTime } from '../actions/audio_actions'
import SongPlayButton from './songplaybuttoncontainer'
import SongCurrentPlayButton from './songcurrentlyplayingbutton'
import Wavesurfer from 'react-wavesurfer'
import { fetchLikes, fetchLikesBySongID, removeLikes, createLike, deleteLike } from '../actions/like_actions'



class PlaylistPlay extends React.Component {
  constructor(props){
    super(props)
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
    deleteLike: (like) => dispatch(deleteLike(like)),
    removeAudioToken: () => dispatch(removeAudioToken())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistPlay));

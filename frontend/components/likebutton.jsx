import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { createLike, deleteLike } from '../actions/like_actions'


class LikeButton extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
    // Song from props
    // Like by user_id from props also
  }


  handleClick(e){
    if (!this.props.likesBySongID[this.props.currentUser.id]) {
      this.props.createLike({like: {song_id : this.props.song.id}})
    } else {
      this.props.deleteLike({like: {song_id : this.props.song.id}})
    }
  }

  render(){
    return(
      <div>
      <button onClick={this.handleClick} ref={button => this.likebutton = button}>Like</button>
      </div>
    )
  }



}




const mapStateToProps = (state, passedDown) => {

  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongPlay);

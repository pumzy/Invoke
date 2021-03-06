import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { receiveAudio, removeAudio } from '../actions/audio_actions'
import { fetchOneUserByID, clearUsers } from '../actions/user_actions.js'
import { deleteComment } from '../actions/comment_actions'
import { unmountComponentAtNode } from 'react-router-dom'

class CommentShow extends React.Component {
  constructor(props){
    super(props);
    // this.giveToPlaybar = this.giveToPlaybar.bind(this
    this.goToSong = this.goToSong.bind(this)
    this.goToUser = this.goToUser.bind(this)
    this.deleteComment = this.deleteComment.bind(this);
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
    this.props.fetchOneUserByID(this.props.comment.user_id);
    this.username = null
    let username;
    if (this.props.user){
      this.username = this.props.user.username
    }
  }

  deleteComment(){
    this.props.deleteComment(this.props.comment)
  }




  render(){
      if (this.props.user !== null && this.props.user !== undefined ){

      if ((this.props.user.id !== this.props.currentUser.id) && this.deletebutton) {
        this.deletebutton.style.display = 'none'
      }



        return(
          <div className='commentbox' ref={div => this.commentbox = div}>
          <div className="comment-item">
            <div className='comment-user-avatar' >
              <img onClick={this.goToUser} src={this.props.user.avatar_url} />
            </div>
            <div className='comment-info'>
                  <div className="left-comment">
                   <span id="comment-span-author-time"><a>{this.props.user.username}</a> at <a>{this.props.comment.comment_time}</a></span>
                   <span id="comment-span-body">{this.props.comment.body}</span>
                  </div>
                  <div className="right-comment">
                    <span id="comment-timeago">{this.props.timeago}</span>
                    <button id="comment-delete-button" onClick={this.deleteComment} ref={button => this.deletebutton = button}></button>
                  </div>
            </div>
          </div>
          </div>

        )
      } else {
        return(
          <h1>Hello!</h1>
        )
      }
  }
}

const mapStateToProps = (state, passedDown) => {
  return {
    user: state.users.byID[passedDown.comment.user_id],
    currentUser: state.session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id)),
    deleteComment: (comment) => dispatch(deleteComment(comment))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentShow))

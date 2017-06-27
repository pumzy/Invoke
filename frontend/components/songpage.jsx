import React from 'react'
import { fetchOneUser, clearUsers } from '../actions/user_actions.js'
import Error404 from './404page'
import {connect} from 'react-redux'
import { NavLink, Route, Switch, Redirect, Link } from 'react-router-dom';
import { fetchSongByTitle, removeSongs, deleteSong } from '../actions/song_actions.js'
import SongPlayButton from './songplaybuttoncontainer'
import SongUpdate from './edit';
import {fetchCommentsBySongID, removeComments, createComment } from '../actions/comment_actions'
import CommentShow from './commentcontainer'



class SongPage extends React.Component {
  constructor(props){
    super(props)
    this.goToUser = this.goToUser.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
    this.byeBye = this.byeBye.bind(this);
    this.howLongAgo = this.howLongAgo.bind(this);
    this.editbutton = null;
    this.deletebutton = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      body: "",
      comment_time: "",
      song_id: null
    }
  }

  componentDidMount(){
    this.props.fetchOneUser(this.props.match.params.username);
    this.props.fetchSongByTitle(this.props.match.params.title).then((response) => this.props.fetchCommentsBySongID(response.song.id));
  }

  handleSubmit(e){
    if (e.keyCode === 13) {
    var comment = this.state;
    let currentlyPlayingSong = document.getElementsByClassName("playbar-song-infoslice")
    if (currentlyPlayingSong.length === 0 || currentlyPlayingSong[0].innerText !== this.props.song.title){

      var secondval = Math.floor(Math.random()*60)
      if (secondval < 10) {
        secondval = `0${secondval}`
      } else {
        secondval = `${secondval}`
      }
      comment.comment_time = `0${Math.floor(Math.random()*3.5)}:` + secondval
    } else {
      comment.comment_time = document.getElementsByClassName("time-elapsed")[0].innerText
    }

    comment.song_id = this.props.song.id
    var that = this;
    this.setState({
      body: "",
      comment_time: "",
      song_id: null
    })
    this.props.createComment({comment}).then(() => this.props.fetchCommentsBySongID(this.props.song.id))
    this.props.removeComments();

  } else
   {return null;}
  }

  howLongAgo(passedindate){
    let date1 = new Date(`${passedindate}`);
    let datenow = new Date()
    let timeDiff = Math.abs(datenow.getTime() - date1.getTime());
    let daysago = Math.abs(timeDiff / (1000 * 3600 * 24));
    var daysresult;
    if (daysago < 1){
      var daysresult = `Today`
    } else if (daysago < 2) {
      var daysresult = `1 day`
    } else {
      daysago = Math.floor(daysago)
      var daysresult = `${daysago} days`
    }

    return daysresult
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }


  componentWillUnmount(){
    this.props.removeSongs()
    this.props.removeComments()
  }

  componentWillReceiveProps(nextProps){

    if (nextProps.match.params.username !== this.props.match.params.username || nextProps.match.params.title !== this.props.match.params.title){
    this.props.removeSongs()
    this.props.clearUsers()
    }
  }

  goToUser(){
    this.props.history.push(`/${this.props.match.params.username}`)
  }

  goToEdit(){
      this.props.history.push(`${this.props.location.pathname}/edit`)
  }

  byeBye(){
    this.props.deleteSong(this.props.song).then(() => this.props.history.push(`/${this.props.match.params.username}`))
  }


  render(){

    if (!this.props.song || !this.props.user) {
      return null
    } else {
      if (this.props.currentUser && this.props.user){
        if (this.props.currentUser.id === this.props.user.id){
          this.editbutton = <button onClick={this.goToEdit} className="editbutton">Edit</button>
          this.deletebutton = <button onClick={this.byeBye} className="deletebutton">Delete</button>
        }}


    let comments = this.props.comments.map(comment => {

      return <CommentShow comment={comment} timeago={this.howLongAgo(comment.created_at)} />
      })


    // Pass down the component with both the comment and the time it was created at- which can be done by doing this.howLongAgo(comment.created_at) && comment as (comment)
    // document.getElementsByClassName("time-elapsed")[0].innerText



    let genre = `#${this.props.song.genre}`
    let songplay = <SongPlayButton className="PlayinSongPage" song={this.props.song} />

    // }
    let timesincerelease = this.howLongAgo(this.props.song.created_at)
    let result;
    if (!(this.props.match.params.username && this.props.match.params.title )){
      result = <Error404 />
    } else {

        result = (
          <div className='song-header'>
            <div className='song-information'>
              <div className='song-info'>
                <div className="left">
                  {songplay}
                  <div className="infospan">
                    <div className="artist"> <span className="song-header-artist" onClick={this.goToUser}>{this.props.user.username}</span></div>
                    <div className="title"> <span className="song-header-title">{this.props.song.title}</span></div>
                  </div>
                </div>
                <div className="right">
                  <div className="genre"><span className="how-long-ago">{timesincerelease}</span></div>
                  <div className="time"><span className="genre-tag">{genre}</span></div>
                </div>
              </div>
              <div className='waveform'>

              </div>
            </div>
            <div className='song-coverart' >
              <img src={this.props.song.cover_art_url} />
            </div>
          </div>
        )
      }

      return(
        <div className="song-page">
          {result}
        <div className="songpage-utilty-bar">
          <input type="text"
              value={this.state.body}
              onChange={this.update('body')}
              onKeyDown={this.handleSubmit}
              className="comment-input-songpage"
              placeholder="Write a Comment"
              ref={input => this.commentfield = input}
            />
          <div className="songpage-user-buttons">
            {this.deletebutton}
            {this.editbutton}
          </div>
        </div>
        <div className="rest-of-songpage">
        <div className="left-comment-pane"></div>
        <div className="comments-songpage">
          <h3 className="comment-count">{this.props.comments.length} {this.props.comments.length !== 1 ? "comments" : "comment"}</h3>
          <ul className="comment-list">
            {comments}
          </ul>
        </div>
        <div className="songpage-sidebar"></div>
        </div>
        </div>

      )
    }
  }
}




const mapStateToProps = (state, ownProps) => {

    return  {
      user: state.users.byUsername[ownProps.match.params.username],
      song: state.songs.byTitle[ownProps.match.params.title],
      currentUser: state.session.currentUser,
      comments: state.comments.allcomments
    };
  }

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongsByUserID: (id) => dispatch(fetchSongsByUserID(id)),
    fetchSongByTitle: (title)=> dispatch(fetchSongByTitle(title)),
    fetchOneUser: (username) => dispatch(fetchOneUser(username)),
    removeSongs: () => dispatch(removeSongs()),
    deleteSong: (song) => dispatch(deleteSong(song)),
    fetchCommentsBySongID: (id) => dispatch(fetchCommentsBySongID(id)),
    removeComments: () => dispatch(removeComments()),
    createComment: (comment) => dispatch(createComment(comment))
  }
}

// Need to change this to a selector which gets all the songs by the artist

export default connect(mapStateToProps, mapDispatchToProps)(SongPage);



// var getuser = new Promise((resolve, reject) => resolve( fetchOneUser(ownProps.match.params.username)));
// var getsong = new Promise((resolve, reject) => resolve( fetchSongByTitle(ownProps.match.params.title)));
//   return getuser.then(() => getsong).then(() => (

// result =   <div className='song-header'>
//             <div className="header-replacement-songpage">
//               <div className="left-side">
//               <div className='song-information'>
//                 <ul className="song-info">
//                 <li>{songplay}</li>
//                 <li>
//                   <span className="song-header-artist" onClick={this.goToUser}>{this.props.user.username}</span>
//                   <span className="song-header-title">{this.props.song.title}</span>
//                 </li>
//               </ul>
//             </div>
//               <div className='song-coverart' >
//                 <img src={this.props.song.cover_art_url} />
//               </div>
//             </div>
//               <div className='right-side'>
//                 <span className="genre-tag">{genre}</span>
//                 <span className="how-long-ago">{daysresult}</span>
//               </div>
//             </div>
//           </div>



// let date;
// let date1 = new Date(`${this.props.song.created_at}`);
// let datenow = new Date()
// let timeDiff = Math.abs(datenow.getTime() - date1.getTime());
// let daysago = Math.abs(timeDiff / (1000 * 3600 * 24));
// var daysresult;
// if (daysago < 1){
//   var daysresult = `Today`
// } else if (daysago < 2) {
//   var daysresult = `1 day`
// } else {
//   daysago = Math.floor(daysago)
//   var daysresult = `${daysago} days`





  // componentDidUpdate(prevProps){
  //   if (prevProps.match.params.username !== this.props.match.params.username || prevProps.match.params.title !== this.props.match.params.title){
  //     this.props.fetchOneUser(prevProps.match.params.username).then(response => {
  //       this.props.fetchSongByTitle(prevProps.match.params.title)
  //     });
  //   }
  // }



  // this.props.match.params.title
  // this.props.match.params.username

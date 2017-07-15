import React from 'react'
import { fetchOneUser, clearUsers } from '../actions/user_actions.js'
import Error404 from './404page'
import {connect} from 'react-redux'
import { NavLink, Route, Switch, Redirect, Link } from 'react-router-dom';
import { fetchSongByTitle, removeSongs, deleteSong } from '../actions/song_actions.js'
import SongPlayButton from './songplaybuttoncontainer'
import SongCurrentPlayButton from './songcurrentlyplayingbutton'
import SongUpdate from './edit';
import {fetchCommentsBySongID, removeComments, createComment, deleteComment } from '../actions/comment_actions'
import CommentShow from './commentcontainer'
import {createFollow, fetchFollowsByUserID, removeFollows, deleteFollow} from '../actions/follow_actions'
import { requestAudioPlaybackTime } from '../actions/audio_actions';
import { fetchLikesBySongID, removeLikes, createLike, deleteLike } from '../actions/like_actions'
import Wavesurfer from 'react-wavesurfer'
// import Wavesurfer from 'wavesurfer'
import createFragment from 'react-addons-create-fragment';



class SongPage extends React.Component {
  constructor(props){
    super(props)
    this.props.removeLikes()
    this.goToUser = this.goToUser.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
    this.byeBye = this.byeBye.bind(this);
    this.followUser = this.followUser.bind(this)
    this.unfollowUser = this.unfollowUser.bind(this)
    this.howLongAgo = this.howLongAgo.bind(this);
    this.editbutton = null;
    this.deletebutton = null;
    this.props.fetchOneUser(this.props.match.params.username).then((response) => {
      this.props.fetchFollowsByUserID(response.user.id)
    })
    this.likeSong = this.likeSong.bind(this);
    this.unlikeSong = this.unlikeSong.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      body: "",
      comment_time: "",
      song_id: null,
      playing: false,
      pos: 0,
      volume: 0
    }
  }



  componentDidMount(){

    this.props.fetchSongByTitle(this.props.match.params.title).then((response) => {
      this.props.fetchCommentsBySongID(response.song.id)
      this.props.fetchLikesBySongID(response.song.id)})


  }

  followUser(e){
    e.preventDefault()
    this.props.createFollow({follow: {followee_id: this.props.user.id}})
    if (this.props.audio.token === 'PLAYING'){
      this.props.requestAudioPlaybackTime();
    }

  }

  unfollowUser(e){
    e.preventDefault()
    this.props.deleteFollow({follow: {followee_id: this.props.user.id}})
    if (this.props.audio.token === 'PLAYING'){
      this.props.requestAudioPlaybackTime();
    }

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
    // .then(() => this.props.fetchCommentsBySongID(this.props.song.id))
    // this.props.removeComments();
    this.props.createComment({comment})
    this.props.requestAudioPlaybackTime()

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
    this.props.removeLikes()
    this.props.removeFollows()
    if (this.props.song.id  === this.props.audio.id){
        this.props.requestAudioPlaybackTime();
      }
  }

  componentWillReceiveProps(nextProps){

    if (nextProps.match.params.username !== this.props.match.params.username || nextProps.match.params.title !== this.props.match.params.title){
    this.props.removeSongs()
    this.props.clearUsers()
    this.props.removeFollows()
    this.props.removeLikes()
    }

    if (nextProps.audio.token === "PLAYING" && nextProps.audio.id === nextProps.song.id) {
      this.setState({playing: true, volume: 0, pos: nextProps.audio.time})
    } else if (nextProps.audio.token === "PAUSED" && nextProps.audio.id === nextProps.song.id) {
      this.setState({playing: false, volume: 0, pos: nextProps.audio.time})
    }
  }

  handlePosChange(e) {
    this.setState({
        pos: e.originalArgs[0]
      });
    }


  likeSong(e){
    e.preventDefault()
    this.props.createLike({like: {song_id: this.props.song.id}})
    if (this.props.audio.token === 'PLAYING'){
      this.props.requestAudioPlaybackTime();
    }
    console.log(`${this.wavesurfer._wavesurfer.backend.mergedPeaks}`)
    window.wavesurfer= this.wavesurfer
  }

  unlikeSong(e){
    e.preventDefault()
    this.props.deleteLike({like: {song_id: this.props.song.id}})
    if (this.props.audio.token === 'PLAYING'){
      this.props.requestAudioPlaybackTime();
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

      return <CommentShow comment={comment} timeago={this.howLongAgo(comment.created_at)} parent={this} />
      })

      let followbutton;
      let followedUsers =  Object.keys(this.props.follows.byFollowerID).join(",").split(",").map(key => parseInt(key))
      let followcount = followedUsers.length


      if (!isNaN(followedUsers[0])){
        if (followedUsers.includes(this.props.currentUser.id)) {
          followbutton = <button onClick={this.unfollowUser} className='userpage-follow-button-unfollow'  > Unfollow </button>
        } else {
          followbutton = <button onClick={this.followUser} className='userpage-follow-button-follow'>  Follow </button>
        }
        followcount = followedUsers.length
      } else {
        followcount = 0;
        followbutton = <button onClick={this.followUser} className='userpage-follow-button-follow'> Follow </button>
      }






    let likebutton;
    let likecount

    if (!isNaN(this.props.likedUsers[0])){
      if (this.props.likedUsers.includes(this.props.currentUser.id)) {
        likebutton = <button onClick={this.unlikeSong}  className="songpage-likebutton-liked">Liked</button>
      } else {
        likebutton = <button onClick={this.likeSong} className="songpage-likebutton-notliked">Like</button>
      }
      likecount = this.props.likedUsers.length
    } else {
      likecount = 0;
      likebutton = <button onClick={this.likeSong} className="songpage-likebutton-notliked">Like</button>
    }


    let genre = `#${this.props.song.genre}`
    let songplay;
    let waveform = null;

    if (this.props.audio.id !== null && this.props.audio.id === this.props.song.id){
      songplay = <SongCurrentPlayButton className="PlayinSongPage" song={this.props.song} />
      waveform = <Wavesurfer
         audioFile={this.props.song.track_url}
         container={`#waveform-songpage`}
         onPosChange={this.handlePosChange}
         className="test"
         pos={this.state.pos}
         volume='0'
         onClick={this.handleWaveformClick}
         playing={this.state.playing}
         options={{waveColor: '#ddd',
           progressColor:'#ff7540',
           barWidth: 1}}

         ref={Wavesurfer => this.wavesurfer = Wavesurfer}
         />




    } else {
      songplay = <SongPlayButton className="PlayinSongPage" song={this.props.song} />
    }

    let timesincerelease = this.howLongAgo(this.props.song.created_at)


    // Created date functionality

    let releasedate

    let rubydate = this.props.song.created_at.slice(0, 10)
    let createddate = new Date(rubydate)
    releasedate = createddate.toDateString()


    //

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
              <div className='waveform' id='waveform-songpage'>
                {waveform}

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
          <div className="comment-creation-portion">
          <img className="comment-currentuser-avatar" src={this.props.currentUser.avatar_url} />
          <input type="text"
              value={this.state.body}
              onChange={this.update('body')}
              onKeyDown={this.handleSubmit}
              className="comment-input-songpage"
              placeholder="Write a Comment"
              ref={input => this.commentfield = input}
            />
        </div>
          <div className="songpage-user-buttons">
            {likebutton}
            {this.editbutton}
            {this.deletebutton}
            <div className="songpage-counters">
              <div className="songpage-like-count">{likecount}</div>
            </div>
          </div>
        </div>
        <div className="rest-of-songpage">
        <div className="left-comment-pane">
          <img className="artist-avatar-songpage" src={this.props.user.avatar_url} onClick={this.goToUser}/ >
          <div className="artist-info-songpage">
            <h3 className="artist-info-username" onClick={this.goToUser}> {this.props.user.username} <img className='verification-badge' src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UHJvIFN0YXI8L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTYgMTJBNiA2IDAgMSAwIDYgMGE2IDYgMCAwIDAgMCAxMnoiIGZpbGw9IiNGNTAiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNiA4LjA3TDMuMzU1IDkuNjRsLjY3Ni0zLTIuMzEtMi4wMyAzLjA2Mi0uMjg1TDYgMS41bDEuMjE3IDIuODI1IDMuMDYzLjI4NC0yLjMxMSAyLjAzLjY3NiAzLjAwMnoiLz48L2c+PC9zdmc+'></img></h3>
            <div className='artist-data'>
            <ul className='artist-metadata'>
              <li className='songpage-artist-followcount-image'><img className='follower-icon' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4='></img><div className='after-icon-badge'>{followcount}</div></li>
              <li className='songpage-artist-songcount-image'> <img className='track-icon' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+'></img><div className='after-icon-badge'>{this.props.user.songnum}</div></li>
            </ul>
            {followbutton}
            </div>
          </div>
        </div>
        <div className="comments-songpage">
          <div className="song-date-description">
            <h3 className="song-dd-heading">Release date:</h3>
            <h4 className="song-dd-text">{releasedate}</h4>
            <h3 className="song-dd-heading">Description:</h3>
            <h4 className="song-dd-text">{this.props.song.description}</h4>
          </div>
          <h3 className="comment-count"><div id="comment-icon"></div>{this.props.comments.length} {this.props.comments.length !== 1 ? "comments" : "comment"}</h3>
          <ul className="comment-list">
            {comments}
          </ul>
        </div>
        <div className="songpage-sidebar">

        </div>
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
      comments: state.comments.allcomments,
      audio: state.audio,
      likes: state.likes.alllikes,
      likedUsers: Object.keys(state.likes.bySongID).join(",").split(",").map(key => parseInt(key)),
      follows: state.follows
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
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (comment) => dispatch(deleteComment(comment)),
    requestAudioPlaybackTime: () => dispatch(requestAudioPlaybackTime()),
    fetchLikesBySongID: (id) => dispatch(fetchLikesBySongID(id)),
    removeLikes: () => dispatch(removeLikes()),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (like) => dispatch(deleteLike(like)),
    fetchFollowsByUserID: (id) => dispatch(fetchFollowsByUserID(id)),
    createFollow: (follow) => dispatch(createFollow(follow)),
    deleteFollow: (follow) => dispatch(deleteFollow(follow)),
    removeFollows: () => dispatch(removeFollows())
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

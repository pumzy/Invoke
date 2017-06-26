import React from 'react'
import { fetchOneUser, clearUsers } from '../actions/user_actions.js'
import Error404 from './404page'
import {connect} from 'react-redux'
import { NavLink, Route, Switch, Redirect, Link } from 'react-router-dom';
import { fetchSongByTitle, removeSongs } from '../actions/song_actions.js'
import SongPlayButton from './songplaybuttoncontainer'
import SongUpdate from './edit';



// this.props.match.params.title
// this.props.match.params.username

class SongPage extends React.Component {
  constructor(props){
    super(props)
    this.goToUser = this.goToUser.bind(this);
  }

  componentDidMount(){
    this.props.fetchOneUser(this.props.match.params.username);
    this.props.fetchSongByTitle(this.props.match.params.title)
  }

  componentWillUnmount(){
    this.props.removeSongs()
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

  // componentDidUpdate(prevProps){
  //   if (prevProps.match.params.username !== this.props.match.params.username || prevProps.match.params.title !== this.props.match.params.title){
  //     this.props.fetchOneUser(prevProps.match.params.username).then(response => {
  //       this.props.fetchSongByTitle(prevProps.match.params.title)
  //     });
  //   }
  // }


  render(){
    debugger
    let editbutton = null;
    if (this.props.currentUser&& this.props.user){
      if (this.props.currentUser.id === this.props.user.id){
        editbutton = <Route to={`${this.props.location.pathname}/edit`} Component={SongUpdate} song={this.props.song} />
    }}

    if (!this.props.song || !this.props.user) {
      return null
    } else {
    let genre = `#${this.props.song.genre}`
    let songplay = <SongPlayButton className="PlayinSongPage" song={this.props.song} />
    let date;
    let date1 = new Date(`${this.props.song.created_at}`);
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

    let result;
    if (!(this.props.match.params.username && this.props.match.params.title )){
      result = <Error404 />
    } else {
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
                  <div className="genre"><span className="how-long-ago">{daysresult}</span></div>
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
          {editbutton}
        </div>

      )
    }
  }
}




const mapStateToProps = (state, ownProps) => {
// var getuser = new Promise((resolve, reject) => resolve( fetchOneUser(ownProps.match.params.username)));
// var getsong = new Promise((resolve, reject) => resolve( fetchSongByTitle(ownProps.match.params.title)));
//   return getuser.then(() => getsong).then(() => (

    return  {
      user: state.users.byUsername[ownProps.match.params.username],
      song: state.songs.byTitle[ownProps.match.params.title],
      currentUser: state.session.currentUser
    };
  }

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongsByUserID: (id) => dispatch(fetchSongsByUserID(id)),
    fetchSongByTitle: (title)=> dispatch(fetchSongByTitle(title)),
    fetchOneUser: (username) => dispatch(fetchOneUser(username)),
    removeSongs: () => dispatch(removeSongs())
  }
}

// Need to change this to a selector which gets all the songs by the artist

export default connect(mapStateToProps, mapDispatchToProps)(SongPage);
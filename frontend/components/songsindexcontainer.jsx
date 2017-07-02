import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { fetchSongs, removeSongs } from '../actions/song_actions'
import { fetchUsers, clearUsers } from '../actions/user_actions'
import { removeAudioToken} from '../actions/audio_actions'
import { connect } from 'react-redux'
import SongPlay from './songplaycontainer'
import { fetchLikes, removeLikes } from '../actions/like_actions'
import { fetchCurrentUserFollows} from '../actions/follow_actions'
// import SongCurrentPlay from './songcurrentplayingButton.jsx'

class SongsIndex extends React.Component {
  constructor(props){
    super(props)
    this.likes = [];
    debugger
    if (this.props.location.pathname === '/stream'){
      this.props.fetchCurrentUserFollows();
    }
  }

  componentDidMount() {
    this.props.fetchUsers().then(() => this.props.fetchSongs())
    this.props.fetchLikes()
  }

  componentWillUnmount(){
    this.props.removeSongs()
    this.props.clearUsers()
    // this.props.removeLikes()

    // this.props.removeAudioToken();
    
  }

  render() {

    // let likes = [];
    // if (this.props.likes){
    //
    //   likes = this.props.likes
    // }
    let likes = [];
    if(this.props.likes.length > 0 ){
      likes = this.props.likes;
    }

    return (
    <div className="index">
      <div className="Homepagenavdiv">
      <nav className='homepage-nav'>
            <ul className="homepage-nav-list">
              <li className="flexfoo"><NavLink to='/stream'>Stream</NavLink></li>
              <li className="flexfoo"><NavLink to='/charts'>Charts</NavLink></li>
              <li className="flexfoo"><NavLink to='/discover'>Discover</NavLink></li>
            </ul>
          </nav>
        </div>
     <section className="songindexlist">
       <h2 className="streamheader">Hear the latest posts from the people you’re following: </h2>
        <ul>
          {
            this.props.allsongs.slice(0,10).map(song => (
              <li key={`song_${song.id}`}  className="indexlist">
                <SongPlay likes={likes.filter(like => like.song_id === song.id)}
                  waveformid={song.id} song={song}
                  user={this.props.usersbyID[song.user_id]} />
              </li>
            ))
          }
        </ul>
      </section>
    </div>
    );
  }
}



const mapStateToProps = (state) => {

  return { byUsername: state.songs.byUsername,
           allsongs: state.songs.allsongs,
           usersbyID: state.users.byID,
          audio: state.audio,
          likes: state.likes.alllikes}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
    removeSongs: () => dispatch(removeSongs()),
    fetchUsers: () => dispatch(fetchUsers()),
    clearUsers: () => dispatch(clearUsers()),
    removeAudioToken: () => dispatch(removeAudioToken()),
    fetchLikes: () => dispatch(fetchLikes()),
    removeLikes: () => dispatch(removeLikes()),
    fetchCurrentUserFollows: () => dispatch(fetchCurrentUserFollows())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsIndex);

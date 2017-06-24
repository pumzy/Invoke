import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { fetchSongs, removeSongs } from '../actions/song_actions'
import { fetchUsers, clearUsers } from '../actions/user_actions'
import { connect } from 'react-redux'
import SongPlay from './songplaycontainer'

class SongsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchUsers().then(() => this.props.fetchSongs())
  }

  componentWillUnmount(){
    this.props.removeSongs()
    this.props.clearUsers()
  }

  render() {
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
          {this.props.allsongs.map(song => <li key={song.id} className="indexlist"><SongPlay song={song} user={this.props.usersbyID[song.user_id]} /></li>  )}
        </ul>
      </section>
      <Link to="/test"> Test</Link>
      <Link to="/stream">Backlink</Link>
    </div>
    );
  }
}



const mapStateToProps = (state) => {

  return { byUsername: state.songs.byUsername,
           allsongs: state.songs.allsongs,
           usersbyID: state.users.byID}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
    removeSongs: () => dispatch(removeSongs()),
    fetchUsers: () => dispatch(fetchUsers()),
    clearUsers: () => dispatch(clearUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsIndex);

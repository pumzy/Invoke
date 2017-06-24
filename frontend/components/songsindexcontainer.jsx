import React from 'react';
import { Route, Link } from 'react-router-dom';
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
    <div>
     <section className="songindex">
        <ul>
          {this.props.allsongs.map(song => <li key={song.id}>  <SongPlay song={song} user={this.props.usersbyID[song.user_id]} /> </li>  )}
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

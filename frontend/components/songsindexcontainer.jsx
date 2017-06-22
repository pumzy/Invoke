import React from 'react';
import { Route, Link } from 'react-router-dom';
import { fetchSongs } from '../actions/song_actions'
import { connect } from 'react-redux'
import SongPlay from './songplaycontainer'

class SongsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchSongs();
  }

  render() {
    return (
    <div>
     <section className="songindex">
       <h1>All Songs</h1>
        <ul>
          {this.props.allsongs.map(song => <li key={song.id}>  <SongPlay song={song} /> </li>  )}
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
           allsongs: state.songs.allsongs  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsIndex);

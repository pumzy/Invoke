import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

class SongPlay extends React.Component {
  render(){
    return(
      <div>
        <h2>{this.props.song.title}</h2>
          <audio controls>
            <source src={this.props.song.track_url} type="audio/mpeg" />
        </audio>
      </div>
    )
  }
}

export default SongPlay;

import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'




class BottomPlayBar extends React.Component {


  render(){
    let audioplayer;
    if (this.props.audio.track_url !== "") {
      audioplayer = <div>
                        <h2>{this.props.audio.title}</h2>
                        <audio controls> <source src={this.props.audio.track_url} type="audio/mpeg" /> </audio>
                    </div>
    } else {
      audioplayer = <h2>No song in queue</h2>
    }


    return(
      <div className="playbar">
        {audioplayer}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { audio: state.audio }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPlayBar);

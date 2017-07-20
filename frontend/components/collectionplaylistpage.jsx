import React from 'react'
import { Route, Link, NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import SongPlayButton from './songplaybuttoncontainer'
import SongCurrentPlayButton from './songcurrentlyplayingbutton'
import { fetchPlaylistsByUserID, removePlaylists} from '../actions/playlist_actions'




class CollectionPlaylistPage extends React.Component {
  constructor(props){
    super(props)
    this.props.fetchPlaylistsByUserID(this.props.currentUser.id)
    this.createBoxes = this.createBoxes.bind(this)
  }

  componentWillUnmount(){
    this.props.removePlaylists()
  }

  createBoxes(num){

    if (num%6 === 0) return;
    let number = 6 - num%6
    let boxes = []
    for (var i = 0; i < number; i++) {
      boxes.push(
        <li className='likepage-song-item-li'>
          <div className='likepage-song-item-coverart-div'>
            <div className='useless-grey-box'></div>
          </div>
        </li>
      )
    }
    return boxes
  }



  render(){


    let playlistsection;

    if(this.props.allplaylists.length > 0){
      let playlistlist = Object.values(this.props.PlaylistsbyID).map(playlist => {



        return (<li className='likepage-song-item-li'>
          <div className='likepage-song-item-coverart-div'>
            <img className='likepage-song-item-coverart' src={playlist.playlist_songs[0] ? playlist.playlist_songs[0].cover_art_url : playlist.user.avatar_url}/>

          </div>
          <div className='likepage-song-item-title'> <span>{playlist.title}</span></div>
          <div className='likepage-song-item-artist' onClick={() => this.props.history.push(`/${playlist.user.username}`)}>{playlist.user.username}</div>
        </li>)
      })



      playlistsection = (
         <section className="likepage">
            <ul className='likepage-ul'>
              {playlistlist.concat(this.createBoxes(playlistlist.length))}
            </ul>
          </section>
      )
    }










    return   (
      <div className="index">
        <div className="Homepagenavdiv">
        <nav className='homepage-nav'>
              <ul className="homepage-nav-list">
                <li className="flexfoo"><NavLink to='/you/collection'>Overview</NavLink></li>
                <li className="flexfoo"><NavLink to='/you/likes'>Likes</NavLink></li>
                <li className="flexfoo"><NavLink to='/you/sets'>Playlists</NavLink></li>
                <li className="flexfoo"><NavLink to='/you/following'>Following</NavLink></li>

              </ul>
            </nav>
          </div>

          <section className="likepage">
            <h2 className="streamheader shift-header" >Playlists you have created: </h2>
            {playlistsection}
           </section>
      </div>
    )


  }
}








  const mapStateToProps = (state, ownProps) => {


      return  {
        currentUser: state.session.currentUser,
        audio: state.audio,
        allsongs: state.songs.allsongs,
        SongsbyID: state.songs.byID,
        PlaylistsbyID: state.playlists.byID,
        allplaylists: state.playlists.allplaylists
      };
    }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchLikedSongs: () => dispatch(fetchLikedSongs()),
      removeSongs: () => dispatch(removeSongs()),
      fetchPlaylistsByUserID: (id) => (dispatch(fetchPlaylistsByUserID(id))),
      removePlaylists: () => (dispatch(removePlaylists()))
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(CollectionPlaylistPage);

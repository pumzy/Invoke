import React from 'react'
import { Route, Link, NavLink } from 'react-router-dom';
import { fetchLikedSongs, removeSongs } from '../actions/song_actions'
import {connect} from 'react-redux'
import SongPlayButton from './songplaybuttoncontainer'
import SongCurrentPlayButton from './songcurrentlyplayingbutton'
import { fetchPlaylistsByUserID, removePlaylists} from '../actions/playlist_actions'
import { fetchCurrentUserFollows, removeFollows } from '../actions/follow_actions'




class CollectionPage extends React.Component {
  constructor(props){
    super(props)
    this.props.fetchLikedSongs()
    this.props.fetchPlaylistsByUserID(this.props.currentUser.id)
    this.props.fetchCurrentUserFollows()
    this.createBoxes = this.createBoxes.bind(this)
  }

  componentWillUnmount(){
    this.props.removeSongs()
    this.props.removePlaylists()
    this.props.removeFollows()

  }

  createBoxes(num, token){
    let number;
    if (num === 0) number = 6;
    else if (num%6 === 0) return
    else {number = 6 - num%6}

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

    let likesection;


    if(this.props.allsongs.length > 0){
      let likelist = Object.values(this.props.SongsbyID).map(song => {

        let songplaybutton

        if (this.props.audio.id === song.id){
          songplaybutton = <SongCurrentPlayButton  song={song} playstate={this.props.audio.token} />
        } else {
          songplaybutton = <SongPlayButton  song={song} />
        }

        return (<li className='likepage-song-item-li'>
          <div className='likepage-song-item-coverart-div'>
            <img className='likepage-song-item-coverart' src={song.cover_art_url} onClick={() => this.props.history.push(`/${song.user.username}/${song.title}`)} />
            {songplaybutton}
          </div>
          <div className='likepage-song-item-title' onClick={() => this.props.history.push(`/${song.user.username}/${song.title}`)}> <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfbGlrZXNfZ3JleTwvdGl0bGU+PHBhdGggZD0iTTEwLjgwNSAzYy0yLjAyIDAtMi44MDQgMi4zNDUtMi44MDQgMi4zNDVTNy4yMTMgMyA1LjE5NiAzQzMuNDk0IDMgMS43NDggNC4wOTYgMi4wMyA2LjUxNGMuMzQ0IDIuOTUzIDUuNzI1IDYuNDc5IDUuOTYzIDYuNDg3LjIzOC4wMDggNS43MzgtMy43MjIgNS45ODgtNi41QzE0LjE4OCA0LjIwMSAxMi41MDcgMyAxMC44MDUgM3oiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==' className='likepage-like-heart'></img> <span>{song.title}</span></div>
          <div className='likepage-song-item-artist' onClick={() => this.props.history.push(`/${song.user.username}`)}>{song.user.username}</div>
        </li>)
      })



      likesection = (
         <section className="likepage">
            <ul className='likepage-ul'>
              {likelist.concat(this.createBoxes(likelist.length, 'like'))}
            </ul>
          </section>
      )




    } else {
      let likelist = []
       likesection = (
           <section className="likepage">
              <ul className='likepage-ul'>
                  {likelist.concat(this.createBoxes(likelist.length, 'like'))}
              </ul>
            </section>
          )
    }

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
              {playlistlist.concat(this.createBoxes(playlistlist.length, 'playlist'))}
            </ul>
          </section>
      )




    } else {
      let playlistlist = []
       playlistsection = (
           <section className="likepage">
              <ul className='likepage-ul'>
                {playlistlist.concat(this.createBoxes(playlistlist.length, 'playlist'))}
              </ul>
            </section>
          )
    }

    let followingsection;

    if(this.props.allfollows.length > 0){
       let followlist = Object.values(this.props.byFolloweeID).map(follow => {

        return (<li className='likepage-song-item-li'>
          <div className='likepage-song-item-coverart-div'>
            <img className='likepage-song-item-coverart' src={follow.followee.avatar_url} onClick={() => this.props.history.push(`/${follow.followee.username}`)}/>
          </div>
          <div className='likepage-song-item-title' onClick={() => this.props.history.push(`/${follow.followee.username}`)}> <span>{follow.followee.username}</span></div>
        </li>)
      })



      followingsection = (
         <section className="likepage followingpage">
            <ul className='likepage-ul'>
              {followlist.concat(this.createBoxes(followlist.length, 'follow'))}
            </ul>
          </section>
      )

    } else {
      let followlist = []
      followingsection = (
         <section className="likepage followingpage">
            <ul className='likepage-ul'>
              {followlist.concat(this.createBoxes(followlist.length, 'follow'))}
            </ul>
          </section>
      )

    }









    return   (
      <div className="collection index">
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
          <div className='collection-likes'>
            <div className='collection-subheading-div'>
              <h2 className='collection-subheading'>Likes</h2>
              </div>
              {likesection}
          </div>
          <div className='collection-playlists'>
            <div className='collection-subheading-div'>
              <h2 className='collection-subheading'>Playlists</h2>
            </div>
            {playlistsection}
          </div>
          <div className='collection-following'>
            <div className='collection-subheading-div'>
              <h2 className='collection-subheading'>Following</h2>
            </div>
            {followingsection}
          </div>
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
        allplaylists: state.playlists.allplaylists,
        allfollows: state.follows.allfollows,
        byFolloweeID: state.follows.byFolloweeID
      };
    }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchLikedSongs: () => dispatch(fetchLikedSongs()),
      removeSongs: () => dispatch(removeSongs()),
      fetchPlaylistsByUserID: (id) => (dispatch(fetchPlaylistsByUserID(id))),
      removePlaylists: () => (dispatch(removePlaylists())),
      fetchCurrentUserFollows: () => dispatch(fetchCurrentUserFollows()),
      removeFollows: () => dispatch(removeFollows()),
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);

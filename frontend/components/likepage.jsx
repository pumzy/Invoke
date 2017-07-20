import React from 'react'
import { Route, Link, NavLink } from 'react-router-dom';
import { fetchLikedSongs, removeSongs } from '../actions/song_actions'
import {connect} from 'react-redux'
import SongPlayButton from './songplaybuttoncontainer'
import SongCurrentPlayButton from './songcurrentlyplayingbutton'



class LikePage extends React.Component {
  constructor(props){
    super(props)
    this.props.fetchLikedSongs()
  }

  componentWillUnmount(){
    this.props.removeSongs()
  }



  render(){

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
            <img className='likepage-song-item-coverart' src={song.cover_art_url} onClick={() => this.props.history.push(`/${song.user.username}/${song.title}`)}/>
            {songplaybutton}
          </div>
          <div className='likepage-song-item-title' onClick={() => this.props.history.push(`/${song.user.username}/${song.title}`)}> <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfbGlrZXNfZ3JleTwvdGl0bGU+PHBhdGggZD0iTTEwLjgwNSAzYy0yLjAyIDAtMi44MDQgMi4zNDUtMi44MDQgMi4zNDVTNy4yMTMgMyA1LjE5NiAzQzMuNDk0IDMgMS43NDggNC4wOTYgMi4wMyA2LjUxNGMuMzQ0IDIuOTUzIDUuNzI1IDYuNDc5IDUuOTYzIDYuNDg3LjIzOC4wMDggNS43MzgtMy43MjIgNS45ODgtNi41QzE0LjE4OCA0LjIwMSAxMi41MDcgMyAxMC44MDUgM3oiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==' className='likepage-like-heart'></img> <span>{song.title}</span></div>
          <div className='likepage-song-item-artist' onClick={() => this.props.history.push(`/${song.user.username}`)}>{song.user.username}</div>
        </li>)
      })


      return(
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

           <h2 className="streamheader shift-header" >Hear the tracks you've liked: </h2>
            <ul className='likepage-ul'>
              {likelist}
            </ul>
          </section>
        </div>
      )
    } else {
      return(
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

           <h2 className="streamheader" >Hear the tracks you've liked: </h2>

          </section>
        </div>)
    }
  }
}








  const mapStateToProps = (state, ownProps) => {


      return  {
        currentUser: state.session.currentUser,
        audio: state.audio,
        allsongs: state.songs.allsongs,
        SongsbyID: state.songs.byID
      };
    }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchLikedSongs: () => dispatch(fetchLikedSongs()),
      removeSongs: () => dispatch(removeSongs())
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(LikePage);

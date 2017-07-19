import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchSongs, removeSongs, searchSongs } from '../actions/song_actions'
import { fetchAllUsers, clearUsers, searchUsers, fetchOneUserByID } from '../actions/user_actions'
import SongPlay from './songplaycontainer'

class Search extends React.Component{
  constructor(props){
    super(props)
    // this.props.removeSongs()
    // this.props.clearUsers()
    this.query = this.props.location.search.slice(3)
    this.state = {
      users: [],
      songs: [],
      nosongs: false,
      nousers: false
    }



    this.props.searchSongs(this.query).then( response => {
      this.setState({songs: response.songs})
      if (response.songs.length === 0){
        this.setState({nosongs: true})
      } else this.setState({nosongs: false})
      for (var i = 0; i < this.props.allsongs.length; i++) {
        this.props.fetchOneUserByID(this.props.allsongs[i].user_id)
      }
    })
    this.props.searchUsers(this.query).then(response => {
      if (response.users.length === 0){
        this.setState({nousers: true})
      } else this.setState({nousers: false})
      this.setState({users: response.users})
    })
  }


  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    this.query = nextProps.location.search.slice(3)

    if (nextProps.location.search !== this.props.location.search){

      this.setState({nosongs: false})
      this.props.removeSongs()
      this.props.clearUsers()
      this.query = nextProps.location.search.slice(3)
      this.props.searchSongs(this.query).then( response => {
        if (response.songs.length === 0){
          this.setState({nosongs: true})
        } else this.setState({nosongs: false})
        this.setState({songs: response.songs})
        for (var i = 0; i < this.props.allsongs.length; i++) {
          this.props.fetchOneUserByID(this.props.allsongs[i].user_id)
        }
      })
      this.props.searchUsers(this.query).then(response => {
        if (response.users.length === 0){
          this.setState({nousers: true})
        } else this.setState({nousers: false})

        this.setState({users: response.users})
      })
    }

  }

  componentWillUnmount(){
    this.props.removeSongs()
    this.props.clearUsers()
  }

  render(){
        let userlist;
        let songlist;
        if (this.props.location.pathname.includes('people')){
          $('.search-people-span').addClass('active')
          $('.search-tracks-span').removeClass('active')
          $('.search-everything-span').removeClass('active')
        } else if (this.props.location.pathname.includes('tracks')){
          $('.search-tracks-span').addClass('active')
          $('.search-people-span').removeClass('active')
          $('.search-everything-span').removeClass('active')
        } else {
          $('.search-everything-span').addClass('active')
          $('.search-people-span').removeClass('active')
          $('.search-tracks-span').removeClass('active')
        }


        if( this.props.location.pathname.includes('people')){
        songlist = null;

        if (this.state.nousers === false){
        userlist = this.state.users.map(user => {




        return(
          <li className='search-user-li'>
            <div className='search-user-topdiv'>
              <img src={user.avatar_url} className='user-search-image' onClick={() => this.props.history.push(`/${user.username}`)}></img>
              <div className='user-search-user-info'>
                <h3 onClick={() => this.props.history.push(`/${user.username}`)}>{user.username}<img className='verification-badge' src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UHJvIFN0YXI8L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTYgMTJBNiA2IDAgMSAwIDYgMGE2IDYgMCAwIDAgMCAxMnoiIGZpbGw9IiNGNTAiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNiA4LjA3TDMuMzU1IDkuNjRsLjY3Ni0zLTIuMzEtMi4wMyAzLjA2Mi0uMjg1TDYgMS41bDEuMjE3IDIuODI1IDMuMDYzLjI4NC0yLjMxMSAyLjAzLjY3NiAzLjAwMnoiLz48L2c+PC9zdmc+'></img></h3>
                  <ul className='artist-metadata'>
                    <li className='songpage-artist-followcount-image'><img className='follower-icon' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4='></img><div className='after-icon-badge'>{user.followernum}</div></li>
                    <li className='songpage-artist-songcount-image'> <img className='track-icon' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+'></img><div className='after-icon-badge'>{user.songnum}</div></li>
                  </ul>

              </div>
            </div>
          </li>
        )
      })
    }
       } else if ( this.props.location.pathname.includes('tracks')){
        userlist = null;
        if (!this.state.nosongs){
          songlist = this.state.songs.map(song => (
           <li className='search-song-li'><SongPlay song={song}  likes={this.props.alllikes.filter(like => like.song_id === song.id)}
             waveformid={song.id} ></SongPlay></li>
          ))
        }
      } else {
        if (!this.state.nosongs){
          songlist = this.state.songs.map(song => (
           <li className='search-song-li'><SongPlay song={song}  likes={this.props.alllikes.filter(like => like.song_id === song.id)}
             waveformid={song.id} ></SongPlay></li>
          ))
        }


      if (this.state.nousers === false){
        userlist = this.state.users.map(user => {




        return(
          <li className='search-user-li'>
            <div className='search-user-topdiv'>
              <img src={user.avatar_url} className='user-search-image'></img>
              <div className='user-search-user-info'>
                <h3 onClick={() => this.props.history.push(`/${user.username}`)}>{user.username}<img className='verification-badge' src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UHJvIFN0YXI8L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTYgMTJBNiA2IDAgMSAwIDYgMGE2IDYgMCAwIDAgMCAxMnoiIGZpbGw9IiNGNTAiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNiA4LjA3TDMuMzU1IDkuNjRsLjY3Ni0zLTIuMzEtMi4wMyAzLjA2Mi0uMjg1TDYgMS41bDEuMjE3IDIuODI1IDMuMDYzLjI4NC0yLjMxMSAyLjAzLjY3NiAzLjAwMnoiLz48L2c+PC9zdmc+'></img></h3>
                  <ul className='artist-metadata'>
                    <li className='songpage-artist-followcount-image'><img className='follower-icon' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4='></img><div className='after-icon-badge'>{user.followernum}</div></li>
                    <li className='songpage-artist-songcount-image'> <img className='track-icon' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+'></img><div className='after-icon-badge'>{user.songnum}</div></li>
                  </ul>

              </div>
            </div>
          </li>
        )
      })
    }}


    if ((this.state.songs.length > 0 && Object.keys(this.props.usersbyID).includes(`${this.state.songs[this.state.songs.length - 1].user_id}`)) || this.state.nosongs === true ){
      return(
      <div className='searchpage'>
        <h1 className='searchpage-header' >Search results for "{this.query}"</h1>
        <div className='search-leftpane'>
          <ul className='search-leftpane-options'>
            <li className='search-leftpane-options-li'>
              <a className='search-everything-span' href={'/#/search' + this.props.location.search}> Everything </a>
            </li>
            <li className='search-leftpane-options-li'><a className='search-tracks-span' href={'/#/search/tracks' + this.props.location.search} >Tracks</a> </li>
            <li className='search-leftpane-options-li'><a className='search-people-span' href={'/#/search/people' + this.props.location.search}>People</a> </li>
          </ul>
        </div>
        <div className='search-actual'>
          <ul className='searched-users'>
            {userlist}
          </ul>

          <ul className='searched-songs'>
            {songlist}
          </ul>
        </div>
      </div>)

  } else {
    return <div className='loader'>Loading...</div>
  }


}


}




const mapStateToProps = (state) => {
  return { currentUser: state.session.currentUser,
           allsongs: state.songs.allsongs,
           allusers: state.users.allusers,
           alllikes: state.likes.alllikes,
           usersbyID: state.users.byID
         }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
    removeSongs: () => dispatch(removeSongs()),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    clearUsers: () => dispatch(clearUsers()),
    removeAudioToken: () => dispatch(removeAudioToken()),
    searchUsers: (query) => dispatch(searchUsers(query)),
    searchSongs: (query) => dispatch(searchSongs(query)),
    fetchOneUserByID: (id) => dispatch(fetchOneUserByID(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))

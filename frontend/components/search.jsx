import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchSongs, removeSongs, searchSongs } from '../actions/song_actions'
import { fetchAllUsers, clearUsers, searchUsers, fetchOneUserByID } from '../actions/user_actions'
import SongPlay from './songplaycontainer'

class Search extends React.Component{
  constructor(props){
    super(props)
    this.query = this.props.location.search.slice(3)
    this.state = {
      users: [],
      songs: [],
      nosongs: false
    }


    this.props.searchSongs(this.query).then( response => {
      this.setState({songs: response.songs})
      if (response.songs.length === 0){
        this.setState({nosongs: true})
      }
      for (var i = 0; i < this.props.allsongs.length; i++) {
        this.props.fetchOneUserByID(this.props.allsongs[i].user_id)
      }
    })
    this.props.searchUsers(this.query).then(response => {
      this.setState({users: response.users})
    })
  }


  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    debugger
    this.query = nextProps.location.search.slice(3)

    if (nextProps.location.search !== this.props.location.search){
      this.setState({nosongs: false})
      this.props.removeSongs()
      this.props.clearUsers()
      this.query = nextProps.location.search.slice(3)
      this.props.searchSongs(this.query).then( response => {
        if (response.songs.length === 0){
          this.setState({nosongs: true})
        }
        this.setState({songs: response.songs})
        for (var i = 0; i < this.props.allsongs.length; i++) {
          this.props.fetchOneUserByID(this.props.allsongs[i].user_id)
        }
      })
      this.props.searchUsers(this.query).then(response => {
        this.setState({users: response.users})
      })
    }

  }

  // componentWillUnmount(){
  //   this.props.removeSongs()
  //   this.props.clearUsers()
  // }

  render(){
        let userlist;
        let songlist;


        if( this.props.location.pathname.includes('people')){
        songlist = null;
        userlist = this.state.users.map(user => <li>{user.username}</li>);
       } else if ( this.props.location.pathname.includes('tracks')){
        userlist = null;
        songlist = this.state.songs.map(song => (
         <li  className='search-song-li'><SongPlay song={song} user={this.props.usersbyID[`${song.user_id}`]} likes={this.props.alllikes.filter(like => like.song_id === song.id)}
           waveformid={song.id} key={song.id} ></SongPlay></li>
        ))
      } else {
        songlist = this.state.songs.map(song => (
         <li className='search-song-li'><SongPlay song={song} user={song.user} likes={this.props.alllikes.filter(like => like.song_id === song.id)}
           waveformid={song.id} ></SongPlay></li>
        ))
        userlist = this.state.users.map(user => <li>{user.username}</li>);
      }


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

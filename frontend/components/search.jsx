import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchSongs, removeSongs, searchSongs } from '../actions/song_actions'
import { fetchAllUsers, clearUsers,searchUsers } from '../actions/user_actions'
import SongPlay from './songplaycontainer'

class Search extends React.Component{
  constructor(props){
    super(props)
    this.query = this.props.location.search.slice(3)
    this.props.searchUsers(this.query);
    this.props.searchSongs(this.query)


  }

  componentWillReceiveProps(nextProps){
  if (nextProps.location.search !== this.props.location.search){
      this.props.removeSongs()
      this.props.clearUsers()
      this.query = nextProps.location.search.slice(3)
      this.props.searchUsers(this.query);
      this.props.searchSongs(this.query)
    }
  }

  componentWillUnmount(){
    this.props.removeSongs()
    this.props.clearUsers()
  }


  render(){

    let userlist;
    let songlist;





    return(
      <div className='searchpage'>
        <h1 className='searchpage-header' >Search results for "{this.query}"</h1>
        <div className='search-leftpane'>
          <ul className='search-leftpane-options'>
            <li className='search-leftpane-options-li'>
              <span className='search-everything-span'> Everything </span>
            </li>
            <li className='search-leftpane-options-li'><span className='search-tracks-span'>Tracks</span></li>
            <li className='search-leftpane-options-li'><span className='search-people-span'>People</span></li>
          </ul>
        </div>
        <div className='search-actual'>
          <ul className='searched-users'>
            {this.props.allusers.map(user => <li>{user.username}</li>)}
          </ul>
          Break
          <ul className='searched-songs'>
            {this.props.allsongs.map(song => <li>{song.title}</li>)}
          </ul>
        </div>
      </div>)

  }


}




const mapStateToProps = (state) => {
  return { currentUser: state.session.currentUser,
           allsongs: state.songs.allsongs,
           allusers: state.users.allusers
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
    searchSongs: (query) => dispatch(searchSongs(query))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))

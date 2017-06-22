import React from 'react'
import { fetchSongsByUserID } from '../actions/song_actions.js'
import { fetchOneUserByID, fetchOneUser } from '../actions/user_actions.js'
import Error404 from './404page'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import SongPlay from './songplaycontainer'



class UserPage extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchOneUser(this.props.match.params.username).then(response => {
      this.props.fetchSongsByUserID(response.user.id)
    });

    // let result;
    // if (this.user !== null) {
    //   result = <h1>this.props.user.username</h1>
    //   this.result = result
    // }
  }

  componentWillUpdate(nextProps){
    if (nextProps.match.params.username !== this.props.match.params.username){
      this.props.fetchOneUser(nextProps.match.params.username)
    }
  }


  render(){

    let result;
    if (!this.props.user){
      result = <Error404 />
    } else {
      let songs = this.props.songs.map(song => (<SongPlay song={song}/>));
      result = <div><h1>{this.props.user.username}</h1>
                    {songs}
              </div>
    }


    return(
      <div>
        {result}
      </div>
    )
  }

}




const mapStateToProps = (state, ownProps) => {
    // let username = location.location.pathname.slice(1)
    // let user = null;
    // const getuser = new Promise((resolve, reject) => resolve(store.dispatch(fetchOneUserByID(username)))).then( () => ({user: state.users.byUsername[state.users.allusers[0]]}));
    return {user: state.users.byUsername[ownProps.match.params.username],
            songs: state.songs.allsongs }

}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongsByUserID: (id) => dispatch(fetchSongsByUserID(id)),
    fetchOneUser: (username) => dispatch(fetchOneUser(username)),
  }
}

// Need to change this to a selector which gets all the songs by the artist

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

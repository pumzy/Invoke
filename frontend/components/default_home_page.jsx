import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchSongs } from '../actions/song_actions'
import { fetchUsers} from '../actions/user_actions'
import { logout, clearErrors } from '../actions/session_actions'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionForm from './session_form'
import Modal from './modal'



class DefaultHomePage extends React.Component   {
  constructor(props){
    super(props)
    this.state = { loginModalOpen: false, createModalOpen: false }
  }

  openLoginModal() {
    this.setState({ loginModalOpen: true })
  }
  openCreateModal() {
    this.setState({ createModalOpen: true })
  }

  closeLoginModal() {
    this.setState({ loginModalOpen: false})
  }

  closeCreateModal() {
    this.setState({ createModalOpen: false})
  }

  close(e) {
    e.preventDefault()
    this.setState({ loginModalOpen: false, createModalOpen: false })
    $("html").removeClass("faker")
  }

  componentDidMount() {
    this.props.fetchUsers().then(() => this.props.fetchSongs())
  }

  componentWillUnmount(){
    // this.props.removeSongs()
    // this.props.clearUsers()
  }


  render(){

    let backdrop;
    if (this.state.loginModalOpen === true ||this.state.createModalOpen === true  ){
      backdrop = <div className='modal-backdrop' onClick={e => this.close(e)}/>
      $("html").addClass("faker")
    }

    let allsonglist = this.props.allsongs.slice(0,12)


    let heading = <h1>Welcome to Invoke</h1>
      return (

        <div className='defaulthomecontainer'>

          <div className="headercontainer">
            <div className='homepagelogo'></div>

            <div className="homepagetopbuttons">
              <button onClick={() => this.openLoginModal()} className="loginbutton">Login</button>
              <button className='create-new-user-homepage-button' onClick={() => this.openCreateModal()}>Create a new account</button>
            </div>
          </div>
          <Modal isOpen={this.state.loginModalOpen} onClose={() => this.closeLoginModal()} >
            <SessionForm formType={'login'}  />
          </Modal>
          <Modal isOpen={this.state.createModalOpen} onClose={() => this.closeCreateModal()}>
            <SessionForm formType={'signup'} />
          </Modal>
          <div className="hmmmm"></div>
          <div className="dummysearch-div">
            <div className="homepage-search-filler">
            <div className="homepage-searchbar-div">
              <input type="search" className="homepage-searchbar" placeholder="Search for artists, bands, tracks, podcasts">
              </input>
              <button className="homepage-searchbar-button"></button>
            </div>
            <span className="homepage-or-span">or</span>
            <button className="homepage-searchdiv-ancillary-button">Upload your own</button>
          </div>
          </div>
          <div className="notloggedin-trending-section">
            <h2 className="trending-notlogged-header">Peek at what’s trending for free in the Invoke community</h2>
            <div className="top-track-list-div">
              <ul className="top-track-list">
                  {allsonglist.map(song => {
                    let user = this.props.usersbyID[song.user_id]
                return  <li key={song.id} className="dh-li">
                            <img className="dh-img" src={song.cover_art_url} />
                            <span className="dh-title">{song.title}</span>
                            <span className="dh-artist">{user.username}</span>
                        </li>
                  }
                 )}
              </ul>
            </div>
          </div>
          {backdrop}
        </div>
      );
    }
  }



const mapStateToProps = (state) => {
  return { currentUser: state.session.currentUser,
           errors: state.session.errors,
           allsongs: state.songs.allsongs,
           usersbyID: state.users.byID
         }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    clearErrors: () => dispatch(clearErrors()),
    fetchSongs: () => dispatch(fetchSongs()),
    removeSongs: () => dispatch(removeSongs()),
    fetchUsers: () => dispatch(fetchUsers()),
    clearUsers: () => dispatch(clearUsers()),
    removeAudioToken: () => dispatch(removeAudioToken())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHomePage);







//
//   render(){
//     let heading = <h1>Welcome to Invoke</h1>
//     if (this.props.currentUser) {
//       return (
//         <div>
//           <h1> {this.props.currentUser.username} - are you ready to get invoked?</h1>
//           <button onClick={this.props.logout}> Log Out!</button>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           {heading}
//         <Link to='/signup'> Sign Up </Link>
//         <Link to='/login'> Log In </Link>
//         </div>
//       );
//     }
//   }
// }



// <AuthRoute path="/login" component={SessionForm} />
// <AuthRoute path="/signup" component={SessionForm} />

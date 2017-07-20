import React from 'react';
import { connect } from 'react-redux'
import { fetchRandomUsers } from '../actions/user_actions'
import {  createFollow, deleteFollow  } from '../actions/follow_actions'
import {withRouter } from 'react-router-dom'

class Sidebar extends React.Component{
  constructor(props){
    super(props)
    this.props.fetchRandomUsers()
    this.followUser = this.followUser.bind(this)
    this.unfollowUser = this.unfollowUser.bind(this)
  }


  followUser(id){
    this.props.createFollow({follow: {followee_id: id}})

  }

  unfollowUser(id){
    this.props.deleteFollow({follow: {followee_id: id}})
  }







  render(){


  let userlist;


  userlist = this.props.toFollow.map(user => {

    let  followbutton = <button className='sidebar-follow-button-follow' onClick={() => this.props.createFollow({follow: {followee_id: user.id}})}> Follow </button>
    for (var i = 0; i < this.props.allfollows.length; i++) {
      if (this.props.allfollows[i].follower_id === this.props.currentUser.id && this.props.allfollows[i].followee_id === user.id ){
        followbutton = <button onClick={() => this.props.deleteFollow({follow: {followee_id: user.id}})}className='sidebar-follow-button-unfollow'  > Unfollow </button>
        break
      } else {
        followbutton = <button onClick={() => this.props.createFollow({follow: {followee_id: user.id}})} className='sidebar-follow-button-follow'> Follow </button>
      }
    }



    return(
      <li className='sidebar-follow-li'>
        <img className='sidebar-follow-coverart' onClick={() => this.props.history.push(`/${user.username}`)} src={user.avatar_url}></img>
        <div className='sidebar-follow-userinfo'>
          <div className='sidebar-follow-user-username' onClick={() => this.props.history.push(`/${user.username}`)}>{user.username}</div>
          <div className='sidebar-follow-user-stats'>
            <span onClick={() => this.props.history.push(`/${user.username}`)}><img className='sidebar-follow-stat' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4='></img> {user.followernum}</span>
            <span><img className='sidebar-follow-stat' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+'></img> {user.songnum}</span>
            {followbutton}
          </div>
        </div>
      </li>
    )


  })





    return (
      <div className='sidebar'>
        <div className='sidebar-feature'>
          <button className='userpage-follow-button-follow' onClick={() => location.assign('http://www.amaar.me')}>Get Invoke Unlimited</button>
        </div>
        <div className='sidebar-follow'>
        <h3 className='sidebar-follow-title'><img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4=' /> Who to follow</h3>
          <ul className='sidebar-follow-ul'>
            {userlist}
          </ul>
        </div>
      </div>
    )
  }


}


const mapStateToProps = (state) => {

  return {
    toFollow: state.users.toFollow,
    newFollows: state.follows.newFollows,
    allfollows: state.follows.allfollows
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRandomUsers: () => dispatch(fetchRandomUsers()),
    createFollow: (follow) => dispatch(createFollow(follow)),
    deleteFollow: (follow) => dispatch(deleteFollow(follow))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))

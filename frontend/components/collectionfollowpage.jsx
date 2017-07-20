import React from 'react'
import { Route, Link, NavLink } from 'react-router-dom';
import { fetchCurrentUserFollows, removeFollows } from '../actions/follow_actions'
import {connect} from 'react-redux'




class CollectionFollowPage extends React.Component {
  constructor(props){
    super(props)
    this.props.fetchCurrentUserFollows()
  }

  componentWillUnmount(){
    this.props.removeFollows()
  }



  render(){

    if(this.props.allfollows.length > 0){
      let followlist = Object.values(this.props.byFolloweeID).map(follow => {

        return (<li className='likepage-song-item-li'>
          <div className='likepage-song-item-coverart-div'>
            <img className='likepage-song-item-coverart' src={follow.followee.avatar_url} onClick={() => this.props.history.push(`/${follow.followee.username}`)}/>
          </div>
          <div className='likepage-song-item-title' onClick={() => this.props.history.push(`/${follow.followee.username}`)}> <span>{follow.followee.username}</span></div>
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
         <section className="likepage followingpage">

           <h2 className="streamheader shift-header" >Hear what the people you follow have posted</h2>
            <ul className='likepage-ul'>
              {followlist}
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
         <section className="likepage followingpage">

           <h2 className="streamheader" >Hear what the people you follow have posted: </h2>

          </section>
        </div>)
    }
  }
}








  const mapStateToProps = (state, ownProps) => {


      return  {
        currentUser: state.session.currentUser,
        allfollows: state.follows.allfollows,
        byFolloweeID: state.follows.byFolloweeID
      };
    }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchCurrentUserFollows: () => dispatch(fetchCurrentUserFollows()),
      removeFollows: () => dispatch(removeFollows()),

    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(CollectionFollowPage);

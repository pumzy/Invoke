import { merge } from 'lodash'
import {  RECEIVE_FOLLOWS, RECEIVE_FOLLOW, REMOVE_FOLLOW, REMOVE_FOLLOWS, ADD_SESSION_FOLLOW, REMOVE_SESSION_FOLLOW } from '../actions/follow_actions'



const FollowReducer = (state={ byFollowerID: {}, byFolloweeID: {}, allfollows: [], newFollows: [] }, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_FOLLOWS:

      action.follows.forEach(follow => (newState.byFollowerID[follow.follower_id] = follow))
      action.follows.forEach(follow => (newState.byFolloweeID[follow.followee_id] = follow))
      action.follows.forEach(follow => (newState.allfollows.push(follow)))
      return newState;

    case RECEIVE_FOLLOW:
      newState.allfollows.push(action.follow)
      newState.byFolloweeID[action.follow.followee_id] = action.follow;
      newState.byFollowerID[action.follow.follower_id] = action.follow;
      return newState;

    case REMOVE_FOLLOW:
      delete newState.byFolloweeID[action.follow.followee_id]
      delete newState.byFollowerID[action.follow.follower_id]
      let indexneeded = state.allfollows.indexOf(action.follow);
      let followdup = state.allfollows.slice(0)
      let newarray = [];
      state.allfollows.forEach(follow => {
        if( follow.id !== action.follow.id) {
          newarray.push(follow)
        }
      })
      newState.allfollows = newarray
      return newState;
      case REMOVE_FOLLOWS:
        return { byFollowerID: {}, byFolloweeID: {}, allfollows: [], newFollows: state.newFollows }
      case ADD_SESSION_FOLLOW:
        let newarray1 = state.newFollows
        newarray1.push(action.id)
        newState.newFollows = newarray1
        return newState;
      case REMOVE_SESSION_FOLLOW:
        let newarray2 = state.newFollows
        let index = state.newFollows.indexOf(action.id)
        if (index){
        newarray2.splice(index,1)
        newState.newFollows = newarray2
        return newState;
      } else {
        return state
      }
    default:
      return state;
  }
}

export default FollowReducer;

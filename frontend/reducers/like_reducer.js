import { merge } from 'lodash'
import {  RECEIVE_LIKES, RECEIVE_LIKE, REMOVE_LIKE, REMOVE_LIKES } from '../actions/like_actions'



const LikeReducer = (state={ bySongID: {}, byUserID: {}, alllikes: [] }, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_LIKES:
    
      action.likes.forEach(like => (newState.bySongID[like.user_id] = like))
      action.likes.forEach(like => (newState.byUserID[like.song_id] = like))
      action.likes.forEach(like => (newState.alllikes.push(like)))
      return newState;

    case RECEIVE_LIKE:
      newState.alllikes.push(action.like)
      newState.byUserID[action.like.song_id] = action.like;
      newState.bySongID[action.like.user_id] = action.like;
      return newState;

    case REMOVE_LIKE:
      delete newState.byUserID[action.like.song_id]
      delete newState.bySongID[action.like.user_id]
      let indexneeded = state.alllikes.indexOf(action.like);
      let likedup = state.alllikes.slice(0)
      var newarray = [];
      state.alllikes.forEach(like => {
        if( like.id !== action.like.id) {
          newarray.push(like)
        }
      })

      newState.alllikes = newarray
      return newState;

    case REMOVE_LIKES:
      return { bySongID: {}, byUserID: {}, alllikes: [] }

    default:
      return state;
  }
}

export default LikeReducer;

import { merge } from 'lodash'
import {  RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT, REMOVE_COMMENTS } from '../actions/comment_actions'



const CommentReducer = (state={ bySongID: {}, byID: {}, allcomments: [] }, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      action.comments.forEach(comment => (newState.bySongID[comment.user_id] = comment))
      action.comments.forEach(comment => (newState.byID[comment.id] = comment))
      action.comments.forEach(comment => (newState.allcomments.push(comment)))
      return newState;

    case RECEIVE_COMMENT:
      newState.allcomments.push(action.comment)
      newState.byID[action.comment.id] = action.comment;
      newState.bySongID[action.comment.user_id] = action.comment;
      return newState;

    case REMOVE_COMMENT:
      delete newState.byID[action.comment.id]
      delete newState.bySongID[action.comment.user_id]
      return newState;

    case REMOVE_COMMENTS:
      return { bySongID: {}, byID: {}, allcomments: [] }

    default:
      return state;
  }
}

export default CommentReducer;

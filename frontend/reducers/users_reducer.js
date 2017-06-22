import { merge } from 'lodash'
import {  RECEIVE_USERS, RECEIVE_USER, REMOVE_USER } from '../actions/user_actions'



const UserReducer = (state={ byID: {}, allusers: [] }, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_USERS:
    action.users.forEach(user => (newState.byID[user.id] = user))
    action.users.forEach(user => (newState.allusers.push(user)))
    return newState;
    case RECEIVE_USER:
    newState.allusers.push(action.user.id)
    newState.byID[action.user.id] = action.user;
    return newState;
    case REMOVE_USER:
    newState.byID.delete(action.user.id)
    return newState;
    default:
    return state;
  }
}

export default UserReducer;

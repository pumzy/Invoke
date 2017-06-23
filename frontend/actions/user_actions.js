import * as APIUtil from '../util/user_api_util';
import React from 'react'

export const RECEIVE_USERS = "RECEIVE_USERS";
export const CLEAR_USERS = "CLEAR_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";


export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  }
}

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export const removeUser = user => {
  return {
    type: REMOVE_USER,
    user
  }
}

export const clearUsers = user => {
  return {
    type: CLEAR_USERS,
    user
  }
}

export const fetchUsers = () => dispatch => (
  APIUtil.fetchUsers().then(users => {
    return dispatch(receiveUsers(users))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const fetchOneUser = (id) => dispatch => (
  APIUtil.fetchOneUser(id).then(user => (
    dispatch(receiveUser(user))
  ))
)

export const fetchOneUserByID = (username) => dispatch => (
  APIUtil.fetchOneUserByID(username).then(user => (
    dispatch(receiveUser(user))
  ),
)
)

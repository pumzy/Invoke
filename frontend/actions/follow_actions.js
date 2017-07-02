import * as APIUtil from '../util/follow_api_util';
import React from 'react'


export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";
export const REMOVE_FOLLOWS = "REMOVE_FOLLOWS";


export const receiveFollow = (follow) => {
  return {
    type: RECEIVE_FOLLOW,
    follow
  }
}

export const receiveFollows = (follows) => {

  return {
    type: RECEIVE_FOLLOWS,
    follows
  }
}


export const removeFollow = follow => {
  return {
    type: REMOVE_FOLLOW,
    follow
  }
}

export const removeFollows = () => {
  return {
    type: REMOVE_FOLLOWS
  }
}

export const fetchCurrentUserFollows = () => dispatch => (
  APIUtil.fetchCurrentUserFollows().then(follows => {
    return dispatch(receiveFollows(follows))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)





export const deleteFollow = (follow) => dispatch => (
  APIUtil.deleteFollow(follow).then(follow => (
     dispatch(removeFollow(follow))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const createFollow = (follow) => dispatch => {
  //
  APIUtil.createFollow(follow).then(follow => {
    return dispatch(receiveFollow(follow))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
}


export const fetchFollowsByUserID = (id) => dispatch => (
  APIUtil.fetchFollowsByUserID(id).then(follows => {
    return dispatch(receiveFollows(follows))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

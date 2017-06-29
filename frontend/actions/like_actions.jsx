import * as APIUtil from '../util/like_api_util';
import React from 'react'


export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const REMOVE_LIKES = "REMOVE_LIKES";


export const receiveLike = (like) => {
  return {
    type: RECEIVE_LIKE,
    like
  }
}

export const receiveLikes = (likes) => {

  return {
    type: RECEIVE_LIKES,
    likes
  }
}


export const removeLike = like => {
  return {
    type: REMOVE_LIKE,
    like
  }
}

export const removeLikes = () => {
  return {
    type: REMOVE_LIKES
  }
}




export const deleteLike = (like) => dispatch => (
  APIUtil.deleteLike(like).then(like => (
     dispatch(removeLike(like))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const createLike = (like) => dispatch => {
  //
  APIUtil.createLike(like).then(like => {
    return dispatch(receiveLike(like))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
}


export const fetchLikesBySongID = (id) => dispatch => (
  APIUtil.fetchLikesBySongID(id).then(likes => {
    return dispatch(receiveLikes(likes))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

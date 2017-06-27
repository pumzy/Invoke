import * as APIUtil from '../util/comment_api_util';
import React from 'react'

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const REMOVE_COMMENTS = "REMOVE_COMMENTS";



export const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment
  }
}

export const receiveComments = (comments) => {

  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}



export const removeComment = comment => {
  return {
    type: REMOVE_COMMENT,
    comment
  }
}

export const removeComments = () => {
  return {
    type: REMOVE_COMMENTS
  }
}

export const fetchComments = () => dispatch => (
  APIUtil.fetchComments().then(comments => {
    return dispatch(receiveComments(comments))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)


export const fetchOneComment = (id) => dispatch => (
  APIUtil.fetchOneComment(id).then(comment => (
    dispatch(receiveComment(comment))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const createComment = (comment) => dispatch => (
  APIUtil.createComment(comment).then(comment => {
    return dispatch(removeComments(comment.id))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

// export const updateComment = (comment, id) => dispatch => (
//   APIUtil.updateComment(comment, id).then(comment => (
//     dispatch(receiveComment(comment))
//   ), err => (
//     dispatch(receiveErrors(err.responseJSON))
//   ))
// )


export const fetchCommentsBySongID = (id) => dispatch => (
  APIUtil.fetchCommentsBySongID(id).then(comments => {
    return dispatch(receiveComments(comments))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const deleteComment = (comment) => dispatch => (
  APIUtil.deleteComment(comment).then(comment => (
     dispatch(removeComment(comment))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

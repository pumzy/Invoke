


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


export const deleteLike = (like) => dispatch => (
  APIUtil.deleteLike(like).then(like => (
     dispatch(removeLike(like))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const createLike = (like) => dispatch => (
  APIUtil.createLike(like).then(like => {
    return dispatch(receiveLike(like))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)


export const fetchLikesBySongID = (id) => dispatch => (
  APIUtil.fetchLikesBySongID(id).then(likes => {
    return dispatch(receiveLikes(likes))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

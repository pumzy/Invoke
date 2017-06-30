import * as APIUtil from '../util/search_api_util';

export const SEARCH_DATABASE = "SEARCH_DATABASE"


export const receiveResults = (results) => {

  return {
    type: RECEIVE_RESULTS,
    likes
  }
}


export const makeSearch = () => dispatch => (
  APIUtil.searchUsersAndSongs().then(results => {
    return dispatch(receiveResults(results))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

import { merge } from 'lodash'
import {  RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST, REMOVE_PLAYLIST, REMOVE_PLAYLISTS } from '../actions/playlist_actions'



const PlaylistReducer = (state={ byTitle: {}, byID: {}, allplaylists: [] }, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_PLAYLISTS:
      action.playlists.forEach(playlist => (newState.byTitle[playlist.title] = playlist))
      action.playlists.forEach(playlist => (newState.byID[playlist.id] = playlist))
      action.playlists.forEach(playlist => (newState.allplaylists.push(playlist)))
      return newState;

    case RECEIVE_PLAYLIST:
      newState.allplaylists.push(action.playlist)
      newState.byID[action.playlist.id] = action.playlist;
      newState.byTitle[action.playlist.title] = action.playlist;
      return newState;

    case REMOVE_PLAYLIST:
      delete newState.byID[action.playlist.id]
      delete newState.byTitle[action.playlist.title]
      return newState;

    case REMOVE_PLAYLISTS:
      return { byTitle: {}, byID: {}, allplaylists: [] }

    default:
      return state;
  }
}

export default PlaylistReducer;

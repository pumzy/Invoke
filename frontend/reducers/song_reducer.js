import { merge } from 'lodash'
import {  RECEIVE_SONGS, RECEIVE_SONG, REMOVE_SONG } from '../actions/song_actions'



const SongReducer = (state={ byID: {} }, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_SONGS:
    action.songs.forEach(song => (newState.byID[song.id] = song))
    return newState;
    case RECEIVE_SONG:
    return merge({}, state, {byID :{[action.song.id]: action.song}});
    case REMOVE_SONG:
    newState.byID.delete(action.song.id)
    return newState;
    default:
    return state;
  }
}

export default SongReducer;
//

// return merge({}, state, { byID: action.songs });

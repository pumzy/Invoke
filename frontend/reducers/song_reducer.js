import { merge } from 'lodash'
import {  RECEIVE_SONGS, RECEIVE_SONG, REMOVE_SONG } from '../actions/song_actions'



const SongReducer = (state={ byUsername: {}, allsongs: [] }, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_SONGS:
    action.songs.forEach(song => (newState.byUsername[song.id] = song))
    action.songs.forEach(song => (newState.allsongs.push(song)))    
    return newState;
    case RECEIVE_SONG:
    newState.allsongs.push(action.song.id)
    newState.byUsername[action.song.id] = action.song;
    return newState;
    case REMOVE_SONG:
    newState.byUsername.delete(action.song.id)
    return newState;
    default:
    return state;
  }
}

export default SongReducer;
//

// return merge({}, state, { byUsername: action.songs });
// return merge({}, state, {byUsername :{[action.song.id]: action.song}, allsongs: });

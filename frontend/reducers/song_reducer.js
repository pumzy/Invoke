import { merge } from 'lodash'
import {  RECEIVE_SONGS, RECEIVE_SONG, REMOVE_SONG, REMOVE_SONGS } from '../actions/song_actions'



const SongReducer = (state={ byTitle: {}, byID: {}, allsongs: [] }, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_SONGS:
    action.songs.forEach(song => (newState.byTitle[song.title] = song))
    action.songs.forEach(song => (newState.byID[song.id] = song))
    action.songs.forEach(song => (newState.allsongs.push(song)))
    return newState;
    case RECEIVE_SONG:
    newState.allsongs.push(action.song)
    newState.byID[action.song.id] = action.song;
    newState.byTitle[action.song.title] = action.song;
    return newState;
    case REMOVE_SONG:
    newState.byID.delete(action.song.id)
    newState.byTitle.delete(action.song.title)
    return newState;
    case REMOVE_SONGS:
    return { byTitle: {}, byID: {}, allsongs: [] }
    default:
    return state;
  }
}

export default SongReducer;
//

// return merge({}, state, { byID: action.songs });
// return merge({}, state, {byID :{[action.song.id]: action.song}, allsongs: });

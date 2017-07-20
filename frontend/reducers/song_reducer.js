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
      delete newState.byID[action.song.id]
      delete newState.byTitle[action.song.title]
      let newarray = []
      state.allsongs.forEach(song => {
        if( song.id !== action.song.id) {
          newarray.push(song)
        }
      })
      newState.allsongs = newarray
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

import { combineReducers } from 'redux';
import SongReducer from './song_reducer';
import SessionReducer from './session_reducer';
import AudioReducer from './audio_reducer'
import UserReducer from './users_reducer'

const RootReducer = combineReducers({
  session: SessionReducer,
  songs: SongReducer,
  audio: AudioReducer,
  user: UserReducer
});

export default RootReducer;

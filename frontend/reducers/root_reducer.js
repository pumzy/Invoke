import { combineReducers } from 'redux';
import SongReducer from './song_reducer';
import SessionReducer from './session_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  songs: SongReducer
});

export default RootReducer;

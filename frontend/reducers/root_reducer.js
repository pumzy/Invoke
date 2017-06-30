import { combineReducers } from 'redux';
import SongReducer from './song_reducer';
import SessionReducer from './session_reducer';
import AudioReducer from './audio_reducer'
import UserReducer from './users_reducer'
import CommentReducer from './comment_reducer'
import LikeReducer from './like_reducer'
import SearchReducer from './search_reducer'


const RootReducer = combineReducers({
  session: SessionReducer,
  songs: SongReducer,
  audio: AudioReducer,
  users: UserReducer,
  comments: CommentReducer,
  likes: LikeReducer
});

export default RootReducer;

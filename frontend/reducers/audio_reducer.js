import {merge} from 'lodash';

import { RECEIVE_AUDIO, REMOVE_AUDIO, REMOVE_AUDIO_TOKEN, RECEIVE_AUDIO_TOKEN, PROVIDE_AUDIO_PLAYBACK_TIME, CHANGE_PLAYBACK_TIME, REQUEST_AUDIO_PLAYBACK_TIME, CLEAR_AUDIO_REQUEST} from '../actions/audio_actions';

const defaultState = {
  track_url: "",
  user_id: null,
  id: null,
  token: "",
  request: ""
}

export const AudioReducer = (state=defaultState, action ) => {
  Object.freeze(state)
  let newState = merge({}, defaultState);
  switch (action.type) {
    case RECEIVE_AUDIO:
      return merge(newState, action.audio)
    case REMOVE_AUDIO:
      return newState;
    case RECEIVE_AUDIO_TOKEN:
      return merge({},state, {token: action.token})
    case REMOVE_AUDIO_TOKEN:

    case PROVIDE_AUDIO_PLAYBACK_TIME:
      return merge({},state, {time: action.time, request: ""})
    case CHANGE_PLAYBACK_TIME:
      return merge({},state, {time: action.time, token: action.token})
    case REQUEST_AUDIO_PLAYBACK_TIME:
      return merge({},state, {request: action.request})
    case CLEAR_AUDIO_REQUEST:
      return merge({},state, {request:""})
    default:
      return state;
  }
}

export default AudioReducer;

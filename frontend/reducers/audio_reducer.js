import {merge} from 'lodash';

import { RECEIVE_AUDIO, REMOVE_AUDIO, REMOVE_AUDIO_TOKEN} from '../actions/audio_actions';

const defaultState = {
  track_url: "",
  user_id: null,
  id: null,
  token: ""
}

export const AudioReducer = (state=defaultState, action ) => {
  Object.freeze(state)
  let newState = merge({}, defaultState);
  switch (action.type) {
    case RECEIVE_AUDIO:
      return merge(newState, action.audio)
    case REMOVE_AUDIO:
      return newState;
    case REMOVE_AUDIO_TOKEN:
      return merge({},state, {token:""})
    default:
      return state;
  }
}

export default AudioReducer;

import {merge} from 'lodash';

import { RECEIVE_AUDIO, REMOVE_AUDIO} from '../actions/audio_actions';

const defaultState = {
  track_url: "",
  user: {},
  id: null
}

export const AudioReducer = (state=defaultState, action ) => {
  Object.freeze(state)
  let newState = merge({}, defaultState);
  switch (action.type) {
    case RECEIVE_AUDIO:
      return merge(newState, action.audio)
    case REMOVE_AUDIO:
      return newState;
    default:
      return state;
  }
}

export default AudioReducer;


import {merge} from 'lodash';

import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, CLEAR_ERRORS} from '../actions/session_actions';

const defaultState = Object.freeze({ currentUser: null, errors: [] });

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, defaultState, { currentUser: action.currentUser });
    case RECEIVE_ERRORS:
      return merge({}, defaultState, { errors: action.errors });
    case CLEAR_ERRORS:
       return { currentUser: state.currentUser, errors: []}
    default:
      return state;
  }
};

export default SessionReducer;

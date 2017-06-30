import {merge} from 'lodash';

import { RECEIVE_RESULTS } from '../actions/search_actions';

const defaultState = Object.freeze({ query: "", results: null});

const SearchReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_RESULTS:
      return merge({}, defaultState, { currentUser: action.results });
    default:
      return state;
  }
};

export default SearchReducer;

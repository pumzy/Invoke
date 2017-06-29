import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { fetchSongs, fetchOneSong } from './actions/song_actions'
import { fetchSongByUserID, fetchSongByTitle, deleteSong } from './util/song_api_util'
import { fetchOneUserByID } from './actions/user_actions'


document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.fetchSongByUserID = fetchSongByUserID
  window.fetchSongByTitle = fetchSongByTitle
  window.deleteSong = deleteSong
  window.store = store
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});

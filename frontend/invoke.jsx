import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Root from './components/root';
import configureStore from './store/store';
import { fetchSongs, fetchOneSong } from './actions/song_actions'
import { fetchOneUserByUsername } from './actions/user_actions'


document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.fetchSongs = fetchSongs;
  window.fetchSong = fetchOneSong;
  window.fetchOneUserByUsername = fetchOneUserByUsername
  window.store = store
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});

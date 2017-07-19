import * as APIUtil from '../util/playlist_api_util';
import React from 'react'

export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";
export const REMOVE_PLAYLIST = "REMOVE_PLAYLIST";
export const REMOVE_PLAYLISTS = "REMOVE_PLAYLISTS";



export const receivePlaylist = (playlist) => {
  return {
    type: RECEIVE_PLAYLIST,
    playlist
  }
}

export const receivePlaylists = (playlists) => {
  return {
    type: RECEIVE_PLAYLISTS,
    playlists
  }
}


export const removePlaylist = playlist => {
  return {
    type: REMOVE_PLAYLIST,
    playlist
  }
}

export const removePlaylists = () => {
  return {
    type: REMOVE_PLAYLISTS
  }
}

export const fetchPlaylists = () => dispatch => (
  APIUtil.fetchPlaylists().then(playlists => {
    return dispatch(receivePlaylists(playlists))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const fetchChartPlaylists = (num, genre) => dispatch => {
  return APIUtil.fetchChartPlaylists(num, genre).then(playlists => {
    return dispatch(receivePlaylists(playlists))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
}

export const searchPlaylists = (query) => dispatch => {
  return APIUtil.searchPlaylists(query).then(playlists => {
    return dispatch(receivePlaylists(playlists))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
}


export const fetchOnePlaylist = (id) => dispatch => (
  APIUtil.fetchOnePlaylist(id).then(playlist => (
    dispatch(receivePlaylist(playlist))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const addSongToPlaylist = (songid, id) => dispatch => (
  APIUtil.addSongToPlaylist(songid, id).then(playlist => (
    dispatch(receivePlaylist(playlist))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const removeSongFromPlaylist = (songid, id) => dispatch => (
  APIUtil.removeSongFromPlaylist(songid, id).then(playlist => (
    dispatch(receivePlaylist(playlist))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const fetchPlaylistByTitle = (title) => dispatch => (
  APIUtil.fetchPlaylistByTitle(title).then(playlist => (
    dispatch(receivePlaylist(playlist))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const createPlaylist = (playlist) => dispatch => (
  APIUtil.createPlaylist(playlist).then(playlist => (
    dispatch(receivePlaylist(playlist))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const updatePlaylist = (playlist, id) => dispatch => (
  APIUtil.updatePlaylist(playlist, id).then(playlist => (
    dispatch(receivePlaylist(playlist))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const fetchPlaylistsByUserID = (id) => dispatch => (
  APIUtil.fetchPlaylistByUserID(id).then(playlists => {
    return dispatch(receivePlaylists(playlists))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const deletePlaylist = (playlist) => dispatch => (
  APIUtil.deletePlaylist(playlist).then(playlist => (
     dispatch(removePlaylist(playlist))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

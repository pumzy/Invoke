import * as APIUtil from '../util/song_api_util';
import React from 'react'

export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const RECEIVE_SONG = "RECEIVE_SONG";
export const REMOVE_SONG = "REMOVE_SONG";
export const REMOVE_SONGS = "REMOVE_SONGS";



export const receiveSong = (song) => {
  return {
    type: RECEIVE_SONG,
    song
  }
}

export const receiveSongs = (songs) => {
  return {
    type: RECEIVE_SONGS,
    songs
  }
}



export const removeSong = song => {
  return {
    type: REMOVE_SONG,
    song
  }
}

export const removeSongs = () => {
  return {
    type: REMOVE_SONGS
  }
}

export const fetchSongs = () => dispatch => (
  APIUtil.fetchSongs().then(songs => {
    return dispatch(receiveSongs(songs))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)


export const fetchOneSong = (id) => dispatch => (
  APIUtil.fetchOneSong(id).then(song => (
    dispatch(receiveSong(song))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const fetchSongByTitle = (title) => dispatch => (
  APIUtil.fetchSongByTitle(title).then(song => (
    dispatch(receiveSong(song))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const createSong = (song) => dispatch => (
  APIUtil.createSong(song).then(song => (
    dispatch(receiveSong(song))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const updateSong = (song, id) => dispatch => (
  APIUtil.updateSong(song, id).then(song => (
    dispatch(receiveSong(song))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)


export const fetchSongsByUserID = (id) => dispatch => (
  APIUtil.fetchSongByUserID(id).then(songs => {
    return dispatch(receiveSongs(songs))
  }, err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

export const deleteSong = (song) => dispatch => (
  APIUtil.deleteSong(song).then(song => (
     dispatch(removeSong(song))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)

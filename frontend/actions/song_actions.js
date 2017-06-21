import * as APIUtil from '../util/song_api_util';
import React from 'react'

export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const RECEIVE_SONG = "RECEIVE_SONG";
export const REMOVE_SONG = "REMOVE_SONG";


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

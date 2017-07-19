

export const RECEIVE_AUDIO = "RECEIVE_AUDIO"
export const REMOVE_AUDIO = "REMOVE_AUDIO"
export const REMOVE_AUDIO_TOKEN = "REMOVE_AUDIO_TOKEN"
export const RECEIVE_AUDIO_TOKEN = "RECEIVE_AUDIO_TOKEN"
export const PROVIDE_AUDIO_PLAYBACK_TIME = "PROVIDE_AUDIO_PLAYBACK_TIME"
export const CHANGE_PLAYBACK_TIME = "CHANGE_PLAYBACK_TIME"
export const REQUEST_AUDIO_PLAYBACK_TIME = "REQUEST_AUDIO_PLAYBACK_TIME"
export const CLEAR_AUDIO_REQUEST = "CLEAR_AUDIO_REQUEST"


export const receiveAudio = (audio) => {
  return {
    type: RECEIVE_AUDIO,
    audio  }
}

export const receivePauseToken = () => {
  return {
    type: RECEIVE_AUDIO_TOKEN,
    token: "PAUSED"
  }
}

export const receivePlayToken = () => {
  return {
    type: RECEIVE_AUDIO_TOKEN,
    token: "PLAYING"
  }
}


export const removeAudio = () => {
  return {
    type: REMOVE_AUDIO
  }
}

export const removeAudioToken = () => {
  return {
    type: REMOVE_AUDIO_TOKEN
  }
}

export const provideAudioPlaybackTime = (time) => {

  return {
    type: PROVIDE_AUDIO_PLAYBACK_TIME,
    time
  }
}

export const requestAudioPlaybackTime = () => {

  return {
    type: REQUEST_AUDIO_PLAYBACK_TIME,
    request: 'REQUEST-TIME'
  }
}


export const changePlaybackTime = (time) => {

  return {
    type: CHANGE_PLAYBACK_TIME,
    token: 'WAVEFORM-OVERRIDE',
    set: time
  }
}

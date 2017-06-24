
export const RECEIVE_AUDIO = "RECEIVE_AUDIO"
export const REMOVE_AUDIO = "REMOVE_AUDIO"
export const REMOVE_AUDIO_TOKEN = "REMOVE_AUDIO_TOKEN"


export const receiveAudio = (audio) => {
  return {
    type: RECEIVE_AUDIO,
    audio,
    token: "token"
  }
}
export const removeAudio = () => {
  return {
    type: REMOVE_AUDIO
  }
}

export const removeAudioToken = () => {
  return {
    type: REMOVE_AUDIO_TOKEN,
    token: ""
  }
}

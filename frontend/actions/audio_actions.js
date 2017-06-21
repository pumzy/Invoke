
export const RECEIVE_AUDIO = "RECEIVE_AUDIO"
export const REMOVE_AUDIO = "REMOVE_AUDIO"


export const receiveAudio = (audio) => {
  return {
    type: RECEIVE_AUDIO,
    audio
  }
}
export const removeAudio = () => {
  return {
    type: REMOVE_AUDIO
  }
}

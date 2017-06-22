
export const fetchOneSong = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/songs/${id}`
  })
}

export const fetchSongs = () => {
  return $.ajax({
    method: "GET",
    url: "api/songs"
  })
}

export const fetchSongByUserID = (userid) => {
  return $.ajax({
    method: "GET",
    url: `api/songs/userfind/${userid}`
  })
}

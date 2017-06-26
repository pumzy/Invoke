
export const fetchOneSong = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/songs/${id}`
  })
}

export const createSong = (formData) => {
  return $.ajax({
    method: "POST",
    url: `api/songs`,
    data: formData,
    contentType: false,
    processData: false
  })
}

export const updateSong = (formData, id) => {
  return $.ajax({
    method: "PATCH",
    url: `api/songs/${id}`,
    data: formData,
    contentType: false,
    processData: false
  })
}

export const fetchSongs = () => {
  return $.ajax({
    method: "GET",
    url: "api/songs"
  })
}

export const fetchSongByTitle = (title) => {
  return $.ajax({
    method: "GET",
    url: `api/songs/show2/${title}`
  })
}

export const fetchSongByUserID = (userid) => {
  return $.ajax({
    method: "GET",
    url: `api/songs/userfind/${userid}`
  })
}

export const deleteSong = (song) => {
  return $.ajax({
    method: "DELETE",
    url: `api/songs/${song.id}`,
  })
}

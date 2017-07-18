
export const fetchOnePlaylist = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/playlists/${id}`
  })
}

export const createPlaylist = (formData) => {
  return $.ajax({
    method: "POST",
    url: `api/playlists`,
    data: {playlist: playlist}
  })
}

export const updatePlaylist = (formData, id) => {
  return $.ajax({
    method: "PATCH",
    url: `api/playlists/${id}`,
    data: {playlist: playlist}
  })
}



export const fetchPlaylists = () => {
  return $.ajax({
    method: "GET",
    url: "api/playlists"
  })
}


export const searchPlaylists = (query) => {
  return $.ajax({
    method: "GET",
    url: "api/playlists",
    data: {token: 'search', query: query}
  })
}

export const fetchPlaylistByTitle = (title) => {
  return $.ajax({
    method: "GET",
    url: `api/playlists/show2/${title}`
  })
}

export const fetchPlaylistByUserID = (userid) => {
  return $.ajax({
    method: "GET",
    url: `api/playlists/userfind/${userid}`
  })
}

export const deletePlaylist = (playlist) => {
  return $.ajax({
    method: "DELETE",
    url: `api/playlists/${playlist.id}`,
  })
}

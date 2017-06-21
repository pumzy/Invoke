
export const fetchOneSong = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/songs/${id}`
  })
}

export const fetchSongs = () => {
  debugger
  return $.ajax({
    method: "GET",
    url: "api/songs"
  })
}

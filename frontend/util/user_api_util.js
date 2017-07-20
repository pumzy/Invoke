
export const fetchOneUser = (username) => {
  return $.ajax({
    method: "GET",
    url: `api/users/${username}`
  })
}

export const fetchUsers = () => {
  return $.ajax({
    method: "GET",
    url: "api/users"
  })
}
export const fetchAllUsers = () => {
  return $.ajax({
    method: "GET",
    url: "api/users",
    data: {token: 'All'}
  })
}

export const fetchRandomUsers = () => {
  return $.ajax({
    method: "GET",
    url: "api/users",
    data: {token: 'random'}
  })
}

export const searchUsers = (query) => {
  return $.ajax({
    method: "GET",
    url: "api/users",
    data: {token: 'search', query: query}
  })
}


export const fetchOneUserByID = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/users/show2/${id}`
  })
}

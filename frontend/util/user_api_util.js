
export const fetchOneUser = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/users/${id}`
  })
}

export const fetchUsers = () => {
  return $.ajax({
    method: "GET",
    url: "api/users"
  })
}


export const fetchOneUserByUsername = (username) => {
  debugger
  return $.ajax({
    method: "GET",
    url: `api/users/show2/${username}`
  })
}

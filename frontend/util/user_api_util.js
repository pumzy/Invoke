
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


export const fetchOneUserByID = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/users/show2/${id}`
  })
}

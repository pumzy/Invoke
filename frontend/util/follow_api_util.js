
export const fetchCurrentUserFollows = () => {
  return $.ajax({
    method: "GET",
    url: "api/follows"
  })
}


export const createFollow = (follow) => {
  //
  return $.ajax({
    method: "POST",
    url: `api/follows`,
    data: follow
  })
}


export const deleteFollow = (follow) => {
  return $.ajax({
    method: "DELETE",
    url: `api/follows/${follow.id}`,
    data: follow
  })
}

export const fetchFollowsByUserID = (userid) => {
  return $.ajax({
    method: "GET",
    url: `api/follows/userfind/${userid}`
  })
}

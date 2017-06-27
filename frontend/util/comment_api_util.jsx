export const fetchOneComment = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/comments/${id}`
  })
}

export const createComment = (comment) => {
  return $.ajax({
    method: "POST",
    url: `api/comments`,
    data: comment
  })
}

// export const updateComment = (formData, id) => {
//   return $.ajax({
//     method: "PATCH",
//     url: `api/comments/${id}`,
//     data: formData,
//     contentType: false,
//     processData: false
//   })
// }

export const fetchComments = () => {
  return $.ajax({
    method: "GET",
    url: "api/comments"
  })
}


export const fetchCommentsBySongID = (songid) => {

  return $.ajax({
    method: "GET",
    url: `api/comments/songfind/${songid}`
  })
}

export const deleteComment = (comment) => {
  return $.ajax({
    method: "DELETE",
    url: `api/comments/${comment.id}`,
  })
}

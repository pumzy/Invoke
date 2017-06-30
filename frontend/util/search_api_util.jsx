

export const searchUsersAndSongs = (query) => (
  $.ajax({
    method: 'GET',
    url: '/api/search',
    data: query
  })
);

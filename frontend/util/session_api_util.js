

export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: user
  })
);

export const signup = formData => {

  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: formData,
    contentType: false,
    processData: false
  })
};

export const signupnormal = user => {
  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: {user}
  })
};

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

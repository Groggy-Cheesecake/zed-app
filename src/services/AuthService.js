import client from './clients/ApiClient'

export function signup(data) {
  return client
    .post('/users/create_user', data)
    .then(res => res.data)
    .catch(err => {
      throw err.response.data.error
    })
}

export function signin(data) {
  return client
    .post('/users/get_user', { ...data })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data.error
    })
}

export function checkAvailability(data) {
  return client
    .post('/users/check_available', { ...data })
    .then(res => res.data.exists)
    .catch(err => {
      if (err.response.data.error) {
        throw err.response.data.error
      }
      throw err.response.data
    })
}

export function updateUser(data, signed_message) {
  return client
    .patch('/users/edit_user', {
      params: data,
      signed_message,
    })
    .then(res => res.data)
    .catch(err => {
      if (err.response.data.error) {
        throw err.response.data.error
      }
      throw err.response.data
    })
}

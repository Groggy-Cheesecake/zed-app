import client from './clients/ApiClient'

export function getActivities(offset) {
  return client
    .get('/activity', {
      params: { offset },
    })
    .then(res => {
      return res.data
    })
}

export function createActivity(data) {
  return client.post('/activity', data).then(res => {
    return res.data
  })
}

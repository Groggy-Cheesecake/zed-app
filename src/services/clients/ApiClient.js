import axios from 'axios'
import { API_ROOT } from '@/const/GlobalData'

const client = axios.create({
  baseURL: API_ROOT,
  timeout: 100000,
})

class ApiClient {
  constructor(client) {
    this._client = client
  }

  get defaultOptions() {
    return {
      headers: {
        Authorization: this._token ? `Bearer ${this._token}` : '',
      },
    }
  }

  setToken(token) {
    this._token = token
  }

  get(url, options = {}) {
    return this._client.get(url, {
      ...this.defaultOptions,
      ...options,
    })
  }

  post(url, data, options = {}) {
    return this._client.post(url, data, {
      ...this.defaultOptions,
      ...options,
    })
  }

  patch(url, data, options = {}) {
    return this._client.patch(url, data, {
      ...this.defaultOptions,
      ...options,
    })
  }

  put(url, data, options = {}) {
    return this._client.put(url, data, {
      ...this.defaultOptions,
      ...options,
    })
  }

  delete(url, options = {}) {
    return this._client.delete(url, {
      ...this.defaultOptions,
      ...options,
    })
  }
}

export default new ApiClient(client)

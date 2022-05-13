import { Socket } from 'phoenix'
import { SOCKET_URL } from '@/const/GlobalData'
import client from './clients/ApiClient'

export function getWSToken(data) {
  const { signed_message } = data

  return client
    .post('/auth/ws_token', { params_for_token: { signed_message } })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data.error
    })
}

export class SocketSingleton {
  static getInstance() {
    if (!this.instance) {
      this.instance = new SocketSingleton()
    }
    return this.instance
  }

  connect(data, nextHorseCallback, releaseDataCallback) {
    return new Promise((resolve, reject) => {
      getWSToken(data).then(({ token }) => {
        this.socket = new Socket(SOCKET_URL, {
          params: {
            token_params: token,
          },
        })

        this.socket.connect()
        this.socket.onError(() => reject('there was an error with the connection!'))
        this.socket.onClose(() => reject('the connection dropped'))

        // Lobby Channel
        this.lobbyChannel = this.socket.channel('pre_sale_room:lobby', {
          token_params: token,
        })
        this.lobbyChannel
          .join()
          .receive('error', err => console.error('lobbyChannel error', err))
          .receive('timeout', () => console.error('lobbyChannel timeout'))

        this.lobbyChannel.on('display_next_horse', nextHorseCallback)
        this.lobbyChannel.on('new_horse_broadcast', nextHorseCallback)
        this.lobbyChannel.on('early_release_data', releaseDataCallback)

        // Breeding Channel
        this.breedingChannel = this.socket.channel('breeding:offspring', {
          token_params: token,
        })
        this.breedingChannel
          .join()
          .receive('error', err => console.error('breedingChannel error', err))
          .receive('timeout', () => console.error('breedingChannel timeout'))

        resolve(this)
      })
    })
  }

  reconnect(data, nextHorseCallback, releaseDataCallback) {
    this.socket.disconnect()
    this.breedingChannel.leave()
    this.lobbyChannel.leave()
    return this.connect(data, nextHorseCallback, releaseDataCallback)
  }
}

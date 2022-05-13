import axios from 'axios'

export function getEtherPrice() {
  return axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD').then(res => {
    return Number(res.data.USD)
  })
}

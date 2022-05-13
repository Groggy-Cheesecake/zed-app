import axios from 'axios'
import web3 from './clients/Web3Client'

export function getRecommendedGasPrice() {
  return axios
    .get('https://ethgasstation.info/json/ethgasAPI.json')
    .then(res => {
      return Number(res.data.average) / 10
    })
    .catch(() => 4)
}

export function getWeb3Status() {
  return web3.eth.net.isListening().catch(() => false)
}

import Web3 from 'web3'
import { CURRENT_NETWORK } from '@/const/GlobalData'

let web3

if (typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.WebsocketProvider(CURRENT_NETWORK.gateway))
}

window.web3 = web3

export default web3

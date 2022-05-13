import IPFS from 'ipfs-http-client'

const client = new IPFS('ipfs.infura.io', 5001, {
  protocol: 'https',
})

export default client

import { getEtherPrice } from '../../services/CMCService'
import { getWeb3Status } from '../../services/ETHService'

export default {
  GET_ETHER_PRICE: () => getEtherPrice(),
  GET_WEB3_STATUS: () => getWeb3Status(),
}

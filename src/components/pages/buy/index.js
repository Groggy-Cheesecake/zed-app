import React from 'react'
import ismobile from 'is-mobile'
import BuyPageDesktop from './BuyPage.js'
import BuyPageMobile from './_BuyPage.js'

class BuyPage extends React.Component {
  render() {
    return ismobile() ? <BuyPageMobile /> : <BuyPageDesktop />
  }
}

export default BuyPage

import React from 'react'
import ismobile from 'is-mobile'
import FAQPageDesktop from './FAQPage.js'
import FAQPageMobile from './_FAQPage.js'

class FAQPage extends React.Component {
  render() {
    return ismobile() ? <FAQPageMobile /> : <FAQPageDesktop />
  }
}

export default FAQPage

import React from 'react'
import ismobile from 'is-mobile'
import FooterDesktop from './Footer.js'
import FooterMobile from './_Footer.js'

class Footer extends React.Component {
  render() {
    if (ismobile()) {
      return <FooterMobile />
    } else {
      return <FooterDesktop />
    }
  }
}

export default Footer

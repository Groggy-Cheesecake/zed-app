import React from 'react'
import ismobile from 'is-mobile'
import DedicatedPageDesktop from './DedicatedPage.js'
import DedicatedPageMobile from './_DedicatedPage.js'

class DedicatedPage extends React.Component {
  render() {
    return ismobile() ? <DedicatedPageMobile /> : <DedicatedPageDesktop />
  }
}

export default DedicatedPage

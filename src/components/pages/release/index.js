import React from 'react'
import ismobile from 'is-mobile'
import ReleasePageDesktop from './ReleasePage.js'
import ReleasePageMobile from './_ReleasePage.js'

class ReleasePage extends React.Component {
  render() {
    return ismobile() ? <ReleasePageMobile /> : <ReleasePageDesktop />
  }
}

export default ReleasePage

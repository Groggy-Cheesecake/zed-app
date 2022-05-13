import React from 'react'
import ismobile from 'is-mobile'
import RosterPageDesktop from './RosterPage.js'
import RosterPageMobile from './_RosterPage.js'

class RosterPage extends React.Component {
  render() {
    return ismobile() ? <RosterPageMobile /> : <RosterPageDesktop />
  }
}

export default RosterPage

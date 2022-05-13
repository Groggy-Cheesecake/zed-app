import React from 'react'
import ismobile from 'is-mobile'
import SupportBrowserContentDesktop from './SupportBrowserContent.js'
import SupportBrowserContentMobile from './_SupportBrowserContent.js'
import PropTypes from 'prop-types'

class SupportBrowserContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
  }

  render() {
    return (
      <div>
        {ismobile() ? (
          <SupportBrowserContentMobile closeModal={this.props.closeModal} />
        ) : (
          <SupportBrowserContentDesktop closeModal={this.props.closeModal} />
        )}
      </div>
    )
  }
}

export default SupportBrowserContent

// Core
import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'

// Utility
import i18n from '@/const/i18n/RacingPage'

class EmptyStableSidebar extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
    data: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.props.addTranslation({ racing: i18n })
  }

  render() {
    const { data } = this.props

    return (
      <div className="empty-sidebar">
        <p>Hello There Good World</p>
      </div>
    )
  }
}

export default withRouter(withLocalize(EmptyStableSidebar))

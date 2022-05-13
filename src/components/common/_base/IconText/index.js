import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import { Translate } from 'react-localize-redux'

// Styles
import './icontext.scss'

const IconText = props => {
  const { isDisabled, icon, translateId, onClick, overlayText, data } = props

  const iconEl = (
    <div
      className={`icn-txt ${isDisabled ? 'disabled' : ''}`}
      onClick={onClick ? () => onClick(data) : null}
    >
      <img className="icon" src={icon} alt="Icon | ZED" />
      <div className="primary-text text-capitalize">
        <Translate id={translateId} />
      </div>
    </div>
  )

  return isDisabled ? (
    <Tooltip placement="bottom" overlay={overlayText}>
      {iconEl}
    </Tooltip>
  ) : (
    iconEl
  )
}

IconText.propTypes = {
  isDisabled: PropTypes.bool,
  icon: PropTypes.object,
  translateId: PropTypes.string,
  onClick: PropTypes.func,
  overlayText: PropTypes.string,
  data: PropTypes.object,
}

export default IconText

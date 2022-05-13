import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import NumberFormat from 'react-number-format'

// Utils
import { formatNumber } from '../../../../utils'

// Styles
import './priceinput.scss'

// Images
import IconInfo from '../../../../assets/images/icn-info-white-24.svg'

class PriceInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    infoIcon: PropTypes.bool,
    infoText: PropTypes.object,
    hasError: PropTypes.bool,
    ethPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    usdPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    minPrice: PropTypes.number,
  }

  render() {
    const {
      className,
      ethPrice,
      infoIcon,
      infoText,
      label,
      minPrice,
      onChange,
      usdPrice,
    } = this.props

    return (
      <div className={`price-field ${className || ''}`}>
        {label && (
          <div className="overline-text sm text-uppercase info-label">
            {label}
            {infoIcon ? (
              <Tooltip placement="right" overlayStyle={{ maxWidth: '27rem' }} overlay={infoText}>
                <img className="icon-info" src={IconInfo} />
              </Tooltip>
            ) : null}
          </div>
        )}
        <div className="price-input">
          <Tooltip
            placement="right"
            overlayStyle={{ maxWidth: '25rem' }}
            visible={minPrice && minPrice > ethPrice}
            overlay={`Minimum breeding price must be ${minPrice} ETH or greater`}
          >
            <NumberFormat
              className={`z-input sm-input ${
                minPrice && minPrice > ethPrice ? 'input-has-error' : ''
              }`}
              type="text"
              value={Number(ethPrice).toString()}
              onValueChange={this.props.onChange}
              readOnly={!onChange}
              min={minPrice}
              thousandSeparator={true}
              decimalScale={3}
            />
          </Tooltip>
          <span className="symbol">Ξ</span>
          {usdPrice && <div className="usd-price">{`~ $${formatNumber(usdPrice, 2)} USD`}</div>}
        </div>
      </div>
    )
  }
}

export default PriceInput

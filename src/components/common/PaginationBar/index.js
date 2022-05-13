import React from 'react'
import PropTypes from 'prop-types'

// Images
import Arrow from '../../../assets/images/icn-arrow-forward-24.svg'

const PageNumber = number => {
  return <a className="page-number">{number}</a>
}

const PaginationBar = props => {
  return (
    <div className="pagination-bar">
      <img className="prev-arrow" src={Arrow} />
      <div className="page-content">
        {props.totalPages.map(page => {
          return <PageNumber key={page} number={page} />
        })}
      </div>
      <img className="next-arrow" src={Arrow} />
    </div>
  )
}

PaginationBar.propTypes = {
  totalPages: PropTypes.number,
}

export default PaginationBar

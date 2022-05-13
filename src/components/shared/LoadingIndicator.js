import React from 'react'
import PropTypes from 'prop-types'

// Images
import LoaderImg from '../../assets/images/Eclipse-1s-200px.svg'

const styles = {
  fixedContainer: {
    backgroundColor: 'rgba(31, 36, 47, .8)',
    position: 'fixed',
  },
  relative: {
    position: 'relative',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderImg: {
    width: '13rem',
  },
}

const LoadingIndicator = props => (
  <div>
    {props.busy && (
      <div
        className="loader-container"
        style={Object.assign(
          {},
          styles.container,
          props.fixed ? styles.fixedContainer : props.relative ? styles.relative : {},
        )}
      >
        <img style={styles.loaderImg} src={LoaderImg} />
      </div>
    )}
  </div>
)

LoadingIndicator.propTypes = {
  busy: PropTypes.bool,
  fixed: PropTypes.bool,
  relative: PropTypes.bool,
}

export default LoadingIndicator

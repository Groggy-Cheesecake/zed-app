/* eslint-disable */
import React from 'react'
import Lottie from 'react-lottie'
import { AnimationData } from './data.js'

class HorseAnimation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let options = {
      renderer: 'svg',
      loop: true,
      autoplay: true,
      resizeMode: 'cover',
      animationData: AnimationData,
    }

    return (
      <div className="horse-animation-content">
        <Lottie options={options} resizeMode="cover" />
      </div>
    )
  }
}

export default HorseAnimation

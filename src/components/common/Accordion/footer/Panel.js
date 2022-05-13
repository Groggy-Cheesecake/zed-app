/* eslint-disable */

import React from 'react'
import * as ReactDOM from 'react-dom'

class Panel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      height: 0,
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this)
      const height = el.querySelector('.panel__inner').scrollHeight
      this.setState({
        height,
      })
    }, 333)
  }

  render() {
    const { label, content, activeTab, index, activateTab } = this.props
    const { height } = this.state
    const isActive = activeTab === index
    const innerStyle = {
      height: isActive ? `${height}px` : '0px',
    }

    return (
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button className="panel__label" role="tab" onClick={activateTab}>
          <div dangerouslySetInnerHTML={{ __html: label }} />
        </button>
        <div className="panel__inner" style={innerStyle} aria-hidden={!isActive}>
          <div
            className="panel__content normal-text"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    )
  }
}

export default Panel

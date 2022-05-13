import * as React from 'react'
import PropTypes from 'prop-types'
import RegistrationPanel from './RegistrationPanel'
import ScheduledPanel from './ScheduledPanel'
import ResultsPanel from './ResultsPanel'
import './_accordion.scss'

class Accordion extends React.Component {
  static propTypes = {
    loadMore: PropTypes.func,
    hasMore: PropTypes.bool,
    openBuyInModal: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTab: null,
    }

    this.activateTab = this.activateTab.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.setState({ activeTab: this.props.activeTab })
  }

  activateTab(index) {
    this.setState(prev => ({
      activeTab: prev.activeTab === index ? -1 : index,
    }))
  }

  render() {
    const { panels, tab, type } = this.props
    const { activeTab } = this.state
    return (
      <div className="accordion" role="tablist">
        {panels.map((panel, index) =>
          tab === 'schedule' ? (
            type === 'registration' ? (
              <RegistrationPanel
                key={index + 1}
                activeTab={activeTab}
                index={index}
                data={panel}
                activateTab={this.activateTab.bind(null, index)}
                openBuyInModal={this.props.openBuyInModal}
              />
            ) : (
              <ScheduledPanel
                key={index + 1}
                activeTab={activeTab}
                index={index}
                data={panel}
                activateTab={this.activateTab.bind(null, index)}
              />
            )
          ) : (
            <ResultsPanel
              key={index + 1}
              activeTab={activeTab}
              index={index}
              data={panel}
              activateTab={this.activateTab.bind(null, index)}
            />
          ),
        )}
      </div>
    )
  }
}

Accordion.propTypes = {
  panels: PropTypes.array,
  activeTab: PropTypes.number,
  tab: PropTypes.string,
  type: PropTypes.string,
}

export default Accordion

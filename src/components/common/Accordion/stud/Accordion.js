import * as React from 'react'
import PropTypes from 'prop-types'
import ismobile from 'is-mobile'
import Panel from './Panel'
import PanelMobile from './_Panel'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import './_accordion.scss'

class Accordion extends React.Component {
  static propTypes = {
    loadMore: PropTypes.func,
    hasMore: PropTypes.bool,
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
    const { panels } = this.props
    const { activeTab } = this.state
    return (
      <div className="accordion" role="tablist">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadMore}
          hasMore={this.props.hasMore}
          loader={<LoadingIndicator busy={true} relative key={0} />}
          initialLoad={false}
          useWindow={true}
        >
          {panels.map((panel, index) =>
            ismobile() ? (
              <PanelMobile
                key={index + 1}
                activeTab={activeTab}
                index={index}
                data={panel}
                activateTab={this.activateTab.bind(null, index)}
              />
            ) : (
              <Panel
                key={index + 1}
                activeTab={activeTab}
                index={index}
                data={panel}
                activateTab={this.activateTab.bind(null, index)}
              />
            ),
          )}
        </InfiniteScroll>
      </div>
    )
  }
}

Accordion.propTypes = {
  panels: PropTypes.array,
  activeTab: PropTypes.number,
}

export default Accordion

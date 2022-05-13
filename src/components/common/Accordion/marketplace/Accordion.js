import * as React from 'react'
import PropTypes from 'prop-types'
import ismobile from 'is-mobile'
import InfiniteScroll from 'react-infinite-scroller'

// Components
import Panel from './Panel'
import PanelMobile from './_Panel'
import LoadingIndicator from 'components/shared/LoadingIndicator'

// Styles
import './_accordion.scss'

class Accordion extends React.Component {
  static propTypes = {
    activeTab: PropTypes.number,
    panels: PropTypes.array,
    loadMore: PropTypes.func,
    hasMore: PropTypes.bool,
    openOffspringModal: PropTypes.func,
    openBidHistoryModal: PropTypes.func,
    openPlaceBidModal: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTab: -1,
    }

    this.activateTab = this.activateTab.bind(this)
  }

  componentDidMount() {
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
                openOffspringModal={this.props.openOffspringModal}
                openBidHistoryModal={this.props.openBidHistoryModal}
                openPlaceBidModal={this.props.openPlaceBidModal}
              />
            ),
          )}
        </InfiniteScroll>
      </div>
    )
  }
}

export default Accordion

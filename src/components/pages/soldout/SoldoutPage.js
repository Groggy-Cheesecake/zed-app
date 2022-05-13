import React from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/SoldoutPage'

import HorseGroup from '../../../assets/images/horse-group.png'

class SoldoutPageContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
    location: PropTypes.object,
    match: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ soldout_page: i18n })
  }

  render() {
    return (
      <div className="page-content soldout">
        <main>
          <section className="top-section">
            <div className="horse-introduction">
              <div className="title">
                <div className="text-uppercase sold-out">
                  <Translate id="soldout_page.sold_out" />
                </div>
                <h2 className="lg-text">The Early Release Z8 racehorses have been sold out! </h2>
                <div className="normal-text">
                  Please sit tight whilst we prepare the launch of the Z9’s!
                </div>
              </div>
            </div>
            <div className="horse-img-part">
              <div className="text-uppercase sold-sign">ZED 1 … ZED 8 - SOLD</div>
              <div className="horse-group">
                <img src={HorseGroup} />
              </div>
            </div>
          </section>

          <section className="main-section">
            <div className="soldout-horse">
              <div className="soldout-horse-part">
                <div className="soldout-horse-content">
                  <div className="primary-text why">
                    <Translate id="soldout_page.due_to" />
                  </div>
                  <div className="join-part">
                    <div className="primary-text">
                      <Translate id="soldout_page.follow_updates" />
                    </div>
                    <a href="https://discordapp.com/invite/sNgA5Zu">
                      <button className="green-btn text-uppercase join-btn">
                        <Translate id="soldout_page.join_channel" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default withLocalize(SoldoutPageContent)

import React from 'react'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/RacingPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Cities from '../../static/cities'

class WatchModalContent extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ racing: i18n })
  }

  render() {
    return (
      <div className="watch-live-content">
        <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={this.props.closeModal} />
        <section>
          <div className="racing-result-detail">
            <div className="racing-summary">
              <img className="country-img" src={Cities.singapore} />
              <div className="racing-info">
                <div className="location">
                  <div className="md-text text-capitalize name">singapore tampines</div>
                  <div className="md-text helpful text-capitalize">
                    “tampines international sprint - replay”
                  </div>
                </div>
                <div className="infos">
                  <div className="left">
                    <div className="info-item">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="racing.race" />
                      </div>
                      <div className="primary-text">4</div>
                    </div>
                    <div className="info-item">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="racing.distance" />
                      </div>
                      <div className="primary-text">1900m</div>
                    </div>
                    <div className="info-item">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="racing.grade" />
                      </div>
                      <div className="primary-text">Group 2</div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="racing-price">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="racing.prize" />
                      </div>
                      <div className="md-text green text-uppercase">99/12/32/34</div>
                    </div>
                    <div className="racing-time">
                      <div className="overline-text sm text-uppercase">
                        <Translate id="racing.starts_in" />
                      </div>
                      <div className="md-text">Nov 8, 2018 - 15:52</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="racing-result">
              <div className="racing-pos-detail">
                <div className="overline-text sm text-uppercase starting-pos">
                  <Translate id="racing.positions" />
                </div>
                <div className="positions-part">
                  <div className="pos-item">
                    <div className="pos-info">
                      <div className="pos-num orange">99</div>
                      <div className="primary-text secondary text-capitalize name">tyler</div>
                    </div>
                    <div className="primary-text helpful ranking">5th</div>
                  </div>
                  <div className="pos-item">
                    <div className="pos-info">
                      <div className="pos-num yellow">12</div>
                      <div className="primary-text secondary text-capitalize name">
                        fitched doom
                      </div>
                    </div>
                    <div className="primary-text helpful ranking">11th</div>
                  </div>
                  <div className="pos-item">
                    <div className="pos-info">
                      <div className="pos-num gold">13</div>
                      <div className="primary-text secondary text-capitalize name">frosthorse</div>
                    </div>
                    <div className="primary-text helpful ranking">12th</div>
                  </div>
                  <div className="pos-item second">
                    <div className="pos-info">
                      <div className="pos-num teal">34</div>
                      <div className="primary-text secondary text-capitalize name">
                        amarok candy
                      </div>
                    </div>
                    <div className="primary-text helpful ranking">2nd</div>
                  </div>
                  <div className="pos-item">
                    <div className="pos-info">
                      <div className="pos-num sky">34</div>
                      <div className="primary-text secondary text-capitalize name">big lady</div>
                    </div>
                    <div className="primary-text helpful ranking">9th</div>
                  </div>
                  <div className="pos-item">
                    <div className="pos-info">
                      <div className="pos-num mauve">34</div>
                      <div className="primary-text secondary text-capitalize name">ken doll</div>
                    </div>
                    <div className="primary-text helpful ranking">10th</div>
                  </div>
                  <div className="pos-item">
                    <div className="pos-info">
                      <div className="pos-num pink">99</div>
                      <div className="primary-text secondary text-capitalize name">
                        tyson matters
                      </div>
                    </div>
                    <div className="primary-text helpful ranking">8th</div>
                  </div>
                  <div className="pos-item first">
                    <div className="pos-info">
                      <div className="pos-num viridian">99</div>
                      <div className="primary-text secondary text-capitalize name">base camp</div>
                    </div>
                    <div className="primary-text helpful ranking">1st</div>
                  </div>
                  <div className="pos-item">
                    <div className="pos-info">
                      <div className="pos-num chartreuse">99</div>
                      <div className="primary-text secondary text-capitalize name">daisy fiona</div>
                    </div>
                    <div className="primary-text helpful ranking">4th</div>
                  </div>
                  <div className="pos-item">
                    <div className="pos-info">
                      <div className="pos-num violet">99</div>
                      <div className="primary-text secondary text-capitalize name">red baron</div>
                    </div>
                    <div className="primary-text helpful ranking">7th</div>
                  </div>
                  <div className="pos-item">
                    <div className="pos-info">
                      <div className="pos-num ochre">99</div>
                      <div className="primary-text secondary text-capitalize name">goliath</div>
                    </div>
                    <div className="primary-text helpful ranking">6th</div>
                  </div>
                  <div className="pos-item third">
                    <div className="pos-info">
                      <div className="pos-num blue">99</div>
                      <div className="primary-text secondary text-capitalize name">david</div>
                    </div>
                    <div className="primary-text helpful ranking">3rd</div>
                  </div>
                </div>
              </div>
              <div className="racing-play">
                <div className="racing-play-content" />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default withLocalize(WatchModalContent)

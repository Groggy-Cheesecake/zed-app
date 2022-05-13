import React from 'react'
import Rarity from '../../../assets/images/img-rarity.svg'
import Availability from '../../../assets/images/img-availability.svg'
import Genotype from '../../../assets/images/img-genotype.svg'
import Bloodline from '../../../assets/images/img-bloodline.svg'
import { Bloodlines } from '../../static/releaseBloodlines'
import { Link } from 'react-router-dom'
import 'rc-tooltip/assets/bootstrap.css'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/ReleasePage'
import PropTypes from 'prop-types'

class ReleasePageContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedBloodline: 'buterin',
    }

    this.selectBloodline = this.selectBloodline.bind(this)
    this.props.addTranslation({ release_page: i18n })
  }

  selectBloodline(bloodline) {
    this.setState({ selectedBloodline: bloodline })
  }

  render() {
    let bloodline = Bloodlines[this.state.selectedBloodline]

    return (
      <div className="page-content release">
        <main>
          <section className="top-section">
            <div className="green-text text-uppercase">
              <Translate id="now_selling" />
            </div>
            <h2 className="lg-text text-capitalize">
              <Translate id="release" />
            </h2>
            <div className="normal-text">
              <Translate id="release_page.main_text" />
            </div>
          </section>

          <section className="main-section">
            <div className="horse-introduction-content">
              <div className="horse-detail-part">
                <div className="features">
                  <div className="item">
                    <img src={Rarity} />
                    <div className="value">
                      <div className="grey-text text-uppercase">
                        <Translate id="release_page.overall" />
                      </div>
                      <div className="md-text">
                        <Translate id={`release_bloodlines.${bloodline.rarity}`} />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <img src={Availability} />
                    <div className="value">
                      <div className="grey-text text-uppercase">
                        <Translate id="release_page.availability" />
                      </div>
                      <div className="md-text">
                        <Translate id={`release_bloodlines.${bloodline.availability}`} />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <img src={Genotype} />
                    <div className="value">
                      <div className="grey-text text-uppercase">
                        <Translate id="release_page.purity" />
                      </div>
                      <div className="md-text">{bloodline.purity}</div>
                    </div>
                  </div>
                  <div className="item">
                    <img src={Bloodline} />
                    <div className="value">
                      <div className="grey-text text-uppercase">
                        <Translate id="release_page.scaricity" />
                      </div>
                      <div className="md-text text-capitalize">
                        <Translate id={`release_bloodlines.${bloodline.scaricity}`} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail-img">
                  <div className="detail-text">
                    <div className="grey-text text-uppercase">
                      <Translate id="bloodline" />
                    </div>
                    <div className="super-text text-uppercase">{bloodline.name}</div>
                    <div className="normal-text">
                      <Translate id={`release_bloodlines.${bloodline.name}`} />
                    </div>
                  </div>
                  <div className="horse-img">
                    <div className="h-image">
                      <img className="h-img" src={bloodline.img} />
                    </div>
                    <div className="h-point-text">
                      <div className="h-point">
                        <div className="h-core" />
                      </div>
                      <div className="grey-text">
                        {bloodline.official !== '' && (
                          <Translate id={`release_bloodlines.${bloodline.official}`} />
                        )}
                      </div>
                    </div>
                    <div className="h-point second">
                      <div className="h-core" />
                    </div>
                    <div className="h-point">
                      <div className="h-core" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="horse-cards">
                <div
                  className={`card ${this.state.selectedBloodline === 'nakamoto' ? 'active' : ''}`}
                  onClick={() => this.selectBloodline('nakamoto')}
                >
                  <img className="horse-img" src={Bloodlines.nakamoto.img} />
                  <div className="card-text">
                    <div className="md-text text-capitalize">
                      <Translate id="release_page.nakamoto" />
                    </div>
                  </div>
                </div>
                <div
                  className={`card ${this.state.selectedBloodline === 'szabo' ? 'active' : ''}`}
                  onClick={() => this.selectBloodline('szabo')}
                >
                  <img className="horse-img" src={Bloodlines.szabo.img} />
                  <div className="card-text">
                    <div className="md-text text-capitalize">
                      <Translate id="release_page.szabo" />
                    </div>
                  </div>
                </div>
                <div
                  className={`card ${this.state.selectedBloodline === 'finney' ? 'active' : ''}`}
                  onClick={() => this.selectBloodline('finney')}
                >
                  <img className="horse-img" src={Bloodlines.finney.img} />
                  <div className="card-text">
                    <div className="md-text text-capitalize">
                      <Translate id="release_page.finney" />
                    </div>
                  </div>
                </div>
                <div
                  className={`card ${this.state.selectedBloodline === 'buterin' ? 'active' : ''}`}
                  onClick={() => this.selectBloodline('buterin')}
                >
                  <img className="horse-img" src={Bloodlines.buterin.img} />
                  <div className="card-text">
                    <div className="md-text text-capitalize">
                      <Translate id="release_page.buterin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="zed-step-content">
              <div className="zed-introduction">
                <div className="grey-text text-uppercase">
                  <Translate id="release_page.starting" />
                </div>
                <div className="md-text">
                  <Translate id="release_page.racehorse" />
                </div>
                <div className="primary-text secondary">
                  <Translate id="release_page.racehorse_text1" />
                  <br />
                  <br />
                  <Translate id="release_page.racehorse_text2" />
                </div>
              </div>
              <div className="zed-step">
                <div className="step-part">
                  <div className="step done">
                    <div className="grey-text step-name">Z1</div>
                    <div className="step-point" />
                    <div className="event-date">
                      <div className="grey-text">2019</div>
                      <div className="grey-text month text-capitalize">
                        <Translate id="february" />
                      </div>
                    </div>
                  </div>
                  <div className="step done">
                    <div className="grey-text step-name">Z2</div>
                    <div className="step-point" />
                  </div>
                  <div className="step done">
                    <div className="grey-text step-name">Z3</div>
                    <div className="step-point" />
                  </div>
                  <div className="step done">
                    <div className="grey-text step-name">Z4</div>
                    <div className="step-point" />
                  </div>
                  <div className="step done">
                    <div className="grey-text step-name">Z5</div>
                    <div className="step-point" />
                  </div>
                  <div className="step done">
                    <div className="grey-text step-name">Z6</div>
                    <div className="step-point" />
                  </div>
                  <div className="step done">
                    <div className="grey-text step-name">Z7</div>
                    <div className="step-point" />
                  </div>
                  <div className="step done">
                    <div className="grey-text step-name">Z8</div>
                    <div className="step-point" />
                  </div>
                  <div className="step done">
                    <div className="grey-text step-name">Z9</div>
                    <div className="step-point" />
                    <div className="event-date">
                      <div className="grey-text">2019</div>
                      <div className="grey-text month text-capitalize">
                        <Translate id="may" />
                      </div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="grey-text step-name">Z10</div>
                    <div className="step-point" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="buy-racehorse">
            <div className="buy-racehorse-content">
              <div className="green-text text-uppercase">
                <Translate id="be_one" />
              </div>
              <div className="lg-text">
                <Translate id="create_stable" />
              </div>
              <Link to="/buy">
                <button className="primary-btn text-uppercase">
                  <Translate id="buy_a_racehorse" />
                </button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default withLocalize(ReleasePageContent)

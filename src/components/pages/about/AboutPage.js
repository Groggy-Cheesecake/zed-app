import React from 'react'
import { Link } from 'react-router-dom'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'
import i18n from '@/const/i18n/AboutPage'

import GeoHorse from '../../../assets/images/geo_horse.svg'

class AboutPageContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ about_page: i18n })
  }

  render() {
    return (
      <div className="page-content about">
        <main>
          <section className="top-section">
            <div className="green-text text-uppercase">
              <Translate id="welcome_to_zed" />
            </div>
            <h2 className="lg-text text-capitalize">
              <Translate id="create_legacy" />
            </h2>
            <div className="normal-text">
              <Translate id="about_page.main_text1" />
              <br />
              <Translate id="about_page.main_text2" />
            </div>
            {/*<Link to='/buy'>
                  <button className="primary-btn text-uppercase">
                      <Translate id="buy_a_racehorse" />
                  </button>
              </Link>*/}
          </section>

          <section className="main-section">
            <div className="introduction-content">
              <div className="part-content thought">
                <div className="img-part">
                  <img className="geo-horse" src={GeoHorse} />
                </div>
                <div className="text-part">
                  <div className="grey-text text-uppercase">
                    <Translate id="about_page.intro_title" />
                  </div>
                  <h2 className="lg-text">
                    ZED. <Translate id="about_page.zed_title" />
                  </h2>
                  <div className="normal-text">
                    <Translate id="about_page.zed_text" />
                  </div>
                </div>
              </div>
              <div className="part-content detail">
                <div className="img-text">
                  <div className="img-part">
                    <img className="geo-horse1" src={GeoHorse} />
                  </div>
                  <div className="text-part">
                    <div className="item">
                      <div className="grey-text text-uppercase">
                        <Translate id="bloodline" />
                      </div>
                      <div className="md-text">4</div>
                    </div>
                    <div className="item">
                      <div className="grey-text text-uppercase">
                        <Translate id="about_page.thoroughbred_cap" />
                      </div>
                      <div className="md-text">38,000</div>
                    </div>
                    <div className="item">
                      <div className="grey-text text-uppercase">
                        <Translate id="about_page.geno_types" />
                      </div>
                      <div className="md-text">268</div>
                    </div>
                  </div>
                </div>
                <div className="img-text">
                  <div className="img-part">
                    <img className="geo-horse2" src={GeoHorse} />
                  </div>
                  <div className="text-part">
                    <div className="item">
                      <div className="grey-text text-uppercase">
                        <Translate id="about_page.launch" />
                      </div>
                      <div className="md-text">Dec 2018</div>
                    </div>
                    <div className="item">
                      <div className="grey-text text-uppercase">
                        <Translate id="release" />
                      </div>
                      <div className="md-text">5,000</div>
                    </div>
                    <div className="item">
                      <div className="grey-text text-uppercase">
                        <Translate id="about_page.races" />
                      </div>
                      <div className="md-text">24/7</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-detail">
              <div className="detail-content">
                <div className="item-content">
                  <div className="detail-item ownership">
                    <div className="grey-text text-uppercase">
                      <Translate id="about_page.ownership_title" />
                    </div>
                    <div className="md-text">
                      <Translate id="about_page.purchase_subtitle" />
                    </div>
                    <div className="t-content">
                      <Translate id="about_page.ownership_text1" />
                      <br />
                      <br />
                      <Translate id="about_page.ownership_text2" />
                    </div>
                  </div>
                  <div className="detail-item breed">
                    <div className="grey-text text-uppercase">
                      <Translate id="about_page.breed_title" />
                    </div>
                    <div className="md-text text-capitalize">
                      <Translate id="about_page.breed_subtitle" />
                    </div>
                    <div className="t-content">
                      <Translate id="about_page.breed_text1" />
                      <br />
                      <br />
                      <Translate id="about_page.breed_text2" />
                    </div>
                  </div>
                </div>
                <div className="item-content">
                  <div className="detail-item constant">
                    <div className="grey-text text-uppercase">
                      <Translate id="about_page.constant_title" />
                    </div>
                    <div className="md-text text-capitalize">
                      <Translate id="about_page.constant_subTitle" />
                    </div>
                    <div className="t-content">
                      <Translate id="about_page.constant_text1" />
                      <br />
                      <br />
                      <Translate id="about_page.constant_text2" />
                    </div>
                  </div>
                  <div className="detail-item legacy">
                    <div className="grey-text text-uppercase">
                      <Translate id="about_page.build_title" />
                    </div>
                    <div className="md-text text-capitalize">
                      <Translate id="about_page.build_subTitle" />
                    </div>
                    <div className="t-content">
                      <Translate id="about_page.build_text1" />
                      <br />
                      <br />
                      <Translate id="about_page.build_text2" />
                    </div>
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
                <button className="primary-btn text-uppercase faq">
                  <Translate id="menu_items.buy_a_racehorse" />
                </button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default withLocalize(AboutPageContent)

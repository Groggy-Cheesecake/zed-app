import React from 'react'
import Accordion from '../../common/Accordion/footer/Accordion'
import { FAQQuery } from '../../static/FooterQuery'
import GlowImg from '../../../assets/images/bkg-oval-top-bottom.svg'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'
import i18n from '@/const/i18n/FAQPage'

class FAQPageContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ faq_page: i18n })
  }

  render() {
    return (
      <div className="page-content faq mobile">
        <main>
          <section className="top-section">
            <div className="green-text text-uppercase">
              <Translate id="frequently_asked_questions" />
            </div>
            <h2 className="md-text text-uppercase">
              <Translate id="faq" />
            </h2>
            <div className="normal-text">
              <Translate id="faq_page.faq_text_short" />
            </div>
          </section>

          <section className="main-section">
            <img className="glow-bg" src={GlowImg} />
            <div className="faq-content">
              <div className="accordion-content">
                <div className="accordion" role="tablist">
                  <Accordion panels={FAQQuery} activeTab={-1} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default withLocalize(FAQPageContent)

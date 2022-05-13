import React from 'react'
import Accordion from '../../common/Accordion/footer/Accordion'
import { FAQQuery } from '../../static/FooterQuery'

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
      <div className="page-content faq">
        <main>
          <section className="top-section">
            <div className="green-text text-uppercase">
              <Translate id="frequently_asked_questions" />
            </div>
            <h2 className="lg-text text-uppercase">
              <Translate id="faq" />
            </h2>
            <div className="normal-text">
              We have compiled a list of questions that users in our community commonly ask. If you
              have a question or query you can not find below, feel free to join our&nbsp;
              <a className="text-capitalize" href="https://discord.gg/sNgA5Zu">
                <Translate id="menu_items.discord" />
              </a>
              &nbsp;community and reach to us. We would be glad to help!
            </div>
          </section>

          <section className="main-section">
            <div className="faq-content">
              <div className="accordion-content">
                <div className="accordion" role="tablist">
                  <Accordion panels={FAQQuery} activeTab={0} />
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

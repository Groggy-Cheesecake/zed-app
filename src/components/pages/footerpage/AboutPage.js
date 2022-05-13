import React from 'react'
import Header from '../../Header/index.js'
import Footer from '../../Footer/index.js'
import Accordion from '../../common/Accordion/footer/Accordion'
import { AboutQuery } from '../../static/FooterQuery'
import ismobile from 'is-mobile'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'
import i18n from '@/const/i18n/FooterAboutPage'

class AboutPageContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ footer_about_page: i18n })
  }

  render() {
    return (
      <div className={`about-content ${ismobile() ? 'mobile' : ''}`}>
        <Header />

        <main>
          <div className="query-content">
            <h2 className="text-uppercase">
              <Translate id="menu_items.about" />
            </h2>
            <div className="page-exp">
              <Translate id="footer_about_page.about_text" />
            </div>
            <Accordion panels={AboutQuery} activeTab={-1} />
          </div>
        </main>

        <Footer />
      </div>
    )
  }
}

export default withLocalize(AboutPageContent)

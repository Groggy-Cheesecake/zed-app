import React from 'react'
import ismobile from 'is-mobile'
import Accordion from '../../common/Accordion/footer/Accordion'
import { BloodlineQuery } from '../../static/FooterQuery'

import { Translate, withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'
import i18n from '@/const/i18n/FooterBloodlinePage'

class BloodlinPageContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.props.addTranslation({ footer_bloodline_page: i18n })
  }

  render() {
    return (
      <div className={`page-content about bloodline ${ismobile() ? 'mobile' : ''}`}>
        <main>
          <div className="query-content">
            <h2 className="text-uppercase">
              <Translate id="bloodline" />
            </h2>
            <div className="page-exp">
              <Translate id="footer_bloodline_page.bloodline_text1" />
              <br />
              <br />
              <Translate id="footer_bloodline_page.bloodline_text" />
              <br />
              <br />
              <Translate id="footer_bloodline_page.bloodline_text3" />
              <br />
              <br />
              <Translate id="footer_bloodline_page.bloodline_text4" />
              <br />
            </div>
            <Accordion panels={BloodlineQuery} activeTab={-1} />
          </div>
        </main>
      </div>
    )
  }
}

export default withLocalize(BloodlinPageContent)

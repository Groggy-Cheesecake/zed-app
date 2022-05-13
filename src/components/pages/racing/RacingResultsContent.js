import React from 'react'

import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/RosterPage'
import Accordion from 'components/common/Accordion/racing/Accordion'

class RacingResultsContent extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.props.addTranslation({ racing: i18n })
  }

  render() {
    const data = [
      {
        cityImg: 'usa',
        cityName: 'USA - New York',
      },
      {
        cityImg: 'norway',
        cityName: 'Norway - Oslo',
      },
      {
        cityImg: 'australia',
        cityName: 'Australia - Sydney',
      },
    ]
    return (
      <div className="racing-results-content">
        <div className="racing-content">
          <div className="accordion-label">
            <div className="overline-text text-uppercase">
              <Translate id="racing.schedule_part.race_details" />
            </div>
            <div className="right">
              <div className="overline-text text-uppercase">
                <Translate id="racing.result" />
              </div>
              <div className="overline-text text-uppercase date">
                <Translate id="racing.date" />
              </div>
            </div>
          </div>
          <div className="accordion-content">
            <div className="accordion" role="tablist">
              <Accordion panels={data} activeTab={-1} tab="results" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withLocalize(RacingResultsContent))

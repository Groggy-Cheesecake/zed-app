import React from 'react'
import { PrivacyQuery } from '../../static/FooterQuery'
import ismobile from 'is-mobile'

class PrivacyPageContent extends React.Component {
  render() {
    return (
      <div className={`page-content about privacy ${ismobile() ? 'mobile' : ''}`}>
        <main>
          <div className="query-content">
            <div
              className="page-exp normal-text"
              dangerouslySetInnerHTML={{ __html: PrivacyQuery[0].content }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default PrivacyPageContent

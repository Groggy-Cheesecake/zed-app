import React from 'react'
import { TermsQuery } from '../../static/FooterQuery'
import ismobile from 'is-mobile'

class TermsPageContent extends React.Component {
  render() {
    return (
      <div className={`page-content about terms ${ismobile() ? 'mobile' : ''}`}>
        <main>
          <div className="query-content">
            <div
              className="page-exp normal-text"
              dangerouslySetInnerHTML={{ __html: TermsQuery[0].content }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default TermsPageContent

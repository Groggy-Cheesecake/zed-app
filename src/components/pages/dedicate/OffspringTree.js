/* eslint-disable */
import React from 'react'
import * as ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'
import i18n from '@/const/i18n/DedicatedPage'
import ArrowDown from '../../../assets/images/icn-carret-down-24.svg'

class OffspringTree extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
    isOpenTree: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpenTree: false,
      treeHeight: 0,
    }
    this.props.addTranslation({ dedicated_page: i18n })
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this)
      const treeHeight = el.querySelector('.progeny-body').scrollHeight
      this.setState({
        treeHeight,
      })
    }, 333)
  }

  render() {
    const { isOpenTree } = this.state
    const innerStyle = {
      height: isOpenTree ? `${this.state.treeHeight}px` : '0px',
    }

    return (
      <div className="progeny-status">
        <div className="progeny-label" onClick={() => this.setState({ isOpenTree: !isOpenTree })}>
          <div className="primary-text text-capitalize">
            <Translate id="progeny_status" />
          </div>
          <div className="outline-btn md thin details-btn">
            <div className="primary-text text-capitalize">
              <Translate id="details" />
            </div>
            <img className="icon" src={ArrowDown} />
          </div>
        </div>
        <div className="progeny-body" style={innerStyle}>
          <div className="parents">
            <div className="offspring-card">
              <img className="icon o-horse" src="https://cdn.zed.run/images/F0FFFF.svg" />
              <div className="o-infos">
                <div className="primary-text o-name">Big Macy</div>
                <div className="o-info">
                  <div className="primary-text helpful">Z1</div>
                  <div className="primary-text helpful">Stallion</div>
                  <div className="primary-text helpful">12/0/0</div>
                  <div className="primary-text helpful">1.2%</div>
                </div>
              </div>
            </div>
            <div className="offspring-card">
              <img className="o-horse" src="https://cdn.zed.run/images/F0FFFF.svg" />
              <div className="o-infos">
                <div className="primary-text o-name">Big Macy</div>
                <div className="o-info">
                  <div className="primary-text helpful">Z1</div>
                  <div className="primary-text helpful">Stallion</div>
                  <div className="primary-text helpful">12/0/0</div>
                  <div className="primary-text helpful">1.2%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="diagram">
            <div className="up">
              <div className="block top1">
                <div className="badge sire">SIRE</div>
              </div>
              <div className="block top2" />
              <div className="block top3" />
              <div className="block top4">
                <div className="badge dam">DAM</div>
              </div>
              <div className="block down1" />
              <div className="block down2">
                <div className="circle" />
              </div>
              <div className="block down3" />
              <div className="block down4" />
            </div>
            <div className="offspring-card">
              <img className="icon o-horse" src="https://cdn.zed.run/images/F0FFFF.svg" />
              <div className="o-infos">
                <div className="primary-text o-name">Big Macy</div>
                <div className="o-info">
                  <div className="primary-text helpful">Z1</div>
                  <div className="primary-text helpful">Stallion</div>
                  <div className="primary-text helpful">12/0/0</div>
                  <div className="primary-text helpful">1.2%</div>
                </div>
              </div>
            </div>
            <div className="down">
              <div className="block top1">
                <div className="badge offs">OFFSPRINGS</div>
              </div>
              <div className="block top2" />
              <div className="block down" />
            </div>
          </div>
          <div className="childrens">
            <div className="offspring-card">
              <img className="icon o-horse" src="https://cdn.zed.run/images/F0FFFF.svg" />
              <div className="o-infos">
                <div className="primary-text o-name">Big Macy</div>
                <div className="o-info">
                  <div className="primary-text helpful">Z1</div>
                  <div className="primary-text helpful">Stallion</div>
                  <div className="primary-text helpful">12/0/0</div>
                  <div className="primary-text helpful">1.2%</div>
                </div>
              </div>
            </div>
            <div className="offspring-card">
              <img className="o-horse" src="https://cdn.zed.run/images/F0FFFF.svg" />
              <div className="o-infos">
                <div className="primary-text o-name">Big Macy</div>
                <div className="o-info">
                  <div className="primary-text helpful">Z1</div>
                  <div className="primary-text helpful">Stallion</div>
                  <div className="primary-text helpful">12/0/0</div>
                  <div className="primary-text helpful">1.2%</div>
                </div>
              </div>
            </div>
            <div className="offspring-card">
              <img className="icon o-horse" src="https://cdn.zed.run/images/F0FFFF.svg" />
              <div className="o-infos">
                <div className="primary-text o-name">Big Macy</div>
                <div className="o-info">
                  <div className="primary-text helpful">Z1</div>
                  <div className="primary-text helpful">Stallion</div>
                  <div className="primary-text helpful">12/0/0</div>
                  <div className="primary-text helpful">1.2%</div>
                </div>
              </div>
            </div>
            <div className="offspring-card">
              <img className="o-horse" src="https://cdn.zed.run/images/F0FFFF.svg" />
              <div className="o-infos">
                <div className="primary-text o-name">Big Macy</div>
                <div className="o-info">
                  <div className="primary-text helpful">Z1</div>
                  <div className="primary-text helpful">Stallion</div>
                  <div className="primary-text helpful">12/0/0</div>
                  <div className="primary-text helpful">1.2%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="show-more">
            <button className="outline-btn md thin">
              <Translate id="show_more" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withLocalize(OffspringTree)

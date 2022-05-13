import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { withLocalize, getActiveLanguage, Translate } from 'react-localize-redux'
import { drizzleConnect } from 'drizzle-react'
import { detect } from 'detect-browser'
import Modal from 'react-modal'
import { MenuList, MenuItem, MenuButton } from 'react-menu-list'

// Constants
import { CURRENT_NETWORK, SUPPORTED_BROWSERS } from '@/const/GlobalData'

// Components
import StartModalContent from '../common/StartModal'
import SupportBrowserContent from '../common/SupportBrowser'

// Styles
import './header.scss'

// Images
import Logo from '../../assets/images/zed_logo_wht.svg'
// import Horse from '../../assets/images/icn-horse-24.svg';
import Marketplace from '../../assets/images/icn-auction-24.svg'
import Racing from '../../assets/images/icn-race-24.svg'
import Help from '../../assets/images/icn-info-24.svg'
import Activity from '../../assets/images/icn-pulse-24.svg'
import User from '../../assets/images/icn-user-cowboy-black-24.svg'
import Arrow from '../../assets/images/icn-drop-down1-24.svg'

const LI = props => {
  return (
    <MenuItem
      style={{ cursor: 'pointer', userSelect: 'none' }}
      highlightedStyle={{ background: 'gray' }}
      {...props}
    />
  )
}

class Header extends React.Component {
  static propTypes = {
    isWeb3Connected: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    networkId: PropTypes.number,
    languages: PropTypes.array,
    setActiveLanguage: PropTypes.func,
    activeLanguage: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func,
      location: PropTypes.object,
    }),
    location: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      subMenuOpen: false,
      langMenuOpen: false,
      browser: null,
      browserModal: false,
    }

    this._handleStartClick = this._handleStartClick.bind(this)
    this.toggleSubMenu = this.toggleSubMenu.bind(this)
    this.toggleLanguageMenu = this.toggleLanguageMenu.bind(this)
    this.closeStartModal = this.closeStartModal.bind(this)
    this.closeBrowserModal = this.closeBrowserModal.bind(this)
  }

  componentDidMount() {
    this.setState({
      browser: detect().name,
    })
  }

  closeStartModal() {
    this.props.history.push(this.props.history.location.pathname.replace('start', ''))
  }

  closeBrowserModal() {
    this.setState({ browserModal: false })
  }

  toggleSubMenu(e) {
    e.preventDefault()
    this.setState({ subMenuOpen: !this.state.subMenuOpen })
  }

  toggleLanguageMenu(e) {
    e.preventDefault()
    this.setState({ langMenuOpen: !this.state.langMenuOpen })
  }

  _handleStartClick() {
    const { history, isWeb3Connected, networkId } = this.props

    if (SUPPORTED_BROWSERS.indexOf(this.state.browser) === -1) {
      this.setState({ browserModal: true })
      return
    }

    if (isWeb3Connected && networkId && networkId !== CURRENT_NETWORK.id) {
      history.push('/network')
    } else if (window.ethereum) {
      window.ethereum
        .enable()
        .then(() => history.push('/home/start'))
        .catch(console.error)
    } else {
      history.push('/home/start')
    }
  }

  _setActiveLanguage(lang) {
    window.localStorage.setItem('lang', lang.code)
    this.props.setActiveLanguage(lang.code)
  }

  render() {
    return (
      <header className="header">
        <div className="header-content">
          <div className="left-part">
            <div className="logo-part">
              <NavLink to="/" className="logo" exact={true}>
                <img className="logo-img" src={Logo} />
              </NavLink>
            </div>
            {/*<div className="icon-part-wrap">
                <div className="icon-part stable">
                    <div className="icon-sm" >
                        <img className="icon" src={Horse} />
                    </div>
                    <NavLink to='/stable' className='primary-text secondary text-capitalize' activeClassName='menu selected' exact={true}>
                        <Translate id="menu_items.stable" />
                    </NavLink>
                </div>
            </div>*/}
            <div className="icon-part-wrap">
              <MenuButton
                className="menu-button"
                menuZIndex={9999}
                menu={
                  <div className="menu-content">
                    <MenuList>
                      <LI>
                        <NavLink to="/release" className="primary-text text-capitalize">
                          <Translate id="release" />
                        </NavLink>
                      </LI>
                      <LI>
                        <NavLink to="/buy" className="primary-text">
                          <Translate id="menu_items.buy_a_racehorse" />
                        </NavLink>
                      </LI>
                      {/*<LI>
                          <NavLink to='/marketplace' className="primary-text text-capitalize">
                              <Translate id="menu_items.auctions" />
                          </NavLink>
                      </LI>*/}
                      <LI>
                        <NavLink to="/stud" className="primary-text text-capitalize">
                          <Translate id="menu_items.stud_service" />
                        </NavLink>
                      </LI>
                    </MenuList>
                  </div>
                }
              >
                <div className="icon-part">
                  <div className="icon-sm">
                    <img className="icon" src={Marketplace} />
                  </div>
                  <div className="primary-text secondary text-capitalize">
                    <Translate id="menu_items.marketplace" />
                  </div>
                  <div className="icon-arrow">
                    <img className="icon" src={Arrow} />
                  </div>
                </div>
              </MenuButton>
            </div>
            <div className="icon-part-wrap">
              <MenuButton
                className="menu-button"
                menuZIndex={9999}
                menu={
                  <div className="menu-content">
                    <MenuList>
                      <LI>
                        <NavLink to="/roster" className="primary-text text-capitalize">
                          <Translate id="menu_items.roster" />
                        </NavLink>
                      </LI>
                      <LI className="disabled">
                        <NavLink to="#" className="primary-text helpful text-capitalize">
                          <Translate id="menu_items.race_schedule" />
                        </NavLink>
                      </LI>
                      <LI className="disabled">
                        <NavLink to="#" className="primary-text helpful text-capitalize">
                          <Translate id="menu_items.event_result" />
                        </NavLink>
                      </LI>
                    </MenuList>
                  </div>
                }
              >
                <div className="icon-part">
                  <div className="icon-sm">
                    <img className="icon" src={Racing} />
                  </div>
                  <div className="primary-text secondary text-capitalize">
                    <Translate id="menu_items.racing" />
                  </div>
                  <div className="icon-arrow">
                    <img className="icon" src={Arrow} />
                  </div>
                </div>
              </MenuButton>
            </div>
            <div className="icon-part-wrap">
              <MenuButton
                className="menu-button"
                menuZIndex={9999}
                menu={
                  <div className="menu-content">
                    <MenuList>
                      <LI>
                        <NavLink to="/faq" className="primary-text text-capitalize">
                          <Translate id="faq" />
                        </NavLink>
                      </LI>
                      <LI>
                        <NavLink to="/about" className="primary-text text-capitalize">
                          <Translate id="menu_items.about" />
                        </NavLink>
                      </LI>
                    </MenuList>
                  </div>
                }
              >
                <div className="icon-part">
                  <div className="icon-sm">
                    <img className="icon" src={Help} />
                  </div>
                  <div className="primary-text secondary text-capitalize">
                    <Translate id="menu_items.more" />
                  </div>
                  <div className="icon-arrow">
                    <img className="icon" src={Arrow} />
                  </div>
                </div>
              </MenuButton>
            </div>
          </div>

          {this.props.isLoggedIn ? (
            <div className="right-part">
              <div className="activity-part">
                <NavLink
                  to="/activity"
                  className="primary-text secondary text-capitalize"
                  activeClassName="menu selected"
                  exact={true}
                >
                  <img className="icon" src={Activity} />
                </NavLink>
              </div>
              <div className="icon-part-wrap">
                <div className="icon-part user-part">
                  <NavLink to="/stable" exact={true}>
                    <div className="icon-sm">
                      <img className="icon" src={User} />
                    </div>
                  </NavLink>
                  {/*<MenuButton
                      className="menu-button"
                      menuZIndex={9999}
                      menu={
                          <div className="menu-content profile">
                              <MenuList>
                                  <LI>
                                      <NavLink to='/' className="primary-text text-capitalize">
                                          <Translate id="profile"/>
                                      </NavLink>
                                  </LI>
                                  <LI>
                                      <SubMenuItem
                                          className="submenu-content"
                                          positionOptions={{
                                              position: 'left',
                                              vAlign: 'top',
                                              hAlign: 'left'
                                          }}
                                          menuZIndex={9999}
                                          menu={
                                              <div className="menu-content">
                                                  <MenuList>
                                                      {this.props.languages.map((language) => {
                                                          return (
                                                              <LI key={language.code}
                                                                  onItemChosen={() => this._setActiveLanguage(language)}>
                                                                  <div
                                                                      className="primary-text text-capitalize">
                                                                      {language.code} - {language.name}
                                                                  </div>
                                                              </LI>
                                                          );
                                                      })}
                                                  </MenuList>
                                              </div>
                                          }>
                                          <div className="primary-text text-capitalize">
                                              <Translate id="language"/>: {this.props.activeLanguage.code}
                                          </div>
                                      </SubMenuItem>
                                  </LI>
                                  <LI>
                                      <NavLink to='/' className="primary-text text-capitalize">
                                          <Translate id="settings"/>
                                      </NavLink>
                                  </LI>
                              </MenuList>
                          </div>
                      }
                  >
                      <div className="icon-arrow">
                          <img className="icon" src={Arrow}/>
                      </div>
                  </MenuButton>*/}
                </div>
              </div>
            </div>
          ) : (
            <div className="right-part">
              {/*<div className="icon-part-wrap translation-part">
                  <MenuButton
                      className="menu-button"
                      menuZIndex={9999}
                      menu={
                          <div className="menu-content">
                              <MenuList>
                                  {this.props.languages.map((language) => {
                                      return (
                                          <LI key={language.code} onItemChosen={() => this._setActiveLanguage(language)}>
                                              <div className="primary-text text-capitalize">
                                                  {language.code} - {language.name}
                                              </div>
                                          </LI>
                                      );
                                  })}
                              </MenuList>
                          </div>
                      }
                  >
                      <div className="icon-part">
                          <div className='primary-text secondary text-uppercase'>
                              {this.props.activeLanguage.code}
                          </div>
                          <div className="icon-arrow">
                              <img className="icon" src={Arrow}/>
                          </div>
                      </div>
                  </MenuButton>
              </div>*/}
              <div className="start-part">
                <button
                  className="primary-btn md start"
                  key="button"
                  type="button"
                  onClick={this._handleStartClick}
                >
                  <div className="primary-text text-capitalize">
                    <Translate id="start" />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        <Modal
          key="modal"
          className="start-modal"
          isOpen={this.props.location.pathname === '/home/start'}
          onRequestClose={this.closeStartModal}
          ariaHideApp={false}
        >
          <StartModalContent closeModal={this.closeStartModal} />
        </Modal>

        <Modal
          key="browser-modal"
          className="support-browser-modal"
          isOpen={this.state.browserModal}
          onRequestClose={this.closeBrowserModal}
          ariaHideApp={false}
        >
          <SupportBrowserContent closeModal={this.closeBrowserModal} />
        </Modal>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    isWeb3Connected: state.other.isWeb3Connected,
    isLoggedIn: state.auth.completed,
    networkId: state.other.networkId,
    activeLanguage: getActiveLanguage(state.localize),
  }
}

const mapDispatchToProps = state => {
  return {
    language: state.language,
  }
}

export default withRouter(drizzleConnect(withLocalize(Header), mapStateToProps, mapDispatchToProps))

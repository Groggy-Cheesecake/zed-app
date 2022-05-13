import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { NavLink, Link } from 'react-router-dom'
import { drizzleConnect } from 'drizzle-react'
import Modal from 'react-modal'
import { Translate, withLocalize } from 'react-localize-redux'
import { detect } from 'detect-browser'

// Components
import SupportBrowserContent from '../common/SupportBrowser'

// Images
import Logo from '../../assets/images/zed_logo_wht.svg'

class HeaderContent extends React.Component {
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
    match: PropTypes.shape({
      params: PropTypes.shape({
        modal: PropTypes.string,
      }),
    }),
  }

  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
      browser: null,
      browserModal: false,
    }

    this.openBrowserModal = this.openBrowserModal.bind(this)
    this.closeBrowserModal = this.closeBrowserModal.bind(this)
  }

  componentDidMount() {
    this.setState({
      browser: detect().name,
    })
  }

  openBrowserModal() {
    this.setState({ browserModal: true })
  }

  closeBrowserModal() {
    this.setState({ browserModal: false })
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: '1001',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: this.props.menuOpen ? '#22262D' : 'none',
      },
    }

    return (
      <div className="app-header mobile">
        <div style={styles.container}>
          <div className="logo-content">
            <Link to="/">
              <img src={Logo} className="logo-img" />
            </Link>
          </div>
          <div className="start-menu">
            <button
              className="primary-btn sm mobile start-btn"
              onClick={this.openBrowserModal}
              key="button"
            >
              <Translate id="start" />
            </button>
            <MenuButton open={this.props.menuOpen} onClick={this.props.handleMenuClick} />
          </div>
        </div>
        <MenuList open={this.props.menuOpen}>
          <MenuItem delay="0s" onClick={this.props.handleLinkClick}>
            <NavLink to="/" className="normal-text text-capitalize" exact={true}>
              <Translate id="menu_items.homepage" />
            </NavLink>
          </MenuItem>
          <MenuItem delay="0.05s" onClick={this.props.handleLinkClick}>
            <NavLink to="/release" className="normal-text text-capitalize" exact={true}>
              <Translate id="release" />
            </NavLink>
          </MenuItem>
          <MenuItem delay="0.1s" onClick={this.props.handleLinkClick}>
            <NavLink to="/roster" className="normal-text text-capitalize" exact={true}>
              <Translate id="menu_items.roster" />
            </NavLink>
          </MenuItem>
          <MenuItem delay="0.15s" onClick={this.props.handleLinkClick}>
            <NavLink to="/buy" className="normal-text text-capitalize" exact={true}>
              <Translate id="menu_items.buy_a_racehorse" />
            </NavLink>
          </MenuItem>
          <MenuItem delay="0.2s" onClick={this.props.handleLinkClick}>
            <NavLink to="/faq" className="normal-text" exact={true}>
              FAQ
            </NavLink>
          </MenuItem>
          <MenuItem delay="0.25s" onClick={this.props.handleLinkClick}>
            <a href="https://discord.gg/sNgA5Zu" className="normal-text text-capitalize">
              <span>
                <Translate id="menu_items.discord" />
              </span>
              <div className="icon-wrap discord" />
            </a>
          </MenuItem>
          <MenuItem delay="0.3s" onClick={this.props.handleLinkClick}>
            <a href="https://www.medium.com/@zed_run" className="normal-text text-capitalize">
              <span>
                <Translate id="menu_items.medium" />
              </span>
              <div className="icon-wrap medium" />
            </a>
          </MenuItem>
          <MenuItem delay="0.35s" onClick={this.props.handleLinkClick}>
            <a href="https://www.reddit.com/user/zed_run" className="normal-text text-capitalize">
              <span>
                <Translate id="menu_items.reddit" />
              </span>
              <div className="icon-wrap reddit" />
            </a>
          </MenuItem>
        </MenuList>

        <Modal
          key="modal-browser"
          className="support-browser-modal mobile"
          isOpen={this.state.browserModal}
          onRequestClose={this.closeBrowserModal}
          ariaHideApp={false}
        >
          <SupportBrowserContent closeModal={this.closeBrowserModal} />
        </Modal>
      </div>
    )
  }
}

HeaderContent.propTypes = {
  menuOpen: PropTypes.bool,
  handleMenuClick: PropTypes.func,
  handleLinkClick: PropTypes.func,
}

/* MenuItem.jsx*/
class MenuItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
  }

  handleHover() {
    this.setState({ hover: !this.state.hover })
  }

  render() {
    const styles = {
      container: {
        opacity: 0,
        animation: '1s appear forwards',
        animationDelay: this.props.delay,
      },
      menuItem: {
        fontSize: '14px',
        fontFamily: 'Montserrat-Regular',
        padding: '1rem 0',
        cursor: 'pointer',
        color: this.state.hover ? 'white' : '#47494E',
        transition: 'color 0.2s ease-in-out',
        animation: '0.5s slideIn forwards',
        animationDelay: this.props.delay,
      },
      line: {
        width: '100%',
        height: '1px',
        backgroundColor: 'rgba(240,248,255,0.12)',
        margin: '0 auto',
        animation: '0.5s shrink forwards',
        animationDelay: this.props.delay,
      },
    }
    return (
      <div style={styles.container} className="header-item">
        <div
          style={styles.menuItem}
          className="item-text"
          onMouseEnter={() => {
            this.handleHover()
          }}
          onMouseLeave={() => {
            this.handleHover()
          }}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </div>
        <div style={styles.line} />
      </div>
    )
  }
}

MenuItem.propTypes = {
  delay: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
}

/* Menu.jsx */
class MenuList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open ? this.props.open : false,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open })
    }
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        color: '#fafafa',
        transition: 'height 0.3s ease',
        zIndex: 999,
      },
      menuList: {
        height: '100vh',
        paddingTop: '100px',
        backgroundColor: '#22262D',
      },
    }
    return (
      <div style={styles.container}>
        {this.state.open ? <div style={styles.menuList}>{this.props.children}</div> : null}
      </div>
    )
  }
}

MenuList.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.any,
}

/* MenuButton.jsx */
class MenuButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open ? this.props.open : false,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open })
    }
  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        cursor: 'pointer',
        padding: '36px 20px 20px',
      },
      line: {
        height: '2px',
        transition: 'all 0.2s ease',
      },
      lineTop: {
        width: this.state.open ? '18px' : '14px',
        background: this.state.open ? '#aaa' : 'white',
        transform: this.state.open ? 'rotate(45deg)' : 'none',
        transformOrigin: 'top left',
        marginBottom: this.state.open ? '5px' : '4px',
      },
      lineMiddle: {
        width: '18px',
        background: 'white',
        opacity: this.state.open ? 0 : 1,
        transform: this.state.open ? 'translateX(-16px)' : 'none',
      },
      lineBottom: {
        width: this.state.open ? '18px' : '10px',
        background: this.state.open ? '#aaa' : 'white',
        transform: this.state.open ? 'translateX(-1px) rotate(-45deg)' : 'none',
        transformOrigin: 'top left',
        marginTop: '4px',
      },
    }
    return (
      <div
        style={styles.container}
        onClick={
          this.props.onClick
            ? this.props.onClick
            : () => {
                this.handleClick()
              }
        }
      >
        <div style={{ ...styles.line, ...styles.lineTop }} />
        <div style={{ ...styles.line, ...styles.lineMiddle }} />
        <div style={{ ...styles.line, ...styles.lineBottom }} />
      </div>
    )
  }
}

MenuButton.propTypes = {
  open: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    isWeb3Connected: state.other.isWeb3Connected,
    isLoggedIn: state.auth.completed,
    networkId: state.other.networkId,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default withRouter(
  drizzleConnect(withLocalize(HeaderContent), mapStateToProps, mapDispatchToProps),
)

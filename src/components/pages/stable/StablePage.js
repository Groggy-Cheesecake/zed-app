import React from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import Modal from 'react-modal'
// import Dropzone from 'react-dropzone';
// import ReactCrop from 'react-image-crop';
// import Tooltip from 'rc-tooltip';
import { Translate, withLocalize } from 'react-localize-redux'

// Actions
import actions from 'state/actions'

// Constants
import i18n from '@/const/i18n/StablePage'

// Components
import Accordion from '../../common/Accordion/stable/Accordion'
import StableNameEditContent from './StableNameEditContent'
import RacehorseEditContent from './RacehorseEditContent'
import BreedModalContent from './BreedModalContent'
import SellModalContent from './SellModalContent'
import OffspringNameContent from './OffspringNameContent'
import ShareModalContent from '../dedicate/ShareModalContent'
import EmptyContent from '../../common/EmptyContent'
import SearchFilterBar from '../../common/SearchFiltersBar'
import LoadingIndicator from 'components/shared/LoadingIndicator'

// Images
import GlowImg from '../../../assets/images/bkg-oval-top-bottom.svg'
import IconCowboy from '../../../assets/images/icn-user-cowboy-black-24.svg'
import IconPen from '../../../assets/images/icn-pencil-24.svg'

// Styles
import 'react-image-crop/lib/ReactCrop.scss'

class StablePageContent extends React.Component {
  static propTypes = {
    nextHorse: PropTypes.object,
    releaseNumber: PropTypes.number,
    currentBatch: PropTypes.number,
    stable_name: PropTypes.string,
    stable_description: PropTypes.string,
    discord_id: PropTypes.string,
    is_private: PropTypes.bool,
    make_offer: PropTypes.bool,
    address: PropTypes.string,
    filters_fn: PropTypes.shape({
      gen: PropTypes.arrayOf(PropTypes.number),
      breed_type: PropTypes.arrayOf(PropTypes.string),
      bloodline: PropTypes.arrayOf(PropTypes.string),
      horse_type: PropTypes.arrayOf(PropTypes.string),
      horse_name: PropTypes.string,
      sort_by: PropTypes.string,
    }),
    email: PropTypes.string,
    signed_message: PropTypes.string,
    loadHorses: PropTypes.func,
    loadMoreHorses: PropTypes.func,
    ownedHorses: PropTypes.array,
    hasMoreHorses: PropTypes.bool,
    updateUser: PropTypes.func,
    getUser: PropTypes.func,
    checkAvailablity: PropTypes.func,
    isLoading: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    addTranslation: PropTypes.func,
    putHorseInStud: PropTypes.func,
    getQueryPrice: PropTypes.func,
    queryPrice: PropTypes.number,
    createActivity: PropTypes.func,
    nameHorse: PropTypes.func,
    etherPrice: PropTypes.number,
    trip_switch_search: PropTypes.bool,

    // Auth check
    isWeb3Connected: PropTypes.bool,
    is_logged_in: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.imageRef = null

    this.state = {
      stableModalIsOpen: false,
      breedModalIsOpen: false,
      sellModalIsOpen: false,
      offspringModalIsOpen: false,
      racehorseModalIsOpen: false,
      shareModalIsOpen: false,
      breedingHorse: null,
      racehorse: null,
      sellHorse: null,
      namingHorse: null,
      shareHorse: null,
      makeOffer: false,
      trip_switch_search: false,

      openCrop: false,
      src: '',
      crop: {
        x: 0,
        y: 0,
        aspect: 1,
        width: 20,
        height: 20,
      },
      croppedFile: null,
      cropModal: false,
      croppedImageUrl: '',
    }

    this._openStableModal = this._openStableModal.bind(this)
    this._closeStableModal = this._closeStableModal.bind(this)
    this._onUserUpdate = this._onUserUpdate.bind(this)
    this._loadMoreHorses = this._loadMoreHorses.bind(this)
    this._openBreedModal = this._openBreedModal.bind(this)
    this._handlePlaceInStud = this._handlePlaceInStud.bind(this)
    this._handleNameHorse = this._handleNameHorse.bind(this)

    this.props.addTranslation({ stable_page: i18n })
  }

  componentDidMount() {
    this.props.getQueryPrice()

    if (this.props.address) {
      this.props.loadHorses(this.props.address, 0, this.props.filters_fn)
    }
  }

  componentDidUpdate(oldProps, oldState, snapshot) {
    if (this.props.isWeb3Connected !== null && !this.props.isWeb3Connected) {
      this.props.history.push('/home/start')
    }

    if (this.props.stable_name !== oldProps.stable_name) {
      this.props.loadHorses(this.props.address, 0, this.props.filters_fn)
    }

    if (JSON.stringify(oldProps.filters_fn) !== JSON.stringify(this.props.filters_fn)) {
      this.setState({ trip_switch_search: true })
      this.props.loadHorses(this.props.address, 0, this.props.filters_fn)
    }
  }

  _handleNameHorse(name) {
    return this.props.nameHorse({
      name,
      horse_id: this.state.namingHorse.horse_id,
    })
  }

  _openBreedModal(data) {
    this.setState(
      {
        breedingHorse: data,
      },
      () => {
        if (['Colt', 'Stallion'].indexOf(data.horse_type) !== -1) {
          this._openStableModal('breedModalIsOpen')
        } else {
          this.props.history.push('/stud', { horseToBreeding: data })
        }
      },
    )
  }

  _openRacehorseModal(data) {
    this.setState(
      {
        racehorse: data,
      },
      () => {
        this._openStableModal('racehorseModalIsOpen')
      },
    )
  }

  _openSellModal(horse) {
    this.setState(
      {
        sellHorse: horse,
      },
      () => {
        this._openStableModal('sellModalIsOpen')
      },
    )
  }

  _openOffspringModal(horse) {
    this.setState(
      {
        namingHorse: horse,
      },
      () => {
        this._openStableModal('offspringModalIsOpen')
      },
    )
  }

  _openShareModal(horse) {
    this.setState(
      {
        shareHorse: horse,
      },
      () => {
        this._openStableModal('shareModalIsOpen')
      },
    )
  }

  _openStableModal(modal) {
    this.setState({ [modal]: true })
  }

  _closeStableModal(modal) {
    this.setState({ [modal]: false })
  }

  _loadMoreHorses() {
    this.props.loadMoreHorses(
      this.props.address,
      this.props.ownedHorses.length,
      this.props.filters_fn,
    )
  }

  _onUserUpdate(data) {
    return this.props.updateUser(data)
  }

  _handlePlaceInStud(price, duration) {
    this.props
      .putHorseInStud(
        this.props.address,
        this.props.queryPrice,
        this.state.breedingHorse.horse_id.toString(),
        price,
        duration,
      )
      .then(({ payload: tx_hash, error }) => {
        if (error || !tx_hash) {
          throw 'Something went wrong!'
        } else {
          return this.props
            .createActivity({
              params: {
                code: '2',
                horse_list: [this.state.breedingHorse.name],
                tx_hash,
              },
            })
            .then(() => {
              this._closeStableModal('breedModalIsOpen')
              this.props.history.push('/activity')
            })
        }
      })
  }

  _handleSelectChange = selectedOption => {
    this.setState({ selectedOption })
  }

  // Image crop functions

  onDrop = acceptedFiles => {
    const reader = new FileReader()
    reader.onload = e => {
      this.setState({ src: e.target.result, openCrop: true, cropModal: true })
    }
    reader.readAsDataURL(acceptedFiles[0])
  }

  closeCropModal = () => this.setState({ cropModal: false, openCrop: false })

  _cropDone = () => {
    this.closeCropModal()
  }

  _cropCancel = () => {
    this.closeCropModal()
    this.setState({ croppedImageUrl: '' })
  }

  _removeStableImage = () => {
    this.setState({ croppedImageUrl: '' })
  }

  handleCropChange = crop => {
    this.setState({ crop })
  }

  onImageLoaded = image => {
    this.imageRef = image
  }

  onCropComplete = (crop, pixelCrop) => {
    if (this.imageRef && crop.width && crop.height) {
      this.getCroppedImg(this.imageRef, pixelCrop, 'croppedFile.jpeg').then(croppedImageUrl => {
        this.setState({ croppedImageUrl })
      })
    }
  }

  getCroppedImg = (image, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas')
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    )

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        this.setState({ croppedFile: new File([blob], 'croppedFile.jpeg') })
        blob.name = fileName
        window.URL.revokeObjectURL(this.fileUrl)
        this.fileUrl = window.URL.createObjectURL(blob)
        resolve(this.fileUrl)
      }, 'image/jpeg')
    })
  }

  render() {
    return (
      <div className="page-content stable">
        <main>
          <section className="top-section">
            <div className="stable-info-content">
              <div className="green-text text-uppercase">
                <Translate id="my_stable" />
              </div>
              {/*<div className="green-text text-uppercase">
                  <Translate id="my_stable" />
              </div>*/}
              <div className="stable-info">
                <div className="name-part">
                  <div className="img-name">
                    <div className="stable-img">
                      <img
                        className={`icon s-img ${!this.state.croppedImageUrl && 'cowboy'}`}
                        src={this.state.croppedImageUrl || IconCowboy}
                      />

                      {/*{
                        this.state.openCrop ?
                          <Modal key="crop-modal"
                                 className="stable-img-crop-modal"
                                 isOpen={this.state.cropModal}
                                 onRequestClose={this.closeCropModal}
                                 ariaHideApp={false}
                          >
                            <div className="md-text text-capitalize">edit image</div>
                            <ReactCrop
                              className="crop-pane"
                              src={this.state.src}
                              crop={this.state.crop}
                              onChange={this.handleCropChange}
                              onImageLoaded={this.onImageLoaded}
                              onComplete={this.onCropComplete}
                            />
                            <div className="handle-btns">
                              <button className="outline-btn sm thin" onClick={this._cropCancel}>Cancel</button>
                              <button className="primary-btn sm thin" onClick={this._cropDone}>Confirm</button>
                            </div>
                          </Modal>
                          :
                          <Dropzone onDrop={this.onDrop}>
                            {
                              ({getRootProps, getInputProps}) => (
                                <div {...getRootProps()}>
                                  <input {...getInputProps()}/>
                                  <div className="hover-img">
                                    <img className="icon add-img" src={IconAddImg}/>
                                  </div>
                                </div>
                              )
                            }
                          </Dropzone>
                      }*/}
                    </div>
                    <h2 className="lg-text">{this.props.stable_name}</h2>
                  </div>
                  <div className="icons">
                    <div
                      className="icon-part"
                      onClick={() => this._openStableModal('stableModalIsOpen')}
                    >
                      <img className="icon" src={IconPen} />
                    </div>
                    {/*
                    <div className="icon-part">
                      <img className="icon" src={IconShare} />
                    </div>
                    */}
                  </div>
                  {/*<div className="icons">
                    <div className="icon-part" onClick={() => this._openStableModal('stableModalIsOpen')}>
                      <img className="icon" src={IconPen}/>
                      <div className="primary-text text-capitalize">
                        <Translate id="stable_page.edit_stable"/>
                      </div>
                    </div>
                    <div className="icon-part">
                      <img className="icon" src={IconShare}/>
                      <div className="primary-text text-capitalize">
                        <Translate id="share"/>
                      </div>
                    </div>
                  </div>*/}
                </div>

                {/*
                {this.props.discord_id !== null ? (
                    <div className="primary-text secondary">
                      <div className="icon-sm">
                        <img className="icon" src={Discord} />
                        <b>{'  ' + this.props.discord_id}</b>
                      </div>
                    </div>
                  ) : null}
                */}
                <div className="primary-text secondary stable-text">
                  {this.props.stable_description}
                </div>

                {/*<div className="primary-text secondary stable-text">
                  <Translate id="stable_page.stable_text"/>
                </div>
                <div className="stable-properties">
                  <div className="prop">
                    <div className="overline-text sm helpful text-uppercase prop-name">
                      <Translate id="stable_page.thoroughbreds"/>
                    </div>
                    <div className="md-text">3</div>
                  </div>
                  <div className="prop">
                    <div className="overline-text sm helpful text-uppercase prop-name">
                      <Translate id="stable_page.total_career"/>
                    </div>
                    <div className="md-text">10/21/0</div>
                  </div>
                  <div className="prop">
                    <div className="overline-text sm helpful text-uppercase prop-name">
                      <Translate id="win_rate"/>
                    </div>
                    <div className="md-text">43%</div>
                  </div>
                  <div className="prop">
                    <div className="overline-text sm helpful text-uppercase prop-name">
                      <Translate id="stable_page.earnings"/>
                    </div>
                    <div className="earnings">
                      <div className="md-text">14&nbsp;<span className="symbol">Ξ</span></div>
                      <Tooltip placement="right"
                               overlay={
                                 <div>
                                   Earnings from Racing: 6<span className="symbol">Ξ</span><br/>
                                   Earnings from Breeding: 8<span className="symbol">Ξ</span><br/>
                                   Total: 14<span className="symbol">Ξ</span>
                                 </div>
                               }
                      >
                        <img className="icon" src={IconInfo}/>
                      </Tooltip>
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
          </section>
          <img className="glow-img" src={GlowImg} />

          <section className="main-section">
            <div>
              <div className="stable-content">
                <div className="row">
                  <div className="column_one_main">
                    {/*
                      {this.props.ownedHorses.length !== 0 ? (
                        <EmptyStableSidebar />
                      ) : null}
                      <div className="accordion-content">
                        <div className="accordion" role="tablist">
                          {!this.props.isLoading && this.props.ownedHorses.length === 0 ? (
                            <EmptyStableSidebar />
                          ) : null }
                        </div>
                      </div>
                    */}
                  </div>
                  <div className="column_two_main">
                    {this.props.ownedHorses.length !== 0 || this.state.trip_switch_search ? (
                      <div>
                        <div className="row">
                          <div className="column_one_stall_name">
                            <h1>All Racehorses</h1>
                          </div>
                          <div className="column_two_row_view">
                            {/*
                            <div className="overline-text sm text-uppercase">
                              <Translate id="view" />:
                              <div className="icons">
                                <a
                                  className="icon-part"
                                  style={{ opacity: !this.state.view_grid ? 1 : null }}
                                  onClick={() => this.setState({ view_grid: false })}
                                >
                                  <img className="icon" src={IconGrid} />
                                </a>
                                <a
                                  className="icon-part"
                                  style={{ opacity: this.state.view_grid ? 1 : null }}
                                  onClick={() => this.setState({ view_grid: true })}
                                >
                                  <img className="icon" src={IconList} />
                                </a>
                              </div>
                            </div>
                            */}
                          </div>
                        </div>
                        <div className="filter">
                          <SearchFilterBar filter_type={'stable'} />
                        </div>
                      </div>
                    ) : null}
                    <div className="accordion-content">
                      <div className="accordion" role="tablist">
                        {this.props.isLoading ? (
                          <div style={{ flex: 1, minHeight: '300px', position: 'relative' }}>
                            <LoadingIndicator busy={this.props.isLoading} />
                          </div>
                        ) : this.props.ownedHorses.length !== 0 ? (
                          <div
                            style={{ minHeight: this.state.trip_switch_search ? '300px' : null }}
                          >
                            <Accordion
                              loadMore={this._loadMoreHorses}
                              panels={this.props.ownedHorses}
                              hasMore={this.props.hasMoreHorses && !this.props.isLoadingMore}
                              openRacehorseModal={data => this._openRacehorseModal(data)}
                              openBreedModal={horse => this._openBreedModal(horse)}
                              openSellModal={horse => this._openSellModal(horse)}
                              openShareModal={horse => this._openShareModal(horse)}
                              makeOffer={this.state.makeOffer}
                              openOffspringNameModal={horse => this._openOffspringModal(horse)}
                              activeTab={-1}
                            />
                            <br />
                          </div>
                        ) : (
                          <div style={{ paddingTop: '120px' }}>
                            <EmptyContent
                              type={this.state.trip_switch_search ? 'no_results' : 'stable'}
                            />
                          </div>
                        )}

                        {this.props.isLoadingMore && (
                          <div style={{ marginTop: '50px', position: 'relative' }}>
                            <LoadingIndicator busy={this.props.isLoadingMore} relative />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Modal
          key="edit"
          className="stable-name-edit-modal"
          isOpen={this.state.stableModalIsOpen}
          onRequestClose={() => this._closeStableModal('stableModalIsOpen')}
          ariaHideApp={false}
        >
          <StableNameEditContent
            email={this.props.email}
            stable_name={this.props.stable_name}
            stable_description={this.props.stable_description}
            make_offer={this.props.make_offer}
            discord_id={this.props.discord_id}
            is_private={this.props.is_private}
            closeModal={() => this._closeStableModal('stableModalIsOpen')}
            onSubmit={this._onUserUpdate}
            onChangeMakeOffer={e => this.setState({ makeOffer: e.target.checked })}
            // props for image cropping
            openCrop={this.state.openCrop}
            src={this.state.src}
            crop={this.state.crop}
            croppedFile={this.state.croppedFile}
            cropModal={this.state.cropModal}
            croppedImageUrl={this.state.croppedImageUrl}
            onDrop={this.onDrop}
            closeCropModal={this.closeCropModal}
            _cropDone={this._cropDone}
            _cropCancel={this._cropCancel}
            _removeStableImage={this._removeStableImage}
            handleCropChange={this.handleCropChange}
            onImageLoaded={this.onImageLoaded}
            onCropComplete={this.onCropComplete}
            getCroppedImg={this.getCroppedImg}
          />
        </Modal>

        <Modal
          key="racehorse"
          className="racehorse-edit-modal"
          isOpen={this.state.racehorseModalIsOpen}
          onRequestClose={() => this._closeStableModal('racehorseModalIsOpen')}
          ariaHideApp={false}
        >
          <RacehorseEditContent
            data={this.state.racehorse}
            closeModal={() => this._closeStableModal('racehorseModalIsOpen')}
          />
        </Modal>

        <Modal
          key="breed"
          className="breed-modal"
          isOpen={this.state.breedModalIsOpen}
          onRequestClose={() => this._closeStableModal('breedModalIsOpen')}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <BreedModalContent
            horse={this.state.breedingHorse}
            etherPrice={this.props.etherPrice}
            onSubmit={this._handlePlaceInStud}
            closeModal={() => this._closeStableModal('breedModalIsOpen')}
          />
        </Modal>

        <Modal
          key="sell"
          className="breed-modal"
          isOpen={this.state.sellModalIsOpen}
          onRequestClose={() => this._closeStableModal('sellModalIsOpen')}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <SellModalContent
            closeModal={() => this._closeStableModal('sellModalIsOpen')}
            horse={this.state.sellHorse}
          />
        </Modal>

        <Modal
          key="offspring"
          className="offspring-naming-modal"
          isOpen={this.state.offspringModalIsOpen}
          onRequestClose={() => this._closeStableModal('offspringModalIsOpen')}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <OffspringNameContent
            closeModal={() => this._closeStableModal('offspringModalIsOpen')}
            onSubmit={this._handleNameHorse}
            horse={this.state.namingHorse}
          />
        </Modal>

        <Modal
          key="modal-share"
          className="share-horse-modal"
          isOpen={this.state.shareModalIsOpen}
          onRequestClose={() => this._closeStableModal('shareModalIsOpen')}
          ariaHideApp={false}
        >
          <ShareModalContent
            closeModal={() => this._closeStableModal('shareModalIsOpen')}
            horse={this.state.shareHorse}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    stable_name: state.auth.stable_name,
    stable_description: state.auth.stable_description,
    discord_id: state.auth.discord_id,
    make_offer: state.auth.make_offer,
    is_private: state.auth.is_private,
    signed_message: state.auth.message,
    address: state.auth.address,
    filters_fn: {
      gen: state.filters.filters.gen,
      breed_type: state.filters.filters.breed_type,
      bloodline: state.filters.filters.bloodline,
      horse_type: state.filters.filters.horse_type,
      horse_name: state.filters.filters.horse_name,
      sort_by: state.filters.filters.sort_by,
    },
    ownedHorses: state.stable.horses,
    isLoading: state.stable.isLoading,
    isLoadingMore: state.stable.isLoadingMore,
    hasMoreHorses: state.stable.hasMoreHorses,
    nextHorse: state.market.nextHorse,
    currentBatch: state.market.currentBatch,
    releaseNumber: state.market.releaseNumber,
    queryPrice: state.stud.queryPrice,
    etherPrice: state.other.etherPrice,

    // Auth check
    isWeb3Connected: state.other.isWeb3Connected,
    is_logged_in: state.auth.completed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (params, signed_message) => dispatch(actions.user.update(params, signed_message)),
    checkAvailablity: data => dispatch(actions.auth.checkAvailablity(data)),
    loadHorses: (address, offset, filter_fn) =>
      dispatch(actions.stable.loadHorses(address, offset, filter_fn)),
    loadMoreHorses: (address, offset, filter_fn) =>
      dispatch(actions.stable.loadMoreHorses(address, offset, filter_fn)),
    getQueryPrice: () => dispatch(actions.stud.getQueryPrice()),
    putHorseInStud: (address, queryPrice, horseId, price, duration) => {
      return dispatch(actions.stud.putHorseInStud(address, queryPrice, horseId, price, duration))
    },
    createActivity: data => dispatch(actions.activity.createItem(data)),
    nameHorse: data => dispatch(actions.stable.nameOffspring(data)),
  }
}

export default drizzleConnect(
  withRouter(withLocalize(StablePageContent)),
  mapStateToProps,
  mapDispatchToProps,
)

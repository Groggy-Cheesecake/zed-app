import React from 'react'
import * as ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { Translate, withLocalize } from 'react-localize-redux'
import InputRange from 'react-input-range'
import DebounceInput from 'react-debounce-input'

import i18n from '@/const/i18n/StablePage'

// Actions
import actions from 'state/actions'

// Components
import Select from '../_base/Select'
import Checkbox from '../_base/Checkbox'

// Styles
import 'react-input-range/lib/css/index.css'
import './_search_filters_bar.scss'

// Assets
import IconFilter from '../../../assets/images/icn-filter-24.svg'
import IconClose from '../../../assets/images/icn-close-24.svg'

const options = {
  stable: [
    { value: 'created_by_desc', label: 'Date - Newest' },
    { value: 'created_by_asc', label: 'Date - Oldest' },
  ],
  stud: [
    { value: 'inserted_at_stud', label: 'Recently Listed' },
    { value: 'time_left', label: 'Expiring Soon' },
    { value: 'mating_price', label: 'Highest Price' },
    { value: 'mating_price_lowest', label: 'Lowest Price' },
  ],
}

class SearchFilterBar extends React.Component {
  static propTypes = {
    addTranslation: PropTypes.func,
    applyFilters: PropTypes.func,
    filter_type: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      filter_extend: false,
      filter_extend_height: 0,
      slider_changing: false,
      gen: [1, 268],
      breed_type: [],
      bloodline: [],
      horse_type: [],
      horse_name: '',
      sort_by_dropdown: options[this.props.filter_type][0],
      sort_by: options[this.props.filter_type][0].value,
      coat_group_active: [],
      coat_rarity_active: [],
      offspring: 'any',
      races: 'any',
      winRate: 'any',
    }

    this.props.addTranslation({ stable_page: i18n })
  }

  componentDidMount() {
    this.props.applyFilters(this.state)
    window.setTimeout(() => {
      const el = ReactDOM.findDOMNode(this) // eslint-disable-line
      const filter_extend_height = el.querySelector('.filter-section').scrollHeight
      this.setState({ filter_extend_height })
    }, 333)
  }

  componentDidUpdate(old_props, old_state) {
    if (old_state !== this.state && !this.state.slider_changing) {
      this.props.applyFilters(this.state)
    }
  }

  componentWillUnmount() {
    this.props.applyFilters({
      filter_extend: false,
      filter_extend_height: 0,
      slider_changing: false,
      gen: [1, 268],
      breed_type: [],
      bloodline: [],
      horse_type: [],
      horse_name: '',
      sort_by_dropdown: options[this.props.filter_type][0],
      sort_by: options[this.props.filter_type][0].value,
      coat_group_active: [],
      coat_rarity_active: [],
      offspring: 'any',
      races: 'any',
      winRate: 'any',
    })
  }

  _onChangeHorseName = e => {
    this.setState({ horse_name: e.target.value })
  }

  _handleSelectChange = selected_sort_by => {
    if (this.state.sort_by_dropdown !== selected_sort_by) {
      this.setState({
        sort_by_dropdown: selected_sort_by,
        sort_by: selected_sort_by.value,
      })
    }
  }

  _onChangeGeneration = (e, type) => {
    let gen_range = this.state.gen
    let value = parseInt(e.target.value)

    if (type === 'min' && e.target.value === '') {
      this.setState({ gen: [1, gen_range[1]] })
    } else if (type === 'max' && e.target.value === '') {
      this.setState({ gen: [gen_range[0], gen_range[0]] })
    } else if (type === 'min' && value >= 1 && value <= gen_range[1]) {
      this.setState({ gen: [value, gen_range[1]] })
    } else if (type === 'max' && value <= 268 && value >= gen_range[0]) {
      this.setState({ gen: [gen_range[0], value] })
    }
  }

  _onCheckboxChange = (e, type, field) => {
    if (this.state[type].includes(field)) {
      const y = [].concat(this.state[type])
      y.splice(this.state[type].indexOf(field), 1)
      this.setState({ [type]: y })
    } else {
      const y = [].concat(this.state[type])
      y.push(field)
      this.setState({ [type]: y })
    }
  }

  _onOffspringChange = offspring => {
    this.setState({ offspring })
  }

  _onRacesChange = races => {
    this.setState({ races })
  }

  _onWinRateChange = winRate => {
    this.setState({ winRate })
  }

  _onToggleFilterContent = () => {
    this.setState({ filter_extend: !this.state.filter_extend })
  }

  render() {
    const innerStyle = {
      height: this.state.filter_extend ? `${this.state.filter_extend_height}px` : '0px',
    }

    return (
      <div className="search-filter">
        <div className="content-bar">
          <div className="left">
            <div className="search-input">
              {/*
              <input
                className="z-input sm-input search"
                placeholder="Search a racehorse"
                type="text"
                value={this.state.horse_name}
                onChange={this._onChangeHorseName}
              />
              */}

              <DebounceInput
                className="z-input sm-input search"
                placeholder="Search for racehorse ..."
                type="text"
                value={this.state.horse_name}
                debounceTimeout={500}
                onChange={this._onChangeHorseName}
              />
              {this.state.horse_name !== '' && (
                <img
                  className="icn remove-txt"
                  src={IconClose}
                  onClick={() => this.setState({ horse_name: '' })}
                />
              )}
            </div>
            <div className="filters-btn" onClick={this._onToggleFilterContent}>
              <img className="icon icn-filters" src={IconFilter} />
              <div className="primary-text text-capitalize filters">
                <Translate id="filters" />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="overline-text sm text-uppercase">
              <Translate id="sort_by" />:
            </div>
            <div className="select-sort">
              <Select
                value={this.state.sort_by_dropdown}
                onChange={this._handleSelectChange}
                options={options[this.props.filter_type]}
                isSearchable={false}
                placeholder="Select"
              />
            </div>
          </div>
        </div>

        <div className="filter-section" style={innerStyle}>
          <div className={`filter-content ${this.state.filter_extend ? 'open' : ''}`}>
            <div className="f-part-major zed-generation">
              <div className="overline-text sm text-uppercase title">generation</div>
              <div className="inputs">
                <input
                  style={{ opacity: 1 }}
                  className="z-input sm-input generation-min"
                  type="number"
                  min={1}
                  max={268}
                  value={this.state.gen[0]}
                  onChange={e => this._onChangeGeneration(e, 'min')}
                />
                <input
                  style={{ opacity: 1 }}
                  className="z-input sm-input generation-max"
                  type="number"
                  min={1}
                  max={268}
                  value={this.state.gen[1]}
                  onChange={e => this._onChangeGeneration(e, 'max')}
                />
              </div>
              <InputRange
                // classNames="z-range"
                minValue={1}
                maxValue={268}
                onChange={value => this.setState({ gen: [value.min, value.max] })}
                onChangeStart={() => this.setState({ slider_changing: true })}
                onChangeComplete={() => this.setState({ slider_changing: false })}
                value={{ min: this.state.gen[0], max: this.state.gen[1] }}
              />
            </div>
            <div className="f-part">
              <div className="overline-text sm text-uppercase title">bloodline</div>
              <Checkbox
                id="nakamoto"
                checked={this.state.bloodline.includes('Nakamoto')}
                onChange={e => this._onCheckboxChange(e, 'bloodline', 'Nakamoto')}
                label="Nakamoto"
              />
              <Checkbox
                id="szabo"
                checked={this.state.bloodline.includes('Szabo')}
                onChange={e => this._onCheckboxChange(e, 'bloodline', 'Szabo')}
                label="Szabo"
              />
              <Checkbox
                id="finney"
                checked={this.state.bloodline.includes('Finney')}
                onChange={e => this._onCheckboxChange(e, 'bloodline', 'Finney')}
                label="Finney"
              />
              <Checkbox
                id="buterin"
                checked={this.state.bloodline.includes('Buterin')}
                onChange={e => this._onCheckboxChange(e, 'bloodline', 'Buterin')}
                label="Buterin"
              />
            </div>
            <div className="f-part">
              <div className="overline-text sm text-uppercase title">gender</div>
              {this.props.filter_type !== 'stud' && (
                <Checkbox
                  id="filly"
                  checked={this.state.horse_type.includes('Filly')}
                  onChange={e => this._onCheckboxChange(e, 'horse_type', 'Filly')}
                  label="Filly"
                />
              )}
              <Checkbox
                id="colt"
                checked={this.state.horse_type.includes('Colt')}
                onChange={e => this._onCheckboxChange(e, 'horse_type', 'Colt')}
                label="Colt"
              />
              <Checkbox
                id="stallion"
                checked={this.state.horse_type.includes('Stallion')}
                onChange={e => this._onCheckboxChange(e, 'horse_type', 'Stallion')}
                label="Stallion"
              />
              {this.props.filter_type !== 'stud' && (
                <Checkbox
                  id="mare"
                  checked={this.state.horse_type.includes('Mare')}
                  onChange={e => this._onCheckboxChange(e, 'horse_type', 'Mare')}
                  label="Mare"
                />
              )}
            </div>
            <div className="f-part-minor">
              <div className="overline-text sm text-uppercase title">breeds</div>
              <Checkbox
                id="genesis"
                checked={this.state.breed_type.includes('genesis')}
                onChange={e => this._onCheckboxChange(e, 'breed_type', 'genesis')}
                label="Genesis"
              />
              <Checkbox
                id="legendary"
                checked={this.state.breed_type.includes('legendary')}
                onChange={e => this._onCheckboxChange(e, 'breed_type', 'legendary')}
                label="Legendary"
              />
              <Checkbox
                id="exclusive"
                checked={this.state.breed_type.includes('exclusive')}
                onChange={e => this._onCheckboxChange(e, 'breed_type', 'exclusive')}
                label="Exclusive"
              />
            </div>

            <div className="f-part-minor">
              <div className="overline-text sm text-uppercase title">
                <br />
              </div>
              <Checkbox
                id="elite"
                checked={this.state.breed_type.includes('elite')}
                onChange={e => this._onCheckboxChange(e, 'breed_type', 'elite')}
                label="Elite"
              />
              <Checkbox
                id="cross"
                checked={this.state.breed_type.includes('cross')}
                onChange={e => this._onCheckboxChange(e, 'breed_type', 'cross')}
                label="Cross"
              />
              <Checkbox
                id="pacer"
                checked={this.state.breed_type.includes('pacer')}
                onChange={e => this._onCheckboxChange(e, 'breed_type', 'pacer')}
                label="Pacer"
              />
            </div>
            {/*<div className="f-part">
              <div className="overline-text sm text-uppercase title">offspring</div>
              <RadioboxGroup items={offspring} name="offspring" value={this.state.offspring} onUpdate={this._onOffspringChange}/>
            </div>
            <div className="f-part">
              <div className="overline-text sm text-uppercase title">races</div>
              <RadioboxGroup items={races} name="races" value={this.state.races} onUpdate={this._onRacesChange}/>
            </div>
            <div className="f-part">
              <div className="overline-text sm text-uppercase title">win rate</div>
              <RadioboxGroup items={winRate} name="win-rate" value={this.state.winRate} onUpdate={this._onWinRateChange}/>
            </div>
            <div className="f-part">
              <div className="overline-text sm text-uppercase title">coat group</div>
              <Checkbox id="fiery"
                checked={this.state.coatGroup.fiery}
                onChange={(e) => this._onCheckboxChange(e, 'coatGroup', 'fiery')}
                label="fiery"/>
              <Checkbox id="sunny"
                checked={this.state.coatGroup.sunny}
                onChange={(e) => this._onCheckboxChange(e, 'coatGroup', 'sunny')}
                label="sunny & Creamy"/>
              <Checkbox id="earthy"
                checked={this.state.coatGroup.earthy}
                onChange={(e) => this._onCheckboxChange(e, 'coatGroup', 'earthy')}
                label="earthy"/>
              <Checkbox id="wild"
                checked={this.state.coatGroup.wild}
                onChange={(e) => this._onCheckboxChange(e, 'coatGroup', 'wild')}
                label="wild"/>
              <Checkbox id="oceanSky"
                checked={this.state.coatGroup.oceanSky}
                onChange={(e) => this._onCheckboxChange(e, 'coatGroup', 'oceanSky')}
                label="oceanSky"/>
              <Checkbox id="mystical"
                checked={this.state.coatGroup.mystical}
                onChange={(e) => this._onCheckboxChange(e, 'coatGroup', 'mystical')}
                label="mystical"/>
              <Checkbox id="grayscale"
                checked={this.state.coatGroup.grayscale}
                onChange={(e) => this._onCheckboxChange(e, 'coatGroup', 'grayscale')}
                label="grayscale"/>
            </div>
            <div className="f-part">
              <div className="overline-text sm text-uppercase title">coat rarity</div>
              <Checkbox id="veryRare"
                checked={this.state.coatRarity.veryRare}
                onChange={(e) => this._onCheckboxChange(e, 'coatRarity', 'veryRare')}
                label="very rare"/>
              <Checkbox id="rare"
                checked={this.state.coatRarity.rare}
                onChange={(e) => this._onCheckboxChange(e, 'coatRarity', 'rare')}
                label="rare"/>
              <Checkbox id="common"
                checked={this.state.coatRarity.common}
                onChange={(e) => this._onCheckboxChange(e, 'coatRarity', 'common')}
                label="common"/>
            </div>*/}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { ...state.filters }
}

const mapDispatchToProps = dispatch => {
  return {
    applyFilters: filters => {
      return dispatch(actions.filters.applyFilters(filters))
    },
  }
}

export default drizzleConnect(withLocalize(SearchFilterBar), mapStateToProps, mapDispatchToProps)

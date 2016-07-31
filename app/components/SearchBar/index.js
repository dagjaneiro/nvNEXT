import classNames from 'classnames'
import React, { Component, PropTypes } from 'react'
import { MODE_SEARCH, MODE_SELECTED } from './constants'
import { searchInput } from './styles.css'

class SearchBar extends Component {

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.state = { value: props.value }
  }

  handleChange (event) {
    const value = event.target.value
    const newCursorPosition = event.target.selectionStart
    const autoSelect = newCursorPosition > this.state.cursorPosition
    this.handleSelectionChange(event)
    this.props.onPerformSearch(value, autoSelect)
    event.preventDefault()
  }

  handleKeyDown (event) {
    switch (event.key) {
      case 'Enter':
        this.onEnter(this.state.value)
        event.preventDefault()
    }
  }

  handleSelectionChange (event) {
    this.setState({ cursorPosition: event.target.selectionStart })
  }

  handleFocus (event) {
    this.cursorPosition = 0
    this.refs.searchInput.selectionStart = 0
    this.refs.searchInput.selectionEnd = this.state.value.length
  }

  handleClear (event) {
    this.props.onPerformSearch('', false)
  }

  componentWillReceiveProps (nextProps) {
    let searchText
    const currentSearch = nextProps.value
    const selectedTitle = nextProps.selectedTitle

    if (nextProps.autoSelect && nextProps.selectedTitle) {
      if (this.isSelected()) {
        searchText = currentSearch + selectedTitle.substring(currentSearch.length)
      } else {
        searchText = selectedTitle
      }
    } else {
      searchText = currentSearch
    }
    this.setState({ value: searchText, cursorPosition: this.refs.searchInput.selectionStart })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.isSelected()) {
      this.refs.searchInput.selectionStart = this.state.cursorPosition
    } else {
      this.refs.searchInput.selectionStart = this.refs.searchInput.selectionEnd
    }
  }

  isSelected () {
    return this.refs.searchInput === document.activeElement
  }

  onEnter (value) {
    switch (this.props.mode) {
      case MODE_SEARCH:
        this.props.onCreateItem(value)
        break
      case MODE_SELECTED:
        this.props.onSelectItem(value)
        break
    }
  }

  render () {
    const inputStyle = classNames('form-control', searchInput)
    const iconStyle = classNames('input-left', 'icon', {
      'icon-search': this.props.mode === MODE_SEARCH,
      'icon-pencil': this.props.mode === MODE_SELECTED
    })

    return (
      <div className="input-container">
        <span className={iconStyle}></span>
        <input
          className={inputStyle}
          type="text"
          placeholder="Search or Create"
          value={this.state.value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onSelect={this.handleSelectionChange}
          onFocus={this.handleFocus}
          ref="searchInput"
        />
        <span className="input-right icon icon-erase" onClick={this.handleClear}></span>
      </div>
    )
  }
}

SearchBar.propTypes = {
  mode: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selectedId: PropTypes.string,
  selectedTitle: PropTypes.string,
  autoSelect: PropTypes.bool.isRequired,
  onPerformSearch: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onCreateItem: PropTypes.func.isRequired
}

export default SearchBar

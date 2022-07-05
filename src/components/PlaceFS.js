import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ActivePlaceFS from './ActivePlaceFS'

class PlaceFS extends Component {
  // when list item is clicked
  // use it's id to fetch venue information
  showInfo = id => {
    const { showInfoOnMap } = this.props
    showInfoOnMap(id)
  }

  render() {
    const { item, activeItem } = this.props

    const categoryStyle = {
      backgroundImage: `url(${`${item.categories[0].icon.prefix}44${item.categories[0].icon.suffix}`})`,
      height: 44,
      width: 44
    }

    const infoStyle = {
      display: 'none',
      transition: 'display 25s ease-in'
    }

    return (
      <li
        className="places-list-item flex-container"
        role="tab"
        tabIndex="0"
        onClick={() => this.showInfo(item.id)}
        onKeyPress={() => this.showInfo(item.id)}
      >
        <div className="places-list-img" style={categoryStyle} />

        <div className="places-list-info">
          <h2 className="place-name">{item.name}</h2>
          <p className="place-category">{item.categories[0].name}</p>
        </div>

        <div id={item.id} className="info-window">
          <div style={infoStyle}>
            {activeItem.id === item.id && (
              <ActivePlaceFS activeItem={activeItem} />
            )}
          </div>
        </div>
      </li>
    )
  }
}

PlaceFS.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.array
  }).isRequired,
  activeItem: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  showInfoOnMap: PropTypes.func.isRequired
}

export default PlaceFS

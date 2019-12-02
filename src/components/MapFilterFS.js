import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { all, art, sport, garden, museum, food } from '../services/categories'

class MapFilterFS extends Component {
  constructor(props) {
    super(props)
    this.state = { category: '' }
  }

  // set category state to currently selected category
  changeCategory = category => {
    this.setState({
      category
    })
    // fetch places by category
    const { updatePlaces } = this.props
    updatePlaces(category)
  }

  render() {
    const { category } = this.state

    return (
      <div className="category-filter">
        <label>
          Check out fun things to do!
          <select
            name="venues"
            className="category-selection"
            value={category}
            onChange={e => this.changeCategory(e.target.value)}
          >
            <option value={all}>All</option>
            <option value={art}>Arts & Music</option>
            <option value={food}>Cafes & Restaurants</option>
            <option value={garden}>Gardens</option>
            <option value={museum}>Museums</option>
            <option value={sport}>Fun & Sports</option>
          </select>
        </label>
      </div>
    )
  }
}

MapFilterFS.propTypes = {
  updatePlaces: PropTypes.func.isRequired
}

export default MapFilterFS

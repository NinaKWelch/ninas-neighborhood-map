import React, { Component } from 'react'
import { hollandPark, all } from './services/categories'
import Header from './components/Header'
import Content from './components/Content'
import MapContainer from './components/MapContainer'
import Footer from './components/Footer'

// FourSquare API
const foursquare = require('react-foursquare')({
  clientID: 'LEZHUWQW2RE05TR3ZEXPYMXQIGRJLVDA4DELG0RJMZXMMQOP',
  clientSecret: 'ORHDBJZPFD2U3KQJVRJBVFMC0Z1VZ0RD1FFA2SXJ4YDOYVM5'
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [], activeItem: {} }
  }

  // when page loads for the first time
  // fetch places form FourSquare API
  // that correspond to set categories
  componentDidMount() {
    this.updatePlaces(all)
    document.title = 'Holland Park'
  }

  // when list item or marker is clicked
  // and becomes active
  // remove any previuosly active items
  componentDidUpdate() {
    this.onUpdate = prevState => {
      const { items } = this.state
      if (prevState.items !== items) {
        this.setState({ activeItem: {} })
      }
    }
  }

  // Notify errors
  notifyError = message => {
    const errorNotification = document.createElement('p')
    errorNotification.append(message)
    document.getElementById('error-fs').append(errorNotification)
  }

  // fetch places form FourSquare API
  // that correspond to selected categories
  // and are within Holland Park
  updatePlaces = category => {
    const params = {
      ll: hollandPark,
      v: 20180829,
      radius: 310,
      categoryId: category
    }

    foursquare.venues
      .getVenues(params)
      .then(res => {
        this.setState({ items: res.response.venues })
      })
      .catch(() => {
        // Handle loading errors
        this.notifyError('Venues failed to update :(')
      })

    // close any previously open info window
    this.closeAllWindows()
  }

  // fetch venue information form FourSquare API
  // by venue id (required)
  showInfoOnMap = id => {
    const params = {
      venue_id: id
    }

    foursquare.venues
      .getVenue(params)
      .then(res => {
        this.setState({ activeItem: res.response.venue })
      })
      .catch(() => {
        // Handle loading errors
        this.notifyError('Venue not found :(')
      })

    // close previously open info window
    this.closeAllWindows()
    // open the info window of currently selected venue
    this.showInfoWindow(id)
  }

  // when new selection is made
  // close previous info window
  closeAllWindows = () => {
    // loop through the list of venues
    const { items } = this.state
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i]

      // hide any open info windows (only one can be seen at any time)
      const closeWindow = document.getElementById(item.id)
      closeWindow.firstChild.setAttribute(
        'style',
        'display: none; transition: display 2s ease;'
      )
    }
  }

  // find the currently selected venue from the list
  // by matching the selected venue with the listed venue
  // and open the right info window
  showInfoWindow = id => {
    const { items } = this.state
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i]

      if (item.id === id) {
        const window = document.getElementById(id)
        window.firstChild.setAttribute(
          'style',
          'display: initial; transition: display 2s ease;'
        )
      }
    }
  }

  render() {
    const { items, activeItem } = this.state

    return (
      <div className="App">
        <Header />
        <main className="flex-container main-content">
          <Content
            items={items}
            activeItem={activeItem}
            updatePlaces={this.updatePlaces}
            showInfoOnMap={this.showInfoOnMap}
            notifyError={this.notifyError}
          />
          <aside>
            <MapContainer
              items={items}
              activeItem={activeItem}
              showInfoOnMap={this.showInfoOnMap}
              notifyError={this.notifyError}
            />
          </aside>
        </main>

        <Footer />
      </div>
    )
  }
}

export default App

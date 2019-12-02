import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import blueDot from '../media/blueDot.png'
import pinkDot from '../media/pinkDot.png'

class MapContainer extends Component {
  componentDidMount() {
    // error handling for Google Maps
    window.gm_authFailure = () => {
      const { notifyError } = this.props
      notifyError('Google Maps failed to load :(', 'error-gm')
    }
  }

  // when marker is clicked
  // use it's id to fetch venue information
  onMarkerClick = id => {
    const { showInfoOnMap } = this.props
    showInfoOnMap(id)
  }

  render() {
    const { items, activeItem, google } = this.props

    return (
      <div className="map-container">
        <div id="map" role="application">
          <div id="error-gm" />
          <Map
            google={google}
            zoom={16}
            initialCenter={{ lat: 51.501, lng: -0.203 }}
          >
            {items !== undefined
              ? items.map(item => (
                  <Marker
                    key={item.id}
                    onClick={() => this.onMarkerClick(item.id)}
                    id={item.id}
                    name={item.name}
                    category={item.categories[0].name}
                    position={{
                      lat: item.location.lat,
                      lng: item.location.lng
                    }}
                    icon={blueDot}
                  />
                ))
              : ''}
            <Marker
              key={activeItem.id}
              onClick={() => this.onMarkerClick(activeItem.id)}
              id={activeItem.id}
              position={
                activeItem.location
                  ? {
                      lat: activeItem.location.lat,
                      lng: activeItem.location.lng
                    }
                  : {}
              }
              icon={pinkDot}
            />
          </Map>
        </div>
      </div>
    )
  }
}

MapContainer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      categories: PropTypes.array,
      location: PropTypes.object
    })
  ).isRequired,
  activeItem: PropTypes.shape({
    id: PropTypes.string,
    location: PropTypes.object
  }).isRequired,
  google: PropTypes.objectOf(
    PropTypes.shape({
      maps: PropTypes.object
    })
  ).isRequired,
  showInfoOnMap: PropTypes.func.isRequired,
  notifyError: PropTypes.func.isRequired
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBEebNuPToeZlDMcVVggVAxAwc3NTnNB_4'
})(MapContainer)

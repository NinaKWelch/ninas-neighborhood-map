import React from 'react'
import PropTypes from 'prop-types'
import MapFilterFS from './MapFilterFS'
import PlaceFS from './PlaceFS'

const Content = ({
  items,
  activeItem,
  updatePlaces,
  showInfoOnMap,
  notifyError
}) => (
  <section>
    <MapFilterFS updatePlaces={updatePlaces} />
    <div id="error-fs" />
    <ul className="places-list" role="tablist" aria-label="Holland Park Venues">
      {items !== undefined
        ? items.map(item => (
            <PlaceFS
              item={item}
              key={item.id}
              activeItem={activeItem}
              showInfoOnMap={showInfoOnMap}
            />
          ))
        : notifyError('Venues failed to load :(')}
    </ul>
  </section>
)

Content.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  activeItem: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  updatePlaces: PropTypes.func.isRequired,
  showInfoOnMap: PropTypes.func.isRequired,
  notifyError: PropTypes.func.isRequired
}

export default Content

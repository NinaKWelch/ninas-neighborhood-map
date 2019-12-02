import React from 'react'
import PropTypes from 'prop-types'
import image from '../media/defaultImg.jpg'

const ActivePlaceFS = ({ activeItem }) => {
  return (
    <div className="info-window">
      <img
        src={
          activeItem.bestPhoto
            ? `${activeItem.bestPhoto.prefix}cap500${activeItem.bestPhoto.suffix}`
            : image
        }
        alt={activeItem.name}
        className="place-image"
      />
      <p className="place-text">
        <strong>Top Tip:</strong>{' '}
        {activeItem.tips && activeItem.tips.count !== 0
          ? activeItem.tips.groups[0].items[0].text
          : 'No tips at the moment :('}
      </p>
      <p className="place-text">
        <strong>Likes:</strong>{' '}
        {activeItem.likes ? activeItem.likes.count : '0'}
      </p>
    </div>
  )
}

ActivePlaceFS.propTypes = {
  activeItem: PropTypes.shape({
    bestPhoto: PropTypes.object,
    name: PropTypes.string,
    tips: PropTypes.object,
    likes: PropTypes.object
  }).isRequired
}

export default ActivePlaceFS

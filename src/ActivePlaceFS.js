import React from 'react';
import image from './defaultImg.jpg';

class ActivePlaceFS extends React.Component {

	render() {

	  	const { activeItem } = this.props

	    return (
			<div className="info-window">
				<img src={activeItem.bestPhoto ? activeItem.bestPhoto.prefix + 'cap500' + activeItem.bestPhoto.suffix : image} alt={activeItem.name} className="place-image"/>
				<p className="place-text"><strong>Top Tip:</strong> {
					(activeItem.tips && activeItem.tips.count !== 0) ? activeItem.tips.groups[0].items[0].text : 'No tips at the moment : ('}
				</p>
				<p className="place-text"><strong>Likes:</strong> {activeItem.likes ? activeItem.likes.count : '0'}</p>
			</div>
	    );
	}
}

export default ActivePlaceFS;
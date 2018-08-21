import React from 'react';
import image from './Default.jpg';

class ActivePlaceFS extends React.Component {


	render() {

		console.log(this.props.activeItem);

	  	const { activeItem } = this.props

	    return (

			<div className="info-window">
				<div>
					<img src={activeItem.bestPhoto ? activeItem.bestPhoto.prefix + 'cap500' + activeItem.bestPhoto.suffix : image} alt={activeItem.name} className="place-image"/>
					<p className="place-text"><strong>Top Tip:</strong> {
						(activeItem.tips && activeItem.tips.count !== 0) ? activeItem.tips.groups[0].items[0].text : 'No tips at the moment : \('}
					</p>
					<p className="place-text"><strong>Likes:</strong> {activeItem.likes ? activeItem.likes.count : '0'}</p>
				</div>
			</div>
	    );
	}
}

export default ActivePlaceFS;
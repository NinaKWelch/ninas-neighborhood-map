import React from 'react';
import ActivePlaceFS from './ActivePlaceFS';

class PlaceFS extends React.Component {

	//when list item is clicked
	//use it's id to fetch venue information
	showInfo = (event) => {
		event.target = this.props.item.id
		this.props.showInfoOnMap(event.target);
	}

	render() {

	  	const { item, activeItem } = this.props

	  	const categoryStyle = {
	  		backgroundImage: `url(${item.categories[0].icon.prefix + '44' + item.categories[0].icon.suffix})`,
	  		height: 44,
	  		width: 44
	  	}

	    return (
			<li className="places-list-item flex-container"
			    onClick={this.showInfo}>

				<div className="places-list-img" style={categoryStyle}></div>

				<div className="places-list-info">
					<h3 className="place-name">{item.name}</h3>
					<p className="place-category">{item.categories[0].name}</p>
				</div>

				<div id={item.id} className="info-window">
					<div style={{display: 'none', transition: 'display 15s ease-in'}}>
						{activeItem.id === item.id &&
							<ActivePlaceFS activeItem={activeItem}/>
						}
					</div>
				</div>
			</li>
	    );
	}
}

export default PlaceFS;
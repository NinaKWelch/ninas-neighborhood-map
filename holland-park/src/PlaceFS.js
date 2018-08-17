import React from 'react';

class PlaceFS extends React.Component {

	showInfo = (event) => {
		event.target = this.props.item.name
		this.props.showInfoOnMap(event.target)
	}

	 render() {

	  	const { item } = this.props

	  	const style = {
	  		backgroundImage: `url(${item.categories[0].icon.prefix + '44' + item.categories[0].icon.suffix})`,
	  		height: 44,
	  		width: 44
	  	}

	    return (
			<li className="places-list-item flex-container"
			    onClick={this.showInfo}>

				<div className="places-list-img" style={style}></div>

				<div className="places-list-info">
					<h3 className="place-name">{item.name}</h3>
					<p className="place-category">{item.categories[0].name}</p>
				</div>
			</li>
	    );
	 }
}

export default PlaceFS;
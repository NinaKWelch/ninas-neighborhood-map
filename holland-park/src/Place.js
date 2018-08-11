import React, { Component } from 'react';

class Place extends React.Component {


	/*backgroundImage: `url(${})`*/

	 render() {

	  	const { place } = this.props

	    return (
	    	<li className="places-list-item">
				<h3 className="place-name">{place.name + ', '}
				  	<span className="place-category">{place.category}</span>
				</h3>
	    	</li>
	    );
	 }
}

export default Place;
import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {}
	}

	componentWillReceiveProps() {
		this.setState({
	      	showingInfoWindow: false
	    });
	}

	onMarkerClick = (props, marker, e) => {
	    this.setState({
	      	selectedPlace: props,
	      	activeMarker: marker,
	      	showingInfoWindow: true
	    });
	}

	render() {

		const style = {
  			height: 350
		}

		const { items, google } = this.props

	    return (
	    	<div className="map-container">
	    		<div id="map">
					<Map google={google}
		    		     zoom={15}
		    		     style={style}
		    		     initialCenter={{lat: 51.501757,lng: -0.203186}}>

		    			{items.map(item => (
		    				<Marker key={item.id}
		    						onClick={this.onMarkerClick}
		    						name={item.name}
		    						category={item.categories[0].name}
		    						position={{lat: item.location.lat, lng: item.location.lng}}/>
		    			))}

		    			<InfoWindow marker={this.state.activeMarker}
				     		        visible={this.state.showingInfoWindow}>
				     		<div>
				     			<h4>{this.state.selectedPlace.name}</h4>
				     			<p>{this.state.selectedPlace.category}</p>
				     		</div>
				    	</InfoWindow>
					</Map>
	 			</div>
	 		</div>
	    );
	}
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBEebNuPToeZlDMcVVggVAxAwc3NTnNB_4')
})(MapContainer);
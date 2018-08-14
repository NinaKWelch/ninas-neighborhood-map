import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {}
	}

	onMarkerClick = (props, marker, e) => {
	    this.setState({
	      	selectedPlace: props,
	      	activeMarker: marker,
	      	showingInfoWindow: true
	    });
	}

	onMapClick = () => {
	    if (this.state.showingInfoWindow) {
	      this.setState({
	        	showingInfoWindow: false,
	        	activeMarker: null
	      });
	    }
    }

    onInfoWindowClose = () => {
	    this.setState({
	      	showingInfoWindow: false,
	      	activeMarker: null
	    })
	 }

	render() {

		const style = {
  			height: 350
		}

		const { items } = this.props

	    return (
	    	<div className="map-container">
	    		<div id="map">
					<Map google={this.props.google}
						 onClick={this.onMapClick}
		    		     zoom={15}
		    		     style={style}
		    		     initialCenter={{lat: 51.501757,lng: -0.203186}}
		    		>

				     	{items.map(item => (
					     	<Marker onClick={this.onMarkerClick}
					     		    name={item.name}
					     		    category={item.categories[0].name}
					     		    position={{lat: item.location.lat, lng: item.location.lng}}
					     		    key={item.id}
					     	/>
					    ))}

				     	{items.map(item => (
					     	<InfoWindow marker={this.state.activeMarker}
					     		        visible={this.state.showingInfoWindow}
					     		        onClose={this.onInfoWindowClose}
					     		        key={item.id}
					     	>
					     		<div>
					     			<h4>{this.state.selectedPlace.name}</h4>
					     			<p>{this.state.selectedPlace.category}</p>
					     		</div>
					    	</InfoWindow>
					    ))}
					</Map>
	 			</div>
	 		</div>
	    );
	}
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBEebNuPToeZlDMcVVggVAxAwc3NTnNB_4')
})(MapContainer);
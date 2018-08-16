import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
		iconUrl: 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'
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
		const { activeMarker, showingInfoWindow, selectedPlace } = this.state

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
		    						//Animation={google.maps.Animation.DROP}
		    						position={{lat: item.location.lat, lng: item.location.lng}}
		    						icon={this.state.iconUrl}
		    						/>
		    			))}

		    			<InfoWindow marker={activeMarker}
				     		        visible={showingInfoWindow}>
				     		<div>
				     			<h4>{selectedPlace.name}</h4>
				     			<p>{selectedPlace.category}</p>
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
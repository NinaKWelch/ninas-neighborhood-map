import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {}
	}

	/*componentWillReceiveProps() {
		this.setState({
	      	showingInfoWindow: false
	    });
	}*/

	onMarkerClick = (props, marker, event) => {
		event.target = props.name;
	    this.props.showInfoOnMap(event.target);

		/*this.setState({
	      	selectedPlace: props,
	      	activeMarker: marker,
	      	showingInfoWindow: true
	    });*/
	    //console.log('test: ' + event.target);
	}

	render() {

		const style = {
  			height: 350
		}

		const { items, activeItem, google } = this.props
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
		    						icon={'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'}
		    				/>
		    			))}

		    			{activeItem.map(item => (
		    				<Marker key={item.id}
		    						//onClick={this.onActiveMarkerClick}
		    						name={item.name}
		    						category={item.categories[0].name}
		    						position={{lat: item.location.lat, lng: item.location.lng}}
		    						icon={'http://maps.google.com/mapfiles/ms/micons/pink-dot.png'}
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
import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import blueDot from './blueDot.png';
import pinkDot from './pinkDot.png';

class MapContainer extends React.Component {

	//when marker is clicked
	//use it's id to fetch venue information
	onMarkerClick = (props, event) => {
		event.target = props.id;
	    this.props.showInfoOnMap(event.target);
	}

	render() {

		const { items, activeItem, google } = this.props

	    return (
	    	<div className="map-container">
	    		<div id="map" role="application" tabIndex="0">
					<Map google={google}
		    		     zoom={16}
		    		     initialCenter={{lat: 51.501,lng: -0.203}}>

		    			{items.map(item => (
		    				<Marker key={item.id}
		    						onClick={this.onMarkerClick}
		    						id={item.id}
		    						name={item.name}
		    						category={item.categories[0].name}
		    						position={{lat: item.location.lat, lng: item.location.lng}}
		    						icon={blueDot}
		    				/>
		    			))}

		    			<Marker key={activeItem.id}
	    						onClick={this.onMarkerClick}
	    						id={activeItem.id}
	    						position={activeItem.location ? {lat: activeItem.location.lat, lng: activeItem.location.lng} : {}}
	    						icon={pinkDot}
		    			/>
					</Map>
	 			</div>
	 		</div>
	    );
	}
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBEebNuPToeZlDMcVVggVAxAwc3NTnNB_4')
})(MapContainer);
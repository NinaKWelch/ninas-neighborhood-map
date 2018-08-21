import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {

	onMarkerClick = (props, marker, event) => {
		event.target = props.id;
	    this.props.showInfoOnMap(event.target);
	}

	render() {

		const { items, activeItem, google } = this.props

	    return (
	    	<div className="map-container">
	    		<div id="map">
					<Map google={google}
		    		     zoom={15}
		    		     initialCenter={{lat: 51.501757,lng: -0.203186}}>

		    			{items.map(item => (
		    				<Marker key={item.id}
		    						onClick={this.onMarkerClick}
		    						id={item.id}
		    						name={item.name}
		    						category={item.categories[0].name}
		    						position={{lat: item.location.lat, lng: item.location.lng}}
		    						icon={'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'}
		    				/>
		    			))}

		    			<Marker key={activeItem.id}
	    						onClick={this.onMarkerClick}
	    						id={activeItem.id}
	    						position={activeItem.location ? {lat: activeItem.location.lat, lng: activeItem.location.lng} : {}}
	    						icon={'http://maps.google.com/mapfiles/ms/micons/pink-dot.png'}
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
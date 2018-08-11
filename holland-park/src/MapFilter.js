import React, { Component } from 'react';
import Place from './Place'

class MapFilter extends Component {
	state = {
		category: 'all'
	}

	//set category state to currently selected category
  	changeCategory = (category) => {
		this.setState({ category: category })
    }

	render() {
		//variable for filtered places array
		let showingPlaces

		//if category is selected and it is other than `all`
		//then filter the places array by matching categories
		//else show the whole places array
		if (this.state.category && this.state.category !== 'all') {
			showingPlaces = this.props.places.filter(p => p.category === this.state.category)
		} else {
			showingPlaces = this.props.places
		}

	  	const { category } = this.state

	    return (
	    	<div>
	    		<div className="category-filter">
		    		<select
		    		  className="category-selection"
		    		  value={category}
		    		  onChange={(event) => (
		    		  	this.changeCategory(event.target.value)
		    		  )}
		    		>
		    			<option value="all">All</option>
		    			<option value="food">Food</option>
		    			<option value="fun">Fun</option>
		    			<option value="garden">Garden</option>
		    			<option value="museum">Museum</option>
		    			<option value="music">Music</option>
		    		</select>
	    		</div>

				<div className="places-list">
		    		<ul>
		        		{showingPlaces.map(place => (<Place place={place} key={place.id}/>))}
		        	</ul>
	        	</div>
	    	</div>
	    );
	 }
}

export default MapFilter;

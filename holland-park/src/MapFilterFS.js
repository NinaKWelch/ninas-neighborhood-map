import React from 'react';

class MapFilterFS extends React.Component {
	state = {
		category: ''
	}

	//set category state to currently selected category
  	changeCategory = (category) => {
		this.setState({
			category: category
		})
		//fetch places by category
		this.props.updatePlaces(category)
    }

	render() {

		//categories from FourSquare API
		const all = "4bf58dd8d48988d136941735,4bf58dd8d48988d1e2931735,58daa1558bbb0b01f18ec203,4e39a956bd410d7aed40cbc3,4bf58dd8d48988d1e7941735,4bf58dd8d48988d15a941735,4bf58dd8d48988d181941735,4bf58dd8d48988d1c4941735,4bf58dd8d48988d16d941735";
		const art = "4bf58dd8d48988d136941735,4bf58dd8d48988d1e2931735";
		const sport = "58daa1558bbb0b01f18ec203,4e39a956bd410d7aed40cbc3,4bf58dd8d48988d1e7941735";
		const garden = "4bf58dd8d48988d15a941735";
		const museum = "4bf58dd8d48988d181941735";
		const food = "4bf58dd8d48988d1c4941735,4bf58dd8d48988d16d941735";

	  	const { category } = this.state

	    return (
    		<div className="category-filter">
    		 	<label htmlFor="venues-select">Check out fun things to do!</label>
	    			<select id="venues-select"
			    		    name="venues"
			    		    className="category-selection"
			    		    value={category}
			    		    onChange={(event) => (
			    		  		this.changeCategory(event.target.value)
			    		    )}
			    	>
	    			<option value={all}>All</option>
	    			<option value={art}>Arts & Music</option>
	    			<option value={food}>Cafes & Restaurants</option>
	    			<option value={garden}>Gardens</option>
	    			<option value={museum}>Museums</option>
	    			<option value={sport}>Fun & Sports</option>
	    		</select>
    		</div>
	    );
	}
}

export default MapFilterFS;

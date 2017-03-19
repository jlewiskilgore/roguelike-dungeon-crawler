import React, { Component } from 'react';

class MapSpace extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(this.props.spaceType == "player") {
			return (
				<div className="map-cell">
				  <p>X</p>
				</div>
			);
		}
		else if(this.props.spaceType == "health") {
			return (
				<div className="map-cell">
				  <p>H</p>
				</div>
			);
		}
		else if(this.props.spaceType == "enemy") {
			return(
				<div className="map-cell">
				  <p>E</p>
				</div>
			);
		}
		else {
			return (
				<div className="map-cell">
				  <p>-</p>
				</div>
			);
		}
	}
}

export default MapSpace;

import React, { Component } from 'react';

class MapSpace extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(this.props.spaceType == "player") {
			return (
				<div className="map-cell player">
				  <p>X</p>
				</div>
			);
		}
		else if(this.props.spaceType == "hidden") {
			return (
				<div className="map-cell hidden">
				  <p>*</p>
				</div>
			);
		}
		else if(this.props.spaceType == "boss") {
			return (
				<div className="map-cell boss">
				  <p>B</p>
				</div>
			);
		}
		else if(this.props.spaceType == "health") {
			return (
				<div className="map-cell health">
				  <p>H</p>
				</div>
			);
		}
		else if(this.props.spaceType == "weapon") {
			return (
				<div className="map-cell weapon">
				  <p>W</p>
				</div>
			);
		}
		else if(this.props.spaceType == "enemy") {
			return(
				<div className="map-cell enemy">
				  <p>E</p>
				</div>
			);
		}
		else {
			return (
				<div className="map-cell empty">
				  <p>-</p>
				</div>
			);
		}
	}
}

export default MapSpace;

import React, { Component } from 'react';

class HealthMeter extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h3>Player's Health: {this.props.playerHealth}</h3>
		);
	}
}

export default HealthMeter;
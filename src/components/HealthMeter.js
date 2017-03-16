import React, { Component } from 'react';

class HealthMeter extends Component {
	constructor(props) {
		super(props);

		this.state = { playerHealth: 100 };
	}

	render() {
		return (
			<h3>Player's Health: {this.state.playerHealth}</h3>
		);
	}
}

export default HealthMeter;
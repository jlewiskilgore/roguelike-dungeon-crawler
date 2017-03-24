import React, { Component } from 'react';

class StatMeter extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h3>Player's {this.props.statLabel}: {this.props.playerStat}</h3>
		);
	}
}

export default StatMeter;

import React, { Component } from 'react';

class StatMeter extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<p>Player's {this.props.statLabel}: {this.props.playerStat}</p>
		);
	}
}

export default StatMeter;

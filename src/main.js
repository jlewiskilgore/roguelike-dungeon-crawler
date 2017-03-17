import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DungeonMap from './components/DungeonMap';
import HealthMeter from './components/HealthMeter';
import './App.sass';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { playerHealth: 100 };

		this.updatePlayerHealth = this.updatePlayerHealth.bind(this);
	}

	updatePlayerHealth(healthModification) {
		var currHealth = this.state.playerHealth;
		var newHealth = currHealth + healthModification;
		console.log("newhealth: " + newHealth);

		this.setState({ playerHealth: newHealth });
	}

	render() {
		return (
		  <div id="dungeon-main-component">
		  	<HealthMeter playerHealth={this.state.playerHealth} />
		    <DungeonMap numMapRows={20} numMapCols={20} updatePlayerHealth={this.updatePlayerHealth} />
		  </div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('roguelike-dungeon-crawler'));

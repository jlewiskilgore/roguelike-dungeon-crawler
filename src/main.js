import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DungeonMap from './components/DungeonMap';
import HealthMeter from './components/HealthMeter';
import './App.sass';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { playerHealth: 10, isPlayerAlive: true };

		this.updatePlayerHealth = this.updatePlayerHealth.bind(this);
	}

	updatePlayerHealth(healthModification) {
		var currHealth = this.state.playerHealth;
		var newHealth = currHealth + healthModification;
		console.log("newhealth: " + newHealth);

		if(newHealth <= 0) {
			console.log("player is dead...");
			this.setState({ isPlayerAlive: false });
		}
		else {
			this.setState({ playerHealth: newHealth });
		}
	}

	render() {
		var playerIsAlive = this.state.isPlayerAlive;

		if(playerIsAlive) {
			return (
			  <div id="dungeon-main-component">
			  	<HealthMeter playerHealth={this.state.playerHealth} />
			    <DungeonMap numMapRows={20} numMapCols={20} updatePlayerHealth={this.updatePlayerHealth} />
			  </div>
			);
		}
		else {
			return (
			  <div id="dungeon-main-component">
				<h1>PLAYER IS DEAD!</h1>
				<br/>
				<h1>GAME OVER!!!!</h1>
			  </div>
			);
		}
	}
}

ReactDOM.render(<App />, document.getElementById('roguelike-dungeon-crawler'));

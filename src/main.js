import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DungeonMap from './components/DungeonMap';
import StatMeter from './components/StatMeter';
import './App.sass';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { isBossDead: 0, playerHealth: 10, playerXp: 0, playerLevel: 1, isPlayerAlive: true };

		this.updatePlayerHealth = this.updatePlayerHealth.bind(this);
		this.updatePlayerXp = this.updatePlayerXp.bind(this);
		this.updateGameStatus = this.updateGameStatus.bind(this);
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

	updatePlayerXp(xpModification) {
		var currentPlayerXp = this.state.playerXp;
		var currentPlayerLevel = this.state.playerLevel;
		var xpForNextLevel = (currentPlayerLevel) * 10;

		// Add new xp to player's xp
		currentPlayerXp = currentPlayerXp + xpModification;

		// Check if player goes up a level
		if(currentPlayerXp >= xpForNextLevel) {
			this.setState({ playerLevel: currentPlayerLevel + 1, playerXp: currentPlayerXp });
		}
		else {
			this.setState({ playerXp: currentPlayerXp });
		}
	}

	updateGameStatus(isGameOver) {
		if(isGameOver) {
			this.setState({ isBossDead: 1 });
		}
	}

	render() {
		var playerIsAlive = this.state.isPlayerAlive;
		var isBossDead = this.state.isBossDead;

		if(isBossDead) {
			return(
			  <div id="dungeon-main-component">
				<h1>THE BOSS IS DEAD!!!</h1>
				<br/>
				<h1>YOU WIN!</h1>
			  </div>
			);
		}
		else if(playerIsAlive) {
			return (
			  <div id="dungeon-main-component">
			    <div id="main-health-meter">
			  	  <StatMeter statLabel={"Health"} playerStat={this.state.playerHealth} />
			  	  <StatMeter statLabel={"XP"} playerStat={this.state.playerXp} />
			  	  <StatMeter statLabel={"Level"} playerStat={this.state.playerLevel} />
			  	</div>
			  	<div id="dungeon-map">
			      <DungeonMap 
			      	numMapRows={20} 
			      	numMapCols={60} 
			      	numHealthItems={3}
			      	numEnemies={5}
			      	playerLevel={this.state.playerLevel}
			      	updatePlayerHealth={this.updatePlayerHealth}
			      	updatePlayerXp={this.updatePlayerXp}
			      	updateGameStatus={this.updateGameStatus} />
			    </div>
			  </div>
			);
		}
		else if(!playerIsAlive) {
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

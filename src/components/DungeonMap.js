import React, { Component } from 'react';
import MapSpace from './MapSpace';

class DungeonMap extends Component {
	constructor(props) {
		super(props);

		// Random Starting positions for health items.
		var mapStartingHealthItems = [];
		// Random Starting positions for enenemies
		var mapStartingEnemies = [];
		// Set random starting position for player
		var mapPlayerStartingPosition = [];

		var randomStartingRow;
		var randomStartingCol;
		var newHealthItem;
		var newEnemy;

		while(mapPlayerStartingPosition.length == 0) {
			randomStartingRow = Math.floor(Math.random() * (this.props.numMapRows));
			randomStartingCol = Math.floor(Math.random() * (this.props.numMapCols));

			if(mapStartingHealthItems.length < this.props.numHealthItems) {
				newHealthItem = [];
				newHealthItem.push(randomStartingCol);
				newHealthItem.push(randomStartingRow);
				mapStartingHealthItems.push(newHealthItem);
			}
			/*
			ENEMY:
			index 0: starting column location
			index 1: starting row location
			index 2: enemy's health
			index 3: enemy's attack (how much damage is done with successful attack)
			*/
			else if(mapStartingEnemies.length < this.props.numEnemies) {
				newEnemy = [];
				newEnemy.push(randomStartingCol);
				newEnemy.push(randomStartingRow);
				newEnemy.push(5); // Enemy's health
				newEnemy.push(2); // Enemy's attack
				mapStartingEnemies.push(newEnemy);
			}
			else {
				mapPlayerStartingPosition = [randomStartingCol, randomStartingRow];
			}
		}

		console.log(mapStartingEnemies);

		this.state = { 
			playerCurrentLocation: mapPlayerStartingPosition, 
			playerAttack: 3, 
			healthItemLocations: mapStartingHealthItems, 
			enemyList: mapStartingEnemies,
			enemies: mapStartingEnemies
		};
	
		this.handlePlayerMove = this.handlePlayerMove.bind(this);
		this.updatePlayerPosition = this.updatePlayerPosition.bind(this);
	}

	componentDidMount() {
		window.onkeydown = this.handlePlayerMove;
	}

	handlePlayerMove(event) {
		event.preventDefault();

		var buttonPressed = event.keyCode;

		switch(buttonPressed) {
			case 37:
				this.updatePlayerPosition(-1, 0);
				break;
			case 38:
				this.updatePlayerPosition(0, -1);
				break;
			case 39:
				this.updatePlayerPosition(1, 0);
				break;
			case 40:
				this.updatePlayerPosition(0, 1);
				break;
		}
	}

	updatePlayerPosition(moveX, moveY) {
		var currPlayerCol = this.state.playerCurrentLocation[0];
		var currPlayerRow = this.state.playerCurrentLocation[1];
		var newPlayerCol;
		var newPlayerRow;

		var isSpaceBlocked = 0;

		// Update player's x-coordinate (column - left/right) position
		if(moveX < 0 && currPlayerCol !== 0) {
			newPlayerCol = currPlayerCol + moveX;
		}
		else if(moveX > 0 && currPlayerCol !== (this.props.numMapCols-1)) {
			newPlayerCol = currPlayerCol + moveX;
		}
		else {
			newPlayerCol = currPlayerCol;
		}

		// Update player's y-coordinate (row - up/down) position
		if(moveY < 0 && currPlayerRow !== 0) {
			newPlayerRow = currPlayerRow + moveY;
		}
		else if(moveY > 0 && currPlayerRow !== (this.props.numMapRows-1)) {
			newPlayerRow = currPlayerRow + moveY;
		}
		else {
			newPlayerRow = currPlayerRow;
		}

		// Check if player moved to health item
		var foundHealth = this.isHealthItemFound(newPlayerCol, newPlayerRow);
		if(foundHealth) {
			this.props.updatePlayerHealth(foundHealth);
		}

		// Check if enemy was found
		var foundEnemy = this.isEnemyFound(newPlayerCol, newPlayerRow);
		if(foundEnemy >= 0) {
			console.log("Found enemy...");
			// Fight enemy at the space player is trying to move to
			isSpaceBlocked = this.attackEnemy(foundEnemy);
		}

		if(!isSpaceBlocked) {
			this.setState({ playerCurrentLocation: [newPlayerCol, newPlayerRow] });
		}
	}

	isHealthItemFound(spaceCol, spaceRow) {
		var healthItem;
		var healthItemsOnMap = this.state.healthItemLocations;
		var healthItemCol;
		var healthItemRow;

		for(var i=0; i<healthItemsOnMap.length; i++) {
			var healthItem = healthItemsOnMap[i];

			if(healthItem !== []) {
				var healthItemCol = healthItem[0];
				var healthItemRow = healthItem[1];
			}

			if(spaceCol == healthItemCol && spaceRow == healthItemRow) {
				healthItemsOnMap.splice(i, 1);
				this.setState({ healthItemLocations: healthItemsOnMap });
				return 10; // Health item increases player's health by 10
			}
		}

		return 0; // no health item found
	}

	isEnemyFound(spaceCol, spaceRow) {
		var enemy;
		var enemiesOnMap = this.state.enemyList;
		var enemyCol;
		var enemyRow;

		for(var i=0; i<enemiesOnMap.length; i++) {
			var enemy = enemiesOnMap[i];

			if(enemy !== []) {
				var enemyCol = enemy[0];
				var enemyRow = enemy[1];
			}

			if(spaceCol == enemyCol && spaceRow == enemyRow) {
				return i; // Enemy found, return index of enemy
			}
		}

		return -1; // no health item found
	}

	attackEnemy(foundEnemy) {
		// Get random number
		var attackWinner = Math.random();

		var opposingEnemy = this.state.enemyList[foundEnemy];

		// If number is greater than 0.5, Player wins round
		if(attackWinner > 0.5) {
			var playerAttack = this.state.playerAttack;
			var enemyHealth = opposingEnemy[2];

			var updatedEnemyList = this.state.enemyList;
			var enemyNewHealth = enemyHealth - playerAttack;
			
			if(enemyNewHealth > 0) {
				opposingEnemy[2] = enemyNewHealth;
				updatedEnemyList[foundEnemy] = opposingEnemy;

				this.setState({ enemyList: updatedEnemyList });

				return 1; // return 1 when enemy is still alive and blocking space
			}
			else {
				updatedEnemyList.splice(foundEnemy, 1);
				this.setState({ enemyList: updatedEnemyList });
				return 0; // return 0 when enemy is dead
			}
		}
		// Else enemy wins round
		else {
			var enemyAttack = opposingEnemy[3];
			var damageToPlayer = -1 * enemyAttack;
			this.props.updatePlayerHealth(damageToPlayer);
			return 1; // enemy is still alive
		}
	}

	includesItem(row, col, stateList) {
		var healthItems = stateList;
		var currentItem;

		for(var i=0; i < healthItems.length; i++) {
			currentItem = healthItems[i];

			if(currentItem[0] == col && currentItem[1] == row) {
				return 1;
			}
		}

		return 0; // None found
	}

	render() {
		var playerCurrentCol = this.state.playerCurrentLocation[0];
		var playerCurrentRow = this.state.playerCurrentLocation[1];

		// For testing health item
		var healthItem;
		var healthItemCurrentCol;
		var healthItemCurrentRow;
		var healthItemIndex;
		var mapHealthItems = this.state.healthItemLocations;
		var healthItemFound;

		// For testing enemy location
		var enemyCurrentCol = this.state.enemyList[0];
		var enemyCurrentRow = this.state.enemyList[1];

		var mapRow;
		var dungeonMap = [];

		var numRows = this.props.numMapRows;
		var numCols = this.props.numMapCols;

		for(var i=0; i<numRows; i++) {
			mapRow = [];
			for(var j=0; j<numCols; j++) {
				if(i == playerCurrentRow && j == playerCurrentCol) {
					mapRow.push(<MapSpace spaceType="player" />);
				}
				//else if(i == healthItemCurrentRow && j == healthItemCurrentCol) {
				else if(this.includesItem(i, j, this.state.healthItemLocations)) {
					mapRow.push(<MapSpace spaceType="health" />);
				}
				else if(this.includesItem(i, j, this.state.enemyList)) {
					mapRow.push(<MapSpace spaceType="enemy" />);
				}
				else {
					mapRow.push(<MapSpace spaceType="empty" />);
				}
			}
			dungeonMap.push(<div className="map-row">{mapRow}</div>);
		}

		return (
			<div id="dungeon-map-table">
			  {dungeonMap}
			</div>
		);
	}
}

export default DungeonMap;

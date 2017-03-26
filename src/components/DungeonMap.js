import React, { Component } from 'react';
import MapSpace from './MapSpace';

class DungeonMap extends Component {
	constructor(props) {
		super(props);

		// Random Starting positions for health items
		var mapStartingHealthItems = [];
		// Random Starting positions for weapon items
		var mapStartingWeaponItems = [];
		// Random Starting positions for enenemies
		var mapStartingEnemies = [];
		// Set random starting position for boss enemy
		var mapStartingBoss = [];
		// Set random starting position for player
		var mapPlayerStartingPosition = [];

		var randomStartingRow;
		var randomStartingCol;
		var newHealthItem;
		var newWeaponItem;
		var newEnemy;
		var newBossEnemy;

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
			/*
			BOSS ENEMY:
			index 0: starting column location
			index 1: starting row location
			index 2: enemy's health
			index 3: enemy's attack
			*/
			else if(mapStartingBoss.length == 0) {
				newBossEnemy = [];
				newBossEnemy.push(randomStartingCol);
				newBossEnemy.push(randomStartingRow);
				newBossEnemy.push(40); // Boss' Health
				newBossEnemy.push(5); // Boss' Attack
				mapStartingBoss.push(newBossEnemy);
			}
			//Weapon Upgrades
			else if(mapStartingWeaponItems.length  < 2) {
				newWeaponItem = [];
				newWeaponItem.push(randomStartingCol);
				newWeaponItem.push(randomStartingRow);

				if(mapStartingWeaponItems.length == 0) {
					newWeaponItem.push("Steel");
				}
				else {
					newWeaponItem.push("Sharpened");
				}
				mapStartingWeaponItems.push(newWeaponItem);
			}
			else {
				mapPlayerStartingPosition = [randomStartingCol, randomStartingRow];
			}
		}

		this.state = { 
			playerCurrentLocation: mapPlayerStartingPosition, 
			playerAttack: 3,
			playerXP: 0, 
			healthItemLocations: mapStartingHealthItems,
			weaponItemLocations: mapStartingWeaponItems,
			enemyList: mapStartingEnemies,
			enemies: mapStartingEnemies,
			bossEnemy: mapStartingBoss
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
		var foundHealth = this.isItemFound(newPlayerCol, newPlayerRow, 
			this.state.healthItemLocations, "health");
		if(foundHealth) {
			this.props.updatePlayerHealth(foundHealth);
		}

		// Check if player moved to a weapon item
		var foundWeapon = this.isItemFound(newPlayerCol, newPlayerRow,
			this.state.weaponItemLocations, "weapon");
		if(foundWeapon) {
			this.props.updatePlayerWeapon(foundWeapon);
		}

		// Check if enemy was found
		var foundEnemy = this.isEnemyFound(newPlayerCol, newPlayerRow);
		if(foundEnemy === "boss") {
			isSpaceBlocked = this.attackEnemy(foundEnemy);
		}
		else if(foundEnemy >= 0) {
			// Fight enemy at the space player is trying to move to
			isSpaceBlocked = this.attackEnemy(foundEnemy);
		}

		if(!isSpaceBlocked) {
			this.setState({ playerCurrentLocation: [newPlayerCol, newPlayerRow] });
		}
	}

	isItemFound(spaceCol, spaceRow, itemList, itemListType) {
		var item;
		var foundItemType;
		var itemsOnMap = itemList;
		var itemCol;
		var itemRow;

		for(var i=0; i<itemsOnMap.length; i++) {
			var item = itemsOnMap[i];

			if(item !== []) {
				var itemCol = item[0];
				var itemRow = item[1];
			}

			if(spaceCol == itemCol && spaceRow == itemRow) {
				if(itemListType == "health") {
					itemsOnMap.splice(i, 1);
					this.setState({ healthItemLocations: itemsOnMap });
					return 10; // Health item increases player's health by 10
				}
				else if(itemListType == "weapon") {
					// Weapon type stored in index 2
					foundItemType = itemsOnMap[i][2];
					console.log(foundItemType);
					itemsOnMap.splice(i, 1);
					this.setState({ weaponItemLocations: itemsOnMap})
					return foundItemType;
				}
			}
		}

		return 0; // no health item found
	}

	isEnemyFound(spaceCol, spaceRow) {
		var enemy;
		var enemiesOnMap = this.state.enemyList;
		var enemyCol;
		var enemyRow;

		var bossEnemy = this.state.bossEnemy;

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

		// Check if found Boss Enemy
		if(bossEnemy.length > 0 && spaceCol == bossEnemy[0][0] && spaceRow == bossEnemy[0][1]) {
			return "boss";
		}

		return -1; // no enemy found
	}

	attackEnemy(foundEnemy) {
		// Get random number
		var attackWinner = Math.random();

		if(foundEnemy === 'boss') {
			var opposingEnemy = this.state.bossEnemy[0];
		}
		else {
			var opposingEnemy = this.state.enemyList[foundEnemy];
		}

		// If number is greater than 0.5, Player wins round
		if(attackWinner > 0.5) {
			var playerAttack = this.state.playerAttack;
			var playerAttackBonus = (this.props.playerLevel - 1) *
									this.props.playerLevelAttackBonus;
			playerAttack = playerAttack + playerAttackBonus;

			var enemyHealth = opposingEnemy[2];
			var enemyNewHealth = enemyHealth - playerAttack;

			if(foundEnemy !== 'boss') {
				var updatedEnemyList = this.state.enemyList;
				if(enemyNewHealth > 0) {
					opposingEnemy[2] = enemyNewHealth;
					updatedEnemyList[foundEnemy] = opposingEnemy;

					this.setState({ enemyList: updatedEnemyList });

					return 1; // return 1 when enemy is still alive and blocking space
				}
				else {
					updatedEnemyList.splice(foundEnemy, 1);
					this.setState({ enemyList: updatedEnemyList });

					// FOR TESTING UPDATING PLAYER XP/LEVEL
					this.props.updatePlayerXp(9); // player's xp goes up by 9

					return 0; // return 0 when enemy is dead
				}
			}
			else if(foundEnemy === 'boss') {
				var updatedBossEnemy = this.state.bossEnemy;
				if(enemyNewHealth > 0) {
					opposingEnemy[2] = enemyNewHealth;
					updatedBossEnemy[0] = opposingEnemy;

					this.setState({ bossEnemy: updatedBossEnemy });

					return 1; // return 1 when boss is still alive and blocking space
				}
				else {
					this.setState({ bossEnemy: [] });

					this.props.updateGameStatus(1); // Boss is dead, Game is over

					return -1; // return 0 when boss is dead
				}
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
		var itemList = stateList;
		var currentItem;

		for(var i=0; i < itemList.length; i++) {
			currentItem = itemList[i];

			if(currentItem[0] == col && currentItem[1] == row) {
				return 1;
			}
		}
		return 0; // None found
	}

	render() {
		var playerCurrentCol = this.state.playerCurrentLocation[0];
		var playerCurrentRow = this.state.playerCurrentLocation[1];

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
				// Show actual space type
				else if((i <= (playerCurrentRow+3) && i >= (playerCurrentRow-3)) &&
						(j <= (playerCurrentCol+3) && j >= (playerCurrentCol-3))) {
					
					if(this.includesItem(i, j, this.state.bossEnemy)) {
						mapRow.push(<MapSpace spaceType="boss" />);
					}
					else if(this.includesItem(i, j, this.state.healthItemLocations)) {
						mapRow.push(<MapSpace spaceType="health" />);
					}
					else if(this.includesItem(i, j, this.state.weaponItemLocations)) {
						mapRow.push(<MapSpace spaceType="weapon" />);
					}
					else if(this.includesItem(i, j, this.state.enemyList)) {
						mapRow.push(<MapSpace spaceType="enemy" />);
					}
					else {
						mapRow.push(<MapSpace spaceType="empty" />);
					}
				}
				// Show hidden space type
				else {
					mapRow.push(<MapSpace spaceType="hidden" />);
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

import React, { Component } from 'react';
import MapSpace from './MapSpace';

class DungeonMap extends Component {
	constructor(props) {
		super(props);

		// Set random starting position for player
		var playerStartingRow = Math.floor(Math.random() * (this.props.numMapRows));
		var playerStartingCol = Math.floor(Math.random() * (this.props.numMapCols));

		this.state = { playerCurrentLocation: [playerStartingCol, playerStartingRow] };
	
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

				// FOR TESTING ONLY:
				// Pressing left button will lower player health by 1
				// this.props.updatePlayerHealth(-1.5);
				
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

		this.setState({ playerCurrentLocation: [newPlayerCol, newPlayerRow] });
	}

	render() {
		console.log(this.state.playerCurrentLocation);

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

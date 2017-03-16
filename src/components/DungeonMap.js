import React, { Component } from 'react';

class DungeonMap extends Component {
	constructor(props) {
		super(props);

		// For testing: Replace these with argument values
		var NUM_OF_MAP_COLUMNS = 20;
		var NUM_OF_MAP_ROWS = 20;

		// Set random starting position for player
		var playerStartingRow = Math.floor(Math.random() * (NUM_OF_MAP_ROWS));
		var playerStartingCol = Math.floor(Math.random() * (NUM_OF_MAP_COLUMNS));

		this.state = { playerCurrentLocation: [playerStartingRow, playerStartingCol] };
	
		this.handlePlayerMove = this.handlePlayerMove.bind(this);
	}

	componentDidMount() {
		window.onkeydown = this.handlePlayerMove;
	}

	handlePlayerMove(event) {
		event.preventDefault();

		var buttonPressed = event.keyCode;

		switch(buttonPressed) {
			case 37:
				console.log("player moves left");
				break;
			case 38:
				console.log("player moves up");
				break;
			case 39:
				console.log("player moves right");
				break;
			case 40:
				console.log("player moves down");
				break;
		}
		

	}

	render() {
		console.log(this.state.playerCurrentLocation);

		var playerCurrentRow = this.state.playerCurrentLocation[0];
		var playerCurrentCol = this.state.playerCurrentLocation[1];

		var mapRow;
		var dungeonMap = [];

		var numRows = 20;
		var numCols = 20;

		for(var i=0; i<numCols; i++) {
			mapRow = [];
			for(var j=0; j<numRows; j++) {
				if(i == playerCurrentCol && j == playerCurrentRow) {
					mapRow.push("	X	");
				}
				else {
					mapRow.push("    -    ");
				}
			}
			dungeonMap.push(<div className="map-row">{mapRow}</div>);
		}

		return (
			<div id="dungeon-map">
			  {dungeonMap}
			</div>
		);
	}
}

export default DungeonMap;

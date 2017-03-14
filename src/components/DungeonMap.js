import React, { Component } from 'react';

class DungeonMap extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var mapRow;
		var dungeonMap = [];

		var numRows = 20;
		var numCols = 20;

		for(var i=0; i<numCols; i++) {
			mapRow = [];
			for(var j=0; j<numRows; j++) {
				mapRow.push("    0    ");
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

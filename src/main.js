import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DungeonMap from './components/DungeonMap';
import HealthMeter from './components/HealthMeter';
import './App.sass';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		  <div id="dungeon-main-component">
		  	<HealthMeter />
		    <DungeonMap numMapRows={20} numMapCols={20}/>
		  </div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('roguelike-dungeon-crawler'));

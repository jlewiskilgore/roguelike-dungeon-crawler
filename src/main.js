import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DungeonMap from './components/DungeonMap';
import './App.sass';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		  <div>
		    <DungeonMap />
		  </div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('roguelike-dungeon-crawler'));

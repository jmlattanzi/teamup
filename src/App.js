import React, { Component } from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import routes from './routes.js';
import logo from './logo.svg'
import './App.css'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Router>
					{routes}
				</Router>
			</div>
		)
	}
}

export default App

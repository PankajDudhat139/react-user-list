import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Router from './router';
import Header from './components/Header';
import './assets/css/style.scss'

function App() {
	return (
		<div className="container-fluid">
			<Header />
			<Router />
		</div>
	);
}

export default App;

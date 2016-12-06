// IMPORT REACT:
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

// IMPORT CSS:
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

// IMPORT COMPONENT:
import NavBar from './navigation'

// COMPONENT:
const Artist = () => (
	<div>
		<NavBar />
		<h1>Hey I'm Artist</h1>
	</div>
)

const App = () => (
	<div>
		<NavBar />
		<h1>Hey</h1>
	</div>
)

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="/artist" component={Artist}></Route>
		</Route>
	</Router>, document.getElementById('app'));
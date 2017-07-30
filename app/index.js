var React = require('react');
var ReactDOM = require('react-dom');
import App from './components/App.js';

$(document).ready(function(){

	ReactDOM.render(<App />, document.getElementById("app"));
	$("body").css("backgroundColor", "black");
	
});


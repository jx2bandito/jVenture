import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

 
$(document).ready(function(){

	$("body").css("backgroundColor", "block");
 
	ReactDOM.render(<App />, document.getElementById("app"));

});


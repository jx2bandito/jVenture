import React from 'react';

export default class Opening extends React.Component{

	constructor(props){
		super(props);
		this.state = { 
		title: "BABABBA"
			};
			
	}
	
	
		
	render(){
	
	const style = {
		display: "block",
		textAlign: "center"
	}
	const sWidth = 200;
	const sHeight = 18;
	const startStyle = {
		position: "absolute",
		left: "calc(50% - " + sWidth/2 + "px)",
		width: sWidth,
		height: sHeight,
		top: "calc(50% - " + sHeight/2 + "px)",
	}
	
		return (
		<div>
		<h2 onClick={this.toggleClick} style={style}>
			{this.state.title}
		</h2>
		
		<p onClick={this.props.onClick} style={Object.assign({}, style, startStyle)}>
		Click to Start</p>
		
		
		
		</div>);
		}

}
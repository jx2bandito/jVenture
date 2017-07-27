import React from 'react';
import Opening from "./Opening.js";

export default class Hello extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			started: false
		}
		
		this.handleClick = this.handleClick.bind(this);
	
	} 


	handleClick(){
		this.setState({started: true});
		
	}
	
	componentWillUpdate(){
		TweenMax.to(".wrapper", 1, {
		backgroundColor: "red",
		height: 0
	});
	 
	}
	
	render(){
	
	const hStyle = {
		color: "black",
		textAlign: "center"
	}
	
	
	const bgStyle = {
		backgroundColor: "cyan",
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0
	}
	
	
		
		if(this.state.started){
			return <div style={bgStyle}>Placeholder scene</div>;
		}
		else{
			return (<div className="wrapper" style={bgStyle}>
			<h1 style={hStyle}>Joel's Adventure</h1>
			<Opening onClick={this.handleClick}/>
		</div>);
		}
	}
}

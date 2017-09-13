import React from 'react';
import clickIcon from "../images/clickIcon.png";

const msgBox = {
	position: "absolute",
	width: "80vw",
	height: "7.5vw",
	padding: "auto",
	left: "calc(50% - 40vw)",
	bottom: 25,
	fontSize: "2.5vw",
	border: "1px solid black",
	color: "black",
	borderRadius: "5px",
	textAlign: "center",
	background: "rgba(200, 200, 230, .7)"
}

const dialStyle = {
	position: "relative",
	display: "inline-block",
	top: "calc(50% - 1.25vw)",
	width: "95%",
	margin: "auto 20px",
	textAlign: "left"
}
 
 const clickIconStyle = {
	width: "2vw",
	height: "2vw",
	position: "absolute",
	right: "1vw",
	bottom: "1vw",
	zIndex: "2"
 }
 
export default class Dialogue extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dialogue: "",
			updating: false,
			showClick: {
				visibility: "hidden"
			}
		}
		
		this.handleClick = this.handleClick.bind(this);
		this.typeDialogue = this.typeDialogue.bind(this);
	}

	typeDialogue(fullDialogue){
		
		var dialogue = this.state.dialogue;
		var splitDialogue = fullDialogue.split("");
		var i = 0;
		var delay = 25;
		var listIntervals = [];
		
		var loopDialogue = () => {	
			console.log(this.state.showClick);
			this.state.updating = true;
			if(i == splitDialogue.length){
				var x = 0;
				listIntervals.push(loopInterval);
				while(listIntervals.length){
					clearInterval(listIntervals[x]);
					listIntervals.shift();
					x++;
				}
				this.state.updating = false;
				this.state.showClick = {
					visibility: "initial"
				};
				console.log(this.state.showClick);
				return false;
			}
			else{
				let currentChar = splitDialogue[i];
				
				if(i == splitDialogue.length - 1){
					this.state.showClick = {visibility: "initial"}
				}
				var pauseCondition  = /[\.\?\,\!]/.test(currentChar);
				if (pauseCondition){
					clearInterval(loopInterval);
					listIntervals.push(loopInterval);
				loopInterval = setInterval(loopDialogue, delay * 15);
				}
				else if(!pauseCondition){
					clearInterval(loopInterval);
					listIntervals.push(loopInterval);
					loopInterval = setInterval(loopDialogue, delay);
				}
				if(/`/.test(splitDialogue[i+1])){
					clearInterval(loopInterval);
					listIntervals.push(loopInterval);
				loopInterval = setInterval(loopDialogue, delay * 30);
				}
				
				if(!/`/.test(currentChar)){
					this.setState({
						dialogue: dialogue += currentChar
					});
				}
				if(/`/.test(currentChar)){
					this.setState({dialogue: dialogue = ""});
				}
				i++;
			}
				
		}
		
		var loopInterval = setInterval(loopDialogue, delay);
		listIntervals.push(loopInterval);
		
	}
	
	handleClick(){
		if(this.state.updating){
			return;
		}
		this.props.onClick();
	}
	
	render(){
		return(
			<div style={msgBox} className="msgBox" onClick={this.handleClick}>
				<span style={dialStyle}>{this.state.dialogue}</span>
				<img src={clickIcon} style={Object.assign({}, clickIconStyle, this.state.showClick)} />

			</div>
		);
	}
	
	componentDidMount(){
		let fullDialogue = this.props.children;
		setTimeout(() => {
		this.typeDialogue(fullDialogue);
		}, this.props.delay)
	}
	
	
}
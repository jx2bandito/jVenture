import React from 'react';
import transitionTL from './transition.js';
import Dialogue from './dialogue.js';
import imgBg from "../images/sealhabitat.jpg";
import {msgBox, optionStyle, imgStyle} from "./styles.js";

const wrapStyle = { 
	color: "black",
	width: "100%", 
	height: "100%",
	position: "absolute",
	textAlign: "center",
	top: 0,
	left: 0,
	WebkitUserSelect: "none", 
    KhtmlUserSelect: "none", 
    MozUserSelect: "none",
    msUserSelect: "none", 
    userSelect: "none",
	backgroundColor: "rgba(240, 50, 50, .5)"
} 



export default class Scene extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			dialogue: "A blood-curdling screech pierces through your head.",
			showDialogue: true,
			cursorStyle: {
				cursor: "default"
			}
		}
		
		this.title = "Seals' Habitat?";
		
		this.option1 = {
			message: "Inspect pool of blood",
			click: () => {
				this.setState({   
					dialogue: "There's a pool of blood where the dead seal's body should be...`The pool quivers intermittently...```You realize the pool is moving in sync with your breathing.",
					showDialogue: true
				});
				
				this.cursorDefault();
			}
		};
		this.option2 = {
			message: "Enter cave",
			click: () => {
				this.setState({
					dialogue: "You try to explore the pitch-black cave...`You walk for what feels like hours, but you get nowhere.`You turn around and you're back at the entrance.",
					showDialogue: true
				});
				this.cursorDefault();
			}
		};
		this.option3 = {
			message: "Escape to coast",
			click: () => {
				this.setState({
					dialogue: "Your panically waddle toward the coast.",
					showDialogue: true,
					dialogueOnClick: ()=>{
						this.props.chooseScene("dCoast");
					}
				});
				this.cursorDefault();
				return;
			}
		};
		this.option4 = {
			message: "Go home",
			click: () => {			
				this.setState({
					dialogue: "A large shifting shadow looms over the path.`You decide to find another way out.",
					showDialogue: true
				})
			}
			
		};
		
		this.hasItem = this.hasItem.bind(this);
		this.endDialogue = this.endDialogue.bind(this);
		this.state.dialogueOnClick = this.endDialogue;
		this.cursorPointer = this.cursorPointer.bind(this);
		this.cursorDefault = this.cursorDefault.bind(this);
		
	}
	
	hasItem(item){
		return this.props.accessItem().indexOf(item) > -1;
	}
	
	endDialogue(){
		this.setState({
			showDialogue: false
		})
	}
	
	cursorPointer(){
		this.setState({cursorStyle: {cursor:"pointer"}})
	}
	
	cursorDefault(){
		this.setState({cursorStyle: {cursor:"default"}})
	}
	
	componentDidMount(){
		var newTL = new TimelineMax();
		
		newTL
		.from(".wrapper", 2, {
			backgroundColor: "black"
		}, "start")
		.play(0);
	}
	
	componentWillMount(){		
		this.delay = 500;
	}
	
	componentWillUnmount(){
	}
	
	componentWillUpdate(){
		this.delay = 50;
	}
	
	render(){
	
		return (
		

			<div style={Object.assign({}, wrapStyle, this.state.cursorStyle)} className="wrapper">
				<img src={imgBg} style={Object.assign({}, imgStyle)}/>
				<h1>{this.title}</h1>
				
				{(
				()=>{
					if (this.state.showDialogue){
						return <Dialogue onClick={this.state.dialogueOnClick} delay={this.delay}>{this.state.dialogue}</Dialogue>;
					}
					else if (!this.state.showDialogue){
						return (
						<div style={msgBox} className="msgBox">
							<div style={optionStyle} onClick={this.option1.click} className="option1" onMouseOver={this.cursorPointer} onMouseLeave={this.cursorDefault}>
								{this.option1.message}
							</div>
							<div style={optionStyle} onClick={this.option2.click} className="option2" onMouseOver={this.cursorPointer} onMouseLeave={this.cursorDefault}>
								{this.option2.message}
							</div>
							<div style={optionStyle} onClick={this.option3.click} className="option3" onMouseOver={this.cursorPointer} onMouseLeave={this.cursorDefault}>
								{this.option3.message}
							</div>
							<div style={optionStyle} onClick={this.option4.click} className="option4" onMouseOver={this.cursorPointer} onMouseLeave={this.cursorDefault}>
								{this.option4.message}
							</div>
						</div>
						)
					}
				}
				)()}
				
			</div>
		);
	}
}
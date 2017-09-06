import React from 'react';
import transitionTL from './transition.js';
import Dialogue from './dialogue.js';
import imgBg from "../images/volcano.jpg";
import joelBattle from "../images/joelBattle.png";
import duckBattle from "../images/duckBattle.png";

import {quackAttack} from "../battlePatterns/quackAttack.js";


var quackAudio = new Audio('./app/music/quack.mp3');
quackAudio.volume = .1;
	
const wrapStyle = { 
	color: "white",
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
    userSelect: "none"
} 

const battleJoelStyle = {
	height: "10vw",
	width: "10vw",
	position: "absolute",
	left: "10vw",
	bottom: "9.5vw"
}

const battleDuckStyle = {
	height: "20vw",
	width: "20vw",
	position: "absolute",
	right: "10vw",
	bottom: "22.5vw",
	transformOrigin: "50% 80%",
	transform: "rotateY(180deg)"
}

const msgBox = {
	position: "absolute",
	width: "80vw",
	height: "7.5vw",
	padding: "auto",
	paddingBottom: "-35px",
	left: "calc(50% - 40vw)",
	bottom: 25,
	fontSize: "2.5vw",
	border: "1px solid black",
	color: "black",
	borderRadius: "5px",
	background: "rgba(200, 200, 230, .7)"
}

const barStyle = {
	position: "absolute",
	height: "10%",
	width: "100%",
	backgroundColor: "black",
	display: "block"
}


const optionStyle = {
	width: '45%',
	margin: 'auto',
	overflow: 'auto',
	display: 'inline-block',
	position: "relative",
	top: "calc(25% - 1.25vw)"
}
 
const imgStyle = {
	position: "absolute",
	left: 0,
	top: 0,
	zIndex: -1,
	width: "100%",
	height: "100%" 
}



export default class Scene extends React.Component{
	
	constructor(props){
	
		super(props);
		this.state = {
			dialogue: "A wild Shadow Duck appeared!`"
				+"The Shadow Duck begins concentrating, gathering energy around its beak.",
			showDialogue: true,
			cursorStyle: {
				cursor: "default"
			},
			enemyHP: 5,
			battlePattern: quackAttack
		}
		
		
		this.title = "";
		
		this.option1 = {
			message: "Attack",
			click: ()=>{
				this.state.battlePattern.chooseAttack(this);
			}
		};
		this.option2 = {
			message: "Defend",
			click: ()=>{
				this.state.battlePattern.chooseDefend(this);
			}
		};
		this.option3 = {
			message: "Evade",
			click: ()=>{
				this.state.battlePattern.chooseEvade(this);
			}
		};
		
		this.option4 = {
			message: "Run",
			click: () => {
				TweenMax.set(".joelBattle", {css:{
					transform: "rotateY(180deg)"
				}});
				TweenMax.to(".joelBattle", 20, {
					x: "-10000%"
				});
				this.setState({
					dialogue: "You keep running without looking back.",
					showDialogue: true,
					dialogueOnClick: ()=>{
						delayedScene=delayedScene.bind(this);
				
						function delayedScene(){
							this.props.chooseScene("Home3");
						}
						
						TweenMax.to(".wrapper", 4, {
							autoAlpha: 0,
							ease: Bounce.easeOut,
							onComplete: delayedScene
						});
					}
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
		.to(".barLeft", 2, {
			x: "100%"
		}, "bars")
		.to(".barRight", 2, {
			x: "-100%"
		}, "bars")
		.from(".joelBattle", 2, {
			x: 3000
		}, "appear")
		.from(".duckBattle", 2, {
			x: -3000,
			onComplete: function(){
				quackAudio.play();
			}
		}, "appear")
		.from(".msgBox", .001, {
			autoAlpha: 0
		})
		.play(0);
	}
	
	componentWillMount(){		
		this.delay = 4500;
	}
	
	componentWillUnmount(){
	
	}
	
	componentWillUpdate(){
		this.delay = 50;
	}
	
	render(){
		return (
		
			
			<div style={Object.assign({}, wrapStyle, this.state.cursorStyle)} className="wrapper">
				
				<div className="barLeft" style={Object.assign({}, barStyle, {top: "0%"})}></div>
				<div className="barRight" style={Object.assign({}, barStyle, {top: "10%"})}></div>
				<div className="barLeft" style={Object.assign({}, barStyle, {top: "20%"})}></div>
				<div className="barRight" style={Object.assign({}, barStyle, {top: "30%"})}></div>
				<div className="barLeft" style={Object.assign({}, barStyle, {top: "40%"})}></div>
				<div className="barRight" style={Object.assign({}, barStyle, {top: "50%"})}></div>
				<div className="barLeft" style={Object.assign({}, barStyle, {top: "60%"})}></div>
				<div className="barRight" style={Object.assign({}, barStyle, {top: "70%"})}></div>
				<div className="barLeft" style={Object.assign({}, barStyle, {top: "80%"})}></div>
				<div className="barRight" style={Object.assign({}, barStyle, {top: "90%"})}></div>
				
				
				<img src={imgBg} style={imgStyle}/>
				<h1>{this.title}</h1>
				
				<img src={joelBattle} style={battleJoelStyle} className="joelBattle"/>
				<img src={duckBattle} style={battleDuckStyle} className="duckBattle"/>
				
				
				{(
				()=>{
					if (this.state.showDialogue){
						return <Dialogue onClick={this.state.dialogueOnClick} chooseScene={this.props.chooseScene} onClickParam={this.state.dialogueClickParam} delay={this.delay}>{this.state.dialogue}</Dialogue>;
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
import React from 'react';
import transitionTL from './transition.js';
import Dialogue from './dialogue.js';
import imgBg from "../images/dreamcoast.jpg";


 
	
	
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
			dialogue: "You arrive at a coast.`You sense a giant figure stalking you in the distance.",
			showDialogue: true,
			cursorStyle: {
				cursor: "default"
			}
		}
		
		this.title = "Coast?";
		
		this.option1 = {
			message: "Inspect sword in ice",
			click: () => {
				this.setState({   
					dialogue: this.props.accessCourage("Dream Sword") ? "The black veil swats your hand as you reach out to the sword." 
						: "You tug at the sword, but it doesn't budge.`Just touching the sword fills you with testosterone.`Your Courage went up!``A black veil descends upon the sword.",
					showDialogue: true
				});
				
				this.cursorDefault();
				return;
			}
		};
		this.option2 = {
			message: "Talk to Oblivious Penguin",
			click: () => {
				this.setState({
					dialogue: '"I was told there would be a rollercoaster here."',
					showDialogue: true
				});
				this.cursorDefault();
			}
		};
		this.option3 = {
			message: "Confront giant stalker",
			click: () => {
				delayedScene=delayedScene.bind(this);
				
				function delayedScene(){
					this.props.chooseScene("battle1");
				}
					
				if(this.props.accessCourage() > 0){
					this.setState({
						dialogue: "You muster your courage and turn around.`"
						+"A giant duck quacks at you menacingly.`You steel yourself for combat.",
						showDialogue: true,
						dialogueOnClick: ()=>{
						
							TweenMax.to(".wrapper", 2, {
								scale: 0,
								y: "-20%",
								rotationZ: "1350deg",
								onComplete: delayedScene
							});
						}
					})
				}
				else{
					this.setState({
						dialogue: "You try to turn around, but fear holds you back.`Your Courage is too low.",
						showDialogue: true
					})
				}
				this.cursorDefault();
				return;
			}
		};
		
		this.option4 = {
			message: "Keep running",
			click: () => {
				this.setState({
					dialogue: "You keep running without looking back.",
					showDialogue: true,
					dialogueOnClick: ()=>{
						this.props.chooseScene("Home3");
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
				<img src={imgBg} style={imgStyle}/>
				<h1>{this.title}</h1>
				
				{(
				()=>{
					if (this.state.showDialogue){
						return <Dialogue onClick={this.state.dialogueOnClick} chooseScene={this.props.chooseScene} delay={this.delay}>{this.state.dialogue}</Dialogue>;
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
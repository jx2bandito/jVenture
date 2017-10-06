import React from 'react';
import transitionTL from './transition.js';
import Dialogue from './dialogue.js';
import imgBg from "../images/home.jpg";
import {wrapStyle, msgBox, optionStyle, imgStyle} from "./styles.js";

export default class Scene extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			dialogue: "You return home.",
			showDialogue: true,
			cursorStyle: {
				cursor: "default"
			}
		}
		
		
		this.title = "Home";
		this.option1 = {
			message: "Hunt for food",
			click: () => {
				this.props.chooseScene("pExpress");
				return;
			}
		};
		this.option2 = {
			message: "Look for penguin girlfriend",
			click: () => {
				this.setState({
					dialogue: "You are paralyzed by the mere prospect of meeting a female companion.`Your Courage is too low.",
					showDialogue: true
				});
				this.cursorDefault();
			}
		};
		this.option3 = {
			message: "Go back to sleep",
			click: () => {
				this.setState({
					dialogue: "You try to take a nap, but existential dread keeps you awake.`You decide to try again later.",
					showDialogue: true
				});
				this.cursorDefault();
				return;
			}
		};
		this.option4 = {
			message: "Go clubbing",
			click: () => {
				if(this.props.accessItem().indexOf("Club") > -1){
					this.props.chooseScene("sHabitat");
					return;
				}
				this.setState({
					dialogue: "You do not possess a club.",
					showDialogue: true
				});
				this.cursorDefault();
				return;
			}
		};

		this.endDialogue = this.endDialogue.bind(this);
		this.cursorPointer = this.cursorPointer.bind(this);
		this.cursorDefault = this.cursorDefault.bind(this);
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
		transitionTL();
	}
	
	componentWillMount(){
		if(this.props.starting){
			this.state.dialogue = "You wake up. You are a penguin named Joel. What do you do?";
		}
		this.delay = 500;
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
						return <Dialogue onClick={this.endDialogue} delay={this.delay}>{this.state.dialogue}</Dialogue>;
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

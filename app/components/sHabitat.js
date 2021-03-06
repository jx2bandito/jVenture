import React from 'react';
import transitionTL from './transition.js';
import Dialogue from './dialogue.js';
import imgBg from "../images/sealhabitat.jpg";
import {wrapStyle, msgBox, optionStyle, imgStyle} from "./styles.js";

export default class Scene extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			dialogue: "You enter the seals' habitat.",
			showDialogue: true,
			cursorStyle: {
				cursor: "default"
			}
		}
		
		this.clubbedSeal = false;
		this.clubbedBigSeal = false;
		this.title = "Seals' Habitat";
		
		this.option1 = {
			message: "Club a small seal",
			click: () => {
				this.setState({   
					dialogue: this.hasItem("Guilt") ? "Another one? No. You're not monster." : "You club a small seal to death. You feel overwhelmed.`You obtain Guilt!",
					showDialogue: true
				});
				
				this.props.accessItem("Guilt");
				this.cursorDefault();
			}
		};
		this.option2 = {
			message: "Inspect ice boulder",
			click: () => {
				this.setState({
					dialogue: "A frozen boulder blocks a cave. Perhaps something could melt it.",
					showDialogue: true
				});
				this.cursorDefault();
			}
		};
		this.option3 = {
			message: "Club a large seal",
			click: () => {
				this.setState({
					dialogue: this.props.accessCourage("Big Seal") ? "The large seal stares you down. You back away slowly." 
						: "The large seal beats you down, but at least you tried.`Your Courage went up!",
					showDialogue: true
				});
				this.cursorDefault();
				return;
			}
		};
		this.option4 = { 
			message: "Go home",
			click: () => {
			
				this.hasItem("Guilt") ? 
				(
					this.setState({
						dialogue: "You take a long, somber walk home.",
						dialogueOnClick: ()=>{
							this.props.chooseScene("Home2");
						},
						showDialogue: true
					})
				): this.props.chooseScene("Home")
				return;
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
		transitionTL();
	}
	
	componentWillMount(){
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
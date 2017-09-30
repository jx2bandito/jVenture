import React from 'react';
import transitionTL from './transition.js';
import Dialogue from './dialogue.js';
import imgBg from "../images/shop.jpg";
import {wrapStyle, msgBox, optionStyle, imgStyle} from "./styles.js";

export default class Scene extends React.Component{
	
	constructor(props){
		super(props);
				
		this.state = {
			dialogue: "You enter Penguin Express.",
			showDialogue: true,
			cursorStyle: {
				cursor: "default"
			}
		}
		
		this.title = "Penguin Express";
		this.option1 = {
			message: "Order fish taco",
			click: () => {
				this.setState({
					dialogue: this.hasItem("Fish Taco") ? "You already have a Fish Taco." : "You obtain Fish Taco!",
					showDialogue: true
				});
				this.props.accessItem("Fish Taco");
				this.cursorDefault();
			}
		};
		this.option2 = {
			message: "Talk to Shady Penguin",
			click: () => {
				this.setState({
					dialogue: this.hasItem("Club") ? '"You go use that club wisely, kid."' : '"Take this, kid." The Shady Penguin gives you a club.`You obtain Club!',
					showDialogue: true
				});
				this.props.accessItem("Club");
				this.cursorDefault();
			}
		};
		this.option3 = {
			message: "Hit on cute cashier.",
			click: () => {
				this.setState({
					dialogue: "You panic and ask her where the bathroom is while looking constipated.`Your Courage is too low.",
					showDialogue: true
				});
				this.cursorDefault();
				return;
			}
		};
		this.option4 = {
			message: "Go home",
			click: () => {
				this.props.chooseScene("Home");
				return;
			}
		};
		
		this.hasItem = this.hasItem.bind(this);
		this.endDialogue = this.endDialogue.bind(this);
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
	
	componentWillUnmount(){
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
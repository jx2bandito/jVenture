import React from 'react';
import transitionTL from './transition.js';
import Dialogue from './dialogue.js';
import imgBg from "../images/home.jpg";
import {wrapStyle, msgBox, optionStyle} from "./styles.js";

const imgStyle = {
	position: "absolute",
	left: 0,
	top: 0,
	zIndex: -1,
	width: "100%",
	height: "100%",
	filter: "brightness(.8)"
}


export default class Scene extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			dialogue: "You wake up in cold sweat.`Was it all a dream...?`You look around.`"+
			"`Everyone is staying still, as if frozen by time.``To be continued...",
			showDialogue: true,
			cursorStyle: {
				cursor: "default"
			}
		}
		
		
		this.title = "Home";
		
		this.cursorPointer = this.cursorPointer.bind(this);
		this.cursorDefault = this.cursorDefault.bind(this);
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
var React = require('react');
import transitionTL from './transition.js';


const bgStyle = { 
	backgroundColor: "black",
	color: "white",
	width: "100%",
	height: "100%",
	position: "absolute",
	textAlign: "center",
	top: 0,
	left: 0
} 


export default class Scene extends React.Component{
	
	constructor(props){
		super(props);
		
		this.title = "Placeholder Scene2";
		this.option1 = {
			message: "Hit on cute cashier",
			click: () => {
				this.props.chooseScene(1);
				return;
			}
		};
		this.option2 = {
			message: "Talk to shady penguin",
			click: () => {
				this.props.chooseScene(0);
				return;
			}
		};
		this.option3 = {
			message: "Go back outside",
			click: () => {
				this.props.chooseScene(0);
				return;
			}
		};
		this.option4 = {
			message: "Yell 'do the harlem shake'",
			click: () => {
				this.props.chooseScene(0);
				return;
			}
		};
	}
	
	


	
	componentDidMount(){
		transitionTL();
	}
	
	
	render(){
		return (
			<div style={bgStyle} className="wrapper">
				<h1>{this.title}</h1>
				<div onClick={this.option1.click} className="option1">{this.option1.message}</div>
				<div onClick={this.option2.click} className="option2">{this.option2.message}</div>
				<div onClick={this.option3.click} className="option3">{this.option3.message}</div>
				<div onClick={this.option4.click} className="option4">{this.option4.message}</div>
			</div>
		);
	}
}
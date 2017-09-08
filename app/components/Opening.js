import React from 'react';
import Peng from '../images/joel.jpg';


const bgStyle = { 
	backgroundColor: "black",
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
    userSelect: "none",
	cursor: "default" 
} 
const imgStyle = {
	width: "10vw",
	height: "10vw",
	borderRadius: "50%",
	marginLeft: "-35%"
}

export default class Opening extends React.Component{

	constructor(props){
		super(props);
		this.state = { 
		title: "A Penguin's Might?"
		};
	}		
		
	componentDidMount(){
		const rotDeg = 15;
		const fR = rotDeg + "deg";
		const bR = -rotDeg + "deg";
		const pengTL = new TimelineMax({repeat: -1});
		pengTL
			.fromTo("img", 2, {
				rotation: fR,
				ease: Power0.easeNone
			}, {
				rotation: bR,
				ease: Power0.easeNone
			})
			.fromTo("img", 2, {
				rotation: bR,
				ease: Power0.easeNone
			},{
				rotation: fR,
				ease: Power0.easeNone
			});
	}
		
	render(){

		return (
			<div className="wrapper" style={bgStyle} onClick={this.props.onClick}>
				<h1>Joel's Adventure</h1>
			<h2>
				{this.state.title}
			</h2>
			<p>
				Click to Start
			</p>
			<img src={Peng} style={imgStyle}/>
				</div>
		);
	}

}
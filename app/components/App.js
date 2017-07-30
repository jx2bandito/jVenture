import React from 'react';
import Opening from "./Opening.js";
import Scene1 from "./Scene.js";
import Scene2 from "./Scene2.js";

var Scenes = [Scene1, Scene2]





export default class Hello extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			started: false,
			scene: Scenes[0]
		}
		this.startGame = this.startGame.bind(this);
		this.chooseScene = this.chooseScene.bind(this);
	} 

	chooseScene(index){
		this.setState({scene: Scenes[index]});
	}
	
	
	startGame(){
		this.setState({started: true});
	}

		
	render(){
		
		if(this.state.started){
			let CurrentScene = this.state.scene;
			return <CurrentScene chooseScene={this.chooseScene}/>
		}
		else{
			return (
				<Opening onClick={this.startGame} />	
			);
		}
	}
}

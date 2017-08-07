import React from 'react';
import Opening from "./Opening.js";
import Home from "./Home.js";
import pExpress from "./pExpress.js";
import sHabitat from "./sHabitat.js";
import Home2 from "./Home2.js";
var Scenes = [Home, pExpress, sHabitat, Home2];
import {redFilter} from "./redfilter.js"



export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			started: false,
			scene: Scenes[0],
			firstStart: true,
			items: [""]
		}
		this.startGame = this.startGame.bind(this);
		this.chooseScene = this.chooseScene.bind(this);
		this.accessItem = this.accessItem.bind(this);
	} 

	chooseScene(index){
		this.setState({scene: Scenes[index]});
	}
	
	
	startGame(){
		this.setState({started: true});
	}
	
	accessItem(newItem){
		if(newItem){
			if(this.state.items.indexOf(newItem) > -1){
				return;
			}
			this.setState({items: [...this.state.items, newItem]});
			return;
		}
		else{
			return this.state.items;
		}
	}
	
	componentDidUpdate(){
		console.log(this.state.items);
	}
	
	render(){
		$(document).on("keypress", (e) => {
			if(e.which == 13){
				this.startGame();
			}
		});
		
		if(this.state.started && this.state.firstStart){
			this.state.firstStart = false;
			return <Home chooseScene={this.chooseScene} accessItem={this.accessItem} starting="true" />
		}
		
		
		if(this.state.started){
			let CurrentScene = this.state.scene;
			return <CurrentScene accessItem={this.accessItem} chooseScene={this.chooseScene}/>
		}
		else{
			return (
				<Opening onClick={this.startGame} />	
			);
		}
	}
}

import React from 'react';
import Opening from "./Opening.js";
import Home from "./Home.js";
import pExpress from "./pExpress.js";
import sHabitat from "./sHabitat.js";
import Home2 from "./Home2.js";
import dHabitat from "./dHabitat.js";

const cipherAudio = new Audio('./app/music/cipher2.mp3');
const duckAudio = new Audio('./app/music/duck.mp3');
const frostAudio = new Audio ('./app/music/frost.mp3');
const beeAudio = new Audio('./app/music/happybee.mp3');
const shantyAudio = new Audio('./app/music/shanty.mp3');
const ghostAudio = new Audio('./app/music/ghost.mp3');


var currentMusic = 0;


var Scenes = {
	Home: {
		scene: Home,
		music: cipherAudio
	},
	pExpress: {
		scene: pExpress,
		music: cipherAudio
	},
	sHabitat: {
		scene: sHabitat,
		music: duckAudio
	},
	Home2: { 
		scene: Home2,
		music: frostAudio
	},
	dHabitat: {
		scene: dHabitat,
		music: ghostAudio
	}
}





export default class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			started: false,
			scene: Scenes[0],
			firstStart: true,
			items: [],
			courage: []
		}
		
		
		this.startGame = this.startGame.bind(this);
		this.chooseScene = this.chooseScene.bind(this);
		this.accessItem = this.accessItem.bind(this);
		this.accessCourage = this.accessCourage.bind(this);
		this.playMusic = this.playMusic.bind(this);
		
	} 

	chooseScene(sceneName){
		let newScene = Scenes[sceneName];
		this.setState({scene: newScene.scene});
		this.playMusic(newScene.music);
	}
	
	
	restartMusic(){
		this.currentTime = 0;
		this.play();
	}
	
	playMusic(newMusic){
		if(newMusic == currentMusic){
			return false;
		}
		
		if(currentMusic){
			currentMusic.pause();
		}
		
		newMusic.loop = true;
		newMusic.volume = .5;
		newMusic.currentTime = 0;
		newMusic.play();
		currentMusic = newMusic;
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
	
	accessCourage(newCourage){
		if(newCourage){
			if(this.state.courage.indexOf(newCourage) > -1){
				return true;
			}
			this.setState({courage: [...this.state.courage, newCourage]});
			return false;
		}
		else{
			return this.state.courage.length;
		}
	}
	
	componentWillMount(){
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
			this.playMusic(cipherAudio);
			return <Scenes.Home.scene chooseScene={this.chooseScene} accessItem={this.accessItem}  accessCourage={this.accessCourage} starting="true" />
		}
		
		
		if(this.state.started){
			let CurrentScene = this.state.scene;
			return <CurrentScene accessItem={this.accessItem} accessCourage={this.accessCourage} chooseScene={this.chooseScene}/>
		}
		else{
			return (
				<Opening onClick={this.startGame} />	
			);
		}
	}
}

import {quackAttack} from "../battlePatterns/quackAttack.js";
import {diveOpen} from "../battlePatterns/diveOpen.js";

var quackAudio = new Audio('./app/music/quack.mp3');
quackAudio.volume = .1;

export const diveAttack =  {
		chooseAttack: (scene) => {
			let attackTL = new TimelineMax({
				onComplete: function(){
					scene.setState({
						dialogue: "You try to attack, but you had yet to regain your composure."
							+"`The Shadow Duck prepares to dive in.",
						showDialogue: true,
						battlePattern: quackAttack
					});
				}
			});
			attackTL
			.fromTo(".duckBattle", 1, {
				x: "0%",
				y: "0%"
			},{
				x: "-500%",
				y: "60%",
				rotationZ: "-24deg",
				rotationX: "1080deg",
				ease: Expo.easeIn
			}, "-=.25")
			.to(".joelBattle", .5, {
				x: "-20%",
				rotationZ: "-90deg",
				rotationY: "-1080deg"
			}, "-=.15")
			.set(".joelBattle", {css:{
				transform: "rotateY(0deg) rotateZ(-90deg)"
			}})
			.to(".joelBattle", .5, {
				x: "0%",
				rotationZ: "0deg",
				ease: Back.easeInOut,
				onStart: function(){
					TweenMax.fromTo(".duckBattle", 1, {
						x: "500%",
						y: "-60%"
					}, {
						x: "0%",
						y: "0%",
						rotationZ: "0deg",
						rotationX: "0deg"
					})
				}
			}, "+=1.5")
			.from(".msgBox", .001, {
				autoAlpha: 0
			})
				.play(0);
				
			scene.cursorDefault();
			return;
		},

		chooseDefend: (scene)=>{
			let defendTL = new TimelineMax({
				onComplete: function(){
					scene.setState({
						dialogue: "You miraculously managed to defend the attack!`The Shadow Duck is stunned!",
						showDialogue: true,
						battlePattern: diveOpen
					});
				}
			});
			
			defendTL
				.fromTo(".duckBattle", 1, {
					x: "0%",
					y: "0%"
				},{
					x: "-265%",
					y: "60%",
					rotationZ: "-24deg",
					rotationX: "720deg",
					ease: Expo.easeIn
				}, "-=.25")
				.to(".duckBattle", .01, {
					rotationX: "0deg"
				})
				.from(".msgBox", .001, {
					autoAlpha: 0
				})
				.play(0);
				
			scene.cursorDefault();
			return;
		},
		
		chooseEvade: (scene)=>{
		
			let evadeTL = new TimelineMax({
				onComplete: function(){
					scene.setState({
						dialogue: "You evade in the nick of time.`The Shadow Duck readies another Dive Attack.",
						showDialogue: true
					});
				}
			});
			
			evadeTL
				.set(".joelBattle", {css:{zIndex: 2}})
				.fromTo(".duckBattle", 1, {
					x: "0%",
					y: "0%"
				},{
					x: "-500%",
					y: "60%",
					rotationZ: "-24deg",
					rotationX: "1080deg",
					ease: Expo.easeIn
				}, "-=.25")
				.to(".joelBattle", .25, {
					y: "-10%"
				}, "-=.25")
				.to(".joelBattle", .25, {
					scale: 1.1,
					y: "10%"
				})
				.to(".joelBattle", .25, {
					scale: 1,
					y: "-10%"
				})
				.to(".joelBattle", .25, {
					y: "0%",
					onStart: function(){
						TweenMax.fromTo(".duckBattle", 1, {
							x: "500%",
							y: "-60%"
						}, {
							x: "0%",
							y: "0%",
							rotationZ: "0deg",
							rotationX: "0deg"
						})
					}
				})
				.set(".joelBattle", {css:{zIndex: -1}})
				.from(".msgBox", .001, {
					autoAlpha: 0
				})
				.play(0);
				
			scene.cursorDefault();
			return;

		}
	}
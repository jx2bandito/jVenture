import {diveAttack} from "../battlePatterns/diveAttack.js";
import {quackOpen} from "../battlePatterns/quackOpen.js";

var quackAudio = new Audio('../app/music/quack.mp3');
quackAudio.volume = .1;

export const quackAttack =  {
		chooseAttack: (scene) => {
		let attackTL = new TimelineMax({
			onComplete: function(){
				scene.setState({
					dialogue: "You try to attack, but the duck quacks at you, throwing you back."
					+"`The Shadow Duck prepares to dive in.",
					showDialogue: true,
					battlePattern: diveAttack
				});
			}
		});
		attackTL
		.to(".joelBattle", .5, {
			x: "300%",
			y: "-140%"
		})
		.from(".duckBattle", .5, {
			x: "5%",
			rotationZ: "-12deg",
			ease: Bounce.easeIn,
			onStart: function(){
				quackAudio.currentTime = 0;
				quackAudio.play();
			}
		}, "-=.25")
		.to(".duckBattle", .5, {
			x: "0%",
			rotationZ: "0deg"
		})
		.to(".joelBattle", .5, {
			x: "0%",
			y: "0%",
			rotationZ: "-820deg"
		}, "-=.15")
		.set(".joelBattle", {css: {
			transform: "rotateZ(-100deg)"
		}})
		.to(".joelBattle", .5, {
			rotationZ: "0deg",
			ease: Back.easeInOut
		}, "+=1")
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
						dialogue: "You barely manage to defend against the attack, and you see no opening."
						+"`The Shadow Duck readies another Quack Attack.",
						showDialogue: true
					});
				}
			});
			
			defendTL
			.from(".duckBattle", .5, {
				x: "5%",
				rotationZ: "-12deg",
				ease: Bounce.easeIn,
				onStart: function(){
					quackAudio.currentTime = 0;
					quackAudio.play();
				},
				
			})
			.fromTo(".joelBattle", .5, {
				x: "-5%",
				y: "5%"
			}, {
				x: "0%",
				y: "0%"
			}, "+=.5")
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
						dialogue: "You deftly evade the attack.`The Shadow Duck is recovering.",
						showDialogue: true,
						battlePattern: quackOpen
					});
				}
			});
			
			evadeTL
			.from(".duckBattle", .5, {
				x: "5%",
				rotationZ: "-12deg",
				ease: Bounce.easeIn,
				onStart: function(){
					quackAudio.currentTime = 0;
					quackAudio.play();
				}
			})
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
				y: "0%"
			})
			
			.from(".msgBox", .001, {
				autoAlpha: 0
			})
			.play(0);
				
				scene.cursorDefault();
				return;
		} 
	}


import {diveAttack} from "../battlePatterns/diveAttack.js";

var quackAudio = new Audio('./app/music/quack.mp3');
quackAudio.volume = .1;

export const quackOpen =  {
		chooseAttack: (scene) => {
			scene.state.enemyHP = scene.state.enemyHP - 2;
			if(scene.state.enemyHP <= 0){
				let finisherTL = new TimelineMax({
					onComplete: function(){
						scene.setState({
							dialogue: "You use your finisher: Penguin Whirl!" 
								+"`The Shadow Duck is vanquished!",
							showDialogue: true,
							dialogueOnClick: ()=>{
								delayedScene=delayedScene.bind(scene);
						
								function delayedScene(){
									this.props.chooseScene("Home3");
								}
								
								TweenMax.to(".wrapper", 4, {
									autoAlpha: 0,
									ease: Bounce.easeOut,
									onComplete: delayedScene
								});
							}
						})
					
					}
				})
				
				finisherTL
					.set(".joelBattle", {css: {zIndex: 2}})
					.to(".joelBattle", 1, {
						y: "-150%",
						x: "600%"
					})
					.to(".joelBattle", 1, {
						y: "0%"
					}, "pullDown")
					.to(".duckBattle", 1, {
						y: "75%"
					}, "pullDown")
					.to(".joelBattle", 1, {
						rotationZ: "-100deg"
					}, "flip")
					.to(".duckBattle", 1, {
						rotationZ: "-180deg",
						x: "-70%",
						y: "-10%"
					}, "flip")
					.to(".duckBattle", 1, {
						y: "55%"
					}, "flip+=.6")
					.to(".joelBattle", 1, {
						rotationZ: "0deg",
						x: "650%"
					})
					.to(".joelBattle", .5, {
						rotationY: "180deg"
					})
					.to(".joelBattle", .5, {
						rotationZ: "40deg",
						x: "550%"
					}, "kick")
					.to(".duckBattle", .25, {
						x: "-170%",
						y: "0%"
					}, "kick+=.35")
					.set(".joelBattle", {css: {zIndex: -1}})
					.to(".joelBattle", .25, {
						rotationZ: "0deg",
						x: "420%",
						y: "-80%"
					})
					.to(".duckBattle", 1, {
						rotationY: "-=180deg",
						x: "+=120%"
					}, "turn1")
					.to(".joelBattle", 1, {
						rotationY: "0deg"
					}, "turn1")
					.set(".joelBattle", {css: {zIndex: 2}})
					.to(".duckBattle", 1, {
						rotationY: "-=180deg",
						x: "-=120%"
					}, "turn2")
					.to(".joelBattle", .75, {
						rotationY: "180deg"
					}, "turn2")
					.set(".joelBattle", {css: {zIndex: -1}})
					.to(".duckBattle", .75, {
						rotationY: "-=180deg",
						x: "+=120%"
					}, "turn3")
					.to(".joelBattle", .5, {
						rotationY: "0deg"
					}, "turn3")
					.set(".joelBattle", {css: {zIndex: 2}})
					.to(".duckBattle", .5, {
						rotationY: "-=180deg",
						x: "-=120%"
					}, "turn4")
					.to(".joelBattle", .5, {
						rotationY: "180deg"
					}, "turn4")
					.set(".joelBattle", {css: {zIndex: -1}})
					.to(".duckBattle", .25, {
						rotationY: "-=180deg",
						x: "+=120%"
					}, "turn5")
					.to(".joelBattle", .25, {
						rotationY: "0deg",
						onComplete: function(){
							let spinTL = new TimelineMax({repeat: 7})
							spinTL
							.set(".joelBattle", {css: {zIndex: 2}})
							.to(".duckBattle", .15, {
								rotationY: "-=180deg",
								x: "-=120%"
							}, "turnEven")
							.to(".joelBattle", .15, {
								rotationY: "180deg"
							}, "turnEven")
							.set(".joelBattle", {css: {zIndex: -1}})
							.to(".duckBattle", .15, {
								rotationY: "-=180deg",
								x: "+=120%"
							}, "turnOdd")
							.to(".joelBattle", .15, {
								rotationY: "0deg"
							}, "turnOdd")
							.timeScale(3)
							.play(0)
						}
					}, "turn5")
					.set(".joelBattle", {css: {zIndex: 2}})
					.to(".joelBattle", .5, {
						rotationZ: "40deg",
						rotationY: "180deg",
						delay: 2.4
					})
					.to(".duckBattle", 1, {
						rotationY: "-=180deg",
						x: "-=120%",
						y: "-=30%"
					}, "-=.75")
					.to(".duckBattle", 3, {
						y: "-=100%",
						x: "-=100%",
						rotationZ: "1080deg",
						rotationY: "1080deg",
						rotationX: "1080deg",
						scale: 0
					}, "-=.5")
					.from(".msgBox", .001, {
						autoAlpha: 0
					})
					.timeScale(3)
					.play(0);
			}
			else if (scene.state.enemyHP > 0){
				let attackTL = new TimelineMax({
					onComplete: function(){
						scene.setState({
							dialogue: "You successfully attack the Shadow Duck!"
								+"`The Shadow Duck prepares to dive in.",
							showDialogue: true,
							battlePattern: diveAttack
						});
					}
				});
				attackTL
					.set(".joelBattle", {css: {zIndex: 2}})
					.to(".joelBattle", 1, {
						y: "-230%",
						x: "600%"
					})
					.to(".joelBattle", .5, {
						y: "-200%"
					})
					.to(".duckBattle", .5, {
						y: "+10%"
					}, "-=.25")
					.to(".joelBattle", .5, {
						y: "-230%"
					}, "-=.25")
					.to(".duckBattle", .5, {
						y: "0%"
					})
					.to(".joelBattle", 1, {
						y: "0%",
						x: "0%",
						rotationZ: "-720deg"
					}, "-=.25")
					.to(".joelBattle", .1, {
						rotationZ: "0deg"
					})
					.set(".joelBattle", {css: {zIndex: -1}})
					.from(".msgBox", .001, {
						autoAlpha: 0
					})
					.timeScale(3)
					.play(0);
			}
				
			scene.cursorDefault();
			return;
		},
		
		chooseDefend: (scene)=>{
			let defendTL = new TimelineMax({
				onComplete: function(){
					scene.setState({
						dialogue: "You defend, but there was nothing to defend against."
							+"`The Shadow Duck prepares to dive in.",
						showDialogue: true,
						battlePattern: diveAttack
					});
				}
			});
			
			defendTL
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
						dialogue: "You evade an imaginary attack."
							+"`The Shadow Duck prepares to dive in.",
						showDialogue: true,
						battlePattern: diveAttack
					});
				}
			});
			
			evadeTL
				.to(".joelBattle", .25, {
					y: "-10%"
				}, "-=.25")
				.to(".joelBattle", .25, {
					scale: 1.1,
					y: "10%",
					zIndex: 20
				})
				.to(".joelBattle", .25, {
					scale: 1,
					y: "-10%",
					zIndex: 0
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
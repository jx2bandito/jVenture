import {quackAttack} from "../battlePatterns/quackAttack.js";


var quackAudio = new Audio('./app/music/quack.mp3');
quackAudio.volume = .1; 

export const diveOpen =  {
		chooseAttack: (scene) => {
			scene.state.enemyHP = scene.state.enemyHP - 1;
			if(scene.state.enemyHP <= 0){
				let finisherTL = new TimelineMax({
					onComplete: function(){
						scene.setState({
							dialogue: "You use your finisher: Penguin Barrage!" 
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
					.to(".joelBattle", .25, {
						x: "20%",
						ease: Elastic.easeIn
					})
					.to(".duckBattle", .25, {
						x: "-120%"
					})
					.set(".joelBattle", {css: {
						left: "50vw"
					}})
					.to(".joelBattle", .25, {
						rotationZ: "180deg"
					})
					.to(".duckBattle", .25, {
						y: "-=100%",
						rotationX: "+=1080"
					})
					.to(".joelBattle", .25, {
						rotationZ: "0deg",
						y: "-1000%"
					})
					.set(".duckBattle", {css:{
						"transform-origin": "50% 50%"
					}})
					.to(".duckBattle", .25, {
						rotationX: "+=1080"
					}, "-=.15")
					.to(".joelBattle", .25, {
						x: "-400%",
						y: "-200%"
					})
					.to(".joelBattle", .25, {
						x: "500%"
					})
					.to(".duckBattle", .25, {
						rotationY: "+=1080"
					}, "-=.15")
					.to(".joelBattle", .25, {
						y: "-=500%",
						x: "-=500%"
					})
					.to(".joelBattle", .25, {
						y: "+=700%",
						ease: Power4.easeOut
					})
					.to(".duckBattle", .25, {
						rotationX: "+=1080"
					}, "-=.15")
					.to(".joelBattle", .25, {
						x: "-=400%",
						rotationZ: "-360deg"
					})
					.to(".duckBattle", 2, {
						y: "+=150%",
						rotationX: "+=900deg",
						ease: Bounce.easeOut
					})
					.to(".wrapper", .25, {
						y: "1%"
					}, "-=1.25")
					.to(".wrapper", .25, {
						y: "-1%"
					}, "-=.85")
					.to(".wrapper", .5, {
						y: "0%",
						ease: Back.easeOut
					}, "-=.50")
					.from(".msgBox", .001, {
						autoAlpha: 0
					})
					.play(0);
			}
			else if (scene.state.enemyHP > 0){
				let attackTL = new TimelineMax({
					onComplete: function(){
						scene.setState({
							dialogue: "You successfully attack the Shadow Duck!"
								+"`The Shadow Duck begins concentrating, gathering energy around its beak.",
							showDialogue: true,
							battlePattern: quackAttack
						});
					}
				});
				attackTL
					.to(".joelBattle", .25, {
						x: "20%",
						ease: Elastic.easeIn
					})
					.to(".duckBattle", .25, {
						x: "-120%",
						rotationZ: "180deg"
					})
					.to(".duckBattle", .5, {
						rotationZ: "0deg",
						delay: 1
					})
					.to(".duckBattle", .5, {
						x: "20%",
						y: "-20%",
						ease: Back.easeOut
					})
					.to(".duckBattle", 1, {
						x: "0%",
						y: "0%"
					})
					.from(".msgBox", .001, {
						autoAlpha: 0
					})
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
							+"`The Shadow Duck begins concentrating, gathering energy around its beak.",
						showDialogue: true,
						battlePattern: quackAttack
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
				.to(".duckBattle", .1, {
					rotationY: "+=180deg"
				})
				.to(".duckBattle", 1, {
					x: "0%",
					y: "0%",
					rotationZ: "0deg"
				})
				.to(".duckBattle", .5, {
					rotationY: "-=180deg"
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
						dialogue: "You evade an imaginary attack."
							+"`The Shadow Duck begins concentrating, gathering energy around its beak.",
						showDialogue: true,
						battlePattern: quackAttack
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
				.to(".duckBattle", .1, {
					rotationY: "+=180deg"
				})
				.to(".duckBattle", 1, {
					x: "0%",
					y: "0%",
					rotationZ: "0deg"
				})
				.to(".duckBattle", .5, {
					rotationY: "-=180deg"
				})
				.play(0);
				
			scene.cursorDefault();
			return;

		}
	}

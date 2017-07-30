export default function transitionTL(){
	var transitionTimeline = new TimelineMax();
	transitionTimeline
	.fromTo(".wrapper", .75, {
		autoAlpha: 0,
		ease: Power0.easeNone
	},
	{
		autoAlpha: 1,
		ease: Power0.easeNone
	});
}
# Joel's Adventure

 &nbsp;&nbsp;&nbsp; Joel's Adventure is a CYOA-type game made with React.js. I had been meaning to make a CYOA and to create a React project, so this project killed two birds with one stone. The story is incomplete, but I feel as though I've already set everything up as far as interactions go. Webpack is used as the bundler.
  
  
### User stories: <br />
* Options can update Joel's courage, add items, show dialogue, and/or change current scene.
* Different BGM plays depending on which scene is currently rendered.
* BGM does not restart if two scenes share the same music. 
* Dialogue has a typing effect. Dialogue's initial delay and typing delay can be adjusted (within code). 
* Some options have dynamic results based on Joel's courage and items (e.g. "Order Fish Taco" -> "You Obtain Fish Taco!" vs "You already have a Fish Taco.").
* Dialogue can also be displayed before a scene changes and/or immediately after a new scene renders.
* A different scene transition is used when rendering a battle scene.
* GreenSock is used for battle animations.
* Design is reasonably responsive.
    
###  To do: <br />
* Possibly separate presentational components and container components. 
* Place style objects in different files. 
* Add more scenes. 
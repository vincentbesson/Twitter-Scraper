// WORKFLOW

/*
 * Main loop.
 */
function loop(){
	
	//Javascript that is added dynamically to a page needs to be eval-d in order to correctly initialise.
	
	works();
		
	// Refreshes data every 15 seconds.
	setInterval(works, 60000);
	
	// Refreshes loading bar
	setInterval(waiter, 10000);
}

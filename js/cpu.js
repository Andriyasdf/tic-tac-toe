// Run computer opponent move
function cpuMove() {
	var randomCell = Math.floor(Math.random()*8);
	
	// Check if opponent has a near-win
	if (true) {
		var nearCell = 1;
		// Block it
		setCell(nearCell, cellState.O);
	}

	// Select a random cell
	if (!isCellAssigned(randomCell)) {
		setCell(randomCell, cellState.O);
	} else {
		cpuMove();
		console.warn("CPU tried placing in assigned cell, retrying");
	}
}

function isNearWin() {
// Check if 2 of 3 cells are filled
	
}
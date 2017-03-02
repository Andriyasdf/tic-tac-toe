function isCellAssigned(cell) {
	return (cell == cellState.X || cell == cellState.O);
}

function resetGrid() {
	game.turn = 0;
	game.grid = [
		cellState.NONE, cellState.NONE, cellState.NONE,
		cellState.NONE, cellState.NONE, cellState.NONE,
		cellState.NONE, cellState.NONE, cellState.NONE
	];

	console.log("Starting new game...");
}
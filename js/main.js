var game = {
	// Keep track of current states
	turn: 0,
	
	// Record player names and scores
	player: {
		x: {
			name: "Orange",
			wins: 0
		},
		o: {
			name: "Blue",
			wins: 0
		}
	},
	
	// Store the game board in an array
	grid: []
};
var cellState = {
	NONE: "",
	X: "x",
	O: "o"
};

// Set up the game
resetGrid();

// Check if grid cell was clicked
$(".row div").click(function(event) {
	var cell = $(event.target).attr("id");

	// Make sure cell is clear
	if (!document.getElementById("overwrite_mode").checked) {
		if (isCellAssigned(cell)) {
			console.warn("Cell is already assigned");
			return false;
		}
	}

	// Check if game turn is even (x's turn)
	if (game.turn % 2 == 0) {
		setCell(cell, cellState.X);
	} else {
		setCell(cell, cellState.O);
	}
});

function setCell(cell, value) {
	// Set the value in the grid array
	game.grid[cell] = value;

	// Check if in winning state
	// TODO crude, please update ASAP
	if (
		game.grid[0] + game.grid[1] + game.grid[2] == "xxx" ||
		game.grid[3] + game.grid[4] + game.grid[5] == "xxx" ||
		game.grid[6] + game.grid[7] + game.grid[8] == "xxx" ||
		
		game.grid[0] + game.grid[3] + game.grid[6] == "xxx" ||
		game.grid[1] + game.grid[4] + game.grid[7] == "xxx" ||
		game.grid[2] + game.grid[5] + game.grid[8] == "xxx" ||
		
		game.grid[0] + game.grid[4] + game.grid[8] == "xxx" ||
		game.grid[2] + game.grid[4] + game.grid[6] == "xxx"
	) {
		winGame(game.player.x);
		return;
	} else if (
		game.grid[0] + game.grid[1] + game.grid[2] == "ooo" ||
		game.grid[3] + game.grid[4] + game.grid[5] == "ooo" ||
		game.grid[6] + game.grid[7] + game.grid[8] == "ooo" ||
		
		game.grid[0] + game.grid[3] + game.grid[6] == "ooo" ||
		game.grid[1] + game.grid[4] + game.grid[7] == "ooo" ||
		game.grid[2] + game.grid[5] + game.grid[8] == "ooo" ||
		
		game.grid[0] + game.grid[4] + game.grid[8] == "ooo" ||
		game.grid[2] + game.grid[4] + game.grid[6] == "ooo"
	) {
		winGame(game.player.o);
		return;
	}

	// Tie condition
	if (game.turn >= 9) {
		winGame();
		return;
	}
	
	nextTurn();
}

function nextTurn() {
	// Check if CPU is up
		if (game.player.o.isCPU) {
			cpuMove();
		}
	game.turn++;
}

function winGame(player) {
	if (player == null) {
		openWindow("#win-screen", "Nobody wins!");
		console.log("Nobody wins!");
	} else {
		player.wins++;
		openWindow("#win-screen", player.name + " wins!");
		console.log(player.name + " wins!");
	}
}

function resetGame() {
	resetGrid();

	var x_name = prompt("X's name:", game.player.x.name);
	var o_name = prompt("O's name:", game.player.o.name);

	game.player.x.name = x_name;
	game.player.o.name = o_name;

	if (o_name == "CPU" || o_name == "cpu") {
		game.player.o.isCPU = true;
	}
}

function resetGrid() {
	game.turn = 0;
	game.grid = [
		[cellState.NONE, cellState.NONE, cellState.NONE],
		[cellState.NONE, cellState.NONE, cellState.NONE],
		[cellState.NONE, cellState.NONE, cellState.NONE]
	];

	console.log("Starting new game...");
}

function draw() {
	// Draw the grid
	game.grid.forEach(function(value, cell) {
		$("#" + cell).removeClass("x o");
		$("#" + cell).addClass(game.grid[cell]);
	});

	$("#turn_count").html("turn " + game.turn);
	$("#players").html("<span class='x'>" + game.player.x.name + "</span> - " + game.player.x.wins + "<br><span class='o'>" + game.player.o.name + "</span>" + " - " + game.player.o.wins);
	$("#current_player").html((game.turn % 2 == 0 ? "<span class='x'>" + game.player.x.name : "<span class='o'>" + game.player.o.name) + "</span>'s turn");
}
setInterval(draw, 20);

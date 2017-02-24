var game = {
	turn: 0,
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

	if (game.turn % 2 == 0) {
		setCell(cell, cellState.X);
	} else {
		// Check if versus computer
			cpuMove();
		} else {
			setCell(cell, cellState.O);
		}
	}
});

// Run computer opponent move
function cpuMove() {
	var randomCell = Math.floor(Math.random()*8);

	// Select a random cell
	if (!isCellAssigned(randomCell)) {
		setCell(randomCell, cellState.O);
	} else {
		cpuMove();
		console.warn("CPU tried placing in assigned cell");
	}
}

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
		game.grid[2] + game.grid[4] + game.grid[8] == "xxx"
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
		game.grid[2] + game.grid[4] + game.grid[8] == "ooo"
	) {
		winGame(game.player.o);
		return;
	}

	// Tie condition
	if (game.grid.every(function(cell) {
		return cell == cellState.X || cell == cellState.O;
	})) {
		winGame();
		return;
	}

	game.turn++;
}

function isCellAssigned(cell) {
	return (game.grid[cell] == cellState.X || game.grid[cell] == cellState.O);
}

function winGame(player) {
	if (player == null) {
		resetGrid();
		console.log("Nobody wins!");
	} else {
		player.wins++;
		resetGrid();
		console.log(player.name + " wins!");
	}
}

function resetGame() {
	resetGrid();

	var x_name = prompt("X's name:", game.player.x.name);
	var o_name = prompt("O's name:", game.player.o.name);

	game.player.x.name = x_name;
	game.player.o.name = o_name;

	}
}

function resetGrid() {
	game.turn = 0;
	game.grid = [
		cellState.NONE, cellState.NONE, cellState.NONE,
		cellState.NONE, cellState.NONE, cellState.NONE,
		cellState.NONE, cellState.NONE, cellState.NONE
	];
}

function draw() {
	// Draw the grid
	game.grid.forEach(function(value, cell) {
		$("#" + cell).removeClass("x o");
		$("#" + cell).addClass(game.grid[cell]);
	});

	$("#turn_count").html("turn <b>" + game.turn + "</b>");
	$("#players").html("<span class='x'>" + game.player.x.name + "(" + game.player.x.wins + ")" + "</span> vs <span class='o'>" + game.player.o.name + "(" + game.player.o.wins + ")" + "</span>");
	$("#current_player").html((game.turn % 2 == 0 ? "<span class='x'>" + game.player.x.name : "<span class='o'>" + game.player.o.name) + "</span>'s turn");
}
setInterval(draw, 20);

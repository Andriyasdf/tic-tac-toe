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
	game.turn % 2 == 0 ? setCell($(event.target).attr("id"), cellState.X) : setCell($(event.target).attr("id"), cellState.O);
});

function setCell(cell, value) {
	if (!document.getElementById("overwrite_mode").checked) {
		// Make sure cell is clear
		if (game.grid[cell] == cellState.X || game.grid[cell] == cellState.O) {
			return false;
		}
	}

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
	}

	game.turn++;
}

function winGame(player) {
	player.wins++;
	resetGrid();
	console.log(player.name + " wins!");
}

function resetGame() {
	var x_name = prompt("X's name:", game.player.x.name);
	var o_name = prompt("O's name:", game.player.o.name);

	game.player.x.name = x_name;
	game.player.o.name = o_name;

	resetGrid();
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
	for (var j = 0; j < game.grid.length; ++j) {
		$("#" + j).removeClass("x o");
		$("#" + j).addClass(game.grid[j]);
	}

	$("#players").html("<span class='x'>" + game.player.x.name + "(" + game.player.x.wins + ")" + "</span> vs <span class='o'>" + game.player.o.name + "(" + game.player.o.wins + ")" + "</span>");
	$("#turn_count").html("<b>turn: </b>" + game.turn);
	$("#current_player").html((game.turn % 2 == 0 ? "<span class='x'>" + game.player.x.name : "<span class='o'>" + game.player.o.name) + "</span>'s turn");
}
setInterval(draw, 20);

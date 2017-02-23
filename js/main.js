var game = {
	turn: 0,
	player: {
		x: {
			name: "Orange"
		},
		o: {
			name: "Blue"
		}
	},
	grid: [
		"", "", "",
		"", "", "",
		"", "", ""
	]
};
var cellState = {
	NONE: "",
	X: "x",
	O: "o"
};


// Check if grid cell was clicked
$(".row div").click(function(event) {
	if (game.turn % 2 == 0) {
		setCell(event.target, cellState.X);
	} else {
		setCell(event.target, cellState.O);
	}
});

// Reset the board, but save the player setup
function newGame() {
	// Reset the cells
	for (var i = 0; i < game.grid.length; ++i) {
		$("#" + i).removeClass("x o");
		$("#" + i).addClass(game.grid[i]);
	}

	game.turn = 0;
	game.grid = [
		"", "", "",
		"", "", "",
		"", "", ""
	];
}

// Reset everything
function resetGame() {
	newGame();

	game.player.x.name = prompt("Player 1's name:", game.player.x.name);
	game.player.o.name = prompt("Player 2's name:", game.player.o.name);
}

function setCell(cell, value) {
	// Make sure cell is clear
	if ($(cell).hasClass("x") || $(cell).hasClass("o")) {
		return false;
	}

	// Set the value in the grid array
	game.grid[$(cell).attr("id")] = value;

	// Check if in winning state
	// NOTE: we can use magic squares for this :)
	if (game.grid[0] == game.grid[1] == game.grid[2] == cellState.X) {
		console.log("X wins!");
	}

	console.log(game.grid);
	game.turn++;
}

function draw() {
	// Draw the grid
	for (var j = 0; j < game.grid.length; ++j) {
		$("#" + j).removeClass("x o");
		$("#" + j).addClass(game.grid[j]);
	}

	$("#players").html("<span class='x'>" + game.player.x.name + "</span> vs <span class='o'>" + game.player.o.name + "</b>");
	$("#turn_count").html("<b>turn - </b>" + game.turn);
	$("#current_player").html(game.turn % 2 == 0 ? "<span class='x'>" + game.player.x.name + "'s turn</span>" : "<span class='o'>" + game.player.o.name + "'s turn</span>");
}
setInterval(draw, 20);

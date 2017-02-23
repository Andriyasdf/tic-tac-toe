var game = {
	turn: 0,
	players: {
		0: {
			name: "John"
		},
		1: {
			name: "Billy"
		}
	},
	cells: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]
};

// Check if grid cell was clicked
$(".row div").click(function(event) {
	if (game.turn % 2 == 1) {
		setCell(event.target, "x");
	} else {
		setCell(event.target, "o");
	}
});


function newGame() {
	// Reset the cells
	for (var i = 0; i < 9; ++i) {
		$(".row div").removeClass("x o");
	}
	console.log("New game initialized");
}

function setCell(cell, value) {
	if ($(cell).hasClass("x") || $(cell).hasClass("o")) {
		console.log("Cell already assigned!");
		return false;
	}

	$(cell).removeClass("x o");
	$(cell).addClass(value);


	game.turn++;
}

function draw() {
	$("#current_player").html(game.turn % 2 ? "<b><span class='x'><i class='fa fa-times'></i></span>'s turn</b>" : "<b><span class='o'><i class='fa fa-circle'></i></span>'s turn</b>");
	$("#turn_count").html("<b>turn - </b>" + game.turn);
	$("#players").html("<b>" + game.players[0].name + "</b> vs <b>" + game.players[1].name + "</b>");
}
setInterval(draw, 16);

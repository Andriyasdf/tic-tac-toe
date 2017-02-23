var game = {
	turn: 0,
	players: {
		0: {
			name: "John"
		},
		1: {
			name: "Billy"
		}
	}
};

// Check if grid cell was clicked
$(".row div").click(function(event) {
	if (game.turn % 2 == 1) {
		setCell(event.target, "x");
	} else {
		setCell(event.target, "o");
	}
});

setInterval(draw, 16);


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
}

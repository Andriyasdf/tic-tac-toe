function openWindow(id, content) {
	$("#winner").html(content);
	$(id).addClass("active");
	console.log("window");
}

function closeWindow() {
	$("#win-screen").removeClass("active");
}

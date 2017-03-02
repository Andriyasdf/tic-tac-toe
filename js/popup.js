function openWindow(id, content) {
	$("#winner").html(content);
	$(id).addClass("active");
}

function closeWindow() {
	$("#win-screen").removeClass("active");
}

// Get Alert markers
	const noteMarker = document.querySelectorAll('.markdown-alert-note .markdown-alert-title');
	const tipMarker = document.querySelectorAll('.markdown-alert-tip .markdown-alert-title');
	const importantMarker = document.querySelectorAll('.markdown-alert-important .markdown-alert-title');
	const cautionMarker = document.querySelectorAll('.markdown-alert-caution .markdown-alert-title');
	const warningMarker = document.querySelectorAll('.markdown-alert-warning .markdown-alert-title');
// Set Note alert icon
	noteMarker.forEach(marker => {
		marker.style.setProperty("--note-img", `url('{{ "journal-bookmark" |> icon("bootstrap") }}')`)
	});
// Set Tip alert icon
	tipMarker.forEach(marker => {
		marker.style.setProperty("--tip-img", `url('{{ "lightbulb" |> icon("bootstrap") }}')`)
	});
// Set Important alert icon
	importantMarker.forEach(marker => {
		marker.style.setProperty("--important-img", `url('{{ "bell" |> icon("bootstrap") }}')`)
	});
// Set Caution alert icon
	cautionMarker.forEach(marker => {
		marker.style.setProperty("--caution-img", `url('{{ "exclamation-triangle" |> icon("bootstrap") }}')`)
	});
// Set Warning alert icon
	warningMarker.forEach(marker => {
		marker.style.setProperty("--warning-img", `url('{{ "skull" |> icon("phosphor") }}')`)
	});
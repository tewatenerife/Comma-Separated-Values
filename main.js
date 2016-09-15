var template = `<table id="result" class="center">
         <% _.each(items, function(name) { %>
           <tr class="<%= name.rowClass %>">
             <% _.each(name.value, function(cell) { %>
               <td><%= cell %></td>
             <% }); %>
           </tr>
         <% }); %>
       </table>`;

function dump(fileName) {
	$.get(fileName, function(data) {
		$("#original").val(data);
	});
}

function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files;	// FileList object
	var reader = new FileReader();

	reader.onload = function(e) {
		var content = e.target.result;
		$("#original").val(content);
	};

	// files is a FileList of File objects. List some properties.
	// We'll just read the first File object.
	reader.readAsText(files[0]);
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

$(document).ready(function() {
	// If the browser supports localStorage and we have some stored data
	if (window.localStorage && localStorage.original)
		original.value = localStorage.original;

	$("#sendbutton").click( function(event) {
		var original = document.getElementById("original").value;
		if (window.localStorage) localStorage.original = original;

		event.preventDefault();
		$.get("/csv",
			{ input: original },
			function(data) {
				$("#finaltable").html(_.template(template, { items: data.items }));
			},
			'json'
		);
	});

	$(".examplesbuttons button").click( function(event) {
		var id = this.id;
		dump("examples/" + id + ".txt");
	});

	// Setup the drag and drop listeners.
	var dropZone = document.getElementById('original');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);
});
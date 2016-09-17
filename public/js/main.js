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

	var files = evt.target.files;	// FileList object
	var reader = new FileReader();

	reader.onload = function(e) {
		var content = e.target.result;
		$("#original").val(content);
	};

	// files is a FileList of File objects. List some properties.
	// We'll just read the first File object.
	reader.readAsText(files[0]);
}

function handleDropFileSelect(evt) {
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

function updateButtons() {
	$.get('/mongo', function(docs) {
		// Cleaning the container div
		$(".examplesbuttons").html('');
		docs.forEach( function(doc) {
			var buttonName = doc.name;
			console.log("doc.name: " + buttonName);
			var newButton = 
				$('<button type="button" id="' + buttonName + '"><b>' + 
					buttonName + '</b></button>');
			$(".examplesbuttons").append(newButton);
			
			// Setting the handler event
			newButton.click( function(evt) {
				var id = this.id;
				$.get("/mongo/" + id, function(doc) {
					var content = doc[0].content;
					console.log(JSON.stringify(doc));
					$("#original").val(content);
				});
			});
		});
	});
}

$(document).ready(function() {
	// If the browser supports localStorage and we have some stored data
	if (window.localStorage && localStorage.original)
		original.value = localStorage.original;

	updateButtons();

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

	$("#savebutton").click( function() {
		var newInputName = $("#inputName").val();
		var newInputContent = $("#original").val();

		if ((newInputName == "") || (newInputContent == "")) {
			alert("Please, specify a name or a content for the input to be saved.");
			return;
		}

		console.log("newInputName: " + newInputName);
		console.log("newInputContent: " + newInputContent);

		$.get("/save", 
			{ inputName: newInputName, inputContent: newInputContent },
			function(data) {
				console.log(data);
				updateButtons();
			}
		);
	});

	var dropZone = document.getElementById('original');
	var inputfile = document.getElementById('uploadfile');

	// Setup listeners.
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleDropFileSelect, false);
	inputfile.addEventListener('change', handleFileSelect, false);
});
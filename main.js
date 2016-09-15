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
		console.log("you clicked the button " + id);
		dump("examples/" + id + ".txt");
	});
});
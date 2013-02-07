// See http://en.wikipedia.org/wiki/Comma-separated_values
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
function calculate() {
  var result;
  var original       = document.getElementById("original");
  var temp = original.value;
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  var lines = temp.split(/\n+\s*/);
  var r = [];
  var row = "<% _.each(items, function(name) { %> <td><%= name %></td> <% }); %>";

  for(var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp);
    var result = [];
    
    if (m) {
      for(var i in m) {
        var removecomma = m[i].replace(/,\s*$/,'');
        var remove1stquote = removecomma.replace(/^\s*"/,'');
        var removelastquote = remove1stquote.replace(/"\s*$/,'');
        var removeescapedquotes = removelastquote.replace(/\\"/,'"');
        result.push(removeescapedquotes);
      }
      alert(result);
      r.push("<tr>"+_.template(row, {items : result})+"</tr>");
    }
    else {
      alert('ERROR! at row '+i);
    }
  }
  r.unshift('<p>\n<table id="result">');
  r.push('</table>');
  //alert(r.join('\n'));
  converted.innerHTML = r.join('\n');
  // document.write(r.join('\n')); // creates a new HTML page
}

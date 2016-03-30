// See http://en.wikipedia.org/wiki/Comma-separated_values
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function () {
  // If the browser supports localStorage and we have some stored data
  if (window.localStorage && localStorage.original) {
    original.value = localStorage.original;
  }
  $("button").click(main);
});

function calculate(original) {
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  var lines = original.split(/\n+\s*/);
  var commonLength = NaN;
  var r = [];

  for (var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp);
    var result = [];
    var error = false;

    if (m) {
      if (commonLength && (commonLength != m.length)) {
        error = true;
      }
      else {
        commonLength = m.length;
        error = false;
      }
      for (var i in m) {
        var removecomma = m[i].replace(/,\s*$/, '');
        var remove1stquote = removecomma.replace(/^\s*"/, '');
        var removelastquote = remove1stquote.replace(/"\s*$/, '');
        var removeescapedquotes = removelastquote.replace(/\\"/, '"');
        result.push(removeescapedquotes);
      }
      var rowclass = error? 'error' : '';
      r.push({ value: result, rowClass: rowclass });
    }
    else {
      alert('La fila "' + temp + '" no es un valor de CSV permitido.');
      error = true;
    }
    return r;
  }
}

function main() {
  var original = document.getElementById("original");
  if (window.localStorage) localStorage.original = original.value;
  var r = calculate(original.value);
  var template = fillTable.innerHTML;
  finaltable.innerHTML = _.template(template, {items: r});
}

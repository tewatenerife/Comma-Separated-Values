main = function() {
  var original = document.getElementById("original");
  if (window.localStorage) localStorage.original = original.value;
  var r = calculate(original.value);
  var template = fillTable.innerHTML;
  finaltable.innerHTML = _.template(template, {items: r});
};

$(document).ready(function () {
  // If the browser supports localStorage and we have some stored data
  if (window.localStorage && localStorage.original) {
    original.value = localStorage.original;
  }
  $("button").click(main);
});

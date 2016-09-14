main = function() {
  var original = document.getElementById("original").value;
  if (window.localStorage) localStorage.original = original;
  finaltable.innerHTML = fillTable.innerHTML;
  console.log(finaltable.innerHTML);
  console.log(finaltable.innerHTML.table);
};

$(document).ready(function() {
  // If the browser supports localStorage and we have some stored data
  if (window.localStorage && localStorage.original) {
    original.value = localStorage.original;
  }
  
  $("button").click(main);
  main();
});
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
function calculate() {
  var result;
  var original       = document.getElementById("original");
  var temp = original.value;
  var regexp = /"((?:[^"\\]|\\.)*)",?|([^,]+),?|,/g;
  
  var m = temp.match(regexp);
  
  if (m) {
    var result = '';
    for(var i in m) {
      var s1 = m[i].replace(/,$/,'');
      var s2 = s1.replace(/^"/,'');
      var s3 = s2.replace(/"$/,'');
      result += "<li>"+s3+"\n";
    }
    result = "<ol>\n"+result+"</ol>";
    converted.innerHTML = result;
  }
  else {
    converted.innerHTML = 'ERROR! not a CSV string. Try "earth",1, "a1, a2", "moon",9.374,instead';
  }
}

(function(exports) {
  "use strict"; // Use ECMAScript 5 strict mode in browsers that support it
  // See http://en.wikipedia.org/wiki/Comma-separated_values

  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  exports.calculate = function(original) {
    var lines = original.split(/\n+\s*/);
    var commonLength = lines[0].match(regexp).length;
    var r = [];
    var removeQuotes = function(field) {
      var removecomma = field.replace(/,\s*$/, '');
      var remove1stquote = removecomma.replace(/^\s*"/, '');
      var removelastquote = remove1stquote.replace(/"\s*$/, '');
      var removeescapedquotes = removelastquote.replace(/\\"/, '"');
      return removeescapedquotes;
    };

    for (var t in lines) {
      var temp = lines[t];
      var m = temp.match(regexp);
      var result = [];
      var error = false;

      if (m) {
        if (commonLength != m.length) {
          error = true;
        }
        for (var i in m) {
          result.push(removeQuotes(m[i]));
        }
        var rowclass = error? 'error' : '';
        r.push({ value: result, rowClass: rowclass });
      }
      else {
        var errmsg = 'La fila "' + temp + '" no es un valor de CSV permitido.';
        r.push({value: errmsg, rowClass: 'error'});
      }
    }
    return r;
  };
})(this);


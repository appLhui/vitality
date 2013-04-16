(function() {
  define(function(require, exports) {
    exports.reloadForm = function(respond) {
      var key, value, _ref, _results;

      if (respond.suc) {
        _ref = respond.data;
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          _results.push($(this).find('input[name="' + key + '"]').val(value));
        }
        return _results;
      }
    };
    return this.exports;
  });

}).call(this);

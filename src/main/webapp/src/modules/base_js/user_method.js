(function() {
  define(function(require, exports) {
    exports.reloadForm = function(respond) {
      var key, value, _i, _len, _ref, _results;

      if (respond.suc) {
        _ref = respond.data;
        _results = [];
        for (value = _i = 0, _len = _ref.length; _i < _len; value = ++_i) {
          key = _ref[value];
          _results.push($(this).find('input[name="' + key + '"]').val(value));
        }
        return _results;
      }
    };
    return this.exports;
  });

}).call(this);

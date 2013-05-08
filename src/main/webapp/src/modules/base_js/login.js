(function() {
  define(function(require) {
    require('plug-in/validationEngine');
    return $(function() {
      var AppView;

      AppView = Backbone.View.extend({
        el: $('#login'),
        events: {
          "change select.language_select": "onlanguageChange"
        },
        initialize: function() {
          this.language_select = this.$('select.language_select');
          this.form = this.$('form');
          this.url = window.location.href;
          return this.render();
        },
        render: function() {
          this.language_select.find('option[value="' + this.url.split('/')[5] + '"]').attr('selected', 'selected');
          this.form.validationEngine({
            ajaxFormValidation: false
          });
          return this;
        },
        onlanguageChange: function(e) {
          top.location = '../../html/' + e.target.value + '/login.html';
          return this;
        }
      });
      new AppView();
      return this;
    });
  });

}).call(this);

(function() {
  define(function(require, exports) {
    require('plug-in/collapse');
    require('plug-in/dropdown');
    exports.init = function() {
      var TopMenuModel, TopMenuView, topMenuModel, topMenuView;

      TopMenuModel = Backbone.Model.extend({
        url: '../../json/topMenu.json',
        defaults: {
          suc: true,
          errorMsg: null,
          data: {}
        }
      });
      topMenuModel = new TopMenuModel();
      TopMenuView = Backbone.View.extend({
        el: $('#topMenuUl'),
        template: _.template($('#topMenu').html()),
        model: topMenuModel,
        events: {},
        initialize: function() {
          this.model.bind('change', this.render, this);
          return this.model.fetch();
        },
        render: function() {
          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        }
      });
      topMenuView = new TopMenuView();
      return this;
    };
    return this.exports;
  });

}).call(this);

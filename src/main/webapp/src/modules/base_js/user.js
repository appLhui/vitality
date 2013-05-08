(function() {
  define(function(require) {
    var method, topMenu;

    topMenu = require('./topMenu');
    method = require('./user_method');
    require('plug-in/datagrid');
    require('plug-in/daterangepicker');
    require('plug-in/datetimepicker');
    require('plug-in/uploadify');
    require('plug-in/chosen');
    return $(function() {
      var AppView, dataSource;

      dataSource = {
        columns: [
          {
            property: 'customerId',
            label: window.languages.page.userPage.customerID,
            sortable: true
          }, {
            property: 'customerName',
            label: window.languages.page.userPage.customerName,
            sortable: true
          }, {
            property: 'address',
            label: window.languages.page.userPage.address,
            sortable: true
          }, {
            property: 'linkman',
            label: window.languages.page.userPage.linkman,
            sortable: true
          }, {
            property: 'postCode',
            label: window.languages.page.userPage.postCode,
            sortable: true
          }, {
            property: 'phone',
            label: window.languages.page.userPage.phone,
            sortable: true
          }, {
            property: 'email',
            label: window.languages.page.userPage.email,
            sortable: true
          }, {
            property: 'cityName',
            label: window.languages.page.userPage.cityName,
            sortable: true
          }
        ]
      };
      AppView = Backbone.View.extend({
        el: $('#userTable'),
        initialize: function() {
          topMenu.init();
          _.bindAll(this, 'render', 'remove');
          return this.render();
        },
        render: function() {
          $(this.el).find('table').datagrid({
            dataSource: dataSource,
            url: '../customer/users',
            key: 'customerId',
            beforeFormShow: function() {},
            reloadForm: method.reloadForm,
            beforeFormSubmit: function() {}
          });
          $(this.el).find('#daterangepicker').daterangepicker();
          $(this.el).find('#datetimepicker').datetimepicker();
          $(this.el).find('#uploadify').uploadify({
            swf: '../../develop/swf/uploadify.swf'
          });
          $(this.el).find('#chosen').chosen();
          return this;
        },
        remove: function() {
          return $(this.el).remove();
        }
      });
      new AppView();
      return this;
    });
  });

}).call(this);

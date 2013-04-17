(function() {
  define(function(require, exports) {
    var method, topMenu;

    topMenu = require('./topMenu');
    method = require('./user_method');
    return $(function() {
      var AppView, dataSource;

      dataSource = {
        columns: [
          {
            property: 'customerId',
            label: '客户编号',
            sortable: true
          }, {
            property: 'customerName',
            label: '客户名称',
            sortable: true
          }, {
            property: 'address',
            label: '地址',
            sortable: true
          }, {
            property: 'linkman',
            label: '联系人',
            sortable: true
          }, {
            property: 'postCode',
            label: '邮编',
            sortable: true
          }, {
            property: 'phone',
            label: '电话',
            sortable: true
          }, {
            property: 'email',
            label: '邮箱',
            sortable: true
          }, {
            property: 'cityName',
            label: '城市',
            sortable: true
          }
        ]
      };
      AppView = Backbone.View.extend({
        el: $('#userTable'),
        initialize: function() {
          topMenu.init();
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
          return this;
        }
      });
      return new AppView();
    });
  });

}).call(this);

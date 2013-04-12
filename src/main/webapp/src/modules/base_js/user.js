/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-4-11
 * Time: 下午7:57
 * To change this template use File | Settings | File Templates.
 */

define(function (require) {

   var topMenu= require('./topMenu');


    $(document).ready(function () {
        topMenu.init();

        $('#userTable').datagrid({
            dataSource : {
                columns : [ {
                    property : 'customerId',
                    label : '客户编号',
                    sortable : true
                }, {
                    property : 'customerName',
                    label : '客户名称',
                    sortable : true
                }, {
                    property : 'address',
                    label : '地址',
                    sortable : true
                }, {
                    property : 'linkman',
                    label : '联系人',
                    sortable : true
                }, {
                    property : 'postCode',
                    label : '邮编',
                    sortable : true
                }, {
                    property : 'phone',
                    label : '电话',
                    sortable : true
                }, {
                    property : 'email',
                    label : '邮件',
                    sortable : true
                }, {
                    property : 'cityName',
                    label : '城市',
                    sortable : true
                }  ],
                delay : 250
            },
            url : '../customer/users',
            key : 'customerId',
            beforeFormShow : function() {
            },
            reloadForm : function() {
            },
            beforeFormSubmit : function() {
            }
        });
    });

});
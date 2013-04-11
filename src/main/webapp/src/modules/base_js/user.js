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
                    property : 'poster_id',
                    label : '编号',
                    sortable : true
                }, {
                    property : 'poster_title',
                    label : '标题',
                    sortable : true
                }, {
                    property : 'create_date',
                    label : '创建时间',
                    sortable : true,
                    filter : function(v) {
                        return new Date(v).format("yyyy-MM-dd");
                    }
                } ],
                delay : 250
            },
            url : '/posterController/getPageData',
            key : 'poster_id',
            beforeFormShow : function() {
            },
            reloadForm : function() {
            },
            beforeFormSubmit : function() {
            }
        });
    });

});
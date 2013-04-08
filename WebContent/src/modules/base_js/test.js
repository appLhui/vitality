/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-26
 * Time: 下午1:49
 * To change this template use File | Settings | File Templates.
 */



define(function (require) {
//    require('plug-in/util/jQuery');
//    require('plug-in/uploadify');
    require('plug-in/chosen');
    require('plug-in/datagrid');
    require('plug-in/wysihtml5');

    $(document).ready(function () {

        $('#uploadify').uploadify({
            'swf': 'develop/js/base/uploadify.swf',
            'fileSizeLimit':'1000KB'
        });

        $('#chosen').chosen();

        $('#wysihtml5').wysihtml5();

        $('#MyGrid').datagrid({
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
            url : path + '/posterController/getPageData',
            key : 'poster_id',
            beforeFormShow : function() {
            },
            reloadForm : function() {
            },
            beforeFormSubmit : function() {
                alert(234234234)
            }
        });
    });
});
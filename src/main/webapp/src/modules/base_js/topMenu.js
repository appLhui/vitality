/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-26
 * Time: 下午1:49
 * To change this template use File | Settings | File Templates.
 */
define(function (require) {

    require('plug-in/collapse');
    require('plug-in/dropdown');


    $(document).ready(function () {


        var TopMenuModel = Backbone.Model.extend({
            url: '/vitality/WebContent/json/topMenu.json',
            defaults: {
                suc: true,
                errorMsg: null,
                data: {}
            }
        });

        var topMenuModel = new TopMenuModel();

        var TopMenuView = Backbone.View.extend({
            el: $('#topMenuUl'),
            template: _.template($('#topMenu').html()),
            model: topMenuModel,
            events: {
                "click a": "clickMenu"
            },
            initialize: function () {
                this.model.bind('change', this.render, this);
                this.model.fetch();
            },
            render: function () {
                $(this.el).html(this.template(this.model.toJSON()));
                return this;
            },
            clickMenu:function(){
//              alert($(this.el).html());
            }
        });

        var topMenuView = new TopMenuView();


    });
});
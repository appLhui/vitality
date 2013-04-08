/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-27
 * Time: 下午1:42
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
    require('./dropdown');
    require('./validationEngine');
    // add your code
    var Combobox = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.combobox.defaults, options);
        this.$element.on('click', 'a', $.proxy(this.itemclicked, this));
        this.$input = this.$element.find('input:first');
        this.$inputHidden=this.$element.find('input:last');
    };

    Combobox.prototype = {

        constructor: Combobox,

        select: function (val,val_h) {
            $.proxy(this.options.beforeSelect, this.$element).call();
            this.$input.val(val).change();
            this.$inputHidden.val(val_h);
            $.proxy(this.options.afterSelect, this.$element).call();
            return this;
        },

        itemclicked: function (e) {
            this.select($(e.target).text(),$(e.target).attr('value'));
            $('body').click();
            e.preventDefault();
        },

        //添加查询条件
        setReloadDate:function(reloadData){
            this.$element.data('reloadData',reloadData);
        },

        reload:function($this){
            var reloadData=$this.data('reloadData');
            $.ajax({
                type: "POST",
                url: this.options.url,
                data: reloadData,
                dataType:'json',
                success: function(respond){
                    var html='';
                    if (respond.suc) {
                        $.each(respond.data,function(i,o){
                            html+='<li><a href="#" value="'+o.key+'">'+o.value+'</a></li>';
                        });
                        $this.find('button').next().empty().append(html);
                    } else {
                        $this.find('input:first').validationEngine('showPrompt', respond.errorMessage,'load','right',true);
                    }
                }
            });
        }
    };


    // COMBOBOX PLUGIN DEFINITION

    $.fn.combobox = function (option,arg) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('combobox');
            var options = typeof option === 'object' && option;

            if (!data) {
                $this.data('combobox', (data = new Combobox(this, options)));
                if (options.url)
                    $this.find('button').click(function(){
                        data.reload($this);
                    });
            }
            if (typeof option === 'string') data[option](arg);
        });
    };

    $.fn.combobox.defaults = {
        afterSelect:$.noop,
        beforeSelect:$.noop
    };

    $.fn.combobox.Constructor = Combobox;


    // COMBOBOX DATA-API

    $(function () {
        $('body').on('mousedown.combobox.data-api', '.combobox', function (e) {
            var $this = $(this);
            if ($this.data('combobox')) return;
            $this.combobox($this.data());
        });
    });

});

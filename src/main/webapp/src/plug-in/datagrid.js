/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-27
 * Time: 下午1:47
 * To change this template use File | Settings | File Templates.
 */

var StaticDataSource = function(options) {
    this._formatter = options.formatter;
    this._columns = options.columns;
    this._delay = options.delay || 0;
    this._data = options.data;
};

StaticDataSource.prototype = {
    columns : function() {
        return this._columns;
    },
    data : function(options, callback) {
        var self = this;
        setTimeout(function() {
            var data = $.extend(true, [], self._data);
            // SEARCHING
            if (options.search) {
                data = _.filter(data, function(item) {
                    for ( var prop in item) {
                        if (!item.hasOwnProperty(prop))
                            continue;
                        if (~item[prop].toString().toLowerCase()
                            .indexOf(options.search.toLowerCase()))
                            return true;
                    }
                    return false;
                });
            }
            var count = data.length;
            // SORTING
            if (options.sortProperty) {
                data = _.sortBy(data, options.sortProperty);
                if (options.sortDirection === 'desc')
                    data.reverse();
            }
            // PAGING
            var startIndex = options.pageIndex * options.pageSize;
            var endIndex = startIndex + options.pageSize;
            var end = (endIndex > count) ? count : endIndex;
            var pages = Math.ceil(count / options.pageSize);
            var page = options.pageIndex + 1;
            var start = startIndex + 1;
            data = data.slice(startIndex, endIndex);
            if (self._formatter)
                self._formatter(data);
            callback( {
                data : data,
                start : start,
                end : end,
                count : count,
                pages : pages,
                page : page
            });
        }, this._delay)
    }
};


define(function(require, exports, module) {
    require('./combobox');
    require('./modal');
    require('./alert');
    require('./validationEngine');

    var Datagrid = function (element, options) {
        this.$element = $(element);
        this.$thead = this.$element.find('thead');
        this.$footer = this.$element.find('tfoot th');
        this.$footerchildren = this.$footer.children();
        this.$topheader = this.$element.find('thead th');
        this.$pagesize = this.$element.find('.grid-pagesize');
        this.$pageinput = this.$element.find('.grid-pager input');
        this.$pagedropdown = this.$element.find('.grid-pager .dropdown-menu');
        this.$prevpagebtn = this.$element.find('.grid-prevpage');
        this.$nextpagebtn = this.$element.find('.grid-nextpage');
        this.$pageslabel = this.$element.find('.grid-pages');
        this.$countlabel = this.$element.find('.grid-count');
        this.$startlabel = this.$element.find('.grid-start');
        this.$endlabel = this.$element.find('.grid-end');
        this.$search=this.$thead.find('a.search');
        this.$add=this.$thead.find('a.add');
        this.$modify=this.$thead.find('a.modify');
        this.$delete=this.$thead.find('a.delete');
        this.$searchForm=this.$element.next().find('form');
        this.$operateForm=this.$element.next().next().find('form');

        this.$tbody = $('<tbody>').insertAfter(this.$thead);
        this.$colheader = $('<tr>').appendTo(this.$thead);

        this.options = $.extend({}, $.fn.datagrid.defaults, options);
        this.options.dataOptions.pageSize = parseInt(this.$pagesize.val(), 10);
        this.columns = this.options.dataSource.columns();

        this.$nextpagebtn.on('click', $.proxy(this.next, this));
        this.$prevpagebtn.on('click', $.proxy(this.previous, this));
        this.$colheader.on('click', 'th', $.proxy(this.headerClicked, this));
        this.$pagesize.on('change', $.proxy(this.pagesizeChanged, this));
        this.$pageinput.on('change', $.proxy(this.pageChanged, this));
        this.$search.on('click', $.proxy(this.showSearchWin, this));
        this.$add.on('click', $.proxy(this.showWin, this));
        this.$modify.on('click', $.proxy(this.showWin, this));
        this.$delete.on('click', $.proxy(this.showWin, this));

        this.$searchForm.append('<input type="hidden" name="pageIndex" value="0"><input type="hidden" name="pageSize" >').attr({'action':this.options.url});
        this.$searchForm.validationEngine({
            ajaxFormValidationMethod: 'GET',
            onAjaxFormComplete:$.proxy(this.renderHtml, this)
        });

        this.$operateForm.append('<input type="hidden" name="'+this.options.key+'" value="0">');
        this.$operateForm.validationEngine({
            onAjaxFormComplete:$.proxy(this.submitForm, this),
            onBeforeAjaxFormValidation:$.proxy(this.options.beforeFormSubmit,this.$operateForm)
        });

        this.renderColumns();
        this.renderData();
    };

    Datagrid.prototype = {

        constructor: Datagrid,

        renderColumns: function () {
            var self = this;

            this.$footer.attr('colspan', this.columns.length);
            this.$topheader.attr('colspan', this.columns.length);

            var colHTML = '';

            $.each(this.columns, function (index, column) {
                colHTML += '<th data-property="' + column.property + '"';
                if (column.sortable) colHTML += ' class="sortable"';
                colHTML += '>' + column.label + '</th>';
            });

            self.$colheader.append(colHTML);
        },

        updateColumns: function ($target, direction) {
            var className = (direction === 'asc') ? 'icon-chevron-up' : 'icon-chevron-down';
            this.$colheader.find('i').remove();
            this.$colheader.find('th').removeClass('sorted');
            $('<i>').addClass(className).appendTo($target);
            $target.addClass('sorted');
        },

        updatePageDropdown: function (data) {
            var pageHTML = '';

            for (var i = 1; i <= data.pages; i++) {
                pageHTML += '<li><a>' + i + '</a></li>';
            }

            this.$pagedropdown.html(pageHTML);
        },

        updatePageButtons: function (data) {
            if (data.page === 1) {
                this.$prevpagebtn.attr('disabled', 'disabled');
            } else {
                this.$prevpagebtn.removeAttr('disabled');
            }

            if (data.page === data.pages) {
                this.$nextpagebtn.attr('disabled', 'disabled');
            } else {
                this.$nextpagebtn.removeAttr('disabled');
            }
        },
        renderData: function () {
            this.$tbody.html(this.placeholderRowHTML(this.options.loadingHTML));
            this.$footerchildren.hide();
            $.ajax({
                type: 'GET',
                url: this.options.url,
                dataType:'json',
                data: this.options.dataOptions,
                success: $.proxy(this.renderHtml, this)
            });
        },
        reloadForm:function(){
            var $tr= this.$element.find('tbody tr.info');
            if ($tr.length) {
                var data={};
                data[this.options.key]=$tr.find('td[data-property="'+this.options.key+'"]').html();
                this.$operateForm.find('input[name="'+this.options.key+'"]').attr({value:data[this.options.key]});
                $.ajax({
                    type: 'GET',
                    url: this.options.url+'/'+data[this.options.key],
                    data:data,
                    dataType: 'json',
                    success:$.proxy(this.options.reloadForm, this.$operateForm)
                });
            } else {
                this.$element.before('<div class="alert fade in"><button type="button" class="close" data-dismiss="alert">×</button><strong>错误提示!</strong>请先选中一列数据!</div>');
                return true;
            }
        },
        renderHtml:function(){
            var data={};
            if (arguments.length==4) {
                data=arguments[2];
                this.$element.next().modal('hide');
                var dataOptions={};
                $.each(data.post,function(i,o){
                    dataOptions[o.name]=o.value;
                });
                this.options.dataOptions=dataOptions;
            } else {
                data=arguments[0];
            }
            var self=this;
            var itemdesc = (data.count === 1) ? self.options.itemText : self.options.itemsText;
            var rowHTML = '';

            self.$footerchildren.toggle(data.count > 0);

            self.$pageinput.val(data.page);
            self.$pageslabel.text(data.pages);
            self.$countlabel.text(data.count  + itemdesc);
            self.$startlabel.text(data.start);
            self.$endlabel.text(data.end);

            self.updatePageDropdown(data);
            self.updatePageButtons(data);

            $.each(data.data, function (index, row) {
                rowHTML += '<tr>';
                $.each(self.columns, function (index, column) {
                    var tdH=row[column.property]?row[column.property]:'&nbsp;';
                    if (this.filter) tdH=this.filter(tdH);
                    rowHTML += '<td data-property="'+column.property+'" >' + tdH+ '</td>';
                });
                rowHTML += '</tr>';
            });

            if (!rowHTML) rowHTML = self.placeholderRowHTML('0 条记录');

            self.$tbody.html(rowHTML);
            self.$element.trigger('loaded');
            self.$tbody.find('tr').on('click',$.proxy(self.selectTh, self));
            self.$tbody.find('tr').on('dblclick',$.proxy(self.showWin, self));
        },

        placeholderRowHTML: function (content) {
            return '<tr><td style="text-align:center;padding:20px;" colspan="' +
                this.columns.length + '">' + content + '</td></tr>';
        },

        headerClicked: function (e) {
            var $target = $(e.target);
            if (!$target.hasClass('sortable')) return;

            var direction = this.options.dataOptions.sortDirection;
            var sort = this.options.dataOptions.sortProperty;
            var property = $target.data('property');

            if (sort === property) {
                this.options.dataOptions.sortDirection = (direction === 'asc') ? 'desc' : 'asc';
            } else {
                this.options.dataOptions.sortDirection = 'asc';
                this.options.dataOptions.sortProperty = property;
            }

            this.options.dataOptions.pageIndex = 0;
            this.updateColumns($target, this.options.dataOptions.sortDirection);
            this.renderData();
        },

        pagesizeChanged: function (e) {
            this.options.dataOptions.pageSize = parseInt($(e.target).val(), 10);
            this.options.dataOptions.pageIndex = 0;
            this.renderData();
        },

        pageChanged: function (e) {
            this.options.dataOptions.pageIndex = parseInt($(e.target).val(), 10) - 1;
            this.renderData();
            return false;
        },

        previous: function () {
            this.options.dataOptions.pageIndex--;
            this.renderData();
        },

        next: function () {
            this.options.dataOptions.pageIndex++;
            this.renderData();
        },

        selectTh:function(e){
            this.$tbody.find('tr').removeClass('info');
            $(e.delegateTarget).addClass('info');
            return false;
        },


        showSearchWin:function(){
            var $modal=this.$element.next();
            var $form=$modal.find('form');
            $form[0].reset();
            $form.find('input[name="pageSize"]').val(this.options.dataOptions.pageSize);
            this.options.reloadSearchForm(this.$searchForm);
            $modal.modal('show');
            return false;
        },

        showWin:function(e){
            var $modal=this.$element.next().next();
            var $title=$modal.find('div.modal-header>h4');
            $title.empty();
            this.$operateForm.validationEngine('hideAll');
            this.$operateForm[0].reset();
            $.proxy(this.options.beforeFormShow, this.$operateForm)();
            var _id=this.$element.find('tbody tr.info').find('td[data-property="'+this.options.key+'"]').html();
            if ($(e.currentTarget).hasClass('add')) {
                $title.html('添加操作');
                this.$operateForm.attr({action:this.options.url,method:"PUT"});
            } else if($(e.currentTarget).hasClass('delete')){
                if (this.reloadForm()) return false;
                $title.html('删除操作');
                this.$operateForm.attr({action:this.options.url+'/'+_id,method:"DELETE"});
            } else if($(e.currentTarget).hasClass('modify')||$(e.currentTarget).is("tr")){
                if (this.reloadForm()) return false;
                $title.html('修改操作');
                this.$operateForm.attr({action:this.options.url+'/'+_id,method:"POST"});
            }
            this.$search.parent('div').removeClass('open');
            $modal.modal('show');
            return false;
        },
        submitForm:function(){
            var data=arguments[2];
            if (data.suc) {
                var $modal=this.$element.next().next();
                $modal.modal('hide');
                this.renderData();
            } else {
                this.$operateForm.find('div.modal-body').append('<div class="alert fade in"><button type="button" class="close" data-dismiss="alert">×</button><strong>错误提示!</strong>'+data.errorMessage+'</div>');
            }
            return false;
        }
    };


    // DATAGRID PLUGIN DEFINITION

    $.fn.datagrid = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('datagrid');
            var options = typeof option === 'object' && option;

            if (!data){
                options.dataSource=new StaticDataSource(options.dataSource);
                $this.data('datagrid', (data = new Datagrid(this, options)));
            }
            if (typeof option === 'string') data[option]();
        });
    };

    $.fn.datagrid.defaults = {
        dataOptions: { pageIndex: 0, pageSize: 10 },
        loadingHTML: '<div class="progress progress-striped active" style="width:50%;margin:auto;"><div class="bar" style="width:100%;"></div></div>',
        itemsText: '',
        itemText: '',
        key:'',//主键
        beforeFormShow:$.noop,//在表单出现之前
        reloadForm:$.noop,//重载crud操作
        beforeFormSubmit:$.noop,//在表单提交前
        reloadSearchForm:$.noop//重载过滤查询
    };

    $.fn.datagrid.Constructor = Datagrid;
});

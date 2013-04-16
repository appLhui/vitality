define (require, exports) ->
  require 'plug-in/collapse'
  require 'plug-in/dropdown'
  require 'plug-in/datagrid'
  exports.init = ->
    TopMenuModel=Backbone.Model.extend
      url:'../json/topMenu.json'
      defaults:
        suc:true
        errorMsg:null
        data:{}

    topMenuModel=new TopMenuModel();

    TopMenuView=Backbone.View.extend
      el:$('#topMenuUl')
      template: _.template($('#topMenu').html())
      model:topMenuModel
      events:{}
      initialize: ->
        @model.bind 'change',@render,@
        @model.fetch();
      render: ->
        $(@el).html @template @model.toJSON()
        @

    topMenuView = new TopMenuView();
  @exports


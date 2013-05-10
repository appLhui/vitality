define () ->
  $ ->
    TeamModel=Backbone.Model.extend
      url:'../../json/test.json'
      defaults:
        suc:true
        errorMsg:null
        data:{}

    teamModel=new TeamModel();

    TeamView=Backbone.View.extend
      el:$ '#team'
      template: _.template('<% _.each(data,function(data) {%><li><a href=""><h2><%=data.name%></h2><p>价格：<%=data.price%></p><span class="ui-li-count" ><%=data.id%></span></a></li> <% }); %>')
      model:teamModel
      events:{
        'pagebeforeshow':'getData',
        'iscroll_onpullup .iscroll-wrapper':'refreshData'
      }
      initialize: ->
        @list=$(@el).find('div[data-role="content"]>ol')
        @model.bind 'change',@render,@
      render: ->
        @list.append @template @model.toJSON()
        @list.listview 'refresh'
        @
      getData: ->
        @model.fetch()
      refreshData: ->
        @render()

    AddTeamView=Backbone.View.extend
      el:$ '#addTeam'
      events:{

      }
      initialize: ->
        @form=$(@el).find('form')
        @form.validate
          submitHandler:@formSubmit
        @
      render: ->
      formSubmit: ->
        alert 123

    teamView = new TeamView()
    addTeamView =new  AddTeamView()
    @


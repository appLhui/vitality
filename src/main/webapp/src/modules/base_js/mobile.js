(function() {
  define(function() {
    return $(function() {
      var AddTeamView, TeamModel, TeamView, addTeamView, teamModel, teamView;

      TeamModel = Backbone.Model.extend({
        url: '../../json/test.json',
        defaults: {
          suc: true,
          errorMsg: null,
          data: {}
        }
      });
      teamModel = new TeamModel();
      TeamView = Backbone.View.extend({
        el: $('#team'),
        template: _.template('<% _.each(data,function(data) {%><li><a href=""><h2><%=data.name%></h2><p>价格：<%=data.price%></p><span class="ui-li-count" ><%=data.id%></span></a></li> <% }); %>'),
        model: teamModel,
        events: {
          'pagebeforeshow': 'getData',
          'iscroll_onpullup .iscroll-wrapper': 'refreshData'
        },
        initialize: function() {
          this.list = $(this.el).find('div[data-role="content"]>ol');
          return this.model.bind('change', this.render, this);
        },
        render: function() {
          this.list.append(this.template(this.model.toJSON()));
          this.list.listview('refresh');
          return this;
        },
        getData: function() {
          return this.model.fetch();
        },
        refreshData: function() {
          return this.render();
        }
      });
      AddTeamView = Backbone.View.extend({
        el: $('#addTeam'),
        events: {},
        initialize: function() {
          this.form = $(this.el).find('form');
          this.form.validate({
            submitHandler: this.formSubmit
          });
          return this;
        },
        render: function() {},
        formSubmit: function() {
          return alert(123);
        }
      });
      teamView = new TeamView();
      addTeamView = new AddTeamView();
      return this;
    });
  });

}).call(this);

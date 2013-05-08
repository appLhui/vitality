define (require) ->
  require 'plug-in/validationEngine'
  $ ->
    AppView = Backbone.View.extend
      el:$('#login')
      events:
        "change select.language_select": "onlanguageChange"
      initialize: ->
        @language_select=@$ 'select.language_select'
        @form=@$ 'form'
        @url=window.location.href
        @render()
      render: ->
        @language_select.find('option[value="'+@url.split('/')[5]+'"]').attr 'selected','selected'
        @form.validationEngine
          ajaxFormValidation:false
        @
      onlanguageChange:(e) ->
        top.location='../../html/'+e.target.value+'/login.html'
        @

    new AppView()
    @

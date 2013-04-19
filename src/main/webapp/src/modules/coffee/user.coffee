define (require) ->
  topMenu=require './topMenu'
  method=require './user_method'
  require 'plug-in/datagrid'
  require 'plug-in/daterangepicker'
  require 'plug-in/datetimepicker'
  require 'plug-in/uploadify'
  require 'plug-in/chosen'
  $ ->
    dataSource=
      columns: [
        {property: 'customerId'
        label: window.languages.page.customerID
        sortable: true }

        {property: 'customerName'
        label: window.languages.page.customerName
        sortable: true}

        {property: 'address'
        label: window.languages.page.address
        sortable: true}

        {property: 'linkman'
        label: window.languages.page.linkman
        sortable: true}

        {property: 'postCode'
        label: window.languages.page.postCode
        sortable: true}

        {property: 'phone'
        label: window.languages.page.phone
        sortable: true}

        {property: 'email'
        label: window.languages.page.email
        sortable: true}

        {property: 'cityName'
        label: window.languages.page.cityName
        sortable: true}
      ]

    AppView = Backbone.View.extend
      el: $('#userTable')
      initialize: ->
        topMenu.init()
        @render()
      render: ->
        $(@el).find('table').datagrid
          dataSource: dataSource
          url: '../customer/users'
          key: 'customerId'
          beforeFormShow: ->
          reloadForm: method.reloadForm
          beforeFormSubmit: ->
        $(@el).find('#daterangepicker').daterangepicker()
        $(@el).find('#datetimepicker').datetimepicker()
        $(@el).find('#uploadify').uploadify
          swf:'../../../../../vitality/src/main/webapp/develop/js/base/uploadify.swf'
        $(@el).find('#chosen').chosen()
        @

    new AppView()
    @

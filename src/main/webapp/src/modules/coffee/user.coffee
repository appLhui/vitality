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
        label: window.languages.page.userPage.customerID
        sortable: true }

        {property: 'customerName'
        label: window.languages.page.userPage.customerName
        sortable: true}

        {property: 'address'
        label: window.languages.page.userPage.address
        sortable: true}

        {property: 'linkman'
        label: window.languages.page.userPage.linkman
        sortable: true}

        {property: 'postCode'
        label: window.languages.page.userPage.postCode
        sortable: true}

        {property: 'phone'
        label: window.languages.page.userPage.phone
        sortable: true}

        {property: 'email'
        label: window.languages.page.userPage.email
        sortable: true}

        {property: 'cityName'
        label: window.languages.page.userPage.cityName
        sortable: true}
      ]

    AppView = Backbone.View.extend
      el: $('#userTable')
      initialize: ->
        topMenu.init()
        _.bindAll @,'render','remove'
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
          swf:'../../develop/swf/uploadify.swf'
        $(@el).find('#chosen').chosen()
        @
      remove: ->
        $(@el).remove()

    new AppView()
    @

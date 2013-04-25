define (require, exports) ->
  #重新回填 表单信息
  exports.reloadForm= (respond)->
    if respond.suc
      for key,value of respond.data
        $(@).find('input[name="'+key+'"]').val(value);
  exports.add=(a,b) ->
    a+b

  @exports




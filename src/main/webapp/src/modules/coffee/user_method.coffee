define (require, exports) ->
  #重新回填 表单信息
  exports.reloadForm= (respond)->
    if respond.suc
      for key,value in respond.data
        $(@).find('input[name="'+key+'"]').val(value);

  @.exports
/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-27
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
    !function ($) {

        $(function () {

            "use strict"; // jshint ;_;


            /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
             * ======================================================= */

            $.support.transition = (function () {

                var transitionEnd = (function () {

                    var el = document.createElement('bootstrap')
                        , transEndEventNames = {
                            'WebkitTransition' : 'webkitTransitionEnd'
                            ,  'MozTransition'    : 'transitionend'
                            ,  'OTransition'      : 'oTransitionEnd otransitionend'
                            ,  'transition'       : 'transitionend'
                        }
                        , name

                    for (name in transEndEventNames){
                        if (el.style[name] !== undefined) {
                            return transEndEventNames[name]
                        }
                    }

                }())

                return transitionEnd && {
                    end: transitionEnd
                }

            })()

        })

    }(window.jQuery);

});


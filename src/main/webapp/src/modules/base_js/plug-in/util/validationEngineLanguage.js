/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-3-26
 * Time: 下午1:27
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
    (function($){
        $.fn.validationEngineLanguage = function(){
        };
        $.validationEngineLanguage = {
            newLang: function(){
                $.validationEngineLanguage.allRules = {
                    "required": { // Add your regex rules here, you can take telephone as an example
                        "regex": "none",
                        "alertText": window.languages.validationEngineLanguage.required[0],
                        "alertTextCheckboxMultiple": window.languages.validationEngineLanguage.required[1],
                        "alertTextCheckboxe": window.languages.validationEngineLanguage.required[2],
                        "alertTextDateRange": window.languages.validationEngineLanguage.required[3]
                    },
                    "requiredInFunction": {
                        "func": function(field, rules, i, options){
                            return (field.val() == "test") ? true : false;
                        },
                        "alertText": "* Field must equal test"
                    },
                    "dateRange": {
                        "regex": "none",
                        "alertText": window.languages.validationEngineLanguage.dateRange[0],
                        "alertText2": window.languages.validationEngineLanguage.dateRange[1]
                    },
                    "dateTimeRange": {
                        "regex": "none",
                        "alertText": window.languages.validationEngineLanguage.dateTimeRange[0],
                        "alertText2": window.languages.validationEngineLanguage.dateTimeRange[1]
                    },
                    "minSize": {
                        "regex": "none",
                        "alertText": window.languages.validationEngineLanguage.minSize[0],
                        "alertText2": window.languages.validationEngineLanguage.minSize[1]
                    },
                    "maxSize": {
                        "regex": "none",
                        "alertText":  window.languages.validationEngineLanguage.maxSize[0],
                        "alertText2":  window.languages.validationEngineLanguage.maxSize[1]
                    },
                    "groupRequired": {
                        "regex": "none",
                        "alertText":  window.languages.validationEngineLanguage.groupRequired[0]
                    },
                    "min": {
                        "regex": "none",
                        "alertText":  window.languages.validationEngineLanguage.min[0]
                    },
                    "max": {
                        "regex": "none",
                        "alertText":window.languages.validationEngineLanguage.max[0]
                    },
                    "past": {
                        "regex": "none",
                        "alertText": window.languages.validationEngineLanguage.past[0]
                    },
                    "future": {
                        "regex": "none",
                        "alertText": window.languages.validationEngineLanguage.future[0]
                    },
                    "maxCheckbox": {
                        "regex": "none",
                        "alertText":  window.languages.validationEngineLanguage.maxCheckbox[0],
                        "alertText2":  window.languages.validationEngineLanguage.maxCheckbox[1]
                    },
                    "minCheckbox": {
                        "regex": "none",
                        "alertText": window.languages.validationEngineLanguage.minCheckbox[0],
                        "alertText2": window.languages.validationEngineLanguage.minCheckbox[0]
                    },
                    "equals": {
                        "regex": "none",
                        "alertText":  window.languages.validationEngineLanguage.equals[0]
                    },
                    "creditCard": {
                        "regex": "none",
                        "alertText":  window.languages.validationEngineLanguage.creditCard[0]
                    },
                    "phone": {
                        // credit: jquery.h5validate.js / orefalo
                        "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                        "alertText": window.languages.validationEngineLanguage.phone[0]
                    },
                    "email": {
                        // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                        "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                        "alertText": window.languages.validationEngineLanguage.email[0]
                    },
                    "integer": {
                        "regex": /^[\-\+]?\d+$/,
                        "alertText": window.languages.validationEngineLanguage.integer[0]
                    },
                    "number": {
                        // Number, including positive, negative, and floating decimal. credit: orefalo
                        "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                        "alertText": window.languages.validationEngineLanguage.number[0]
                    },
                    "date": {
                        "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                        "alertText":  window.languages.validationEngineLanguage.date[0]
                    },
                    "ipv4": {
                        "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                        "alertText": window.languages.validationEngineLanguage.ipv4[0]
                    },
                    "url": {
                        "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                        "alertText": window.languages.validationEngineLanguage.url[0]
                    },
                    "onlyNumberSp": {
                        "regex": /^[0-9\ ]+$/,
                        "alertText": window.languages.validationEngineLanguage.onlyNumberSp[0]
                    },
                    "onlyLetterSp": {
                        "regex": /^[a-zA-Z\ \']+$/,
                        "alertText": window.languages.validationEngineLanguage.onlyLetterSp[0]
                    },
                    "onlyLetterNumber": {
                        "regex": /^[0-9a-zA-Z]+$/,
                        "alertText": window.languages.validationEngineLanguage.onlyLetterNumber[0]
                    },
                    //tls warning:homegrown not fielded
                    "dateFormat":{
                        "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                        "alertText": window.languages.validationEngineLanguage.dateFormat[0]
                    },
                    //tls warning:homegrown not fielded
                    "dateTimeFormat": {
                        "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                        "alertText": window.languages.validationEngineLanguage.dateTimeFormat[0],
                        "alertText2":  window.languages.validationEngineLanguage.dateTimeFormat[1],
                        "alertText3":  window.languages.validationEngineLanguage.dateTimeFormat[2],
                        "alertText4":  window.languages.validationEngineLanguage.dateTimeFormat[3]
                    }
                };

            }
        };
        $.validationEngineLanguage.newLang();
    })(jQuery);
});
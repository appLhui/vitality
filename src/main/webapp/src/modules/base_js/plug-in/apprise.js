/**
 * Created with JetBrains WebStorm.
 * User: lihui
 * Date: 13-4-17
 * Time: 下午1:21
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, module) {
    function apprise(string, args, callback) {
        var default_args =
        {
            'confirm': false, 		// Ok and Cancel buttons
            'verify': false,		// Yes and No buttons
            'input': false, 		// Text input (can be true or string for default text)
            'animate': false,		// Groovy animation (can true or number, default is 400)
            'textOk': window.languages.apprise.textOk,		// Ok button default text
            'textCancel': window.languages.apprise.textCancel,	// Cancel button default text
            'textYes': window.languages.apprise.textYes,		// Yes button default text
            'textNo': window.languages.apprise.textNo		// No button default text
        }

        if (args) {
            for (var index in default_args) {
                if (typeof args[index] == "undefined") args[index] = default_args[index];
            }
        }

        var aHeight = $(document).height();
        var aWidth = $(document).width();
        $('body').append('<div class="appriseOverlay" id="aOverlay"></div>');
        $('.appriseOverlay').css('height', aHeight).css('width', aWidth).fadeIn(100);
        $('body').append('<div class="appriseOuter"></div>');
        $('.appriseOuter').append('<div class="appriseInner"></div>');
        $('.appriseInner').append(string);
        $('.appriseOuter').css("left", ( $(window).width() - $('.appriseOuter').width() ) / 2 + $(window).scrollLeft() + "px");

        if (args) {
            if (args['animate']) {
                var aniSpeed = args['animate'];
                if (isNaN(aniSpeed)) {
                    aniSpeed = 400;
                }
                $('.appriseOuter').css('top', '-200px').show().animate({top: "100px"}, aniSpeed);
            }
            else {
                $('.appriseOuter').css('top', '100px').fadeIn(200);
            }
        }
        else {
            $('.appriseOuter').css('top', '100px').fadeIn(200);
        }

        if (args) {
            if (args['input']) {
                if (typeof(args['input']) == 'string') {
                    $('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" value="' + args['input'] + '" /></div>');
                }
                else {
                    $('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" /></div>');
                }
                $('.aTextbox').focus();
            }
        }

        $('.appriseInner').append('<div class="aButtons"></div>');
        if (args) {
            if (args['confirm'] || args['input']) {
                $('.aButtons').append('<button class="btn btn-primary" value="ok">' + args['textOk'] + '</button>');
                $('.aButtons').append('<button class="btn " value="cancel">' + args['textCancel'] + '</button>');
            }
            else if (args['verify']) {
                $('.aButtons').append('<button class="btn btn-primary" value="ok">' + args['textYes'] + '</button>');
                $('.aButtons').append('<button class="btn " value="cancel">' + args['textNo'] + '</button>');
            }
            else {
                $('.aButtons').append('<button class="btn btn-primary" value="ok">' + args['textOk'] + '</button>');
            }
        }
        else {
            $('.aButtons').append('<button class="btn btn-primary" value="ok">Ok</button>');
        }

        $(document).keydown(function (e) {
            if ($('.appriseOverlay').is(':visible')) {
                if (e.keyCode == 13) {
                    $('.aButtons > button[value="ok"]').click();
                }
                if (e.keyCode == 27) {
                    $('.aButtons > button[value="cancel"]').click();
                }
            }
        });

        var aText = $('.aTextbox').val();
        if (!aText) {
            aText = false;
        }
        $('.aTextbox').keyup(function () {
            aText = $(this).val();
        });

        $('.aButtons > button').click(function () {
            $('.appriseOverlay').remove();
            $('.appriseOuter').remove();
            if (callback) {
                var wButton = $(this).attr("value");
                if (wButton == 'ok') {
                    if (args) {
                        if (args['input']) {
                            callback(aText);
                        }
                        else {
                            callback(true);
                        }
                    }
                    else {
                        callback(true);
                    }
                }
                else if (wButton == 'cancel') {
                    callback(false);
                }
            }
        });
    }

    $.fn.apprise=function(option){
        return this.each(function () {
            var $this = $(this);
            apprise(option.html,option,option.callback);
        })
    }
});


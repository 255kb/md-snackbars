/* Material Design snackbars and toasts (https://github.com/255kb/md-snackbars | MIT license) */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], function($) {
            return factory($);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        //Node.js or CommonJS
        module.exports = factory(require('jquery'));
    } else {
        //Global
        root.MDSnackbars = factory(root.jQuery ||root.$);
    }
}(this, function ($) {
    'use strict';

    var default_options = {
        text: '',
        toast: false,
        align: 'left',
        fullWidth: false,
        timeout: 3000
    };
    var snackbar = '';
    var timeout;

    var MDSnackbars = {
        init: function() {
            //initialize listener for data attributes and hide on click
            $(document).on('click', '[data-toggle=md-snackbar]', function() {
                var $this = $(this);
                var options = {
                    text: $this.data('text'),
                    toast: $this.data('toast'),
                    align: $this.data('align'),
                    fullWidth: $this.data('full-width'),
                    timeout: $this.data('timeout')
                };
                MDSnackbars.show(options);
            })
            .on('click', '.md-snackbar', function() {
                MDSnackbars.hide(true);
            });
        },
        show: function (options) {
            options = $.extend({}, default_options, options);

            //hide if already exists
            if(snackbar.length > 0) {
                MDSnackbars.hide(true);
            }

            snackbar = $('<div>').addClass('md-snackbar');

            //if full width, do not check other options (toast, align, ...)
            if(options.fullWidth) {
                snackbar.addClass('md-snackbar-full');
            } else {
                //rounded corners
                if(options.toast) {
                    snackbar.addClass('md-toast');
                }
                //alignment
                if(options.align === 'right') {
                    snackbar.addClass('md-snackbar-right');
                } else {
                    snackbar.addClass('md-snackbar-left');
                }
            }

            snackbar.text(options.text).addClass('md-snackbar-shown').appendTo($('body')).fadeIn(300, 'linear');

            if(options.timeout !== 0) {
                timeout = setTimeout(function() {
                    MDSnackbars.hide(false);
                }, options.timeout);
            }
        },
        hide: function() {
            snackbar.fadeOut(300, 'linear', function(){
                this.remove();
            });
            //remove timeout in case we overwrite current snackbar with a new one
            clearTimeout(timeout);
        }
    };
    return MDSnackbars;
}));
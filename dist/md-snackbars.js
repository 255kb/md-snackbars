/* Material Design snackbars and toasts (https://github.com/255kb/md-snackbars | MIT license) */

(function (root, factory) {
    //AMD
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory($);
        });
    }
    //Node.js or CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'));
    }
    //root
    else {
        root.MDSnackbars = factory(root.jQuery ||root.$);
    }
}(this, function ($) {
    'use strict';

    var defaultOptions = {
            text: '',
            toast: false,
            align: 'left',
            fullWidth: false,
            bottom: null,
            timeout: 3000,
            html: false,
            clickToClose: true,
            animation: 'fade'
        },
        animationTypes = ['fade', 'slideup'],
        snackbarsQueue = [],
        currentSnackbar = null,
        addSnackbarToQueue, showSnackbar, hideSnackbar, processQueue, buildSnackbar;


    addSnackbarToQueue = function (snackbar) {
        snackbarsQueue.push(snackbar);
    };

    showSnackbar = function () {
        if(currentSnackbar) {
            currentSnackbar.element.appendTo($('body'));

            if (currentSnackbar.options.timeout !== 0) {
                currentSnackbar.timeout = setTimeout(function () {
                    hideSnackbar();
                }, currentSnackbar.options.timeout);
            }
        }
    };

    hideSnackbar = function () {
        if (!currentSnackbar) {
            return;
        }

        //clear timeout in case we hide before delay (click, MDSnackbar.hide())
        clearTimeout(currentSnackbar.timeout);

        $('.md-snackbar__inner' ,currentSnackbar.element).removeClass('md-snackbar__inner--animated-' + currentSnackbar.options.animation + '-in').addClass('md-snackbar__inner--animated-' + currentSnackbar.options.animation + '-out');

        setTimeout(function () {
            currentSnackbar.element.remove();
            currentSnackbar = null;
            processQueue();
        }, 400);
    };

    processQueue = function () {
        if(!currentSnackbar) {
            var newSnackbar = snackbarsQueue.shift();
            if(!newSnackbar) {
                return;
            }
            currentSnackbar = newSnackbar;
            showSnackbar();
        }
    };

    buildSnackbar = function (options) {
        //create new snackbar element
        var snackbar = {
            element: $('<div>').addClass('md-snackbar'),
            options: $.extend({}, defaultOptions, options)
        };

        var innerElement = $('<div>').addClass('md-snackbar__inner');

        //if full width, do not check other options (toast, align, ...)
        if(snackbar.options.fullWidth) {
            snackbar.element.addClass('md-snackbar--full');
        } else {
            //rounded corners
            if(snackbar.options.toast) {
                innerElement.addClass('md-snackbar__inner--toast');
            } else {
                innerElement.addClass('md-snackbar__inner--rounded');
            }

            //alignment
            if(snackbar.options.align === 'right') {
                snackbar.element.addClass('md-snackbar--right');
            } else {
                snackbar.element.addClass('md-snackbar--left');
            }
        }

        //set bottom positioning
        if(snackbar.options.bottom) {
            snackbar.element.css({bottom: snackbar.options.bottom});
        }

        //inject html or text
        if(snackbar.options.html) {
            innerElement.html(snackbar.options.text);
        } else {
            innerElement.text(snackbar.options.text);
        }

        //check animation type
        if(animationTypes.indexOf(snackbar.options.animation) < 0) {
            snackbar.options.animation = 'fade';
        }

        innerElement.addClass('md-snackbar__inner--animated ' + 'md-snackbar__inner--animated-' + snackbar.options.animation + '-in');

        snackbar.element.append(innerElement);

        return snackbar;
    };

    var MDSnackbars = {
        init: function() {
            //initialize listener for data attributes and hide on click
            $(document).on('click', '[data-toggle=md-snackbar]', function(event) {
                var $this = $(this);
                var options = {
                    text: $this.data('text'),
                    toast: $this.data('toast'),
                    align: $this.data('align'),
                    fullWidth: $this.data('full-width'),
                    bottom: $this.data('bottom'),
                    timeout: $this.data('timeout'),
                    html: $this.data('html'),
                    clickToClose: $this.data('click-close'),
                    animation: $this.data('animation')
                };
                MDSnackbars.show(options);
            })
            .on('click', '.md-snackbar', function(event) {
                // prevent close on clicks on child elements
                if($(event.target).hasClass('md-snackbar__inner')){
                    // only close snackbar if not deactivated
                    if(currentSnackbar.options.clickToClose){
                        hideSnackbar();
                    }
                }
            });
        },
        show: function (options) {
            var newSnackbar = buildSnackbar(options);
            addSnackbarToQueue(newSnackbar);
            processQueue();
        },
        hide: function() {
            hideSnackbar();
        }
    };
    return MDSnackbars;
}));

//export for Meteor
if (typeof Package !== 'undefined') {
    MDSnackbars = this.MDSnackbars;
    delete this.MDSnackbars;
}

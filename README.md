# Snackbars and Toasts based on Google's Material Design

MD Snackbars is a lightweight package allowing to show notification to the user based on Google's Material Design. [View a demo](http://255kb.github.io/md-snackbars/)

See [Google's Material Design specifications](http://www.google.com/design/spec/components/snackbars-toasts.html#snackbars-toasts-specs) for more information about Snackbars.

## Dependencies
- jQuery

## Installation

You can install MD-Snackbars with Bower:

    bower install md-snackbars

or with Meteor:

    meteor add md-snackbars

## How to use

### 1. Init MD-Snackbars

    MDSnackbars.init();

Not needed in order to use `MDSnackbars.show()` and `MDSnackbars.hide()` but needed in order to be able to hide the snackbar on click and show a snackbar using data attributes.
#### For Meteor, be sure to use `MDSnackbars.init();` in your templates `onRendered` callbacks.

### 2. Show/hide a snackbar programmatically

    MDSnackbars.show(options);
    MDSnackbars.hide();

See below for more information about `options`.

### 3. Show a snackbar using data attributes

In order to show a snackbar using data attributes you can use `data-toggle="md-snackbar"` and the following options:

    <button data-toggle="md-snackbar"
    data-toast="false"
    data-align="left"
    data-full-width="false"
    data-timeout="3000"
    data-html="false"
    data-click-close="true">Show</button>

### 4. Default options

Default options are the following:

    var options = {
        toast: false,       // change snackbar's style (true = rounded corners)
        align: 'left',      // align 'left' or 'right'
        fullWidth: false,   // snackbar takes all screen width (overrides align and toast style, also remove default 2px rounded corners)
        timeout: 3000,      // delay before the snackbar disappears (if 0, the snackbar is permanent unless another snackbar is triggered or MDSnackbars.hide() is called)
        html: false ,       // allows HTML insertion
        clickToClose: true  // enable/disable click to close behavior
    };
    MDSnackbars.show(options);

### 5. Behavior

Snackbars are not stackable according to Material Design's specifications. A new snackbar will overwrite the snackbar previously triggered.

Snackbars can be dismissed with a click (be sure to init the plugin with `MDSnackbars.init()`). This behavior can be disabled by using `data-click-close="false"` attribute or the `clickToClose` option.

### TODO
- Add the possibility to include an action in the snackbar
- Bottom position customization


### Changelog

#### v1.2.3:
- Added the Meteor package
- docs update

#### v1.2.4:
- Correct bug that prevented Meteor package to work
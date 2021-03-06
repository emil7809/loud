wp.customize.controlConstructor['kirki-spacing'] = wp.customize.Control.extend({

    ready: function () {

        'use strict';

        var control = this,
            subControls = control.params.choices.controls,
            value = {},
            subsArray = [],
            i;

        _.each(subControls, function (v, i) {
            if (true === v) {
                subsArray.push(i);
            }
        });

        for (i = 0; i < subsArray.length; i++) {

            value[subsArray[i]] = control.setting._value[subsArray[i]];

            control.updateSpacingValue(subsArray[i], value);

        }

    },

    /**
     * Updates the value.
     */
    updateSpacingValue: function (context, value) {

        var control = this;


        var onChange = _.debounce(function(input){

            if (control.setting && control.setting.get()) {
                value = _.clone(control.setting.get());
            }
            value[context] =input.val();

            // Notifications.
            kirkiNotifications(control.id, 'kirki-spacing', control.params.kirkiConfig);

            // Save the value
            control.saveValue(value);

        },500);

        control.container.on('change keyup paste', '.' + context + ' input', function () {
                onChange(jQuery(this));
        });

    },

    /**
     * Saves the value.
     */
    saveValue: function (value) {

        'use strict';

        var control = this,
            newValue = {};

        _.each(value, function (newSubValue, i) {
            newValue[i] = newSubValue;
        });

        control.setting.set(newValue);
    }

});

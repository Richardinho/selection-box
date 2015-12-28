var SSB = SSB || {};

+function () {

    'use strict';

    SSB.SelectWithOptionGroupsView  = function(model) {
        this.model = model;
    }

    SSB.SelectWithOptionGroupsView.prototype = {

        render : function () {

            var select = this.model.getSelectEl();

            this.$el = $('<div>', {
                class : 'select-wrapper'
            });

            this.model.getOptionGroups().forEach(function (optionGroup) {
                this.$el.append(this._createOptionGroup(optionGroup));
            }, this);

            select.hide();
            this.$el.insertAfter(select);

            this.$el.show();

        },

        _createOptionGroup : function (optionGroup) {

            var $optionGroup = $('<div>', { class : 'opt-group '});

            return $optionGroup;
        }
    };
}();
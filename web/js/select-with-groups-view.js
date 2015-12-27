var SSB = SSB || {};

+function () {

    'use strict';

    SSB.SelectWithOptionGroupsView  = function(model) {
        this.model = model;
    }

    SSB.SelectWithOptionGroupsView.prototype = {

        render : function () {
            var select = this.model.getSelectEl();

            this.$el = $('<div class="select-wrapper"></div>');

            select.hide();
            this.$el.insertAfter(select);

            this.$el.show();

        }
    };
}();
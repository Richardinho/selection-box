+function(global) {

    'use strict';

    function SelectionBoxComponent(id, prefix) {

        this.prefix = prefix || 'sb'

        this.selector = '#' + this.prefix + '-' + id;
    }

    SelectionBoxComponent.prototype = {
        getRootId : function () {
            return this._el().getAttribute('id');
        },
        getOptionGroupsNumber : function () {
            return this._el().all(by.css('[data-role=option-group]')).count();
        },
        getDisplayText : function () {
            return this._el().element(by.css('[data-role=display-area]')).getText();
        },
        _el : function () {
            return element(by.css(this.selector));
        }
    };

    global.SelectionBoxComponent = SelectionBoxComponent;

}(global || window);
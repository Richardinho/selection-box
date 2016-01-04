+function(global) {

    'use strict';

    function SelectComponent(id) {

        this.selector = '#' + id;
    }

    SelectComponent.prototype = {
       getOptiongroupsNumber : function () {
           return element.all(by.css(this.selector + ' optgroup')).count();
       },

       getSelectedValue : function () {
           return this._el().element(by.css('option[selected]')).getAttribute('label');
       },
       
       _el : function () {
           return element(by.css(this.selector));
       }
    };

    global.SelectComponent = SelectComponent;

}(global || window);
+function(global) {

    'use strict';

    function VanillaPage(browser, selectionBoxSelector) {
        browser.get('http://localhost:3000/vanilla.html');
    }

    VanillaPage.prototype = {

        getTitle : function() {
            return browser.getTitle();
        },

        getSelectionBoxById : function (id) {
            return new SelectionBoxComponent(id);
        },

        getOriginalSelectById : function(id) {
            return new SelectComponent(id);
        }
    };

    global.VanillaPage = VanillaPage;

}(global || window);
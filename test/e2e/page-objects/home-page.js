+function(global) {

    'use strict';

    function HomePage(browser) {
        browser.get('http://localhost:3000');
    }

    HomePage.prototype = {

        getTitle : function() {
            return browser.getTitle();
        },

        getHeader : function () {
            return element(by.css('h1')).getText();
        }

    };

    global.HomePage = HomePage;
}(global || window);
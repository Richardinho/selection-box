let createMouseTests = require('../mouse.js');
let pageObject = require('../mouse-page-object');

module.exports = {

    mouseTests : function (browser) {

        let mouseTests = createMouseTests();
        mouseTests.openingOptionsBox(pageObject);
        mouseTests.closingOptionsBox(pageObject);
        mouseTests.hoveringOverAnOption(pageObject);
        mouseTests.selectingAnOption(pageObject);

    }
}
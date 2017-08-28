var createMouseTestCases = require('../mouse/test-cases.js');

module.exports = {

    mouseTests : function (client) {

        var mouseTests = createMouseTestCases(client.page.blah());

        mouseTests.openingOptionsBox();
        mouseTests.closingOptionsBox();
        mouseTests.hoveringOverAnOption();
        mouseTests.selectingAnOption();

    }
}
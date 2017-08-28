var createSteps = require('./steps.js');

module.exports = function (pageObject) {

  var steps = createSteps(pageObject);

  return {

    openingOptionsBox: function () {

      pageObject.navigate();

      steps
        .given.theOptionsBoxIsClosed()
        .when.theUserClicksOnTheMainSection()
        .then.theOptionsBoxShouldBeOpen();
    },

    closingOptionsBox: function () {

      steps
        .given.theOptionsBoxIsOpen()
        .when.theUserClicksOutsideTheMainSection()
        .then.theOptionsBoxShouldBeClosed();
    },

    hoveringOverAnOption: function() {

      steps
        .given.theOptionsBoxIsOpen()
        .when.theUserHoversOverAnOption()
        .then.theOptionShouldBeHighlighted();
    },

    selectingAnOption: function() {
      steps
        .given.theOptionsBoxIsOpen()
        .and.theOptionIsNotDisabled()
        .when.theUserClicksOnAnOption()
        .then.theOptionShouldBeSelected()
        .and.theOptionShouldBeInTheDisplayBox();
    }
  };
};
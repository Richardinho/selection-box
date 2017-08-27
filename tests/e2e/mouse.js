module.exports = function () {

  return {

    openingOptionsBox: function (page) {

      page
        .given.theOptionsBoxIsClosed()
        .when.theUserClicksOnTheMainSection()
        .then.theOptionsBoxShouldBeOpen();
    },

    closingOptionsBox: function (page) {

      page
        .given.theOptionsBoxIsOpen()
        .when.theUserClicksOutsideTheMainSection()
        .then.theOptionsBoxShouldBeClosed();
    },

    hoveringOverAnOption: function(page) {

      page
        .given.theOptionsBoxIsOpen()
        .when.theUserHoversOverAnOption()
        .then.theOptionShouldBeHighlighted();
    },

    selectingAnOption: function(page) {
      page
        .given.theOptionsBoxIsOpen()
        .and.theOptionIsNotDisabled()
        .when.theUserClicksOnAnOption()
        .then.theOptionShouldBeSelected()
        .and.theOptionShouldBeInTheDisplayBox();
    }
  };
};
let page = {

    theOptionsBoxIsOpen: function () {
        return this;
    },

    theOptionsBoxIsClosed: function () {
        return this;
    },

    theUserClicksOutsideTheMainSection: function () {
        return this;
    },

    theUserClicksOnTheMainSection: function () {
        return this;
    },

    theUserHoversOverAnOption: function () {
        return this;
    },

    theUserClicksOnAnOption: function () {
        return this;
    },

    theOptionIsNotDisabled: function () {
        return this;
    },

    //  verifications

    theOptionsBoxShouldBeOpen: function () {
        return this;
    },

    theOptionsBoxShouldBeClosed: function () {
        return this;
    },

    theOptionShouldBeHighlighted: function() {
        return this;
    },

    theOptionShouldBeSelected: function () {
        return this;
    },

    theOptionShouldBeInTheDisplayBox: function () {
        return this;
    }
};

page.and = page.when = page.then = page.given = page;

module.exports = page;
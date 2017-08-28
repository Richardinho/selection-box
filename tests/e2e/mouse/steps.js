var page = function (po)  {

    var p = {

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

            po.assert.visible('@requirementsHeader');

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
    p.and = p.when = p.then = p.given = p;
    return p;
};



module.exports = page;
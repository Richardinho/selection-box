describe('_renderOptionGroup()', function () {

    'use strict';

    describe('use case 1', function () {
        var optionGroupEl, optionGroupModel;

        beforeEach(function () {
            optionGroupModel = {
                label : 'option group label',
                disabled : false,
                options : []
            };
            optionGroupEl = _renderOptionGroup(optionGroupModel);
        });

        it('should create opt-group html fragment', function () {
            var expectedHTML = [
                '<div class="option-group">',
                    '<div class="option-group-label">option group label</div>',
                '</div>'
            ].join('');

            expect(optionGroupEl).toEqual($(expectedHTML));
        });
    });




    describe('use case 2: group is disabled', function () {
        var optionGroupEl, optionGroupModel;

        beforeEach(function () {
            optionGroupModel = {
                label : 'option group label',
                disabled : true,
                options : []
            };
            optionGroupEl = _renderOptionGroup(optionGroupModel);
        });

        it('should create opt-group html fragment with class "disabled', function () {
            var expectedHTML = [
                '<div class="option-group disabled">',
                    '<div class="option-group-label">option group label</div>',
                '</div>'
            ].join('');

            expect(optionGroupEl).toEqual($(expectedHTML));
        });
    });
   
});
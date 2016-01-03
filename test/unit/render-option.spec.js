describe('_renderOption()', function () {

    'use strict';

    describe('use case 1', function () {

        var optionEl, parentDisabled, optionModel;
        beforeEach(function () {

            parentDisabled = false;
            optionModel = {
                value : 'test value',
                text : 'test text',
                disabled : false,
                selected : false
            };

            optionEl = _renderOption(optionModel, parentDisabled);
        });

        it('should create option html fragment', function () {

            var expectedHTML = [
                '<a class="option" data-role="option" tabindex="-1" data-value="test value">',
                    'test text',
                '</a>'
            ].join('');

            expect(optionEl).toEqual($(expectedHTML));
        });
    });

    describe('use case 2: parent is disabled', function () {

        var optionEl, parentDisabled, optionModel;
        beforeEach(function () {

            parentDisabled = true;
            optionModel = {
                value : 'test value',
                text : 'test text',
                disabled : false,
                selected : false
            };

            optionEl = _renderOption(optionModel, parentDisabled);
        });

        it('should create option with class "disabled" and no tabindex attribute', function () {

            var expectedHTML = [
                '<a class="option disabled" data-role="option" data-value="test value">',
                    'test text',
                '</a>'
            ].join('');
            
            expect(optionEl).toEqual($(expectedHTML));
        });
    });
    describe('use case 3: option is disabled', function () {

        var optionEl, parentDisabled, optionModel;
        beforeEach(function () {

            parentDisabled = false;
            optionModel = {
                value : 'test value',
                text : 'test text',
                disabled : true,
                selected : false
            };

            optionEl = _renderOption(optionModel, parentDisabled);
        });

        it('should create option with class "disabled" and no tabindex attribute', function () {

            var expectedHTML = [
                '<a class="option disabled" data-role="option" data-value="test value">',
                    'test text',
                '</a>'
            ].join('');
            
            expect(optionEl).toEqual($(expectedHTML));
        });
    });

});
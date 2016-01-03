describe('model for select with optgroups', function () {

    'use strict';

    var html = [
        '<select name="my-select" id="select-with-groups">',
            '<optgroup id="opt-group-a" label="fruit">',
                '<option id="first-option" label="Big Banana">banana</option>',
                '<option id="second-option" value="apple-mac">apple</option>',
                '<option disabled id="third-option">tomato</option>',
            '</optgroup>',
            '<optgroup disabled label="vegetables">',
                '<option>carrot</option>',
                '<option>lettuce</option>',
            '</optgroup>',
        '</select>'
    ].join('');


    beforeEach(function () {
        $('body').append(html);
    });

    afterEach(function () {
        $('#select').remove();
    });

    describe('createOptionModel()', function () {
        var option1, option2, option3;
        beforeEach(function () {
           option1 = createOptionModel($('#first-option')[0]); 
           option2 = createOptionModel($('#second-option')[0]); 
           option3 = createOptionModel($('#third-option')[0]); 
        });
        it('should return a model representing the option element', function () {
            expect(option1).toEqual({
                value : 'banana',
                text : 'Big Banana',
                disabled : false,
                selected : true
            });
            expect(option2).toEqual({
                value : 'apple-mac',
                text : 'apple',
                disabled : false,
                selected : false
            });
            expect(option3).toEqual({
                value : 'tomato',
                text : 'tomato',
                disabled : true,
                selected : false
            });
        });
    });

    describe('createGroupModel()',  function () {
        var group;
        beforeEach(function () {
            group = createGroupModel($('#opt-group-a')[0]);
        });
        it('should return a model representing the optgroup element', function () {
            expect(group).toEqual({
                label : 'fruit',
                disabled : false,
                options : [{
                    value : 'banana',
                    text : 'Big Banana',
                    disabled : false,
                    selected : true
                },{
                    value : 'apple-mac',
                    text : 'apple',
                    disabled : false,
                    selected : false
                },{
                    value : 'tomato',
                    text : 'tomato',
                    disabled : true,
                    selected : false
                }]
            });
        });
    });

    describe('createSelectModel()', function () {
        var select;
        beforeEach(function () {
            select = createSelectModel($('#select-with-groups')[0]);
        });
        it('should return a model representing the select element', function () {
            expect(select).toEqual({
                hasOptGroups : true,
                selectedValue : 'blah',
                autofocus : false,
                disabled : false,
                form : null,
                multiple : false,
                name : 'my-select',
                required : false,
                //  globals
                accesskey: '',
                dir : '',
                lang : '',
                tabindex : '',
                translate : '',
                groups : [{
                    label : 'fruit',
                    disabled : false,
                    options : [{
                        value : 'banana',
                        text : 'Big Banana',
                        disabled : false,
                        selected : true
                    },{
                        value : 'apple-mac',
                        text : 'apple',
                        disabled : false,
                        selected : false
                    },{
                        value : 'tomato',
                        text : 'tomato',
                        disabled : true,
                        selected : false
                    }]
                },{
                    label : 'vegetables',
                    disabled : true,
                    options : [{
                        value : 'carrot',
                        text : 'carrot',
                        disabled : false,
                        selected : false
                    },{
                        value : 'lettuce',
                        text : 'lettuce',
                        disabled : false,
                        selected : false
                    }]
                }]
            });
        });
    });
});
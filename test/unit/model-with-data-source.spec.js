describe('model with data source', function () {

    'use strict';

    var html = [
        '<select name="my-select" id="select">',
        '</select>'
    ].join('');


    beforeEach(function () {
        $('body').append(html);
    });

    afterEach(function () {
        $('#select').remove();
    });

    describe('get..', function () {
        var dataSource, 
            model;
        beforeEach(function () {
            dataSource = [
                {  text : 'Celtic' },
                {  text : 'Aberdeen', selected : true },
                {  text : 'Dundee' },
                {  text : 'Motherwell' }
            ];

            model = createSelectModel($('#select')[0], dataSource);
        });
        it('should...', function () {
            expect(model.selectedValue).toBe('Aberdeen');
        });
    });
});
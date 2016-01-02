describe('model-utils', function () {

    describe('getSelectedValue()', function () {
        var dataSource, selected;
        beforeEach(function () {
            dataSource = [
                {  text : 'Celtic' },
                {  text : 'Aberdeen', selected : true },
                {  text : 'Dundee' },
                {  text : 'Motherwell' }
            ];
            selected = getSelectedValue(dataSource);
        });
        it('should return selected value', function () {
            expect(selected).toBe('Aberdeen');
        });
    });

    describe('normalizeDataSource()', function () {
        var normalized, dataSource;
        describe('data source is fully defined', function () {
            beforeEach(function () {
                dataSource = [{
                    label : 'apple',
                    value : 'app',
                    text : 'Apple',
                    disabled : false,
                    selected : false
                },{
                    label : 'banana',
                    value : 'ban',
                    text : 'Banana',
                    disabled : false,
                    selected : true
                }];
                normalized = normalizeDataSource(dataSource)
            });
            it('should pass through options', function () {
                expect(normalized).toEqual([{
                    label : 'apple',
                    value : 'app',
                    text : 'Apple',
                    disabled : false,
                    selected : false
                },{
                    label : 'banana',
                    value : 'ban',
                    text : 'Banana',
                    disabled : false,
                    selected : true
                }
                ]);
            });
        });
        describe('When selected property is not present', function() {
            beforeEach(function () {
                dataSource = [{
                    label : 'apple',
                    value : 'app',
                    text : 'Apple',
                    disabled : false
                },{
                    label : 'banana',
                    value : 'ban',
                    text : 'Banana',
                    disabled : false
                }];
                normalized = normalizeDataSource(dataSource)
            });

            it('first options should be selected', function () {
                expect(normalized).toEqual([{
                    label : 'apple',
                    value : 'app',
                    text : 'Apple',
                    disabled : false,
                    selected : true
                },{
                    label : 'banana',
                    value : 'ban',
                    text : 'Banana',
                    disabled : false,
                    selected : false
                }
                ]);
            });
        });
        describe('When data source is array of strings', function() {
            beforeEach(function () {
                dataSource = ['apple', 'banana', 'tomato'];
                normalized = normalizeDataSource(dataSource)
            });

            it('should produce normalized options', function () {
                expect(normalized).toEqual([{
                    label : 'apple',
                    value : 'apple',
                    text : 'apple',
                    disabled : false,
                    selected : true
                },{
                    label : 'banana',
                    value : 'banana',
                    text : 'banana',
                    disabled : false,
                    selected : false
                },{
                    label : 'tomato',
                    value : 'tomato',
                    text : 'tomato',
                    disabled : false,
                    selected : false
                }]);
            });
        });
    });
});
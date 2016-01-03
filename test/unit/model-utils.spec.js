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
                    value : 'app',
                    text : 'apple',
                    disabled : false,
                    selected : false
                },{
                    value : 'ban',
                    text : 'banana',
                    disabled : false,
                    selected : true
                }];
                normalized = normalizeDataSource(dataSource)
            });
            it('should pass through options', function () {
                expect(normalized).toEqual([{
                    value : 'app',
                    text : 'apple',
                    disabled : false,
                    selected : false
                },{
                    value : 'ban',
                    text : 'banana',
                    disabled : false,
                    selected : true
                }
                ]);
            });
        });
        describe('When selected property is not present', function() {
            beforeEach(function () {
                dataSource = [{
                    value : 'app',
                    text : 'apple',
                    disabled : false
                },{
                    value : 'ban',
                    text : 'banana',
                    disabled : false
                }];
                normalized = normalizeDataSource(dataSource)
            });

            it('first option should be selected', function () {
                expect(normalized).toEqual([{
                    value : 'app',
                    text : 'apple',
                    disabled : false,
                    selected : true
                },{
                    value : 'ban',
                    text : 'banana',
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
                    value : 'apple',
                    text : 'apple',
                    disabled : false,
                    selected : true
                },{
                    value : 'banana',
                    text : 'banana',
                    disabled : false,
                    selected : false
                },{
                    value : 'tomato',
                    text : 'tomato',
                    disabled : false,
                    selected : false
                }]);
            });
        });
    });
});
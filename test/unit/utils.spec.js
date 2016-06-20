describe('_toArray()', function () {

    'use strict';
    
    var arrayLike, resultArray;

    describe('_parent()', function () {


				//  todo: write test

    });

    describe('_prev()', function () {


				//  todo: write test

    });

    describe('when array-like is Arguments', function () {
        beforeEach(function() {
            arrayLike = createArrayLike('alpha', 'beta', 'gamma', 'delta'); 
            resultArray = _toArray(arrayLike);
        });

        it('should convert Arguments into Array', function () {
            expect(Object.prototype.toString.call(arrayLike)).toBe('[object Arguments]');
            expect(Object.prototype.toString.call(resultArray)).toBe('[object Array]');
        });
    });

    describe('when array-like  is a NodeList', function () {
        
        beforeEach(function() {
            var html = [
                '<ul id="list">',
                    '<li>alpha</li>',
                    '<li>beta</li>', 
                    '<li>gamma</li>', 
                '</ul>'
            ].join('');
            $(document.body).append($(html))

            arrayLike = document.querySelectorAll('#list li');
            resultArray = _toArray(arrayLike);
        });
        afterEach(function () {
            $('#list').remove();
        });
        it('should convert NodeList into Array', function () {
            expect(Object.prototype.toString.call(arrayLike)).toBe('[object NodeList]');
            expect(Object.prototype.toString.call(resultArray)).toBe('[object Array]');
        });
    });


    function createArrayLike() {
        return arguments;
    }

});
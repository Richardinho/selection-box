describe('SelectWithOptionGroupsView' , function  () {

    var view, model, html;

    beforeEach(function () {
        html = ['<div id="select-stub"></div>'].join('');
        $('body').append(html);
    });

    afterEach(function () {
        $('#select-stub').remove();
    });

    beforeEach(function(){
        model = _getModel();
        view = new SSB.SelectWithOptionGroupsView(model);

    });

    describe('render()', function () {
        beforeEach(function () {
            view.render();
        });
        afterEach(function () {
            $('.select-wrapper').remove();
        });

        it('should add generated view into DOM', function () {
            expect($('.select-wrapper').length).toBe(1);
        });

        it('should have optgroup children', function () {
            expect($('.select-wrapper').children().length).toBe(3);
        });
    });

    function _getModel() {
        return {
            getSelectEl : function () {
                return $('#select-stub');
            }, 
            getOptionGroups : function() {
                return [{}, {}, {}];
            }
        };
    }
});
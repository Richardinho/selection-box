describe('Vanilla Page', function() {
    var vanillaPage;
    beforeEach(function () {
        vanillaPage = new VanillaPage(browser, '#bar');
    });
    it('should have a title', function() {
        expect(vanillaPage.getTitle()).toEqual('Vanilla Example');
    });
    describe('selection box "bar"', function () {
        var selectionBox, 
            originalSelect
        beforeEach(function () {
            selectionBox = vanillaPage.getSelectionBoxById('bar');
            originalSelect = vanillaPage.getOriginalSelectById('bar');
        });
        it('should have id "sb-bar"', function () {
            expect(selectionBox.getRootId()).toBe('sb-bar');
        });
        it('should have same number of option groups as original', function () {
            expect(selectionBox.getOptionGroupsNumber()).toBe(originalSelect.getOptiongroupsNumber());
        });

        describe('display area', function () {
            var originalSelectedValue,
                selectionBoxDisplayValue;
            beforeEach(function () {
                originalSelectedValue = originalSelect.getSelectedValue();
                selectionBoxDisplayValue = selectionBox.getDisplayText();
            });
            it('should display currently selected option', function () {
                expect(originalSelectedValue).toBe(selectionBoxDisplayValue);
            });            
        });

    });
});
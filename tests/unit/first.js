describe('selection box', () => {
    let selectionBox;
    beforeEach(() => {
        selectionBox = new SelectionBox();
    });
    describe('getKeyFromEvent()', () => {
        let key;
        beforeEach(() => {
            key = selectionBox.getKeyFromEvent()
        });
        it ('should...', () => {
            expect(key).toBe('a');
        });
    });
});

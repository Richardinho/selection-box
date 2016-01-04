describe('Home Page', function() {
    var homePage;
    beforeEach(function () {
        homePage = new HomePage(browser);
    });
    it('should have a title', function() {
        expect(homePage.getTitle()).toEqual('Selection Box');
    });
    it('should have a main header', function () {
        expect(homePage.getHeader()).toBe('Selection Box');
    });
});
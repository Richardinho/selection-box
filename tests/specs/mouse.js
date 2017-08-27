module.exports = {
  'Demo test Google' : function (browser) {
    browser
      .url('http://localhost:1500')
      .assert.containsText('#req', 'Requirements')
      .end();
  }
};
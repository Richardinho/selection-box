nightwatch_config = {
  "src_folders" : ["tests/e2e/specs"],
  "output_folder" : "reports",
  "page_objects_path": "tests/e2e/page-objects",
  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        'browserstack.user': 'hunter129',
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        'browserstack.local': true,
        'browser': 'chrome'
      }
    }
  }
};

// Code to copy seleniumhost/port into test settings
for(var i in nightwatch_config.test_settings){
  var config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;

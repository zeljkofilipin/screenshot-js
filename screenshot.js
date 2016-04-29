var webdriver = require('selenium-webdriver');
var fs = require('fs');

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
  return driver.takeScreenshot().then(function(data) {
    fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
      if(err) throw err;
    });
  })
};

driver.get(process.argv[2]);
driver.saveScreenshot('screenshot.png');
driver.quit();

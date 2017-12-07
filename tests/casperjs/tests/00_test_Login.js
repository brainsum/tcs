var LoginPageFile = require('../pages/LoginPage.js');
var loginPage = new LoginPageFile();

var UserPageFile = require('../pages/UserPage.js');
var userPage = new UserPageFile();

casper.test.begin('Test for TCS - Login', function suite(test) {

    loginPage.startOnLoginPage(userConfig.authName, userConfig.authPassword);

    casper.then(function() {
        // casper.echo('Page: ' + casper.getTitle(), 'TRACE');
        // casper.echo('\n' + 'front-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('front-page');
    });

    loginPage.checkPage();

    loginPage.fillForm(userConfig.adminName, userConfig.adminPassword);

    casper.then(function() {
        // casper.echo('\n' + 'login-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('filled_login-page');
    });

    loginPage.submitForm();

    // casper.waitForUrl(/user\/\d*/, function() {
    //     // casper.echo('\n' + 'user-Url: ' + casper.getCurrentUrl(), 'TRACE');
    //     casper.myCapture('user-page');
    // });

    // userPage.checkPage();

    // userPage.manageContent();

    casper.waitForUrl(siteConfig.contentURL,
        function then() {
            casper.echo('\n' + 'content-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('content-page');
        },
        function onWaitTimeout() {
            casper.myCapture('content-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        10000
    );

    casper.run(function() {
        casper.test.done();
    });

});

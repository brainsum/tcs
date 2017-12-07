function LoginPage() {

    this.startOnLoginPage = function (httpAuthNames, httpAuthPass) {
        casper.start(siteConfig.loginURL);
        casper.setHttpAuth(httpAuthNames, httpAuthPass);
    };

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertExists('#user-login-form');
        });
    };

    this.fillForm = function (username, password) {
        casper.then(function () {
            this.fill('form#user-login-form', {
                'name': username,
                'pass': password
            }, false);
        });
    };

    this.submitForm = function () {
        casper.then(function () {
            this.click('#edit-submit', 'Log in button clicked.');
        });
    };

}

module.exports = LoginPage;

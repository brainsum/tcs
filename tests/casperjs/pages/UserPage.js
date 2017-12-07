function UserPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertSelectorHasText('h4.label', 'Member for');
            casper.test.assertSelectorHasText('#toolbar-item-user', userConfig.adminName);
        });
    };

    this.manageContent = function() {
        casper.then(function () {
            // casper.test.assertExists('#toolbar-item-administration');
            // this.click('#toolbar-item-administration', 'Manage - clicked.');
            this.click('#toolbar-link-system-admin_content', 'Content - clicked.');
        });
    };

}

module.exports = UserPage;

var EditPageFile = require('../pages/EditPage.js');
var editPage = new EditPageFile();

casper.test.begin('Test for EditPage_Clone', function suite(test) {

    // casper.thenOpen(siteConfig.contentEditURL, function() {
    casper.thenOpen(siteConfig.siteURL + 'node/' + nid + '/edit', function() {
        casper.echo('\n' + 'contentEdit-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('contentEdit-page');
    });

    editPage.checkPage();

    editPage.checkPageTabs();

    editPage.checkEditPagePart();

    editPage.checkNotEmptyPage();

    editPage.checkPublishedStatus();

    editPage.checkEditPageSidebar();

    editPage.nodeClone();

    // redirect to the clone/prepopulate
    casper.waitForUrl(/node\/\d*\/clone\/prepopulate/,
        function then() {
            casper.echo('\n' + 'clone-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.test.assertExists('#edit-langcode-0-value');
            casper.test.assertSelectorHasText('#edit-langcode-0-value', 'English');
            casper.myCapture('clone-page');
        },
        function onWaitTimeout() {
            casper.myCapture('clone-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        6000
    );

    editPage.checkPage();

    editPage.checkEditPagePart();

    editPage.checkNotEmptyPage();

    editPage.checkEditPageSidebar();

    editPage.saveNode();

    casper.waitForSelector('.messages.messages--status',
        function then() {
            casper.test.assertTextExists('has been created.', 'The clone campaign has been generated.');
            casper.test.assertSelectorHasText('#edit-title-0-value', 'Clone of ' + siteConfig.contentEditTitle);
            casper.myCapture('clone-view-page');
        },
        function onWaitTimeout() {
            casper.myCapture('clone-view-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        12000
    );

    casper.run(function() {
        casper.test.done();
    });

});

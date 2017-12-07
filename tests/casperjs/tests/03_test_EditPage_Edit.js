var EditPageFile = require('../pages/EditPage.js');
var editPage = new EditPageFile();

casper.test.begin('Test for EditPage_Edit', function suite(test) {

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

    editPage.previewNode();

    // redirect to the preview mode
    casper.waitForUrl(/node\/preview\/.*\/full/,
        function then() {
            casper.echo('\n' + 'contentPreview-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('contentPreview-page');
        },
        function onWaitTimeout() {
            casper.myCapture('contentPreview-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        40000
    );

    casper.then(function() {
        casper.click('#edit-backlink', 'Content editing clicked.');
    });

    casper.waitForUrl(/node\/\d*\/edit\?uuid=.*/,
        function then() {
            casper.echo('\n' + 'contentEdit-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('contentEdit-page');
        },
        function onWaitTimeout() {
            casper.myCapture('contentEdit-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        40000
    );

    editPage.changeTitle(siteConfig.contentEditTitle + ' Casper Edit');

    casper.then(function() {
        casper.myCapture('contentEdit-filledTitle-page');
    });

    editPage.saveNode();

    casper.waitForSelector('.messages.messages--status',
        function then() {
            casper.test.assertTextExists('has been updated', 'The node has been updated.');
            casper.test.assertSelectorHasText('#edit-title-0-value', siteConfig.contentEditTitle + ' Casper Edit');
            casper.echo('\n' + 'contentEdit-changedTitle-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('contentEdit-changedTitle-page');
        },
        function onWaitTimeout() {
            casper.myCapture('contentEdit-changedTite-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        10000
    );

    editPage.checkPageTabs();

    casper.run(function() {
        casper.test.done();
    });

});

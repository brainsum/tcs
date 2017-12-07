var EditPageFile = require('../pages/EditPage.js');
var editPage = new EditPageFile();

casper.test.begin('Test for EditPage_Preview links', function suite(test) {

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

    editPage.nodePreviewLinks();

    // redirect to the preview-links
    casper.waitForUrl(/node\/\d*\/preview-links/,
        function then() {
            casper.echo('\n' + 'previewLinks-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.test.assertExists('#edit-previews-en-checkbox');
            casper.test.assertSelectorHasText('.option', 'English (Original language)');
            casper.myCapture('previewLinks-page');
        },
        function onWaitTimeout() {
            casper.myCapture('previewLinks-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        6000
    );

    casper.then(function() {
        casper.click('#edit-previews-en-checkbox', ' English (Original language) clicked.');
    });

    casper.then(function() {
        casper.myCapture('previewLinks-filledEnglishCheckbox-page');
    });

    casper.then(function() {
        casper.click('#edit-actions-generate', 'Generate clicked.');
    });

    casper.waitForSelector('.messages.messages--status',
        function then() {
            casper.test.assertTextExists('1 link has been added', 'The link has been generated.');
            casper.test.assertSelectorHasText('#edit-previews-en-url', 'node/' + nid + '/preview-link/');
            casper.myCapture('previewLinks-generatedLink-page');
        },
        function onWaitTimeout() {
            casper.myCapture('previewLinks-generatedLink-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        6000
    );

    casper.then(function() {
        casper.click('#edit-previews-en-checkbox', ' English (Original language) clicked.');
    });

    casper.then(function() {
        casper.myCapture('previewLinks-filledEnglishCheckbox-page');
    });

    casper.then(function() {
        casper.click('#edit-actions-remove', 'Remove clicked.');
    });

    casper.waitForSelector('.messages.messages--status',
        function then() {
            casper.test.assertTextExists('1 link has been removed', 'The link has been removed.');
            casper.test.assertDoesntExist('#edit-previews-en-url');
            casper.myCapture('previewLinks-removedLink-page');
        },
        function onWaitTimeout() {
            casper.myCapture('previewLinks-generatedLink-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        6000
    );

    casper.run(function() {
        casper.test.done();
    });

});

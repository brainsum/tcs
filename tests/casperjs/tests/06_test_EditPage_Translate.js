var EditPageFile = require('../pages/EditPage.js');
var editPage = new EditPageFile();
var title = '';

casper.test.begin('Test for EditPage_Translate', function suite(test) {

    // casper.thenOpen(siteConfig.contentEditURL, function() {
    casper.thenOpen(siteConfig.siteURL + 'node/' + nid + '/edit', function() {
        casper.echo('\n' + 'contentEdit-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('contentEdit-page');
    });

    editPage.checkPage();

    editPage.checkPageTabs();

    editPage.nodeTranslate();

    // redirect to the revisions
    casper.waitForUrl(/node\/\d*\/translations/,
        function then() {
            casper.echo('\n' + 'contentTranslations-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('contentTranslations-page');
        },
        function onWaitTimeout() {
            casper.myCapture('contentTranslations-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        15000
    );

    casper.then(function() {
        casper.test.assertExists('.block.block-system.block-system-main-block');
        casper.test.assertExists('.block.block-system.block-system-main-block > table > thead');
        casper.test.assertExists('.block.block-system.block-system-main-block > table > tbody');
        casper.test.assertSelectorHasText('.block.block-system.block-system-main-block > table > thead > tr > th', 'Language');
    });

    casper.then(function() {
        casper.clickLabel('Add', 'a');
    });

    casper.waitForUrl(/node\/\d*\/translations\/add\/.*\/.*/,
        function then() {
            casper.echo('\n' + 'addTranslation-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.test.assertExists('.block.block-system.block-system-main-block');
            casper.myCapture('addTranslation-page');
        },
        function onWaitTimeout() {
            casper.myCapture('addTranslation-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        15000
    );

    casper.then(function() {
        title = casper.getElementAttribute('#edit-title-0-value', 'value') + ' CASPER TRANSLATION';
        // casper.echo('title: ' + title, 'TRACE');
        casper.fill('form#node-campaign-form', {
            'title[0][value]': title
        }, false);
        casper.myCapture('addTranslation-changedTitle-page');
    });

    editPage.previewNode();

    // redirect to the preview mode
    casper.waitForUrl(/node\/preview\/.*\/full/,
        function then() {
            casper.echo('\n' + 'contentTranslationPreview-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('contentTranslationPreview-page');
        },
        function onWaitTimeout() {
            casper.myCapture('contentTranslationPreview-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        15000
    );

    casper.then(function() {
        casper.click('#edit-backlink', 'Content editing clicked.');
    });

    casper.waitForUrl(/node\/\d*\/edit\?uuid=.*/,
        function then() {
            casper.echo('\n' + 'contentTranslationEdit-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('contentTranslationEdit-page');
        },
        function onWaitTimeout() {
            casper.myCapture('contentTranslationEdit-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        15000
    );

    editPage.saveNode();

    // redirect to the edit page
    casper.waitForSelector('.messages.messages--status',
        function then() {
            casper.test.assertTextExists('has been updated', 'The node has been updated.');
            casper.test.assertSelectorHasText('#edit-title-0-value', title);
            casper.echo('\n' + 'contentTranslated-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('contentTranslated-page');
        },
        function onWaitTimeout() {
            casper.myCapture('contentTranslated-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        15000
    );

    editPage.checkPageTabs();

    casper.then(function () {
        casper.test.assertExists('#edit-parade-onepage-menu-wrapper'); // Menu
        casper.test.assertExists('#edit-parade-onepage-menu--description'); // New menu link description
        casper.test.assertSelectorHasText('#edit-parade-onepage-menu-add-more', 'New menu link');
        casper.test.assertSelectorHasText('#edit-parade-onepage-sections-wrapper', 'Sections');
    });

    editPage.checkEditPageSidebar();

    casper.run(function() {
        casper.test.done();
    });

});

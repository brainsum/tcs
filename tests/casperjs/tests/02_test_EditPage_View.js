var EditPageFile = require('../pages/EditPage.js');
var editPage = new EditPageFile();

casper.test.begin('Test for EditPage_View', function suite(test) {

    // casper.thenOpen(siteConfig.contentEditURL, function() {
    casper.thenOpen(siteConfig.siteURL + 'node/' + nid + '/edit', function() {
        casper.echo('\n' + 'contentEdit-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('contentEdit-page');
    });

    editPage.checkPage();

    // click the View button
    editPage.viewNode();

    // redirect to the view mode
    casper.waitForUrl(/node\/\d*/, function() {
        casper.echo('\n' + 'contentView-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('contentView-page');
    });

    editPage.checkPageTabs();

    casper.then(function() {
        casper.test.assertExists('a.logo');
       // casper.test.assertExists('.list-reset');
    });

    // casper.then(function() {
    //     //casper.test.assertSelectorHasText('li.campaign-menu-link', 'Head');
    //     casper.click('li.campaign-menu-link a', 'First section clicked');
    // });

    // casper.waitForUrl(/node\/\d*\#.*/,
    //     function then() {
    //         casper.echo('\n' + 'fisrtSection-Url: ' + casper.getCurrentUrl(), 'TRACE');
    //         casper.myCapture('firstSection-page');
    //     },
    //     function onWaitTimeout() {
    //         casper.myCapture('fisrtSection-page-timeout');
    //         casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
    //     },
    //     7000
    // );

    // click the Edit button
    casper.then(function() {
        casper.click('li.tabs__tab:nth-child(2) a', 'Second tab clicked (Edit)');
    });

    // redirect to the edit mode
    casper.waitForUrl(/node\/\d*\/edit/,
        function then() {
            casper.echo('\n' + 'contentEdit-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('contentEdit-page');
        },
        function onWaitTimeout() {
            casper.myCapture('contentEdit-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        7000
    );

    editPage.checkPage();

    casper.run(function() {
        casper.test.done();
    });

});

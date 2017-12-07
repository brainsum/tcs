var EditPageFile = require('../pages/EditPage.js');
var editPage = new EditPageFile();
var nid;
casper.test.begin('Test for TCS - Create node', function suite(test) {

    casper.then(function() {
        casper.clickLabel('Add content', 'a');
    });

    casper.waitForUrl(/node\/add\/campaign/,
        function then() {
            casper.echo('\n' + 'add_content-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('add_content-page');
        },
        function onWaitTimeout() {
            casper.myCapture('add_content-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        6000
    );

    editPage.checkEditPagePart();

    editPage.checkEmptyPage();

    editPage.addTitle(siteConfig.contentEditTitle);

    editPage.addSection_Header();

    casper.waitForSelector('.paragraphs-type.paragraphs-type-header',
        function then() {
            casper.test.assertSelectorHasText('.paragraphs-type.paragraphs-type-header', 'Header');
            casper.myCapture('add_content-page_Header');
        },
        function onWaitTimeout() {
            casper.myCapture('add_content-page_Header-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        10000
    );

    editPage.fillSection_Header('Casper Test Node Header Slogan', 'Casper Test Node Header Title');

    editPage.addSection_Simple();

    casper.waitForSelector('.paragraphs-type.paragraphs-type-simple',
        function then() {
            casper.test.assertSelectorHasText('.paragraphs-type.paragraphs-type-simple', 'Simple');
            casper.myCapture('add_content-page_Simple');
        },
        function onWaitTimeout() {
            casper.myCapture('add_content-page_Simple-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        10000
    );

    editPage.fillSection_Simple('Casper Test Node Simple Title', 'Casper Test Node Simple Content');


    casper.then(function() {
        casper.myCapture('filled_node-page');
    });

    editPage.checkEditPageSidebar();

    editPage.saveNode();

    casper.waitForSelector('.messages.messages--status',
        function then() {
            casper.test.assertTextExists('has been created.', 'The node has been created.');
            casper.test.assertSelectorHasText('#edit-title-0-value', siteConfig.contentEditTitle);
            casper.echo('\n' + 'created_node-page-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('created_node-page');
        },
        function onWaitTimeout() {
            casper.myCapture('created_node-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        20000
    );

    editPage.checkPageTabs();

    // casper.thenOpen(siteConfig.siteURL + 'node/' + 279, function() {
    //     casper.echo('\n' + 'contentEdit-Url: ' + casper.getCurrentUrl(), 'TRACE');
    //     casper.myCapture('contentEdit-page');
    // });

    casper.then(function() {
        var node_url = casper.getCurrentUrl();
        var node_edit = node_url.replace(siteConfig.siteURL + 'node/', '');
        nid = node_edit.replace('/edit', '');
        casper.echo('\n' + 'Nid=' + nid);
        casper.myCapture('newly_created_node-page');
    });

    casper.run(function() {
        casper.test.done();
    });

});

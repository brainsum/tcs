function EditPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertSelectorHasText('#edit-title-0-value', siteConfig.contentEditTitle);
        });
    };

    this.checkPageTabs = function () {
        casper.then(function () {
        casper.test.assertExists('#primary-tabs-title');
        casper.test.assertSelectorHasText('li.tabs__tab', 'View');
        casper.test.assertSelectorHasText('li.tabs__tab', 'Edit');
        casper.test.assertSelectorHasText('li.tabs__tab', 'Clone');
        casper.test.assertSelectorHasText('li.tabs__tab', 'Preview links');
        // casper.test.assertSelectorHasText('li.tabs__tab', 'Revisions');
        casper.test.assertSelectorHasText('li.tabs__tab', 'Translate');
        });
    };

    this.checkEditPagePart = function () {
        casper.then(function () {
            casper.test.assertExists('#edit-langcode-0-value'); // Language selector
            casper.test.assertExists('#edit-parade-onepage-menu-wrapper'); // Menu
            casper.test.assertExists('#edit-parade-onepage-menu--description'); // New menu link description
            casper.test.assertSelectorHasText('#edit-parade-onepage-menu-add-more', 'New menu link');
            casper.test.assertSelectorHasText('.paragraphs-add_more-label', "Add Section");
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-header', 'Header');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-image-text', 'Text & image');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-simple', 'Simple');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-text-boxes', 'Text boxes');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-marketo-form', 'Form');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-images', 'Images');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-parallax', 'Background');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-locations', 'Locations');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-marketo-poll', 'Poll');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-social-links', 'Social links');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-chart-boxes', 'Chart boxes');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-savings-calculator', 'Savings calculator');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-add-more-add-more-button-twitter-feed', 'Twitter feed');
        });
    };

    this.checkEmptyPage = function () {
        casper.then(function () {
            casper.test.assertExists('#edit-parade-onepage-sections-wrapper');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-wrapper', 'No Section added yet.');
        });
    }

    this.checkNotEmptyPage = function () {
        casper.then(function () {
            casper.test.assertExists('#edit-parade-onepage-sections-wrapper');
            casper.test.assertSelectorHasText('#edit-parade-onepage-sections-wrapper', 'Sections');
            casper.test.assertExists('#parade-onepage-sections-0-item-wrapper');
            casper.test.assertSelectorHasText('h1.paragraph__title.field--name-parade-title', 'Casper Test Node Header Title');
            casper.test.assertExists('#parade-onepage-sections-1-item-wrapper');
            casper.test.assertSelectorHasText('h1.paragraph__title.field--name-parade-title', 'Casper Test Node Simple Title');
        });
    }

    this.checkPublishedStatus = function () {
        casper.then(function () {
            casper.test.assertExists('h3.entity-meta__title');
        });
    }

    this.checkEditPageSidebar = function () {
        casper.then(function () {
            casper.test.assertSelectorHasText('#edit-changed--2', 'Last saved');
            casper.test.assertSelectorHasText('#edit-author', 'Author');
            // casper.test.assertSelectorHasText('#edit-revision-log-wrapper', 'Revision log message');
            casper.test.assertSelectorHasText('#edit-field-meta-tags-0', 'Meta tags');
            casper.test.assertSelectorHasText('#edit-path-0', 'URL alias');
        });
    };

    this.changeTitle = function (title) {
        casper.then(function () {
            this.fill('form#node-campaign-edit-form', {
                'title[0][value]': title
            }, false);
        });
    };

    this.addTitle = function (title) {
        casper.then(function () {
            this.fill('form#node-campaign-form', {
                'title[0][value]': title
            }, false);
        });
    };

    this.addSection_Header = function () {
        casper.then(function () {
            this.click('#edit-parade-onepage-sections-add-more-add-more-button-header', 'Header clicked.');
        });
    }

    this.fillSection_Header = function (slogan, title) {
        casper.then(function () {
            this.fill('form#node-campaign-form', {
                'parade_onepage_sections[0][subform][parade_secondary_title][0][value]': slogan,
                'parade_onepage_sections[0][subform][parade_title][0][value]': title
            }, false)
        });

        casper.then(function () {
            this.clickLabel('dam.tieto.com', 'a');
        });

        casper.waitForSelector('.form-image',
            function then() {
                casper.test.assertSelectorHasText('.ui-dialog-title', 'Media library');
                casper.myCapture('add-content-page_Header_MediaLibrary');
            },
            function onWaitTimeout() {
                casper.myCapture('add-content-page_Header_MediaLibrary-timeout');
                casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
            },
            12000
        );

        casper.then(function () {
            // Select the first image
            this.click('.form-image');
        });

        casper.waitForSelector('.file.file--mime-image-jpeg.file--image',
            function then() {
                //casper.test.assertSelectorHasText('.ui-dialog-title', 'Media library');
                casper.myCapture('add-content-page_Header_MediaLibrary_File');
            },
            function onWaitTimeout() {
                casper.myCapture('add-content-page_Header_MediaLibrary_File-timeout');
                casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
            },
            15000
        );
    }

    this.addSection_Simple = function () {
        casper.then(function () {
            this.click('.field-add-more-submit.parade-button.parade-button-simple.button.js-form-submit.form-submit', 'Simple clicked.');
        });
    }

    this.fillSection_Simple = function (title, content) {
        casper.then(function () {
            this.fill('form#node-campaign-form', {
                'parade_onepage_sections[1][subform][parade_title][0][value]': title,
                'parade_onepage_sections[1][subform][parade_text][0][value]': content
            }, false)
        });
    }

    this.viewNode = function () {
        casper.then(function () {
            this.clickLabel('View', 'a');
        });
    };

    this.nodeClone = function () {
        casper.then(function () {
            this.clickLabel('Clone', 'a');
        });
    };

    this.nodePreviewLinks = function () {
        casper.then(function () {
            this.clickLabel('Preview links', 'a');
        });
    };

    this.nodeRevisions = function () {
        casper.then(function () {
            this.clickLabel('Revisions', 'a');
        });
    };

    this.nodeTranslate = function () {
        casper.then(function () {
            this.clickLabel('Translate', 'a');
        });
    };

    this.previewNode = function () {
        casper.then(function() {
            this.click('#edit-preview', 'Preview button clicked.');
        });
    };

    this.saveNode = function () {
        casper.then(function() {
            casper.click('.button.button--primary.js-form-submit.form-submit', 'Save clicked');
        });
    };

}

module.exports = EditPage;

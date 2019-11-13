/**
 * @file
 * Initialize Responsive Tabs scripts.
 */

import 'responsive-tabs'

(function drupalJquery($) {

  $('.r-tabs-container').responsiveTabs({
    startCollapsed: false,
    animation: 'slide',
    duration: 200
  })

})(jQuery);

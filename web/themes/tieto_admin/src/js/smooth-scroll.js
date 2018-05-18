/**
 * @file
 * Smooth Scroll.
 */

(function ($) {

  /**
   * Speed of the smooth scroll.
   *
   * @type {Number}
   */
  const scrollSpeed = 300;

  /**
   * Additional offset in pixels.
   * DON'T worry about Drupal Admin toolbar, it is already calculated in. :)
   *
   *   negative: scroll past the item.
   *   0: stop exactly at the item.
   *   positive: scroll before the item.
   *
   * @type {Number}
   */
  const offset = 73;

  /**
   * Update the hash in the URL without jumping to the element.
   *
   * @param  {String} hash
   * @return {void}
   */
  var updateHash = (hash) => {
    if (history.pushState) {
      history.pushState(null, null, hash);
    }
    else {
      window.location.hash = hash;
    }
    // @fixme temp
    // $('.campaign-menu-link > a.active').removeClass('active')
    // $('a[href="' + hash + '"]').addClass('active')
  };

  /**
   * Applying the animation to all anchors, which have
   * <a href="#my-anchor"> format.
   */
  var smoothScroll = function (e) {
    e.preventDefault();
    updateHash(this.hash);

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      // Calculate admin toolbar height.
      // Both Toolbar and its Tray are 39px in default Drupal theme.
      var headerHeight = 0;
      if ($('body').hasClass('toolbar-horizontal')) {
        headerHeight = 39;
        if ($('body').hasClass('toolbar-tray-open')) {
          headerHeight += 39;
        }
      }

      // Other header Heights.
      var otherHeaderHeight = 0;
      if ($('#parade-edit-moderation-wrapper > form').length > 0) {
        otherHeaderHeight += $('#parade-edit-moderation-wrapper > form').outerHeight(true);
      }

      var target = $(this.hash);

      if (target.offset().top > 490) {
        otherHeaderHeight += 66;
      }
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - headerHeight - otherHeaderHeight - offset
        }, scrollSpeed);
        if ($(window).width() < 768 && $('#hamburger').hasClass('is-active')) {
          $('#hamburger').removeClass('is-active');
        }
        return false;
      }
    }
  };

  $('a[href*="#"]:not([href="#"]):not([href^="#tab-"]):not([href*="/#/"])').on('click', smoothScroll);

})(jQuery);

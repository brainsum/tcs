/**
 * @file
 * Global scripts, loaded on every page.
 */

(function (Drupal, $) {
  'use strict';

  Drupal.behaviors.flyingCTA = {
    attach: function (context, settings) {
      var latestKnownScrollY = 0;
      var ticking = false;
      var $cta = $('.paragraph--type--header .field--name-parade-call-to-action .button').first().once('flying-cta');
      var $fixed = null;
      var isFixed = false;
      var classAfterScroll = 'fly';
      var animatingOut = false;

      function update() {
        // reset the tick so we can
        // capture the next onScroll
        ticking = false;

        var boundingClientRect = $cta[0].getBoundingClientRect();
        var shouldBeFixed = boundingClientRect.top < 50;
        var isMobile = window.innerWidth < 768;

        // Create fixed element if it hasnt been created yet.
        if (shouldBeFixed && !$fixed) {
          createFixed();
        }

        // Fix it.
        if (!isFixed && shouldBeFixed) {
          // Move button in the place of the original, so we can animate it from there.
          $fixed
            .css({
              position: 'fixed',
              top: isMobile ? 'auto' : '50%',
              right: isMobile ? 'auto' : '20px',
              bottom: isMobile ? '0' : 'auto',
              left: isMobile ? 0 : 'auto',
            });

          var fixedBoundingClientRect = getFixedBoundingClientRect();
          var diffX = boundingClientRect.left - fixedBoundingClientRect.left;
          var diffY = boundingClientRect.top - fixedBoundingClientRect.top;
          $fixed.css('transform', 'translateX(' + diffX + 'px) translateY(' + diffY + 'px)');

          isFixed = true;

          setTimeout(function() {
            $fixed
              .css('transform', '')
              .addClass('in')
          });
        }
        // Go back to normal.
        else if(isFixed && !shouldBeFixed && !animatingOut) {
          var fixedBoundingClientRect = getFixedBoundingClientRect();
          animatingOut = true;

          $fixed
            .removeClass('in')
            .css({
              position: 'absolute',
              top: boundingClientRect.top + window.scrollY,
              right: 'auto',
              left: boundingClientRect.left,
              transform: 'translateX(' + (fixedBoundingClientRect.left - boundingClientRect.left) + 'px) translateY(' + (fixedBoundingClientRect.top - boundingClientRect.top) + 'px)'
            });

          setTimeout(function() {
            $fixed
              .css('transform', '')
              .addClass('out');

            $fixed.one('transitionend', function() {
              isFixed = false;
              animatingOut = false;
              boundingClientRect = $cta[0].getBoundingClientRect();

              $fixed
                .removeClass('out')
                .css({
                  position: 'absolute',
                  top: boundingClientRect.top + window.scrollY + 'px',
                  right: 'auto',
                  left: boundingClientRect.left + 'px',
                });
            })
          });
        }
      }

      function createFixed() {
        var $clone = $cta
          .clone()
            .css({
              'padding-top': $cta.css('padding-top'),
              'padding-right': $cta.css('padding-right'),
              'padding-bottom': $cta.css('padding-bottom'),
              'padding-left': $cta.css('padding-left'),
            });

        $cta.css('transition', 'none');
        $cta.css('visibility', 'hidden');

        $fixed = $('<div>')
          .append($clone)
          .addClass('fly')
          .appendTo($('body'));
      }

      function getFixedBoundingClientRect() {
        return $fixed[0].getBoundingClientRect();
      }

      function onScroll() {
        latestKnownScrollY = window.scrollY; //No IE8
        requestTick();
      }

      function requestTick() {
        if (!ticking && $cta.length > 0) {
          window.requestAnimationFrame(update);
        }
        ticking = true;
      }

      window.addEventListener('scroll', onScroll, false);
    }
  };

})(Drupal, jQuery);

/**
 * @file
 * Global scripts, loaded on every page.
 */

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


(function (Drupal, $) {
  'use strict';

  Drupal.behaviors.flyingCTA = {
    attach: function (context, settings) {
      var latestKnownScrollY = 0;
      var ticking = false;
      var $cta = $('.paragraph--type--header .field--name-field-call-to-action').once('flying-cta');
      var classAfterScroll = 'fly';

      function update() {
        // reset the tick so we can
        // capture the next onScroll
        ticking = false;
        $cta.toggleClass(classAfterScroll, latestKnownScrollY > $cta.offset().top - 100);
      }

      function onScroll() {
        latestKnownScrollY = window.scrollY; //No IE8
        requestTick();
      }

      function requestTick() {
        if (!ticking) {
          requestAnimationFrame(update);
        }
        ticking = true;
      }

      window.addEventListener('scroll', onScroll, false);
    }
  };

})(Drupal, jQuery);

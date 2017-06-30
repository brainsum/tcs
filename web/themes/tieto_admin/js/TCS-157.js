(function (exports) {
'use strict';

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
      var $cta = $('.paragraph--type--header .field--name-field-call-to-action .button').first().once('flying-cta');
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
              .addClass('in');
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
            });
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

}((this.LaravelElixirBundle = this.LaravelElixirBundle || {})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9tbnQvZC9waHB0ZXN0L3BhcmFncmFwaHMvd2ViL3RoZW1lcy90aWV0b19hZG1pbi9zcmMvc2NyaXB0cy9UQ1MtMTU3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEdsb2JhbCBzY3JpcHRzLCBsb2FkZWQgb24gZXZlcnkgcGFnZS5cbiAqL1xuXG4oZnVuY3Rpb24gKERydXBhbCwgJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5mbHlpbmdDVEEgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBsYXRlc3RLbm93blNjcm9sbFkgPSAwO1xuICAgICAgdmFyIHRpY2tpbmcgPSBmYWxzZTtcbiAgICAgIHZhciAkY3RhID0gJCgnLnBhcmFncmFwaC0tdHlwZS0taGVhZGVyIC5maWVsZC0tbmFtZS1maWVsZC1jYWxsLXRvLWFjdGlvbiAuYnV0dG9uJykuZmlyc3QoKS5vbmNlKCdmbHlpbmctY3RhJyk7XG4gICAgICB2YXIgJGZpeGVkID0gbnVsbDtcbiAgICAgIHZhciBpc0ZpeGVkID0gZmFsc2U7XG4gICAgICB2YXIgY2xhc3NBZnRlclNjcm9sbCA9ICdmbHknO1xuICAgICAgdmFyIGFuaW1hdGluZ091dCA9IGZhbHNlO1xuXG4gICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIC8vIHJlc2V0IHRoZSB0aWNrIHNvIHdlIGNhblxuICAgICAgICAvLyBjYXB0dXJlIHRoZSBuZXh0IG9uU2Nyb2xsXG4gICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcblxuICAgICAgICB2YXIgYm91bmRpbmdDbGllbnRSZWN0ID0gJGN0YVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHNob3VsZEJlRml4ZWQgPSBib3VuZGluZ0NsaWVudFJlY3QudG9wIDwgNTA7XG4gICAgICAgIHZhciBpc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4O1xuXG4gICAgICAgIC8vIENyZWF0ZSBmaXhlZCBlbGVtZW50IGlmIGl0IGhhc250IGJlZW4gY3JlYXRlZCB5ZXQuXG4gICAgICAgIGlmIChzaG91bGRCZUZpeGVkICYmICEkZml4ZWQpIHtcbiAgICAgICAgICBjcmVhdGVGaXhlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRml4IGl0LlxuICAgICAgICBpZiAoIWlzRml4ZWQgJiYgc2hvdWxkQmVGaXhlZCkge1xuICAgICAgICAgIC8vIE1vdmUgYnV0dG9uIGluIHRoZSBwbGFjZSBvZiB0aGUgb3JpZ2luYWwsIHNvIHdlIGNhbiBhbmltYXRlIGl0IGZyb20gdGhlcmUuXG4gICAgICAgICAgJGZpeGVkXG4gICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgIHRvcDogaXNNb2JpbGUgPyAnYXV0bycgOiAnNTAlJyxcbiAgICAgICAgICAgICAgcmlnaHQ6IGlzTW9iaWxlID8gJ2F1dG8nIDogJzIwcHgnLFxuICAgICAgICAgICAgICBib3R0b206IGlzTW9iaWxlID8gJzAnIDogJ2F1dG8nLFxuICAgICAgICAgICAgICBsZWZ0OiBpc01vYmlsZSA/IDAgOiAnYXV0bycsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBmaXhlZEJvdW5kaW5nQ2xpZW50UmVjdCA9IGdldEZpeGVkQm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgdmFyIGRpZmZYID0gYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgLSBmaXhlZEJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgICAgICAgIHZhciBkaWZmWSA9IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgLSBmaXhlZEJvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG4gICAgICAgICAgJGZpeGVkLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoJyArIGRpZmZYICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyBkaWZmWSArICdweCknKTtcblxuICAgICAgICAgIGlzRml4ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRmaXhlZFxuICAgICAgICAgICAgICAuY3NzKCd0cmFuc2Zvcm0nLCAnJylcbiAgICAgICAgICAgICAgLmFkZENsYXNzKCdpbicpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR28gYmFjayB0byBub3JtYWwuXG4gICAgICAgIGVsc2UgaWYoaXNGaXhlZCAmJiAhc2hvdWxkQmVGaXhlZCAmJiAhYW5pbWF0aW5nT3V0KSB7XG4gICAgICAgICAgdmFyIGZpeGVkQm91bmRpbmdDbGllbnRSZWN0ID0gZ2V0Rml4ZWRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBhbmltYXRpbmdPdXQgPSB0cnVlO1xuXG4gICAgICAgICAgJGZpeGVkXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2luJylcbiAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgdG9wOiBib3VuZGluZ0NsaWVudFJlY3QudG9wICsgd2luZG93LnNjcm9sbFksXG4gICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgIGxlZnQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0LFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKCcgKyAoZml4ZWRCb3VuZGluZ0NsaWVudFJlY3QubGVmdCAtIGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0KSArICdweCkgdHJhbnNsYXRlWSgnICsgKGZpeGVkQm91bmRpbmdDbGllbnRSZWN0LnRvcCAtIGJvdW5kaW5nQ2xpZW50UmVjdC50b3ApICsgJ3B4KSdcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGZpeGVkXG4gICAgICAgICAgICAgIC5jc3MoJ3RyYW5zZm9ybScsICcnKVxuICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ291dCcpO1xuXG4gICAgICAgICAgICAkZml4ZWQub25lKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYW5pbWF0aW5nT3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJvdW5kaW5nQ2xpZW50UmVjdCA9ICRjdGFbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgJGZpeGVkXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdvdXQnKVxuICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICB0b3A6IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyB3aW5kb3cuc2Nyb2xsWSArICdweCcsXG4gICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgbGVmdDogYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgKyAncHgnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjcmVhdGVGaXhlZCgpIHtcbiAgICAgICAgdmFyICRjbG9uZSA9ICRjdGFcbiAgICAgICAgICAuY2xvbmUoKVxuICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICdwYWRkaW5nLXRvcCc6ICRjdGEuY3NzKCdwYWRkaW5nLXRvcCcpLFxuICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6ICRjdGEuY3NzKCdwYWRkaW5nLXJpZ2h0JyksXG4gICAgICAgICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICRjdGEuY3NzKCdwYWRkaW5nLWJvdHRvbScpLFxuICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0JzogJGN0YS5jc3MoJ3BhZGRpbmctbGVmdCcpLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAkY3RhLmNzcygndHJhbnNpdGlvbicsICdub25lJyk7XG4gICAgICAgICRjdGEuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXG4gICAgICAgICRmaXhlZCA9ICQoJzxkaXY+JylcbiAgICAgICAgICAuYXBwZW5kKCRjbG9uZSlcbiAgICAgICAgICAuYWRkQ2xhc3MoJ2ZseScpXG4gICAgICAgICAgLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldEZpeGVkQm91bmRpbmdDbGllbnRSZWN0KCkge1xuICAgICAgICByZXR1cm4gJGZpeGVkWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICAgICAgbGF0ZXN0S25vd25TY3JvbGxZID0gd2luZG93LnNjcm9sbFk7IC8vTm8gSUU4XG4gICAgICAgIHJlcXVlc3RUaWNrKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlcXVlc3RUaWNrKCkge1xuICAgICAgICBpZiAoIXRpY2tpbmcpIHtcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgZmFsc2UpO1xuICAgIH1cbiAgfTtcblxufSkoRHJ1cGFsLCBqUXVlcnkpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7OztBQUtBLENBQUMsVUFBVSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0VBQ3BCLFlBQVksQ0FBQzs7RUFFYixNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRztJQUMz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
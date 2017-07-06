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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9rZWV0ZWVhbi9TaXRlcy9wcm9qZWN0cy9icmFpbnN1bS90Y3Mvd2ViL3RoZW1lcy90aWV0b19hZG1pbi9zcmMvc2NyaXB0cy9UQ1MtMTU3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEdsb2JhbCBzY3JpcHRzLCBsb2FkZWQgb24gZXZlcnkgcGFnZS5cbiAqL1xuXG4oZnVuY3Rpb24gKERydXBhbCwgJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5mbHlpbmdDVEEgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBsYXRlc3RLbm93blNjcm9sbFkgPSAwO1xuICAgICAgdmFyIHRpY2tpbmcgPSBmYWxzZTtcbiAgICAgIHZhciAkY3RhID0gJCgnLnBhcmFncmFwaC0tdHlwZS0taGVhZGVyIC5maWVsZC0tbmFtZS1maWVsZC1jYWxsLXRvLWFjdGlvbiAuYnV0dG9uJykuZmlyc3QoKS5vbmNlKCdmbHlpbmctY3RhJyk7XG4gICAgICB2YXIgJGZpeGVkID0gbnVsbDtcbiAgICAgIHZhciBpc0ZpeGVkID0gZmFsc2U7XG4gICAgICB2YXIgY2xhc3NBZnRlclNjcm9sbCA9ICdmbHknO1xuICAgICAgdmFyIGFuaW1hdGluZ091dCA9IGZhbHNlO1xuXG4gICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIC8vIHJlc2V0IHRoZSB0aWNrIHNvIHdlIGNhblxuICAgICAgICAvLyBjYXB0dXJlIHRoZSBuZXh0IG9uU2Nyb2xsXG4gICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcblxuICAgICAgICB2YXIgYm91bmRpbmdDbGllbnRSZWN0ID0gJGN0YVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHNob3VsZEJlRml4ZWQgPSBib3VuZGluZ0NsaWVudFJlY3QudG9wIDwgNTA7XG4gICAgICAgIHZhciBpc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4O1xuXG4gICAgICAgIC8vIENyZWF0ZSBmaXhlZCBlbGVtZW50IGlmIGl0IGhhc250IGJlZW4gY3JlYXRlZCB5ZXQuXG4gICAgICAgIGlmIChzaG91bGRCZUZpeGVkICYmICEkZml4ZWQpIHtcbiAgICAgICAgICBjcmVhdGVGaXhlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRml4IGl0LlxuICAgICAgICBpZiAoIWlzRml4ZWQgJiYgc2hvdWxkQmVGaXhlZCkge1xuICAgICAgICAgIC8vIE1vdmUgYnV0dG9uIGluIHRoZSBwbGFjZSBvZiB0aGUgb3JpZ2luYWwsIHNvIHdlIGNhbiBhbmltYXRlIGl0IGZyb20gdGhlcmUuXG4gICAgICAgICAgJGZpeGVkXG4gICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgIHRvcDogaXNNb2JpbGUgPyAnYXV0bycgOiAnNTAlJyxcbiAgICAgICAgICAgICAgcmlnaHQ6IGlzTW9iaWxlID8gJ2F1dG8nIDogJzIwcHgnLFxuICAgICAgICAgICAgICBib3R0b206IGlzTW9iaWxlID8gJzAnIDogJ2F1dG8nLFxuICAgICAgICAgICAgICBsZWZ0OiBpc01vYmlsZSA/IDAgOiAnYXV0bycsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBmaXhlZEJvdW5kaW5nQ2xpZW50UmVjdCA9IGdldEZpeGVkQm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgdmFyIGRpZmZYID0gYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgLSBmaXhlZEJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgICAgICAgIHZhciBkaWZmWSA9IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgLSBmaXhlZEJvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG4gICAgICAgICAgJGZpeGVkLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoJyArIGRpZmZYICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyBkaWZmWSArICdweCknKTtcblxuICAgICAgICAgIGlzRml4ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRmaXhlZFxuICAgICAgICAgICAgICAuY3NzKCd0cmFuc2Zvcm0nLCAnJylcbiAgICAgICAgICAgICAgLmFkZENsYXNzKCdpbicpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR28gYmFjayB0byBub3JtYWwuXG4gICAgICAgIGVsc2UgaWYoaXNGaXhlZCAmJiAhc2hvdWxkQmVGaXhlZCAmJiAhYW5pbWF0aW5nT3V0KSB7XG4gICAgICAgICAgdmFyIGZpeGVkQm91bmRpbmdDbGllbnRSZWN0ID0gZ2V0Rml4ZWRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBhbmltYXRpbmdPdXQgPSB0cnVlO1xuXG4gICAgICAgICAgJGZpeGVkXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2luJylcbiAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgdG9wOiBib3VuZGluZ0NsaWVudFJlY3QudG9wICsgd2luZG93LnNjcm9sbFksXG4gICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgIGxlZnQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0LFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKCcgKyAoZml4ZWRCb3VuZGluZ0NsaWVudFJlY3QubGVmdCAtIGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0KSArICdweCkgdHJhbnNsYXRlWSgnICsgKGZpeGVkQm91bmRpbmdDbGllbnRSZWN0LnRvcCAtIGJvdW5kaW5nQ2xpZW50UmVjdC50b3ApICsgJ3B4KSdcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGZpeGVkXG4gICAgICAgICAgICAgIC5jc3MoJ3RyYW5zZm9ybScsICcnKVxuICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ291dCcpO1xuXG4gICAgICAgICAgICAkZml4ZWQub25lKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYW5pbWF0aW5nT3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJvdW5kaW5nQ2xpZW50UmVjdCA9ICRjdGFbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgJGZpeGVkXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdvdXQnKVxuICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICB0b3A6IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyB3aW5kb3cuc2Nyb2xsWSArICdweCcsXG4gICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgbGVmdDogYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgKyAncHgnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjcmVhdGVGaXhlZCgpIHtcbiAgICAgICAgdmFyICRjbG9uZSA9ICRjdGFcbiAgICAgICAgICAuY2xvbmUoKVxuICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICdwYWRkaW5nLXRvcCc6ICRjdGEuY3NzKCdwYWRkaW5nLXRvcCcpLFxuICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6ICRjdGEuY3NzKCdwYWRkaW5nLXJpZ2h0JyksXG4gICAgICAgICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICRjdGEuY3NzKCdwYWRkaW5nLWJvdHRvbScpLFxuICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0JzogJGN0YS5jc3MoJ3BhZGRpbmctbGVmdCcpLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAkY3RhLmNzcygndHJhbnNpdGlvbicsICdub25lJyk7XG4gICAgICAgICRjdGEuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXG4gICAgICAgICRmaXhlZCA9ICQoJzxkaXY+JylcbiAgICAgICAgICAuYXBwZW5kKCRjbG9uZSlcbiAgICAgICAgICAuYWRkQ2xhc3MoJ2ZseScpXG4gICAgICAgICAgLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldEZpeGVkQm91bmRpbmdDbGllbnRSZWN0KCkge1xuICAgICAgICByZXR1cm4gJGZpeGVkWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICAgICAgbGF0ZXN0S25vd25TY3JvbGxZID0gd2luZG93LnNjcm9sbFk7IC8vTm8gSUU4XG4gICAgICAgIHJlcXVlc3RUaWNrKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlcXVlc3RUaWNrKCkge1xuICAgICAgICBpZiAoIXRpY2tpbmcgJiYgJGN0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHRpY2tpbmcgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbn0pKERydXBhbCwgalF1ZXJ5KTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7QUFLQSxDQUFDLFVBQVUsTUFBTSxFQUFFLENBQUMsRUFBRTtFQUNwQixZQUFZLENBQUM7O0VB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
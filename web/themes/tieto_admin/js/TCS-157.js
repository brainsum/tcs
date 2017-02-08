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
      var $cta = $('.paragraph--type--header .field--name-field-call-to-action .button').once('flying-cta');
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
        if (!ticking) {
          window.requestAnimationFrame(update);
        }
        ticking = true;
      }

      window.addEventListener('scroll', onScroll, false);
    }
  };

})(Drupal, jQuery);

}((this.LaravelElixirBundle = this.LaravelElixirBundle || {})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi92YXIvd3d3L3BhcmFncmFwaHMubG9jYWwvd2ViL3RoZW1lcy90aWV0b19hZG1pbi9zcmMvc2NyaXB0cy9UQ1MtMTU3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEdsb2JhbCBzY3JpcHRzLCBsb2FkZWQgb24gZXZlcnkgcGFnZS5cbiAqL1xuXG4oZnVuY3Rpb24gKERydXBhbCwgJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5mbHlpbmdDVEEgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBsYXRlc3RLbm93blNjcm9sbFkgPSAwO1xuICAgICAgdmFyIHRpY2tpbmcgPSBmYWxzZTtcbiAgICAgIHZhciAkY3RhID0gJCgnLnBhcmFncmFwaC0tdHlwZS0taGVhZGVyIC5maWVsZC0tbmFtZS1maWVsZC1jYWxsLXRvLWFjdGlvbiAuYnV0dG9uJykub25jZSgnZmx5aW5nLWN0YScpO1xuICAgICAgdmFyICRmaXhlZCA9IG51bGw7XG4gICAgICB2YXIgaXNGaXhlZCA9IGZhbHNlO1xuICAgICAgdmFyIGNsYXNzQWZ0ZXJTY3JvbGwgPSAnZmx5JztcbiAgICAgIHZhciBhbmltYXRpbmdPdXQgPSBmYWxzZTtcblxuICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAvLyByZXNldCB0aGUgdGljayBzbyB3ZSBjYW5cbiAgICAgICAgLy8gY2FwdHVyZSB0aGUgbmV4dCBvblNjcm9sbFxuICAgICAgICB0aWNraW5nID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGJvdW5kaW5nQ2xpZW50UmVjdCA9ICRjdGFbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBzaG91bGRCZUZpeGVkID0gYm91bmRpbmdDbGllbnRSZWN0LnRvcCA8IDUwO1xuICAgICAgICB2YXIgaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2ODtcblxuICAgICAgICAvLyBDcmVhdGUgZml4ZWQgZWxlbWVudCBpZiBpdCBoYXNudCBiZWVuIGNyZWF0ZWQgeWV0LlxuICAgICAgICBpZiAoc2hvdWxkQmVGaXhlZCAmJiAhJGZpeGVkKSB7XG4gICAgICAgICAgY3JlYXRlRml4ZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpeCBpdC5cbiAgICAgICAgaWYgKCFpc0ZpeGVkICYmIHNob3VsZEJlRml4ZWQpIHtcbiAgICAgICAgICAvLyBNb3ZlIGJ1dHRvbiBpbiB0aGUgcGxhY2Ugb2YgdGhlIG9yaWdpbmFsLCBzbyB3ZSBjYW4gYW5pbWF0ZSBpdCBmcm9tIHRoZXJlLlxuICAgICAgICAgICRmaXhlZFxuICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgICB0b3A6IGlzTW9iaWxlID8gJ2F1dG8nIDogJzUwJScsXG4gICAgICAgICAgICAgIHJpZ2h0OiBpc01vYmlsZSA/ICdhdXRvJyA6ICcyMHB4JyxcbiAgICAgICAgICAgICAgYm90dG9tOiBpc01vYmlsZSA/ICcwJyA6ICdhdXRvJyxcbiAgICAgICAgICAgICAgbGVmdDogaXNNb2JpbGUgPyAwIDogJ2F1dG8nLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgZml4ZWRCb3VuZGluZ0NsaWVudFJlY3QgPSBnZXRGaXhlZEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIHZhciBkaWZmWCA9IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0IC0gZml4ZWRCb3VuZGluZ0NsaWVudFJlY3QubGVmdDtcbiAgICAgICAgICB2YXIgZGlmZlkgPSBib3VuZGluZ0NsaWVudFJlY3QudG9wIC0gZml4ZWRCb3VuZGluZ0NsaWVudFJlY3QudG9wO1xuICAgICAgICAgICRmaXhlZC5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKCcgKyBkaWZmWCArICdweCkgdHJhbnNsYXRlWSgnICsgZGlmZlkgKyAncHgpJyk7XG5cbiAgICAgICAgICBpc0ZpeGVkID0gdHJ1ZTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkZml4ZWRcbiAgICAgICAgICAgICAgLmNzcygndHJhbnNmb3JtJywgJycpXG4gICAgICAgICAgICAgIC5hZGRDbGFzcygnaW4nKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdvIGJhY2sgdG8gbm9ybWFsLlxuICAgICAgICBlbHNlIGlmKGlzRml4ZWQgJiYgIXNob3VsZEJlRml4ZWQgJiYgIWFuaW1hdGluZ091dCkge1xuICAgICAgICAgIHZhciBmaXhlZEJvdW5kaW5nQ2xpZW50UmVjdCA9IGdldEZpeGVkQm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgYW5pbWF0aW5nT3V0ID0gdHJ1ZTtcblxuICAgICAgICAgICRmaXhlZFxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXG4gICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgIHRvcDogYm91bmRpbmdDbGllbnRSZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZLFxuICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICBsZWZ0OiBib3VuZGluZ0NsaWVudFJlY3QubGVmdCxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgnICsgKGZpeGVkQm91bmRpbmdDbGllbnRSZWN0LmxlZnQgLSBib3VuZGluZ0NsaWVudFJlY3QubGVmdCkgKyAncHgpIHRyYW5zbGF0ZVkoJyArIChmaXhlZEJvdW5kaW5nQ2xpZW50UmVjdC50b3AgLSBib3VuZGluZ0NsaWVudFJlY3QudG9wKSArICdweCknXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRmaXhlZFxuICAgICAgICAgICAgICAuY3NzKCd0cmFuc2Zvcm0nLCAnJylcbiAgICAgICAgICAgICAgLmFkZENsYXNzKCdvdXQnKTtcblxuICAgICAgICAgICAgJGZpeGVkLm9uZSgndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpc0ZpeGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIGFuaW1hdGluZ091dCA9IGZhbHNlO1xuICAgICAgICAgICAgICBib3VuZGluZ0NsaWVudFJlY3QgPSAkY3RhWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICRmaXhlZFxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3V0JylcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgdG9wOiBib3VuZGluZ0NsaWVudFJlY3QudG9wICsgd2luZG93LnNjcm9sbFkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY3JlYXRlRml4ZWQoKSB7XG4gICAgICAgIHZhciAkY2xvbmUgPSAkY3RhXG4gICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiAkY3RhLmNzcygncGFkZGluZy10b3AnKSxcbiAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAkY3RhLmNzcygncGFkZGluZy1yaWdodCcpLFxuICAgICAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiAkY3RhLmNzcygncGFkZGluZy1ib3R0b20nKSxcbiAgICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6ICRjdGEuY3NzKCdwYWRkaW5nLWxlZnQnKSxcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgJGN0YS5jc3MoJ3RyYW5zaXRpb24nLCAnbm9uZScpO1xuICAgICAgICAkY3RhLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblxuICAgICAgICAkZml4ZWQgPSAkKCc8ZGl2PicpXG4gICAgICAgICAgLmFwcGVuZCgkY2xvbmUpXG4gICAgICAgICAgLmFkZENsYXNzKCdmbHknKVxuICAgICAgICAgIC5hcHBlbmRUbygkKCdib2R5JykpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRGaXhlZEJvdW5kaW5nQ2xpZW50UmVjdCgpIHtcbiAgICAgICAgcmV0dXJuICRmaXhlZFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgICAgIGxhdGVzdEtub3duU2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZOyAvL05vIElFOFxuICAgICAgICByZXF1ZXN0VGljaygpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXF1ZXN0VGljaygpIHtcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHRpY2tpbmcgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbn0pKERydXBhbCwgalF1ZXJ5KTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7QUFLQSxDQUFDLFVBQVUsTUFBTSxFQUFFLENBQUMsRUFBRTtFQUNwQixZQUFZLENBQUM7O0VBRWIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUc7SUFDM0IsTUFBTSxF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
(function (exports) {
  'use strict';

  /**
   * @file
   * Global scripts, loaded on every page.
   */

  (function ($) {
    // Updates parallax header height with px value instead of vh, so it won't be jumping on Android
    // @todo - remove this from here
    var $header = $('.paragraph--type--header.paragraph--view-mode--default');
    if ($header.length) {
      $header.height($header.height());
    }
    if (($('.slide-in-menu').length) && ($('.diff-revision').length < 1)) {
      $("body").addClass("offcanvas");
    }

    /*** HAMBURGER START ***/
    function hasClass(element, className) {
      return new RegExp(" " + className + " ").test(" " + element.className + " ");
    }

    function removeClass(element, className) {
      var classList = Array.prototype.slice.call(element.classList);

      if (hasClass(element, className)) {
        element.classList = classList.filter(function (item) {
          return item !== className
        }).join(" ");
      }
    }

    function toggleClass(element, className) {
      if (hasClass(element, className)) {
        removeClass(element, className);
      } else {
        element.className += " " + className;
      }
    }

    function removeFromAll(elementList, className) {
      elementList.map(function (element) {
        removeClass(element, className);
      });
    }

    window.onload = function () {
      var navLinkContainerNodes = document.getElementsByClassName("slide-in-menu-link");
      var navLinkContainers = Array.prototype.slice.call(navLinkContainerNodes);

      navLinkContainers.map(function (navLink, outerIndex) {
        navLink.onclick = function () {
          toggleClass(navLink, "selected");
          navLinkContainers.filter(function (element, innerIndex) {
            return !(outerIndex === innerIndex);
          }).map(function (element) {
            removeClass(element, "selected");
          });
        };
      });

      var navLinkSubContainerNodes = document.getElementsByClassName("nav-menu-sub-link");
      var navLinkSubContainers = Array.prototype.slice.call(navLinkSubContainerNodes);

      navLinkSubContainers.map(function (navLink, outerIndex) {
        navLink.onclick = function () {
          toggleClass(navLink, "selected");
          navLinkSubContainers.filter(function (element, innerIndex) {
            return !(outerIndex === innerIndex);
          }).map(function (element) {
            removeClass(element, "selected");
          });
        };
      });

      // Somewhy we need "dynamic listening".
      console.log($('body').attr('class'));
      console.log($('#hamburger').attr('class'));
      $(document).on('click', "#hamburger", function () {
        removeFromAll(navLinkContainers, "selected");
        $('body').toggleClass('pushed');
        $(this).parent().find("> ul.nav-menu-link-list").toggleClass('is-active');
      });

      /*var preLoaderOverlay = document.getElementById("pre-loader-overlay");
          removeClass(preLoaderOverlay, "is-active");*/

      /*var navLogo = document.getElementById("logo");

          window.onscroll =  function () {
              var doc = document.documentElement;
              var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        var classSet = hasClass(navLogo, "fixed");

              if (top >= 400 && !classSet) {
                  navLogo.className += " fixed";
                  removeClass(navLogo, "not-fixed");
              } else if (top < 400 && classSet) {
                  navLogo.className += " not-fixed";
                  removeClass(navLogo, "fixed");
              }
          };*/

      window.onscroll = function () {
        scrollFunction();
      };

      function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          document.getElementById("scroll-to-top").style.display = "block";
        } else {
          document.getElementById("scroll-to-top").style.display = "none";
        }
      }

      // When the user clicks on the button, scroll to the top of the document
      $("#scroll-to-top").on('click', function () {
        $('html,body').animate({scrollTop: 0}, 200, 'swing');
      });
    };

    /*** HAMBURGER END ***/

  })(jQuery);

}((this.LaravelElixirBundle = this.LaravelElixirBundle || {})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9rZWV0ZWVhbi9TaXRlcy9wcm9qZWN0cy9icmFpbnN1bS90Y3Mvd2ViL3RoZW1lcy90aWV0b19hZG1pbi9zcmMvc2NyaXB0cy9nbG9iYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogR2xvYmFsIHNjcmlwdHMsIGxvYWRlZCBvbiBldmVyeSBwYWdlLlxuICovXG5cbigkID0+IHtcblx0Ly8gVXBkYXRlcyBwYXJhbGxheCBoZWFkZXIgaGVpZ2h0IHdpdGggcHggdmFsdWUgaW5zdGVhZCBvZiB2aCwgc28gaXQgd29uJ3QgYmUganVtcGluZyBvbiBBbmRyb2lkXG5cdC8vIEB0b2RvIC0gcmVtb3ZlIHRoaXMgZnJvbSBoZXJlXG5cdGNvbnN0ICRoZWFkZXIgPSAkKCcucGFyYWdyYXBoLS10eXBlLS1oZWFkZXIucGFyYWdyYXBoLS12aWV3LW1vZGUtLWRlZmF1bHQnKTtcblx0aWYgKCRoZWFkZXIubGVuZ3RoKSB7XG5cdFx0JGhlYWRlci5oZWlnaHQoJGhlYWRlci5oZWlnaHQoKSk7XG5cdH1cblx0aWYgKCAoJCgnLnNsaWRlLWluLW1lbnUnKS5sZW5ndGgpICYmICgkKCcuZGlmZi1yZXZpc2lvbicpLmxlbmd0aCA8IDEpKSB7XG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJvZmZjYW52YXNcIik7XG5cdH1cblxuXHQvKioqIEhBTUJVUkdFUiBTVEFSVCAqKiovXG5cdGZ1bmN0aW9uIGhhc0NsYXNzIChlbGVtZW50LCBjbGFzc05hbWUpIHtcblx0XHRyZXR1cm4gbmV3IFJlZ0V4cChcIiBcIiArIGNsYXNzTmFtZSArIFwiIFwiKS50ZXN0KFwiIFwiICsgZWxlbWVudC5jbGFzc05hbWUgKyBcIiBcIik7XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVDbGFzcyAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG5cdFx0dmFyIGNsYXNzTGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVsZW1lbnQuY2xhc3NMaXN0KTtcblxuXHRcdGlmIChoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdCA9IGNsYXNzTGlzdC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdFx0cmV0dXJuIGl0ZW0gIT09IGNsYXNzTmFtZVxuXHRcdFx0fSkuam9pbihcIiBcIik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3MgKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuXHRcdGlmIChoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIGNsYXNzTmFtZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVGcm9tQWxsIChlbGVtZW50TGlzdCwgY2xhc3NOYW1lKSB7XG5cdFx0ZWxlbWVudExpc3QubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xuXHRcdH0pO1xuXHR9XG5cblx0d2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbmF2TGlua0NvbnRhaW5lck5vZGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlLWluLW1lbnUtbGlua1wiKTtcblx0XHR2YXIgbmF2TGlua0NvbnRhaW5lcnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChuYXZMaW5rQ29udGFpbmVyTm9kZXMpO1xuXG5cdFx0bmF2TGlua0NvbnRhaW5lcnMubWFwKGZ1bmN0aW9uIChuYXZMaW5rLCBvdXRlckluZGV4KSB7XG5cdFx0XHRuYXZMaW5rLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRvZ2dsZUNsYXNzKG5hdkxpbmssIFwic2VsZWN0ZWRcIik7XG5cdFx0XHRcdG5hdkxpbmtDb250YWluZXJzLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCwgaW5uZXJJbmRleCkge1xuXHRcdFx0XHRcdHJldHVybiAhKG91dGVySW5kZXggPT09IGlubmVySW5kZXgpO1xuXHRcdFx0XHR9KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBcInNlbGVjdGVkXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSk7XG5cblx0XHR2YXIgbmF2TGlua1N1YkNvbnRhaW5lck5vZGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdi1tZW51LXN1Yi1saW5rXCIpO1xuXHRcdHZhciBuYXZMaW5rU3ViQ29udGFpbmVycyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5hdkxpbmtTdWJDb250YWluZXJOb2Rlcyk7XG5cblx0XHRuYXZMaW5rU3ViQ29udGFpbmVycy5tYXAoZnVuY3Rpb24gKG5hdkxpbmssIG91dGVySW5kZXgpIHtcblx0XHRcdG5hdkxpbmsub25jbGljayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dG9nZ2xlQ2xhc3MobmF2TGluaywgXCJzZWxlY3RlZFwiKTtcblx0XHRcdFx0bmF2TGlua1N1YkNvbnRhaW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChlbGVtZW50LCBpbm5lckluZGV4KSB7XG5cdFx0XHRcdFx0cmV0dXJuICEob3V0ZXJJbmRleCA9PT0gaW5uZXJJbmRleCk7XG5cdFx0XHRcdH0pLm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHJlbW92ZUNsYXNzKGVsZW1lbnQsIFwic2VsZWN0ZWRcIik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9KTtcblxuXHRcdC8vIFNvbWV3aHkgd2UgbmVlZCBcImR5bmFtaWMgbGlzdGVuaW5nXCIuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgXCIjaGFtYnVyZ2VyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmVtb3ZlRnJvbUFsbChuYXZMaW5rQ29udGFpbmVycywgXCJzZWxlY3RlZFwiKTtcbiAgICAgIHRvZ2dsZUNsYXNzKGRvY3VtZW50LmJvZHksIFwicHVzaGVkXCIpO1xuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJykucGFyZW50KCkuZmluZChcIj4gdWwubmF2LW1lbnUtbGluay1saXN0XCIpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9KTtcblxuXHRcdC8qdmFyIHByZUxvYWRlck92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZS1sb2FkZXItb3ZlcmxheVwiKTtcblx0XHRyZW1vdmVDbGFzcyhwcmVMb2FkZXJPdmVybGF5LCBcImlzLWFjdGl2ZVwiKTsqL1xuXG5cdFx0Lyp2YXIgbmF2TG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKTtcblxuXHRcdHdpbmRvdy5vbnNjcm9sbCA9ICBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0dmFyIHRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgIC0gKGRvYy5jbGllbnRUb3AgfHwgMCk7XG4gICAgICB2YXIgY2xhc3NTZXQgPSBoYXNDbGFzcyhuYXZMb2dvLCBcImZpeGVkXCIpO1xuXG5cdFx0XHRpZiAodG9wID49IDQwMCAmJiAhY2xhc3NTZXQpIHtcblx0XHRcdFx0bmF2TG9nby5jbGFzc05hbWUgKz0gXCIgZml4ZWRcIjtcblx0XHRcdFx0cmVtb3ZlQ2xhc3MobmF2TG9nbywgXCJub3QtZml4ZWRcIik7XG5cdFx0XHR9IGVsc2UgaWYgKHRvcCA8IDQwMCAmJiBjbGFzc1NldCkge1xuXHRcdFx0XHRuYXZMb2dvLmNsYXNzTmFtZSArPSBcIiBub3QtZml4ZWRcIjtcblx0XHRcdFx0cmVtb3ZlQ2xhc3MobmF2TG9nbywgXCJmaXhlZFwiKTtcblx0XHRcdH1cblx0XHR9OyovXG5cbiAgICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbigpIHtzY3JvbGxGdW5jdGlvbigpfTtcblxuICAgIGZ1bmN0aW9uIHNjcm9sbEZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID4gMTAwIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPiAxMDApIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JvbGwtdG8tdG9wXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcm9sbC10by10b3BcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBidXR0b24sIHNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgICQoXCIjc2Nyb2xsLXRvLXRvcFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6MH0sMjAwLCdzd2luZycpO1xuICAgIH0pO1xuXHR9O1xuXG4vKioqIEhBTUJVUkdFUiBFTkQgKioqL1xuXG59KShqUXVlcnkpXG4iXSwibmFtZXMiOlsiY29uc3QiXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7OztBQUtBLENBQUMsVUFBQSxDQUFDLEVBQUM7OztDQUdGQSxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsd0RBQXdELENBQUMsQ0FBQztDQUM1RSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7RUFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztFQUNqQztDQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixD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

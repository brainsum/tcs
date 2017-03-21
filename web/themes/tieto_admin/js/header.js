(function () {

    function hasClass (element, className) {
        return new RegExp(" " + className + " ").test(" " + element.className + " ");
    }

    function removeClass (element, className) {
        var classList = Array.prototype.slice.call(element.classList);

        if (hasClass(element, className)) {
            element.classList = classList.filter(function (item) {
                return item !== className
            }).join(" ");
        }
    }

    function toggleClass (element, className) {
        if (hasClass(element, className)) {
            removeClass(element, className);
        } else {
            element.className += " " + className;
        }
    }

    function removeFromAll (elementList, className) {
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

        document.getElementById("hamburger").onclick = function() {
            removeFromAll(navLinkContainers, "selected");
            toggleClass(document.body, "pushed");
        };

        var preLoaderOverlay = document.getElementById("pre-loader-overlay");
        removeClass(preLoaderOverlay, "is-active");

        var navLogo = document.getElementById("nav-logo");

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
        };
    };

})();

!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}({12:function(e,t,n){e.exports=n(13)},13:function(e,t){!function(e,t){function n(n,a){var r=e(a),o=r.find("[data-drupal-nav-tabs-target]"),i=r.hasClass("is-collapsible");r.addClass("position-container is-horizontal-enabled"),r.on("click.tabs","[data-drupal-nav-tabs-trigger]",(function(e){o.toggleClass("is-open")})),e(window).on("resize.tabs",t.debounce((function(e){r.addClass("is-horizontal");var t=r.find(".tabs"),n=t.outerHeight()<=t.find(".tabs__tab").outerHeight();r.toggleClass("is-horizontal",n),i&&r.toggleClass("is-collapse-enabled",!n),n&&o.removeClass("is-open")}),150)).trigger("resize.tabs")}t.behaviors.navTabs={attach:function(t,a){var r=e(t).find("[data-drupal-nav-tabs]");r.length&&(window.matchMedia("(min-width: 300px)").matches&&r.once("nav-tabs").each(n))}}}(jQuery,Drupal)}});
//# sourceMappingURL=nav-tabs.js.map
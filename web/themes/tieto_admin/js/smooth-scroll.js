require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({1:[function(require,module,exports) {
!function(a){a('a[href*="#"]:not([href="#"]):not([href^="#tab-"]):not([href*="/#/"])').on("click",function(t){var o;if(t.preventDefault(),o=this.hash,history.pushState?history.pushState(null,null,o):window.location.hash=o,location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var h=0;a("body").hasClass("toolbar-horizontal")&&(h=39,a("body").hasClass("toolbar-tray-open")&&(h+=39));var e=a(this.hash);if(e.length)return a("html,body").animate({scrollTop:e.offset().top-h-72},300),a(window).width()<768&&a("#hamburger").hasClass("is-active")&&a("#hamburger").removeClass("is-active"),!1}})}(jQuery);
},{}]},{},[1])
parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"../../node_modules/menuspy/dist/menuspy.js":[function(require,module,exports) {
var define;
var global = arguments[3];
var t,e=arguments[3];!function(e,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s():"function"==typeof t&&t.amd?t(s):e.MenuSpy=s()}(this,function(){"use strict";var t=function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);return t},e=function(t){var e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,left:e.left+window.pageXOffset}},s=function(){return window.pageYOffset||document.documentElement.scrollTop},n=function(t,e){if(t.classList)t.classList.add(e);else{var s=t.className.split(" ");-1===s.indexOf(e)&&s.push(e),t.className=s.join(" ")}},i=function(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")},o=function(t,e){var s=null;return function(){var n=arguments,i=this;s||(s=setTimeout(function(){return s=0,t.apply(i,n)},e))}},l=function(e,n){var i=this;if(e){this.element="string"==typeof e?document.querySelector(e):e,this.options=t({menuItemSelector:'a[href^="#"]',activeClass:"active",threshold:15,enableLocationHash:!0,hashTimeout:600,callback:null},n),this.assignValues(),this.debouncedAssignValuesFn=o(function(){return i.assignValues()}),window.addEventListener("resize",this.debouncedAssignValuesFn),this.debouncedHashFn=o(function(){var t=i.lastInViewElm?"#"+i.lastInViewElm.id:"#";if(history.replaceState)history.replaceState(null,null,t);else{var e=s();window.location.hash=t,window.scrollTo(0,e)}},this.options.hashTimeout),this.cacheItems(),this.scrollFn()}};return l.prototype.assignValues=function(){this.currScrollTop=0,this.lastInViewElm=null,this.menuHeight=this.element.offsetHeight+this.options.threshold,this.menuItems=[].slice.call(this.element.querySelectorAll(this.options.menuItemSelector)),this.raf=null},l.prototype.cacheItems=function(){this.scrollItems=this.menuItems.map(function(t){var s=t.dataset.target?document.querySelector(t.dataset.target):document.getElementById(t.hash.slice(1));return!!s&&{elm:t,target:s,offset:Math.floor(e(s).top)}}),this.scrollItems=this.scrollItems.filter(Boolean).sort(function(t,e){return t.offset-e.offset})},l.prototype.tick=function(){var t=this.currScrollTop+this.menuHeight,e=this.scrollItems.filter(function(e){return e.offset<t});this.activateItem(e.pop())},l.prototype.activateItem=function(t){var e=this,s=this.options,o=s.activeClass,l=s.callback;if(!t)return this.scrollItems.forEach(function(t){return i(t.elm.parentNode,o)}),this.lastInViewElm=null,void(this.options.enableLocationHash&&this.debouncedHashFn());this.lastInViewElm!==t.target&&(this.lastInViewElm=t.target,this.scrollItems.forEach(function(s){i(s.elm.parentNode,o),s.target===t.target&&(n(s.elm.parentNode,o),"function"==typeof l&&l.call(e,s),e.options.enableLocationHash&&e.debouncedHashFn())}))},l.prototype.scrollFn=function(){var t=s();this.currScrollTop!==t&&(this.currScrollTop=t,this.tick()),this.raf=window.requestAnimationFrame(this.scrollFn.bind(this))},l.prototype.destroy=function(){this.raf&&window.cancelAnimationFrame(this.raf),window.removeEventListener("resize",this.debouncedAssignValuesFn)},l});
},{}],"menuspy.js":[function(require,module,exports) {
"use strict";var e=a(require("menuspy"));function a(e){return e&&e.__esModule?e:{default:e}}var n=jQuery("#nav-menu-link-list"),i=new e.default(n[0],{enableLocationHash:!1,threshold:50}),t=n.find(">li");n.find(">li>a").on("click",function(e){var a=jQuery(this);t.removeClass("active"),a.parent().addClass("active")});
},{"menuspy":"../../node_modules/menuspy/dist/menuspy.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3],t="__parcel__error__overlay__",o=module.bundle.Module;function r(e){o.call(this,e),this.hot={data:module.bundle.hotData,_acceptCallbacks:[],_disposeCallbacks:[],accept:function(e){this._acceptCallbacks.push(e||function(){})},dispose:function(e){this._disposeCallbacks.push(e)}},module.bundle.hotData=null}module.bundle.Module=r;var a=module.bundle.parent;if(!(a&&a.isParcelRequire||"undefined"==typeof WebSocket)){var n=location.hostname,i="https:"===location.protocol?"wss":"ws",c=new WebSocket(i+"://"+n+":60033/");c.onmessage=function(t){var o=JSON.parse(t.data);if("update"===o.type&&(console.clear(),o.assets.forEach(function(t){d(e.parcelRequire,t)}),o.assets.forEach(function(t){t.isNew||u(e.parcelRequire,t.id)})),"reload"===o.type&&(c.close(),c.onclose=function(){location.reload()}),"error-resolved"===o.type&&(console.log("[parcel] ✨ Error resolved"),l()),"error"===o.type){console.error("[parcel] 🚨  "+o.error.message+"\n"+o.error.stack),l();var r=s(o);document.body.appendChild(r)}}}function l(){var e=document.getElementById(t);e&&e.remove()}function s(e){var o=document.createElement("div");o.id=t;var r=document.createElement("div"),a=document.createElement("pre");return r.innerText=e.error.message,a.innerText=e.error.stack,o.innerHTML='<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;"><span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span><span style="top: 2px; margin-left: 5px; position: relative;">🚨</span><div style="font-size: 18px; font-weight: bold; margin-top: 20px;">'+r.innerHTML+"</div><pre>"+a.innerHTML+"</pre></div>",o}function p(e,t){var o=e.modules;if(!o)return[];var r,a,n,i=[];for(r in o)for(a in o[r][1])((n=o[r][1][a])===t||Array.isArray(n)&&n[n.length-1]===t)&&i.push(r);return e.parent&&(i=i.concat(p(e.parent,t))),i}function d(e,t){var o=e.modules;if(o)if(o[t.id]||!e.parent){var r=new Function("require","module","exports",t.generated.js);t.isNew=!o[t.id],o[t.id]=[r,t.deps]}else e.parent&&d(e.parent,t)}function u(t,o){var r=t.modules;if(r){if(!r[o]&&t.parent)return u(t.parent,o);var a=t.cache[o];return t.hotData={},a&&(a.hot.data=t.hotData),a&&a.hot&&a.hot._disposeCallbacks.length&&a.hot._disposeCallbacks.forEach(function(e){e(t.hotData)}),delete t.cache[o],t(o),(a=t.cache[o])&&a.hot&&a.hot._acceptCallbacks.length?(a.hot._acceptCallbacks.forEach(function(e){e()}),!0):p(e.parcelRequire,o).some(function(t){return u(e.parcelRequire,t)})}}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","menuspy.js"], null)
//# sourceMappingURL=menuspy.map
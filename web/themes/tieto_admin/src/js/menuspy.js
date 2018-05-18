/**
 * @file
 * Menu highlighting while scroll
 *
 * @see  https://github.com/lcdsantos/menuspy
 */

@import '../../node_modules/menuspy/dist/menuspy.min.js';

var $menu = jQuery('#nav-menu-link-list');

var menuspy = new MenuSpy($menu[0],{
  enableLocationHash: false,
  threshold: 50
});

var $lis = $menu.find('>li');

$menu.find('>li>a').on('click', function(e) {
  var $this = jQuery(this);

  $lis.removeClass('active');

  $this.parent().addClass('active'); 
});


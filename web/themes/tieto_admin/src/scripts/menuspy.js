/**
 * @file
 * Menu highlighting while scroll
 *
 * @see  https://github.com/lcdsantos/menuspy
 */

import MenuSpy from 'menuspy';

var $menu = jQuery('#nav-menu-link-list');

var menuspy = new MenuSpy($menu[0],{
  enableLocationHash: false,
  threshold: 15,
  callback: function() {
    console.log('callback')
  }
});

var $lis = $menu.find('>li');

$menu.find('>li>a').on('click', function(e) {
  var $this = jQuery(this);

  $lis.removeClass('active');

  $this.parent().addClass('active'); 
});


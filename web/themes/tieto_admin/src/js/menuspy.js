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
<<<<<<< HEAD:web/themes/tieto_admin/src/scripts/menuspy.js
  threshold: 50
=======
  threshold: 0,
  callback: function() {
    //console.log('callback')
  }
>>>>>>> TCS-479:web/themes/tieto_admin/src/js/menuspy.js
});

var $lis = $menu.find('>li');

$menu.find('>li>a').on('click', function(e) {
  var $this = jQuery(this);

  $lis.removeClass('active');

  $this.parent().addClass('active'); 
});


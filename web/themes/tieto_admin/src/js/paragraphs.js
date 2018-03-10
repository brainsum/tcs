/**
 * @file
 * All kind of Paragraph related JS functions
 *
 */


/**
  * Equal textboxes title height
  * 
  * This solves the problem of text boxes with the element order of TITLE, IMAGE, TEXT
  * to have an equally high title, so the images are lined up to each other nicely
  *
  */
 (function ($, Drupal) {

  var firstRun = true;

  function Even(wrapper) {
  
    this.wrappers = this.wrappers || document.querySelectorAll(wrapper);
    this.windowWidth = 0;

    this.negativeToZero = function(number) {
      return (number >= 0) ? number : 0;
    }
  
    this.outerWidth = function(el) {
      var width = el.offsetWidth;
      var style = getComputedStyle(el);
      
      var marginLeft = this.negativeToZero(parseInt(style.marginLeft));
      var marginRight = this.negativeToZero(parseInt(style.marginRight));
      width += marginLeft + marginRight;

      return width;
    }
  
    this.outerHeight = function(el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);

      var marginTop = this.negativeToZero(parseInt(style.marginTop));
      var marginBottom = this.negativeToZero(parseInt(style.marginBottom));

      height += marginTop + marginBottom;
      return height;
    }
  
    this.nodeListToArray = function (nodelist) {
      var array = [];
      for(var elem of nodelist) {
        array.push(elem);
      }
      return array;
    }
    
    this.getCardsInRow = function(wrapper, cards) {
      return Math.floor(Math.ceil(this.outerWidth(wrapper)) / Math.floor(this.outerWidth(cards[0])));
    }
    
    this.getRowCount = function(cards, cardsInRow) {
      return Math.ceil(cards.length / cardsInRow);
    }
    
    this.toInteger = function(string) {
      var int = parseInt(string);
      return (Number.isNaN(int)) ? 0 : int;
    }
    
    this.didWindowChange = function() {
      var currentWidth = window.innerWidth;
      if(this.windowWidth !== currentWidth) {
        this.windowWidth = currentWidth;
        return true;
      } else {
        return false;
      }
    }
    
    this.evenAll = function() {
      if( ! this.wrappers.length) return;
      if( ! this.didWindowChange()) return;
      this.wrappers.forEach(function(wrapper){
        this.evenImages(wrapper);
      }, this);
    }
    
    this.evenImages = function(wrapper) {
      var cardIndex = 0;
      var cardsInRow = 0;
      var rowsInWrapper = 0;
      var cards = wrapper.querySelectorAll('.paragraph--type--text-box');
      
     
      cardsInRow = this.getCardsInRow(wrapper, cards);
      rowsInWrapper = this.getRowCount(cards, cardsInRow);

      // Iterating the rows
      for(var rowIndex=1; rowIndex<rowsInWrapper+1; rowIndex++) {
        var cardsOfRow = this.nodeListToArray(cards).slice(cardIndex, ((cardsInRow * rowIndex)));
        var headingsOfRow = [];
        var headingHeightsOfRow = [];
        var highest;
    
        // Iterating cards in a row
        cardsOfRow.forEach(function(elem){ 
          var heading = elem.querySelector('.paragraph__title');
          headingsOfRow.push(heading);
          // Reset style so we can recalculate
          heading.style.height = '';
          headingHeightsOfRow.push(heading.offsetHeight);
        }, this);
  
        // Getting the highest title
        highest = headingHeightsOfRow.reduce(function(a, b) {
          return Math.max(a, b); 
        });
  
        // Applying the height to all titles in the row
        headingsOfRow.forEach(function(elem){
          elem.style.height = highest + 'px';
        });
  
        cardIndex += cardsInRow;
      }
    }
  };

  /**
   * Initialise 
   */
  Drupal.behaviors.equalTitle = {
    attach: function (context, settings) {
      if(firstRun) {
        firstRun = false;

        var even = new Even('.paragraph--type--text-boxes.layout--equal_titles .field--name-parade-paragraphs');
        var interval = setInterval(function(){
          even.evenAll();
        }, 1000);
      }
    }
  };

})(jQuery, Drupal);
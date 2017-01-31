(function (exports) {
'use strict';

(function ($) {
    $.fn.savingsCalculator = function(settings) {
      /**
        * Default result calculation.
        *
        * @param {Integer} x value to calculate the result from.
        * @returns {Integer}
        */
      function calculate(x) {
        var result = x * 1.12 * 12 - x * .23 * 12;
        return Math.round(result);
      }
      
      /**
        * Default result formatting. Separate every group of thousands by a comma.
        *
        * @param {Integer} x result to format.
        * @returns {String}
        */
      function format(x) {
        x = x.toString();

        var parts = [];
        for (var i = x.length; i > 0; i-= 3) {
          parts.push(x.substring(i - 3, i));
        }
            
        return parts.reverse().join(',');
      }
      
      settings = $.extend({
        calculate: calculate,
        format: format,
        numberInput: 'input[name="number"]',
        resultContainer: '.result'
      }, settings);
      
      return this.each(function() {
        // Cache DOM elements
        var $el = $(this);
        var $number = $el.find(settings.numberInput);
        var $result = $el.find(settings.resultContainer);
        
        /**
         * Update result on form submission.
         */
        $el.on('submit', function(e) {
          e.preventDefault();
          
          var value = parseInt($number.val()) || 0;
          var result = settings.format(settings.calculate(value));
          
          $result.text(result);
        });
      });
    };

    $('form.savings-calculator').savingsCalculator();
})(jQuery);

}((this.LaravelElixirBundle = this.LaravelElixirBundle || {})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9ob21lL2dwYXAvQ29kZS93d3cvY2FtcGFpZ25zLmRldi93ZWIvdGhlbWVzL3RpZXRvX2FkbWluL3NyYy9zY3JpcHRzL3NhdmluZ3MtY2FsY3VsYXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoJCA9PiB7XG4gICAgJC5mbi5zYXZpbmdzQ2FsY3VsYXRvciA9IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgICAvKipcbiAgICAgICAgKiBEZWZhdWx0IHJlc3VsdCBjYWxjdWxhdGlvbi5cbiAgICAgICAgKlxuICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0geCB2YWx1ZSB0byBjYWxjdWxhdGUgdGhlIHJlc3VsdCBmcm9tLlxuICAgICAgICAqIEByZXR1cm5zIHtJbnRlZ2VyfVxuICAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gY2FsY3VsYXRlKHgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHggKiAxLjEyICogMTIgLSB4ICogLjIzICogMTI7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHJlc3VsdCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8qKlxuICAgICAgICAqIERlZmF1bHQgcmVzdWx0IGZvcm1hdHRpbmcuIFNlcGFyYXRlIGV2ZXJ5IGdyb3VwIG9mIHRob3VzYW5kcyBieSBhIGNvbW1hLlxuICAgICAgICAqXG4gICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSB4IHJlc3VsdCB0byBmb3JtYXQuXG4gICAgICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGZvcm1hdCh4KSB7XG4gICAgICAgIHggPSB4LnRvU3RyaW5nKCk7XG5cbiAgICAgICAgdmFyIHBhcnRzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSB4Lmxlbmd0aDsgaSA+IDA7IGktPSAzKSB7XG4gICAgICAgICAgcGFydHMucHVzaCh4LnN1YnN0cmluZyhpIC0gMywgaSkpO1xuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgcmV0dXJuIHBhcnRzLnJldmVyc2UoKS5qb2luKCcsJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHNldHRpbmdzID0gJC5leHRlbmQoe1xuICAgICAgICBjYWxjdWxhdGU6IGNhbGN1bGF0ZSxcbiAgICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICAgIG51bWJlcklucHV0OiAnaW5wdXRbbmFtZT1cIm51bWJlclwiXScsXG4gICAgICAgIHJlc3VsdENvbnRhaW5lcjogJy5yZXN1bHQnXG4gICAgICB9LCBzZXR0aW5ncyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIENhY2hlIERPTSBlbGVtZW50c1xuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKTtcbiAgICAgICAgdmFyICRudW1iZXIgPSAkZWwuZmluZChzZXR0aW5ncy5udW1iZXJJbnB1dCk7XG4gICAgICAgIHZhciAkcmVzdWx0ID0gJGVsLmZpbmQoc2V0dGluZ3MucmVzdWx0Q29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGUgcmVzdWx0IG9uIGZvcm0gc3VibWlzc2lvbi5cbiAgICAgICAgICovXG4gICAgICAgICRlbC5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBcbiAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJzZUludCgkbnVtYmVyLnZhbCgpKSB8fCAwO1xuICAgICAgICAgIHZhciByZXN1bHQgPSBzZXR0aW5ncy5mb3JtYXQoc2V0dGluZ3MuY2FsY3VsYXRlKHZhbHVlKSk7XG4gICAgICAgICAgXG4gICAgICAgICAgJHJlc3VsdC50ZXh0KHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJCgnZm9ybS5zYXZpbmdzLWNhbGN1bGF0b3InKS5zYXZpbmdzQ2FsY3VsYXRvcigpO1xufSkoalF1ZXJ5KTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsQ0FBQyxVQUFBLENBQUMsRUFBQztJQUNDLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxRQUFRLEVBQUU7Ozs7Ozs7TUFPMUMsU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFO1FBQ3BCLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztPQUMzQjs7Ozs7Ozs7TUFRRCxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFDakIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFFakIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtVQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DOztRQUVELE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUNsQzs7TUFFRCxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsQixTQUFTLEVBQUUsU0FBUztRQUNwQixNQUFNLEVBQUUsTUFBTTtRQUNkLFdBQVcsRUFBRSxzQkFBc0I7UUFDbkMsZUFBZSxFQUFFLFNBQVM7T0FDM0IsRUFBRSxRQUFRLENBQUMsQ0FBQzs7TUFFYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVzs7UUFFMUIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDOzs7OztRQUtqRCxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTtVQUMzQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O1VBRW5CLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7VUFDekMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O1VBRXhELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEIsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0osQ0FBQTs7SUFFRCxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0NBQ3BELENBQUMsQ0FBQyxNQUFNLENBQUM7OyJ9
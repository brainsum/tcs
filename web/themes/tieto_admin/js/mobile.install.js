(function (exports) {
'use strict';

/**
 * @file
 * Scripts for install page.
 */

(function () {

  function findActiveStep(steps) {
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].className === 'is-active') {
        return i + 1;
      }
    }
    // The final "Finished" step is never "active".
    if (steps[steps.length - 1].className === 'done') {
      return steps.length;
    }
    return 0;
  }

  function installStepsSetup() {
    var steps = document.querySelectorAll('.task-list li');
    if (steps.length) {
      var header = document.querySelector('header[role="banner"]');
      var stepIndicator = document.createElement('div');
      stepIndicator.className = 'step-indicator';
      stepIndicator.innerHTML = findActiveStep(steps) + '/' + steps.length;
      header.appendChild(stepIndicator);
    }
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', installStepsSetup);
  }

})();

}((this.LaravelElixirBundle = this.LaravelElixirBundle || {})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9ob21lL2dwYXAvQ29kZS93d3cvY2FtcGFpZ25zLmRldi93ZWIvdGhlbWVzL3RpZXRvX2FkbWluL3NyYy9zY3JpcHRzL21vYmlsZS5pbnN0YWxsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIFNjcmlwdHMgZm9yIGluc3RhbGwgcGFnZS5cbiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIGZpbmRBY3RpdmVTdGVwKHN0ZXBzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGVwcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHN0ZXBzW2ldLmNsYXNzTmFtZSA9PT0gJ2lzLWFjdGl2ZScpIHtcbiAgICAgICAgcmV0dXJuIGkgKyAxO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBUaGUgZmluYWwgXCJGaW5pc2hlZFwiIHN0ZXAgaXMgbmV2ZXIgXCJhY3RpdmVcIi5cbiAgICBpZiAoc3RlcHNbc3RlcHMubGVuZ3RoIC0gMV0uY2xhc3NOYW1lID09PSAnZG9uZScpIHtcbiAgICAgIHJldHVybiBzdGVwcy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5zdGFsbFN0ZXBzU2V0dXAoKSB7XG4gICAgdmFyIHN0ZXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stbGlzdCBsaScpO1xuICAgIGlmIChzdGVwcy5sZW5ndGgpIHtcbiAgICAgIHZhciBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXJbcm9sZT1cImJhbm5lclwiXScpO1xuICAgICAgdmFyIHN0ZXBJbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHN0ZXBJbmRpY2F0b3IuY2xhc3NOYW1lID0gJ3N0ZXAtaW5kaWNhdG9yJztcbiAgICAgIHN0ZXBJbmRpY2F0b3IuaW5uZXJIVE1MID0gZmluZEFjdGl2ZVN0ZXAoc3RlcHMpICsgJy8nICsgc3RlcHMubGVuZ3RoO1xuICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHN0ZXBJbmRpY2F0b3IpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluc3RhbGxTdGVwc1NldHVwKTtcbiAgfVxuXG59KSgpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7OztBQUtBLENBQUMsWUFBWTs7RUFFWCxTQUFTLGNBQWMsQ0FBQyxLQUFLLEVBQUU7SUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7TUFDckMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLFdBQVcsRUFBRTtRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDZDtLQUNGOztJQUVELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtNQUNoRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7S0FDckI7SUFDRCxPQUFPLENBQUMsQ0FBQztHQUNWOztFQUVELFNBQVMsaUJBQWlCLEdBQUc7SUFDM0IsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtNQUNoQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7TUFDN0QsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUNsRCxhQUFhLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO01BQzNDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO01BQ3JFLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDbkM7R0FDRjs7RUFFRCxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtJQUM3QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztHQUNsRTs7Q0FFRixDQUFDLEVBQUUsQ0FBQzs7In0=
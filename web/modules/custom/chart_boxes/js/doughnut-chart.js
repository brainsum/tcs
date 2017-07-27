
(function ($) {

  function checkExplorer() {
    if (navigator.userLanguage !== "undefined" && navigator.systemLanguage !== "undefined" && (navigator.userAgent.match(/trident/i) || navigator.userAgent.match(/edge/i))) {
      console.log('this is explorer // from function');
      return true;
    }
  }

  function drawChart(chartId, series, labels) {
    // draw the chart in EXPLORER
    /////////////////////////////
    new Chartist.Pie(chartId, {
      series: series,
      labels: labels
    }, {
      donut: true,
      donutWidth: 115,
      donutSolid: true,
      startAngle: 0,
      showLabel: true,
      responsive: false
    });
  }

  function animateChart(chartId, series, labels) {
    // draw and animate the chart in other browsers
    ///////////////////////////////////////////////

    new Chartist.Pie(chartId, {
      series: series,
      labels: labels
    }, {
      donut: true,
      donutWidth: 115,
      showLabel: true,
      responsive: false
    }).on('draw', function (data) {

      if (data.type === 'slice') {
        // Get the total path length in order to use for dash array animation
        var pathLength = data.element._node.getTotalLength();
        // Set a dasharray that matches the path length as prerequisite to animate dashoffset
        data.element.attr({
          'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
        });

        // Create animation definition while also assigning an ID to the animation for later sync usage
        var animationDefinition = {
          'stroke-dashoffset': {
            id: 'anim' + data.index,
            dur: 300,
            from: -pathLength + 'px',
            to: '0px',
            // easing: Chartist.Svg.Easing.easeInQuad,
            // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
            fill: 'freeze'
          }
        };

        // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
        if (data.index !== 0) {
          animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
        }

        // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
        data.element.attr({
          'stroke-dashoffset': -pathLength + 'px'
        });

        // We can't use guided mode as the animations need to rely on setting begin manually
        // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
        data.element.animate(animationDefinition, false);
      }
    });
  }

  var doughnutBox = $('.doughnut-chart--right .ct-chart');
  var doughnutBoxLength = doughnutBox.length;

  for (var i=0; i <= (doughnutBoxLength-1); i++ ) {
    var chartId = "#" + doughnutBox[i].id;
    var chartID = $(chartId);

    // find chart values & labels
    var chartValue = $(chartID.parents('.doughnut-chart--right')[0]).siblings('.doughnut-chart--left').find('.field--name-parade-value');
    var chartLabel = $(chartID.parents('.doughnut-chart--right')[0]).siblings('.doughnut-chart--left').find('.paragraph-inner .field--name-parade-title');

    // save all chart values to an array
    var series = chartValue.map(function() {
      return $(this).text();
    }).get();

    // save all chart label to an array
    var chartLabels = chartLabel.map(function() {
      return $(this).text();
    }).get();

    // add chart labels to chart values and save in new array
    var labels = series.map(function(value, index) {
      // return value + chartLabels[index];
      return value + "%";
    });


    if (checkExplorer()) {
      drawChart(chartId, series, labels)
    } else {

      $(window).on("scroll", {chartID: chartID, chartId: chartId, series:series, labels: labels}, function(event){
        var data = event.data;
        var offset = data.chartID.offset();
        var offsetTop = offset.top;
        var scrollTop = $(window).scrollTop();
        var fireLine = offsetTop - window.innerHeight * 0.65;

        if (fireLine <= scrollTop && !$(data.chartId).hasClass('animated')) {
          $(data.chartId).addClass('animated');
          animateChart(data.chartId, data.series, data.labels);
        }
      }).trigger("scroll");

    }
  }
})(jQuery);








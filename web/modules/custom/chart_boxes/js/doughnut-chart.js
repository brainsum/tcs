(function ($) {

  var doughnutBox = $('.doughnut-chart--right .ct-chart');
  var doughnutBoxLength = doughnutBox.length;

  for (var i=0; i <= (doughnutBoxLength-1); i++ ) {
    var chartId = doughnutBox[i].id;
    // find chart values & labels
    var chartValue = $($(('#' + chartId)).parents('.doughnut-chart--right')[0]).siblings('.doughnut-chart--left').find('.field--name-parade-value');
    var chartLabel = $($(('#' + chartId)).parents('.doughnut-chart--right')[0]).siblings('.doughnut-chart--left').find('.paragraph-inner .field--name-parade-title');
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
      return value + chartLabels[index];
    });
    // draw the chart
    new Chartist.Pie(('#'+ chartId), {
      series: series, labels: labels
    }, {
      donut: true,
      donutWidth: 115,
      donutSolid: true,
      startAngle: 0,
      showLabel: true
    });
  }

})(jQuery);








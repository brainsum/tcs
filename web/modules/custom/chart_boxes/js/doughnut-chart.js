(function ($) {

  var series = $('.layout--chart-type--doughnut .doughnut-chart--left .field--type-integer').map(function () {
    return $(this).text();
  }).get();

  var labels = series.map(function(i) {
    return i + "%";
  });

  new Chartist.Pie('.ct-chart', {
    series: series, labels: labels
  }, {
    donut: true,
    donutWidth: 100,
    donutSolid: true,
    startAngle: 0,
    showLabel: true
  });

})(jQuery);








(function ($) {

  var doughnutBox = $('.doughnut-chart--right .ct-chart');
  var doughnutBoxLength = doughnutBox.length;

  for (var i=0; i <= (doughnutBoxLength-1); i++ ) {
    var chartId = doughnutBox[i].id;

    var series = $($(('#' + chartId)).parents('.doughnut-chart--right')[0]).siblings('.doughnut-chart--left').find('.field--type-integer').map(function () {
      return $(this).text();
    }).get();

    var labels = series.map(function(i) {
      return i + "%";
    });

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









(function ($) {

      var chartBox = $('.layout--chart-type--doughnut-and-text .layout--chart-type--doughnut .ct-chart');
      var chartLength = chartBox.length;

      for (var i=0; i <= (chartLength-1); i++ ) {
        var chartId = chartBox[i].id;
        var chartFill = parseInt($(('#' + chartId)).siblings('.field--name-parade-value')[0].textContent);
        var chartData = [chartFill, (100 - chartFill)];

        new Chartist.Pie(('#'+ chartId), {
          series: chartData
        }, {
          donut: true,
          donutWidth: 20,
          donutSolid: true,
          startAngle: 0,
          showLabel: false
        });
      }

})(jQuery);

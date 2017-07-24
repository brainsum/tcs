
(function ($) {
  console.log("hello chart");

      var chartBox = $('.layout--chart-type--doughnut-and-text .ct-chart');
      var chartLength = chartBox.length;
      console.log("chart length:" + chartLength);

      for (var i=0; i <= (chartLength-1); i++ ) {
        var chartId = chartBox[i].id;
        console.log(chartId);
        var chartFill = parseInt($(('#' + chartId)).siblings('.field--name-parade-value')[0].textContent);
        console.log(chartFill);
        var chartData = [chartFill, (100 - chartFill)];
        console.log(chartData);

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

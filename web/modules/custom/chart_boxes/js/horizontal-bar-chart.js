
(function ($) {

      var chartBox = $('.layout--chart-type--bar .ct-chart');
      var chartLength = chartBox.length;

      for (var i=0; i <= (chartLength-1); i++ ) {
        var chartId = chartBox[i].id;

        var chartValue = $($(('#' + chartId))).siblings('.hidden-content').find('.paragraph-inner .field--name-parade-value');
        var chartLabel = $($(('#' + chartId))).siblings('.hidden-content').find('.paragraph-inner .field--name-parade-title');
        var chartText = $($(('#' + chartId))).siblings('.hidden-content').find('.paragraph-inner .field--name-parade-text');

        // save all chart values to arrays
        var series = chartValue.map(function() {
          return $(this).text();
        }).get();
        var labels = chartLabel.map(function() {
          return $(this).text();
        }).get();
        var texts = chartText.map(function() {
          return $(this).text();
        }).get();

        var fullLabels = series.map(function(value, index) {
          return value + labels[index];
        });

        new Chartist.Bar(('#'+ chartId), {
          labels: fullLabels,
          series: [series]
        }, {
          seriesBarDistance: 100,
          width: "100%",
          height: "100%",
          reverseData: true,
          horizontalBars: true,
          labelOffset: {
            x: 50,
            y: 50
          },
          axisY: {
            offset: 60,
            showLabel: true,
            showGrid: false
          },
          axisX: {
            offset: 0,
            showLabel: false,
            showGrid: false
          },
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }).on('draw', function(data) {
          if(data.type==='bar') {
            data.element.attr({
              style: [
                  'stroke-width: 30px' + ';' +
                  'stroke: #9acaeb' + ';'
              ]
            });
          }
        });
      }


})(jQuery);

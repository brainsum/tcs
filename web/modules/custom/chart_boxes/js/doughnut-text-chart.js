(function ($, Drupal, drupalSettings) {
	Drupal.behaviors.chart_boxesBehavior = {
		attach: function (context, settings) {

			var chartBox = $('.layout--chart-type--doughnut-and-text .layout--chart-type--doughnut .field--type-integer');
			var chartCanvas = chartBox.siblings('canvas');
			var chartLength = chartCanvas.length;

			for (var i=0; i <= (chartLength-1); i++ ) {
				var chartId = chartCanvas[i].id;
				var chartFill = parseInt(chartBox[i].innerText);
				var chartData = [chartFill, (100 - chartFill)];
				var ctx = document.getElementById(chartId).getContext('2d');
				var chartText = new Chart(ctx, {
					type: 'doughnut',
					data: {
						datasets: [{
							backgroundColor: ['#67afe1', 'rgba(103,175,225,.34)'],
							borderWidth: 0,
							data: chartData
						}]
					},

					// Configuration options go here
					options: {
						cutoutPercentage: 78,
						responsive: false,
						legend: {
							display: false
						},
						tooltips: {
							enabled: false
						},
						layout: {
							padding: {
								left: 0,
								right: 0,
								top: 0,
								bottom: 0
							}
						}
					}
				});
			}


		}
	}
})(jQuery, Drupal, drupalSettings);
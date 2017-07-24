

$ = jQuery; //todo del this line if normal drupal jquery is working


// get data from chartbox value field
var doughnutChartData = $('.layout--chart-type--doughnut .doughnut-chart--left .field--type-integer').map(function () {
	return $(this).text();
}).get();
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
	type: 'doughnut',
	data: {
		datasets: [{
			label: 'label: ',
			backgroundColor: ['#67afe1', '#e56385', '#6cc04a', '#878787'],
			borderWidth: 0,
			data: doughnutChartData
		}]
	},
	options: {
		cutoutPercentage: 55,
		responsive: true,
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




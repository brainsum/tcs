var ctx = document.getElementById('textChart').getContext('2d');
var textChart = new Chart(ctx, {
	type: 'doughnut',
	data: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: "some label",
			backgroundColor: ['#67afe1', 'rgba(103,175,225,.34)'],
			borderWidth: 0,
			data: [35, 65]
		}]
	},

	// Configuration options go here
	options: {
		cutoutPercentage: 78,
		responsive: false,
		legend: {
			display: false,
			labels: {
				fontColor: 'rgb(255, 99, 132)'
			}
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
<script>
import NavBar from '../components/NavBar.vue';
import LoadFile from '../components/LoadFile.vue';
import PopUp from '../components/popUp.vue';
export default
	{
		components: {
			NavBar,
			LoadFile,
			PopUp
		},
		data: function () {
			return {
				chartOptions: {
					chart: {
						id: "vuechart-example",
					},
					xaxis: {
						categories: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
					},
				},
				series: [
					{
						name: 'INNAMORATO',
						data: [75, 80, 35, 50, 49, 60, 70, 91, 125]
					},
					{
						name: 'Binary System',
						data: [72, 84, 80, 80, 68, 80, 80, 92, 80]
					}
				],
				optionsArea: {
					labels: ['INNAMORATO', 'Binary System']
				},
				seriesArea:[44, 55]
			};
		}
	}


</script>

<template>
	<div class="bg-slate-300">
		<NavBar />
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		  <!-- Prima riga su schermi grandi, colonna su schermi piccoli -->
		  <div class="border-2 border-green-500 m-2">
			01
		  </div>
	  
		  <div class="border-2 border-green-500 m-2">
			02
		  </div>
	  
		  <div class="border-2 border-green-500 m-2">
			03
		  </div>
	  
		  <!-- Seconda riga -->
		  <div class="border-2 border-green-500 m-2 col-span-1 lg:col-span-2">
			<apexchart height="400" type="line" :options="chartOptions" :series="series"></apexchart>
		  </div>
	  
		  <div class="border-2 border-green-500 m-2 col-span-1">
			<apexchart height="400" type="donut" :options="optionsArea" :series="seriesArea"></apexchart>
		  </div>
	  
		  <div class="border-2 border-green-500 m-2">
			06
		  </div>
	  
		  <div class="border-2 border-green-500 m-2 col-span-1 lg:col-span-2">
			07
		  </div>
		</div>
	  </div>
	  

</template>

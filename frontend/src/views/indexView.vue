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
		}
	}


</script>

<template >
	<div class="h-screen bg-slate-300">
		<PopUp />
		<NavBar />
		<LoadFile/>
	</div>
</template>


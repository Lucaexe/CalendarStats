import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import mitt from 'mitt'
import VueApexCharts from "vue3-apexcharts";

const emitter = mitt()
const app = createApp(App)

app.use(router)
app.use(VueApexCharts);

app.config.globalProperties.emitter = emitter
app.mount('#app')


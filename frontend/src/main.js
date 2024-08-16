import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import mitt from 'mitt'
import VueApexCharts from "vue3-apexcharts";

import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config.js'

const emitter = mitt()
const app = createApp(App)

app.use(router)
app.use(VueApexCharts);
app.use(Vueform, vueformConfig)

app.config.globalProperties.emitter = emitter
app.mount('#app')


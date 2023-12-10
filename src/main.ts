import {createPinia} from "pinia";
import {createApp} from "vue";
import VueApexCharts from "vue3-apexcharts";
import DashboardLayout from "./components/DashboardLayout.vue";
import EmptyLayout from "./components/EmptyLayout.vue";
import "./assets/tailwind.css";
import "./assets/scss/main.scss"

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.component("default-layout", DashboardLayout);
app.component("empty-layout", EmptyLayout);

app.use(router).use(VueApexCharts).use(createPinia()).mount("#app");

import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";
import DashboardLayout from "./components/DashboardLayout.vue";
import DashboardLayoutMauro from "./components/DashboardLayoutMauro.vue";
import EmptyLayout from "./components/EmptyLayout.vue";
import "./assets/tailwind.css";
import "./assets/scss/main.scss"

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.component("default-layout", DashboardLayout);
app.component("mauro-layout", DashboardLayoutMauro);
app.component("empty-layout", EmptyLayout);

app.use(router).use(VueApexCharts).mount("#app");

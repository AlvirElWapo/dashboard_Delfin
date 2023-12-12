import {createPinia} from "pinia";
import {createApp} from "vue";
import VueApexCharts from "vue3-apexcharts";
import DashboardLayout from "./components/DashboardLayout.vue";
import EmptyLayout from "./components/EmptyLayout.vue";
import "./assets/tailwind.css";
import "./assets/scss/main.scss"
import App from "./App.vue";
import router from "./router";


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUserSecret, faHouse , faPhone, faEnvelope, faChevronRight, faFlagCheckered, faUser, faRepeat, faFileExcel, faArrowUpFromBracket, faStar} from '@fortawesome/free-solid-svg-icons'

import { faFacebook, faFacebookF, faYoutube} from "@fortawesome/free-brands-svg-icons";

library.add(faUserSecret, faHouse, faPhone, faEnvelope, faFacebook, faFacebookF, faChevronRight, faFlagCheckered, faYoutube, faUser, faRepeat, faFileExcel, faArrowUpFromBracket, faStar)


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.component("default-layout", DashboardLayout);
app.component("empty-layout", EmptyLayout);

app.use(router).use(VueApexCharts).use(createPinia()).mount("#app");

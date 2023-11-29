import { createApp } from 'vue'
import pinia from "pinia";
import App from './mainpage.vue'
import router from '../../router'
import '../../assets/scss/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { 
  faUserSecret, 
  faHouse, 
  faPhone, 
  faEnvelope, 
  faChevronRight, 
  faFlagCheckered, 
  faUser, 
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

import { faFacebook, faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";

library.add(
  faUserSecret, 
  faHouse, 
  faPhone, 
  faEnvelope, 
  faFacebook, 
  faFacebookF, 
  faChevronRight, 
  faFlagCheckered, 
  faYoutube, 
  faUser, 
  faTimes,
);

createApp(App)
    .use(router)
    .use(pinia)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#mainpage')


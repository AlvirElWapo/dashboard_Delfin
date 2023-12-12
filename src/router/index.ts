import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Busq_por_sede from "../views/busq_por_sede.vue";
import Forms from "../views/Forms.vue";
import Tables from "../views/Tables.vue";
import UIElements from "../views/UIElements.vue";
import Modal from "../views/Modal.vue";
import Chart from "../views/ChartView.vue";
import Card from "../views/CardView.vue";
import Blank from "../views/BlankView.vue";
import NotFound from "../views/NotFound.vue";
import Cronometro from "../views/cronometro.vue";
import Agregar_Moderador from "../views/Agregar_Moderador.vue";
import Pase_De_Lista from "../views/Pase_de_lista.vue";
import Busqueda_Moderador from "../views/Busqueda_Moderador.vue";
import Pase_De_Lista_Moderador from "../views/Pase_de_lista_mod.vue";
import mainpage from "../views/mainpage/mainpage.vue";
import login from "../views/login/login.vue";
import EstatusSalas from "../views/EstatusSalas.vue"
import CargarExcel from "../views/CargarExcel.vue"
import control_moderadores from "../views/control_moderadores.vue";
import ses_preg from "../views/Preguntas.vue";
import AsistenciaAutom from "../views/AsistenciaAutom.vue";
import PONENCIA_NO_AUTORIZADA from "../views/PONENCIA_NO_AUTORIZADA.vue";
import PonenciaFinalizada from "../views/SalaModerada.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/sala_moderada",
    name: "sala_moderada",
    component: PonenciaFinalizada,
  },
  {
    path: "/no_autorizado",
    name: "no_autorizado",
    component: PONENCIA_NO_AUTORIZADA,
  },
  {
    path: "/estatus_salas",
    name: "Estatus_salas",
    component: EstatusSalas,
  },
  {
    path: "/cargar_info",
    name: "Cargar_info",
    component: CargarExcel,
  },
  {
    path: "/busq_por_sede",
    name: "Busq_por_sede",
    component: Busq_por_sede,
  },
  {
    path: "/cronometro",
    name: "cronometro",
    component: Cronometro,
  },
  {
    path: "/agregar_moderador",
    name: "agregar_moderador",
    component: Agregar_Moderador,
  },
  {
    path: "/pase_de_lista",
    name: "pase_de_lista",
    component: Pase_De_Lista,
  },
  {
    path: "/Pase_de_lista_moderador",
    name: "Pase_de_lista_moderador",
    component: Pase_De_Lista_Moderador,
  },
  {
    path: "/busqueda_moderador",
    name: "busqueda_moderador",
    component: Busqueda_Moderador,
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/charts",
    name: "Chart",
    component: Chart,
  },
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  },
  {
    path: "/control_moderadores",
    name: "control_moderadores",
    component: control_moderadores,
  },
  {
    path: "/sesion_depre",
    name: "sesion_depre",
    component: ses_preg,
  },
  {
    path: "/asist_automatica",
    name: "asist_automatica",
    component: AsistenciaAutom,
  },
  {
    path: '/',
    name: 'mainpage',
    component: mainpage,
    meta:
    {
      layout: 'full-width', // or you can set it to null or false
    },
  },
  {
    path: '/alt_login',
    name: 'login',
    component: login,
    meta:
    {
      layout: 'full-width', // or you can set it to null or false
    },
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

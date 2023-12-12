<template>
  <div>
    <Breadcrumb breadcrumb="DASHBOARD INFORMATIVO" />

    <div class="mt-4">
      <h4 class="text-gray-600">Charts</h4>

      <div class="mt-6">
        <div class="my-6 overflow-hidden bg-white rounded-md shadow grid grid-cols-2 gap-3">
          <!-- <LineChart /> -->
          <DonutChart />
          <DonutChartDates/>
          <!-- <BarChart /> -->
          <!-- <AreaChart /> -->
        </div>
      </div>

      <div class="mt-6">
        <h4 class="text-gray-600">ID's de moderadores activos:</h4>
        <div>
          <!--IDS DE LOS USUARIOS ACTIVOS-->
          <p v-for="(moderador, index) in moderadoresActivos" :key="index">
            <b>{{ moderador.ID_Mod }}</b>
          </p>
        </div>
      </div>

      <div class="mt-6">
        <h4 class="text-gray-600">Ponencias Activas:</h4>
        <div>
          <p v-for="(idsModeradores, index) in salas_activas" :key="index"> <b>{{ idsModeradores }}</b></p>
        </div>
        <h4 class="text-gray-600">Ponencias Finalizadas con Exito:</h4>
        <div>
          <p v-for="(exitosa, index) in salas_concluidas_exitosamente" :key="index"> <b>{{ exitosa }}</b></p>
        </div>
        <h4 class="text-gray-600">Ponencias Inconclusas:</h4>
        <div>
          <p v-for="(inconclusa, index) in salas_inconclusas" :key="index"> <b>{{ inconclusa }}</b></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "../partials/Breadcrumb.vue";
import DonutChart from "@/components/charts/DonutChart.vue";
import DonutChartDates from "@/components/charts/DonutChart2.vue";
import LineChart from "@/components/charts/LineChart.vue";
import BarChart from "../components/charts/BarChart.vue";
import AreaChart from "../components/charts/AreaChart.vue";
import axios from 'axios';
import { ref, onMounted } from 'vue';

const salas_activas = ref([]);
const salas_concluidas_exitosamente = ref([]);
const salas_inconclusas = ref([]);
const moderadoresActivos = ref([]);

const updateData = async () => {
  try {
    const response = await axios.get('http://localhost:1234/estado');
    salas_activas.value = response.data.state;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  try {
    const response = await axios.get('http://localhost:1234/salas_concluidas');
    salas_concluidas_exitosamente.value = response.data.completadas;
    salas_inconclusas.value = response.data.inconclusas;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const obtenerModeradoresActivos = async () => {
  try {
    const response = await axios.get('http://localhost:1234/id_moderadores_conectados');
    moderadoresActivos.value = response.data;
    console.log(moderadoresActivos.value);
  } catch (error) {
    console.error('Error obteniendo moderadores activos:', error);
  }
};

onMounted(() => {
  setInterval(updateData, 5000);
  updateData();
  obtenerModeradoresActivos();
});
</script>

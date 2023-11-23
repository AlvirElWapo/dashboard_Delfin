<template>
  <div>
    <Breadcrumb breadcrumb="DASHBOARD INFORMATIVO" />

    <div class="mt-4">
      <h4 class="text-gray-600">Charts</h4>

      <div class="mt-6">
        <div
          class="
            my-6
            overflow-hidden
            bg-white
            rounded-md
            shadow
            grid grid-cols-2
            gap-3
          "
        >
          <!-- <LineChart /> -->
          <DonutChart />
          <DonutChartDates/>
          <!-- <BarChart /> -->
          <!-- <AreaChart /> -->
        </div>
      </div>

      <div class="mt-6">
        <h4 class="text-gray-600">Ponencias Activas:</h4>
        <div>
          <p v-for="(state, index) in salas_activas" :key="index"> <b>{{ state }}</b></p>
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

onMounted(() => {
  setInterval(updateData, 5000);
  updateData();
});
</script>

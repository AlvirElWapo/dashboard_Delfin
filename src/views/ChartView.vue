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
    <h4 class="text-gray-600">Moderadores Activos:</h4>
    <div>
      <!-- Loop over Moderadores Activos -->
      <div v-for="(moderador, index) in moderadoresActivos" :key="index">
        <!-- Clickable Moderator Name -->
        <p @click="toggleTableVisibility(index)">
          <b>{{ moderador }}</b>
        </p>
        <!-- Table for Moderator Data (Shown/Hidden based on visibility state) -->
        <table v-if="visibleTables[index]" class="moderator-table">
          <!-- Table Rows for Moderator Data -->
          <tr>
            <td>Moderador:</td>
            <td>{{ moderador }}</td>
          </tr>
          <tr v-if="idSalasActivas[index]">
            <td>ID Sala:</td>
            <td>{{ idSalasActivas[index] }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>

    <div class="mt-6">
    <h4 class="text-gray-600">Moderadores Autorizados:</h4>
    <div>
      <!-- Loop over Moderadores Activos -->
      <div v-for="(moderador, index) in moderadoresAutorizados" :key="index">
        <!-- Clickable Moderator Name -->
        <p @click="toggleTableVisibility(index)">
          <b>{{ moderador }}</b>
        </p>
        <!-- Table for Moderator Data (Shown/Hidden based on visibility state) -->
        <table v-if="visibleTables[index]" class="moderator-table">
          <!-- Table Rows for Moderator Data -->
          <tr>
            <td>Moderador:</td>
            <td>{{ moderador }}</td>
          </tr>
          <tr v-if="idSalasAutorizadas[index]">
            <td>ID Sala:</td>
            <td>{{ idSalasActivas[index] }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>




<div class="mt-6">
  <h4 class="text-gray-600">Moderadores Concluidos:</h4>
  <div>
    <!-- Loop over Moderadores Concluidos -->
    <div v-for="(moderador, index) in moderadoresConcluidos" :key="index">
      <!-- Clickable Moderator Name -->
      <p @click="toggleTableVisibility(index)">
        <b>{{ moderador }}</b>
      </p>
      <!-- Table for Moderator Data (Shown/Hidden based on visibility state) -->
      <table v-if="visibleTables[index]" class="moderator-table">
        <!-- Table Rows for Moderator Data -->
        <tr>
          <td>Moderador:</td>
          <td>{{ moderador }}</td>
        </tr>
        <tr v-if="idSalasConcluidas[index]">
          <td>ID Sala:</td>
          <td>{{ idSalasConcluidas[index] }}</td>
        </tr>
      </table>
    </div>
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
const visibleTables = ref([]);
const idSalasActivas = ref([]);
const ponenciasActivas = ref([]);

const moderadoresAutorizados = ref([]);
const idSalasAutorizadas = ref([]);
const ponenciasAutorizadas = ref([]);

const moderadoresConcluidos = ref([]);
const idSalasConcluidas = ref([]);
const ponenciasConcluidas = ref([]);

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
  obtenerModeradoresActivos();
  obtenerSalasAutorizadas();
  obtenerSalasConcluidas(); // New call to fetch concluded salas
};

const obtenerModeradoresActivos = async () => {
  try {
    const response = await axios.get('http://localhost:1234/get_salas', { params: { state: 'activadas' } });
    if (response.data) {
      if (response.data.Moderador) {
        moderadoresActivos.value = response.data.Moderador.map(m => m.MODERADOR);
        visibleTables.value = moderadoresActivos.value.map(() => false);
      }
      if (response.data.id_salas) {
        idSalasActivas.value = response.data.id_salas;
      }
      if (response.data.Ponencias) {
        ponenciasActivas.value = response.data.Ponencias;
      }
    }
    console.log("Moderadores Activos:", moderadoresActivos.value);
    console.log("ID Salas Activas:", idSalasActivas.value);
    console.log("Ponencias Activas FIDHID:", ponenciasActivas.value);
  } catch (error) {
    console.error('Error obteniendo moderadores activos:', error);
  }
};

const obtenerSalasAutorizadas = async () => {
  try {
    const response = await axios.get('http://localhost:1234/get_salas', { params: { state: 'autorizadas' } });
    if (response.data) {
      if (response.data.Moderador) {
        moderadoresAutorizados.value = response.data.Moderador.map(m => m.MODERADOR);
      }
      if (response.data.id_salas) {
        idSalasAutorizadas.value = response.data.id_salas;
      }
      if (response.data.Ponencias) {
        ponenciasAutorizadas.value = response.data.Ponencias;
      }
    }
    console.log("Moderadores Autorizados:", moderadoresAutorizados.value);
    console.log("ID Salas Autorizadas:", idSalasAutorizadas.value);
    console.log("Ponencias Autorizadas:", ponenciasAutorizadas.value);
  } catch (error) {
    console.error('Error obteniendo salas autorizadas:', error);
  }
};

const obtenerSalasConcluidas = async () => {
  try {
    const response = await axios.get('http://localhost:1234/get_salas', { params: { state: 'concluidas' } });
    if (response.data) {
      if (response.data.Moderador) {
        moderadoresConcluidos.value = response.data.Moderador.map(m => m.MODERADOR);
      }
      if (response.data.id_salas) {
        idSalasConcluidas.value = response.data.id_salas;
      }
      if (response.data.Ponencias) {
        ponenciasConcluidas.value = response.data.Ponencias;
      }
    }
    console.log("Moderadores Concluidos:", moderadoresConcluidos.value);
    console.log("ID Salas Concluidas:", idSalasConcluidas.value);
    console.log("Ponencias Concluidas:", ponenciasConcluidas.value);
  } catch (error) {
    console.error('Error obteniendo salas concluidas:', error);
  }
};





const toggleTableVisibility = (index) => {
  visibleTables.value[index] = !visibleTables.value[index];
};



onMounted(() => {
  setInterval(updateData, 5000);
  updateData();
});
</script>

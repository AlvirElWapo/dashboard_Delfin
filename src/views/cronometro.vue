<template>

  <div>
      <div class="mt-4">
          <label for="idTra">
<svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
    <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
    <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
  </svg>

            EQUIPO A EVALUAR: 
          </label>
      <select id="idTra" v-model="selectedIdTra" @change="fetchData">
        <option v-for="idTra in idTraList" :key="idTra.ID_Tra" :value="idTra.ID_Tra">
        {{ idTra.ID_Tra }}
        </option>
      </select>
    
            <tbody class="bg-white">
      <tr v-for="(u, index) in users" :key="index">
        <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
          <div class="text-sm font-small leading-5 text-gray-900">
            {{ u.Titulo}}
          </div>
        </td>
      </tr>
            </tbody>

    <br>
<p class="text-center">
Al dar click en el botón <span style="color:green; font-size:2em"><b>Iniciar</b></span>, se dará por iniciada la ponencia
</p>
    <b><p class="text-center" style="color:red">IMPORTANTE! 
      EL BOTON PARAR, DARÁ POR TERMINADA LA SESIÓN Y SERÁ IMPOSIBLE CONTINUAR</p></b>

    </div>
    </div>

<div class="container">

    <div class="font-medium text-2xl">{{ formattedTime }}</div>

    <div class="mt-3 space-x-8">
      <button @click="startChronometer" :disabled="isRunning" class="button btn-primary">Iniciar</button>
      <button @click="cancelar_ponencia" :disabled="!isRunning" class="button btn-danger">Parar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const timer = ref(0);
const selectedTime = ref(50); 
const isRunning = ref(false);
const intervalId = ref<number | null>(null);

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

  function updateChronometer() {
  if (timer.value > 0) {
    timer.value -= 1;
  } else {
    stopChronometer();
  }
}

function startChronometer() {
  if (!isRunning.value) {
    timer.value = selectedTime.value;
    isRunning.value = true;
    intervalId.value = setInterval(updateChronometer, 1000);
    axios.post('http://localhost:1234/activar_Sala', {ID_tra : selectedIdTra.value})
      .then(response => {
      })
      .catch(error => {
        console.error('ERROR ACTIVANDO SALA:', error);
      });
  }
}

function cancelar_ponencia()
{
  stopChronometer_click_button() 
  axios.post('http://localhost:1234/Ponencia_inconclusa', {ID_tra : selectedIdTra.value})
    .then(response => {
    })
    .catch(error => {
      console.error('ERROR DESACTIVANDO SALA:', error);
    });
   
}

function stopChronometer_click_button() {
  if (isRunning.value) {
    isRunning.value = false;
    clearInterval(intervalId.value);
    intervalId.value = null;
    axios.post('http://localhost:1234/desactivar_Sala', {ID_tra : selectedIdTra.value})
      .then(response => {
      })
      .catch(error => {
        console.error('ERROR DESACTIVANDO SALA:', error);
      });
  }
}


import router from '../router/index.ts';


function stopChronometer() {

  if (isRunning.value) {
    isRunning.value = false;
    clearInterval(intervalId.value);
    intervalId.value = null;

    axios.post('http://localhost:1234/desactivar_Sala', { ID_tra: selectedIdTra.value })
      .then(response => {
        return axios.post('http://localhost:1234/concluir_Ponencia', { ID_tra: selectedIdTra.value });
      })
      .then(response => {
      router.push({ name: 'pase_de_lista' });
      })
      .catch(error => {
        console.error('ERROR:', error);
      });
  }
}

function resetChronometer() {
  stopChronometer();
  timer.value = selectedTime.value;
}

onMounted(() => {
  resetChronometer();
});

watch(() => timer.value, () => {
  formattedTime.value = formatTime(timer.value);
});

const formattedTime = ref(formatTime(timer.value));


interface User {
  titulo: string;
}

const users = ref<User[]>([]);
const idTraList = ref<{ ID_Tra: string }[]>([]);
const selectedIdTra = ref<string | null>(null);

onMounted(async () => {
  const idTraResponse = await axios.get<{ ID_Tra: string }[]>('http://localhost:1234/id_tras');
  idTraList.value = idTraResponse.data.sort((a, b) => a.ID_Tra.localeCompare(b.ID_Tra));
  if (idTraList.value.length > 0) {
    selectedIdTra.value = idTraList.value[0].ID_Tra;
    fetchData();
  }
});

const fetchData = async () => {
  try {
    if (selectedIdTra.value) {
      const response = await axios.post<User[]>('http://localhost:1234/get_titulo', {
        Salon: selectedIdTra.value,
      });
      users.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  transition: all 1s ease;
}

select{
  cursor: pointer;
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0 0.5vw;
}

.mb-3 {
  margin-bottom: 6vw;
  font-size: 25px;
}

.font-medium {
  font-size: 150px;
  margin-bottom: 7vw;
}

.button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #4caf50;
}

.btn-danger {
  background-color: #f44336;
}

.btn-secondary {
  background-color: #008CBA;
}

.button:hover{
  scale: 1.1;
  transition: 0.5s ease;
  border: 3px solid #ccc;
  font-weight: bolder
}

.button:active{
  scale: 1.2;
  color: black;
}
</style>




<template>
  <div class="mainContainer">
    <div class="mainContainer_title">
      <label for="idTra">
        EQUIPO A EVALUAR:
      </label>

      <!-- <select id="idTra" v-model="selectedIdTra" @change="fetchData"> -->
      <!--   <option v-for="idTra in idTraList" :key="idTra.ID_Tra" :value="idTra.ID_Tra"> -->
        {{ ponencias.$state.ponencias[0] }}
      <!--   </option> -->
      <!-- </select> -->



      <tbody class="bg-white">
        <tr v-for="(u, index) in users" :key="index">
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            <div class="text-sm font-small leading-5 text-gray-900">
              {{ u.Titulo }}
            </div>
          </td>
        </tr>
      </tbody>

      <br>
      <p class="text-center">
        Al dar click en el botón <span style="color:green; font-size:1.5em"><b>Iniciar</b></span>, se dará por iniciado el
        bloque de 5 ponencias aleatorias.
      </p>
      <b>
        <p class="text-center" style="color:red">IMPORTANTE!
          EL BOTON PARAR, DARÁ POR TERMINADA LA SESIÓN Y SERÁ IMPOSIBLE CONTINUAR</p>
      </b>

    </div>

    <div class="container">

      <div class="font-medium text-2xl">{{ formattedTime }}</div>

      <div class="mt-3 space-x-8">
        <button @click="startChronometer" :disabled="isRunning" class="button btn-primary">Iniciar</button>
        <button @click="cancelar_ponencia" :disabled="!isRunning" class="button btn-danger">Parar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { usePonenciasGlobales } from '../stores/ponencias.js';
const ponencias = usePonenciasGlobales();

const timer = ref(0);
const selectedTime = ref(1);
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
    axios.post('http://localhost:1234/activar_Sala', { ID_tra: selectedIdTra.value })
      .then(response => {
      })
      .catch(error => {
        console.error('ERROR ACTIVANDO SALA:', error);
      });
  }
}

function cancelar_ponencia() {
  stopChronometer_click_button()
  axios.post('http://localhost:1234/Ponencia_inconclusa', { ID_tra: selectedIdTra.value })
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


    axios.post('http://localhost:1234/desactivar_Sala', { ID_tra: selectedIdTra.value })
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

function getRandomElements(array, numElements) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}


onMounted(async () => {
  try {
    const idTraResponse = await axios.get<{ ID_Tra: string }[]>('http://localhost:1234/id_tras');
    const shuffledIdTraList = getRandomElements(idTraResponse.data, 5);

    if(!ponencias.$state.inicializado)
   {
      idTraList.value = shuffledIdTraList; 

      console.log(shuffledIdTraList);
      ponencias.iniciar();
      shuffledIdTraList.forEach((item) => {
        console.log(item['ID_Tra'])
        ponencias.addPonencia(item['ID_Tra']);
      });
      console.log("NUEVO BLOQUE CREADO") 
      console.log(ponencias.$state.ponencias) 
    }else
    {
      selectedIdTra = ponencias.$state.ponencias[0];
      console.log("PONENCIAS RESTANTES:" + ponencias.$state.ponencias);
    }
    const constantValue = ponencias.$state.ponencias[0];

    if (idTraList.value.length > 0) {
      selectedIdTra.value = idTraList.value[0].ID_Tra;
      fetchData();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  selectedIdTra.value = ponencias.$state.ponencias[0];


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
.mainContainer {
  width: 100%;
  height: auto;
  padding: 4vw 1vw;
  background-color: var(--white);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-top: 2vw;
}

.mainContainer_title {
  text-align: left;
  font-size: 1.6vw;
}

.mainContainer_title select {
  color: var(--white);
  background-color: var(--main-blue);
  border-radius: 8px;
  padding: 0.2vw 0.1vw;
  text-align: center;
  border: 1px solid #000;
  width: 6vw;
}

.mainContainer_title select option {
  background-color: #ccc;
  border-radius: 10px;
}


.mainContainer {
  width: 100%;
  height: 100vh;
  padding: 4vw 1vw;
  background-color: var(--white);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-top: 2vw;
}

.mainContainer_title {
  text-align: left;
  font-size: 1.6vw;
}

.mainContainer_title select {
  color: var(--white);
  background-color: var(--main-blue);
  border-radius: 8px;
  padding: 0.2vw 0.1vw;
  text-align: center;
  border: 1px solid #000;
  width: 6vw;
}

.mainContainer_title select option {
  background-color: #ccc;
  border-radius: 10px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  transition: all 1s ease;
}

select {
  cursor: pointer;
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0 0.5vw;
}

.mb-3 {
  margin-bottom: 1vw;
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

.button:hover {
  scale: 1.1;
  transition: 0.5s ease;
  border: 3px solid #ccc;
  font-weight: bolder
}

.button:active {
  scale: 1.2;
  color: black;
}
</style>
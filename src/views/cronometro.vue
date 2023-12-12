<template>
  <div class="mainContainer">
    <div class="mainContainer_title">

      <label for="idTra">
        BLOQUE:
        
      </label>
        {{ ponencias.$state.numero_bloque }}
      <br>
      <label for="idTra">
        EQUIPO A EVALUAR:
      </label>

        {{ ponencias.$state.ponencias[0] }}



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
import { useGlobalSession } from '../stores/session.js';
const ponencias = usePonenciasGlobales();
const session = useGlobalSession();

const timer = ref(0);
const selectedTime = ref(1);
const isRunning = ref(false);
const intervalId = ref<number | null>(null);

onMounted(() => {
  // Cuando la vista se carga, obtener el ID_MOD y enviarlo al servidor automáticamente.
  const idMod = session.$state.id; 
  enviarIdModAlServidor(session.$state.id);
  console.log("ID INICIADA SESION EN CRONOMETRO   " + session.$state.id)
});

// Función para obtener el ID_MOD (reemplázala con tu lógica real).
function obtenerIdMod() {
    console.log("OBTENIENDO DATOS -----------" + session.$state.id);
  const idMod = session.$state.id;
  return idMod;
}

// Función para enviar el ID_MOD al servidor.
function enviarIdModAlServidor(idMod) {
  // Envía el ID_MOD al servidor al cargar la vista.
  axios.post('http://localhost:1234/moderador_activo', { ID_Mod: session.$state.id})
    .then(response => {
      // Manejar la respuesta del servidor si es necesario.
    })
    .catch(error => {
      console.error('ERROR AL ENVIAR ID_MOD AL SERVIDOR:', error);
    });
}


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

    console.log("PONENCIA CONCLUIDA21: " + selectedIdTra.value)

    axios.post('http://localhost:1234/desactivar_Sala', { ID_tra: selectedIdTra.value })
      .then(response => {
        return axios.post('http://localhost:1234/concluir_Ponencia', { ID_tra: selectedIdTra.value });
      })
      .then(response => {

        ponencias.finalizarPonencia();
        
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

onMounted(() => 
{
  resetChronometer();
});

watch(() => timer.value, () => {
  formattedTime.value = formatTime(timer.value);
});

const formattedTime = ref(formatTime(timer.value));


interface User {
  titulo: string;
}

interface Ponencias {
  id_tra: string[];
}

const users = ref<User[]>([]);
const ponenciasL = ref<Ponencias[]>([]);
const idTraList = ref<{ ID_Tra: string }[]>([]);
const selectedIdTra = ref<string | null>(null);

function getRandomElements(array, numElements) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}


onMounted(async () => {
  try {
    const nombreMOD = session.$state.full_name;
    //console.log('Nombre del mod obtenido:', nombreMOD);
    

    // Hacer una llamada al servidor para obtener las 15 ponencias asociadas al moderador
    const ponenciasResponse = await axios.post<{ ponenciasL: string }[]>('http://localhost:1234/ponencias_del_moderador', {
      Investigador: nombreMOD,
    });
    console.log('Ponencias BAJADAS BDD:', ponenciasResponse.data);
    
    // Obtener solo los valores de ID_TRA de las ponencias
    const ponenciasIds = ponenciasResponse.data.map(ponencia => ponencia.ID_TRA);
    console.log('PONENCIAS ID:', ponenciasIds);

    // Obtener solo los valores de ID_TRA de las secciones de preguntas
    //const seccionesPreguntas = Array.from({ length: 3 }, (_, index) => `Sección de Preguntas ${index + 1}`);


    // Llamar a una acción en el store para organizar y dividir las ponencias
    //ponencias.organizarYDividirPonencias(ponenciasIds);

    // Imprimir el estado actual del store en la consola
    console.log('Estado actual del ARREGLO PONENCIAS :', ponencias.$state.ponencias);


    const shuffledPonencias = ponenciasResponse.data;
    console.log('Ponencias obtenidas shufl:', shuffledPonencias);
    //ponencias.organizarYDividirPonencias(shuffledPonencias);


    console.log('Longitud después del for de las ponencias:', ponencias.$state.ponencias.length);

    //const shuffledPonencias = ponenciasResponse.data;
    console.log('Ponencias obtenidas shufl:', ponencias.$state.ponencias);
    
    console.log('Estado2 actual de las ponencias:', ponencias.$state.ponencias[0]);

    //const idTraResponse = await axios.get<{ ID_Tra: string }[]>('http://localhost:1234/id_tras');
    //const shuffledIdTraList = getRandomElements(idTraResponse.data, 7);

    if(!ponencias.$state.inicializado)
    {
      ponencias.iniciar();
      for (let i = 0; i < 15; i ++) 
      {
        ponencias.addPonencia(shuffledPonencias[i]['ID_TRA']);
        console.log("NUEVO BLOQUE CREADO") 
      | console.log(ponencias.$state.ponencias) 
      }
    }else
    {
      if(ponencias.$state.ponencias.length != 0)
      {
      selectedIdTra = ponencias.$state.ponencias[0];
      console.log("PONENCIAS RESTANTES:" + ponencias.$state.ponencias);
      }
    }
 
    const constantValue = ponencias.$state.ponencias[0];

    if (idTraList.value.length > 0) {
      selectedIdTra.value = ponencias.$state.ponencias[0];
      fetchData();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  selectedIdTra.value = ponencias.$state.ponencias[0];
  console.log("VALOR UTILIZADO DE " + ponencias.$state.ponencias[0].ID_TRA + ": " + selectedIdTra.value )


});

const fetchData = async () => {
  try {
    selectedIdTra.value = ponencias.$state.ponencias[0];
    const selectedId = ponencias.$state.ponencias[0];
    console.log('Selected IdTra:', selectedId);
    console.log("totulo fetch: " + selectedId.value )
    if (selectedIdTra.value) {
      console.log('Selected ID_TRA titulo:', selectedIdTra.value);
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

<template>
  <div class="mainContainer">
      <div class="mainContainer_title">
          <label for="idTra">
            SELECCION DE EQUIPO: 
          </label>
          {{ ponencias.$state.finalizada }}
    </div>
    <div class="mt-8"></div>
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="
            inline-block
            min-w-full
            overflow-hidden
            align-middle
            border-b border-gray-200
            shadow
            sm:rounded-lg
          "
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="
                    px-6
                    py-3
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left text-gray-500
                    uppercase
                    border-b border-gray-200
                    bg-gray-50
                  "
                >
                 Equipo 
                </th>
                <th
                  class="
                    px-6
                    py-3
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left text-gray-500
                    uppercase
                    border-b border-gray-200
                    bg-gray-50
                  "
                >
                  Integrantes 
                </th>
                <th
                  class="
                    px-6
                    py-3
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left text-gray-500
                    uppercase
                    border-b border-gray-200
                    bg-gray-50
                  "
                >
                  Id's Integrantes 
                </th>



<th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
  Asistencia
</th>





              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(u, index) in users" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="text-sm font-medium leading-5 text-gray-900">
                  {{ u.ID_Tra }}
                </div>
              </td>

<td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
  <div class="text-sm font-medium leading-5 text-gray-900">
    <div v-for="(ponente, index) in u.Ponentes" :key="index">
      {{ ponente}}
      <span v-if="index !== u.Ponentes.length - 1"><br /></span>
    </div>
  </div>
</td>

<td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
  <div class="text-sm font-medium leading-5 text-gray-900">
    <div v-for="(ponente, index) in u.Ponentes" :key="index">
      {{ ponente}}
      <span v-if="index !== u.Ponentes.length - 1"><br /></span>
    </div>
  </div>
</td>
<td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
  <div class="text-sm font-medium leading-5 text-gray-900">
    <div v-for="(id, index) in u.ID_pons" :key="index">
      {{ id }}
      <span v-if="index !== u.ID_pons.length - 1"><br /></span>
    </div>
  </div>
</td>


  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
  <div class="text-sm font-medium leading-5 text-gray-900">
    <template v-for="(ponente, index) in u.Ponentes">
      <label class="switch" :for="`switch-${index}`">
        <input
          type="checkbox"
          :id="`switch-${index}`"
          v-model="asistenciaValues[index]"
          :value="'si'"
        />
        <span
          class="slider"
          :class="{ 'slider-yes': asistenciaValues[index] === 'si', 'slider-no': asistenciaValues[index] === 'no' }"
        ></span>
      </label>
      {{ ponente.Nombre }}
      <br />
    </template>
  </div>
</td>
          </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
  </div>
    <button @click="printAsistencia" class="btn btn-info">Registrar Asistencia</button>

</template>

  <script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import  router  from '../router'; 

interface User {
  equipo: string;
  Ponentes: string[];
  ID_pons: string[];
  Num_Integrantes: string;
}

const users = ref<User[]>([]);
const idTraList = ref<{ ID_Tra: string }[]>([]);
const selectedIdTra = ref<string | null>(null);


import { usePonenciasGlobales } from '../stores/ponencias.js';
const ponencias = usePonenciasGlobales();

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:1234/salas_concluidas');
    idTraList.value = ponencias.$state.finalizada;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  console.log(idTraList.value);
  if (idTraList.value.length > 0) {
    selectedIdTra.value = idTraList.value[0];
    fetchData();
  }
  console.log("LISTA DE PONENCIAS DISPONIBLES: " + ponencias.$state.ponencias);
  ponencias.finalizarPonencia()
  selectedIdTra.value = ponencias.$state.finalizada;
  console.log("VALOR UTILIZADO DE " + ponencias.$state.ponencias + ": " + selectedIdTra.value )

  fetchData();
});

const asistenciaValues = computed(() => {
  return users.value.length > 0
    ? users.value[0].Ponentes.map(() => false) // Default all to false
    : [];
});

const fetchData = async () => {
  try {
    if (selectedIdTra.value) {
      const response = await axios.post<User[]>('http://localhost:1234/informacion_de_equipos', {
        Id_Trab: selectedIdTra.value,
      });

      // De-jsonify the Ponentes and ID_pons fields
      users.value = response.data.map(user => ({
        ...user,
        Ponentes: JSON.parse(user.Ponentes),
        ID_pons: JSON.parse(user.ID_Pons),
      }));
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const printAsistencia = async () => {
  const flattenedValues = asistenciaValues.value;
  const stringValues = flattenedValues.map(value => (value ? 'si' : 'no'));

  try {
    if (selectedIdTra.value) {
      const response = await axios.post('http://localhost:1234/asistencia', {
        Id_Trab: selectedIdTra.value,
        Asistencia: stringValues,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Server Response:', response.data);
      router.push('/cronometro');
    } else {
      console.error('No selectedIdTra to send with the request.');
    }
  } catch (error) {
    console.error('Error sending data to server:', error);
  }


};

</script>


<style scoped>
.mainContainer{
  width: 65vw;
  height: auto;
  padding: 4vw 1vw;
  background-color: var(--white);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-top: 2vw;
  overflow: hidden;
}

.mainContainer_title{
  text-align: left;
  font-size: 1.6vw;
}

.mainContainer_title select{
  color: var(--white);
  background-color: var(--main-blue);
  border-radius: 8px;
  padding: 0.2vw 0.1vw;
  text-align: center;
  border: 1px solid #000;
  width: 6vw;
}

.mainContainer_title select option{
  background-color: #ccc;
  border-radius: 10px;
}
th.px-6{
  color: var(--white);
}

th{
  background-color: var(--header-blue);
  color: var(--white);
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  border-radius: 24px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
    background-color:#f36201 ;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  border-radius: 50%;
  position: absolute;
  content: attr(data-text);
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #333;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider:before {
  background-color: #509c90;
  content: "Si";
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

input:focus + .slider:before {
  box-shadow: 0 0 1px #2196F3;
}

.slider-no:before {
  content: "No";
}


.btn{
  margin-top:0.5vw;
  color: #000;
  font-weight: bolder;
  transition: all 0.5s ease-in-out;
}

.btn:hover {
  color: #f36201;
  transform: scale(1.1);
}

.btn:active {
  color: #fff;
  transform: scale(1.2);
}
</style>

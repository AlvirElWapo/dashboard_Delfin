<template>
  <div>
      <div class="mt-4">
          <label for="idTra">
<svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
    <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
    <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
  </svg>

            SELECCION DE EQUIPO: 


          </label>
      <select id="idTra" v-model="selectedIdTra" @change="fetchData">
        <option v-for="(state, index) in idTraList" :key="index" >
        {{ state }}
        </option>
      </select>
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

interface User {
  equipo: string;
  Ponentes: string[];
  ID_pons: string[];
  Num_Integrantes: string;
}

const users = ref<User[]>([]);
const idTraList = ref<{ ID_Tra: string }[]>([]);
const selectedIdTra = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:1234/salas_concluidas');
    idTraList.value = response.data.completadas;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  console.log(idTraList.value);
  if (idTraList.value.length > 0) {
    selectedIdTra.value = idTraList.value[0];
    fetchData();
  }
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
    } else {
      console.error('No selectedIdTra to send with the request.');
    }
  } catch (error) {
    console.error('Error sending data to server:', error);
  }
};

</script>


<style scoped>
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

</style>

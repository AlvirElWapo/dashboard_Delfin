<template>
  <div class="mainContainer">
    <div class="mainContainer_title">
      <label for="ubicacion">Selección de Edificio:</label>
      <select id="ubicacion" v-model="selectedUbicacion" @change="fetchData">
        <option v-for="edificio in edificiosList" :key="edificio.UBICACION" :value="edificio.UBICACION">
          {{ edificio.UBICACION }}
        </option>
      </select>
    </div>

    <div class="mt-8"></div>
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Moderador
                </th>
                <!-- Remove placeholders for Sala and Area if not needed -->
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Sala
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Area
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Estatus
                </th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(user, index) in users" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ user.Moderador}}
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <!-- Placeholder for Sala -->
                  {{user.Sala}}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <!-- Placeholder for Area -->
                  {{user.Area_Deseada}} 
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <!-- Estatus handling -->
                  <div class="estatus">
                    <p :class="{ 'text-gray': estado === 'Pendiente','text-green': estado === 'Abierta', 'text-red': estado === 'Cerrada' }">
                      {{ estado }}
                    </p>
                    <select class="desplegable" id="estado" v-model="estado">
                      <option value="Pendiente">Pendiente</option>
                      <option value="Abierta">Abierta</option>
                      <option value="Cerrada">Cerrada</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface User {
  Moderador: string;
  // Add other fields like Sala and Area if they are being fetched
}

const estado = ref('Pendiente'); // Estado inicial
const users = ref<User[]>([]);
const edificiosList = ref<{ UBICACION: string }[]>([]);
const selectedUbicacion = ref<string | null>(null);

onMounted(async () => {
  try {
    const edificiosResponse = await axios.get<{ UBICACION: string }[]>('http://localhost:1234/edificios');
    edificiosList.value = edificiosResponse.data;

    if (edificiosList.value.length > 0) {
      selectedUbicacion.value = edificiosList.value[0].UBICACION;
      fetchData();
    }
  } catch (error) {
    console.error('Error fetching edificios data:', error);
  }
});

const fetchData = async () => {
  try {
    if (selectedUbicacion.value) {
      const response = await axios.post<User[]>('http://localhost:1234/informacion_por_edificio', {
        UBICACION: selectedUbicacion.value,
      });
      users.value = response.data;
      console.log(users.value);
    }
  } catch (error) {
    console.error('Error fetching moderador data:', error);
  }
};
</script>

  
<style scoped>

.estatus{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1vw;
    font-weight: bolder;
}
.desplegable{
    margin-left: 1vw;
 width: 1vw;
 height: 1vw;
}

.text-gray {
    color: gray;
}
.text-green {
    color: green;
}

.text-red {
    color: red;
}

th.px-6 {
    color: var(--white);
}

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
    size:%;
}

th {
    background-color: var(--header-blue);
    color: var(--white);
}
</style>
  
  

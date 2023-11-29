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
        <option v-for="idTra in idTraList" :key="idTra.ID_Tra" :value="idTra.ID_Tra">
        {{ idTra.ID_Tra }}
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
                  Numero De Integrantes
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
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
    <!-- Iterate through each ID in the ID_pons array -->
    <div v-for="(id, index) in u.ID_pons" :key="index">
      {{ id }}
      <!-- Add a line break after each ID, excluding the last one -->
      <span v-if="index !== u.ID_pons.length - 1"><br /></span>
    </div>
  </div>
</td>

<td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
  <div class="text-sm font-medium leading-5 text-gray-900">
    {{ u.NoPonentes }}
  </div>
</td>

                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    leading-5
                    text-right
                    border-b border-gray-200
                    whitespace-nowrap
                  "
                >
                  <div class="flex justify-around">
                    <span class="text-yellow-500 flex justify-center">
                      <!-- Add your edit and delete buttons here -->
                    </span>
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
  equipo: string;
  Ponentes: string[];
  ID_pons: string[];
  Num_Integrantes: string;
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
</script>
<style scoped>
th.px-6{
  color: var(--main-blue);
}
</style>



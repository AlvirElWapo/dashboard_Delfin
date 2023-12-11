<template>
  <div class="mainContainer">
      <div class="mainContainer_title">
      <label for="idTra">


        Selección de moderador:
      </label>
      <select id="idMod" v-model="selectedIdMod" @change="fetchData">
        <option v-for="idMod in idModList" :key="idMod.ID_Mod" :value="idMod.ID_Mod">
          {{ idMod.ID_Mod }}
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
                  ID Moderador
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
                  Moderador
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
                  Institucion
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
                    {{ u.ID_Mod }}
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ u.Moderador }}
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ u.Institucion }}
                  </div>
                </td>


 <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
      <div class="text-sm font-medium leading-5 text-gray-900">
        <label class="switch" for="single-switch">
          <input type="checkbox" id="single-switch" v-model="switchValue" />
          <span class="slider" ></span>
        </label>
<!--savepoint-->
        <button @click="printAsistencia"></button>
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

interface Moderador {
  ID_Mod: string;
  Moderadores: string;
  Instituciones: string;
}

const users = ref<Moderador[]>([]);
const idModList = ref<{ ID_Mod: string }[]>([]);
const selectedIdMod = ref<string | null>(null);
const switchValue = ref<boolean>(false);

onMounted(async () => {
  try {
    const idModResponse = await axios.get<{ ID_Mod: string }[]>('http://localhost:1234/id_mods');
    idModList.value = idModResponse.data.sort((a, b) => a.ID_Mod.localeCompare(b.ID_Mod));
    if (idModList.value.length > 0) {
      selectedIdMod.value = idModList.value[0].ID_Mod;
      fetchData();
    }
  } catch (error) {
    console.error('Error fetching moderator IDs:', error);
  }
});

const fetchData = async () => {
  try {
    if (selectedIdMod.value) {
      const response = await axios.post<Moderador[]>('http://localhost:1234/informacion_de_moderadores', {
        Id_Mod: selectedIdMod.value,
      });
      users.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching moderator data:', error);
  }
};

const logSwitchValue = () => {
  console.log('Switch Value:', switchValue.value);
};


const printAsistencia = async (singleValue) => {
  const stringValue = singleValue ? 'si' : 'no';

  try {
    if (selectedIdMod.value) {
      const response = await axios.post('http://localhost:1234/asistencia_mods', {
        ID_Mod: selectedIdMod.value,
        Asistencia: stringValue,
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
  .switch.disabled {
    opacity: 0.5; /* Adjust the opacity or add other styles to indicate it's disabled */
  }
</style>

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
  color: var(--main-orange);
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

</style>

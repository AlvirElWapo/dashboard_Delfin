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

  <button @click="toggleTable('confirmedModerators')" class="toggle-button">
    TABLA CONFIRMADOS 
  </button>

  <button @click="toggleTable('unconfirmedModerators')" class="toggle-button">
    TABLA INCONFIRMADOS 
  </button>
  </div>
  <div class="update-button-container">
    <button @click="refreshData" class="update-button">Actualizar Datos</button>
</div>



<div v-if="visibleTables.confirmedModerators">

<!-- TABLA ACTIVOS -->
  <div class="mainContainer">
    <label >MODERADORES CONFIRMADOS:</label>
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
              <tr v-for="(user, index) in activeUsers" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ user.Moderador}}
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{user.Salon}}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{user.Area_Deseada}} 
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <!-- Estatus handling -->
                  <div class="estatus">
                    <p :class="{ 'text-green': estado === 'Abierta', 'text-red': estado === 'Cerrada' }">
                      {{ estado }}
                    </p>
                    <select class="desplegable" id="estado" v-model="estado">
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
<!-- FIN DE LA TABLA ACTIVOS -->
</div>



<div v-if="visibleTables.unconfirmedModerators">
<!-- TABLA INACTIVOS  -->


  <div class="mt-8"></div>
  <div class="flex flex-col mt-8">
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <label for="ubicacion">MODERADORES INCONFIRMADOS:<br>DAR ATENCIÓN URGENTE </label>
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
                  AGREGAR EMERGENTE 
                </th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(user, index) in allUsers" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ user.Moderador}}
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
<<<<<<< HEAD
                  {{user.Salon}}
=======
                  {{user.Sala}}
>>>>>>> refs/remotes/origin/master
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{user.Area_Deseada}} 
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="estatus">
                    <select id="emergente" v-model="mod_EmergenteSeleccionado">
                      <option v-for="emergente in posiblesMods" :key="emergente.MODERADOR" :value="emergente">
                      {{ emergente.MODERADOR }}
                      </option>
                    </select>
                    <button @click="confirmarCambios(user.Moderador, user.ID_Mod)">Confirmar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
<!-- FIN DE TABLA INCONFIRMADOS -->
</div>








  </div>






</template>
  
<script setup lang="ts">
import { ref,reactive, onMounted } from 'vue';
import axios from 'axios';

interface User {
  Moderador: string;
  Sala: string;
  Area_Deseada: string;
  Salon: string;
  // Add other fields from your backend data structure
  // Example: Pais, Institucion, etc.
}

const estado = ref('Cerrada');
const allUsers = ref<User[]>([]);
const activeUsers = ref<User[]>([]);
const edificiosList = ref<{ UBICACION: string }[]>([]);
const posiblesMods = ref<{ MODERADOR: string, ID_Mod:string }[]>([]);
const selectedUbicacion = ref<string | null>(null);
const mod_EmergenteSeleccionado = ref<{ MODERADOR: string, ID_Mod: string }>({ MODERADOR: '', ID_Mod: '' });

const refreshData = async () => {
  await fetchData();
  await fetchData_Activos();
  await fetch_mEMER();
};

onMounted(async () => {
  try {
    const edificiosResponse = await axios.get<{ UBICACION: string }[]>('http://localhost:1234/edificios');
    edificiosList.value = edificiosResponse.data;

    if (edificiosList.value.length > 0) {
      selectedUbicacion.value = edificiosList.value[0].UBICACION;
      await fetchData();
      await fetchData_Activos();
    }
  } catch (error) {
    console.error('Error fetching edificios data:', error);
  }

//MODSEMER

  try {
    const posibles_mods_response= await axios.get<{ MODERADOR: string }[]>('http://localhost:1234/posibles_emergentes');
    posiblesMods.value = posibles_mods_response.data;
    console.log(posiblesMods.value);

    if (posiblesMods.value.length > 0) {
      mod_EmergenteSeleccionado.value.MODERADOR = posiblesMods.value[0].MODERADOR;
      mod_EmergenteSeleccionado.value.ID_Mod = posiblesMods.value[0].ID_Mod;
    }
  } catch (error) {
    console.error('Error fetching MODERADORES EMERGENTES data:', error);
  }
});

const fetch_mEMER= async () => {
  try {
    const posibles_mods_response= await axios.get<{ MODERADOR: string }[]>('http://localhost:1234/posibles_emergentes');
    posiblesMods.value = posibles_mods_response.data;
    console.log(posiblesMods.value);

    if (posiblesMods.value.length > 0) {
      mod_EmergenteSeleccionado.value.MODERADOR = posiblesMods.value[0].MODERADOR;
      mod_EmergenteSeleccionado.value.ID_Mod = posiblesMods.value[0].ID_Mod;
    }
  } catch (error) {
    console.error('Error fetching MODERADORES EMERGENTES data:', error);
  }
};



const confirmarCambios = async (actualModerador,ID_Mod) => {
console.log(`intentando cambiar ${actualModerador},${ID_Mod} POR ${mod_EmergenteSeleccionado.value.MODERADOR}, ${mod_EmergenteSeleccionado.value.ID_Mod}`);
  try {
    await axios.post('http://localhost:1234/crear_emergente',
    {
      actualModerador: actualModerador,
      posibleModerador: mod_EmergenteSeleccionado.value
    });
    enviarIdModAlServidor(mod_EmergenteSeleccionado.value.ID_Mod);
    console.log('Cambio realizado con éxito');
  } catch (error) {
    console.error('Error al realizar el cambio:', error);
  }
   
};

const fetchData = async () => {
  try {
    if (selectedUbicacion.value) {
      const response = await axios.post<User[]>('http://localhost:1234/informacion_por_edificio', {
        UBICACION: selectedUbicacion.value,
      });
      allUsers.value = response.data;
    }

  await fetchData_Activos();
  } catch (error) {
    console.error('Error fetching all moderador data:', error);
  }
};

const fetchData_Activos = async () => {
  try {
    const activeModeradoresResponse = await axios.get<{ ID_Mod: string }[]>('http://localhost:1234/obtener_moderadores_activos');
    console.log("Moderadores conectados:", activeModeradoresResponse.data);

    // Clear the activeUsers.value once before processing the responses
    activeUsers.value = [];

    // Process each ID_Mod separately
    for (const mod of activeModeradoresResponse.data) {
      try {
        console.log("Fetching data for ID_Mod:", mod.ID_Mod);
        const response = await axios.post<User[]>('http://localhost:1234/informacion_por_edificio_eidemod', {
          UBICACION: selectedUbicacion.value,
          ID_Mod: mod.ID_Mod,
        });
        console.log(`Response for ID_Mod ${mod.ID_Mod}:`, response.data);

        if (Array.isArray(response.data)) {
          activeUsers.value.push(...response.data);
        } else {
          console.error(`Expected an array for response data, got:`, response.data);
        }
      } catch (error) {
        console.error(`Error fetching data for ID_Mod ${mod.ID_Mod}:`, error);
      }
    }

    // Filter out active users from allUsers
    const activeModeradorNames = new Set(activeUsers.value.map(user => user.Moderador));
    allUsers.value = allUsers.value.filter(user => !activeModeradorNames.has(user.Moderador));

  } catch (error) {
    console.error('Error fetching active moderadores:', error);
  }
};


const enviarIdModAlServidor = (idMod) => 
{
  axios.post('http://localhost:1234/moderador_activo', { ID_Mod: idMod })
    .then(response => {
    })
    .catch(error => {
      console.error('ERROR AL ENVIAR ID_MOD AL SERVIDOR:', error);
    });
    refreshData();
};

const visibleTables = reactive({
  confirmedModerators: false,
  unconfirmedModerators: false,
});

const toggleTable = (tableName) => {
  visibleTables[tableName] = !visibleTables[tableName];
};
</script>

  
<style scoped>

.toggle-button {
  background-color: var(--main-blue);
  color: var(--white);
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

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
  
  

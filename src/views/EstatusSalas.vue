<template>
    <div class="mainContainer">
        <div class="mainContainer_title">
            <label for="idTra">

                Selección de Edificio:

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
                <div class="
              inline-block
              min-w-full
              overflow-hidden
              align-middle
              border-b border-gray-200
              shadow
              sm:rounded-lg
            ">
                    <table class="min-w-full">
                        <thead>
                            <tr>
                                <th class="
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
                    ">
                                    Moderador
                                </th>
                                <th class="
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
                    ">
                                    Sala
                                </th>
                                <th class="
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
                    ">
                                    Area
                                </th>
                                <th class="
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
                    ">
                                    Estatus
                                </th>

                            </tr>
                        </thead>

                        <tbody class="bg-white">
                            <tr v-for="(u, index) in users" :key="index">


                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm font-medium leading-5 text-gray-900">
                                        <div v-for="(ponente, index) in u.Ponentes" :key="index">
                                            Andres Alvir Guzmán <!-- PLACEHOLDER -->
                                            <span v-if="index !== u.Ponentes.length - 1"><br /></span>
                                        </div>
                                    </div>
                                </td>

                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm font-medium leading-5 text-gray-900">
                                        <div v-for="(ponente, index) in u.Ponentes" :key="index">
                                            D1-101 <!-- PLACEHOLDER -->
                                            <span v-if="index !== u.Ponentes.length - 1"><br /></span>
                                        </div>
                                    </div>
                                </td>


                                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                    <div class="text-sm font-medium leading-5 text-gray-900">
                                        <!-- Iterate through each ID in the ID_pons array -->
                                        <div v-for="(id, index) in u.ID_pons" :key="index">
                                            VII <!-- PLACEHOLDER -->
                                            <!-- Add a line break after each ID, excluding the last one -->
                                            <span v-if="index !== u.ID_pons.length - 1"><br /></span>
                                        </div>
                                    </div>
                                </td>

                                <div class="estatus">
                                    <p :class="{ 'text-green': estado === 'Abierta', 'text-red': estado === 'Cerrada' }">
                                        {{ estado }}
                                    </p>
                                    <select class="desplegable" id="estado" v-model="estado">
                                        <option value="Abierta">Abierta</option>
                                        <option value="Cerrada">Cerrada</option>
                                    </select>
                                </div>


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

const estado = ref('Abierta'); // Estado inicial

const users = ref<User[]>([]);
const idTraList = ref<{ ID_Tra: string }[]>([]);
const selectedIdTra = ref<string | null>(null);

onMounted(async () => {
    try {
        const idTraResponse = await axios.get<{ ID_Tra: string }[]>('http://localhost:1234/id_tras');
        idTraList.value = idTraResponse.data.sort((a, b) => a.ID_Tra.localeCompare(b.ID_Tra));

        if (idTraList.value.length > 0) {
            selectedIdTra.value = idTraList.value[0].ID_Tra;
            fetchData();
        }
    } catch (error) {
        console.error('Error fetching ID_Tra data:', error);
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
}

th {
    background-color: var(--header-blue);
    color: var(--white);
}
</style>
  
  
<template>
  <div class="mainContainer">
    <div class="mainContainer_title">

      
      <b>
        <p class="text-center" style="color:green; font-size: 50px;">Asistencia automática para
          el proyecto: </p>
          <br>
        <p class="text-center" style="color:orange; font-size: 30px;">
          {{ truncatedTitulo }}
        </p>
      </b>

    </div>

    <div class="container">


    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../router/index.ts';
import { usePonenciasGlobales } from '../stores/ponencias.js';
import { ref, onMounted} from 'vue';
import axios from 'axios';

const ponencias = usePonenciasGlobales();

const truncatedTitulo = ref('');

onMounted(async() => {
  const titulo = ponencias.$state.titulo_finalizado || '';
  const maxLength = 125;
  truncatedTitulo.value = titulo.length > maxLength ? titulo.substring(0, maxLength) + '...' : titulo;

  // Lógica de asistencia automática
  const asistenciaValue = ["si"];
    try {
      // Realiza la llamada a la ruta de asistencia con los valores "si"
      const response = await axios.post('http://localhost:1234/asistencia', {
        Id_Trab: ponencias.$state.finalizada,
        Asistencia: asistenciaValue,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Loguea la respuesta del servidor
      console.log('Server Response:', response.data);

      // Simula un retraso antes de redirigir
      setTimeout(() => {
        if (ponencias.finSala()) {
          router.push({ name: 'sesion_depre' });
          ponencias.$state.numero_bloque++;
        } else {
          router.push({ name: 'cronometro' });
        }
      }, 2000); // Ajusta el tiempo de espera según sea necesario
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
});

</script>

<style scoped>
.mainContainer {
  width: 100%;
  height: 400px; /* Adjust this value as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4vw 1vw;
  background-color: var(--white);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-top: 2vw;
}

.mainContainer_title {
  text-align: center;
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
</style>
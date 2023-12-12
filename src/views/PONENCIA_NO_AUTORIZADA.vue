<template>
  <h1>PONENCIA NO AUTORIZADA</h1>
  <h1>ACUDIR A LA DIRECCIÓN DE VINCULACIÓN PARA QUE SE AUTORICEAUTORIZADA</h1>
  <h1>SI SE REALIZARON LOS CAMBIOS, VUELVA A INICIAR SESIÓN</h1>
        <router-link class="routerlink v-show flex items-center px-6 py-2  duration-200"
          :class="[$route.name === '/' ? activeClass : inactiveClass]" to="/">
        </router-link>
</template>

<script setup lang="ts">
import router from '../router/index.ts';
function salir() {

  router.push({ name: 'mainpage' });
}
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

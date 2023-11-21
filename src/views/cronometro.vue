<template>
  <div class="container">
    <div class="mb-3">
      <label for="timerSelect" class="mr-2">Selecciona el Tiempo:</label>
      <select id="timerSelect" placeholder="Arriba los wiwis" v-model="selectedTime">
        <option value="720">12 minutos</option>
        <option value="1">Prueba</option>
      </select>
    </div>

    <div class="font-medium text-2xl">{{ formattedTime }}</div>

    <div class="mt-3 space-x-8">
      <button @click="startChronometer" :disabled="isRunning" class="button btn-primary">Iniciar</button>
      <button @click="stopChronometer" :disabled="!isRunning" class="button btn-danger">Parar</button>
      <button @click="resetChronometer" :disabled="isRunning" class="button btn-secondary">Reiniciar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const timer = ref(0);
const selectedTime = ref(0);
const isRunning = ref(false);
const intervalId = ref<number | null>(null);

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
  }
}

function stopChronometer() {
  if (isRunning.value) {
    isRunning.value = false;
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
}

function resetChronometer() {
  stopChronometer();
  timer.value = selectedTime.value;
}

onMounted(() => {
  selectedTime.value = 0;
  resetChronometer();
});

watch(() => timer.value, () => {
  formattedTime.value = formatTime(timer.value);
});

const formattedTime = ref(formatTime(timer.value));
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  transition: all 1s ease;
}

select{
  cursor: pointer;
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0 0.5vw;
}

.mb-3 {
  margin-bottom: 6vw;
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

.button:hover{
  scale: 1.1;
  transition: 0.5s ease;
  border: 3px solid #ccc;
  font-weight: bolder
}

.button:active{
  scale: 1.2;
  color: black;
}
</style>




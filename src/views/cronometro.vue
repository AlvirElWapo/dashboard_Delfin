<template>
  <div>
    <h5 class="text-lg font-semibold mb-2">Cronometro vista para agregar</h5>

    <div class="mb-3">
      <label for="timerSelect" class="mr-2">Selecciona el Tiempo:</label>
      <select id="timerSelect" v-model="selectedTime">
          <option value="720">12 minutos</option>
          <option value="1">Prueba</option>
      </select>
    </div>

    <div class="font-medium text-2xl">{{ formattedTime }}</div>

    <div class="mt-3 space-x-2">
      <button @click="startChronometer" :disabled="isRunning" class="btn-primary">Start</button>
      <button @click="stopChronometer" :disabled="!isRunning" class="btn-danger">Stop</button>
      <button @click="resetChronometer" :disabled="isRunning" class="btn-secondary">Reset</button>
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
.btn-primary {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>




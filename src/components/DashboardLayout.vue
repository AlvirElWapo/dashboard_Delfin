<template>
  <div class="mainscreen flex h-screen  font-roboto">
    <Sidebar />
    <div class="flex-1 flex flex-col ">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 main_background">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<style scoped>
.main_background {
  background-color: var(--main-light);
  height: 200vh;
}

.mainscreen{
  height: auto;
  background-color: var(--main-light);
}
</style>
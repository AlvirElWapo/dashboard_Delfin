<template>
  <Header />  
  <component :is="layout">
    <router-view />
  </component>
  <Footer />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from "./components/layout/HeaderDesktop.vue";
import Footer from "./components/layout/FooterDesktop.vue";

const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
)
</script>

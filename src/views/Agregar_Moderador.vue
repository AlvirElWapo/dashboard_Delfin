//FALTA COMPLETAR CAMPOS...
<template>
  <div class="main_container">
    <Breadcrumb breadcrumb="AGREGAR MODERADOR" />
    <div class="mt-4">
      <h4 class="text-gray-600">Moderador Emergente </h4>

      <div class="mt-4">
        <div
          class="w-full max-w-sm  bg-white border rounded-md shadow-md"
        >
          <form>
            <div
              class="titleForm flex items-center justify-between px-5 py-3 text-gray-700 border-b"
            >
              <h3 class="text-sm">Moderador Emergente</h3>
  
            </div>

            <div class="px-5 py-6 text-gray-700 bg-gray-200 border-b">
              <label class="text-xs">Nombre completo</label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>

                </span>
                <input
                  type="text"
                  class="w-full px-12 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div class="px-5 py-6 text-gray-700 bg-gray-200 border-b">
              <label class="text-xs">Email</label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>

                </span>
                <input
                  type="text"
                  class="w-full px-12 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div class="px-5 py-6 text-gray-700 bg-gray-200 border-b">
              <label class="text-xs">Numero Celular</label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>

                </span>
                <input
                  type="text"
                  class="w-full px-12 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                />
              </div>
            </div>


            <div class="titleForm flex items-center justify-between px-5 py-3">
              <button
                class="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                class="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
              >
                Guardar
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '../partials/Breadcrumb.vue'

interface User {
  username: string
  email: string
  password: string
  confirm: string
}

const user = ref<User>({
  username: '',
  email: '',
  password: '',
  confirm: '',
})

const register = () => {
  const data = JSON.parse(JSON.stringify(user.value))
  console.log('Registered: ', data)
}
</script>

<style scoped>
form{
  width: 65vw;
}

.titleForm{
  color: var(--white);
  background-color: var(--main-blue);
  border-radius: 5px;
}

.bg-indigo-600{
    background-color: var(--main-orange)
  }

  .bg-indigo-600:hover{
    opacity: 0.8;
    scale: 1.04;
  }


</style>

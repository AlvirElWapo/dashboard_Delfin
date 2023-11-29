import { defineStore } from 'pinia';

export const useGlobalSession = defineStore('sesion', {
  state: () => ({
    tipo_de_usuari: 'initial string contains nothing',
  }),
  actions: {
    setup_sessions(string_value) {
      this.$state.tipo_de_usuario = string_value;
    },
  },
});

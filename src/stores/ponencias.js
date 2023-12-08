import { defineStore } from 'pinia';

export const usePonenciasGlobales = defineStore('ponenciasGlobales', {
  state: () => ({
    ponencias: [], 
    finalizada: 0, 
    inicializado:false,
  }),
  actions: {
    addPonencia(ponencia) 
    {
      this.$state.ponencias.push(ponencia);
    },
    finalizarPonencia() {
      if (this.$state.ponencias.length > 0) {
        this.$state.finalizada = this.$state.ponencias.shift();
      }
    },
    iniciar()
    {
      this.$state.inicializado = true;
    }
  },
});

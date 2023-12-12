import { defineStore } from 'pinia';

export const usePonenciasGlobales = defineStore('ponenciasGlobales', {
  state: () => ({
    ponencias: [], 
    finalizada: 0, 
    inicializado:false,
    tam_de_bloque :5,
    total_salas: 15,
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
    },
    finSala()
    {
      this.total_salas = this.total_salas -1;
      if(this.total_salas == 10 || this.total_salas == 5 || this.total_salas == 0)
      {
        return this.sesion_preguntas()
      }
      return false;
    },
    sesion_preguntas()
    {
      return true;
    },

  },
});

import { defineStore } from 'pinia';

export const usePonenciasGlobales = defineStore('ponenciasGlobales', {
  state: () => ({
    ponencias: [],
    titulos: [],
    finalizada: 0,
    titulo_finalizado: 0,
    inicializado:false,
    tam_de_bloque :5,
    total_salas: 15,
    total_titulos: 15,
    numero_bloque: 1,
  }),
  actions: {
    addPonencia(ponencia) 
    {
      this.$state.ponencias.push(ponencia);
    },
    addTitulo(titulo)
    {
      this.$state.titulos.push(titulo);
    },
    finalizarPonencia() {
      if (this.$state.ponencias.length > 0) {
        this.$state.finalizada = this.$state.ponencias.shift();
      }
    },
    quitarTitulo() {
      if (this.$state.titulos.length > 0) {
        this.$state.titulo_finalizado = this.$state.titulos.shift();
      }
    },
    iniciar()
    {
      this.$state.inicializado = true;
    },
    finSala()
    {
      this.total_salas = this.total_salas -1;
      this.total_libros = this.total_libros -1;
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

import { defineStore } from 'pinia';

export const useGlobalSession = defineStore('sesion', {
  state: () => ({
    username: null,
    full_name: '',
    user_type: '',
    email: '',
    id: '',
  }),
  actions: {
    setupSessions(userData) {
      this.$state.username = userData.username;
      this.$state.full_name = userData.full_name;
      this.$state.user_type = userData.user_type;
      this.$state.email = userData.email;
      this.$state.id = userData.id;
    },
  },
});

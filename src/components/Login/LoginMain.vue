<!-- ┓┏  ┏┳┓  ┳┳┓  ┓  -->
<!-- ┣┫   ┃   ┃┃┃  ┃  -->
<!-- ┛┗   ┻   ┛ ┗  ┗┛ -->
<template>
  <div class="main_container">
    <div class="main_row">
      <div class="main_row__login">
        <form id="form2" name="form2" @submit.prevent="login">
        <h1 class="main_row__login___title">INICIAR SESIÓN</h1>
        <div class="main_row__login___credentials">
          <div class="main_row__login___credentials____user">
            <span class="main_row__login___credentials____user_____label">Usuario:</span>
            <input
              type="text"
              class="main_row__login___credentials____user_____input"
              v-model="userData.username"
            />
          </div>
          <div class="main_row__login___credentials____pass">
            <span class="main_row__login___credentials____pass____label">Contraseña:</span>
            <input
              type="password"
              class="main_row__login___credentials____pass_____input"
              v-model="userData.password"
            />
          </div>
        </div>
        <button class="main_row__login___button" @click="login">Entrar</button>
        <span class="main_row__login___recoverMessage">Recuperar mis datos de Sesión</span>
    </form>
      </div>
      <div class="main_row__message">
        <h1 class="main_row__message___mainInfo">No se pudo iniciar Sesión</h1>
        <span class="main_row__message___secondaryInfo"
          >Lo sentimos, no se ingreso a la sesión. No exite una cuenta activa;
          para esos datos de sesión o el nombre de usuario y/o contraseña de
          acceso estan incorrectos, intentelo de nuevo.</span
        >
      </div>
    </div>
  </div>
</template>
  
<!-- ┏┓         •          -->
<!-- ┗┓  ┏  ┏┓  ┓  ┏┓  ╋   -->
<!-- ┗┛  ┗  ┛   ┗  ┣┛  ┗   -->
<script>
import axios from 'axios';
import router from '../../router/';
import { useGlobalSession } from '../../stores/session.js';

export default {
  data() {
    return {
      userData: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:1234/login', this.userData);
        console.log(response.data.success);
        if (response.data.success) {
          const userData = response.data.user;

          const session = useGlobalSession();
          session.setupSessions(userData);

          router.push('/dashboard');
        } else {
          router.push('/alt_login');
        }
      } catch (error) {
        router.push('/alt_login');
        console.error('Login error:', error);
      }
    },
  },
};
</script>

<!-- ┏┓  ┏┳┓  ┓┏  ┓   ┏┓ -->
<!-- ┗┓   ┃   ┗┫  ┃   ┣  -->
<!-- ┗┛   ┻   ┗┛  ┗┛  ┗┛ -->

  <style scoped>
.main_container {
  width: 100vw;
  height: 80vh;
  background-color: var(--main-light);
}

.main_row {
  width: 100%;
  height: 35%;
  display: flex;
  padding: 2.2vw 9.5vw;
}

.main_row__login {
  width: 21.5vw;
  height: 9.5vw;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border-radius: 0.4vw;
  margin-right: 1.5vw;
}

.main_row__login___title {
  font-size: 1vw;
  font-family: "Raleway", sans-serif;
  color: var(--white);
  background-image: linear-gradient(
    to top,
    #021d3a,
    #0a3054,
    #13446e,
    #195a8a,
    #1e71a7
  );
  padding: 0.5vw;
  border-top-left-radius: 0.4vw;
  border-top-right-radius:0.4vw;
}

.main_row__login___credentials{
    padding: 0.6vw 0.6vw 0 0.6vw;

}

.main_row__login___credentials____user,
.main_row__login___credentials____pass {
  display: flex;
  margin: 0.3vw 0;
  font-size: 0.75vw;
  align-items: center;
  justify-content: space-between;
}

.main_row__login___credentials____user input,
.main_row__login___credentials____pass input{
    height: 1.7vw;
    width: 10vw;
    border-color: #ccc;
    border-radius: 0.3vw;
}

.main_row__login___button{
    border: none;
    background-color: var(--main-orange);
    cursor: pointer;
    color: var(--white);
    width: 5.3vw;
    height: 2vw;
    align-self: flex-end;
    margin-right: 0.7vw;
    border-radius: 0.3vw;
    font-weight: bold;
    font-size: 0.8;
}

.main_row__login___recoverMessage{
    font-size: 0.7vw;
    margin-top: 2.1vw;
    justify-self: flex-end;
}

.main_row__message{
    width: 100%;
    height: 8vw;
    background-color: var(--white);
    border-radius: 0.3vw;
    font-family: "Raleway", sans-serif;
    text-align: left;
    padding: 1.2vw;
}

.main_row__message___mainInfo {
    color: var(--header-blue);
    font-size: 1.7vw;
    margin-bottom: 0.3vw;
}

.main_row__message___secondaryInfo{
    font-size: 0.8vw;
}
</style>

<template>
  <div class="welcome_container">
    <div class="welcome_container__main">
      <div class="main__buttons">
        <h1 class="main__buttons___title">Bienvenido</h1>
        <button class="btn main__buttons___btn1" @click="showHiddenComponent = true">
          <font-awesome-icon class="icon" icon="fa-solid fa-flag-checkered" />
          Ingresar
        </button>
        <button class="btn main__buttons___btn2">
          <font-awesome-icon class="icon" icon="fa-solid fa-flag-checkered" />
          Lorem, ipsum.
        </button>
      </div>
      <img
        class="main__logo"
        src="@/assets/images/logotipo-programa-blanco.png"
        alt="logo"
      />
    </div>

  <div class="floating-login-form" v-if="showHiddenComponent">
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-body">
        <button class="close-button" @click="showHiddenComponent = false">
          x
        </button>

        <div class="section-title text-left mt-2 mb-2">
          <h5 style="font-size: 18px;">INICIAR SESIÓN</h5>
        </div>
        <form id="form2" name="form2" @submit.prevent="login">
          <div class="row">
            <div class="col-md-12 pb-2">
              <div class="single-form form-group">

                <input type="text" id="login" name="login"
                class="form-control" required="required" 
                placeholder="Usuario" v-model="userData.username">

              </div>
            </div>
            <div class="col-md-12 pb-2">
              <div class="single-form form-group">

                <input type="password" id="pass" name="pass" 
                class="form-control" required="required" 
                placeholder="Contraseña" v-model="userData.password">

              </div>
            </div>
            <div class="col-md-12 pb-2">
              <div class="single-form form-group">


                <button type="submit" name="boton" 
                id="boton" class="main-btn" @click="login">
                Entrar
                </button>


              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>



</div>
</template>


<script>
import axios from 'axios';
import router from '../../router/'; 
import { useGlobalSession } from '../../stores/session.js'

export default {
  data() {
    return {
      showHiddenComponent: false,
      userData: {
        username: '',
        password: '',
      },
      userType: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:1234/login', this.userData);
        console.log(response.data.success);
        console.log(response.data);
        if (response.data.success) {
          const userData = response.data.user;
          this.userType = userData.user_type || 'moderador';
          const session = useGlobalSession();
          session.setupSessions({ ...userData, user_type: this.userType });

          console.log("Session data:", session.$state);
          if (this.userType === "moderador") {
            router.push('/cronometro');
          } else {
            router.push('/dashboard');
          }

        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.log("ENVIANDO:" + this.userData.username)
        console.log("ENVIANDO:" + this.userData.password)
        console.error('Login error:', error);
      }
    },
  },
  setup() {
    const session = useGlobalSession();
    console.log(session.tipo_de_usuario);
    return { session };
  },
};
</script>


<style scoped>

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px; /* Adjust the size as needed */
  color: #f48120; /* Button color */
  z-index: 9999; 
}

.close-button:hover {
  color: #005289; /* Hover color */
}

.floating-login-form 
{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9998; 
}
.section-title{}
.section-title h5{
    color: #005289;
    position: relative;
    padding-bottom: 12px; margin-bottom:15px; font-size: 30px;
}
.section-title h5::before{
    content: '';
    position: absolute;
    width: 35px;
    height: 2px;
    background-color: #f48120;
    bottom: 0;
    left: 0;
}
.section-title h2{
    font-size: 38px;
    padding-top: 10px;
}


.section-title{}
.section-title h5{
    color: #005289;
    position: relative;
    padding-bottom: 12px; margin-bottom:15px; font-size: 30px;
}
.section-title h5::before{
    content: '';
    position: absolute;
    width: 35px;
    height: 2px;
    background-color: #f48120;
    bottom: 0;
    left: 0;
}
.section-title h2{
    font-size: 38px;
    padding-top: 10px;
}

.welcome_container {
  position: relative;
  width: 100vw;
  height: 70vh;
  background-image: url("@/assets/images/conference.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
}
.welcome_container::before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: var(--main-blue);
  opacity: 0.6;
}

.welcome_container__main {
  width: 100vw;
  height: 70vh;
  position: absolute;
  display: flex;
  padding: 6.5em 8.5em;
  color: var(--white);
  justify-content: space-between;
  font-family: "Raleway", sans-serif;
}

.main__buttons {
  width: 28.86em;
  display: flex;
  text-align: left;
  flex-direction: column;
}

.main__buttons___title {
  font-size: 3.125em;
  margin-bottom: 1em;
}

.icon {
  transform: scale(1.2);
  margin-right: 0.7em;
}

.btn {
  width: 30.41vw;
  height: 5.7vh;
  border-radius: 12px;
  border: none;
  background-color: var(--main-orange);
  font-size: 1em;
  margin-bottom: 2em;
  color: var(--white);
  text-align: left;
  font-family: "Raleway", sans-serif;
  font-weight: bolder;
  padding: 0 2.5em;
  transition: 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.welcome_container_brands {
  width: 100vw;
  height: 20vh;
}

.main-btn {
	display: inline-block;
	font-weight: 500;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	border: 1px solid #f48120;
	padding: 0 35px;
	font-size: 16px;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
	line-height: 50px;
	border-radius: 5px;
    color: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 5;
    -webkit-transition: 0.4s ease-in-out;
    transition: 0.4s ease-in-out;
    background-color: #f48120;
}
.main-btn:hover{
    color: #fff;
    border-color: #005289;
    background-color: #005289;
}

.main-btn-3 {
	display: inline-block;
	font-weight: 500;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	border: 1px solid #005289;
	padding: 0 35px;
	font-size: 16px;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
	line-height: 50px;
	border-radius: 5px;
    color: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 5;
    -webkit-transition: 0.4s ease-in-out;
    transition: 0.4s ease-in-out;
    background-color: #005289;
}
.main-btn-3:hover{
    color: #fff;
    border-color: #f48120;
    background-color: #f48120;
}

.main-btn-2{
    color: #f48120;
    border-color: #005289;
    background-color: #005289;
}
.main-btn-2:hover{
    color: #005289;
    background-color: #f48120;
    border-color: #f48120;
}

</style>

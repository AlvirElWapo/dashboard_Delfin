<template>
  <div class="main_footer">
    <div class="footer_top">
      <div class="footer_top__column1">
        <img
          src="@/assets/images/logo-2.png"
          alt="logo"
          class="footer_top__column1___Logo"
        />
        <div class="footer_top__column1___Conntact">
          <div class="footerContact footer_top__column1___ConntactDirection">
            <font-awesome-icon class="icon" icon="fa-solid fa-house" />
            <p>
              Universidad Autónoma de Nayarit / Secretaría de Investigación y
              Posgrado. Ciudad de la Cultura s/n, col. Centro, C.P. 63000,
              Tepic, Nayarit, México
            </p>
          </div>
          <div class="footerContact footer_top__column1___ConntactPhone">
            <font-awesome-icon class="icon" icon="fa-solid fa-phone" />
            <p>+521 311 141 94 84</p>
          </div>
          <div class="footerContact footer_top__column1___ConntactMail">
            <font-awesome-icon class="icon" icon="fa-solid fa-envelope" />
            <p>coordinacion.general@programadelfin.org.mx</p>
          </div>
          <div class="footerContact footer_top__column1___ConntactSocialM">
            <font-awesome-icon class="icon" icon="fa-brands fa-facebook-f" />
            <p>Programa Delfín</p>
          </div>
        </div>
      </div>
      <div class="column footer_top__column2">
        <h3 class="title footer_top__column2__title">Programa Delfín</h3>
        <ul class="list footer_top__column2__links">
          <a href=""
            ><font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
            Inicio</a
          >
          <a href=""
            ><font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
            Programa</a
          >
          <a href=""
            ><font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
            Estudiantes</a
          >
          <a href=""
            ><font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
            Investigadores</a
          >
          <a href=""
            ><font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
            Divulgación</a
          >
        </ul>
      </div>
      <div class="column footer_top__column3">
        <h3 class="title footer_top__column3__title">De Interés</h3>
        <ul class="list footer_top__column3__links">
        <a href=""
        ><font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
        Lorem, ipsum.</a
        >
        <a href=""
        ><font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
        Lorem, ipsum dolor.</a
        >
        <a href=""
        ><font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
        Lorem, ipsum.</a
        >
        </ul>
      </div>
    </div>

    <div class="footer_bottom">
      <p>® Programa Delfín</p>
      <p>Programa Interinstitucional para el Fortalecimiento de la Investigación y el Posgrado del Pacífico</p>
    </div>
  </div>
</template>
  
  <script>
export default {};
</script>
  
  <style scoped>
.main_footer {
  justify-self: end;
  background-color: var(--header-blue);
  height: 57.7vh;
  width: 100vw;
  color: var(--white);
  font-family: "Raleway-Thin", sans-serif;
  text-align: left;
  font-size: 0.875em;
  font-weight: lighter;
  line-height: 2;
}

.footer_top {
  height: 84.75%;
  padding: 2.5rem 0 4.37rem;
  display: flex;
  justify-content: center;
}

.footer_top__column1 {
  width: 41.6vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 0.93rem;
}

.footer_top__column1___Logo {
  height: 11.1vh;
  width: 25vw;
  margin-bottom: 1.25em;
}

.footer_top__column1___Conntact {
  width: 100%;
  height: 18.8vh;
}

.icon {
  width: 2.19em;
  color: var(--main-orange);
  margin-top: 0.5em;
  margin-right: 0.7rem;
  transform: scale(1.1);
}
.footerContact {
  display: flex;
  flex-direction: row;
  margin-top: 0.5em;
}

.footerContact p {
  width: 37.5vw;
}
.column {
  width: 20.8vw;
  height: 100%;
  padding: 2.5em 0.9em;
}
.title{
  font-size: 1.3em;
  padding-bottom: 1.39em;
}
.list{
  display: flex;
  flex-direction: column;
}

.list a{
  text-decoration: none;
  color: var(--white);
  margin-bottom: 0.4em;
}

.list .icon{
  margin-right: -0.5em;
  transform: scale(0.8);
}
.footer_bottom {
  height: 15.25%;
  background-color: var(--main-dark-blue);
  box-shadow: 0px -1px 0px 0px #ccc inset, 0px 1px 0px 0px #646262 inset;
}

.footer_bottom{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10em;
}
</style>
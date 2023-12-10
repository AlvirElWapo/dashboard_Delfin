<template>
    <div class="mainContainer">
        <div class="mainContainer_title">
            <label for="idTra">
                Carga de Información
            </label>
        </div>

        <button class="loadBtn">Seleccionar archivo</button>

    </div>
</template>
  
<script setup lang="ts">

</script>

  
<style scoped>
.loadBtn {
    width: 14vw;
    height: 3vw;
    border-radius: 12px;
    background-color: var(--main-blue);
    color: var(--white);
    border: 2px solid #000;
}

.mainContainer {
    width: 100%;
    height: auto;
    padding: 4vw 1vw;
    background-color: var(--white);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    margin-top: 2vw;
}

.mainContainer_title {
    text-align: left;
    font-size: 1.6vw;
}

.mainContainer_title select {
    color: var(--white);
    background-color: var(--main-blue);
    border-radius: 8px;
    padding: 0.2vw 0.1vw;
    text-align: center;
    border: 1px solid #000;
    width: 6vw;
}

.mainContainer_title select option {
    background-color: #ccc;
    border-radius: 10px;
}

th {
    background-color: var(--header-blue);
    color: var(--white);
}
</style>
  
  
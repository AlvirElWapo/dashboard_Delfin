<template>
    <div class="mainContainer">
        <div class="mainContainer_title">
            <label for="idTra" class="boldText">
                Carga de Información de Ponencias
            </label>
            <p>Para asegurar una carga correcta de las Ponencias, el archivo debe seguir el formato especificado. A continuación, se presenta un ejemplo detallado de cómo debería estructurarse:</p>
            <img src="/ejemplo_archivo_ponencias.jpg" alt="Ejemplo de archivo moderadores">
            <br>

        </div>

        <input type="file" ref="fileInputPonencias" style="display: none" @change="handleFilePonenciasChange">
        <button class="loadBtn" @click="openFilePonenciasInput">Seleccionar archivo</button>
        <div v-if="selectedFilePonenciasName">{{ selectedFilePonenciasName }}</div>
    </div>

    <div class="mainContainer">
        <div class="mainContainer_title">
            <label for="idTra" class="boldText">
                Carga de Información de Moderadores
            </label>
            <p>Para asegurar una carga correcta de los Moderadores, el archivo debe seguir el formato especificado. A continuación, se presenta un ejemplo detallado de cómo debería estructurarse:</p>
            <img src="/ejemplo_archivo_moderadores.png" alt="Ejemplo de archivo moderadores">
            <br>

        </div>

        <input type="file" ref="fileInputModeradores" style="display: none" @change="handleFileModeradoresChange">
        <button class="loadBtn" @click="openFileModeradoresInput">Seleccionar archivo</button>
        <div v-if="selectedFileModeradoresName">{{ selectedFileModeradoresName }}</div>
    </div>
</template>
  
<script setup lang="ts">
import axios from 'axios';
import * as XLSX from 'xlsx';
import { ref } from 'vue';
import { counter } from '@fortawesome/fontawesome-svg-core';

//PONENCIAS
const fileInputPonencias = ref(null);
const selectedFilePonenciasName = ref('');

const openFilePonenciasInput = () => {
  fileInputPonencias.value.click();
};

const validateExcelPonenciasHeaders = (headers) => {
  // Lista de encabezados requeridos
  const requiredHeaders = [
    'ID_Tra', 'Area', 'Linea', 'Compartido', 'NoPonentes', 'Titulo', 'ID_Pon(s)', 'Ponente(s)',
    'Institucion(es)', 'Investigador', 'Fecha', 'Dia', 'Turno', 'Bloque', 'Identificador_Salon',
    'Ubicacion', 'Sede', 'Salon'
  ];

  // Verificar si todos los encabezados requeridos están presentes
  return requiredHeaders.every(header => headers.includes(header));
};

const handleFilePonenciasChange = async () => {
  
  const response = await axios.get(`http://localhost:1234/total_ponencias`);
  const countPonencias = response.data;
  console.log("Ponencias: " + countPonencias);

  if (countPonencias > 0) {
    console.log('La tabla Ponencias en la Base de Datos ya tiene registros. No se cargará la información del Excel.');
    alert('La tabla Ponencias en la Base de Datos ya tiene registros. No se cargará la información del Excel.');
    return;
  }
  
  const file = fileInputPonencias.value.files[0];

  if (file) {
    const fileName = file.name;
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

    if (fileExtension.toLowerCase() === 'xlsx') {
      // Leemos los encabezados del archivo Excel para validarlos
      const headers = await readExcelPonenciasHeaders(file);

      if (validateExcelPonenciasHeaders(headers)) {
        const formData = new FormData();
        formData.append('archivo', file);
        try {
          const response = await axios.post(`http://localhost:1234/subir_archivo_ponencias`, formData);
          console.log(response.data.mensaje);
          alert(response.data.mensaje);
          selectedFilePonenciasName.value = fileName;  // Establecer el nombre del archivo seleccionado
        } catch (error) { 
          console.error('Error al cargar el archivo al servidor', error);
        }
      } else {
        alert('El archivo seleccionado no tiene los encabezados requeridos.');
        console.log('El archivo seleccionado no tiene los encabezados requeridos.');
        selectedFilePonenciasName.value = '';  // Limpiar el nombre del archivo si los encabezados no son correctos
      }
    } else {
      alert('Por favor, selecciona un archivo Excel (.xlsx).');
      console.log('El archivo seleccionado no es un Excel (.xlsx).');
      selectedFilePonenciasName.value = '';  // Limpiar el nombre del archivo si no es un Excel
    }
  }
};

const readExcelPonenciasHeaders = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Solo tomamos la primera hoja del libro de Excel
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Obtener los encabezados (saltar la primera fila)
        const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];

        // Mostrar los encabezados en la consola
        //console.log('Encabezados del archivo Excel:', headers);

        // Verificar si al menos existen los encabezados requeridos
        const requiredHeaders = ['ID_Tra', 'Area', 'Linea', 'Compartido', 'NoPonentes', 'Titulo', 'ID_Pon(s)', 'Ponente(s)', 'Institucion(es)', 'Investigador', 'Fecha', 'Dia', 'Turno', 'Bloque', 'Identificador_Salon', 'Ubicacion', 'Sede', 'Salon'];
        const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));

        if (missingHeaders.length === 0) {
          resolve(headers);
        } else {
          alert(`El archivo no tiene los encabezados requeridos. Faltan: ${missingHeaders.join(', ')}`);
          selectedFilePonenciasName.value = '';  // Limpiar el nombre del archivo si no cumple con los encabezados
          //reject(`El archivo no tiene los encabezados requeridos. Faltan: ${missingHeaders.join(', ')}`);
        }
      } catch (error) {
        alert('Error al leer el archivo Excel.');
        console.error('Error al leer el archivo Excel:', error);
        selectedFilePonenciasName.value = '';  // Limpiar el nombre del archivo en caso de error
        reject('Error al leer el archivo Excel.');
      }
    };

    reader.readAsBinaryString(file);
  });
};



//MODERADORES
const fileInputModeradores = ref(null);
const selectedFileModeradoresName = ref('');

const openFileModeradoresInput = () => {
  fileInputModeradores.value.click();
};

const validateExcelModeradoresHeaders = (headers) => {
  // Lista de encabezados requeridos
  const requiredHeaders = [
    'País', 'Institución', 'Tipo', 'Area_Deseada', 'Area_Alternativa',
    'ID_Mod', 'Moderador', 'Sexo', 'Correo', 'Celular', 'Sala',
    'correo alternativo', 'sala 2'
  ];

  // Verificar si todos los encabezados requeridos están presentes
  return requiredHeaders.every(header => headers.includes(header));
};

const handleFileModeradoresChange = async () => {
  
  const responseModeradores = await axios.get(`http://localhost:1234/total_moderadores`);
  const countModeradores = responseModeradores.data;
  console.log("Moderadores: " + countModeradores);

  if (countModeradores > 0) {
    console.log('La tabla Moderadores en la Base de Datos ya tiene registros. No se cargará la información del Excel.');
    alert('La tabla Moderadores en la Base de Datos ya tiene registros. No se cargará la información del Excel.');
    return;
  }

  if (countModeradores > 0) {
    console.log('La tabla Moderadores en la Base de Datos ya tiene registros. No se cargará la información del Excel.');
    return;
  }
  
  const file = fileInputModeradores.value.files[0];

  if (file) {
    const fileName = file.name;
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

    if (fileExtension.toLowerCase() === 'xlsx') {
      // Leemos los encabezados del archivo Excel para validarlos
      const headers = await readExcelModeradoresHeaders(file);

      if (validateExcelModeradoresHeaders(headers)) {
        const formData = new FormData();
        formData.append('archivo', file);
        try {
          const response = await axios.post(`http://localhost:1234/subir_archivo_moderadores`, formData);
          console.log(response.data.mensaje);
          alert(response.data.mensaje);
          selectedFileModeradoresName.value = fileName;  // Establecer el nombre del archivo seleccionado
        } catch (error) { 
          console.error('Error al cargar el archivo al servidor', error);
        }
      } else {
        alert('El archivo seleccionado no tiene los encabezados requeridos.');
        console.log('El archivo seleccionado no tiene los encabezados requeridos.');
        selectedFileModeradoresName.value = '';  // Limpiar el nombre del archivo si los encabezados no son correctos
      }
    } else {
      alert('Por favor, selecciona un archivo Excel (.xlsx).');
      console.log('El archivo seleccionado no es un Excel (.xlsx).');
      selectedFileModeradoresName.value = '';  // Limpiar el nombre del archivo si no es un Excel
    }
  }
};


const readExcelModeradoresHeaders = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Solo tomamos la primera hoja del libro de Excel
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Obtener los encabezados (saltar la primera fila)
        const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];

        // Mostrar los encabezados en la consola
        //console.log('Encabezados del archivo Excel:', headers);

        // Verificar si al menos existen los encabezados requeridos
        const requiredHeaders = ['País', 'Institución', 'Tipo', 'Area_Deseada', 'Area_Alternativa', 'ID_Mod', 'Moderador', 'Sexo', 'Correo', 'Celular', 'Sala', 'correo alternativo', 'sala 2'];
        const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));

        if (missingHeaders.length === 0) {
          resolve(headers);
        } else {
          alert(`El archivo no tiene los encabezados requeridos. Faltan: ${missingHeaders.join(', ')}`);
          selectedFileModeradoresName.value = '';  // Limpiar el nombre del archivo si no cumple con los encabezados
          //reject(`El archivo no tiene los encabezados requeridos. Faltan: ${missingHeaders.join(', ')}`);
        }
      } catch (error) {
        alert('Error al leer el archivo Excel.');
        console.error('Error al leer el archivo Excel:', error);
        selectedFileModeradoresName.value = '';  // Limpiar el nombre del archivo en caso de error
        reject('Error al leer el archivo Excel.');
      }
    };

    reader.readAsBinaryString(file);
  });
};







</script>



  
<style scoped>
.loadBtn {
    width: 14vw;
    height: 3vw;
    border-radius: 12px;
    background-color: var(--main-blue);
    color: var(--white);
    border: 2px solid #000;
    transition: all 0.3s ease;
}
.loadBtn:hover {
    transform: scale(1.1);
    background-color: var(--main-orange);
    color: #000;
    border: 2px solid var(--main-blue);
}
.loadBtn:active {
    transform: scale(1.15);
    color: #fff;
    background-color: var(--white);
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

.boldText {
  font-weight: bold;
}


th {
    background-color: var(--header-blue);
    color: var(--white);
}
</style>
  
  
<template>
    <div class="mainContainer">
        <div class="mainContainer_title">
            <label for="idTra">
                Carga de Información de Ponencias
            </label>
        </div>

        <button class="loadBtn">Seleccionar archivo</button>

    </div>

    <div class="mainContainer">
        <div class="mainContainer_title">
            <label for="idTra" class="boldText">
                Carga de Información de Moderadores
            </label>
            <p>Para asegurar una carga correcta, el archivo debe seguir el formato especificado. A continuación, se presenta un ejemplo detallado de cómo debería estructurarse:</p>
            <img src="/ejemplo_archivo_moderadores.png" alt="Ejemplo de archivo moderadores">
            <br>

        </div>

        <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
        <button class="loadBtn" @click="openFileInput">Seleccionar archivo</button>
        <div v-if="selectedFileName">{{ selectedFileName }}</div>
    </div>
</template>
  
<script setup lang="ts">
import axios from 'axios';
import * as XLSX from 'xlsx';
import { ref } from 'vue';

const fileInput = ref(null);
const selectedFileName = ref('');

const openFileInput = () => {
  fileInput.value.click();
};

const validateExcelHeaders = (headers) => {
  // Lista de encabezados requeridos
  const requiredHeaders = [
    'País', 'Institución', 'Tipo', 'Area_Deseada', 'Area_Alternativa',
    'ID_Mod', 'Moderador', 'Sexo', 'Correo', 'Celular', 'Sala',
    'correo alternativo', 'sala 2'
  ];

  // Verificar si todos los encabezados requeridos están presentes
  return requiredHeaders.every(header => headers.includes(header));
};

const handleFileChange = async () => {
  const file = fileInput.value.files[0];

  if (file) {
    const fileName = file.name;
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

    if (fileExtension.toLowerCase() === 'xlsx') {
      // Leemos los encabezados del archivo Excel para validarlos
      const headers = await readExcelHeaders(file);

      if (validateExcelHeaders(headers)) {
        // Los encabezados son correctos, puedes continuar con el procesamiento.
        // Resto del código para cargar y procesar el archivo
        selectedFileName.value = fileName;  // Establecer el nombre del archivo seleccionado
      } else {
        alert('El archivo seleccionado no tiene los encabezados requeridos.');
        console.log('El archivo seleccionado no tiene los encabezados requeridos.');
        selectedFileName.value = '';  // Limpiar el nombre del archivo si los encabezados no son correctos
      }
    } else {
      alert('Por favor, selecciona un archivo Excel (.xlsx).');
      console.log('El archivo seleccionado no es un Excel (.xlsx).');
      selectedFileName.value = '';  // Limpiar el nombre del archivo si no es un Excel
    }
  }
};

const readExcelHeaders = async (file) => {
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
          selectedFileName.value = '';  // Limpiar el nombre del archivo si no cumple con los encabezados
          //reject(`El archivo no tiene los encabezados requeridos. Faltan: ${missingHeaders.join(', ')}`);
        }
      } catch (error) {
        alert('Error al leer el archivo Excel.');
        console.error('Error al leer el archivo Excel:', error);
        selectedFileName.value = '';  // Limpiar el nombre del archivo en caso de error
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
  
  
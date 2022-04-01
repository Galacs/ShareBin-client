<template>
  <div class="container">
    <div v-for="i in files" :key="i.fileid" class="popup">
        <fileCard :file="i" @update="update" />
      </div>
    </div>
</template>

<script setup lang="ts">
import fileCard from '~~/components/files/fileCard.vue'

import { api_url } from '@/endpoints.js';
import { IFile } from '@/interfaces/file'

var files = ref<Array<IFile>>();

const update = async() => {
  fetch(`${api_url}/account/files`,
    {
      method: 'get',
      credentials: 'include',
    })
    .then(async res => {
      const data = await res.json();
      data.forEach(i => {i.upload = new Date(i.upload) });
      files.value = data;
      console.log(data);
    })
    .catch(async e => {
    });
}
await update();
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.popup {
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: tomato;
  box-sizing: border-box;
  padding: 20px;
  outline: 2px solid blue;
  /* flex: 1; */
}

</style>
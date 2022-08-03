<template>
  <div class="container">
    <div v-for="i in files" :key="i.fileid" class="item">
        <filesCard :file="i" @update="update" />
      </div>
    </div>
</template>

<script setup lang="ts">
import fileCard from '~~/components/files/card.vue'

import { apiUrl } from '@/endpoints.js';
import { IFile } from '@/interfaces/file'

var files = ref<Array<IFile>>();

const update = async() => {
  fetch(`${apiUrl}/account/files`,
    {
      method: 'get',
      credentials: 'include',
    })
    .then(async res => {
      const data = await res.json();
      data.forEach(i => {i.upload = new Date(i.upload) });
      data.forEach(i => {i.expiration = new Date(i.expiration) });
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

.item {
  background-color: tomato;
  padding: 20px;
  outline: 2px solid blue;
  flex-grow: 1;
  min-width: 22.5em;
  width: calc(100% * 1/6);
}

</style>
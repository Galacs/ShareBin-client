<template>
  <div class="container">
    <div v-for="i in files" :key="i.fileid" class="popup">
        <file :file="i" @update="update" />
      </div>
    </div>
</template>

<script setup lang="ts">
import file from '@/components/files/file.vue'

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
      console.log(data);
      files.value = data;
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

</style>
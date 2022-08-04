<template>
  <div class="flex flex-row flex-wrap justify-start">
    <div
      v-for="i in files"
      :key="i.fileid"
      class="p-5 bg-red-400 outline
      outline-2 outline-blue-900 w-2/6 min-w-[22.5rem]"
    >
      <filesCard :file="i" @update="refresh()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { apiUrl } from '@/endpoints.js'
import { useFilesListStore } from '@/store/filesList'

const { files } = storeToRefs(useFilesListStore())

const { data, refresh } = await useFetch(`${apiUrl}/account/files`,
  {
    method: 'get',
    headers: useRequestHeaders(['cookie'])
  })
watch(data, () => {
  console.log(data.value[0])
  data.value.forEach((i) => { i.upload = new Date(i.upload) })
  data.value.forEach((i) => { i.expiration = new Date(i.expiration) })
  files.value = data.value
})
if (process.server) {
  await refresh()
}

</script>

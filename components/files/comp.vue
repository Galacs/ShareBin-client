<template>
  <div class="flex flex-row flex-wrap justify-start">
    <div
      v-for="i in files"
      :key="i.fileid"
      class="bg-red-400 p-5 outline
      outline-2 outline-blue-900 w-2/6 min-w-[22.5rem]"
    >
      <filesCard :file="i" @update="update" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiUrl } from '@/endpoints.js'
import { IFile } from '@/interfaces/file'

const files = ref<Array<IFile>>()

const update = async () => {
  await fetch(`${apiUrl}/account/files`,
    {
      method: 'get',
      credentials: 'include'
    })
    .then(async (res) => {
      const data = await res.json()
      data.forEach((i) => { i.upload = new Date(i.upload) })
      data.forEach((i) => { i.expiration = new Date(i.expiration) })
      files.value = data
      console.log(data)
    })
    .catch(async (e) => {
    })
}
await update()
</script>

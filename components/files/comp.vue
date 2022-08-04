<template>
  <div v-if="pending">
    Loading ...
  </div>
  <div v-else class="flex flex-row flex-wrap justify-start">
    <button @click="refresh()">
      refresh
    </button>
    <div
      v-for="i in files"
      :key="i.fileid"
      class="p-5 bg-red-400 outline
      outline-2 outline-blue-900 w-2/6 min-w-[22.5rem]"
    >
      <filesCard :file="i" @update="refresh" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiUrl } from '@/endpoints.js'
import { IFile } from '@/interfaces/file'

const files = ref<Array<IFile>>()

// console.log('hello i am under the water')

const { pending, data: posts, refresh } = useLazyFetch(`${apiUrl}/account/files`,
  {
    method: 'get',
    credentials: 'include'
  })

watch(posts, (newPosts) => {
  const data: Array<any> = newPosts
  data.forEach((i) => { i.upload = new Date(i.upload) })
  data.forEach((i) => { i.expiration = new Date(i.expiration) })
  files.value = data
  console.log(data)
  // Because posts starts out null, you won't have access
  // to its contents immediately, but you can watch it.
})

// const update = async () => {
//   await fetch(`${apiUrl}/account/files`,
//     {
//       method: 'get',
//       credentials: 'include'
//     })
//     .then(async (res) => {
//       const data = await res.json()
//       data.forEach((i) => { i.upload = new Date(i.upload) })
//       data.forEach((i) => { i.expiration = new Date(i.expiration) })
//       files.value = data
//       console.log(data)
//     })
//     .catch(async (e) => {
//     })
// }
// await update()
</script>

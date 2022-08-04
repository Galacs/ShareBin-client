<template>
  <div>
    <p>{{ $route.params.fileid }}</p>
    <!-- {{ info.filename }} -->
  </div>
</template>

<script lang="ts" setup>
import { apiUrl } from '@/endpoints.js'
import { IFile } from '@/interfaces/file.js'

// let info: IFile

const route = useRoute()

await fetch(`${apiUrl}/files/meta/${route.params.fileid}`,
  {
    method: 'get',
    credentials: 'include'
  })
  .then(async (res) => {
    console.log(1)
    console.log(res.body)
    const data = await res.json()
    console.log(2)
    data.upload = new Date(data.upload)
    data.expiration = new Date(data.expiration)
    // info = data
  }).catch((e) => {
    console.log(e)
  })
</script>

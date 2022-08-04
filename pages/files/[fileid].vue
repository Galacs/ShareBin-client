<template>
  <div>
    <p>{{ $route.params.fileid }}</p>
    <!-- {{ info.filename }} -->
    <file-preview :file="data" />
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
import { apiUrl } from '@/endpoints.js'
import { IFile } from '@/interfaces/file'

const route = useRoute()

const { data } = await useFetch<IFile>(`${apiUrl}/files/meta/${route.params.fileid}`,
  {
    method: 'get',
    headers: useRequestHeaders(['cookie'])
  })
watch(data, () => {
  console.log(2)
  data.value.upload = new Date(data.value.upload)
  data.value.expiration = new Date(data.value.expiration)
})

</script>

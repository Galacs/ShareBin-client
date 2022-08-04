<template>
  <img v-if="isImg" :src="url">
</template>

<script setup lang="ts">
import { apiUrl } from '@/endpoints.js'
import { IFile } from '@/interfaces/file'

const props = defineProps<{
  file: IFile;
}>()

const route = useRoute()
const url = `${apiUrl}/files/${route.params.fileid}`

// Images
const isImg = ['image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'].includes(props.file.mime)

</script>

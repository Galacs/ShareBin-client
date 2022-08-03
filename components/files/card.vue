<template>
  <div
    class="flex flex-col relative bg-white
    p-8 rounded-xl border-gray-500 border-2"
  >
    <h3 class="truncate">
      {{ file.filename }}
    </h3>
    <h3 class="truncate text-gray-400">
      {{ file.fileid }}
    </h3>
    <h4 class="">
      {{ formatFileSize(file.size) }}
    </h4>
    <h4 class="">
      {{ formatDate(file.upload) }}
    </h4>
    <h4 class="">
      {{ file.downloaded }}
    </h4>
    <div class="pt-4 pb-0 flex justify-center">
      <NuxtLink class="btn bg-blue-500 grow" :to="getLink(file.fileid)" target="_blank">
        Télécharger
      </NuxtLink>
      <button class="btn bg-red-600 grow" target="_blank" @click="deleteFile(file.fileid)">
        Supprimer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiUrl } from '@/endpoints.js'
import { IFile } from '@/interfaces/file'

const props = defineProps<{
  file: IFile;
}>()

const emit = defineEmits<{(e: 'update')}>()

const getLink = (fileid: string) => {
  return `/files/${fileid}`
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}

function formatFileSize (size: number): string {
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

const deleteFile = (fileid: string) => {
  fetch(`${apiUrl}/files/${fileid}`, {
    method: 'delete',
    credentials: 'include'
  }).then(async (res) => {
    const data = await res.json()
    if (data.success) {
      console.log(data)
      emit('update')
    } else {
      console.log(data)
    }
  })
}
</script>

<style scoped>
.btn {
  font: 13px/27px Roboto, RobotoDraft, Arial, sans-serif;
  white-space: nowrap;
  display: inline-block;
  outline: none;
  font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 16px;
  margin-right: 8px;
  margin-top: 8px;
  padding: 9px 23px;
  text-align: center;
  vertical-align: middle;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid transparent;
  margin-left: 8px;
  box-shadow: 0 1px 2px 0 rgba(66, 133, 244, 0.3),
    0 1px 3px 1px rgba(66, 133, 244, 0.15);
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}
</style>

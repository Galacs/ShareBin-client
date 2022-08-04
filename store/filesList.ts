import { defineStore } from 'pinia'

import { IFile } from '@/interfaces/file'

export const useFilesListStore = defineStore('filesList', () => {
  const files = ref<Array<IFile>>()

  return { files }
})

<template>
  <div class="popup-inner">
    <div class="container">
      <h2 class="info filename">{{ file.filename }}</h2>
      <h3 class="info">{{ file.fileid }}</h3>
      <h4 class="info">{{ formatFileSize(file.size) }}</h4>
      <h4 class="info">{{ formatDate(file.upload) }}</h4>
      <a class="btn" :href="getLink(file.fileid)" target="_blank">Télécharger</a>
      <button class="btn delete" @click="deleteFile(file.fileid)" target="_blank">Supprimer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api_url } from "@/endpoints.js";
import { IFile } from "@/interfaces/file";

const props = defineProps<{
  file: IFile;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const getLink = (fileid: String) => {
  return `${api_url}/files/${fileid}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

function formatFileSize(size: number): string {
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

const deleteFile = async (fileid: String) => {
  fetch(`${api_url}/files/${fileid}`, {
    method: "delete",
    credentials: "include",
  }).then(async (res) => {
    const data = await res.json();
    if (data.success) {
      console.log(data);
      emit("update");
    } else {
      console.log(data);
    }
  });
};
</script>

<style scoped>
.filename {
  text-overflow: ellipsis;
}

.info {
  margin: 0px;
}

.container {
  display: flex;
  flex-direction: column;
}

.popup-inner {
  background: #fff;
  padding: 32px;
  border-radius: 10px;
  border: rgb(105, 104, 104);
  border-width: 3px;
  border-style: solid;
}


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
  min-width: 96px;
  padding: 9px 23px;
  text-align: center;
  vertical-align: middle;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid transparent;
  margin-left: 8px;
  background: #2b7de9;
  box-shadow: 0 1px 2px 0 rgba(66, 133, 244, 0.3),
    0 1px 3px 1px rgba(66, 133, 244, 0.15);
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}

.delete {
  background: #e92323;
}
</style>

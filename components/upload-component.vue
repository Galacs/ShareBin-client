<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <h1>{{ fileid }}</h1>
      <a :href="`${fileurl}`">{{ fileurl }}</a>
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
        <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { api_url } from '@/endpoints.js';

const file = ref(null)

var fileid = ref();
var fileurl = ref();

var filename = '';
// sanitize filename
var submitFile = async() => {
  console.log(filename);
  console.log(file.value.files[0]);
  fetch(`${api_url}/files?filename=${filename}&expiration=1701983624`, 
  {
    method: 'post',
    headers: { 'content-type': 'application/octet-stream' },
    credentials: 'include',
    body: file.value.files[0]
  })
  .then(async res => {
    const data = await res.json();
    if (data.success) {
      console.log('nice');
      console.log(data);
      fileid.value = data.fileid;
      fileurl.value = data.url;
    }
    else {
      console.log(data);
    }
  })
  console.log("ye");
}

var handleFileUpload = async() => {
  console.log("selected file",file.value.files[0].name)
  filename = file.value.files[0].name;
}

</script>

<script>


</script>

<style>
/*  */

</style>
<template>
  <div class="container">
    <div v-for="i in files" :key="i.upload" class="popup">
      <div class="popup-inner">
        <div class="container">
          <h2 class="info">{{ i.filename }}</h2>
          <h3 class="info">{{ i.fileid }}</h3>
          <h4 class="info">{{ i.upload }}</h4>
          <a class="btn" :href="getLink(i.fileid)" target="_blank">Télécharger</a>
          <button class="delete" @click="deleteFile(i.fileid)" target="_blank">Supprimer</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api_url } from '@/endpoints.js';

var files = ref();

const getLink = (id) => {
  return `${api_url}/files/${id}`
}

const deleteFile = async(id) => {
  fetch(`${api_url}/files/${id}`,
    {
      method: 'delete',
      credentials: 'include'
    })
    .then(async res => {
      const data = await res.json();
      if (data.success) {
        console.log('nice');
        console.log(data);
        await update();
      }
      else {
        console.log(data);
      }
    })
}

const update = async() =>{
  fetch(`${api_url}/account/files`,
    {
      method: 'get',
      credentials: 'include',
    })
    .then(async res => {
      const data = await res.json();
      console.log(data);
      files.value = data;
    })
    .catch(async e => {
      // console.log("no tings")
    });
}
await update();
</script>

<style scoped>
/* .container {
  display: flex;
  flex-direction: column;
}
.file {
  background-color: aqua;
}
 */

.info {
  margin: 0px;
}

.container .container {
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.popup {
	bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup .popup-inner {
  background: #fff;
  padding: 32px;
  border-radius: 10px;
  border: rgb(105, 104, 104);
  border-width: 3px;
  border-style: solid;
}

@mixin max-width($width) {
	@media screen and (max-width: $width) {
		@content;
	}
}
.popup {
	background-color: tomato;
	box-sizing: border-box;
	padding: 20px;
	outline: 2px solid blue;
	/* flex: 1; */
}

@include max-width(992px) {
	.popup {
		flex-basis: 25%;
		background-color: red;
	}
}

@include max-width(640px) {
	.popup {
		flex-basis: 50%;
		background-color: green;
	}
}

.btn {
  font: 13px/27px Roboto,RobotoDraft,Arial,sans-serif;
  white-space: nowrap;
  display: inline-block;
  outline: none;
  font-family: Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
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
  box-shadow: 0 1px 2px 0 rgba(66,133,244,0.3),0 1px 3px 1px rgba(66,133,244,0.15);
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}

.delete {
    font: 13px/27px Roboto,RobotoDraft,Arial,sans-serif;
  white-space: nowrap;
  display: inline-block;
  outline: none;
  font-family: Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
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
  box-shadow: 0 1px 2px 0 rgba(66,133,244,0.3),0 1px 3px 1px rgba(66,133,244,0.15);
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  background: #e92323;
}

</style>
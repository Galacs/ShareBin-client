<template>
  <div class="container">
    <!-- <div>
      <label>
        File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
      </label>
      <button v-on:click="submitFile()">Submit</button>
      <a :href="`${fileurl}`">{{ fileurl }}</a>
    </div>-->

    <form id="file-upload-form" class="uploader">
      <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

      <label for="file-upload" id="file-drag">
        <img id="file-image" src="#" alt="Preview" class="hidden" />
        <div id="start" ref="start">
          <i class="fa fa-download" aria-hidden="true"></i>
          <div>Choisissez un fichier ou faite glisser</div>
          <span id="file-upload-btn" class="btn btn-primary">Choisissez un fichier</span>
        </div>
        <div id="response" ref="response" v-for="i in files">
          <div id="messages" ref="message">{{ i.message }}</div>
          <a :href="`${i.fileurl}`">{{ i.fileurl }}</a>
          <progress
            ref="pBar"
            class="progress"
            id="file-progress"
            :value="i.progressBarValue"
            :max="i.progressBarMaxValue"
          >
            <span>{{ i.progressBarValue }}</span>%
          </progress>
        </div>
      </label>
    </form>
    <!-- <a v-for="i in fileurl" :href="`${i.fileurl}`">{{ i }}</a> -->
  </div>
</template>

<script setup>
import { api_url } from "@/endpoints.js";

const file = ref(null);

const start = ref();
const files = ref([]);
const response = ref([]);

var fileid = ref([]);
var fileurl = ref([]);

var filename = "";

// var submitFile = async () => {
//   console.log(filename);
//   console.log(encodeURI(filename));
//   console.log(file.value.files[0]);
//   fetch(`${api_url}/files?filename=${encodeURIComponent(filename)}&expiration=1701983624`,
//     {
//       method: 'post',
//       headers: { 'content-type': 'application/octet-stream' },
//       credentials: 'include',
//       body: file.value.files[0]
//     })
//     .then(async res => {
//       const data = await res.json();
//       if (data.success) {
//         console.log('nice');
//         console.log(data);
//         fileid.value = data.fileid;
//         fileurl.value = data.url;
//       }
//       else {
//         console.log(data);
//       }
//     })
//   console.log("ye");
// }

// File Upload
//
function ekUpload() {
  function Init() {
    console.log("Upload Initialised");

    var fileSelect = document.getElementById("file-upload"),
      fileDrag = document.getElementById("file-drag");

    fileSelect.addEventListener("change", fileSelectHandler, false);

    // Is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // File Drop
      fileDrag.addEventListener("dragover", fileDragHover, false);
      fileDrag.addEventListener("dragleave", fileDragHover, false);
      fileDrag.addEventListener("drop", fileSelectHandler, false);
    }
  }

  function fileDragHover(e) {
    var fileDrag = document.getElementById("file-drag");

    e.stopPropagation();
    e.preventDefault();

    fileDrag.className =
      e.type === "dragover" ? "hover" : "modal-body file-upload";
  }

  function fileSelectHandler(e) {
    // Fetch FileList object
    var filesd = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    fileDragHover(e);

    // Process all File objects
    for (var i = 0, f; (f = filesd[i]); i++) {
      console.log(f.size);
      files.value.push({});
      files.value[i].filesize = f.size;
      files.value[i].progressBarMaxValue = f.size;
      console.log(files.value);
      parseFile(f, i);
      uploadFile(f, i);
    }
  }

  function parseFile(file, i) {
    files.value[i].message = file.name;
    start.value.classList.add("hidden");
  }

  function updateFileProgress(i, e) {
    if (e.lengthComputable) {
      files.value[i].progressBarValue = e.loaded;
    }
  }

  function uploadFile(file, i) {
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      xhr.upload.addEventListener(
        "progress",
        updateFileProgress.bind(null, i),
        false
      );

      // Start upload
      xhr.open(
        "POST",
        `${api_url}/files?filename=${encodeURIComponent(
          file.name
        )}&expiration=1701983624`,
        true
      );
      // xhr.setRequestHeader('X-File-Name', file.name);
      // xhr.setRequestHeader('X-File-Size', file.size);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.withCredentials = true;
      xhr.responseType = "json";
      xhr.onreadystatechange = () => {
        return (function () {
          if (xhr.readyState === 4) {
            console.log(xhr.response.url);
            files.value[i].fileurl = xhr.response.url;
            fileid.value.push(xhr.response.fileid);
            fileurl.value.push(xhr.response.url);
          }
        })(i);
      };
      console.log("sending....");
      xhr.send(file);
      console.log("sent");
    }
  }

  // Check for the various File API support.
  if (process.client) {
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById("file-drag").style.display = "none";
    }
  }
}
ekUpload();
</script>

<style scoped lang="scss">
$theme: #418aeb;
$dark-text: #5f6982;

html,
body,
* {
  box-sizing: border-box;
  font-size: 16px;
}
html,
body {
  height: 100%;
  text-align: center;
}
body {
  padding: 2rem;
  background: #f8f8f8;
}

h2 {
  font-family: "Roboto", sans-serif;
  font-size: 26px;
  line-height: 1;
  color: $theme;
  margin-bottom: 0;
}
p {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  color: $dark-text;
}
// Upload Demo
//

form {
  margin-top: 100px;
}

.uploader {
  display: block;
  clear: both;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;

  label {
    float: left;
    clear: both;
    width: 100%;
    padding: 2rem 1.5rem;
    text-align: center;
    background: #fff;
    border-radius: 7px;
    border: 3px solid #eee;
    transition: all 0.2s ease;
    user-select: none;

    &:hover {
      border-color: $theme;
    }
    &.hover {
      border: 3px solid $theme;
      box-shadow: inset 0 0 0 6px #eee;

      #start {
        i.fa {
          transform: scale(0.8);
          opacity: 0.3;
        }
      }
    }
  }

  #start {
    float: left;
    clear: both;
    width: 100%;
    &.hidden {
      display: none;
    }
    i.fa {
      font-size: 50px;
      margin-bottom: 1rem;
      transition: all 0.2s ease-in-out;
    }
  }
  #response {
    float: left;
    clear: both;
    width: 100%;
    &.hidden {
      display: none;
    }
    #messages {
      margin-bottom: 0.5rem;
    }
  }

  #file-image {
    display: inline;
    margin: 0 auto 0.5rem auto;
    width: auto;
    height: auto;
    max-width: 180px;
    &.hidden {
      display: none;
    }
  }

  #notimage {
    display: block;
    float: left;
    clear: both;
    width: 100%;
    &.hidden {
      display: none;
    }
  }

  progress,
  .progress {
    // appearance: none;
    display: inline;
    clear: both;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    height: 8px;
    border: 0;
    border-radius: 4px;
    background-color: #eee;
    overflow: hidden;
  }

  .progress[value]::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #eee;
  }

  .progress[value]::-webkit-progress-value {
    background: linear-gradient(to right, darken($theme, 8%) 0%, $theme 50%);
    border-radius: 4px;
  }
  .progress[value]::-moz-progress-bar {
    background: linear-gradient(to right, darken($theme, 8%) 0%, $theme 50%);
    border-radius: 4px;
  }

  input[type="file"] {
    display: none;
  }

  div {
    margin: 0 0 0.5rem 0;
    color: $dark-text;
  }
  #response {
    display: flex;
    align-items: baseline;
    border-radius: 10px;
    border: rgb(105, 104, 104);
    border-width: 3px;
    border-style: solid;
    padding: 0.5em 1em 0;
  }

  #response > * {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  #response > div {
    max-width: 10em;
  }
  .btn {
    display: inline-block;
    margin: 0.5rem 0.5rem 1rem 0.5rem;
    clear: both;
    font-family: inherit;
    font-weight: 700;
    font-size: 14px;
    text-decoration: none;
    text-transform: initial;
    border: none;
    border-radius: 0.2rem;
    outline: none;
    padding: 0 1rem;
    height: 36px;
    line-height: 36px;
    color: #fff;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    background: $theme;
    border-color: $theme;
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
}
</style>

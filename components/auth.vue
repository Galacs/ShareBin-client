<template>
  <div class="container">
    <h2 v-if="isLogin">Login</h2>
    <h2 v-else>Register</h2>
    <input @keyup.enter="post" v-model="username" type="text" placeholder="Username" />
    <input @keyup.enter="post" v-model="password" type="password" placeholder="Password" />
    <button v-if="props.isLogin" @click="post">Login</button>
    <button v-else>Register</button>
    <h1>{{ username }}</h1>
    <h1>{{ password }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  isLogin: Boolean,
})

let username = ref();
let password = ref();

import { api_url } from '@/endpoints.js';

async function post() {
      fetch(`${api_url}/auth/local/${props.isLogin ? "login" : "register"}`, 
        {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ 
            username: username.value, 
            password: password.value,
          }),
        })
        .then(async res => {
          const data = await res.json();
          if (data.success) {
            console.log('nice');
            console.log(data);
          }
          else {
            console.log(data);
          }
        })
    };
</script>

<style scoped>
input {
    margin-top: 1%;
    margin-bottom: 1%;
}

.container {
   display: flex;
   flex-direction: column;
    text-align: left;
    margin-bottom: 20px;
    position: relative;
}

input {
    font-size: 17px;
    height: 45px;
    width: 250px;
    margin: 0 auto;
    vertical-align: baseline;
    /* padding: 6px 0 6px 50px; */
    margin: 0 auto;
    border: 2px solid #eee;
    border-radius: 5px;
    box-shadow: none;
    outline: none;
}
</style>

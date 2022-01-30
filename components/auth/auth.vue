<template>
  <div class="container">
    <h2 v-if="isLogin">Se connecter</h2>
    <h2 v-else>S'enregistrer</h2>
    <input @keyup.enter="post" v-model="username" type="text" placeholder="Nom d'utilisateur" />
    <input @keyup.enter="post" v-model="password" type="password" placeholder="Mot de passe" />
    <button class="login-btn" v-if="props.isLogin" @click="post">Se connecter</button>
    <button class="login-btn" v-else>S'enregistrer</button>
    <div v-if="state.success" class="success state">
      {{ state.message }}
    </div>
    <div v-if="state.error" class="error state">
      {{ state.message }}
    </div>
    <!-- <h1>{{ username }}</h1>
    <h1>{{ password }}</h1> -->
  </div>
</template>

<script setup>
const props = defineProps({
  isLogin: Boolean,
})

let username = ref();
let password = ref();

let state = ref({
  success: false,
  error: false,
  message: "",
});

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
            state.value.success = true;
            state.value.error = false;
            state.value.message = "Connection réussite"
          }
          else {
            console.log(data);
            state.value.error = true;
            state.value.success = false;
            state.value.message = data.msg;
          }
        })
    };
</script>

<style scoped>
button {
  position: inherit;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
}

h2 {
  margin: 0 auto;
}

input {
  padding-left: 1rem;
  font-size: 17px;
  height: 45px;
  /* width: 250px; */
  margin: 1rem auto;
  vertical-align: baseline;
  /* padding: 6px 0 6px 50px; */
  border: 2px solid #eee;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
}

.state {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 15px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.158);
  font-family: Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 16px;
}

.error {
  background-color: rgb(236, 147, 31);
}

.success {
  background-color: rgb(106, 236, 31);
}
</style>

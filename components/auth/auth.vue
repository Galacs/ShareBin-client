<template>
  <div class="flex flex-col text-left mb-5 relative w-full">
    <h2>
      {{ isLogin ? 'Se connecter' : "S'enregistrer" }}
    </h2>
    <input v-model="username" type="text" placeholder="Nom d'utilisateur" @keyup.enter="post">
    <input v-model="password" type="password" placeholder="Mot de passe" @keyup.enter="post">
    <button class="login-btn" @click="post">
      {{ isLogin ? 'Se connecter' : "S'enregistrer" }}
    </button>
    <div v-if="state" :class="{ error: state.error, success: state.success}" class="state">
      {{ state.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { apiUrl } from '@/endpoints.js'
import { useUserStore } from '@/store/user'

const { username: storeUsername } = storeToRefs(useUserStore())

const props = defineProps<{
  isLogin: boolean
}>()

defineEmits(['close'])

const username = ref()
const password = ref()

const state = ref({
  success: false,
  error: false,
  message: ''
})

const post = async () => {
  await fetch(`${apiUrl}/auth/local/${props.isLogin ? 'login' : 'register'}`,
    {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })
    .then(async (res) => {
      const data = await res.json()
      if (data.success) {
        state.value.success = true
        state.value.error = false
        state.value.message = 'Connection réussite'
        storeUsername.value = data.username
      } else {
        console.log(data)
        state.value.error = true
        state.value.success = false
        state.value.message = data.msg
      }
    })
}
</script>

<style scoped>
button {
  position: inherit;
  margin: 0;
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

.login-btn {
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

</style>

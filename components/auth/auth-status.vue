<template>
  <div>
    <auth-dialog
      v-if="loginDialog"
      :dialog="() => loginDialog = false"
      :is-login="loginDialog"
      :close="() => { registerDialog = false; loginDialog = false; refresh() }"
      :setregister-dialog="() => {registerDialog = true; loginDialog=false}"
    >
      <auth :is-login="true" class="AuthComponent" />
    </auth-dialog>

    <auth-dialog
      v-if="registerDialog"
      :dialog="() => loginDialog = false"
      :is-login="loginDialog"
      :close="() => { registerDialog = false; loginDialog = false; refresh() }"
      :setdialog="() => {registerDialog = false; loginDialog=true}"
    >
      <auth :is-login="false" class="AuthComponent" />
    </auth-dialog>
    <button v-if="!isLoggedIn" class="login-btn" @click="login()">
      {{ text }}
    </button>
    <div v-if="isLoggedIn" class="login-btn">
      {{ username }}
    </div>
  </div>
</template>

<script setup>
import { apiUrl } from '@/endpoints.js'

const text = 'Login'

const loginDialog = ref(false)
const registerDialog = ref(false)

const isLoggedIn = ref(false)

const username = ref()

const login = () => {
  if (!isLoggedIn.value) { loginDialog.value = true }
}

if (process.server) {
  const { data, refresh } = await useFetch(`${apiUrl}/protected`,
    {
      method: 'get',
      headers: useRequestHeaders(['cookie'])
    })

  watch(data, (newData) => {
    if (newData.success) {
      isLoggedIn.value = true
      username.value = newData.username
    } else {
      isLoggedIn.value = false
    }
  })

  refresh()
}
</script>

<style scoped>
.login-btn {
  position: absolute;
  right:0;
  top:0;
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

<template>
  <div>
    <auth-dialog v-if="loginDialog" :dialog="() => loginDialog = false" :isLogin="loginDialog"
    :close="() => { registerDialog = false; loginDialog = false; check() }"
    :setregisterDialog="() => {registerDialog = true; loginDialog=false}"
    >
      <auth :isLogin='true' class="AuthComponent"/>
    </auth-dialog>

    <auth-dialog v-if="registerDialog" :dialog="() => loginDialog = false" :isLogin="loginDialog"
    :close="() => { registerDialog = false; loginDialog = false; check() }"
    :setdialog="() => {registerDialog = false; loginDialog=true}"
    >
      <auth :isLogin='false' class="AuthComponent"/>
    </auth-dialog>
      <button v-if="!isLoggedIn" @click="login()" class="login-btn">{{ text }}</button>
      <div class="login-btn" v-if="isLoggedIn">
        {{ username }}
      </div>
  </div>
</template>

<script setup>
import { apiUrl } from '@/endpoints.js';

var text = "Login"

var loginDialog = ref(false)
var registerDialog = ref(false)

var isLoggedIn = ref(false)

var username = ref();

var login = () => {
  if (!isLoggedIn.value) loginDialog.value = true
}

var check = async() => {
  fetch(`${apiUrl}/protected`, 
    {
      method: 'get',
      credentials: 'include',
    })
    .then(async res => {
      const data = await res.json();
      if (data.success) {
        isLoggedIn.value = true
        username.value = data.username;
        console.log(data);
      }
      else {
        isLoggedIn.value = false;
        console.log(data);
      }
    })
    .catch(async e => {
      // console.log("no tings")
    });
}

await check();

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
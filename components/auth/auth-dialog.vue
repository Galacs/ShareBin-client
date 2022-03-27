<template>
  <div @click="" class="popup">
      <div class="popup-inner">
          <slot />
          <div class="container">
            <a @click="close">Fermer</a>
            <a v-if="isLogin" @click="setregisterDialog">Créer un compte</a>
            <a v-else @click="setdialog">Se connecter</a>
          </div>
      </div>
  </div>
</template>

<script setup>

const props = defineProps({
  setdialog: Function,
  setregisterDialog: Function,
  close: Function,
  isLogin: Boolean,
})

</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}

.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}
.popup .popup-inner {
    background: #FFF;
    padding: 32px;
    border-radius: 10px;
    border: rgb(105, 104, 104);
    border-width: 3px;
    border-style: solid;
}

a {
    text-decoration: underline;
    color: grey;
    cursor: pointer;
}

a:hover {
    color: rgb(70, 70, 70);
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
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
</style>
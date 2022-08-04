<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <div class="container">
        <a
          class="underline text-gray-500 cursor-pointer hover:text-gray-600"
          @click="$emit('close')"
        >Fermer</a>
        <a
          class="underline text-gray-500 cursor-pointer hover:text-gray-600"
          @click="$emit('switch')"
        >{{ isLogin ? "Se connecter" : "Créer un compte" }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLogin: boolean
}>()

const isLogin = toRef(props, 'isLogin')

defineEmits(['close', 'switch'])
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
  background: #fff;
  padding: 32px;
  border-radius: 10px;
  border: rgb(105, 104, 104);
  border-width: 3px;
  border-style: solid;
}
</style>

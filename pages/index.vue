<template>
  <div>
    <Popup>
      <AuthComponent :isLogin='true' class="AuthComponent"/>
    </Popup>
  </div>
</template>

<script setup>
import AuthComponent from '@/components/auth.vue'
import Upload from '@/components/upload-component.vue'
import Popup from '@/components/login-dialog-comp.vue'

</script>

<style>
.AuthComponent {
  margin-left: 40%;
  margin-right: 40%;
}

</style>
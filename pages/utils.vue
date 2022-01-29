<template>
  <div>
    <AuthComponent :isLogin='true' class="AuthComponent"/>
    <AuthComponent :isLogin='false' class="AuthComponent"/>
    <Upload class="Upload"/>
  </div>
</template>

<script setup>
import AuthComponent from '@/components/auth.vue'
import Upload from '@/components/upload-component.vue'

</script>
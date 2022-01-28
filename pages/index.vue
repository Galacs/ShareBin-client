<template>
  <div>
    <AuthComponent :isLogin='true' class="AuthComponent"/>
  </div>
</template>

<script setup>
import AuthComponent from '@/components/auth.vue'

</script>

<style>
.AuthComponent {
  margin-left: 40%;
  margin-right: 40%;
}

</style>
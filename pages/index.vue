<template>
  <div>
    <upload />
    <file-list />
  </div>
</template>

<script setup>
import upload from '@/components/upload.vue';
import fileList from '@/components/files/fileList.vue';
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}

</style>
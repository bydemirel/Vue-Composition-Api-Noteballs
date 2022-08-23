<template>
<div>
  <NavBar></NavBar>

  <div class="container is-max-desktop px-2 py-4">
     <RouterView></RouterView>
  </div>
</div>
</template>

<script setup>
/* imports*/
import NavBar from '@/components/Layout/NavBar.vue'
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
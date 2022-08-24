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
import { onMounted } from '@vue/runtime-core';
import { useStoreNotes } from './stores/storeNotes';

/* store */
const storeNotes = useStoreNotes()

/* mounted */
onMounted(() =>{
  storeNotes.getNotes()
})
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
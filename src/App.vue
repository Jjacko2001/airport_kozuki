<script setup lang="ts">
import Navbar from "./components/NavBar.vue"

</script>

<template>

  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 bg-gray-50">
      <router-view />
    </main>
  </div>



</template>

<style scoped>
</style>

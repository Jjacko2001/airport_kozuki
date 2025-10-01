<script setup lang="ts">
import { RouterLink } from "vue-router"


</script>

<template>
  <nav class="bg-gray-900 text-white shadow">
    <div class="max-w-10xl mx-auto px-1 flex justify-between h-16 items-center">
      <div class="flex items-center space-x-2">
        <span class="text-lg font-bold"><RouterLink to="/" class="hover:text-blue-300">✈️ Aéroport Kozuki</RouterLink></span>
        <span class="text-sm text-blue-200">Système I</span>
      </div>

      <div class="hidden md:flex space-x-8">
        <RouterLink to="/" class="hover:text-blue-300">Accueil</RouterLink>
        <RouterLink to="/avions" class="hover:text-blue-300">✈️Avions</RouterLink>
        <RouterLink to="/pistes" class="hover:text-blue-300">🛤️Pistes</RouterLink>
        <RouterLink to="/hangars" class="hover:text-blue-300">🏢Hangars</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
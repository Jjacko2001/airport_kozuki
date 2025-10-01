<script setup lang="ts">
import { RouterLink } from "vue-router"



</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Bienvenue à l’Aéroport Kozuki</h1>

    </div>



    <div class="w-full h-[50vh] overflow-hidden">
      <video autoplay muted loop playsinline class="w-full h-full object-cover">
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
    <br>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RouterLink to="/avions" class="hover:text-black-300">
        <div class="bg-white shadow rounded-xl p-6 text-center">
          <p class="text-4xl font-bold text-blue-600">5</p>
          <p class="text-blue-600 hover:text-black-300">Avions</p>
        </div>
      </RouterLink>

      <RouterLink to="/pistes" class="hover:text-black-300">
        <div class="bg-white shadow rounded-xl p-6 text-center">
          <p class="text-4xl font-bold text-green-600">4</p>
          <p class="text-green-600">Pistes</p>
        </div>
      </RouterLink>

      <RouterLink to="/hangars" class="hover:text-black-300">
        <div class="bg-white shadow rounded-xl p-6 text-center">
          <p class="text-4xl font-bold text-purple-600">4</p>
          <p class="text-purple-600">Hangars</p>
        </div>
      </RouterLink>

    </div>

  </div>
</template>

<style scoped>

</style>
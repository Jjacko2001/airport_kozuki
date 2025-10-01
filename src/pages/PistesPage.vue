<script setup lang="ts">
import {ref} from "vue";
import PisteForm from "../components/PisteForm.vue";
import PisteList from "../components/PisteList.vue";
import {getPistes} from "../api/pistes.ts"

const pistes = ref([])
async function fetchPistes(){
  const response = await getPistes();
  pistes.value = response.data;
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold m-3">Gestion des pistes</h1>
    <PisteForm @created = "fetchPistes"/>
    <div class="text-sm leading-relaxed text-center">
      <p>
        <span class="text-blue-600 font-semibold">NOTE descriptive :</span>
        <span class="italic"> le champs du form est le suivant :</span>
        <span class="ml-2 font-medium italic">longueur</span>


      </p>
      <span class="ml-2 text-green-700 italic">Les selects n'étant pas encore implémentés, voici les valeurs des enums :</span>
      <span> PisteEtat { DISPO, PRIS, MAINTENANCE } </span>

    </div>

    <PisteList :pistes="pistes" @deleted="fetchPistes"/>




  </div>


</template>

<style scoped>

</style>
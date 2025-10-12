<script setup lang="ts">
import { ref, onMounted } from "vue";
import VolForm from "../components/VolForm.vue";
import VolList from "../components/VolList.vue";
import { getVols } from "../api/vols.ts";

const vols = ref([]);

async function fetchVols() {
  const response = await getVols();
  vols.value = response.data;
}

onMounted(fetchVols);
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold m-3">Gestion des vols</h1>
    <VolForm @created="fetchVols" />

    <div class="text-sm leading-relaxed text-center mt-2">
      <p>
        <span class="text-blue-600 font-semibold">NOTE descriptive :</span>
        <span class="italic"> Les champs du formulaire sont les suivants :</span>
        <span class="ml-2 font-medium italic">
          numéro, origine, destination, horaire, statut, avionId
        </span>
      </p>
      <span class="ml-2 text-green-700 italic">
        Les selects n'étant pas encore implémentés, voici les valeurs de l'enum :
      </span>
      <span> VolStatut { PREVU, EN_ATTENTE, EMBARQUEMENT, DECOLLE, EN_VOL, ANNULE, ARRIVE }</span>
    </div>

    <br />
    <VolList :vols="vols" @deleted="fetchVols" />

    <br /><br />

    <h1 class="mx-8 font-thin text-xs italic">Features</h1>
    <h1 class="mx-8 font-thin text-xs italic"> Formulaire avec select pour avionId </h1>
  </div>
</template>

<style scoped>

</style>

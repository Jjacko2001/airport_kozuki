<script setup lang="ts">
import {ref} from "vue";
import HangarForm from "../components/HangarForm.vue";
import HangarList from "../components/HangarList.vue";
import {getHangars} from "../api/hangars.ts"

const hangars = ref([])
async function fetchHangars(){
  const response = await getHangars();
  hangars.value = response.data;
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold m-3">Gestion des hangars</h1>
    <HangarForm @created = "fetchHangars"/>
    <div class="text-sm leading-relaxed text-center mt-2">
      <p>
        <span class="text-blue-600 font-semibold">NOTE descriptive :</span>
        <span class="italic"> Les champs du formulaire sont les suivants :</span>
        <span class="ml-2 font-medium italic">type, capacité</span>



      </p>
      <span class="ml-2 text-green-700 italic">Les selects n'étant pas encore implémentés, voici les valeurs des enums :</span>
      <span> HangarEtat { DISPO, MAINTENANCE, INDISPO }, </span>
      <span> HangarType { HANGAR_PETIT, HANGAR_GRAND }</span>

    </div>


    <HangarList :hangars="hangars" @deleted="fetchHangars"/>


    <h1 class="mx-8 font-thin text-xs italic">Faut que je me fasse une liste de card pour afficher le nombre de flight en fonction des états</h1>
    <h1 class="mx-8 font-thin text-xs italic">Fonc de recherche et recherche par ...</h1>
    <h1 class="mx-8 font-thin text-xs italic">LE form avec des selects plutot que input for hangarId et pisteId</h1>

  </div>


</template>

<style scoped>

</style>
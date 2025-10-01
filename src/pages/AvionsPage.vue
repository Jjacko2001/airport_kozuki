<script setup lang="ts">
import {ref} from "vue";
import AvionForm from "../components/AvionForm.vue";
import AvionList from "../components/AvionList.vue";
import {getAvions} from "../api/avions.ts"

const avions = ref([])
async function fetchAvions(){
  const response = await getAvions();
  avions.value = response.data;
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold m-3">Gestion des avions</h1>
    <AvionForm @created = "fetchAvions"/>

    <div class="text-sm leading-relaxed text-center mt-2">
      <p>
        <span class="text-blue-600 font-semibold">NOTE descriptive :</span>
        <span class="italic"> Les champs du formulaire sont les suivants :</span>
        <span class="ml-2 font-medium italic">immatriculation, type, capacité, hangarId, pisteId</span>



      </p>
      <span class="ml-2 text-green-700 italic">Les selects n'étant pas encore implémentés, voici les valeurs des enums :</span>
      <span> AvionEtat { EN_VOL, AU_SOL, MAINTENANCE }, </span>
      <span> AvionType { COURT_COURRIER, MOYEN_COURRIER, LONG_COURRIER, TRES_LONG_COURRIER, REGIONAL, AFFAIRE, CARGO }</span>

    </div>
    <br>

    <AvionList :avions="avions" @deleted="fetchAvions"/>



    <br>
    <br>

    <h1 class="mx-8 font-thin text-xs italic">Features</h1>
    <h1 class="mx-8 font-thin text-xs italic">Faut que je me fasse une liste de card pour afficher le nombre de flight en fonction des états</h1>
    <h1 class="mx-8 font-thin text-xs italic">Fonc de recherche et recherche par ...</h1>
    <h1 class="mx-8 font-thin text-xs italic">LE form avec des selects plutot que input for hangarId et pisteId</h1>



  </div>


</template>

<style scoped>

</style>
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
    <h1 class="mx-8 font-thin text-xs italic">Faut que je me fasse une liste de card pour afficher le nombre de flight en fonction des états</h1>
    <h1 class="mx-8 font-thin text-xs italic">Fonc de recherche et recherche par ...</h1>
    <h1 class="mx-8 font-thin text-xs italic">LE form avec des selects plutot que input for hangarId et pisteId</h1>

    <AvionList :avions="avions" @deleted="fetchAvions"/>

  </div>


</template>

<style scoped>

</style>
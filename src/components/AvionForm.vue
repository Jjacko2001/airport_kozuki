<script setup lang="ts">
import { ref } from "vue";
import { createAvion } from "../api/avions";

const immatriculation = ref("");
const type = ref("");
const capacite = ref(0);
const hangarId = ref<number | null>(null);
const pisteId = ref<number | null>(null);

const emit = defineEmits(["created"]);

async function submitForm() {
  if (!hangarId.value || !pisteId.value) {
    alert("Veuillez renseigner un hangar et une piste !");
    return;
  }

  await createAvion({
    immatriculation: Number(immatriculation.value),
    type: type.value,
    capacite: capacite.value,
    hangarId: hangarId.value,
    pisteId: pisteId.value,
  });

  emit("created"); // notifie le parent

  // resetà null
  immatriculation.value = "";
  type.value = "";
  capacite.value = 0;
  hangarId.value = null;
  pisteId.value = null;
}
</script>

<template>
  <div class="p-16">
    <h2 class="text-2xl font-bold mb-3 text-center">Ajouter un Avion</h2>

    <form @submit.prevent="submitForm" class="text-center p-4 border rounded bg-gray-50">
      <input
          v-model="immatriculation"
          placeholder="Immatriculation"
          class="border p-1 mr-2 rounded"
      />
      <input
          v-model="type"
          placeholder="Type"
          class="border p-1 mr-2 rounded"
      />
      <input
          v-model.number="capacite"
          type="number"
          placeholder="Capacité"
          class="border p-1 mr-2 rounded w-24"
      />

      <!-- Input Hangar -->
      <input
          v-model.number="hangarId"
          type="number"
          placeholder="Id Hangar"
          class="border p-1 mr-2 rounded w-32"
      />

      <!-- Input Piste -->
      <input
          v-model.number="pisteId"
          type="number"
          placeholder="Id Piste"
          class="border p-1 mr-2 rounded w-32"
      />

      <button
          type="submit"
          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Ajouter
      </button>
    </form>
  </div>
</template>

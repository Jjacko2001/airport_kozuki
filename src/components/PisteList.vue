<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Liste des Pistes</h2>

    <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 text-left text-sm font-medium text-red-600">#</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-blue-600">Identifiant</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">État</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Longueur</th>
        <th class="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
      <tr
          v-for="(piste, index) in pistes"
          :key="piste.id"
          class="hover:bg-gray-50"
      >
        <td class="px-6 py-4 text-sm text-gray-700">{{ index + 1 }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ piste.id }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ piste.etat }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ piste.longueur }}</td>
        <td class="px-6 py-4 flex justify-center space-x-3">

          <PencilIcon
              class="w-5 h-5 text-green-500 cursor-pointer hover:text-green-700"
              @click="ouvrirModal(piste)"
          />
          <TrashIcon
              class="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
              @click="supprimerPiste(piste.id)"
          />
        </td>
      </tr>
      </tbody>
    </table>

    <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h3 class="text-xl font-semibold mb-4">Modifier la Piste</h3>

        <form @submit.prevent="mettreAJourPiste" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">ID</label>
            <input
                v-model="pisteSelectionnee.id"
                type="text"
                class="mt-1 w-full border rounded-lg p-2"
                disabled
            />
          </div>


          <div>
            <label class="block text-sm font-medium text-gray-700">État</label>
            <input
                v-model="pisteSelectionnee.etat"
                type="text"
                class="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Longueur</label>
            <input
                v-model.number="pisteSelectionnee.longueur"
                type="number"
                class="mt-1 w-full border rounded-lg p-2"
            />
          </div>


          <div class="col-span-2 flex justify-end gap-2 mt-4">
            <button
                type="button"
                class="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300"
                @click="fermerModal"
            >
              Annuler
            </button>
            <button
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {  PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { getPistes, deletePiste, updatePistes } from "../api/pistes.ts";

interface Piste {
  id: number;
  etat: string;
  longueur: number;
}

const pistes = ref<Piste[]>([]);
const showModal = ref(false);
const pisteSelectionnee = ref<Piste>({
  id: 0,
  etat: "",
  longueur: 0,
});

const chargerPistes = async () => {
  try {
    const response = await getPistes();
    pistes.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des pistes :", error);
  }
};


const ouvrirModal = (piste: Piste) => {
  pisteSelectionnee.value = { ...piste };
  showModal.value = true;
};

const fermerModal = () => {
  showModal.value = false;
};

const mettreAJourPiste = async () => {
  try {
    const id = pisteSelectionnee.value.id;
    const data = {
      etat: pisteSelectionnee.value.etat,
      longueur: pisteSelectionnee.value.longueur,
    };

    await updatePistes(id, data);

    const index = pistes.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      pistes.value[index] = { ...pisteSelectionnee.value };
    }

    fermerModal();
    alert("Piste mise à jour avec succès ✅");
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    alert("Une erreur est survenue ❌");
  }
};

const supprimerPiste = async (id: number) => {
  if (confirm("Voulez-vous vraiment supprimer cette piste ?")) {
    try {
      await deletePiste(id);
      pistes.value = pistes.value.filter((p) => p.id !== id);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }
};

onMounted(chargerPistes);
</script>

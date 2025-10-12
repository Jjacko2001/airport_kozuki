<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Liste des Hangars</h2>

    <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 text-left text-sm font-medium text-red-600">#</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-blue-600">Identifiant</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">État</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Capacité</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">List Avions</th>
        <th class="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
      <tr
          v-for="(hangar, index) in hangars"
          :key="hangar.id"
          class="hover:bg-gray-50"
      >
        <td class="px-6 py-4 text-sm text-gray-700">{{ index + 1 }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ hangar.id }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ hangar.type }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ hangar.etat }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ hangar.capacite }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">
          <template v-if="hangar.avions && hangar.avions.length">
            <div v-for="a in hangar.avions" :key="a.immatriculation">
              avion-{{ a.immatriculation }}
            </div>
          </template>
          <template v-else>
            <span class="italic text-gray-700">Aucun avion</span>
          </template>
        </td>

        <td class="px-6 py-4 flex justify-center space-x-3">

          <PencilIcon
              class="w-5 h-5 text-green-500 cursor-pointer hover:text-green-700"
              @click="ouvrirModal(hangar)"
          />
          <TrashIcon
              class="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
              @click="supprimerHangar(hangar.id)"
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
        <h3 class="text-xl font-semibold mb-4">Modifier le Hangar</h3>

        <form @submit.prevent="mettreAJourHangar" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">ID</label>
            <input
                v-model="hangarSelectionne.id"
                type="text"
                class="mt-1 w-full border rounded-lg p-2"
                disabled
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <input
                v-model="hangarSelectionne.type"
                type="text"
                class="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">État</label>
            <input
                v-model="hangarSelectionne.etat"
                type="text"
                class="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Capacité</label>
            <input
                v-model.number="hangarSelectionne.capacite"
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
import { getHangars, deleteHangar, updateHangars } from "../api/hangars.ts";

interface Avion {

  immatriculation: string;
}

interface Hangar {
  id: number;
  etat: string;
  type: string;
  capacite: number;
  avions: Avion[];
}

const hangars = ref<Hangar[]>([]);
const showModal = ref(false);
const hangarSelectionne = ref<Hangar>({
  id: 0,
  etat: "",
  type: "",
  capacite: 0,
  avions: []
});

const chargerHangars = async () => {
  try {
    const response = await getHangars();
    hangars.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des hangars :", error);
  }
};


const ouvrirModal = (hangar: Hangar) => {
  hangarSelectionne.value = { ...hangar };
  showModal.value = true;
};

const fermerModal = () => {
  showModal.value = false;
};

const mettreAJourHangar = async () => {
  try {
    const id = hangarSelectionne.value.id;
    const data = {
      type: hangarSelectionne.value.type,
      etat: hangarSelectionne.value.etat,
      capacite: hangarSelectionne.value.capacite,
    };

    await updateHangars(id, data);

    const index = hangars.value.findIndex((h) => h.id === id);
    if (index !== -1) {
      hangars.value[index] = { ...hangarSelectionne.value };
    }

    fermerModal();
    alert("Hangar MAJ avec succès ");
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    alert("Une ERREUR est survenue ");
  }
};

const supprimerHangar = async (id: number) => {
  if (confirm("Voulez-vous vraiment supprimer ce hangar ?")) {
    try {
      await deleteHangar(id);
      hangars.value = hangars.value.filter((h) => h.id !== id);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }
};

onMounted(chargerHangars);
</script>

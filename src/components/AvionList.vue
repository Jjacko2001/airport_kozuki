<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Liste des Avions</h2>

    <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 text-left text-sm font-medium text-red-600">#</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Immatriculation</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Etat</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Piste</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Hangar</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Capacité</th>
        <th class="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
      <tr v-for="(avion, index) in avions" :key="avion.immatriculation" class="hover:bg-gray-50">
        <td class="px-6 py-4 text-sm text-gray-700">{{ index + 1 }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.immatriculation }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.type }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.etat }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.hangar.id }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.piste.id }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.capacite }}</td>
        <td class="px-6 py-4 flex justify-center space-x-3">
          <EyeIcon
              class="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700"
              @click="voirAvion(avion)"
          />
          <PencilIcon
              class="w-5 h-5 text-green-500 cursor-pointer hover:text-green-700"
              @click="modifierAvion(avion)"
          />
          <TrashIcon
              class="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
              @click="supprimerAvion(avion.immatriculation)"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { getAvions, deleteAvion } from "../api/avions.ts";

interface Avion {
  immatriculation: number;
  etat: string;
  type: string;
  capacite: number;
  ////add ceki est à afficher avec nom de var hangar et piste
}

const avions = ref<Avion[]>([]);

const chargerAvions = async () => {
  try {
    const response = await getAvions();
    avions.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des avions :", error);
  }
};

const voirAvion = (avion: Avion) => {
  alert(`Voir détails de l'avion : ${avion.immatriculation}`); //vais dev un bail visuelle tetre un card ou un bail
};

const modifierAvion = (avion: Avion) => {
  alert(`Modifier l'avion : ${avion.immatriculation}`); //vais dev un bail visuelle tetre un card ou un bail
};

const supprimerAvion = async (id: number) => {
  if (confirm("Voulez-vous vraiment supprimer cet avion ?")) {
    try {
      await deleteAvion(id);
      avions.value = avions.value.filter((a) => a.immatriculation !== id);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }
};

onMounted(chargerAvions);
</script>

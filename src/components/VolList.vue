<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Liste des Vols</h2>

    <div class="mb-4 flex items-center space-x-2">
      <label class="text-sm font-medium text-gray-700">Filtrer par statut :</label>
      <select v-model="filtreStatut" class="border rounded-lg p-2 text-sm">
        <option value="">Tous</option>


        <option value="EN_ATTENTE">EN_ATTENTE</option>
        <option value="PREVU">PREVU</option>
        <option value="DECOLLE">DECOLLE</option>
        <option value="EN_VOL">EN_VOL</option>
        <option value="EMBARQUEMENT">EMBARQUEMENT</option>
        <option value="ARRIVE">ARRIVE</option>
        <option value="ANNULE">ANNULE</option>
      </select>
    </div>

    <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 text-left text-sm font-medium text-red-600">#</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Numéro</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Origine</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Destination</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Horaire</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Statut</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Avion ID</th>
        <th class="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
      </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
      <tr
          v-for="(vol, index) in volsFiltres"
          :key="vol.id"
          class="hover:bg-gray-50"
      >
        <td class="px-6 py-4 text-sm text-gray-700">{{ index + 1 }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ vol.numero }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ vol.origine }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ vol.destination }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ vol.horaire }}</td>
        <td
            class="px-6 py-4 text-sm font-semibold"
            :class="{
              'text-yellow-600': ['EN_ATTENTE', 'EMBARQUEMENT', 'PREVU'].includes(vol.statut),
              'text-blue-600': ['EN_VOL', 'EMBARQUEMENT', 'DECOLLE'].includes(vol.statut),

              'text-green-600': vol.statut === 'ARRIVE',

              'text-red-600': vol.statut === 'ANNULE',
            }"
        >
          {{ vol.statut }}
        </td>
        <td class="px-6 py-4 text-sm text-gray-700">
          {{ vol.avion?.id ?? "—" }}
        </td>
        <td class="px-6 py-4 flex justify-center space-x-3">
          <PencilIcon
              class="w-5 h-5 text-green-500 cursor-pointer hover:text-green-700"
              @click="ouvrirModal(vol)"
          />
          <TrashIcon
              class="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
              @click="supprimerVol(vol.id)"
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
        <h3 class="text-xl font-semibold mb-4">Modifier le Vol</h3>

        <form @submit.prevent="mettreAJourVol" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Numéro</label>
            <input v-model="volSelectionne.numero" type="number" class="mt-1 w-full border rounded-lg p-2" disabled />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Origine</label>
            <input v-model="volSelectionne.origine" type="text" class="mt-1 w-full border rounded-lg p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Destination</label>
            <input v-model="volSelectionne.destination" type="text" class="mt-1 w-full border rounded-lg p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Horaire</label>
            <input v-model="volSelectionne.horaire" type="text" class="mt-1 w-full border rounded-lg p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Statut</label>
            <select v-model="volSelectionne.statut" class="mt-1 w-full border rounded-lg p-2">

              <option value="EN_ATTENTE">EN_ATTENTE</option>
              <option value="PREVU">PREVU</option>
              <option value="DECOLLE">DECOLLE</option>
              <option value="EN_VOL">EN_VOL</option>
              <option value="EMBARQUEMENT">EMBARQUEMENT</option>
              <option value="ARRIVE">ARRIVE</option>
              <option value="ANNULE">ANNULE</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Avion ID</label>
            <input
                v-model.number="avionIdInput"
                type="number"
                class="mt-1 w-full border rounded-lg p-2"
                placeholder="Laisser vide pour retirer l'avion"
            />
          </div>

          <div class="col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" class="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300" @click="fermerModal">
              Annuler
            </button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { getVols, deleteVol, updateVol } from "../api/vols.ts";

interface Vol {
  id: number;
  numero: number;
  origine: string;
  destination: string;
  horaire: string;
  statut: string;
  avion: { id: number } | null;
}

const vols = ref<Vol[]>([]);
const showModal = ref(false);
const volSelectionne = ref<Vol>({
  id: 0,
  numero: 0,
  origine: "",
  destination: "",
  horaire: "",
  statut: "EN_ATTENTE",
  avion: { id: 0 },
});
const avionIdInput = ref<number | null>(null);
const filtreStatut = ref("");

const volsFiltres = computed(() =>
    filtreStatut.value
        ? vols.value.filter((v) => v.statut === filtreStatut.value)
        : vols.value
);

const chargerVols = async () => {
  try {
    const response = await getVols();
    vols.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des vols :", error);
  }
};

const ouvrirModal = (vol: Vol) => {
  volSelectionne.value = { ...vol };
  avionIdInput.value = vol.avion?.id ?? null;
  showModal.value = true;
};

const fermerModal = () => {
  showModal.value = false;
};

const mettreAJourVol = async () => {
  try {
    const id = volSelectionne.value.id;
    const data = {
      origine: volSelectionne.value.origine,
      destination: volSelectionne.value.destination,
      horaire: volSelectionne.value.horaire,
      statut: volSelectionne.value.statut,
      avionId: avionIdInput.value,
    };

    await updateVol(id, data);

    const index = vols.value.findIndex((v) => v.id === id);
    if (index !== -1) {
      vols.value[index] = {
        ...volSelectionne.value,
        avion: avionIdInput.value ? { id: avionIdInput.value } : null,
      };
    }

    fermerModal();
    alert("Vol mis à jour avec succès ✅");
  } catch (error) {
    alert("Erreur lors de la mise à jour ❌");
  }
};

const supprimerVol = async (id: number) => {
  if (confirm("Voulez-vous vraiment supprimer ce vol ?")) {
    try {
      await deleteVol(id);
      vols.value = vols.value.filter((v) => v.id !== id);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }
};

onMounted(chargerVols);
</script>

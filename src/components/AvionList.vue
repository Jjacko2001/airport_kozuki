<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Liste des Avions</h2>

    <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 text-left text-sm font-medium text-red-600">#</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-blue-600">Id</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Immatriculation</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Etat</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Piste</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Hangar</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">Capacité</th>
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-600">List Vols</th>
        <th class="px-6 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
      <tr v-for="(avion, index) in avions" :key="avion.id" class="hover:bg-gray-50"
      >
        <td class="px-6 py-4 text-sm text-gray-700">{{ index + 1 }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.id }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.immatriculation }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.type }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.etat }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.piste.id }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.hangar?.id ?? "—" }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.capacite }}</td>
        <td class="px-6 py-4 text-sm text-gray-700">
          <div v-for="v in avion.vols" :key="v.id">
            vol-{{ v.numero }}
          </div>
          <!--Voir le ifelse vour afficher le else list null : Aucun Vol-->
        </td>
        <td class="px-6 py-4 text-sm text-gray-700">{{ avion.capacite }}</td>
        <td class="px-6 py-4 flex justify-center space-x-3">

          <PencilIcon
              class="w-5 h-5 text-green-500 cursor-pointer hover:text-green-700"
              @click="ouvrirModal(avion)"
          />
          <TrashIcon
              class="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
              @click="supprimerAvion(avion.id)"
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
        <h3 class="text-xl font-semibold mb-4">Modifier l'Avion</h3>

        <form @submit.prevent="mettreAJourAvion" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Immatriculation</label>
            <input
                v-model="avionSelectionne.immatriculation"
                type="text"
                class="mt-1 w-full border rounded-lg p-2"
                disabled
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <input
                v-model="avionSelectionne.type"
                type="text"
                class="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">État</label>
            <input
                v-model="avionSelectionne.etat"
                type="text"
                class="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Capacité</label>
            <input
                v-model.number="avionSelectionne.capacite"
                type="number"
                class="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <!-- ✅ Champ pour modifier ou supprimer le hangar -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Hangar ID</label>
            <input
                v-model.number="hangarIdInput"
                type="number"
                class="mt-1 w-full border rounded-lg p-2"
                placeholder="Laisser vide pour retirer le hangar"
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
import { getAvions, deleteAvion, updateAvions } from "../api/avions.ts";

interface Vol {

  id: number;
  numero: number;
}
interface Avion {
  id: number;
  immatriculation: string;
  etat: string;
  type: string;
  capacite: number;



  ////add ceki est à afficher avec nom de var hangar et piste (Fait)
  hangar: { id: number } | null ;
  piste: { id: number } ;

  vols: Vol[]
}

const avions = ref<Avion[]>([]);
const showModal = ref(false);
const avionSelectionne = ref<Avion>({
  id:0,
  immatriculation: "",
  etat: "",
  type: "",
  capacite: 0,
  hangar: { id: 0 },
  piste: { id: 0 },
  vols: []
});

const chargerAvions = async () => {
  try {
    const response = await getAvions();
    avions.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des avions :", error);
  } //resolu
};

const ouvrirModal = (avion: Avion) => {
  avionSelectionne.value = { ...avion };
  hangarIdInput.value = avion.hangar?.id ?? null;
  showModal.value = true;
};

const fermerModal = () => {
  showModal.value = false;
};

const hangarIdInput = ref<number | null>(null);

const mettreAJourAvion = async () => {
  try {
    const id = avionSelectionne.value.id;
    const data = {
      type: avionSelectionne.value.type,
      etat: avionSelectionne.value.etat,
      capacite: avionSelectionne.value.capacite,
      hangarId: hangarIdInput.value,
      piste: avionSelectionne.value.piste,
    };

    await updateAvions(id, data);


    const index = avions.value.findIndex(a => a.id === id);
    if (index !== -1) {
      avions.value[index] = {
        ...avionSelectionne.value,
        hangar: hangarIdInput.value ? { id: hangarIdInput.value } : null,};
    }

    fermerModal();
    alert("maj fait");
  } catch (error) {




    alert("Une erreur est survenue ");
  }
};



const supprimerAvion = async (id: number) => {
  if (confirm("Voulez-vous vraiment supprimer cet avion ?")) {
    try {
      await deleteAvion(id);
      avions.value = avions.value.filter((a) => a.id !== id);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }
};

onMounted(chargerAvions);
</script>

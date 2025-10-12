<script setup lang="ts">
import Form from "./Form.vue";
import { createVol } from "../api/vols";

const fields = [
  { name: "numero", label: "Numéro du vol", type: "number" },
  { name: "origine", label: "Origine" },
  { name: "destination", label: "Destination" },
  { name: "horaire", label: "Horaire " },
  {
    name: "statut",
    label: "Statut",
    type: "select",
    options: ["PREVU", "EN_ATTENTE", "EMBARQUEMENT", "DECOLLE", "EN_VOL", "ANNULE", "ARRIVE"],
  },
  { name: "avionId", label: "ID Avion (optionnel)", type: "number" },
];

async function submitAction(data: Record<string, any>) {
  await createVol(data);
}
</script>

<template>
  <Form
      title="Ajouter un Vol"
      :fields="fields"
      :submitAction="submitAction"
      @submitted="$emit('created')"
  />
</template>

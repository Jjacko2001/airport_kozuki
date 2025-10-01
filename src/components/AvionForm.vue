<script setup lang="ts">
import Form from "./Form.vue";
import { createAvion } from "../api/avions";

const fields = [
  { name: "immatriculation", label: "Immatriculation" },
  { name: "type", label: "Type" },
  { name: "capacite", label: "Capacité", type: "number" },
  { name: "hangarId", label: "Id Hangar", type: "number" },
  { name: "pisteId", label: "Id Piste", type: "number" },
];

async function submitAction(data: Record<string, any>) {


  await createAvion(data);
}
</script>

<template>
  <Form
      title="Ajouter un Avion"
      :fields="fields"
      :submitAction="submitAction"
      @submitted="$emit('created')"
  />
</template>

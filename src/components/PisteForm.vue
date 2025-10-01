<script setup lang="ts">
import Form from "./Form.vue";
import { createPiste } from "../api/pistes";

const fields = [
  { name: "longueur", label: "Longueur max", type: "number" },
];

async function submitAction(data: Record<string, any>) {
  await createPiste(data);
}
</script>

<template>
  <Form
      title="Ajouter une Piste"
      :fields="fields"
      :submitAction="submitAction"
      @submitted="$emit('created')"
  />
</template>

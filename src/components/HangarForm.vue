<script setup lang="ts">
import Form from "./Form.vue";
import { createHangar } from "../api/hangars";

const fields = [
  { name: "type", label: "type" },
  { name: "capacite", label: "Capacité max", type: "number" },
];

async function submitAction(data: Record<string, any>) {
  await createHangar(data);
}
</script>

<template>
  <Form
      title="Ajouter un Hangar"
      :fields="fields"
      :submitAction="submitAction"
      @submitted="$emit('created')"
  />
</template>

<script setup lang="ts">
import { reactive } from "vue";

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

const props = defineProps<{
  title: string;
  fields: Field[];
  submitAction: (data: Record<string, any>) => Promise<void>;
}>();

const emit = defineEmits(["submitted"]);

const formData = reactive<Record<string, any>>({});

// initialiser les valeurs à vide
props.fields.forEach((f) => {
  formData[f.name] = f.type === "number" ? 0 : "";
});

async function handleSubmit() {
  await props.submitAction(formData);
  emit("submitted");


  props.fields.forEach((f) => {
    formData[f.name] = f.type === "number" ? 0 : "";
  });
}
</script>



<template>
  <div class="p-16">
    <h2 class="text-2xl font-bold mb-3 text-center">{{ title }}</h2>

    <form @submit.prevent="handleSubmit" class="text-center p-4 border rounded bg-gray-50">
      <div v-for="f in fields" :key="f.name" class="inline-block mb-2 mr-2">
        <input
            v-model="formData[f.name]"
            :type="f.type || 'text'"
            :placeholder="f.placeholder || f.label"
            class="border p-1 rounded"
        />
      </div>

      <button
          type="submit"
          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Ajouter
      </button>
    </form>
  </div>
</template>

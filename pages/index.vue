<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

type Schema = z.output<typeof formSchema>;
const formSchema = z.object({
  email: z.string().email("Invalid email"),
});
const formState = reactive({
  email: "",
});

async function formSubmission(event: FormSubmitEvent<Schema>) {}
</script>

<template>
  <div class="container max-w-screen-sm mx-auto p-10">
    <h1 class="text-4xl mb-4">Join ConvertKit Form</h1>
    <UForm
      :state="formState"
      :schema="formSchema"
      @submit="formSubmission"
      class="flex flex-col gap-4"
    >
      <UFormGroup label="Email" name="email" size="md">
        <UInput v-model="formState.email" />
      </UFormGroup>
      <UButton type="submit" label="Join Form" class="self-start" />
    </UForm>
  </div>
</template>

<style scoped></style>

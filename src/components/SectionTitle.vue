<script setup>
defineProps({
  index: { type: String, default: "" },
  title: { type: String, required: true },
});
</script>

<template>
  <div>
    <p v-if="index" class="section-num">{{ index }}</p>
    <h2 class="mt-6 font-display display-2">
      {{ title }}<span class="accent">.</span>
    </h2>
  </div>
</template>

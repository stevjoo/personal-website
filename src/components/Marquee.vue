<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import gsap from "gsap";
import { profile } from "../data/profile.js";

const trackRef = ref(null);
let tween = null;

onMounted(() => {
  const track = trackRef.value;
  if (!track) return;

  const half = track.scrollWidth / 2;
  tween = gsap.to(track, {
    x: -half,
    duration: 28,
    ease: "none",
    repeat: -1,
  });
});

onBeforeUnmount(() => {
  if (tween) tween.kill();
});
</script>

<template>
  <section class="marquee" aria-hidden="true">
    <div id="marquee" ref="trackRef" class="marquee-track">
      <!-- First pass -->
      <template v-for="(item, idx) in profile.marqueeItems" :key="`first-${idx}`">
        <span class="marquee-item" :class="{ dim: item.dim }">
          {{ item.text }}
          <span class="marquee-dot"></span>
        </span>
      </template>

      <!-- Second pass (duplicate for seamless infinite loop) -->
      <template v-for="(item, idx) in profile.marqueeItems" :key="`second-${idx}`">
        <span class="marquee-item" :class="{ dim: item.dim }">
          {{ item.text }}
          <span class="marquee-dot"></span>
        </span>
      </template>
    </div>
  </section>
</template>


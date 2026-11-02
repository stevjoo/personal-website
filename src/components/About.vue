<script setup>
import { profile } from "../data/profile.js";
</script>

<template>
  <section id="about" class="py-24 md:py-32">
    <div class="max-w-[1320px] mx-auto px-6 md:px-10">
      <div class="grid grid-cols-12 gap-6 md:gap-10">
        <div class="col-span-12 md:col-span-4">
          <p class="section-num">Index · 02 | About</p>
          <h2 class="mt-6 font-display display-3">
            A third-year <span class="accent">Informatics</span> student building secure systems.
          </h2>
        </div>
        <div class="col-span-12 md:col-span-7 md:col-start-6">
          <p class="text-xl md:text-2xl leading-relaxed ink-muted reveal">
            Third-year Informatics student at
            <span class="text-white">Universitas Multimedia Nusantara</span>
            with a strong focus on system engineering, networking, and cybersecurity. Actively involved in building simulated infrastructures, managing Linux based systems and configuring networks.
          </p>
          <p class="mt-6 text-lg leading-relaxed ink-muted reveal">
            {{ profile.about.body }}
          </p>

          <div class="hairline my-10"></div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div v-for="metric in profile.about.metrics" :key="metric.label">
              <div class="font-display text-4xl">
                {{ metric.value.replace('+', '') }}<span class="accent">+</span>
              </div>
              <div class="ink-muted text-sm mt-1">{{ metric.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


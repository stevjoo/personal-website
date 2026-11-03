<script setup>
import { IconChevronRight } from "@tabler/icons-vue";
import { profile } from "../data/profile.js";

const currentInternship = profile.work.find((w) => w.role.includes("Intern")) || profile.work[0];
const otherWorkAndOrgs = profile.experience;
</script>

<template>
  <section id="work" class="py-20 md:py-28" style="background: var(--bg-deep);">
    <div class="max-w-[1320px] mx-auto px-6 md:px-10">
      <div class="flex items-end justify-between flex-wrap gap-6">
        <div>
          <p class="section-num">Index · 03 | Experience</p>
          <h2 class="mt-6 font-display display-2">
            Where I've been<span class="accent">.</span>
          </h2>
        </div>
        <p class="ink-muted max-w-md text-sm">
          A timeline of internships, organizational leadership and event committees — sorted from most recent.
        </p>
      </div>

      <div class="hairline my-12"></div>

      <!-- Current Internship -->
      <div v-if="currentInternship" class="mb-12">
        <p class="font-mono-ish ink-dim mb-4">Current — Internship</p>
        <article class="card p-6 md:p-8 card-hover">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 class="font-display text-2xl md:text-3xl">{{ currentInternship.role }}</h3>
              <p class="mt-1 ink-muted">{{ currentInternship.company }}</p>
            </div>
            <div class="flex items-center gap-2 pill">
              <span class="dot"></span> {{ currentInternship.period }}
            </div>
          </div>
          <ul class="mt-6 grid md:grid-cols-2 gap-x-10 gap-y-3 text-[15px] leading-relaxed">
            <li
              v-for="(bullet, bIdx) in currentInternship.bullets"
              :key="bIdx"
              class="flex gap-3"
              :class="{ 'md:col-span-2': bIdx === currentInternship.bullets.length - 1 && currentInternship.bullets.length % 2 !== 0 }"
            >
              <IconChevronRight class="w-4 h-4 mt-1 accent shrink-0" />
              <span>{{ bullet }}</span>
            </li>
          </ul>
        </article>
      </div>

      <!-- Organizations & Events -->
      <p class="font-mono-ish ink-dim mb-6">Organizations &amp; Events</p>
      <div class="rail grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-2">
        <div
          v-for="(item, idx) in otherWorkAndOrgs"
          :key="idx"
          class="rail-row py-5"
          :class="{
            'is-current': item.isCurrent
          }"
        >
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h3 class="font-display text-xl">{{ item.role }}</h3>
            <span class="font-mono-ish ink-dim">{{ item.period }}</span>
          </div>
          <p class="ink-muted text-sm mt-1">{{ item.org }}</p>
          <ul
            class="mt-4 space-y-2 text-[14.5px] ink-muted leading-relaxed"
          >
            <li v-for="(bullet, bIdx) in item.bullets" :key="bIdx">
              · {{ bullet }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>


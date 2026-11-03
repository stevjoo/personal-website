<script setup>
import {
  ShieldAlert,
  Globe,
  Sparkles,
  Activity,
  Camera,
  Orbit,
  ServerCog,
  ArrowUpRight,
} from "lucide-vue-next";
import { profile } from "../data/profile.js";

const iconMap = {
  ShieldAlert,
  Globe,
  Sparkles,
  Activity,
  Camera,
  Orbit,
  ServerCog,
};

function getIcon(name) {
  return iconMap[name] || Globe;
}
</script>

<template>
  <section id="projects" class="py-24 md:py-32">
    <div class="max-w-[1320px] mx-auto px-6 md:px-10">
      <div class="flex items-end justify-between flex-wrap gap-6">
        <div>
          <p class="section-num">Index · 04 | Projects</p>
          <h2 class="mt-6 font-display display-2">
            Selected work<span class="accent">.</span>
          </h2>
        </div>
        <p class="ink-muted max-w-sm text-sm">
          Things I've built — solo and with teams. From low-level Windows security tooling to event platforms.
        </p>
      </div>

      <div class="hairline my-10"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <article
          v-for="project in profile.projects"
          :key="project.name"
          class="card p-5 md:p-6 card-hover flex flex-col justify-between"
        >
          <div>
            <div class="proj-cover">
              <span class="num">{{ project.num }}</span>
              <span class="glyph">
                <component :is="getIcon(project.icon)" class="w-3.5 h-3.5" />
                {{ project.glyph }}
              </span>
            </div>

            <div class="mt-5 flex items-start justify-between gap-4">
              <h3 class="font-display text-2xl">{{ project.name }}</h3>
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="link-arrow text-sm shrink-0"
              >
                {{ project.linkLabel }} <ArrowUpRight class="w-3.5 h-3.5" />
              </a>
            </div>

            <div class="mt-2 flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag" class="pill">
                <span class="dot"></span>{{ tag }}
              </span>
            </div>

            <ul class="mt-4 space-y-2 text-[14.5px] ink-muted leading-relaxed">
              <li v-for="(bullet, bIdx) in project.bullets" :key="bIdx">
                · {{ bullet }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>


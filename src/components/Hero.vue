<script setup>
import { IconFolderOpen, IconFileText, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-vue";
import { profile } from "../data/profile.js";

const cv = profile.links.find((l) => l.label === "CV");
const linkedIn = profile.links.find((l) => l.label === "LinkedIn");
const gitHub = profile.links.find((l) => l.label === "GitHub");
</script>

<template>
  <section id="top" class="relative pt-32 md:pt-24 pb-16 md:pb-24">
    <div class="max-w-[1320px] mx-auto px-6 md:px-10">
      <div class="grid grid-cols-12 gap-6 md:gap-10 items-center">
        <!-- Left: huge name & intro -->
        <div class="col-span-12 lg:col-span-8">
          <p class="section-num mb-6">Index · 01 | Introduction</p>

          <h1 class="font-display display-1">
            <span class="clip-line"><span data-line>Steven</span></span>
            <span class="clip-line"><span data-line>Jonathan<span class="accent">.</span></span></span>
          </h1>

          <p class="mt-8 md:mt-10 text-lg md:text-2xl ink-muted max-w-2xl leading-snug">
            <span class="ink-underline text-yellow-400 font-medium">Network engineer</span>,
            cybersecurity analyst &amp; fullstack software developer based in Jakarta. I design secure, scalable systems from the wiring closet to the browser.
          </p>

          <div class="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" class="btn btn-primary">
              <IconFolderOpen class="w-4 h-4" /> View selected work
            </a>
            <a
              v-if="cv"
              :href="cv.href"
              target="_blank"
              rel="noopener noreferrer"
              class="btn"
            >
              <IconFileText class="w-4 h-4" /> {{ cv.display || 'CV' }}
            </a>
            <a
              v-if="linkedIn"
              :href="linkedIn.href"
              target="_blank"
              rel="noopener noreferrer"
              class="btn"
            >
              <IconBrandLinkedin class="w-4 h-4" />
              LinkedIn
            </a>
            <a
              v-if="gitHub"
              :href="gitHub.href"
              target="_blank"
              rel="noopener noreferrer"
              class="btn"
            >
              <IconBrandGithub class="w-4 h-4" />
              GitHub
            </a>
          </div>

          <!-- Key facts grid -->
          <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div v-for="fact in profile.keyFacts" :key="fact.label">
              <div class="font-mono-ish ink-dim">{{ fact.label }}</div>
              <div class="mt-2 text-sm flex items-center gap-2">
                <span v-if="fact.hasPulse" class="pulse-dot"></span>
                <span>
                  {{ fact.title }}<br v-if="fact.sub" /><span v-if="fact.sub" class="ink-muted">{{ fact.sub }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: portrait stage -->
        <div class="col-span-12 lg:col-span-4">
          <div class="portrait-wrap">
            <img :src="profile.avatar" alt="Steven Jonathan portrait" />
            <span class="portrait-tape">STEVJO</span>
          </div>
          <div class="mt-4 flex items-center justify-between font-mono-ish ink-dim">
            <span>FIG. 01 | On-site, Jakarta Metropolitan Area</span>
            <span>3:2 · Studio</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { IconMail, IconBrandWhatsapp, IconArrowUpRight, IconArrowUp, IconBrandLinkedin, IconBrandGithub, IconBrandInstagram } from "@tabler/icons-vue";
import { profile } from "../data/profile.js";

const linkedIn = profile.links.find((l) => l.label === "LinkedIn");
const gitHub = profile.links.find((l) => l.label === "GitHub");
const instagram = profile.links.find((l) => l.label === "Instagram");
const whatsApp = profile.links.find((l) => l.label === "WhatsApp");

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <section id="contact" class="py-24 md:py-32">
    <div class="max-w-[1320px] mx-auto px-6 md:px-10">
      <p class="section-num">Index · 06 | Contact</p>

      <h2 class="mt-8 font-display display-1 leading-[0.85]">
        Let's <span class="accent">build</span><br />something secure.
      </h2>

      <div class="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <!-- Left column -->
        <div class="lg:col-span-7">
          <p class="ink-muted text-lg max-w-xl">
            Available for internship roles, freelance fullstack work, and CTF / cybersecurity collaborations. Reach me directly, I usually reply within a day.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a :href="`mailto:${profile.email}`" class="btn btn-primary">
              <IconMail class="w-4 h-4" /> {{ profile.email }}
            </a>
          </div>
        </div>

        <!-- Right column: Social Cards -->
        <div class="lg:col-span-5">
          <div class="card p-6">
            <p class="font-mono-ish ink-dim">Find me on</p>

            <div class="mt-4 divide-y divide-[var(--line)]">
              <!-- LinkedIn -->
              <a
                v-if="linkedIn"
                :href="linkedIn.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between py-3 navlink hover:text-white"
              >
                <span class="flex items-center gap-3">
                  <IconBrandLinkedin class="w-4 h-4 accent" />
                  LinkedIn
                </span>
                <span class="ink-muted text-sm flex items-center gap-1">
                  {{ linkedIn.display }} <IconArrowUpRight class="w-3.5 h-3.5 inline" />
                </span>
              </a>

              <!-- GitHub -->
              <a
                v-if="gitHub"
                :href="gitHub.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between py-3 navlink hover:text-white"
              >
                <span class="flex items-center gap-3">
                  <IconBrandGithub class="w-4 h-4 accent" />
                  GitHub
                </span>
                <span class="ink-muted text-sm flex items-center gap-1">
                  {{ gitHub.display }} <IconArrowUpRight class="w-3.5 h-3.5 inline" />
                </span>
              </a>

              <!-- Instagram -->
              <a
                v-if="instagram"
                :href="instagram.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between py-3 navlink hover:text-white"
              >
                <span class="flex items-center gap-3">
                  <IconBrandInstagram class="w-4 h-4 accent" />
                  Instagram
                </span>
                <span class="ink-muted text-sm flex items-center gap-1">
                  {{ instagram.display }} <IconArrowUpRight class="w-3.5 h-3.5 inline" />
                </span>
              </a>

              <!-- WhatsApp -->
              <a
                v-if="whatsApp"
                :href="whatsApp.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between py-3 navlink hover:text-white"
              >
                <span class="flex items-center gap-3">
                  <IconBrandWhatsapp class="w-4 h-4 accent" />
                  WhatsApp
                </span>
                <span class="ink-muted text-sm flex items-center gap-1">
                  {{ whatsApp.display }} <IconArrowUpRight class="w-3.5 h-3.5 inline" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Big stencil signature -->
      <div class="mt-24 select-none" aria-hidden="true">
        <div class="stencil leading-[0.85]" style="font-size: clamp(80px, 18vw, 280px);">
          <span class="fill">STEVJO</span><span class="yel">.</span>
        </div>
      </div>

      <!-- Footer meta -->
      <div class="mt-12 hairline"></div>
      <div class="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono-ish ink-dim">
        <span>© 2026 Steven Jonathan. All rights reserved.</span>
        <button
          type="button"
          class="navlink flex items-center gap-2 hover:text-white cursor-pointer bg-transparent border-none text-inherit font-inherit"
          @click="scrollToTop"
        >
          <IconArrowUp class="w-3.5 h-3.5" /> Back to top
        </button>
      </div>
    </div>
  </section>
</template>


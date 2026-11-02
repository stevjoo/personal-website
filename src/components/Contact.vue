<script setup>
import { Mail, MessageCircle, ArrowUpRight, ArrowUp } from "lucide-vue-next";
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
      <p class="section-num">Index · 06 — Contact</p>

      <h2 class="mt-8 font-display display-1 leading-[0.85]">
        Let's <span class="accent">build</span><br />something secure.
      </h2>

      <div class="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <!-- Left column -->
        <div class="lg:col-span-7">
          <p class="ink-muted text-lg max-w-xl">
            Available for internship roles, freelance fullstack work, and CTF / cybersecurity collaborations. Reach me directly — I reply within a day.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a :href="`mailto:${profile.email}`" class="btn btn-primary">
              <Mail class="w-4 h-4" /> {{ profile.email }}
            </a>
            <a
              v-if="whatsApp"
              :href="whatsApp.href"
              target="_blank"
              rel="noopener noreferrer"
              class="btn"
            >
              <MessageCircle class="w-4 h-4" /> WhatsApp
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
                  <svg class="w-4 h-4 accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"></path>
                  </svg>
                  LinkedIn
                </span>
                <span class="ink-muted text-sm flex items-center gap-1">
                  {{ linkedIn.display }} <ArrowUpRight class="w-3.5 h-3.5 inline" />
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
                  <svg class="w-4 h-4 accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                  </svg>
                  GitHub
                </span>
                <span class="ink-muted text-sm flex items-center gap-1">
                  {{ gitHub.display }} <ArrowUpRight class="w-3.5 h-3.5 inline" />
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
                  <svg class="w-4 h-4 accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.141 0-3.514.012-4.752.068-1.144.052-1.766.243-2.18.404-.548.213-.94.467-1.351.879-.412.411-.666.803-.879 1.351-.161.414-.352 1.036-.404 2.18-.056 1.238-.068 1.611-.068 4.752s.012 3.514.068 4.752c.052 1.144.243 1.766.404 2.18.213.548.467.94.879 1.351.411.412.803.666 1.351.879.414.161 1.036.352 2.18.404 1.238.056 1.611.068 4.752.068s3.514-.012 4.752-.068c1.144-.052 1.766-.243 2.18-.404.548-.213.94-.467 1.351-.879.412-.411.666-.803.879-1.351.161-.414.352-1.036.404-2.18.056-1.238.068-1.611.068-4.752s-.012-3.514-.068-4.752c-.052-1.144-.243-1.766-.404-2.18-.213-.548-.467-.94-.879-1.351-.411-.412-.803-.666-1.351-.879-.414-.161-1.036-.352-2.18-.404C15.514 3.977 15.141 3.965 12 3.965zm0 3.064a4.97 4.97 0 1 1 0 9.94 4.97 4.97 0 0 1 0-9.94zm0 8.2a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46zm6.323-8.402a1.162 1.162 0 1 1-2.324 0 1.162 1.162 0 0 1 2.324 0z"></path>
                  </svg>
                  Instagram
                </span>
                <span class="ink-muted text-sm flex items-center gap-1">
                  {{ instagram.display }} <ArrowUpRight class="w-3.5 h-3.5 inline" />
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
                  <MessageCircle class="w-4 h-4 accent" />
                  WhatsApp
                </span>
                <span class="ink-muted text-sm flex items-center gap-1">
                  {{ whatsApp.display }} <ArrowUpRight class="w-3.5 h-3.5 inline" />
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
        <span>© 2026 Steven Jonathan — All rights reserved.</span>
        <span class="hidden md:inline">Crafted with Jost, GSAP &amp; a lot of coffee.</span>
        <button
          type="button"
          class="navlink flex items-center gap-2 hover:text-white cursor-pointer bg-transparent border-none text-inherit font-inherit"
          @click="scrollToTop"
        >
          <ArrowUp class="w-3.5 h-3.5" /> Back to top
        </button>
      </div>
    </div>
  </section>
</template>


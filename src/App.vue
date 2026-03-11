<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar.vue";
import SectionTitle from "./components/SectionTitle.vue";
import Badge from "./components/Badge.vue";
import Card from "./components/Card.vue";
import { profile } from "./data/profile.js";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  FileText,
  Globe,
  Instagram,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-vue-next";

gsap.registerPlugin(ScrollTrigger);

// Paksa GSAP pakai GPU-only properties, matikan recalc yang tidak perlu
ScrollTrigger.config({ ignoreMobileResize: true });

function normalizeUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url)) return url;
  return `https://${url}`;
}

function openLink(url) {
  const u = normalizeUrl(url);
  if (!u || u === "#") return;
  window.open(u, "_blank", "noopener,noreferrer");
}

function isGithubUrl(url = "") {
  return /github\.com/i.test(url);
}
function isWebsiteUrl(url = "") {
  return !!url && !isGithubUrl(url) && !/^mailto:/i.test(url);
}

function getProjectActionsFixed(p) {
  const link = p?.link || "";
  const repo = p?.repo || "";
  const repoUrl = repo || (isGithubUrl(link) ? link : "");
  const liveUrl = isWebsiteUrl(link) ? link : "";
  return [
    { key: "github", label: "GitHub", href: repoUrl || null, Icon: Github },
    { key: "website", label: "Website", href: liveUrl || null, Icon: Globe },
  ];
}

const github = profile.links?.find((l) => l.label?.toLowerCase() === "github");
const linkedin = profile.links?.find(
  (l) => l.label?.toLowerCase() === "linkedin",
);
const instagram = profile.links?.find(
  (l) => l.label?.toLowerCase() === "instagram",
);
const whatsapp = profile.links?.find(
  (l) => l.label?.toLowerCase() === "whatsapp",
);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    ".hero-stagger-text",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
  );

  tl.fromTo(
    ".hero-stagger-actions",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
    "-=0.4",
  );

  tl.fromTo(
    ".hero-stagger-img",
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.2)" },
    "-=0.8",
  );

  const sections = [
    "#about",
    "#education",
    "#skills",
    "#work",
    "#experience",
    "#projects",
    "#competitions",
  ];

  sections.forEach((sectionId) => {
    const element = document.querySelector(sectionId);
    if (!element) return;

    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          // "play none none none" + once:true = animasi jalan sekali, tidak reverse
          // Ini jauh lebih ringan dari toggleActions reverse
          once: true,
        },
      },
    );
  });
});
</script>

<template>
  <div id="top" class="min-h-screen bg-gray-800 text-white">
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        class="bg-blob blob-1 absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 bg-yellow-400"
      ></div>
      <div
        class="bg-blob blob-2 absolute top-1/3 -left-40 h-[420px] w-[420px] bg-yellow-400"
      ></div>
      <div
        class="bg-blob blob-3 absolute bottom-[-200px] right-[-200px] h-[560px] w-[560px] bg-yellow-400"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/60"
      ></div>
    </div>

    <Navbar />

    <main class="relative mx-auto max-w-6xl px-4 py-10">
      <section id="hero" class="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <div
            class="hero-stagger-text inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/70 px-3 py-1 text-xs text-white/70"
          >
            <span
              class="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400"
            ></span>
            Available for Projects
          </div>

          <div
            class="hero-stagger-text mt-4 flex items-center gap-2 text-sm text-white/70"
          >
            <MapPin class="h-4 w-4 text-yellow-400" />
            <span>{{ profile.location }}</span>
          </div>

          <h1
            class="hero-stagger-text mt-2 text-3xl font-bold leading-tight md:text-5xl"
          >
            {{ profile.name }}<span class="text-yellow-400">.</span>
          </h1>

          <p
            class="hero-stagger-text mt-3 max-w-2xl text-base text-white/80 md:text-lg"
          >
            {{ profile.headline }}
          </p>

          <div class="hero-stagger-actions mt-6 flex flex-wrap gap-2">
            <a
              :href="`mailto:${profile.email}`"
              class="inline-flex"
              title="Email"
            >
              <Badge
                class="flex items-center gap-2 py-2 cursor-pointer card-glow"
              >
                <Mail class="h-4 w-4 text-yellow-400" />
                {{ profile.email }}
              </Badge>
            </a>
          </div>

          <div
            class="hero-stagger-actions mt-6 flex flex-wrap items-center gap-3"
          >
            <button
              v-if="whatsapp?.href"
              class="social-btn flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
              @click="openLink(whatsapp.href)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-whatsapp text-yellow-400"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                />
              </svg>
              WhatsApp
            </button>

            <button
              v-if="github?.href"
              class="social-btn flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
              @click="openLink(github.href)"
            >
              <Github class="h-4 w-4 text-yellow-400" />
              GitHub
            </button>

            <button
              v-if="instagram?.href"
              class="social-btn flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
              @click="openLink(instagram.href)"
            >
              <Instagram class="h-4 w-4 text-yellow-400" />
              Instagram
            </button>

            <button
              v-if="linkedin?.href"
              class="social-btn flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
              @click="openLink(linkedin.href)"
            >
              <Linkedin class="h-4 w-4 text-yellow-400" />
              LinkedIn
            </button>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div
            class="hero-stagger-img relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div
              class="pointer-events-none absolute -inset-4 rounded-3xl md:bg-yellow-400/10 md:blur-2xl"
            />
            <div
              class="relative aspect-square w-full border-3 border-gray-700 overflow-hidden rounded-3xl transition duration-500 hover:scale-102 hover:border-yellow-400"
            >
              <img
                src="/me.jpg"
                alt="Profile photo"
                class="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="mt-14 scroll-mt-24">
        <SectionTitle>About</SectionTitle>
        <Card class="card-glow relative overflow-hidden">
          <div class="absolute -right-24 -top-24 h-56 w-56 rounded-full" />
          <p class="relative leading-relaxed text-white/85">
            {{ profile.summary }}
          </p>
        </Card>
      </section>

      <section id="education" class="mt-14 scroll-mt-24">
        <SectionTitle>Education</SectionTitle>
        <div class="grid gap-4 md:grid-cols-2">
          <Card
            v-for="e in profile.education"
            :key="e.school"
            class="card-glow"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-base font-semibold">{{ e.school }}</div>
                <div class="text-sm text-white/70">{{ e.degree }}</div>
              </div>
              <div class="text-right text-sm text-white/70">{{ e.period }}</div>
            </div>
            <div class="mt-3 text-sm">
              <span class="text-white/70">GPA: </span>
              <span class="font-semibold text-yellow-400">{{ e.gpa }}</span>
            </div>
          </Card>
        </div>
      </section>

      <section id="skills" class="mt-14 scroll-mt-24">
        <SectionTitle>Technical Skills</SectionTitle>
        <div class="grid gap-4 md:grid-cols-3">
          <Card
            v-for="block in profile.technicalSkills"
            :key="block.title"
            class="card-glow"
          >
            <div class="text-base font-semibold">
              {{ block.title }}<span class="text-yellow-400">.</span>
            </div>
            <div class="mt-4 space-y-4">
              <div v-for="g in block.groups" :key="g.label">
                <div
                  class="text-xs font-semibold uppercase tracking-wide text-white/60"
                >
                  {{ g.label }}
                </div>
                <div class="mt-2 flex flex-wrap gap-2">
                  <Badge v-for="it in g.items" :key="it" class="badge-glow">{{
                    it
                  }}</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="work" class="mt-14 scroll-mt-24">
        <SectionTitle>Work Experience</SectionTitle>
        <div class="grid gap-2 md:grid-cols-2">
          <Card
            v-for="w in profile.work"
            :key="w.role + w.company + w.period"
            class="card-glow group flex h-full flex-col"
          >
            <div class="flex-1 p-1">
              <div class="min-w-0">
                <h3 class="text-xl font-semibold leading-snug tracking-tight">
                  {{ w.role }}
                </h3>
                <div
                  class="mt-1 flex items-center gap-1 text-sm text-white/70 font-medium"
                >
                  <span>{{ w.company }}</span>
                </div>
                <div class="mt-1 flex items-center gap-1 text-sm text-white/50">
                  <span>{{ w.period }}</span>
                </div>
              </div>
              <ul class="mt-5 space-y-2 text-sm text-white/85">
                <li v-for="b in w.bullets" :key="b" class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.6)]"
                  ></span>
                  <span class="leading-relaxed">{{ b }}</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <section id="experience" class="mt-14 scroll-mt-24">
        <SectionTitle>Organizational Experience</SectionTitle>
        <div class="grid gap-2 md:grid-cols-2">
          <Card
            v-for="x in profile.experience"
            :key="x.role + x.org + x.period"
            class="card-glow group flex h-full flex-col"
          >
            <div class="flex-1 p-1">
              <div class="min-w-0">
                <h3 class="text-xl font-semibold leading-snug tracking-tight">
                  {{ x.role }}
                </h3>
                <div
                  class="mt-1 flex items-center gap-1 text-sm text-white/70 font-medium"
                >
                  <span>{{ x.org }}</span>
                </div>
                <div class="mt-1 flex items-center gap-1 text-sm text-white/50">
                  <span>{{ x.period }}</span>
                </div>
              </div>
              <ul class="mt-5 space-y-2 text-sm text-white/85">
                <li v-for="b in x.bullets" :key="b" class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.6)]"
                  ></span>
                  <span class="leading-relaxed">{{ b }}</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <section id="projects" class="mt-14 scroll-mt-24">
        <SectionTitle>Projects</SectionTitle>
        <div class="grid gap-2 md:grid-cols-2">
          <Card
            v-for="p in profile.projects"
            :key="p.name"
            class="card-glow group flex h-full flex-col"
          >
            <div class="flex-1 p-1">
              <div class="min-w-0">
                <h3 class="text-xl font-semibold leading-snug tracking-tight">
                  {{ p.name }}
                </h3>
                <div class="mt-4 flex flex-wrap gap-2">
                  <Badge
                    v-for="t in p.stack
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)"
                    :key="t"
                    class="badge-glow"
                    >{{ t }}</Badge
                  >
                </div>
              </div>
              <ul class="mt-5 space-y-2 text-sm text-white/85">
                <li v-for="b in p.bullets" :key="b" class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.6)]"
                  ></span>
                  <span class="leading-relaxed">{{ b }}</span>
                </li>
              </ul>
            </div>
            <div class="h-px w-full mt-2 bg-white/10"></div>
            <div class="px-6 py-4">
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  v-for="a in getProjectActionsFixed(p)"
                  :key="a.key"
                  :disabled="!a.href"
                  class="flex w-full items-center justify-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition-colors duration-200"
                  :class="
                    a.href
                      ? 'border-gray-700 bg-gray-900 text-white social-btn'
                      : 'border-gray-800 bg-gray-900/40 text-white/35 cursor-not-allowed'
                  "
                  @click="a.href && openLink(a.href)"
                >
                  <component
                    :is="a.Icon"
                    class="h-4 w-4"
                    :class="a.href ? 'text-yellow-400' : 'text-white/30'"
                  />
                  {{ a.label }}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="competitions" class="mt-14 scroll-mt-24">
        <SectionTitle>Competitions</SectionTitle>
        <div class="grid gap-4">
          <Card
            v-for="c in profile.competitions"
            :key="c.name"
            class="card-glow"
          >
            <div class="text-base font-semibold">{{ c.name }}</div>
            <div class="text-sm text-white/70">{{ c.role }}</div>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-white/85">
              <li v-for="b in c.bullets" :key="b">{{ b }}</li>
            </ul>
          </Card>
        </div>
      </section>

      <footer class="mt-16 border-t border-gray-700/60 pt-8 pb-2">
        <div class="text-center text-xs text-white/60">
          © {{ new Date().getFullYear() }}
          <span class="font-semibold text-white">{{ profile.name }}</span
          ><span class="text-yellow-400">.</span> All rights reserved.
        </div>
        <div class="my-3 h-px w-full"></div>
        <div class="mx-auto max-w-6xl px-4">
          <div class="flex justify-center gap-3 md:gap-5">
            <a
              v-if="github?.href"
              :href="github.href"
              target="_blank"
              rel="noopener noreferrer"
              class="icon-btn group rounded-xl border border-gray-700 bg-gray-900 p-3"
              aria-label="GitHub"
            >
              <Github
                class="h-5 w-5 text-white/70 transition-colors group-hover:text-yellow-400"
              />
            </a>
            <a
              v-if="instagram?.href"
              :href="instagram.href"
              target="_blank"
              rel="noopener noreferrer"
              class="icon-btn group rounded-xl border border-gray-700 bg-gray-900 p-3"
              aria-label="Instagram"
            >
              <Instagram
                class="h-5 w-5 text-white/70 transition-colors group-hover:text-yellow-400"
              />
            </a>
            <a
              v-if="linkedin?.href"
              :href="linkedin.href"
              target="_blank"
              rel="noopener noreferrer"
              class="icon-btn group rounded-xl border border-gray-700 bg-gray-900 p-3"
              aria-label="LinkedIn"
            >
              <Linkedin
                class="h-5 w-5 text-white/70 transition-colors group-hover:text-yellow-400"
              />
            </a>
            <a
              v-if="whatsapp?.href"
              :href="whatsapp.href"
              target="_blank"
              rel="noopener noreferrer"
              class="icon-btn group rounded-xl border border-gray-700 bg-gray-900 p-3"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-whatsapp h-5 w-5 text-white/70 transition-colors group-hover:text-yellow-400"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                />
              </svg>
            </a>
            <a
              :href="`mailto:${profile.email}`"
              class="icon-btn group rounded-xl border border-gray-700 bg-gray-900 p-3"
              aria-label="Email"
            >
              <Mail
                class="h-5 w-5 text-white/70 transition-colors group-hover:text-yellow-400"
              />
            </a>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<style>
.bg-blob {
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.07;
  will-change: transform;
}

.card-glow {
  position: relative;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.card-glow::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.card-glow:hover {
  transform: translateY(-2px);
  border-color: rgb(250 204 21 / 1);
}
.card-glow:hover::after {
  opacity: 1;
}

.badge-glow {
  position: relative;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}
.badge-glow::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 6px rgba(250, 204, 21, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.badge-glow:hover {
  transform: translateY(-2px);
  border-color: rgb(250 204 21 / 1);
}
.badge-glow:hover::after {
  opacity: 1;
}

.social-btn {
  position: relative;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}
.social-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 8px rgba(250, 204, 21, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.social-btn:hover {
  transform: translateY(-2px);
  border-color: rgb(250 204 21 / 1);
}
.social-btn:hover::after {
  opacity: 1;
}

.icon-btn {
  position: relative;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}
.icon-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 8px rgba(250, 204, 21, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.icon-btn:hover {
  transform: translateY(-2px);
  border-color: rgb(250 204 21 / 1);
}
.icon-btn:hover::after {
  opacity: 1;
}
</style>

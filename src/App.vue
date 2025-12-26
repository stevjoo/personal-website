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
  Link as LinkIcon,
  ExternalLink,
} from "lucide-vue-next";

gsap.registerPlugin(ScrollTrigger);

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

/**
 * FIXED SLOTS:
 * - GitHub: ambil dari p.repo atau (p.link kalau github) atau fallback dari label/linkLabel bila mengandung github
 * - Website: ambil dari p.link kalau non-github
 */
function getProjectActionsFixed(p) {
  const link = p?.link || "";
  const repo = p?.repo || "";

  // Repo bisa berada di: repo, atau link (kalau link github)
  const repoUrl = repo || (isGithubUrl(link) ? link : "");

  // Website/live demo: link non-github
  const liveUrl = isWebsiteUrl(link) ? link : "";

  return [
    { key: "github", label: "GitHub", href: repoUrl || null, Icon: Github },
    { key: "website", label: "Website", href: liveUrl || null, Icon: Globe },
  ];
}

const github = profile.links?.find((l) => l.label?.toLowerCase() === "github");
const linkedin = profile.links?.find(
  (l) => l.label?.toLowerCase() === "linkedin"
);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    ".hero-stagger-text",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
    }
  );

  tl.fromTo(
    ".hero-stagger-actions",
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
    },
    "-=0.4"
  );

  tl.fromTo(
    ".hero-stagger-img",
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.2)",
    },
    "-=0.8"
  );

  const sections = [
    "#about",
    "#education",
    "#skills",
    "#experience",
    "#projects",
    "#competitions",
  ];

  sections.forEach((sectionId) => {
    const element = document.querySelector(sectionId);

    if (element) {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
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
            Available for internships / projects
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
                class="flex items-center gap-2 py-2 cursor-pointer transition hover:-translate-y-0.5 hover:border-yellow-400"
              >
                <Mail class="h-4 w-4 text-yellow-400" />
                {{ profile.email }}
              </Badge>
            </a>
          </div>

          <div
            class="hero-stagger-actions mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href="/CV_Desc.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-yellow-400"
            >
              <FileText class="h-4 w-4 text-yellow-400" />
              Download CV
            </a>

            <button
              v-if="github?.href"
              class="flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-yellow-400"
              @click="openLink(github.href)"
            >
              <Github class="h-4 w-4 text-yellow-400" />
              GitHub
            </button>

            <button
              v-if="linkedin?.href"
              class="flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-yellow-400"
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
              class="pointer-events-none absolute -inset-4 rounded-3xl bg-yellow-400/10 blur-2xl"
            />

            <div
              class="relative aspect-square w-full overflow-hidden rounded-3xl"
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
        <Card class="relative overflow-hidden">
          <div
            class="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-3xl"
          />
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
            class="transition hover:-translate-y-0.5 hover:border-yellow-400"
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
              <span class="font-semibold text-yellow-400"> {{ e.gpa }}</span>
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
            class="transition hover:-translate-y-0.5 hover:border-yellow-400"
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
                  <Badge
                    v-for="it in g.items"
                    :key="it"
                    class="transition hover:-translate-y-0.5 hover:border-yellow-400"
                  >
                    {{ it }}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="experience" class="mt-14 scroll-mt-24">
        <SectionTitle>Organizational Experience</SectionTitle>
        <div class="grid gap-4">
          <Card
            v-for="x in profile.experience"
            :key="x.role + x.org + x.period"
            class="transition hover:-translate-y-0.5 hover:border-yellow-400"
          >
            <div
              class="flex flex-col justify-between gap-2 md:flex-row md:items-start"
            >
              <div>
                <div class="text-base font-semibold">
                  {{ x.role }} <span class="text-yellow-400">@</span>
                  {{ x.org }}
                </div>
                <div class="text-sm text-white/70">{{ x.period }}</div>
              </div>
            </div>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-white/85">
              <li v-for="b in x.bullets" :key="b">{{ b }}</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="projects" class="mt-14 scroll-mt-24">
        <SectionTitle>Projects</SectionTitle>

        <div class="grid gap-2 md:grid-cols-2">
          <Card
            v-for="p in profile.projects"
            :key="p.name"
            class="group flex h-full flex-col transition hover:-translate-y-0.5 hover:border-yellow-400"
          >
            <div class="flex-1 p-1">
              <div class="min-w-0">
                <h3
                  class="text-xl font-semibold leading-snug tracking-tight font-semibold"
                >
                  {{ p.name }}
                </h3>

                <div class="mt-4 flex flex-wrap gap-2">
                  <Badge
                    v-for="t in p.stack
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)"
                    :key="t"
                    class="transition hover:-translate-y-0.5 hover:border-yellow-400"
                  >
                    {{ t }}
                  </Badge>
                </div>
              </div>

              <ul class="mt-5 space-y-2 text-sm text-white/85">
                <li v-for="b in p.bullets" :key="b" class="flex gap-2">
                  <span
                    class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400/90"
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
                  class="flex w-full items-center justify-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition duration-200"
                  :class="
                    a.href
                      ? 'border-gray-700 bg-gray-900 text-white hover:-translate-y-0.5 hover:border-yellow-400'
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
            class="transition hover:-translate-y-0.5 hover:border-yellow-400"
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
          >. All rights reserved.
        </div>
        <div class="my-3 h-px w-full"></div>
        <div class="mx-auto max-w-6xl px-4">
          <div class="flex justify-center gap-5">
            <a
              v-if="github?.href"
              :href="github.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group rounded-xl border border-gray-700 bg-gray-900 p-3 transition hover:-translate-y-0.5 hover:border-yellow-400"
              aria-label="GitHub"
            >
              <Github
                class="h-5 w-5 text-white/70 transition group-hover:text-yellow-400"
              />
            </a>

            <a
              v-if="linkedin?.href"
              :href="linkedin.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group rounded-xl border border-gray-700 bg-gray-900 p-3 transition hover:-translate-y-0.5 hover:border-yellow-400"
              aria-label="LinkedIn"
            >
              <Linkedin
                class="h-5 w-5 text-white/70 transition group-hover:text-yellow-400"
              />
            </a>

            <a
              :href="`mailto:${profile.email}`"
              class="group rounded-xl border border-gray-700 bg-gray-900 p-3 transition hover:-translate-y-0.5 hover:border-yellow-400"
              aria-label="Email"
            >
              <Mail
                class="h-5 w-5 text-white/70 transition group-hover:text-yellow-400"
              />
            </a>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

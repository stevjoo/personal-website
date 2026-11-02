<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { profile } from "../data/profile.js";

const navItems = [
  { id: "about", num: "01", label: "About" },
  { id: "work", num: "02", label: "Work" },
  { id: "projects", num: "03", label: "Projects" },
  { id: "skills", num: "04", label: "Skills" },
  { id: "contact", num: "05", label: "Contact" },
];

const activeId = ref("");
const isClickScrolling = ref(false);
const isScrolled = ref(false);
const scrollProgress = ref(0);
const menuOpen = ref(false);
const backdropVisible = ref(false);
const drawerVisible = ref(false);
const navbarHeight = ref(60);

function getHeaderOffset() {
  const header = document.getElementById("nav");
  return (header?.offsetHeight ?? 60) + 16;
}

function updateNavbarHeight() {
  const header = document.getElementById("nav");
  if (header) {
    navbarHeight.value = header.offsetHeight;
  }
}

function goTo(id) {
  closeMenu();
  if (id === "top") {
    isClickScrolling.value = true;
    activeId.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => {
      isClickScrolling.value = false;
    }, 600);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  isClickScrolling.value = true;
  activeId.value = id;
  const offset = getHeaderOffset();
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
  window.setTimeout(() => {
    isClickScrolling.value = false;
  }, 600);
}

function openMenu() {
  updateNavbarHeight();
  menuOpen.value = true;
  backdropVisible.value = true;
  window.setTimeout(() => {
    drawerVisible.value = true;
  }, 60);
}

function closeMenu() {
  drawerVisible.value = false;
  window.setTimeout(() => {
    backdropVisible.value = false;
    menuOpen.value = false;
  }, 260);
}

function toggleMenu() {
  menuOpen.value ? closeMenu() : openMenu();
}

let rafId = null;

function updateActive() {
  rafId = null;
  if (isClickScrolling.value) return;

  const y = window.scrollY;
  isScrolled.value = y > 12;

  // Reading progress indicator
  const max = document.documentElement.scrollHeight - window.innerHeight || 1;
  scrollProgress.value = Math.min(100, Math.max(0, (y / max) * 100));

  if (y < 120) {
    activeId.value = "";
    return;
  }

  const offset = getHeaderOffset();
  const scrollPos = y + offset + 20;
  let current = navItems[0].id;

  for (const it of navItems) {
    const el = document.getElementById(it.id);
    if (el && el.offsetTop <= scrollPos) {
      current = it.id;
    }
  }

  const bottomReached =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
  if (bottomReached) {
    current = navItems[navItems.length - 1].id;
  }

  activeId.value = current;
}

function onScroll() {
  if (rafId) return;
  rafId = requestAnimationFrame(updateActive);
}

watch(menuOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});

onMounted(() => {
  updateNavbarHeight();
  updateActive();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    updateNavbarHeight();
    updateActive();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  document.body.style.overflow = "";
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <header
    id="nav"
    class="navbar-header sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg-deep)]/95 backdrop-blur-xl shadow-lg"
  >
    <div class="mx-auto flex max-w-[1320px] items-center justify-between px-4 sm:px-6 md:px-10 py-3.5">

      <!-- Name & Tagline on the LEFT (always visible, clicking scrolls to top) -->
      <button
        type="button"
        class="text-left transition active:scale-[0.98] cursor-pointer group select-none flex flex-col justify-center"
        @click="goTo('top')"
        aria-label="Steven Jonathan - Scroll to top"
      >
        <div class="text-[15px] sm:text-base font-semibold text-white tracking-tight group-hover:text-yellow-400 transition-colors">
          Steven Jonathan<span class="text-yellow-400">.</span>
        </div>
        <div class="text-[10px] sm:text-[11px] font-mono text-[var(--muted)] tracking-wider">
          {{ profile.tagline || 'Network & Security' }}
        </div>
      </button>

      <!-- Desktop nav (on the RIGHT) -->
      <nav class="hidden md:flex items-center" aria-label="Primary">
        <template v-for="(it, idx) in navItems" :key="it.id">
          <button
            type="button"
            @click="goTo(it.id)"
            class="desktop-nav-btn relative flex items-center gap-2 px-3.5 py-2 text-sm transition-colors duration-200 active:scale-[0.97] cursor-pointer"
            :class="activeId === it.id ? 'text-white font-medium' : 'text-white/60 hover:text-white'"
          >
            <span class="relative z-10 flex items-center gap-1.5">
              <span class="text-xs text-yellow-400 font-semibold">{{ it.num }}</span>
              <span>{{ it.label }}</span>
            </span>
            <span
              class="absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-yellow-400 transition-all duration-300 ease-out"
              :class="activeId === it.id ? 'w-5 opacity-100' : 'w-0 opacity-0'"
            ></span>
          </button>
          <span v-if="idx < navItems.length - 1" class="text-white/20 font-light select-none">/</span>
        </template>
      </nav>

      <!-- Hamburger toggle on the RIGHT (mobile only) -->
      <button
        type="button"
        class="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 -mr-2 rounded-xl transition active:scale-[0.98] cursor-pointer text-white focus:outline-none"
        @click="toggleMenu"
        aria-label="Toggle navigation menu"
      >
        <span
          class="block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-out"
          :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''"
        ></span>
        <span
          class="block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-out"
          :class="menuOpen ? 'opacity-0 scale-x-0' : ''"
        ></span>
        <span
          class="block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-out"
          :class="menuOpen ? '-translate-y-[7px] -rotate-45' : ''"
        ></span>
      </button>
    </div>

    <!-- Scroll reading progress indicator line -->
    <span
      id="nav-progress"
      class="nav-progress"
      :style="{ width: `${scrollProgress}%` }"
    ></span>
  </header>

  <!-- Mobile Overlay & Drawer -->
  <Teleport to="body">
    <div v-if="menuOpen" class="fixed inset-0 z-40 md:hidden">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        :class="backdropVisible ? 'opacity-100' : 'opacity-0'"
        @click="closeMenu"
      ></div>

      <!-- Drawer -->
      <div
        class="mobile-drawer absolute left-0 right-0 bg-[var(--bg-deep)]/95 backdrop-blur-xl border-b border-[var(--line)] shadow-2xl transition-all duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        :style="{ top: `${navbarHeight}px` }"
        :class="drawerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'"
      >
        <nav class="flex flex-col px-4 pt-3 pb-4 space-y-1">
          <button
            v-for="(it, index) in navItems"
            :key="it.id"
            type="button"
            @click="goTo(it.id)"
            class="mobile-nav-item relative flex items-center justify-between rounded-xl px-4 py-3 text-sm text-left active:scale-[0.98] cursor-pointer"
            :class="activeId === it.id ? 'text-white bg-white/5 font-medium' : 'text-white/70 hover:text-white'"
            :style="{
              transitionDelay: drawerVisible ? `${index * 35}ms` : `${(navItems.length - index) * 20}ms`,
              opacity: drawerVisible ? 1 : 0,
              transform: drawerVisible ? 'translateX(0)' : 'translateX(-8px)',
            }"
          >
            <div class="flex items-center gap-3">
              <span class="text-xs font-mono text-yellow-400 font-semibold">{{ it.num }}</span>
              <span class="text-base">{{ it.label }}</span>
            </div>
            <span
              class="h-4 w-1 rounded-full transition-all duration-300"
              :class="activeId === it.id ? 'bg-yellow-400 opacity-100' : 'bg-transparent opacity-0'"
            ></span>
          </button>
        </nav>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.navbar-header {
  transform: translateZ(0);
  will-change: transform;
}

.desktop-nav-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background: transparent;
  transition: background 0.18s ease;
}

.desktop-nav-btn:hover::before {
  background: rgba(255, 255, 255, 0.05);
}

.active-pill {
  background: rgba(255, 255, 255, 0.08);
}

.mobile-nav-item {
  transition:
    color 0.2s ease,
    transform 0.22s ease,
    opacity 0.22s ease,
    background 0.15s ease;
}

.mobile-nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>

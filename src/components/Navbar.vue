<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";

const items = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work Experience" },
  { id: "experience", label: "Organizational Experience" },
  { id: "projects", label: "Projects" },
  { id: "competitions", label: "Competitions" },
];

const activeId = ref(items[0].id);
const isClickScrolling = ref(false);
const menuOpen = ref(false);
const backdropVisible = ref(false);
const drawerVisible = ref(false);

function getHeaderOffset() {
  const header = document.querySelector("header");
  return (header?.offsetHeight ?? 0) + 16;
}

function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  closeMenu();
  isClickScrolling.value = true;
  activeId.value = id;
  const y = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: y, behavior: "smooth" });
  window.setTimeout(() => { isClickScrolling.value = false; }, 600);
}

function openMenu() {
  menuOpen.value = true;
  backdropVisible.value = true;
  window.setTimeout(() => { drawerVisible.value = true; }, 80);
}

function closeMenu() {
  drawerVisible.value = false;
  window.setTimeout(() => {
    backdropVisible.value = false;
    menuOpen.value = false;
  }, 280);
}

function toggleMenu() {
  menuOpen.value ? closeMenu() : openMenu();
}

let rafId = null;
let lastActive = items[0].id;

function updateActive() {
  rafId = null;
  if (isClickScrolling.value) return;

  const offset = getHeaderOffset();
  const scrollPos = window.scrollY + offset + 1;
  let current = items[0].id;

  for (const it of items) {
    const el = document.getElementById(it.id);
    if (el && el.offsetTop <= scrollPos) current = it.id;
  }

  const bottomReached =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (bottomReached) current = items[items.length - 1].id;

  if (current !== lastActive) {
    lastActive = current;
    activeId.value = current;
  }
}

function onScroll() {
  if (rafId) return;
  rafId = requestAnimationFrame(updateActive);
}

watch(menuOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});

onMounted(() => {
  updateActive();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActive);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", updateActive);
  document.body.style.overflow = "";
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <header class="navbar-header sticky top-0 z-50 border-b border-gray-700/60 bg-gray-800/70 backdrop-blur-xl">
    <div class="mx-auto flex max-w-6xl items-center px-4 py-3">

      <!-- Hamburger (mobile only) -->
      <button
        class="lg:hidden flex flex-col justify-center gap-[5px] p-2 rounded-xl transition active:scale-[0.98]"
        @click="toggleMenu"
        aria-label="Toggle menu"
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

      <!-- Desktop nav -->
      <nav class="hidden items-center lg:flex">
        <button
          v-for="it in items"
          :key="it.id"
          @click="goTo(it.id)"
          class="desktop-nav-btn relative px-3.5 py-2 text-sm transition-colors duration-200 active:scale-[0.97]"
          :class="activeId === it.id ? 'text-white' : 'text-white/50 hover:text-white/90'"
        >
          <span class="relative z-10">{{ it.label }}</span>
          <span
            v-if="activeId === it.id"
            class="active-pill absolute inset-0 rounded-lg"
          ></span>
          <span
            class="absolute bottom-0.5 left-1/2 h-px -translate-x-1/2 rounded-full bg-yellow-400 transition-all duration-300 ease-out"
            :class="activeId === it.id ? 'w-5 opacity-100' : 'w-0 opacity-0'"
          ></span>
        </button>
      </nav>

      <button
        class="ml-auto text-right transition active:scale-[0.98]"
        @click="goTo('top')"
      >
        <div class="text-md font-semibold text-white">
          Steven Jonathan<span class="text-yellow-400">.</span>
        </div>
      </button>
    </div>
  </header>

  <!-- Mobile overlay -->
  <Teleport to="body">
    <div v-if="menuOpen" class="fixed inset-0 z-40 lg:hidden">

      <!-- Backdrop -->
      <div
        class="absolute inset-0 backdrop-blur-sm transition-opacity duration-200"
        :class="backdropVisible ? 'opacity-100' : 'opacity-0'"
        @click="closeMenu"
      ></div>

      <!-- Drawer -->
      <div
        class="mobile-drawer absolute left-0 right-0 bg-gray-800/70 backdrop-blur-xl border-b border-gray-700/60 shadow-2xl transition-all duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="drawerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'"
      >
        <nav class="flex flex-col px-4 pt-3 pb-4">
          <button
            v-for="(it, index) in items"
            :key="it.id"
            @click="goTo(it.id)"
            class="mobile-nav-item relative flex items-center justify-between rounded-xl px-4 py-3 text-sm text-left active:scale-[0.98]"
            :class="activeId === it.id ? 'text-white' : 'text-white/75 hover:text-white'"
            :style="{
              transitionDelay: drawerVisible ? `${index * 30}ms` : `${(items.length - index) * 20}ms`,
              opacity: drawerVisible ? 1 : 0,
              transform: drawerVisible ? 'translateX(0)' : 'translateX(-8px)',
            }"
          >
            <div class="flex items-center gap-3">
              <span
                class="h-1.5 w-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                :class="activeId === it.id ? 'bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.6)]' : 'bg-white/20'"
              ></span>
              <span>{{ it.label }}</span>
            </div>
            <span
              class="h-4 w-0.5 rounded-full transition-all duration-300"
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
  content: '';
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
  background: rgba(255, 255, 255, 0.07);
}

.mobile-drawer {
  top: var(--navbar-height, 57px);
}

.mobile-nav-item {
  transition: color 0.2s ease, transform 0.22s ease, opacity 0.22s ease, background 0.15s ease;
}

.mobile-nav-item.text-white {
  background: rgba(255, 255, 255, 0.05);
}
</style>
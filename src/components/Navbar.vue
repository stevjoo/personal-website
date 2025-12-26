<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const items = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "competitions", label: "Competitions" },
];

const activeId = ref(items[0].id);
const isClickScrolling = ref(false);

function getHeaderOffset() {
  const header = document.querySelector("header");
  const headerH = header?.offsetHeight ?? 0;
  return headerH + 16; 
}

function goTo(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`[Navbar] Section with id="${id}" not found`);
    return;
  }

  isClickScrolling.value = true;
  activeId.value = id;

  const y = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: y, behavior: "smooth" });

  window.setTimeout(() => {
    isClickScrolling.value = false;
  }, 600);
}

let rafId = null;

function updateActive() {
  rafId = null;
  if (isClickScrolling.value) return;

  const offset = getHeaderOffset();
  const scrollPos = window.scrollY + offset + 1;

  let current = items[0].id;

  for (const it of items) {
    const el = document.getElementById(it.id);
    if (!el) continue;
    if (el.offsetTop <= scrollPos) current = it.id;
  }

  const bottomReached =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

  if (bottomReached) current = items[items.length - 1].id;

  activeId.value = current;
}


function onScroll() {
  if (rafId) return;
  rafId = requestAnimationFrame(updateActive);
}

onMounted(() => {
  updateActive();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActive);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", updateActive);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-700/60 bg-gray-800/70 backdrop-blur-xl"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <button
        class="group text-left transition active:scale-[0.98]"
        @click="goTo('top')"
      >
        <div class="text-sm font-semibold text-white">
          Steven Jonathan<span class="text-yellow-400">.</span>
        </div>
        <div class="text-xs text-white/60 transition group-hover:text-white/75">
          Personal Website
        </div>
      </button>

      <nav class="hidden items-center gap-1 md:flex">
        <button
          v-for="it in items"
          :key="it.id"
          @click="goTo(it.id)"
          class="relative rounded-xl px-3 py-2 text-sm transition active:scale-[0.98]"
          :class="activeId === it.id ? 'text-white' : 'text-white/75 hover:text-white'"
        >

          <span class="relative z-10">{{ it.label }}</span>

          <span
            v-if="activeId === it.id"
            class="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-yellow-400 transition-all duration-300 ease-out"
          ></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { IconServerCog, IconShieldCheck, IconCode, IconFlag } from "@tabler/icons-vue";
import { profile } from "../data/profile.js";

const activeTab = ref(profile.technicalSkills[0].id);

const tabIcons = {
  ServerCog: IconServerCog,
  ShieldCheck: IconShieldCheck,
  Code2: IconCode,
};

function getTabIcon(name) {
  return tabIcons[name] || IconServerCog;
}
</script>

<template>
  <section id="skills" class="py-20 md:py-28" style="background: var(--bg-deep);">
    <div class="max-w-[1320px] mx-auto px-6 md:px-10">
      <div class="flex items-end justify-between flex-wrap gap-6">
        <div>
          <p class="section-num">Index · 05 | Skills</p>
          <h2 class="mt-6 font-display display-2">
            Stack &amp; toolkit<span class="accent">.</span>
          </h2>
        </div>
        <p class="ink-muted max-w-sm text-sm">
          From kernel-adjacent to UI layer to what I use day-to-day.
        </p>
      </div>

      <div class="hairline my-10"></div>

      <!-- Stack interactive panel -->
      <div class="stack-shell" id="stack">
        <!-- Tabs -->
        <div class="stack-tabs" role="tablist">
          <button
            v-for="cat in profile.technicalSkills"
            :key="cat.id"
            type="button"
            class="stack-tab"
            :class="{ 'is-active': activeTab === cat.id }"
            role="tab"
            :aria-selected="activeTab === cat.id"
            @click="activeTab = cat.id"
          >
            <span class="stack-tab-ic">
              <component :is="getTabIcon(cat.icon)" class="w-5 h-5" />
            </span>
            <span>
              <span class="stack-tab-title block">{{ cat.title }}</span>
              <span class="stack-tab-sub block">{{ cat.sub }}</span>
            </span>
            <span class="stack-tab-count">{{ cat.count }}</span>
          </button>
        </div>

        <!-- Panel -->
        <div class="stack-panel">
          <template v-for="(cat, cIdx) in profile.technicalSkills" :key="cat.id">
            <div
              class="stack-panel-view"
              :class="{ 'is-active': activeTab === cat.id }"
              role="tabpanel"
            >
              <div class="stack-header">
                <div>
                  <p class="font-mono-ish ink-dim">Category 0{{ cIdx + 1 }} / 03</p>
                  <h3 class="mt-1">{{ cat.title }}</h3>
                </div>
                <div class="stack-meta">
                  <span class="dot"></span>
                  <span>{{ cat.meta }}</span>
                </div>
              </div>

              <div class="stack-groups">
                <div
                  v-for="(grp, gIdx) in cat.groups"
                  :key="gIdx"
                  class="stack-group"
                  :style="grp.fullWidth ? 'grid-column: 1 / -1;' : ''"
                >
                  <div class="stack-group-head">
                    <span class="stack-group-label">{{ grp.label }}</span>
                    <span class="stack-group-bar"></span>
                    <span class="stack-group-num">{{ grp.num }}</span>
                  </div>
                  <div class="stack-group-items">
                    <span
                      v-for="item in grp.items"
                      :key="item"
                      class="stack-chip"
                    >
                      <span class="glyph"></span>
                      {{ item }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Languages, Education & Competitions strip -->
      <div class="hairline my-12"></div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Education -->
        <div class="lg:col-span-1">
          <p class="font-mono-ish ink-dim mb-3">Education</p>
          <div v-for="edu in profile.education" :key="edu.school">
            <h4 class="font-display text-xl">{{ edu.school }}</h4>
            <p class="ink-muted mt-1">{{ edu.degree }}</p>
            <p class="ink-muted text-sm mt-1">
              {{ edu.period }} · <span class="accent">GPA {{ edu.gpa }}</span>
            </p>
          </div>
        </div>

        <!-- Spoken Languages -->
        <div class="lg:col-span-1">
          <p class="font-mono-ish ink-dim mb-3">Spoken Languages</p>
          <ul class="space-y-3">
            <li
              v-for="lang in profile.spokenLanguages"
              :key="lang.name"
              class="flex items-center justify-between"
            >
              <span>{{ lang.name }}</span>
              <span class="ink-muted text-sm">{{ lang.level }}</span>
            </li>
          </ul>
        </div>

        <!-- Competitions -->
        <div class="lg:col-span-1">
          <p class="font-mono-ish ink-dim mb-3">Competitions</p>
          <ul class="space-y-3">
            <li
              v-for="comp in profile.competitions"
              :key="comp.name"
              class="flex items-start gap-3"
            >
              <IconFlag class="w-4 h-4 mt-1 accent shrink-0" />
              <div>
                <div>{{ comp.name }}</div>
                <div class="ink-muted text-xs">{{ comp.role }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>


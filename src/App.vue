<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import CustomCursor from "./components/CustomCursor.vue";
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import Marquee from "./components/Marquee.vue";
import About from "./components/About.vue";
import Work from "./components/Work.vue";
import Projects from "./components/Projects.vue";
import Skills from "./components/Skills.vue";
import Contact from "./components/Contact.vue";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

onMounted(() => {
  // Hero name slide-in animation
  gsap.set("[data-line]", { yPercent: 110 });
  gsap.to("[data-line]", {
    yPercent: 0,
    duration: 1.1,
    ease: "expo.out",
    stagger: 0.12,
    delay: 0.15,
  });

  // Reveal elements on scroll
  const targets = gsap.utils.toArray(
    ".reveal, .card, .rail-row, .skill-row, article, h2, .section-num"
  );
  targets.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      }
    );
  });

  // Parallax on portrait image
  const portrait = document.querySelector(".portrait-wrap img");
  if (portrait) {
    gsap.to(portrait, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ".portrait-wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-yellow-400 selection:text-gray-900">
    <!-- Interactive Custom Cursor (desktop fine pointer only) -->
    <CustomCursor />

    <!-- Navigation Header -->
    <Navbar />

    <!-- Main Content Flow -->
    <main>
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Projects />
      <Skills />
      <Contact />
    </main>
  </div>
</template>

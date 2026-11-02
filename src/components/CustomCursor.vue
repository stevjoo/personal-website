<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import gsap from "gsap";

const cursorRef = ref(null);
let tickerFn = null;
let mouseMoveFn = null;

onMounted(() => {
  const cursor = cursorRef.value;
  if (!cursor) return;

  // Only activate cursor tracking on fine-pointer devices (desktop)
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  let cx = 0, cy = 0, tx = 0, ty = 0;
  
  mouseMoveFn = (e) => {
    tx = e.clientX;
    ty = e.clientY;
  };
  window.addEventListener("mousemove", mouseMoveFn, { passive: true });

  tickerFn = () => {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  };
  gsap.ticker.add(tickerFn);

  // Magnetic hover effects
  const interactiveSelector = ".btn, .navlink, .link-arrow, .nav-item, .nav-cta, .stack-tab";
  const addHoverListeners = () => {
    document.querySelectorAll(interactiveSelector).forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 2.4, background: "#facc15", duration: 0.25, overwrite: "auto" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, duration: 0.25, overwrite: "auto" });
      });
    });
  };

  addHoverListeners();
});

onBeforeUnmount(() => {
  if (mouseMoveFn) {
    window.removeEventListener("mousemove", mouseMoveFn);
  }
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
  }
});
</script>

<template>
  <div id="cursor" ref="cursorRef" aria-hidden="true"></div>
</template>


import Lenis from "lenis";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------ smooth scroll */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ smoothWheel: true });
  const raf = (t) => {
    lenis.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
const lockScroll = (on) => {
  document.documentElement.style.overflow = on ? "hidden" : "";
  if (lenis) on ? lenis.stop() : lenis.start();
};

/* ------------------------------------------------- scale-up above 1920px */
const scaleUp = () => {
  if (window.innerWidth > 1920) {
    document.documentElement.style.fontSize = `${(window.innerWidth / 1920) * 16}px`;
  } else {
    document.documentElement.style.fontSize = "";
  }
};
scaleUp();
window.addEventListener("resize", scaleUp);

/* -------------------------------------------------------------- loader */
const loader = document.getElementById("loader");
if (loader) {
  const fill = loader.querySelector(".loader__fill");
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 22 + 8);
    if (fill) fill.style.width = `${p}%`;
    if (p >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        loader.classList.add("is-done");
        document.querySelector(".hero")?.classList.add("is-ready");
        setTimeout(() => loader.remove(), 1100);
      }, reduced ? 0 : 260);
    }
  }, reduced ? 20 : 130);
} else {
  document.querySelector(".hero")?.classList.add("is-ready");
}

/* ------------------------------------------------------ header stuck state */
const header = document.querySelector(".header");
const onScrollHeader = () => header?.classList.toggle("is-stuck", window.scrollY > 40);
onScrollHeader();
window.addEventListener("scroll", onScrollHeader, { passive: true });

/* ----------------------------------------------------- scroll reveals */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
);
document.querySelectorAll(".rv, .clip").forEach((el, i) => {
  if (el.closest(".hero")) return;
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

/* --------------------------------------------------------------- parallax */
const parallaxEls = [
  ...document.querySelectorAll("[data-parallax]"),
].map((el) => ({ el, amount: parseFloat(el.dataset.parallax) || 12 }));

const ghostWords = [...document.querySelectorAll("[data-ghost-parallax]")];

let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    if (!reduced) {
      parallaxEls.forEach(({ el, amount }) => {
        const r = el.parentElement.getBoundingClientRect();
        const prog = Math.min(1, Math.max(0, -r.top / (r.height || 1)));
        el.style.transform = `translateY(${prog * amount}%)`;
      });
      ghostWords.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const prog = (window.innerHeight / 2 - r.top) / window.innerHeight;
        const dir = i % 2 === 0 ? 1 : -1;
        el.style.transform = `translateX(${prog * 3 * dir}rem)`;
      });
    }
    ticking = false;
  });
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* --------------------------------------------------------------- carousels */
document.querySelectorAll("[data-carousel]").forEach((root) => {
  const slides = [...root.querySelectorAll("[data-slide]")];
  const dots = [...root.querySelectorAll(".dot")];
  const imgs = [...root.querySelectorAll("[data-carousel-img]")];
  if (!slides.length) return;
  let i = 0;
  let timer = null;
  const delay = parseInt(root.dataset.autoplay || "3800", 10);

  const go = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
    dots.forEach((d, k) => d.setAttribute("aria-selected", String(k === i)));
    imgs.forEach((m, k) => m.classList.toggle("is-active", k === i));
  };
  const start = () => {
    if (reduced || !delay) return;
    stop();
    timer = setInterval(() => go(i + 1), delay);
  };
  const stop = () => timer && clearInterval(timer);

  dots.forEach((d, k) =>
    d.addEventListener("click", () => {
      go(k);
      start();
    })
  );
  root.querySelector("[data-prev]")?.addEventListener("click", () => {
    go(i - 1);
    start();
  });
  root.querySelector("[data-next]")?.addEventListener("click", () => {
    go(i + 1);
    start();
  });
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  go(0);
  start();
});

/* -------------------------------------------------------------- accordion */
document.querySelectorAll(".acc__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".acc__item");
    const open = item.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

/* ------------------------------------------------------------ menu overlay */
const menu = document.getElementById("menu");
const openMenu = () => {
  menu?.classList.add("is-open");
  lockScroll(true);
  menu?.querySelector("a")?.focus({ preventScroll: true });
};
const closeMenu = () => {
  menu?.classList.remove("is-open");
  lockScroll(false);
};
document.querySelectorAll("[data-menu-open]").forEach((b) => b.addEventListener("click", openMenu));
document.querySelectorAll("[data-menu-close]").forEach((b) => b.addEventListener("click", closeMenu));
menu?.querySelectorAll(".menu__links a").forEach((a, i) => {
  a.style.transitionDelay = `${120 + i * 55}ms`;
});

/* ------------------------------------------------------------------ escape */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (menu?.classList.contains("is-open")) closeMenu();
  }
});

/* ------------------------------------------------- in-page anchor scrolling */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(target, { offset: -80 });
    else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  });
});

/* ------------------------------------------------------- GTM/GA4 tracking */
window.dataLayer = window.dataLayer || [];

document.addEventListener("click", (e) => {
  const callLink = e.target.closest('a[href^="tel:"]');
  if (callLink) {
    window.dataLayer.push({ event: "call_click", phone_number: "(888) 418-1798" });
  }
});

const scrollThresholds = [25, 50, 75, 100];
const scrollFired = new Set();
let scrollTicking = false;
window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
      scrollThresholds.forEach((threshold) => {
        if (percent >= threshold && !scrollFired.has(threshold)) {
          scrollFired.add(threshold);
          window.dataLayer.push({ event: "scroll_depth", percent: threshold });
        }
      });
      scrollTicking = false;
    });
  },
  { passive: true },
);

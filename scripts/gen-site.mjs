/**
 * Static site generator for the NEXORA CONNECT prototype.
 * Emits plain HTML into public/ — the shipped site has no runtime build step.
 * Run: bun scripts/gen-site.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public");

const IMG = {
  hero: "/assets/img/hero-home.jpg",
  router: "/assets/img/router.jpg",
  tv: "/assets/img/smart-tv.jpg",
  streaming: "/assets/img/streaming.jpg",
  office: "/assets/img/home-office.jpg",
  family: "/assets/img/family-tv.jpg",
  support: "/assets/img/support.jpg",
  devices: "/assets/img/devices.jpg",
  apartment: "/assets/img/apartment.jpg",
  network: "/assets/img/network.jpg",
  phone: "/assets/img/phone.jpg",
};

const ARROW = `<svg class="arw" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const MARK = `<svg class="brand__mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
  <circle cx="16" cy="16" r="15" stroke="currentColor" stroke-opacity=".28"/>
  <path d="M6.5 18.5c5.2-5.2 13.8-5.2 19 0" stroke="#6C4DF6" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M10.5 22.5c3-3 8-3 11 0" stroke="#16B8C4" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="16" cy="26" r="2" fill="#FF8A4C"/>
</svg>`;

const brand = (cls = "") =>
  `<a class="brand ${cls}" href="/" aria-label="Nexora Connect home">${MARK}<span class="brand__word"><span>Nexora</span><span>Connect</span></span></a>`;

const NAV = [
  ["Internet", "/internet.html"],
  ["TV &amp; Cable", "/tv-cable.html"],
  ["Streaming", "/streaming.html"],
  ["Assistance", "/assistance.html"],
  ["Resources", "/resources.html"],
  ["About", "/about.html"],
  ["Contact", "/contact.html"],
];

const btn = (label, { href, cls = "", modal = false, sm = false } = {}) => {
  const attrs = modal ? `type="button" data-modal-open` : "";
  const c = `btn ${cls} ${sm ? "btn--sm" : ""}`.trim();
  return modal
    ? `<button class="${c}" ${attrs}>${label} ${ARROW}</button>`
    : `<a class="${c}" href="${href}">${label} ${ARROW}</a>`;
};

const words = (text) =>
  text
    .split(" ")
    .map((w) => `<span class="word"><i>${w}</i></span>`)
    .join(" ");

/* --------------------------------------------------------------- shell --- */
function shell({ title, description, path, body, heroLight = true }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Nexora Connect">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${path}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css">
<script type="importmap">
{ "imports": { "lenis": "https://cdn.jsdelivr.net/npm/lenis@1.1.18/+esm" } }
</script>
</head>
<body>

<div id="loader" role="status" aria-label="Loading">
  <div class="loader__inner">
    ${MARK.replace('class="brand__mark"', 'class="brand__mark" style="width:2.75rem;height:2.75rem;margin:0 auto .875rem"')}
    <div class="brand__word" style="justify-items:center"><span>Nexora</span><span>Connect</span></div>
    <div class="loader__bar"><div class="loader__fill"></div></div>
  </div>
</div>

<a href="#main" class="btn btn--sm" style="position:absolute;left:-9999px">Skip to content</a>

<header class="header ${heroLight ? "header--light" : ""}">
  <div class="wrap header__bar">
    ${brand()}
    <nav class="nav" aria-label="Primary">
      ${NAV.map(([l, h]) => `<a href="${h}"${h === path ? ' aria-current="page"' : ""}>${l}</a>`).join("\n      ")}
    </nav>
    <div class="header__end">
      <button class="btn btn--sm" data-modal-open type="button">Get Assistance ${ARROW}</button>
      <button class="burger" data-menu-open type="button" aria-label="Open menu" aria-controls="menu">
        <span></span><span></span>
      </button>
    </div>
  </div>
</header>

<nav class="menu" id="menu" aria-label="Full site menu">
  <div class="wrap menu__head">
    ${brand()}
    <button class="circ" data-menu-close type="button" aria-label="Close menu">&#10005;</button>
  </div>
  <div class="wrap" style="flex:1;display:flex;flex-direction:column">
    <ul class="menu__links">
      ${["Internet:/internet.html", "TV &amp; Cable:/tv-cable.html", "Streaming:/streaming.html", "Assistance:/assistance.html", "Resources:/resources.html", "Contact:/contact.html"]
        .map((s) => {
          const [l, h] = s.split(":");
          return `<li><a href="${h}">${l}</a></li>`;
        })
        .join("\n      ")}
    </ul>
    <div class="menu__foot">
      <p class="small" style="color:rgba(255,255,255,.55);max-width:26rem">Independent third-party assistance platform.</p>
      <button class="btn" data-modal-open type="button">Get Assistance ${ARROW}</button>
    </div>
  </div>
</nav>

<main id="main">
${body}
</main>

<footer class="footer">
  <div class="wrap">
    <div class="footer__cta">
      <span class="eyebrow rv">Get Started</span>
      <h2 class="h1 rv" style="max-width:16ch">Ready To Explore Your Options?</h2>
      <div class="rv">${btn("Get Assistance", { modal: true })}</div>
    </div>

    <div class="footer__cols">
      <div>
        ${brand()}
        <p class="small" style="color:rgba(255,255,255,.6);margin-top:1rem;max-width:22rem">
          Helping households explore and understand internet, TV, cable and streaming options.
        </p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="/internet.html">Internet</a></li>
          <li><a href="/tv-cable.html">TV &amp; Cable</a></li>
          <li><a href="/streaming.html">Streaming</a></li>
          <li><a href="/assistance.html">Assistance</a></li>
        </ul>
      </div>
      <div>
        <h4>Resources</h4>
        <ul>
          <li><a href="/resources.html">Guides</a></li>
          <li><a href="/faq.html">FAQ</a></li>
          <li><a href="/assistance.html">Help Center</a></li>
          <li><a href="/contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="/about.html">About</a></li>
          <li><a href="/disclaimer.html">Disclaimer</a></li>
          <li><a href="/privacy.html">Privacy Policy</a></li>
          <li><a href="/terms.html">Terms &amp; Conditions</a></li>
          <li><a href="/refund.html">Refund Policy</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><span>Phone: [phone number to be provided]</span></li>
          <li><span>Email: [email address to be provided]</span></li>
          <li><span>Business hours: [hours to be provided]</span></li>
        </ul>
      </div>
    </div>

    <p class="disclosure">
      <strong>Third-party disclosure.</strong> We are an independent third-party assistance platform.
      We do not directly provide internet, cable, television, or streaming services and are not
      affiliated with or endorsed by any specific service provider unless explicitly stated.
      Any third-party names shown on this website belong to their respective owners and refer to
      separate, independently operated services.
    </p>

    <div class="footer__base">
      <span>&copy; ${new Date().getFullYear()} Nexora Connect. All rights reserved.</span>
      <span>Independent third-party assistance platform.</span>
    </div>
  </div>
</footer>

<div class="modal" id="assist-modal" role="dialog" aria-modal="true" aria-labelledby="assist-title" hidden>
  <button class="modal__backdrop" data-modal-close type="button" aria-label="Close dialog"></button>
  <div class="modal__panel">
    <button class="modal__close" data-modal-close type="button" aria-label="Close dialog">&#10005;</button>
    <span class="eyebrow">Get Assistance</span>
    <h2 class="h3" id="assist-title" style="margin-top:.75rem">Let's Find A Direction</h2>

    <form id="assist-form" novalidate>
      <div class="form-grid">
        <div class="field"><label for="f-name">Full Name</label><input id="f-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="f-phone">Phone Number</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
        <div class="field"><label for="f-zip">ZIP Code</label><input id="f-zip" name="zip" inputmode="numeric" autocomplete="postal-code"></div>
        <div class="field full">
          <label for="f-topic">What can we help you explore?</label>
          <select id="f-topic" name="topic">
            <option>Internet</option>
            <option>TV &amp; Cable</option>
            <option>Streaming</option>
            <option>Multiple Services</option>
            <option>General Assistance</option>
          </select>
        </div>
        <div class="field full">
          <label for="f-msg">Message</label>
          <textarea id="f-msg" name="message" placeholder="Tell us what you're looking for..."></textarea>
        </div>
        <div class="full"><button class="btn" data-submit type="submit">Request Assistance</button></div>
        <p class="small full" style="color:var(--ink-soft)">
          This form is a demonstration only and does not transmit data anywhere.
        </p>
      </div>
    </form>

    <div id="assist-success" tabindex="-1" hidden>
      <h2 class="h3" style="margin-top:1.5rem">Request Received</h2>
      <p class="lede" style="margin-top:.75rem;font-size:1rem">
        Thanks, <span data-first-name>there</span>. Your request has been received and our team can
        follow up with you regarding your inquiry.
      </p>
      <div style="margin-top:1.5rem"><button class="btn btn--ghost" data-modal-close type="button">Close</button></div>
    </div>
  </div>
</div>

<script type="module" src="/assets/js/site.js"></script>
</body>
</html>`;
}

/* ------------------------------------------------------- shared sections --- */
const heroInner = (eyebrow, title, sub, img, alt) => `
<section class="hero hero--inner">
  <div class="hero__media" data-parallax="12"><img src="${img}" alt="${alt}" width="1600" height="1200"></div>
  <div class="wrap hero__body">
    <span class="eyebrow" style="color:var(--brand-light)">${eyebrow}</span>
    <h1 class="display hero__title" style="margin-top:1rem">${words(title)}</h1>
    <p class="hero__sub">${sub}</p>
  </div>
</section>`;

const assistCta = `
<section class="section section--dark">
  <div class="wrap" style="display:grid;gap:1.75rem;justify-items:start">
    <span class="eyebrow rv">Assistance</span>
    <h2 class="h1 rv" style="max-width:14ch">Not Sure Where To Start?</h2>
    <p class="lede rv" style="font-size:1.0625rem">Tell us what you're looking for and get independent assistance navigating internet, TV, cable, and entertainment options.</p>
    <div class="rv" style="display:flex;gap:.75rem;flex-wrap:wrap">
      <button class="btn" data-modal-open type="button">Get Assistance ${ARROW}</button>
      <a class="btn btn--onDark" href="/contact.html">Contact Us ${ARROW}</a>
    </div>
  </div>
</section>`;

const legalPage = (heading, intro, blocks) => `
${heroInner("Legal", heading, intro, IMG.apartment, "Modern apartment interior at dusk")}
<div class="page">
  <section class="section">
    <div class="wrap">
      <div class="prose rv">
        <p><strong>Placeholder notice.</strong> The content below is a structural placeholder. Final wording must be reviewed and supplied by the business before publication.</p>
        ${blocks.map(([h, b]) => `<h2>${h}</h2>${b}`).join("\n        ")}
        <h2>Contact</h2>
        <p>Questions about this policy can be sent to [email address to be provided].</p>
      </div>
    </div>
  </section>
</div>`;

/* ------------------------------------------------------------- home page --- */
const services = [
  ["Internet", "Home Connectivity", "Explore Internet", "/internet.html", IMG.router, "Modern Wi-Fi router on a shelf in a home office"],
  ["TV &amp; Cable", "Home Entertainment", "Explore TV", "/tv-cable.html", IMG.tv, "Large smart television in a contemporary living room"],
  ["Streaming", "Digital Entertainment", "Explore Streaming", "/streaming.html", IMG.streaming, "Person watching streaming content on a television at night"],
];

const ghostSlides = [
  { words: ["Simple", "Connected", "Better", "Choices"], on: "Better", img: IMG.network, alt: "Network cables connected to a switch" },
  { words: ["Internet", "TV", "Streaming", "Support"], on: "Streaming", img: IMG.apartment, alt: "Modern apartment living room at dusk" },
  { words: ["Explore", "Compare", "Understand", "Connect"], on: "Understand", img: IMG.devices, alt: "Laptop, phone and tablet on a desk" },
];

const home = `
<section class="hero">
  <div class="hero__media" data-parallax="12">
    <img src="${IMG.hero}" alt="Modern living room at dusk with a wall-mounted smart TV" width="1920" height="1200" fetchpriority="high">
  </div>
  <div class="wrap hero__body">
    <h1 class="display hero__title">${words("Stay Connected. Stay Entertained.")}</h1>
    <p class="hero__sub clip"><span>Explore internet, TV, cable and streaming options with independent assistance designed to make connectivity easier to understand.</span></p>
    <div class="hero__cta">
      <a class="btn" href="#services">Explore Options ${ARROW}</a>
      <button class="btn btn--onDark" data-modal-open type="button">Get Assistance ${ARROW}</button>
    </div>
    <p class="hero__disclosure">
      Independent third-party assistance platform. We help users explore and navigate available
      connectivity and entertainment services.
    </p>

    <div class="hero__deck">
      <div class="glass slider" data-carousel data-autoplay="3800" aria-roledescription="carousel" aria-label="Service categories">
        ${services
          .map(
            ([label, title, cta, href, img, alt]) => `
        <div class="slide" data-slide>
          <img class="slide__img" src="${img}" alt="${alt}" loading="lazy" width="320" height="240">
          <div>
            <span class="slide__label">${label}</span>
            <h2 class="slide__title">${title}</h2>
          </div>
          <a class="btn btn--onDark btn--sm" href="${href}">${cta} ${ARROW}</a>
        </div>`
          )
          .join("")}
        <div class="dots" role="tablist" aria-label="Choose service">
          ${services.map((s, i) => `<button class="dot" role="tab" aria-selected="${i === 0}" aria-label="${s[1]}"></button>`).join("")}
        </div>
      </div>

      <div class="glass trust-card">
        <div class="trust-card__top">
          <div>
            <div class="trust-card__num">Easy Assistance</div>
            <p class="trust-card__cap">Guidance when you need it</p>
          </div>
          <div class="circles" aria-hidden="true">
            <span style="background:var(--brand)"></span>
            <span style="background:var(--accent-cyan)"></span>
            <span style="background:var(--brand-light)"></span>
            <span style="background-image:url('${IMG.support}')"></span>
          </div>
        </div>
        <img class="trust-card__img" src="${IMG.support}" alt="Customer support representative wearing a headset" loading="lazy" width="640" height="360">
      </div>
    </div>
  </div>
</section>

<div class="page">

  <section class="section">
    <div class="wrap">
      <div class="trust-grid">
        <div class="card rv">
          <div class="badge-num">100%</div>
          <p class="lede" style="margin-top:1rem;font-size:1rem">Focused on helping you understand your options</p>
          <h2 class="h2" style="margin-top:3rem">Connectivity Made Easier</h2>
        </div>
        <div class="card rv" style="background:var(--surface)">
          <h2 class="h2">Built Around Your Needs</h2>
          <p class="lede" style="margin-top:1.25rem">From home internet and Wi-Fi to television and streaming entertainment, we help make complex service options easier to understand.</p>
          <img src="${IMG.apartment}" alt="Modern apartment with a city view at dusk" loading="lazy" width="1600" height="1200" style="margin-top:2rem;border-radius:1.25rem;height:14rem;width:100%;object-fit:cover">
        </div>
      </div>
    </div>
  </section>

  <section class="ghost-stage" data-carousel data-autoplay="5200" aria-label="Brand statements">
    <div class="ghost-stage__img" aria-hidden="true">
      ${ghostSlides.map((s) => `<img data-carousel-img src="${s.img}" alt="" loading="lazy" style="position:absolute;inset:0">`).join("")}
    </div>
    <div class="wrap" style="position:relative">
      ${ghostSlides
        .map(
          (s) => `
      <div class="ghost-panel" data-slide>
        <ul class="ghost-words">
          ${s.words.map((w) => `<li><span class="gw ${w === s.on ? "gw--on" : ""}" data-ghost-parallax>${w}</span></li>`).join("")}
        </ul>
      </div>`
        )
        .join("")}
      <div class="ghost-ctrl">
        <button class="circ" data-prev type="button" aria-label="Previous statement">&#8592;</button>
        <button class="circ" data-next type="button" aria-label="Next statement">&#8594;</button>
      </div>
    </div>
  </section>

  <section class="section" id="services">
    <div class="wrap">
      <span class="eyebrow rv">Our Services</span>
      <h2 class="h1 rv" style="margin-top:1rem;max-width:18ch">Everything You Need To Stay Connected</h2>
      <div class="rows">
        ${[
          ["01", "Internet Assistance", "Explore home internet and connectivity options based on how you use the internet.", "/internet.html"],
          ["02", "TV &amp; Cable", "Learn about television and cable-related service options for your home.", "/tv-cable.html"],
          ["03", "Streaming", "Explore digital entertainment and streaming-related information.", "/streaming.html"],
          ["04", "Connectivity Support", "Get guidance when navigating internet, television, and entertainment services.", "/assistance.html"],
        ]
          .map(
            ([n, t, d, h]) => `
        <a class="row rv" href="${h}">
          <span class="row__n">${n}</span>
          <h3 class="row__t">${t}</h3>
          <p class="row__d">${d}</p>
          <span class="row__a" aria-hidden="true">${ARROW}</span>
        </a>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section--surface">
    <div class="wrap">
      <h2 class="h1 rv" style="max-width:14ch">Inside The Connected Home</h2>
      <div class="grid-2" style="margin-top:3.5rem">
        <div class="rv">
          <span class="eyebrow">Connected Living</span>
          <h3 class="h2" style="margin-top:1rem">Designed For The Way You Live</h3>
          <p class="lede" style="margin-top:1.25rem">Whether you're working remotely, streaming movies, gaming, studying, or connecting multiple devices, understanding your connectivity options can make everyday digital life easier.</p>
        </div>
        <div class="tilt-stack rv">
          <figure class="tilt" style="margin:0">
            <img src="${IMG.office}" alt="Bright home office with a laptop on a wooden desk" loading="lazy" width="1280" height="1600">
            <figcaption class="tilt__cap"><h3>Home Internet</h3><p>Connectivity for work, entertainment, browsing, and everyday life.</p></figcaption>
          </figure>
          <figure class="tilt" style="margin:0">
            <img src="${IMG.family}" alt="Family sitting together on a sofa watching television" loading="lazy" width="1280" height="1600">
            <figcaption class="tilt__cap"><h3>Entertainment</h3><p>TV, streaming, and connected entertainment for the whole household.</p></figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="grid-2">
        <div class="rv">
          <span class="eyebrow">Internet</span>
          <h2 class="h1" style="margin-top:1rem;max-width:14ch">A Better Way To Explore Internet Options</h2>
          <div style="margin-top:2rem">${btn("Explore Internet", { href: "/internet.html" })}</div>
        </div>
        <div class="media-band rv"><img src="${IMG.phone}" alt="Person holding a smartphone connected to home Wi-Fi in a kitchen" loading="lazy" width="1600" height="1200"></div>
      </div>
      <div class="grid-3" style="margin-top:3rem">
        ${[
          ["Home Internet", "Understand connectivity options for everyday home use."],
          ["Wi-Fi &amp; Devices", "Learn how routers, devices, and home networks work together."],
          ["Connected Work", "Explore considerations for remote work, study, and productivity."],
        ]
          .map(([t, d]) => `<div class="feature rv"><h3>${t}</h3><p>${d}</p></div>`)
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section--dark">
    <div class="wrap">
      <span class="eyebrow rv">TV &amp; Cable</span>
      <h2 class="h1 rv" style="margin-top:1rem;max-width:14ch">Bring More Entertainment Home</h2>
      <div class="media-band rv" style="margin-top:2.5rem"><img src="${IMG.tv}" alt="Cinematic smart television mounted in a modern living room" loading="lazy" width="1280" height="1600"></div>
      <div class="grid-4" style="margin-top:2rem">
        ${[
          ["Cable TV", "Learn how cable-based television services are generally structured."],
          ["Television Services", "Understand common equipment and setup considerations."],
          ["Entertainment Options", "See how different viewing options compare at a high level."],
          ["Channel Information", "Learn where to verify channel availability with a provider."],
        ]
          .map(([t, d]) => `<div class="feature rv"><h3>${t}</h3><p>${d}</p></div>`)
          .join("")}
      </div>
      <div class="rv" style="margin-top:2.5rem">${btn("Explore TV &amp; Cable", { href: "/tv-cable.html", cls: "btn--onDark" })}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <span class="eyebrow rv">Streaming</span>
      <h2 class="h1 rv" style="margin-top:1rem;max-width:16ch">Entertainment Beyond The Cable Box</h2>
      <div class="grid-3 rv" style="margin-top:2.5rem">
        <img src="${IMG.streaming}" alt="Television showing a colourful screen in a dark living room" loading="lazy" width="1280" height="1600" style="border-radius:var(--radius-card);height:20rem;width:100%;object-fit:cover">
        <img src="${IMG.devices}" alt="Laptop, smartphone and tablet arranged on a desk" loading="lazy" width="1600" height="1200" style="border-radius:var(--radius-card);height:20rem;width:100%;object-fit:cover">
        <img src="${IMG.family}" alt="Family watching television together in a living room" loading="lazy" width="1280" height="1600" style="border-radius:var(--radius-card);height:20rem;width:100%;object-fit:cover">
      </div>
      <div class="pills rv" style="margin-top:2rem">
        ${["Movies", "Shows", "Sports", "Family", "Live Entertainment", "On-Demand"].map((p) => `<span class="pill">${p}</span>`).join("")}
      </div>
      <p class="lede rv" style="margin-top:1.5rem">Streaming platforms are operated independently by their own companies. We provide general information only and do not own, operate, or represent any streaming service.</p>
    </div>
  </section>

  <section class="section section--surface">
    <div class="wrap">
      <span class="eyebrow rv">How It Works</span>
      <h2 class="h1 rv" style="margin-top:1rem;max-width:12ch">Four Simple Steps</h2>
      <div class="grid-4" style="margin-top:2.5rem">
        ${[
          ["01", "Explore", "Browse available service categories."],
          ["02", "Understand", "Learn what different connectivity and entertainment options mean."],
          ["03", "Get Assistance", "Request independent guidance."],
          ["04", "Move Forward", "Use the information to make your next decision."],
        ]
          .map(([n, t, d]) => `<div class="step rv"><span class="step__n">${n}</span><h3>${t}</h3><p>${d}</p></div>`)
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section--dark">
    <div class="wrap grid-4">
      ${[
        ["4", "Core service categories"],
        ["3", "Main entertainment areas"],
        ["1", "Simple assistance experience"],
        ["24/7", "Online information access"],
      ]
        .map(([n, l]) => `<div class="stat rv"><div class="stat__n">${n}</div><p class="stat__l">${l}</p></div>`)
        .join("")}
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <span class="eyebrow rv">What Customers Say</span>
      <h2 class="h1 rv" style="margin-top:1rem;max-width:14ch">Built Around Simpler Choices</h2>
      <div class="grid-3" style="margin-top:2.5rem">
        ${[
          ["The information was much easier to understand than trying to figure everything out on my own.", "Alex R."],
          ["I needed help understanding my internet and TV options, and the process was straightforward.", "Jordan M."],
          ["The site made it easier to understand what I should look for before choosing a service.", "Taylor K."],
        ]
          .map(
            ([q, a]) => `
        <blockquote class="quote rv"><p>&ldquo;${q}&rdquo;</p><footer><b>${a}</b>Illustrative placeholder feedback</footer></blockquote>`
          )
          .join("")}
      </div>
      <p class="small rv" style="margin-top:1.25rem;color:var(--ink-soft)">These are illustrative placeholder statements, not verified customer reviews.</p>
    </div>
  </section>
</div>

${assistCta}`;

/* ----------------------------------------------------------- inner pages --- */
const internet = `
${heroInner("Internet", "Home Connectivity, Explained", "Explore how home internet, Wi-Fi and connected devices fit together — and what to consider before choosing a service.", IMG.router, "Modern Wi-Fi router on a shelf in a bright home office")}
<div class="page">
  <section class="section">
    <div class="wrap">
      <div class="grid-2">
        <div class="rv">
          <span class="eyebrow">Overview</span>
          <h2 class="h1" style="margin-top:1rem;max-width:14ch">A Better Way To Explore Internet Options</h2>
          <p class="lede" style="margin-top:1.25rem">Home internet decisions usually come down to how a household actually uses the connection. We help you frame those questions clearly, without pressure and without pricing claims.</p>
          <div style="margin-top:2rem">${btn("Get Assistance", { modal: true })}</div>
        </div>
        <div class="media-band rv"><img src="${IMG.office}" alt="Person working on a laptop in a bright home office" loading="lazy" width="1280" height="1600"></div>
      </div>
      <div class="grid-3" style="margin-top:3rem">
        ${[
          ["Home Internet", "Understand connectivity options for everyday home use."],
          ["Wi-Fi &amp; Devices", "Learn how routers, devices, and home networks work together."],
          ["Connected Work", "Explore considerations for remote work, study, and productivity."],
        ].map(([t, d]) => `<div class="feature rv"><h3>${t}</h3><p>${d}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section section--surface">
    <div class="wrap">
      <span class="eyebrow rv">What To Consider</span>
      <h2 class="h1 rv" style="margin-top:1rem;max-width:16ch">Questions Worth Asking First</h2>
      <div class="rows">
        ${[
          ["01", "How many devices connect at once?", "Households with many simultaneous devices tend to have different needs from single-person homes."],
          ["02", "What do you use the connection for?", "Video calls, streaming, gaming and large downloads each place different demands on a network."],
          ["03", "Where is the equipment placed?", "Router placement, building materials and home layout all influence Wi-Fi coverage."],
          ["04", "What is actually available at your address?", "Availability differs by location and must be confirmed directly with the applicable provider."],
        ].map(([n, t, d]) => `<div class="row rv"><span class="row__n">${n}</span><h3 class="row__t">${t}</h3><p class="row__d">${d}</p><span class="row__a" aria-hidden="true">${ARROW}</span></div>`).join("")}
      </div>
    </div>
  </section>
</div>
${assistCta}`;

const tvCable = `
${heroInner("TV &amp; Cable", "Bring More Entertainment Home", "Learn how television and cable-related services are generally structured, and what to check before making a decision.", IMG.tv, "Smart television mounted on a wall in a modern living room")}
<div class="page">
  <section class="section">
    <div class="wrap">
      <div class="grid-4">
        ${[
          ["Cable TV", "General information about how cable-delivered television usually works."],
          ["Television Services", "Equipment, set-top boxes and installation considerations."],
          ["Entertainment Options", "How live television and on-demand viewing differ."],
          ["Channel Information", "Where to verify channel line-ups directly with a provider."],
        ].map(([t, d]) => `<div class="feature rv"><h3>${t}</h3><p>${d}</p></div>`).join("")}
      </div>
      <div class="media-band rv" style="margin-top:3rem"><img src="${IMG.family}" alt="Family watching television together in a bright living room" loading="lazy" width="1280" height="1600"></div>
      <p class="lede rv" style="margin-top:2rem">We do not publish channel counts, package contents or pricing. Those details change frequently and should always be confirmed with the applicable provider.</p>
      <div class="rv" style="margin-top:1.75rem">${btn("Explore TV &amp; Cable", { modal: true })}</div>
    </div>
  </section>
</div>
${assistCta}`;

const streaming = `
${heroInner("Streaming", "Entertainment Beyond The Cable Box", "Explore how streaming fits alongside traditional television, and what to think about before adding another service.", IMG.streaming, "Television glowing in a dark living room at night")}
<div class="page">
  <section class="section">
    <div class="wrap">
      <div class="grid-3 rv">
        <img src="${IMG.devices}" alt="Laptop, smartphone and tablet on a desk" loading="lazy" width="1600" height="1200" style="border-radius:var(--radius-card);height:18rem;width:100%;object-fit:cover">
        <img src="${IMG.apartment}" alt="Modern apartment living room at dusk" loading="lazy" width="1600" height="1200" style="border-radius:var(--radius-card);height:18rem;width:100%;object-fit:cover">
        <img src="${IMG.phone}" alt="Smartphone connected to Wi-Fi held in a kitchen" loading="lazy" width="1600" height="1200" style="border-radius:var(--radius-card);height:18rem;width:100%;object-fit:cover">
      </div>
      <div class="pills rv" style="margin-top:2rem">
        ${["Movies", "Shows", "Sports", "Family", "Live Entertainment", "On-Demand"].map((p) => `<span class="pill">${p}</span>`).join("")}
      </div>
      <div class="card rv" style="margin-top:2.5rem;background:var(--surface)">
        <h2 class="h3">Streaming services are operated independently</h2>
        <p class="lede" style="margin-top:.75rem">Nexora Connect does not own, operate, resell, or represent any streaming platform. Any third-party service referenced anywhere on this website is a separate business, operated by its own company, under its own terms.</p>
      </div>
    </div>
  </section>
</div>
${assistCta}`;

const assistance = `
${heroInner("Assistance", "Guidance When You Need It", "Independent help understanding internet, television, cable and streaming options — at your pace.", IMG.support, "Customer support representative wearing a headset at a desk")}
<div class="page">
  <section class="section">
    <div class="wrap">
      <span class="eyebrow rv">How It Works</span>
      <h2 class="h1 rv" style="margin-top:1rem;max-width:12ch">Four Simple Steps</h2>
      <div class="grid-4" style="margin-top:2.5rem">
        ${[
          ["01", "Explore", "Browse available service categories."],
          ["02", "Understand", "Learn what different connectivity and entertainment options mean."],
          ["03", "Get Assistance", "Request independent guidance."],
          ["04", "Move Forward", "Use the information to make your next decision."],
        ].map(([n, t, d]) => `<div class="step rv"><span class="step__n">${n}</span><h3>${t}</h3><p>${d}</p></div>`).join("")}
      </div>
    </div>
  </section>
  <section class="section section--surface">
    <div class="wrap grid-2">
      <div class="rv">
        <h2 class="h2">What assistance does and does not include</h2>
        <p class="lede" style="margin-top:1.25rem">We help you understand terminology, compare categories at a high level, and identify the questions to ask. We do not activate accounts, sell plans, or make guarantees about availability, speeds, or outcomes.</p>
      </div>
      <div class="media-band rv"><img src="${IMG.network}" alt="Network cables connected to a home network switch" loading="lazy" width="1600" height="1200"></div>
    </div>
  </section>
</div>
${assistCta}`;

const articles = [
  ["Internet", "How Home Internet Works", "A plain-language walkthrough of how a connection reaches your home and what happens next.", IMG.network, "Network cables plugged into a switch"],
  ["Wi-Fi", "Understanding Wi-Fi", "Bands, coverage and interference — what actually affects the signal around your home.", IMG.router, "Wi-Fi router on a wooden shelf"],
  ["Guide", "What To Consider When Choosing Internet", "The questions worth answering before you compare anything at all.", IMG.office, "Laptop on a desk in a home office"],
  ["Entertainment", "Cable TV vs Streaming", "How the two approaches differ in delivery, equipment and flexibility.", IMG.tv, "Smart television in a living room"],
  ["Devices", "Understanding Smart TV Connectivity", "How a smart TV connects, and what it needs from your home network.", IMG.streaming, "Television screen glowing in a dark room"],
  ["Network", "How Many Devices Can Your Home Network Handle?", "Why device count matters less than what those devices are doing.", IMG.devices, "Laptop, phone and tablet on a desk"],
];

const resources = `
${heroInner("Resources", "The Connectivity Guide", "Editorial explainers on internet, Wi-Fi, television and streaming — written to be understood, not to sell.", IMG.devices, "Laptop, smartphone and tablet arranged on a light desk")}
<div class="page">
  <section class="section">
    <div class="wrap grid-3">
      ${articles
        .map(
          ([cat, title, desc, img, alt]) => `
      <article class="article rv">
        <div class="article__img"><img src="${img}" alt="${alt}" loading="lazy" width="1600" height="1200"></div>
        <div class="article__body">
          <span class="article__cat">${cat}</span>
          <h2>${title}</h2>
          <p>${desc}</p>
          <span class="article__more">Read more ${ARROW}</span>
        </div>
      </article>`
        )
        .join("")}
    </div>
    <div class="wrap"><p class="small rv" style="margin-top:2rem;color:var(--ink-soft)">Guide articles are informational only and are published in full as content becomes available.</p></div>
  </section>
</div>
${assistCta}`;

const about = `
${heroInner("About", "Making Connectivity Easier To Understand", "We are an independent third-party assistance platform helping consumers explore and understand internet, television, cable, streaming, and connectivity-related services.", IMG.apartment, "Modern apartment interior at dusk with city views")}
<div class="page">
  <section class="section">
    <div class="wrap grid-2">
      <div class="rv">
        <span class="eyebrow">Our Approach</span>
        <h2 class="h2" style="margin-top:1rem">Clarity before commitment</h2>
        <p class="lede" style="margin-top:1.25rem">Connectivity choices are full of terminology that rarely explains itself. Our approach is to slow that down: explain the categories, name the trade-offs, and leave the decision with you.</p>
      </div>
      <div class="media-band rv"><img src="${IMG.support}" alt="Support representative at a desk wearing a headset" loading="lazy" width="1280" height="1600"></div>
    </div>
    <div class="wrap grid-3" style="margin-top:3rem">
      ${[
        ["What We Help With", "Internet, home Wi-Fi, cable and television, streaming entertainment, and general connectivity questions."],
        ["Why Transparency Matters", "We are not a provider. Saying so plainly is the only way our guidance is worth anything."],
        ["How Assistance Works", "You tell us what you're trying to figure out; we help you frame it and point you to the right questions."],
      ].map(([t, d]) => `<div class="feature rv"><h3>${t}</h3><p>${d}</p></div>`).join("")}
    </div>
  </section>
</div>
${assistCta}`;

const faqGroups = [
  ["General", [
    ["Are you an internet service provider?", "No. We are an independent third-party assistance platform. We help users explore and navigate service-related information and do not directly operate an internet or cable network."],
    ["Do you sell internet plans directly?", "No. We do not sell, resell, or activate services. Any service agreement is entered into directly between you and the provider you choose, under that provider's own terms."],
    ["Are you affiliated with any provider?", "We are not affiliated with or endorsed by any specific service provider unless that relationship is explicitly stated on the relevant page."],
  ]],
  ["Internet", [
    ["Can you tell me what speed I need?", "We can help you think through how your household uses the connection. We do not publish speed guarantees or claims."],
    ["Do you show pricing?", "No. Pricing changes frequently and varies by address, so it must be confirmed with the applicable provider."],
  ]],
  ["TV &amp; Cable", [
    ["Do you list channel line-ups?", "No. Channel availability is set by each provider and should be verified directly with them."],
    ["Can you help with equipment questions?", "We can explain common equipment concepts in general terms. Provider-specific hardware support is handled by that provider."],
  ]],
  ["Streaming", [
    ["Do you operate any streaming platform?", "No. Streaming services are operated independently by their own companies under their own terms."],
    ["Can you compare streaming catalogues?", "We provide general category information only. Catalogues change constantly and are best checked at the source."],
  ]],
  ["Assistance", [
    ["What happens after I submit a request?", "On this demonstration site the form does not transmit data. In a live deployment, a team member would follow up regarding your inquiry."],
    ["Is assistance obligation-free?", "Requesting information does not create any obligation to purchase anything from any provider."],
  ]],
  ["Billing &amp; Refunds", [
    ["Do you charge for assistance?", "Any fees, if applicable, would be disclosed before they apply. [Commercial terms to be provided by the business.]"],
    ["How do refunds work?", "Refund terms are described on the Refund Policy page and are currently placeholder content pending final business terms."],
  ]],
];

const faq = `
${heroInner("FAQ", "Questions, Answered Plainly", "Straight answers about what this platform is, what it does, and what it deliberately does not do.", IMG.phone, "Person holding a smartphone in a bright kitchen")}
<div class="page">
  <section class="section">
    <div class="wrap">
      ${faqGroups
        .map(
          ([g, items], gi) => `
      <div class="rv" style="margin-top:${gi ? "3.5rem" : "0"}">
        <h2 class="h3">${g}</h2>
        <div class="acc" style="margin-top:1.25rem">
          ${items
            .map(
              ([q, a], i) => `
          <div class="acc__item">
            <h3 style="margin:0"><button class="acc__btn" type="button" aria-expanded="false" id="faq-${gi}-${i}" aria-controls="faqp-${gi}-${i}">${q}<span class="sign" aria-hidden="true">+</span></button></h3>
            <div class="acc__panel" id="faqp-${gi}-${i}" role="region" aria-labelledby="faq-${gi}-${i}"><div><p>${a}</p></div></div>
          </div>`
            )
            .join("")}
        </div>
      </div>`
        )
        .join("")}
    </div>
  </section>
</div>
${assistCta}`;

const contact = `
${heroInner("Contact", "Let's Find A Direction", "Tell us what you're trying to figure out and we'll help you frame the next question.", IMG.network, "Network cables connected to a home network switch")}
<div class="page">
  <section class="section">
    <div class="wrap grid-2">
      <div class="rv">
        <span class="eyebrow">Get Assistance</span>
        <h2 class="h2" style="margin-top:1rem">Reach out</h2>
        <p class="lede" style="margin-top:1.25rem">Use the assistance request form to describe what you're looking for. Contact details below are placeholders until final company information is supplied.</p>
        <ul style="list-style:none;padding:0;margin:2rem 0 0;display:grid;gap:.75rem;color:var(--ink-soft);font-size:.9375rem">
          <li>Phone — [phone number to be provided]</li>
          <li>Email — [email address to be provided]</li>
          <li>Business hours — [hours to be provided]</li>
          <li>Address — [address to be provided]</li>
        </ul>
        <div style="margin-top:2rem">${btn("Get Assistance", { modal: true })}</div>
      </div>
      <div class="media-band rv"><img src="${IMG.support}" alt="Support representative wearing a headset at a desk" loading="lazy" width="1280" height="1600"></div>
    </div>
  </section>
</div>
${assistCta}`;

/* ------------------------------------------------------------- emit files --- */
const pages = [
  { file: "home.html", path: "/", title: "Internet, TV & Streaming Assistance | Nexora Connect", description: "Independent third-party assistance helping you explore internet, home Wi-Fi, cable TV and streaming options with clear, pressure-free guidance.", body: home },
  { file: "internet.html", path: "/internet.html", title: "Home Internet & Wi-Fi Options | Nexora Connect", description: "Explore home internet and Wi-Fi considerations with independent guidance — no pricing claims, no speed guarantees, just clearer questions.", body: internet },
  { file: "tv-cable.html", path: "/tv-cable.html", title: "TV & Cable Service Information | Nexora Connect", description: "Learn how television and cable-related services are generally structured and what to verify directly with a provider.", body: tvCable },
  { file: "streaming.html", path: "/streaming.html", title: "Streaming Entertainment Guidance | Nexora Connect", description: "Understand how streaming fits alongside traditional television. Independent information only — streaming platforms are operated by their own companies.", body: streaming },
  { file: "assistance.html", path: "/assistance.html", title: "Connectivity Assistance & Support | Nexora Connect", description: "Independent, obligation-free guidance for internet, TV, cable and streaming questions in four simple steps.", body: assistance },
  { file: "resources.html", path: "/resources.html", title: "The Connectivity Guide | Nexora Connect", description: "Editorial explainers on home internet, Wi-Fi, smart TV connectivity, cable versus streaming and home network capacity.", body: resources },
  { file: "about.html", path: "/about.html", title: "About Nexora Connect | Independent Assistance Platform", description: "Nexora Connect is an independent third-party assistance platform helping consumers understand internet, television, cable and streaming services.", body: about },
  { file: "faq.html", path: "/faq.html", title: "Frequently Asked Questions | Nexora Connect", description: "Are you an ISP? Do you sell plans? Clear answers about what Nexora Connect is and how independent assistance works.", body: faq },
  { file: "contact.html", path: "/contact.html", title: "Contact & Assistance Requests | Nexora Connect", description: "Request independent assistance with internet, TV, cable or streaming questions, or reach the Nexora Connect team.", body: contact },
  {
    file: "privacy.html", path: "/privacy.html", title: "Privacy Policy | Nexora Connect",
    description: "How Nexora Connect handles information collected through this website, including cookies, communications and third-party services.",
    body: legalPage("Privacy Policy", "How information submitted through this website is handled.", [
      ["Information We Collect", "<p>Information you voluntarily submit through assistance request forms, and standard technical information collected by the website.</p>"],
      ["How Information Is Used", "<p>To respond to assistance requests and to operate and improve the website. [Final scope to be confirmed by the business.]</p>"],
      ["Cookies", "<p>The website may use cookies or similar technologies for basic functionality and analytics. [Cookie inventory to be provided.]</p>"],
      ["Communications", "<p>If you submit a request, you may be contacted regarding that inquiry using the details you provide.</p>"],
      ["Data Protection", "<p>Reasonable measures are intended to protect submitted information. No method of transmission or storage is completely secure.</p>"],
      ["Third-Party Services", "<p>Service providers referenced on this website operate independently and maintain their own privacy practices.</p>"],
      ["Your Choices", "<p>You may request access to, correction of, or deletion of information you have submitted, subject to applicable law.</p>"],
    ]),
  },
  {
    file: "terms.html", path: "/terms.html", title: "Terms & Conditions | Nexora Connect",
    description: "Terms governing use of the Nexora Connect website and its independent third-party assistance information.",
    body: legalPage("Terms & Conditions", "The terms that govern use of this website.", [
      ["Website Usage", "<p>By using this website you agree to use it lawfully and for personal, informational purposes.</p>"],
      ["Third-Party Assistance", "<p>Nexora Connect is an independent third-party assistance platform. It does not provide internet, cable, television or streaming services.</p>"],
      ["User Responsibilities", "<p>You are responsible for the accuracy of information you submit and for verifying service terms directly with any provider you choose.</p>"],
      ["Information Accuracy", "<p>Information is provided in good faith and on a general basis. It may change without notice and may not reflect current provider offerings.</p>"],
      ["External Providers", "<p>Providers named anywhere on this site operate independently under their own agreements. We are not a party to those agreements.</p>"],
      ["Limitation Of Liability", "<p>To the fullest extent permitted by law, Nexora Connect is not liable for decisions made based on general information provided here. [Final legal wording to be supplied.]</p>"],
    ]),
  },
  {
    file: "refund.html", path: "/refund.html", title: "Refund Policy | Nexora Connect",
    description: "Placeholder refund policy structure for Nexora Connect assistance services, pending final commercial terms.",
    body: legalPage("Refund Policy", "Refund terms for any paid assistance services.", [
      ["Scope", "<p>This policy would apply only to fees charged directly by Nexora Connect, if any. [To be confirmed.]</p>"],
      ["Eligibility", "<p>[Refund eligibility criteria to be provided by the business.]</p>"],
      ["Requesting A Refund", "<p>[Refund request process and timeframe to be provided by the business.]</p>"],
      ["Provider Charges", "<p>Charges billed by an external service provider are governed by that provider's own refund and cancellation terms, not by this policy.</p>"],
    ]),
  },
  {
    file: "disclaimer.html", path: "/disclaimer.html", title: "Disclaimer | Nexora Connect",
    description: "Nexora Connect is an independent third-party assistance platform and does not provide internet, cable, television or streaming services.",
    body: legalPage("Disclaimer", "Our independent status, stated plainly.", [
      ["Independent Third-Party Status", "<p>Nexora Connect is an independent third-party assistance platform. We are not affiliated with or endorsed by any specific service provider unless explicitly stated.</p>"],
      ["No Direct Service Ownership", "<p>We do not own or operate any internet network, cable system, television network, or streaming platform.</p>"],
      ["No Guaranteed Availability", "<p>Service availability depends on your address and on the applicable provider. Nothing on this website guarantees availability, speeds, pricing, or outcomes.</p>"],
      ["External Providers Operate Independently", "<p>All third-party names remain the property of their respective owners and refer to separately operated businesses.</p>"],
      ["Information May Change", "<p>General information published here may become outdated without notice.</p>"],
      ["Verify Final Terms", "<p>Always verify final service terms, pricing and availability directly with the applicable provider before committing.</p>"],
    ]),
  },
];

mkdirSync(OUT, { recursive: true });
for (const p of pages) {
  writeFileSync(join(OUT, p.file), shell({ ...p, heroLight: true }));
  console.log("wrote", p.file);
}

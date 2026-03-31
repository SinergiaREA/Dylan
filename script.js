/* ===== BABY SHOWER — DYLAN ISAAC — Sinergia Moments ===== */
const EVENT_DATE = new Date("2026-04-12T15:00:00-06:00");
const BABY_NAME = "Dylan Isaac Chagala Palayot";
const BABY_SHORT = "Dylan Isaac";
const FATHER = "Francisco Javier Chagala Sixtega";
const MOTHER = "Nancy Palayot Ambros";
const VENUE = "Salón Greyci";
const ADDRESS = "Calle del Cristo, Col. 3 de Mayo";
const EVENT_DATE_TEXT = "12 de abril de 2026";
const EVENT_TIME_TEXT = "3:00 PM";

/* DOM refs */
const $ = (id) => document.getElementById(id);
const invitationView = $("invitationView");
const rsvpForm = $("rsvpForm");
const rsvpFeedback = $("rsvpFeedback");
const confettiLayer = $("confettiLayer");
const particlesLayer = $("particlesLayer");
const downloadOptions = $("downloadOptions");
const submitBtn = $("submitBtn");
const daysEl = $("days"), hoursEl = $("hours"), minutesEl = $("minutes"), secondsEl = $("seconds");

let didReachEvent = false;
let confirmedGuest = { name: "", count: 1, message: "" };

/* ---- VIEW SWITCH ---- */
/* ---- VIEW SWITCH REMOVED ---- */

/* ---- COUNTDOWN ---- */
function pad(v) { return String(v).padStart(2, "0"); }
let countdownInterval;

function updateCountdown() {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) {
    daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
    if (!didReachEvent) { didReachEvent = true; clearInterval(countdownInterval); }
    return;
  }
  daysEl.textContent = pad(Math.floor(diff / 864e5));
  hoursEl.textContent = pad(Math.floor((diff / 36e5) % 24));
  minutesEl.textContent = pad(Math.floor((diff / 6e4) % 60));
  secondsEl.textContent = pad(Math.floor((diff / 1e3) % 60));
}

/* ---- CANVAS INVITATION ---- */
function drawInvitation(guestName, guestCount, guestMessage) {
  const canvas = $("invitationCanvas");
  const ctx = canvas.getContext("2d");
  const W = 1200, H = 1600;
  canvas.width = W; canvas.height = H;

  /* Background gradient */
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#ecfdf5"); bg.addColorStop(0.5, "#d1fae5"); bg.addColorStop(1, "#fefce8");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  /* Decorative circles */
  const circles = [
    [100,120,80,"rgba(110,231,183,.25)"], [1100,100,60,"rgba(252,211,77,.2)"],
    [150,1500,70,"rgba(52,211,153,.2)"], [1050,1480,90,"rgba(254,243,199,.3)"],
    [600,80,40,"rgba(16,185,129,.15)"], [80,800,50,"rgba(110,231,183,.2)"],
    [1120,750,45,"rgba(252,211,77,.15)"]
  ];
  circles.forEach(([x,y,r,c]) => { ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=c; ctx.fill(); });

  /* Small leaf-like decorations along top */
  for (let i = 0; i < 12; i++) {
    const x = 80 + i * 95, y = 50 + Math.sin(i) * 15;
    ctx.beginPath(); ctx.ellipse(x, y, 18, 8, Math.PI/4 + i*0.3, 0, Math.PI*2);
    ctx.fillStyle = `hsla(${150 + i*5}, 70%, ${55 + i*2}%, 0.35)`; ctx.fill();
  }

  /* White card */
  const cx = 80, cy = 130, cw = W - 160, ch = H - 260;
  ctx.save();
  ctx.shadowColor = "rgba(5,150,105,.12)"; ctx.shadowBlur = 40; ctx.shadowOffsetY = 10;
  roundRect(ctx, cx, cy, cw, ch, 40);
  ctx.fillStyle = "rgba(255,255,255,.92)"; ctx.fill();
  ctx.restore();

  /* Card border */
  roundRect(ctx, cx, cy, cw, ch, 40);
  ctx.strokeStyle = "rgba(110,231,183,.4)"; ctx.lineWidth = 2; ctx.stroke();

  /* Inner decorative line */
  roundRect(ctx, cx+20, cy+20, cw-40, ch-40, 30);
  ctx.strokeStyle = "rgba(110,231,183,.2)"; ctx.lineWidth = 1; ctx.stroke();

  /* Top decorative garland dots */
  for (let i = 0; i < 8; i++) {
    const dx = 250 + i * 90, dy = 175 + Math.sin(i*0.8)*12;
    ctx.beginPath(); ctx.arc(dx, dy, 12, 0, Math.PI*2);
    ctx.fillStyle = i%2===0 ? "rgba(52,211,153,.5)" : "rgba(252,211,77,.5)"; ctx.fill();
  }

  const centerX = W / 2;
  let ty = 240;

  /* Brand */
  ctx.textAlign = "center"; ctx.fillStyle = "#059669";
  ctx.font = "600 16px 'Nunito', sans-serif"; ctx.letterSpacing = "4px";
  ctx.fillText("SINERGIA MOMENTS", centerX, ty); ty += 50;

  /* Title */
  ctx.fillStyle = "#047857"; ctx.font = "800 56px 'Baloo 2', cursive";
  ctx.fillText("Baby Shower", centerX, ty); ty += 55;

  /* Divider */
  const divG = ctx.createLinearGradient(centerX-150, ty, centerX+150, ty);
  divG.addColorStop(0, "rgba(110,231,183,0)"); divG.addColorStop(0.5, "rgba(52,211,153,.6)"); divG.addColorStop(1, "rgba(110,231,183,0)");
  ctx.strokeStyle = divG; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(centerX-150, ty); ctx.lineTo(centerX+150, ty); ctx.stroke(); ty += 45;

  /* Baby name */
  ctx.fillStyle = "#065f46"; ctx.font = "800 44px 'Baloo 2', cursive";
  ctx.fillText(BABY_SHORT, centerX, ty); ty += 32;
  ctx.fillStyle = "#047857"; ctx.font = "600 22px 'Nunito', sans-serif";
  ctx.fillText("Chagala Palayot", centerX, ty); ty += 55;

  /* Parents */
  ctx.fillStyle = "#065f46"; ctx.font = "600 20px 'Nunito', sans-serif";
  ctx.fillText("Con amor de sus padres", centerX, ty); ty += 34;
  ctx.font = "700 24px 'Baloo 2', cursive"; ctx.fillStyle = "#059669";
  ctx.fillText(FATHER, centerX, ty); ty += 32;
  ctx.fillText(MOTHER, centerX, ty); ty += 55;

  /* Divider 2 */
  ctx.strokeStyle = divG; ctx.beginPath(); ctx.moveTo(centerX-120, ty); ctx.lineTo(centerX+120, ty); ctx.stroke(); ty += 45;

  /* Event details */
  const details = [
    ["📅", "Fecha", EVENT_DATE_TEXT],
    ["🕐", "Hora", EVENT_TIME_TEXT],
    ["🏛️", "Lugar", VENUE],
    ["📌", "Dirección", ADDRESS]
  ];
  details.forEach(([icon, label, value]) => {
    ctx.font = "700 18px 'Nunito', sans-serif"; ctx.fillStyle = "#10b981";
    ctx.fillText(icon + " " + label, centerX, ty); ty += 28;
    ctx.font = "700 26px 'Baloo 2', cursive"; ctx.fillStyle = "#065f46";
    ctx.fillText(value, centerX, ty); ty += 45;
  });

  ty += 10;
  /* Divider 3 */
  ctx.strokeStyle = divG; ctx.beginPath(); ctx.moveTo(centerX-100, ty); ctx.lineTo(centerX+100, ty); ctx.stroke(); ty += 40;

  /* Motivational message */
  ctx.fillStyle = "#047857"; ctx.font = "italic 20px 'Nunito', sans-serif";
  ctx.fillText("\"Un nuevo ser lleno de luz y amor está por llegar.", centerX, ty); ty += 30;
  ctx.fillText("Gracias por ser parte de este hermoso momento.\"", centerX, ty); ty += 50;

  /* Guest info */
  if (guestName) {
    ctx.fillStyle = "#059669"; ctx.font = "600 18px 'Nunito', sans-serif";
    ctx.fillText("Invitado especial", centerX, ty); ty += 30;
    ctx.font = "700 28px 'Baloo 2', cursive"; ctx.fillStyle = "#047857";
    ctx.fillText(guestName + " (" + guestCount + " asistente" + (guestCount > 1 ? "s" : "") + ")", centerX, ty); ty += 35;
    if (guestMessage) {
      ctx.font = "italic 18px 'Nunito', sans-serif"; ctx.fillStyle = "#065f46";
      const msgLines = wrapText(ctx, "\"" + guestMessage + "\"", cw - 200);
      msgLines.forEach(line => { ctx.fillText(line, centerX, ty); ty += 26; });
    }
  }

  /* Bottom garland dots */
  for (let i = 0; i < 8; i++) {
    const dx = 250 + i * 90, dy = H - 175 + Math.sin(i*0.8)*12;
    ctx.beginPath(); ctx.arc(dx, dy, 10, 0, Math.PI*2);
    ctx.fillStyle = i%2===0 ? "rgba(252,211,77,.4)" : "rgba(52,211,153,.4)"; ctx.fill();
  }

  /* Footer brand */
  ctx.fillStyle = "#10b981"; ctx.font = "600 16px 'Nunito', sans-serif";
  ctx.fillText("✨ Sinergia Moments ✨", centerX, H - 110);

  return canvas;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

function wrapText(ctx, text, maxW) {
  const words = text.split(" "), lines = []; let line = "";
  words.forEach(w => {
    const test = line + (line ? " " : "") + w;
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
    else line = test;
  });
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

/* ---- DOWNLOAD PDF ---- */
function downloadPdf() {
  const canvas = drawInvitation(confirmedGuest.name, confirmedGuest.count, confirmedGuest.message);
  const imgData = canvas.toDataURL("image/jpeg", 0.95);
  if (!window.jspdf || !window.jspdf.jsPDF) {
    rsvpFeedback.textContent = "Cargando librería PDF, intenta de nuevo en unos segundos.";
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pw = doc.internal.pageSize.getWidth(), ph = doc.internal.pageSize.getHeight();
  doc.addImage(imgData, "JPEG", 0, 0, pw, ph);
  doc.save("invitacion-baby-shower-" + confirmedGuest.name.toLowerCase().replace(/\s+/g, "-") + ".pdf");
}

/* ---- DOWNLOAD JPG ---- */
function downloadJpg() {
  const canvas = drawInvitation(confirmedGuest.name, confirmedGuest.count, confirmedGuest.message);
  const link = document.createElement("a");
  link.download = "invitacion-baby-shower-" + confirmedGuest.name.toLowerCase().replace(/\s+/g, "-") + ".jpg";
  link.href = canvas.toDataURL("image/jpeg", 0.92);
  link.click();
}

/* ---- CONFETTI — Ultra Baby Shower Edition ---- */
const confettiPalette = [
  "#34d399","#6ee7b7","#a7f3d0","#fcd34d","#fef3c7","#ffffff","#10b981","#fbbf24",
  "#059669","#d1fae5","#f0abfc","#c084fc","#86efac","#fda4af","#67e8f9","#fdba74"
];
const confettiShapes = ["is-circle","is-rect","is-star","is-heart","is-ribbon"];

function createConfettiPiece() {
  if (!confettiLayer) return;
  const piece = document.createElement("span");
  const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
  piece.className = "confetti-bit " + shape;
  const dur = 1800 + Math.random() * 2500;
  const size = 5 + Math.random() * 10;
  const drift = (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 80);
  const spin = 360 + Math.random() * 720;
  const flipX = Math.random() * 360;
  const color = confettiPalette[Math.floor(Math.random() * confettiPalette.length)];
  const w = shape === "is-ribbon" ? size * 0.4 : size;
  const h = shape === "is-ribbon" ? size * 2.5 : size * (0.8 + Math.random() * 0.5);
  Object.assign(piece.style, {
    left: `${Math.random() * 100}vw`,
    width: `${w}px`,
    height: `${h}px`,
    background: color,
    animationDuration: `${dur}ms`,
    opacity: 0.85 + Math.random() * 0.15
  });
  piece.style.setProperty("--drift", `${drift}px`);
  piece.style.setProperty("--spin", `${spin}deg`);
  piece.style.setProperty("--flipX", `${flipX}deg`);
  confettiLayer.appendChild(piece);
  setTimeout(() => piece.remove(), dur + 200);
}

function triggerConfetti(n = 30) {
  for (let i = 0; i < n; i++) setTimeout(createConfettiPiece, i * 25);
}

/* Periodic confetti bursts to keep the magic alive */
let confettiAutoInterval;
function startAutoConfetti() {
  // Small bursts every 3-5 seconds
  function scheduleBurst() {
    const delay = 3000 + Math.random() * 2000;
    confettiAutoInterval = setTimeout(() => {
      triggerConfetti(8 + Math.floor(Math.random() * 10));
      scheduleBurst();
    }, delay);
  }
  scheduleBurst();
}

/* ---- FLOATING BABY ICONS ---- */
const babyIcons = ["🍼","🧸","👶","⭐","💚","🎀","🧩","🌿","✨","💛","🎈","👣","🫧","🎊"];
const floatingLayer = $("floatingIcons");

function createFloatingIcon() {
  if (!floatingLayer) return;
  const icon = document.createElement("span");
  icon.className = "float-icon";
  icon.textContent = babyIcons[Math.floor(Math.random() * babyIcons.length)];
  const dur = 6000 + Math.random() * 6000;
  const size = 16 + Math.random() * 14;
  Object.assign(icon.style, {
    left: `${5 + Math.random() * 90}vw`,
    fontSize: `${size}px`,
    animationDuration: `${dur}ms`,
    animationDelay: `${Math.random() * 500}ms`
  });
  floatingLayer.appendChild(icon);
  setTimeout(() => icon.remove(), dur + 600);
}

function startFloatingIcons() {
  for (let i = 0; i < 5; i++) setTimeout(createFloatingIcon, i * 800);
  setInterval(createFloatingIcon, 1200);
}

/* ---- SPARKLE PARTICLES ---- */
function createSparkle() {
  if (!particlesLayer) return;
  const s = document.createElement("span");
  s.className = "sparkle";
  const size = 3 + Math.random() * 5, dur = 4000 + Math.random() * 4000;
  Object.assign(s.style, {
    left: `${Math.random()*100}vw`, bottom: "0",
    width: `${size}px`, height: `${size}px`, animationDuration: `${dur}ms`
  });
  particlesLayer.appendChild(s);
  setTimeout(() => s.remove(), dur + 100);
}

function startParticles() {
  setInterval(createSparkle, 800);
}

/* ---- CAROUSEL ---- */
const carouselTrack = $("carouselTrack");
const carouselSlides = document.querySelectorAll(".carousel-slide");
const carouselPrevBtn = $("carouselPrev");
const carouselNextBtn = $("carouselNext");
const carouselDotsEl = $("carouselDots");
let currentSlide = 0;
const totalSlides = carouselSlides.length;

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("button");
  dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
  dot.type = "button";
  dot.setAttribute("aria-label", "Foto " + (i + 1));
  dot.addEventListener("click", () => goToSlide(i));
  carouselDotsEl.appendChild(dot);
}

function goToSlide(index) {
  currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
  carouselTrack.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
  carouselDotsEl.querySelectorAll(".carousel-dot").forEach((d, i) => {
    d.classList.toggle("is-active", i === currentSlide);
  });
  const counter = $("carouselCounter");
  if (counter) counter.textContent = (currentSlide + 1) + " / " + totalSlides;
}

carouselPrevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
carouselNextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));

/* Touch swipe */
let touchStartX = 0;
const carouselEl = document.querySelector(".carousel");
carouselEl.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
carouselEl.addEventListener("touchend", e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) goToSlide(currentSlide + (diff > 0 ? 1 : -1));
});

/* Auto-advance */
let carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
carouselEl.addEventListener("mouseenter", () => clearInterval(carouselTimer));
carouselEl.addEventListener("mouseleave", () => {
  carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

/* ---- REVEAL ON SCROLL ---- */
function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  items.forEach((el, i) => { el.style.animationDelay = `${i * 100}ms`; obs.observe(el); });
}

/* ---- FORM SUBMIT ---- */
rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("guestName").value.trim();
  const count = parseInt($("guestCount").value, 10);
  const msg = $("guestMessage").value.trim();

  if (!name) { rsvpFeedback.textContent = "Por favor, escribe tu nombre para confirmar."; return; }
  if (isNaN(count) || count < 1 || count > 10) {
    rsvpFeedback.textContent = "El número de asistentes debe ser entre 1 y 10."; return;
  }

  confirmedGuest = { name, count, message: msg };
  submitBtn.disabled = true; submitBtn.textContent = "✅ ¡Invitación aceptada!";
  downloadOptions.classList.add("is-visible");
  triggerConfetti(40);
  rsvpFeedback.textContent = "¡Gracias, " + name + "! Descarga tu invitación como recuerdo.";
});

/* ---- EVENT LISTENERS ---- */
$("downloadPdf").addEventListener("click", downloadPdf);
$("downloadJpg").addEventListener("click", downloadJpg);

/* ---- PROTECTION ---- */
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("dragstart", e => { if (e.target.tagName === "IMG") e.preventDefault(); });

/* Blur protection when switching tabs/windows */
window.addEventListener("blur", () => document.body.classList.add("blur-protection"));
window.addEventListener("focus", () => document.body.classList.remove("blur-protection"));
window.addEventListener("click", () => document.body.classList.remove("blur-protection"));
window.addEventListener("keydown", (e) => {
  // Common Screenshot Keys
  if (e.key === "PrintScreen" || e.keyCode === 44) {
    document.body.classList.add("blur-protection");
    navigator.clipboard.writeText(""); // Clear clipboard if possible
    alert("Protección activada: Sinergia Moments protege su contenido.");
    return false;
  }
});

/* ---- INIT ---- */
updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);
initReveal();
requestAnimationFrame(() => setTimeout(() => triggerConfetti(30), 300));
startParticles();
startFloatingIcons();
startAutoConfetti();

/* ---- MÚSICA DE FONDO ---- */
(function () {
  var audio = new Audio("mp3/PISCES.mp3");
  audio.loop   = true;
  audio.volume = 0.5;
  var playing  = false;

  /* Botón flotante */
  var btn = document.createElement("button");
  btn.setAttribute("aria-label", "Música");
  btn.style.cssText =
    "position:fixed;bottom:22px;right:22px;z-index:9999;" +
    "width:46px;height:46px;border-radius:50%;border:none;" +
    "background:rgba(255,255,255,0.88);backdrop-filter:blur(8px);" +
    "-webkit-backdrop-filter:blur(8px);" +
    "box-shadow:0 2px 14px rgba(0,0,0,0.18);font-size:22px;" +
    "cursor:pointer;display:flex;align-items:center;justify-content:center;" +
    "transition:opacity .4s,transform .15s;padding:0;";
  btn.textContent = "🎵";
  document.body.appendChild(btn);

  function setPlaying(state) {
    playing = state;
    btn.textContent = playing ? "🔇" : "🎵";
    btn.title       = playing ? "Silenciar" : "Reproducir música";
  }

  /* Click en el botón: toggle play/pause */
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(function () { setPlaying(true); });
    }
  });

  /* Intento automático al cargar */
  audio.play().then(function () {
    setPlaying(true);
  }).catch(function () {
    /* Bloqueado — esperamos scroll o toque para activar */
    setPlaying(false);

    function unlock() {
      if (playing) return;
      audio.play().then(function () {
        setPlaying(true);
        document.removeEventListener("scroll",     unlock);
        document.removeEventListener("touchstart", unlock);
        document.removeEventListener("touchend",   unlock);
      }).catch(function () { /* Brave muy estricto — solo el botón */ });
    }

    document.addEventListener("scroll",     unlock, { passive: true });
    document.addEventListener("touchstart", unlock, { passive: true });
    document.addEventListener("touchend",   unlock, { passive: true });
  });
})();

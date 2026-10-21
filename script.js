/*
 * Personalise this object first. The letter is intentionally kept here so it
 * is easy to edit without touching the markup.
 */
const CONFIG = {
  name: "Rizka",
  age: 26,
  sender: "Kevin",
  letter: [
    "Selamat ulang tahun ya, Rizka! Hari ini waktunya ngerayain kamu—dengan semua kebaikan, energi cerah, dan kelucuanmu yang bikin hari-hari biasa jadi lebih seru.",
    "Serius deh, kamu itu baik banget. Kamu juga kuat, walaupun kadang mungkin nggak merasa begitu. Aku beruntung bisa jadi temanmu, dan sampai sekarang masih suka senyum kalau ingat obrolan, tawa, dan momen-momen kecil yang pernah kita lewatin bareng.",
    "Di umur yang baru ini, semoga kamu selalu sehat, makin bahagia, dan semua hal yang lagi kamu usahakan pelan-pelan bisa tercapai. Semoga 26 membawa banyak cerita seru, rezeki, kesempatan baru, dan alasan buat bangga sama diri sendiri.",
    "Oh iya, sekarang kamu resmi 26 tahun. Kedengarannya dewasa banget, ya? Tapi santai aja—kamu masih boleh tetap random, makan kue ulang tahun buat sarapan, dan pura-pura tahu harus ngapain dalam hidup.",
    "Pokoknya, makasih ya sudah jadi Rizka yang apa adanya. Semoga tahun ini jadi tahun yang hangat, seru, dan penuh hal-hal baik. Selamat ulang tahun! Aku selalu dukung kamu."
  ]
};

const screens = {
  welcome: document.querySelector("#welcome-screen"),
  age: document.querySelector("#age-screen"),
  letter: document.querySelector("#letter-screen")
};

const openButton = document.querySelector("#open-button");
const backButton = document.querySelector("#back-button");
const envelope = document.querySelector("#envelope");
const ageNumber = document.querySelector("#age-number");
const letterBody = document.querySelector("#letter-body");
const letterClosing = document.querySelector("#letter-closing");
const senderName = document.querySelector("#sender-name");
const canvas = document.querySelector("#confetti-canvas");
const context = canvas.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeScreen = "welcome";
let ageTimer = null;
let typingRun = 0;
let confettiFrame = null;
let particles = [];

document.title = `Buat ${CONFIG.name}, dari ${CONFIG.sender} 💌`;
document.querySelector("#welcome-title").innerHTML = `Hai ${escapeHtml(CONFIG.name)}... <span aria-hidden="true">💌</span>`;
document.querySelector("#age-title").innerHTML = `Selamat datang di <span id="age-label">${CONFIG.age}</span>, ${escapeHtml(CONFIG.name)}! <span aria-hidden="true">🎉</span>`;
senderName.textContent = CONFIG.sender;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

function showScreen(screenName) {
  activeScreen = screenName;

  Object.entries(screens).forEach(([name, screen]) => {
    const isActive = name === screenName;
    screen.classList.toggle("is-active", isActive);
    screen.setAttribute("aria-hidden", String(!isActive));
  });

  const focusTarget = screens[screenName].querySelector("h1, h2");
  if (focusTarget) {
    focusTarget.setAttribute("tabindex", "-1");
    window.setTimeout(() => focusTarget.focus({ preventScroll: true }), reducedMotion.matches ? 0 : 450);
  }
}

function startExperience() {
  if (openButton.disabled || activeScreen !== "welcome") return;

  openButton.disabled = true;
  envelope.classList.add("is-opening");

  window.setTimeout(() => {
    showScreen("age");
    runCountdown();
  }, reducedMotion.matches ? 0 : 680);
}

function runCountdown() {
  window.clearTimeout(ageTimer);
  ageNumber.classList.remove("is-landed");

  if (reducedMotion.matches) {
    ageNumber.textContent = CONFIG.age;
    finishAgeReveal();
    return;
  }

  const duration = 850;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const current = Math.max(1, Math.floor(progress * CONFIG.age));
    ageNumber.textContent = current;

    if (progress < 1) {
      window.requestAnimationFrame(tick);
      return;
    }

    ageNumber.textContent = CONFIG.age;
    ageNumber.classList.add("is-landed");
    launchConfetti(110);
    finishAgeReveal();
  }

  window.requestAnimationFrame(tick);
}

function finishAgeReveal() {
  ageTimer = window.setTimeout(() => {
    showScreen("letter");
    typeLetter();
  }, reducedMotion.matches ? 250 : 2000);
}

async function typeLetter() {
  const currentRun = ++typingRun;
  letterBody.replaceChildren();
  letterClosing.hidden = true;
  letterClosing.classList.remove("is-visible");
  backButton.hidden = true;
  backButton.disabled = true;

  for (const paragraphText of CONFIG.letter) {
    if (currentRun !== typingRun) return;

    const paragraph = document.createElement("p");
    paragraph.className = "letter-paragraph";
    const textNode = document.createTextNode("");
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.setAttribute("aria-hidden", "true");
    paragraph.append(textNode, cursor);
    letterBody.append(paragraph);

    for (const character of paragraphText) {
      if (currentRun !== typingRun) return;
      textNode.nodeValue += character;
      if (!reducedMotion.matches) {
        await wait(18);
      }
    }

    cursor.remove();
    if (!reducedMotion.matches) await wait(220);
  }

  if (currentRun !== typingRun) return;

  letterClosing.hidden = false;
  window.requestAnimationFrame(() => letterClosing.classList.add("is-visible"));
  backButton.hidden = false;
  backButton.disabled = false;
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * pixelRatio);
  canvas.height = Math.floor(window.innerHeight * pixelRatio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function launchConfetti(amount = 90) {
  if (reducedMotion.matches) return;

  const colors = ["#ff6b9d", "#ffd166", "#7ed6c5", "#9d82ff", "#ffffff"];
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight * 0.31;

  for (let index = 0; index < amount; index += 1) {
    particles.push({
      x: originX + (Math.random() - 0.5) * 80,
      y: originY + (Math.random() - 0.5) * 25,
      width: 5 + Math.random() * 7,
      height: 7 + Math.random() * 8,
      color: colors[index % colors.length],
      speedX: (Math.random() - 0.5) * 12,
      speedY: -7 - Math.random() * 9,
      gravity: 0.24 + Math.random() * 0.12,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.25,
      life: 0,
      maxLife: 85 + Math.random() * 45,
      shape: Math.random() > 0.5 ? "rect" : "circle"
    });
  }

  if (!confettiFrame) confettiFrame = window.requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles = particles.filter((particle) => particle.life < particle.maxLife);
  particles.forEach((particle) => {
    particle.life += 1;
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.speedY += particle.gravity;
    particle.rotation += particle.rotationSpeed;

    const opacity = Math.max(0, 1 - particle.life / particle.maxLife);
    context.save();
    context.globalAlpha = opacity;
    context.fillStyle = particle.color;
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);

    if (particle.shape === "circle") {
      context.beginPath();
      context.arc(0, 0, particle.width / 2, 0, Math.PI * 2);
      context.fill();
    } else {
      context.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
    }

    context.restore();
  });

  if (particles.length > 0) {
    confettiFrame = window.requestAnimationFrame(updateConfetti);
  } else {
    confettiFrame = null;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

openButton.addEventListener("click", startExperience);
backButton.addEventListener("click", () => {
  if (backButton.disabled || activeScreen !== "letter") return;

  typingRun += 1;
  backButton.hidden = true;
  backButton.disabled = true;
  letterClosing.hidden = true;
  letterClosing.classList.remove("is-visible");
  envelope.classList.remove("is-opening");
  ageNumber.textContent = "1";
  ageNumber.classList.remove("is-landed");
  openButton.disabled = false;
  showScreen("welcome");
});

window.addEventListener("resize", resizeCanvas);
reducedMotion.addEventListener?.("change", resizeCanvas);
resizeCanvas();

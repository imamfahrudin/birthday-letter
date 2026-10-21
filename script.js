/*
 * Personalise this object first. The letter is intentionally kept here so it
 * is easy to edit without touching the markup.
 */
const CONFIG = {
  name: "Rizka",
  age: 26,
  sender: "Kevin",
  letter: [
    "Selamat ulang tahun ya, Rizka!",
    "Hari ini waktunya ngerayain kamu, dengan semua kebaikan, energi cerah, dan kelucuanmu yang bikin hari-hari biasa jadi lebih seru.",
    "Serius deh, kamu itu baik banget. Kamu juga kuat, walaupun kadang mungkin nggak merasa begitu.",
    "Aku beruntung bisa jadi pacarmu, dan sampai sekarang masih suka senyum kalau ingat obrolan, tawa, dan momen-momen kecil yang pernah kita lewatin bareng.",
    "Di umur yang baru ini, semoga kamu selalu sehat dan makin bahagia.",
    "Semoga semua hal yang lagi kamu usahakan pelan-pelan bisa tercapai.",
    "Semoga 26 membawa banyak cerita seru, rezeki, kesempatan baru, dan alasan buat bangga sama diri sendiri.",
    "Oh iya, sekarang kamu resmi 26 tahun. Kedengarannya dewasa banget, ya?",
    "Tapi santai aja, kamu masih boleh tetap random, rebahan seharian, dan pura-pura tahu harus ngapain dalam hidup.",
    "Pokoknya, makasih ya sudah jadi Rizka yang apa adanya.",
    "Semoga tahun ini jadi tahun yang hangat, seru, dan penuh hal-hal baik.",
    "Selamat ulang tahun! Aku selalu dukung kamu."
  ],
  wishes: [
    ["Semoga hari-harimu selalu punya alasan kecil untuk tersenyum.", "🌷"],
    ["Semoga kamu selalu sehat, kuat, dan punya waktu untuk beristirahat.", "🌿"],
    ["Semoga semua usaha kamu pelan-pelan menemukan jalannya.", "🌟"],
    ["Semoga kamu dikelilingi orang-orang yang tulus menyayangimu.", "💖"],
    ["Semoga kamu selalu berani memilih hal yang membuatmu bahagia.", "🦋"],
    ["Semoga rezeki dan kesempatan baik datang dari arah yang tidak disangka.", "🍀"],
    ["Semoga kamu tidak terlalu keras pada diri sendiri.", "☁️"],
    ["Semoga setiap lelahmu terbayar dengan sesuatu yang indah.", "🌈"],
    ["Semoga kamu selalu punya tempat untuk pulang dan bercerita.", "🏡"],
    ["Semoga mimpi-mimpi kecilmu tidak pernah terasa terlalu kecil.", "🌙"],
    ["Semoga kamu semakin bangga dengan dirimu sendiri.", "👑"],
    ["Semoga tahun ini membawa banyak kejutan yang menyenangkan.", "🎁"],
    ["Semoga kamu menemukan lebih banyak hal yang membuatmu excited.", "✨"],
    ["Semoga kamu selalu dimaafkan oleh dirimu sendiri.", "🤍"],
    ["Semoga tawa kamu tetap jadi suara favorit banyak orang.", "😊"],
    ["Semoga kamu punya keberanian untuk memulai lagi kapan pun perlu.", "🌱"],
    ["Semoga hari-hari sulit terasa lebih ringan karena kamu tidak sendirian.", "🤝"],
    ["Semoga kamu mendapat semua cinta yang kamu berikan kepada orang lain.", "💐"],
    ["Semoga hal-hal sederhana selalu bisa membuatmu merasa cukup.", "🍰"],
    ["Semoga kamu semakin dekat dengan versi dirimu yang kamu impikan.", "🪞"],
    ["Semoga ada banyak cerita baru yang membuatmu tertawa.", "📖"],
    ["Semoga kamu selalu punya alasan untuk percaya pada hari esok.", "🌤️"],
    ["Semoga langkahmu ringan, bahkan ketika jalannya belum jelas.", "👣"],
    ["Semoga kamu selalu tahu: kamu sangat berarti.", "💌"],
    ["Semoga satu tahun ke depan terasa hangat dan penuh warna.", "🎨"],
    ["Semoga kamu bahagia—bukan hanya hari ini, tapi setiap hari setelahnya.", "🎂"]
  ]
};

const screens = {
  welcome: document.querySelector("#welcome-screen"),
  age: document.querySelector("#age-screen"),
  letter: document.querySelector("#letter-screen")
  ,wishes: document.querySelector("#wishes-screen")
};

const openButton = document.querySelector("#open-button");
const continueButton = document.querySelector("#continue-button");
const ageBackButton = document.querySelector("#age-back-button");
const backButton = document.querySelector("#back-button");
const wishesButton = document.querySelector("#wishes-button");
const wishesBackButton = document.querySelector("#wishes-back-button");
const nextWishButton = document.querySelector("#next-wish-button");
const previousWishButton = document.querySelector("#previous-wish-button");
const wishNumber = document.querySelector("#wish-number");
const wishText = document.querySelector("#wish-text");
const wishIcon = document.querySelector("#wish-icon");
const wishesProgressBar = document.querySelector("#wishes-progress-bar");
const wishCard = document.querySelector("#wish-card");
const wishesProgress = document.querySelector(".wishes-progress");
const wishesProgressLabel = document.querySelector("#wishes-progress-label");
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
let currentWish = 0;
let wishSwipeStartX = null;

const wishHighlights = [
  "tersenyum",
  "sehat",
  "beristirahat",
  "usaha kamu",
  "hal baik",
  "tulus menyayangimu",
  "bahagia",
  "rezeki",
  "kesempatan baik",
  "tidak terlalu keras",
  "lelahmu",
  "tidak sendirian",
  "bangga dengan dirimu sendiri",
  "kejutan yang menyenangkan",
  "memaafkan",
  "tawa kamu",
  "berani",
  "cinta",
  "merasa cukup",
  "mimpi",
  "percaya pada hari esok",
  "sangat berarti",
  "bahagia"
];

document.title = `Buat ${CONFIG.name}, dari ${CONFIG.sender} 💌`;
document.querySelector("#welcome-title").innerHTML = `Dear ${escapeHtml(CONFIG.name)}... <span aria-hidden="true">💌</span>`;
document.querySelector("#age-title").innerHTML = `Selamat datang di <span id="age-label">${CONFIG.age}</span>, ${escapeHtml(CONFIG.name)}! <span class="age-title-emoji" aria-hidden="true">🎉</span>`;
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
  continueButton.hidden = true;
  continueButton.disabled = true;
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
    continueButton.hidden = false;
    continueButton.disabled = false;
    ageBackButton.hidden = false;
  }, reducedMotion.matches ? 0 : 700);
}

function continueToLetter() {
  if (continueButton.disabled || continueButton.hidden || activeScreen !== "age") return;

  continueButton.disabled = true;
  showScreen("letter");
  typeLetter();
}

function returnToWelcome() {
  typingRun += 1;
  window.clearTimeout(ageTimer);
  envelope.classList.remove("is-opening");
  ageNumber.textContent = "1";
  ageNumber.classList.remove("is-landed");
  continueButton.hidden = true;
  continueButton.disabled = true;
  ageBackButton.hidden = true;
  openButton.disabled = false;
  showScreen("welcome");
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
        await wait(8);
      }
    }

    const highlightedPhrases = [
      "Selamat ulang tahun",
      "ngerayain kamu",
      "baik banget",
      "kuat",
      "beruntung",
      "sehat",
      "makin bahagia",
      "tercapai",
      "26",
      "random",
      "makasih",
      "penuh hal-hal baik",
      "selalu dukung kamu"
    ];

    if (highlightedPhrases.some((phrase) => paragraphText.includes(phrase))) {
      paragraph.innerHTML = highlightedPhrases.reduce(
        (text, phrase) => text.replace(phrase, `<strong><em>${phrase}</em></strong>`),
        paragraphText
      );
    }

    cursor.remove();
    if (!reducedMotion.matches) await wait(100);
  }

  if (currentRun !== typingRun) return;

  letterClosing.hidden = false;
  window.requestAnimationFrame(() => letterClosing.classList.add("is-visible"));
  backButton.hidden = false;
  backButton.disabled = false;
  wishesButton.hidden = false;
  wishesButton.disabled = false;
}

function showWish(direction = "next") {
  const [text, icon] = CONFIG.wishes[currentWish];
  wishCard.classList.remove("is-entering-next", "is-entering-previous");
  void wishCard.offsetWidth;
  wishCard.classList.add(direction === "previous" ? "is-entering-previous" : "is-entering-next");
  wishNumber.textContent = `${String(currentWish + 1).padStart(2, "0")} / 26`;
  wishText.innerHTML = formatWishText(text);
  wishIcon.textContent = icon;
  const progress = ((currentWish + 1) / CONFIG.wishes.length) * 100;
  wishesProgressBar.style.width = `${progress}%`;
  wishesProgress.value = currentWish + 1;
  wishesProgressLabel.textContent = `${currentWish + 1} / ${CONFIG.wishes.length}`;
  previousWishButton.disabled = currentWish === 0;
  nextWishButton.innerHTML = currentWish === CONFIG.wishes.length - 1
    ? "Ulangi dari awal"
    : "Wish berikutnya";
}

function formatWishText(text) {
  return wishHighlights
    .slice()
    .sort((first, second) => second.length - first.length)
    .reduce((formattedText, phrase) => {
      const safePhrase = escapeHtml(phrase).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return formattedText.replace(
        new RegExp(safePhrase, "gi"),
        (match) => `<strong><em>${match}</em></strong>`
      );
    }, escapeHtml(text));
}

function openWishes() {
  if (wishesButton.disabled) return;
  wishesButton.disabled = true;
  currentWish = 0;
  showWish();
  showScreen("wishes");
}

function nextWish() {
  currentWish = (currentWish + 1) % CONFIG.wishes.length;
  showWish("next");
}

function previousWish() {
  if (currentWish === 0) return;
  currentWish -= 1;
  showWish("previous");
}

function backToLetter() {
  showScreen("letter");
  wishesButton.disabled = false;
}

function returnToAge() {
  typingRun += 1;
  window.clearTimeout(ageTimer);
  ageNumber.textContent = CONFIG.age;
  ageNumber.classList.add("is-landed");
  continueButton.hidden = false;
  continueButton.disabled = false;
  ageBackButton.hidden = false;
  showScreen("age");
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
envelope.addEventListener("click", startExperience);
envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    startExperience();
  }
});
continueButton.addEventListener("click", continueToLetter);
ageBackButton.addEventListener("click", returnToWelcome);
backButton.addEventListener("click", () => {
  if (backButton.disabled || activeScreen !== "letter") return;
  backButton.hidden = true;
  backButton.disabled = true;
  letterClosing.hidden = true;
  letterClosing.classList.remove("is-visible");
  wishesButton.hidden = true;
  returnToAge();
});
wishesButton.addEventListener("click", openWishes);
nextWishButton.addEventListener("click", nextWish);
previousWishButton.addEventListener("click", previousWish);
wishesBackButton.addEventListener("click", backToLetter);

wishCard.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  wishSwipeStartX = event.clientX;
  wishCard.setPointerCapture?.(event.pointerId);
});

wishCard.addEventListener("pointerup", (event) => {
  if (wishSwipeStartX === null) return;

  const distance = event.clientX - wishSwipeStartX;
  wishSwipeStartX = null;

  if (Math.abs(distance) < 55) return;
  if (distance < 0) nextWish();
  else previousWish();
});

wishCard.addEventListener("pointercancel", () => {
  wishSwipeStartX = null;
});

window.addEventListener("resize", resizeCanvas);
reducedMotion.addEventListener?.("change", resizeCanvas);
resizeCanvas();

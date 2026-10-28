
/* ==========================================
   PENGATURAN WEBSITE — UBAH BAGIAN INI
   ========================================== */

const CONFIG = {
  yourName: "Angga",
  herName: "Yana",

  // Format tanggal: TAHUN-BULAN-TANGGAL
  // Contoh: 25 mei 2026
  anniversary: "2026-05-25T00:00:00",

  birthdayMessage: `Terimakasih sudah selalu disisiku, sayangku. ❤️

Sayang, terima kasih sudah bertahan dan tetap bersamaku sampai hari ini. Terima kasih karena sudah menjadi bagian dari hidupku, menjadi alasan di balik senyumku, dan menjadi seseorang yang selalu ingin aku temui di antara banyaknya hal yang melelahkan dunia ini. ❤️‍🩹

Aku tahu, selama kita bersama, aku bukan seseorang yang selalu bisa membuatmu bahagia. Mungkin ada kata-kataku yang menyakitimu, sikapku yang membuatmu kecewa, atau hal-hal kecil yang tanpa kusadari membuatmu merasa sedih. Aku memang tidak sempurna, tetapi percayalah, perasaanku kepadamu selalu nyata.

Terima kasih karena sudah memilih untuk tetap tinggal, meskipun mungkin ada saatnya aku sulit dimengerti. Terima kasih karena sudah memberiku kesempatan untuk dicintai oleh seseorang sepertimu. Aku tidak pernah menganggap kehadiranmu sebagai sesuatu yang biasa, karena bagiku, menemukan seseorang yang bisa membuatku merasa dicintai dan berarti adalah salah satu hal terindah yang pernah terjadi dalam hidupku.

Kalau suatu hari nanti kamu merasa lelah, aku harap kamu ingat bahwa kamu tidak harus selalu kuat saat bersamaku. Kamu boleh bercerita, boleh menangis, boleh mengeluh tentang dunia yang terkadang tidak baik kepadamu. Aku ingin menjadi tempatmu pulang, bukan menjadi alasanmu terluka.

Aku tidak tahu seberapa jauh perjalanan kita nantinya, dan aku tidak bisa menjanjikan bahwa semuanya akan selalu mudah. Namun, selama kita masih saling menginginkan, aku ingin terus belajar memahami kamu, memperbaiki diriku, dan menjaga apa yang sudah kita bangun bersama.

**Terima kasih sudah menjadi bagian dari ceritaku sampai sejauh ini.** Jika suatu saat aku ditanya tentang hal yang paling aku syukuri, aku ingin bisa menjawab bahwa salah satunya adalah kesempatan untuk mengenalmu dan mencintaimu.

Aku tidak meminta kita menjadi pasangan yang sempurna. Aku hanya berharap, sesibuk apa pun dunia kita nanti, kita tidak lupa bagaimana caranya saling menggenggam, saling memaafkan, dan saling memilih kembali.

. ❤️`
};

// Tampilkan nama otomatis.
document.getElementById("introName").textContent =
  `Untuk ${CONFIG.herName}, perempuan favoritku`;

document.getElementById("yourName").textContent = CONFIG.yourName;
document.getElementById("herName").textContent = CONFIG.herName;
document.title = `Happy Birthday, ${CONFIG.herName} ❤️`;

// ==========================================
// BINTANG BERKELAP-KELIP
// ==========================================

const stars = document.querySelector(".stars");

for (let i = 0; i < 90; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration = (2 + Math.random() * 3) + "s";
  stars.appendChild(star);
}

// ==========================================
// HUJAN HATI
// ==========================================

const rain = document.querySelector(".heart-rain");
const symbols = ["♡", "♥", "❤"];

for (let i = 0; i < 22; i++) {
  const heart = document.createElement("span");
  heart.className = "falling-heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 12) + "px";
  heart.style.animationDuration = (9 + Math.random() * 12) + "s";
  heart.style.animationDelay = (-Math.random() * 20) + "s";
  heart.style.setProperty(
    "--drift",
    (Math.random() * 100 - 50) + "px"
  );
  rain.appendChild(heart);
}

// ==========================================
// BUKA HADIAH DAN TRANSISI HALAMAN
// ==========================================

const intro = document.getElementById("intro");
const mainSite = document.getElementById("mainSite");

document.getElementById("openGift").addEventListener("click", () => {
  intro.classList.add("leaving");

  // Pemutaran dipicu langsung dari klik pengguna agar browser mengizinkannya.
  music.play()
    .then(() => {
      musicButton.textContent = "♫ Hentikan Musik";
    })
    .catch(() => {
      musicButton.textContent = "♫ Putar Musik";
    });

  setTimeout(() => {
    intro.hidden = true;
    mainSite.hidden = false;
    mainSite.scrollIntoView({ behavior: "instant" });

    startTyping();
    setupPhotoAnimation();
  }, 650);
});

// ==========================================
// EFEK MENGETIK UCAPAN
// ==========================================

let typingStarted = false;

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;

  const output = document.getElementById("typedMessage");
  const cursor = document.getElementById("cursor");
  let index = 0;

  function type() {
    if (index < CONFIG.birthdayMessage.length) {
      output.textContent += CONFIG.birthdayMessage[index];
      const character = CONFIG.birthdayMessage[index];
      index++;

      const delay = character === "\n" ? 140 : 24;
      setTimeout(type, delay);
    } else {
      cursor.style.display = "none";
    }
  }

  type();
}

// ==========================================
// ANIMASI FOTO SAAT MASUK KE LAYAR
// ==========================================

function setupPhotoAnimation() {
  const photos = document.querySelectorAll(".polaroid");

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  photos.forEach(photo => {
    photo.style.animationPlayState = "paused";
    observer.observe(photo);
  });
}

// ==========================================
// GALERI FOTO DIPERBESAR
// ==========================================

const lightbox = document.getElementById("lightbox");
const largePhoto = document.getElementById("largePhoto");

document.querySelectorAll(".polaroid img").forEach(img => {
  img.addEventListener("click", () => {
    if (!img.complete || img.naturalWidth === 0) {
      alert("Masukkan foto kalian ke folder images terlebih dahulu ❤️");
      return;
    }

    largePhoto.src = img.src;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closePhoto() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("closePhoto").addEventListener("click", closePhoto);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closePhoto();
});

// ==========================================
// TIMER HUBUNGAN REAL-TIME
// ==========================================

function updateCounter() {
  const start = new Date(CONFIG.anniversary);
  const now = new Date();

  const ids = ["days", "hours", "minutes", "seconds"];

  if (Number.isNaN(start.getTime()) || start > now) {
    ids.forEach(id => {
      document.getElementById(id).textContent = "--";
    });
    return;
  }

  let remaining = Math.floor((now - start) / 1000);

  const days = Math.floor(remaining / 86400);
  remaining %= 86400;

  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  document.getElementById("days").textContent =
    days.toLocaleString("id-ID");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

// ==========================================
// SURAT CINTA INTERAKTIF
// ==========================================

const envelope = document.getElementById("envelope");
const loveLetter = document.getElementById("loveLetter");

envelope.addEventListener("click", () => {
  const opening = loveLetter.hidden;

  loveLetter.hidden = !opening;
  envelope.classList.toggle("opened", opening);

  if (opening) {
    setTimeout(() => {
      loveLetter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 150);
  }
});

document.getElementById("closeLetter").addEventListener("click", () => {
  loveLetter.hidden = true;
  envelope.classList.remove("opened");
});

// ==========================================
// TIUP LILIN KUE ULANG TAHUN
// ==========================================

let candleOff = false;

document.getElementById("blowCandle").addEventListener("click", () => {
  const flame = document.getElementById("flame");
  const message = document.getElementById("wishMessage");
  const button = document.getElementById("blowCandle");

  candleOff = !candleOff;
  flame.classList.toggle("out", candleOff);

  if (candleOff) {
    message.textContent =
      `Semoga semua impianmu menjadi nyata, ${CONFIG.herName}. ` +
      "Kamu pantas mendapatkan kebahagiaan terbaik. ❤️";

    button.textContent = "Nyalakan Lagi ✨";
    createHeartBurst();
  } else {
    message.textContent = "";
    button.textContent = "Tiup Lilinnya 🕯️";
  }
});

function createHeartBurst() {
  const cake = document.querySelector(".cake");

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");

    heart.textContent = "♥";
    heart.style.cssText = `
      position: absolute;
      left: ${20 + Math.random() * 180}px;
      top: ${20 + Math.random() * 130}px;
      color: #ed78a7;
      pointer-events: none;
      z-index: 10;
    `;

    cake.appendChild(heart);

    heart.animate([
      {
        transform: "translateY(0) scale(.5)",
        opacity: 0
      },
      {
        transform: `translate(${Math.random() * 100 - 50}px, -100px) scale(1.2)`,
        opacity: 1
      },
      {
        transform: `translate(${Math.random() * 140 - 70}px, -160px) scale(.6)`,
        opacity: 0
      }
    ], {
      duration: 1800,
      easing: "ease-out"
    });

    setTimeout(() => heart.remove(), 1900);
  }
}

// ==========================================
// MUSIK ROMANTIS
// File musik: music/music.mp3
// ==========================================

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "♫ Hentikan Musik";
    } catch (error) {
      alert(
        "Musik belum bisa diputar. Pastikan file MP3 berada di folder " +
        "yang sama dengan index.html dan nama filenya sesuai."
      );
    }
  } else {
    music.pause();
    musicButton.textContent = "♫ Putar Musik";
  }
});

// ==========================================
// HATI MEMBENTUK SIMBOL HATI BESAR
// ==========================================

const heartShape = document.getElementById("heartShape");

for (let t = 0; t < Math.PI * 2; t += 0.22) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  const heart = document.createElement("span");

  heart.className = "shape-heart";
  heart.textContent = "♥";

  heart.style.left = `${50 + x * 1.15}%`;
  heart.style.top = `${38 - y * 1.8}px`;
  heart.style.animationDelay = `${Math.random() * 2}s`;

  heartShape.appendChild(heart);
}

// ==========================================
// KEMBALI KE ATAS
// ==========================================

document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Tombol Escape menutup foto besar.
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePhoto();
});

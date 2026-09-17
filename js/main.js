/* =====================================================
   WEB TẶNG NGƯỜI YÊU 💗
   - Mật khẩu: 1234
   - Nhạc: audio/10a3.mp3
   ===================================================== */

// ================= CẤU HÌNH =================
const PASSWORD = '1234';

const PHOTOS = [
  { src: 'images/1.jpg', caption: 'Bé của anh dễ thương nhất 🥰' },
  { src: 'images/2.jpg', caption: 'Nụ cười làm anh tan chảy 🎈' },
  { src: 'images/3.jpg', caption: 'Cô gái tình nguyện xinh xỉu 💙' },
  { src: 'images/4.jpg', caption: 'Thiên thần áo trắng của anh 🌸' },
];

const LETTER_TEXT =
`Gửi người con gái anh yêu,

Hôm nay anh không có gì to tát để tặng em, chỉ có một trang web nho nhỏ này thôi. Nhưng từng dòng chữ, từng tấm hình ở đây đều là những điều anh muốn nói với em.

Cảm ơn em vì đã xuất hiện, vì đã cười với anh, vì đã kiên nhẫn với một người hay quên như anh. Mỗi ngày có em, anh thấy mình may mắn hơn rất nhiều.

Anh hứa sẽ cố gắng trở thành người khiến em luôn cảm thấy an toàn và được yêu thương. Có gì buồn thì nói với anh nha, anh luôn ở đây.

Mãi yêu em 💗
— Người thương của em —`;

const FLOAT_TEXTS = [
  'I love you 💗', 'Thinking of you 🌙', 'My heart belongs to you 💞',
  'Em là nhất 🥇', 'Nhớ em nhiều 🥺', 'Yêu em mỗi ngày 💕',
  'Bé xinh của anh 🌸', 'Mãi bên em nha 💍',
];

const LOVE_MESSAGES = [
  'Anh yêu em nhiều lắm 💗',
  'Em là điều tuyệt vời nhất của anh 🌟',
  'Cảm ơn em đã đến bên anh 🥰',
  'Nhớ em từng giây từng phút 🌙',
  'Mãi mãi là của nhau nha 💍',
  'Nụ cười của em là cả thế giới của anh ☀️',
  'Có em là đủ rồi 💞',
  'Bé ơi, thương em quá 😘',
];

// ================= TIỆN ÍCH =================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const rand = (min, max) => Math.random() * (max - min) + min;

const music = $('#bg-music');

function showScreen(id) {
  $$('.screen').forEach((s) => s.classList.remove('active'));
  $('#' + id).classList.add('active');
  window.scrollTo(0, 0);
}

// ================= TIM RƠI NỀN =================
function spawnFalling(container, symbols, count = 1) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'falling';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = rand(0, 100) + 'vw';
    el.style.fontSize = rand(14, 30) + 'px';
    el.style.animationDuration = rand(6, 12) + 's';
    el.style.animationDelay = rand(0, 1) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), 14000);
  }
}
setInterval(() => spawnFalling($('#hearts-bg'), ['💗', '💕', '🌸', '💖', '🩷']), 700);

// ================= 1. MÀN HÌNH KHÓA =================
let entered = '';
const dots = $$('#lock-dots span');
const lockError = $('#lock-error');

function renderDots() {
  dots.forEach((d, i) => d.classList.toggle('filled', i < entered.length));
}

function playKeySound() {
  // Âm "pop" nhỏ bằng Web Audio, không cần file ngoài
  try {
    const ctx = playKeySound.ctx || (playKeySound.ctx = new (window.AudioContext || window.webkitAudioContext)());
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) { /* bỏ qua nếu trình duyệt chặn */ }
}

function checkPassword() {
  if (entered.length < 4) return;
  if (entered === PASSWORD) {
    unlock();
  } else {
    $('#lock-dots').classList.add('shake');
    lockError.classList.add('show');
    setTimeout(() => {
      $('#lock-dots').classList.remove('shake');
      entered = '';
      renderDots();
    }, 450);
    setTimeout(() => lockError.classList.remove('show'), 2000);
  }
}

$('#keypad').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const key = btn.dataset.key;
  playKeySound();

  if (key === 'del') {
    entered = entered.slice(0, -1);
  } else if (key === 'ok') {
    checkPassword();
    return;
  } else if (entered.length < 4) {
    entered += key;
  }
  renderDots();
  if (entered.length === 4) setTimeout(checkPassword, 200);
});

// Hỗ trợ gõ bàn phím trên máy tính
document.addEventListener('keydown', (e) => {
  if (!$('#lock-screen').classList.contains('active')) return;
  if (/^[0-9]$/.test(e.key) && entered.length < 4) { entered += e.key; playKeySound(); }
  else if (e.key === 'Backspace') entered = entered.slice(0, -1);
  else if (e.key === 'Enter') { checkPassword(); return; }
  renderDots();
  if (entered.length === 4) setTimeout(checkPassword, 200);
});

function unlock() {
  startMusic();
  showScreen('intro-screen');
  // Bung tim nhiều hơn khi mở khoá
  spawnFalling($('#hearts-bg'), ['💗', '💖', '🌷', '🌸', '💐'], 40);
  setTimeout(() => showScreen('menu-screen'), 3200);
}

// ================= NHẠC =================
const miniMusic = $('#mini-music');
const btnPlay = $('#btn-play');
const vinyl = $('#vinyl');

function startMusic() {
  music.volume = 0.8;
  music.play().catch(() => {});
}

function syncMusicUI() {
  const playing = !music.paused;
  miniMusic.classList.toggle('playing', playing);
  miniMusic.classList.toggle('muted', !playing);
  vinyl.classList.toggle('spinning', playing);
  btnPlay.innerHTML = playing
    ? '<i class="fa-solid fa-pause"></i>'
    : '<i class="fa-solid fa-play"></i>';
}
music.addEventListener('play', syncMusicUI);
music.addEventListener('pause', syncMusicUI);

function togglePlay() {
  music.paused ? startMusic() : music.pause();
}
miniMusic.addEventListener('click', togglePlay);
btnPlay.addEventListener('click', togglePlay);
$('#btn-back10').addEventListener('click', () => (music.currentTime = Math.max(0, music.currentTime - 10)));
$('#btn-fwd10').addEventListener('click', () => (music.currentTime = Math.min(music.duration || 0, music.currentTime + 10)));

const fmt = (s) => {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
};
music.addEventListener('timeupdate', () => {
  const pct = music.duration ? (music.currentTime / music.duration) * 100 : 0;
  $('#progress-fill').style.width = pct + '%';
  $('#cur-time').textContent = fmt(music.currentTime);
  $('#dur-time').textContent = fmt(music.duration);
});
music.addEventListener('loadedmetadata', () => ($('#dur-time').textContent = fmt(music.duration)));
$('#progress').addEventListener('click', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  if (music.duration) music.currentTime = ratio * music.duration;
});

// ================= 3. MENU & BACK =================
$$('.menu-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    showScreen(target);
    if (target === 'gift-screen') startGift();
    else stopGift();
  });
});
$$('.back-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    stopGift();
    showScreen('menu-screen');
  });
});

// ================= 5. GALLERY / LIGHTBOX =================
const lightbox = $('#lightbox');
const lbImg = $('#lb-img');
const lbCaption = $('#lb-caption');
let lbIndex = 0;
let lbTimer = null;

function openLightbox(i) {
  lbIndex = (i + PHOTOS.length) % PHOTOS.length;
  lbImg.src = PHOTOS[lbIndex].src;
  lbCaption.textContent = PHOTOS[lbIndex].caption;
  lightbox.classList.add('open');
  const layer = $('#lightbox-hearts');
  spawnFalling(layer, ['🌸', '💗', '🌷', '💕'], 15);
  clearInterval(lbTimer);
  lbTimer = setInterval(() => spawnFalling(layer, ['🌸', '💗', '🌷', '💕'], 2), 500);
}
function closeLightbox() {
  lightbox.classList.remove('open');
  clearInterval(lbTimer);
  $('#lightbox-hearts').innerHTML = '';
}
$$('#gallery-grid figure').forEach((fig, i) => fig.addEventListener('click', () => openLightbox(i)));
$('#lb-close').addEventListener('click', closeLightbox);
$('#lb-prev').addEventListener('click', () => openLightbox(lbIndex - 1));
$('#lb-next').addEventListener('click', () => openLightbox(lbIndex + 1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// Vuốt trên điện thoại
let touchX = 0;
lightbox.addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), { passive: true });
lightbox.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) openLightbox(lbIndex + (dx < 0 ? 1 : -1));
});

// ================= 6. LETTER (TYPEWRITER) =================
const envelope = $('#envelope');
const letterPaper = $('#letter-paper');
const letterContent = $('#letter-content');
let letterOpened = false;

function typewriter(text, i = 0) {
  if (i > text.length) return;
  letterContent.innerHTML = text.slice(0, i).replace(/\n/g, '<br>') + '<span class="cursor"></span>';
  const ch = text[i - 1];
  const delay = ch === '\n' ? 350 : ch === ',' || ch === '.' ? 180 : 38;
  setTimeout(() => typewriter(text, i + 1), delay);
}

envelope.addEventListener('click', () => {
  if (letterOpened) return;
  letterOpened = true;
  playKeySound();
  envelope.classList.add('opening');
  $('#envelope-hint').textContent = 'Đọc chậm thôi nha 🥹';
  setTimeout(() => {
    envelope.classList.add('hidden');
    letterPaper.classList.add('show');
    typewriter(LETTER_TEXT);
  }, 700);
});

// ================= 7. GIFT: CAROUSEL 3D + TIM BAY =================
// Sắp xếp ảnh thành hình trụ 3D
(function setupCarousel() {
  const items = $$('.carousel-item');
  const n = items.length;
  const radius = 230;
  items.forEach((item, i) => {
    item.style.transform = `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`;
  });
})();

let giftTimer = null;
const floatLayer = $('#float-layer');
const toast = $('#love-toast');
let toastTimer = null;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function spawnFloatHeart() {
  const el = document.createElement('div');
  el.className = 'float-heart';
  const photo = PHOTOS[Math.floor(Math.random() * PHOTOS.length)];
  el.innerHTML = `<i class="fa-solid fa-heart"></i><img src="${photo.src}" alt="">`;
  el.style.left = rand(2, 88) + 'vw';
  el.style.top = '105vh';
  el.style.animationDuration = rand(9, 15) + 's';
  el.addEventListener('click', () => {
    showToast(LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)]);
    spawnFalling($('#hearts-bg'), ['💗', '💖', '💕'], 12);
    playKeySound();
    el.remove();
  });
  floatLayer.appendChild(el);
  setTimeout(() => el.remove(), 16000);
}

function spawnFloatText() {
  const el = document.createElement('span');
  el.className = 'float-text';
  el.textContent = FLOAT_TEXTS[Math.floor(Math.random() * FLOAT_TEXTS.length)];
  el.style.left = rand(5, 75) + 'vw';
  el.style.top = '105vh';
  el.style.animationDuration = rand(10, 16) + 's';
  floatLayer.appendChild(el);
  setTimeout(() => el.remove(), 17000);
}

function startGift() {
  stopGift();
  for (let i = 0; i < 4; i++) setTimeout(spawnFloatHeart, i * 500);
  spawnFloatText();
  giftTimer = setInterval(() => {
    spawnFloatHeart();
    if (Math.random() > 0.5) spawnFloatText();
  }, 1600);
}
function stopGift() {
  clearInterval(giftTimer);
  giftTimer = null;
  floatLayer.innerHTML = '';
}

// Khởi tạo
renderDots();
syncMusicUI();

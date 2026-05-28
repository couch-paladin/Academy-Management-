/* ═══════════════════════════════════════════════
   EduVance Interactive Elements v2
   Fixed: NaN in CSS, page transition conflicts,
   memory leaks, daily tip on wrong pages
═══════════════════════════════════════════════ */

(function() {

const isMobile = window.innerWidth < 768;
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const isAuthPage = ['login.html', 'dashboard.html', 'admin.html'].includes(currentPage);

// ── 1. SCROLL PROGRESS BAR ──
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#c8a96e,#e8c98a);z-index:99999;width:0%;transition:width 0.1s linear;pointer-events:none;box-shadow:0 0 8px rgba(200,169,110,0.5);';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  if (total > 0) progressBar.style.width = ((window.scrollY / total) * 100) + '%';
});

// ── 2. CURSOR TRAIL (desktop only) ──
if (!isMobile) {
  const trail = [];
  const TRAIL_LENGTH = 10;
  
  for (let i = 0; i < TRAIL_LENGTH; i++) {
    const dot = document.createElement('div');
    const size = Math.max(2, 5 - i * 0.4);
    const opacity = Math.max(0.1, 0.7 - i * 0.06);
    dot.style.cssText = `position:fixed;pointer-events:none;border-radius:50%;background:rgba(200,169,110,${opacity});width:${size}px;height:${size}px;transform:translate(-50%,-50%);z-index:99990;left:-100px;top:-100px;`;
    document.body.appendChild(dot);
    trail.push({el: dot, x: -100, y: -100});
  }

  let mouseX = -100, mouseY = -100;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  // Use requestAnimationFrame instead of setInterval — no memory leak
  function animateTrail() {
    trail[0].x += (mouseX - trail[0].x) * 0.3;
    trail[0].y += (mouseY - trail[0].y) * 0.3;
    trail[0].el.style.left = trail[0].x + 'px';
    trail[0].el.style.top = trail[0].y + 'px';
    
    for (let i = 1; i < trail.length; i++) {
      trail[i].x += (trail[i-1].x - trail[i].x) * 0.4;
      trail[i].y += (trail[i-1].y - trail[i].y) * 0.4;
      trail[i].el.style.left = trail[i].x + 'px';
      trail[i].el.style.top = trail[i].y + 'px';
    }
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
}

// ── 3. CLICK RIPPLE ──
document.addEventListener('click', e => {
  if (e.target.closest('a, button, input, select, textarea, label')) return;
  const ripple = document.createElement('div');
  ripple.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:4px;height:4px;border-radius:50%;border:2px solid rgba(200,169,110,0.6);transform:translate(-50%,-50%);pointer-events:none;z-index:9990;`;
  document.body.appendChild(ripple);
  
  let size = 4, opacity = 0.6;
  const grow = setInterval(() => {
    size += 8; opacity -= 0.04;
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.opacity = opacity;
    if (opacity <= 0) { clearInterval(grow); ripple.remove(); }
  }, 16);
});

// ── 4. BACK TO TOP ──
const backTop = document.createElement('button');
backTop.innerHTML = '↑';
backTop.title = 'Back to top';
backTop.style.cssText = 'position:fixed;bottom:7.5rem;right:1.5rem;width:40px;height:40px;border-radius:50%;background:#1a1a2e;color:#c8a96e;border:1.5px solid rgba(200,169,110,0.35);font-size:1rem;font-weight:700;cursor:pointer;z-index:8990;opacity:0;transform:translateY(20px);transition:all 0.3s ease;box-shadow:0 4px 16px rgba(0,0,0,0.25);font-family:sans-serif;';
document.body.appendChild(backTop);
backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
backTop.addEventListener('mouseenter', () => { backTop.style.background = '#c8a96e'; backTop.style.color = '#1a1a2e'; });
backTop.addEventListener('mouseleave', () => { backTop.style.background = '#1a1a2e'; backTop.style.color = '#c8a96e'; });

window.addEventListener('scroll', () => {
  const show = window.scrollY > 400;
  backTop.style.opacity = show ? '1' : '0';
  backTop.style.transform = show ? 'translateY(0)' : 'translateY(20px)';
  backTop.style.pointerEvents = show ? 'all' : 'none';
});

// ── 5. ANIMATED COUNTERS ──
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.animated) return;
    entry.target.dataset.animated = '1';
    const el = entry.target;
    const text = el.textContent;
    const num = parseInt(text.replace(/[^0-9]/g, ''));
    if (!num) return;
    const prefix = text.match(/^[^0-9]*/)?.[0] || '';
    const suffix = text.match(/[^0-9]*$/)?.[0] || '';
    let current = 0;
    const step = num / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      if (current >= num) clearInterval(timer);
    }, 16);
  });
}, {threshold: 0.5});

document.querySelectorAll('.stat-num, .counter, [data-count]').forEach(el => counterObserver.observe(el));

// ── 6. TOAST NOTIFICATIONS ──
window.showToast = function(msg, type, duration) {
  duration = duration || 3000;
  const colors = {info:'#c8a96e', success:'#5dba72', error:'#d4705a'};
  const color = colors[type] || colors.info;
  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(20px);background:#1a1a2e;color:${color};padding:0.75rem 1.5rem;border-radius:999px;font-size:13px;font-weight:600;z-index:99995;border:1px solid ${color}55;box-shadow:0 8px 24px rgba(0,0,0,0.3);opacity:0;transition:all 0.3s ease;white-space:nowrap;max-width:90vw;text-align:center;font-family:'DM Sans',sans-serif;pointer-events:none;`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

// ── 7. COPY TO CLIPBOARD TOAST ──
document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', e => {
    const text = el.href.replace('mailto:','').replace('tel:','');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => showToast('📋 Copied: ' + text, 'success'))
        .catch(() => {});
    }
  });
});

// ── 9. PARALLAX HERO (only on public pages, not auth pages) ──
if (!isAuthPage && !isMobile) {
  const hero = document.querySelector('.page-hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < 600) {
        hero.style.transform = `translateY(${scrolled * 0.25}px)`;
        hero.style.opacity = Math.max(0, 1 - scrolled / 500);
      }
    });
  }
}

// ── 10. TYPEWRITER EFFECT ──
const heroEm = document.querySelector('.page-hero h1 em, .hero-title em');
if (heroEm && !heroEm.dataset.typed) {
  heroEm.dataset.typed = '1';
  const text = heroEm.textContent;
  heroEm.textContent = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.style.cssText = 'border-right:2px solid #c8a96e;animation:blink 0.7s infinite;margin-left:2px;';
  heroEm.appendChild(cursor);
  
  const typeChar = () => {
    if (i < text.length) {
      heroEm.insertBefore(document.createTextNode(text[i++]), cursor);
      setTimeout(typeChar, 70 + Math.random() * 40);
    } else {
      setTimeout(() => cursor.remove(), 1500);
    }
  };
  setTimeout(typeChar, 1000);
}

// ── 11. FLOATING PARTICLES ──
const heroSection = document.querySelector('.page-hero');
if (heroSection && !isMobile) {
  heroSection.style.overflow = 'hidden';
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    const size = 2 + Math.random() * 3;
    const x = Math.random() * 100;
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 80;
    p.style.cssText = 'position:absolute;left:' + x + '%;bottom:-10px;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:rgba(200,169,110,' + (0.1+Math.random()*0.25).toFixed(2) + ');pointer-events:none;z-index:1;';
    
    // Each particle gets its own keyframe
    var ks = document.createElement('style');
    var keyframeName = 'floatUp' + i;
    var driftVal = Math.round(drift);
    ks.textContent = '@keyframes ' + keyframeName + '{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:1}80%{opacity:0.4}100%{transform:translateY(-300px) translateX(' + driftVal + 'px);opacity:0}}';
    document.head.appendChild(ks);
    p.style.animation = keyframeName + ' ' + duration + 's ' + delay + 's infinite ease-in-out';
    heroSection.appendChild(p);
  }
}

// ── 12. DAILY TIP (public pages only, not login/admin) ──
if (!isAuthPage && currentPage !== 'register.html') {
  const tips = [
    '💡 Review notes within 24hrs to retain 80% more information!',
    '🎯 LinkedIn profiles with photos get 21x more profile views.',
    '📚 Teach what you learn — explaining doubles your retention!',
    '⏱ Try Pomodoro: 25min work + 5min break = peak focus.',
    '🧠 Exercise before studying boosts memory retention by 20%!',
    '💼 Research the company 2 days before your interview.',
    '🚀 1 hour of daily focused practice makes you an expert in 3 years.',
    '📝 Cornell notes method: notes, cues, summary = better recall.',
    '🌙 7-9hrs sleep improves learning retention significantly.',
    '🤝 Follow up within 24hrs of meeting someone new professionally.',
    '💻 The best code is code that is easy to read, not just efficient.',
    '🎓 Curiosity is a skill — always ask "why" not just "how".',
    '🌱 Growth mindset: your brain physically grows when you learn!',
    '⚡ Short study sessions beat marathon sessions every time.',
  ];

  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const tip = tips[dayOfYear % tips.length];

  const tipEl = document.createElement('div');
  tipEl.id = 'dailyTip';
  tipEl.style.cssText = 'position:fixed;top:72px;right:-320px;width:280px;background:#1a1a2e;border:1px solid rgba(200,169,110,0.25);border-radius:12px;padding:1rem 1.25rem;z-index:8990;transition:right 0.4s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,0.3);';
  tipEl.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
      <span style="color:#c8a96e;font-size:10px;font-weight:700;letter-spacing:0.12em;font-family:'DM Sans',sans-serif;">✨ DAILY TIP</span>
      <button onclick="document.getElementById('dailyTip').style.right='-320px'" style="background:none;border:none;color:rgba(255,255,255,0.35);cursor:pointer;font-size:0.9rem;padding:0;line-height:1;">✕</button>
    </div>
    <p style="color:rgba(255,255,255,0.75);font-size:12.5px;line-height:1.65;margin:0;font-family:'DM Sans',sans-serif;">${tip}</p>
  `;
  document.body.appendChild(tipEl);
  setTimeout(() => { tipEl.style.right = '1rem'; }, 5000);
  setTimeout(() => { tipEl.style.right = '-320px'; }, 13000);
}

// ── 13. BLINK CURSOR CSS ──
const globalStyle = document.createElement('style');
globalStyle.textContent = `
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
`;
document.head.appendChild(globalStyle);

})();

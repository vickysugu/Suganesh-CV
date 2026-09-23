// 1. Reading DOM properties efficiently with RequestAnimationFrame
const bar = document.getElementById('progressBar');
const mountain = document.querySelector('.hero-mountain');
const clouds = document.querySelectorAll('.cloud');

let ticking = false;

function updateOnScroll() {
  const scrollY = window.scrollY;
  
  // Update Progress Bar
  if (bar) {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollY / Math.max(h, 1) * 100) + '%';
  }

  // Parallax calculations (capped at 800px)
  const y = Math.min(scrollY, 800);

  if (mountain) {
    mountain.style.transform = `translateY(${y * 0.10}px)`;
  }

  clouds.forEach((c, i) => {
    c.style.transform = `translateX(${y * (i ? -0.035 : 0.025)}px)`;
  });

  ticking = false;
}

// Single throttled scroll listener using passive event listener for smoother scrolling
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}, { passive: true });

// 2. Optimized IntersectionObserver for reveal elements (Lazy-Triggering Animations)
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Unobserve after animating once to save main thread memory
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Stagger transition delays
document.querySelectorAll('.pipeline .pipe-step').forEach((el, i) => {
  el.style.transitionDelay = (i * 70) + 'ms';
});

// 4. Dark mode toggle
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeBtn.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
  });
}

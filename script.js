// ── Always start at top on refresh ──
  if('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
 
  // ── Theme toggle ──
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const toggleIcon  = document.getElementById('toggleIcon');
  const toggleLabel = document.getElementById('toggleLabel');
 
  const savedTheme = localStorage.getItem('sk-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateToggleUI(savedTheme);
 
  function updateToggleUI(theme) {
    if(theme === 'dark') {
      toggleIcon.textContent  = '☀️';
      toggleLabel.textContent = 'Light';
    } else {
      toggleIcon.textContent  = '🌙';
      toggleLabel.textContent = 'Dark';
    }
  }
 
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('sk-theme', next);
    updateToggleUI(next);
  });

  // ── CV Download buttons ──
  const cvButtons = [document.getElementById('cvDownloadNav'), document.getElementById('cvDownloadHero')];
  cvButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        console.log("CV Access Triggered");
      });
    }
  });

  // ── Toggle inline content (more/less) ──
  function toggleInline(section) {
    const moreText = document.getElementById("more-" + section);
    const btnText  = document.getElementById("btn-" + section);
    if (moreText.style.display === "none") {
      moreText.style.display = "inline";
      btnText.innerHTML = "less...";
    } else {
      moreText.style.display = "none";
      btnText.innerHTML = "more...";
    }
  }

  // ── Scroll Progress Bar ──
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ── Custom cursor (desktop only) ──
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx=0, my=0, rx=0, ry=0;
  const isTouch = window.matchMedia('(hover:none),(pointer:coarse)').matches;
  if(!isTouch){
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    (function loop(){
      rx += (mx - rx) * .12;
      ry += (my - ry) * .12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.pill,.proj-card,.skill-cat').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }
 
  // ── Hamburger menu ──
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
 
  function openMenu(){ hamburger.classList.add('open'); navLinks.classList.add('open'); navOverlay.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeMenu(){ hamburger.classList.remove('open'); navLinks.classList.remove('open'); navOverlay.classList.remove('open'); document.body.style.overflow=''; }
 
  hamburger.addEventListener('click', () => navLinks.classList.contains('open') ? closeMenu() : openMenu());
  navOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-link-item').forEach(a => a.addEventListener('click', closeMenu));
 
  // ── Scroll reveal (enhanced with stagger) ──
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if(e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // ── Stagger index for skill & project cards ──
  document.querySelectorAll('.skill-cat').forEach((el, i) => el.style.setProperty('--i', i));
  document.querySelectorAll('.proj-card').forEach((el, i) => el.style.setProperty('--i', i));

  // ── Chip hover ripple effect ──
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)';
    });
    chip.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // ── Nav active link highlight on scroll ──
  const sections   = document.querySelectorAll('section[id]');
  const navItems   = document.querySelectorAll('.nav-link-item');

  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navItems.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--teal)';
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── Show More / Less Projects ──
  function toggleMoreProjects() {
    const extras   = document.querySelectorAll('.proj-extra');
    const btn      = document.getElementById('btnShowMore');
    const label    = document.getElementById('showMoreLabel');
    const expanded = btn.classList.contains('expanded');

    if (!expanded) {
      // Show extra cards
      extras.forEach((card, i) => {
        card.style.display = '';
        card.style.animationDelay = (i * 80) + 'ms';
        card.classList.add('showing');
        // Re-trigger reveal
        setTimeout(() => card.classList.add('visible'), i * 80 + 50);
      });
      btn.classList.add('expanded');
      label.textContent = 'Show Less';
    } else {
      // Hide extra cards
      extras.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('showing', 'visible');
      });
      btn.classList.remove('expanded');
      label.textContent = 'View More Projects';
      // Scroll back to projects section top
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Expose globally for onclick
  window.toggleMoreProjects = toggleMoreProjects;

// ══════════════════════════════════════════════════════════════
// ── Make project cards clickable using data-github-url attribute ──
// ══════════════════════════════════════════════════════════════
document.querySelectorAll('.proj-card').forEach(card => {
  const githubUrl = card.getAttribute('data-github-url');
  if (githubUrl) {
    card.addEventListener('click', function(e) {
      // Allow text selection without triggering navigation
      if (window.getSelection().toString().length > 0) return;
      
      window.open(githubUrl, '_blank');
    });
    card.style.cursor = 'pointer';
  }
});

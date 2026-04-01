<script>
   // ── Always start at top on refresh ──
  if('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
 
  // ── Theme toggle ──
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const toggleIcon  = document.getElementById('toggleIcon');
  const toggleLabel = document.getElementById('toggleLabel');
 
  // Load saved preference; default = light
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
  
  const cvButtons = [document.getElementById('cvDownloadNav'), document.getElementById('cvDownloadHero')];

cvButtons.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', (e) => {
      // This allows the link to work normally, but logs a 'download' event if you wanted to track it
      console.log("CV Access Triggered");
    });
  }
});
  
  function toggleInline(section) {
      const moreText = document.getElementById("more-" + section);
      const btnText = document.getElementById("btn-" + section);
  
      if (moreText.style.display === "none") {
          moreText.style.display = "inline";
          btnText.innerHTML = "less...";
      } else {
          moreText.style.display = "none";
          btnText.innerHTML = "more...";
      }
  }

  // ── Custom cursor (desktop only) ──
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  const isTouch = window.matchMedia('(hover:none),(pointer:coarse)').matches;
  if(!isTouch){
    document.addEventListener('mousemove',e=>{
      mx=e.clientX; my=e.clientY;
      cursor.style.left=mx+'px'; cursor.style.top=my+'px';
    });
    (function loop(){
      rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.pill,.proj-card,.skill-cat').forEach(el=>{
      el.addEventListener('mouseenter',()=>{ cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave',()=>{ cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }
 
  // ── Hamburger menu ──
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
 
  function openMenu(){ hamburger.classList.add('open'); navLinks.classList.add('open'); navOverlay.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeMenu(){ hamburger.classList.remove('open'); navLinks.classList.remove('open'); navOverlay.classList.remove('open'); document.body.style.overflow=''; }
 
  hamburger.addEventListener('click', ()=> navLinks.classList.contains('open') ? closeMenu() : openMenu());
  navOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-link-item').forEach(a=> a.addEventListener('click', closeMenu));
 
  // ── Scroll reveal ──
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{ if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'), i*70); });
  },{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
</script>

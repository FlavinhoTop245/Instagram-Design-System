const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('is-open');
  nav?.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('is-open');
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const linkById = new Map(navLinks.map((link) => [link.getAttribute('href')?.slice(1), link]));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.removeAttribute('aria-current'));
      linkById.get(entry.target.id)?.setAttribute('aria-current', 'page');
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const finePointer = window.matchMedia('(pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const cursorGlow = document.querySelector('.cursor-glow');

if (finePointer && !reducedMotion && cursorDot && cursorRing && cursorGlow) {
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ringX = pointerX;
  let ringY = pointerY;
  let glowX = pointerX;
  let glowY = pointerY;

  const renderCursor = () => {
    ringX += (pointerX - ringX) * 0.18;
    ringY += (pointerY - ringY) * 0.18;
    glowX += (pointerX - glowX) * 0.08;
    glowY += (pointerY - glowY) * 0.08;
    cursorDot.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    document.body.style.setProperty('--pointer-x', `${pointerX}px`);
    document.body.style.setProperty('--pointer-y', `${pointerY}px`);
    requestAnimationFrame(renderCursor);
  };

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursorGlow.style.opacity = '1';
  }, { passive: true });

  window.addEventListener('pointerleave', () => { cursorGlow.style.opacity = '0'; });

  const interactiveElements = document.querySelectorAll('a, button, [data-tilt], [data-magnetic]');
  interactiveElements.forEach((element) => {
    element.addEventListener('pointerenter', () => {
      cursorDot.classList.add('is-hovering');
      cursorRing.classList.add('is-hovering');
    });
    element.addEventListener('pointerleave', () => {
      cursorDot.classList.remove('is-hovering');
      cursorRing.classList.remove('is-hovering');
    });
  });

  document.querySelectorAll('[data-magnetic]').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.14;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });

  document.querySelectorAll('[data-tilt]').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
      element.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });

const formatStage = document.querySelector('[data-format-stage]');
const formatPhone = document.querySelector('[data-format-phone]');
const formatCards = document.querySelectorAll('[data-format]');
const formatData = {
  post: { author:'seu olhar', art:'um momento<br />para guardar', caption:'Publicação', sub:'um registro para rever, salvar e compartilhar.', title:'Publicação', copy:'um registro que fica.' },
  stories: { author:'agora', art:'só por<br />24 horas', caption:'Stories', sub:'recortes leves para dividir o que está acontecendo.', title:'Stories', copy:'um recorte que passa.' },
  reels: { author:'descoberta', art:'dê play<br />a uma ideia', caption:'Reels', sub:'vídeos curtos para criar, editar e encontrar referências.', title:'Reels', copy:'uma ideia em movimento.' },
  live: { author:'ao vivo', art:'a conversa<br />começa aqui', caption:'Ao vivo e Direct', sub:'presença em tempo real para estar perto de verdade.', title:'Ao vivo e Direct', copy:'uma conversa que aproxima.' }
};
const setFormat = (key) => {
  const data = formatData[key];
  if (!data || !formatStage) return;
  formatStage.dataset.active = key;
  formatStage.querySelector('[data-format-author]').textContent = data.author;
  formatStage.querySelector('[data-format-art]').innerHTML = data.art;
  formatStage.querySelector('[data-format-caption]').textContent = data.caption;
  formatStage.querySelector('[data-format-subcaption]').textContent = data.sub;
  formatStage.querySelector('[data-format-pop-title]').textContent = data.title;
  formatStage.querySelector('[data-format-pop-copy]').textContent = data.copy;
  formatCards.forEach((card) => {
    const active = card.dataset.format === key;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-selected', String(active));
  });
};
formatCards.forEach((card) => {
  card.addEventListener('click', () => setFormat(card.dataset.format));
  card.addEventListener('mouseenter', () => setFormat(card.dataset.format));
  card.addEventListener('focus', () => setFormat(card.dataset.format));
});

const scrollMascot = document.querySelector('[data-scroll-mascot]');
if (scrollMascot && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 700) {
  const mascotLabel = scrollMascot.querySelector('[data-mascot-label]');
  const mascotCount = scrollMascot.querySelector('[data-mascot-count]');
  const mascotSections = [
    { id: 'inicio', label: 'olhe ao redor', mood: 'look' },
    { id: 'funcoes', label: 'descubra', mood: 'explore' },
    { id: 'formatos', label: 'crie seu ritmo', mood: 'create' },
    { id: 'objetivos', label: 'dê contexto', mood: 'connect' },
    { id: 'comunidade', label: 'encontre os seus', mood: 'community' },
    { id: 'acesso', label: 'agora é com você', mood: 'create' }
  ];
  let mascotTicking = false;
  const updateMascot = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(3));
    let active = mascotSections[0];
    mascotSections.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section && section.getBoundingClientRect().top < window.innerHeight * .48) active = item;
    });
    scrollMascot.dataset.mood = active.mood;
    mascotLabel.textContent = active.label;
    mascotCount.textContent = String(mascotSections.indexOf(active) + 1).padStart(2, '0');
    scrollMascot.classList.toggle('is-near', progress > .04 && progress < .96);
    mascotTicking = false;
  };
  window.addEventListener('scroll', () => { if (!mascotTicking) { requestAnimationFrame(updateMascot); mascotTicking = true; } }, { passive: true });
  window.addEventListener('resize', updateMascot, { passive: true });
  updateMascot();
}


const mascotFinePointer = window.matchMedia('(pointer: fine)').matches;
if (scrollMascot && mascotFinePointer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let lastSide = 'right';
  let dashTimer;
  scrollMascot.dataset.side = lastSide;
  window.addEventListener('pointermove', (event) => {
    const nextSide = event.clientX < window.innerWidth / 2 ? 'left' : 'right';
    if (nextSide === lastSide) return;
    scrollMascot.dataset.side = nextSide;
    scrollMascot.classList.add('is-dashing');
    clearTimeout(dashTimer);
    dashTimer = setTimeout(() => scrollMascot.classList.remove('is-dashing'), 320);
    lastSide = nextSide;
  }, { passive: true });
}

  renderCursor();
}

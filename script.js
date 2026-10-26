document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP = '5511952184814';

  /* ---------- Lista de serviços ---------- */
  const SERVICOS = [
    { icon: 'fa-plug-circle-bolt', nome: 'Restabelecimento de energia e correção de curto-circuito', cat: 'residencial comercial industrial' },
    { icon: 'fa-charging-station', nome: 'Tomadas especiais para carregadores de carros elétricos', cat: 'residencial comercial' },
    { icon: 'fa-car-battery', nome: 'Instalação elétrica para wallbox (carregador veicular)', cat: 'residencial comercial' },
    { icon: 'fa-fan', nome: 'Instalação de ventiladores de teto', cat: 'residencial comercial' },
    { icon: 'fa-plug', nome: 'Tomadas de 10A e 20A, cooktop de indução, fornos e circuitos especiais', cat: 'residencial comercial' },
    { icon: 'fa-clipboard-check', nome: 'Vistoria e inspeção técnica conforme NBR 5410 e NR-10', cat: 'residencial comercial industrial' },
    { icon: 'fa-shield-halved', nome: 'Fiação elétrica com máxima proteção para pessoas e equipamentos', cat: 'residencial comercial' },
    { icon: 'fa-table-cells', nome: 'Manutenção preventiva e corretiva em quadros de disjuntores', cat: 'residencial comercial industrial' },
    { icon: 'fa-helmet-safety', nome: 'Acompanhamento para execução de projetos em obras', cat: 'comercial industrial' },
    { icon: 'fa-bolt-lightning', nome: 'Manutenção preventiva para geradores diesel', cat: 'industrial comercial' },
    { icon: 'fa-snowflake', nome: 'Instalação de circuito para ar condicionado', cat: 'residencial comercial' },
    { icon: 'fa-gears', nome: 'Manutenção de comandos e acionamentos elétricos', cat: 'industrial' },
    { icon: 'fa-lightbulb', nome: 'Iluminação decorativa para áreas gourmet e jardim', cat: 'residencial' },
    { icon: 'fa-earth-americas', nome: 'Instalação e revisão de aterramento', cat: 'residencial comercial' },
    { icon: 'fa-house-chimney-window', nome: 'Automação residencial: Alexa, Google Home, interruptores e tomadas inteligentes', cat: 'residencial' },
    { icon: 'fa-triangle-exclamation', nome: 'Correção de fugas de corrente e choques em carcaças', cat: 'residencial comercial industrial' },
    { icon: 'fa-screwdriver-wrench', nome: 'Troca de quadros de disjuntores antigos por modelos atuais', cat: 'residencial comercial' },
    { icon: 'fa-tree', nome: 'Iluminação para áreas externas, jardim, rampas e garagem', cat: 'residencial comercial' },
    { icon: 'fa-water', nome: 'Projeto e instalação de comandos para bombas e motores', cat: 'industrial comercial' },
    { icon: 'fa-gauge-high', nome: 'Instalação, fechamento e manutenção de motores elétricos', cat: 'industrial' },
    { icon: 'fa-ethernet', nome: 'Passagem de cabos de internet em casas e apartamentos', cat: 'residencial comercial' },
    { icon: 'fa-shower', nome: 'Instalação e manutenção de chuveiros, duchas e torneiras elétricas', cat: 'residencial' },
    { icon: 'fa-lightbulb', nome: 'Instalação de pendentes e trilhos de LED', cat: 'residencial comercial' },
    { icon: 'fa-solar-panel', nome: 'Projeto elétrico e execução para microgeração solar', cat: 'residencial comercial industrial' }
  ];

  const cardsBox = document.getElementById('cards');

  function renderServicos(filter = 'todos') {
    cardsBox.innerHTML = '';
    SERVICOS
      .filter(s => filter === 'todos' || s.cat.split(' ').includes(filter))
      .forEach((s, i) => {
        const el = document.createElement('article');
        el.className = 'card';
        el.style.animationDelay = `${i * 40}ms`;
        el.innerHTML = `<div class="icon"><i class="fa-solid ${s.icon}"></i></div><h3>${s.nome}</h3>`;
        cardsBox.appendChild(el);
      });
  }
  renderServicos();

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderServicos(tab.dataset.filter);
    });
  });

  /* ---------- Ano no rodapé ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Header + botão topo ---------- */
  const header = document.getElementById('header');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    toTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Menu mobile ---------- */
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    menu.classList.remove('open');
  }));

  /* ---------- Link ativo no menu ---------- */
  const links = document.querySelectorAll('.menu a[href^="#"]');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(s => spy.observe(s));

  /* ---------- Animação ao rolar ---------- */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    revealObs.observe(el);
  });

  /* ---------- Slider de avaliações ---------- */
  const slides = document.getElementById('slides');
  const total = slides.children.length;
  const dotsBox = document.getElementById('dots');
  let index = 0, timer;

  for (let i = 0; i < total; i++) {
    const d = document.createElement('span');
    d.className = 'dot';
    d.addEventListener('click', () => { go(i); restart(); });
    dotsBox.appendChild(d);
  }
  const dots = dotsBox.querySelectorAll('.dot');

  function go(i) {
    index = (i + total) % total;
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, n) => d.classList.toggle('active', n === index));
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 5000);
  }
  document.getElementById('next').addEventListener('click', () => { go(index + 1); restart(); });
  document.getElementById('prev').addEventListener('click', () => { go(index - 1); restart(); });

  let startX = 0;
  slides.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  slides.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) { go(diff < 0 ? index + 1 : index - 1); restart(); }
  });
  go(0);
  restart();

  /* ---------- Formulário -> WhatsApp ---------- */
  const form = document.getElementById('form');
  const fields = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    assunto: document.getElementById('assunto'),
    mensagem: document.getElementById('mensagem')
  };
  const msgs = {
    nome: 'Informe seu nome.',
    email: 'Informe um e-mail válido.',
    assunto: 'Selecione um assunto.',
    mensagem: 'Descreva o que você precisa.'
  };

  const validate = key => {
    const el = fields[key];
    let ok = el.value.trim() !== '';
    if (key === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
    const box = el.closest('.field');
    box.classList.toggle('invalid', !ok);
    box.querySelector('.error').textContent = ok ? '' : msgs[key];
    return ok;
  };
  Object.keys(fields).forEach(k => fields[k].addEventListener('blur', () => validate(k)));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const allOk = Object.keys(fields).map(validate).every(Boolean);
    if (!allOk) return;

    const text =
      `Olá! Vim pelo site e gostaria de um orçamento.\n\n` +
      `*Nome:* ${fields.nome.value.trim()}\n` +
      `*E-mail:* ${fields.email.value.trim()}\n` +
      `*Assunto:* ${fields.assunto.value}\n` +
      `*Mensagem:* ${fields.mensagem.value.trim()}`;

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    form.reset();
  });
});
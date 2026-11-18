// N&D Insurance website scripts

// ---- Quote form ----
// To receive quote requests by email, create a free form at https://formspree.io
// and paste its URL below (example: "https://formspree.io/f/abcd1234").
const QUOTE_ENDPOINT = "";

document.querySelectorAll('[data-quote]').forEach(function (card) {
  const steps = card.querySelectorAll('[data-step]');
  const label = card.querySelector('[data-step-label]');
  const bar = card.querySelector('[data-progress]');
  const pickedOut = card.querySelector('[data-picked]');
  const chips = card.querySelectorAll('.chip');
  let step = 1;

  function picked() {
    return Array.prototype.filter.call(chips, function (c) { return c.getAttribute('aria-pressed') === 'true'; })
      .map(function (c) { return c.dataset.opt; });
  }
  function show(n) {
    step = n;
    steps.forEach(function (s) { s.hidden = Number(s.dataset.step) !== n; });
    label.textContent = n === 3 ? 'Done' : 'Step ' + n + ' of 2';
    bar.style.width = n === 1 ? '33%' : n === 2 ? '66%' : '100%';
    const list = picked();
    if (pickedOut) pickedOut.textContent = list.length ? list.join(', ') : 'General coverage';
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });
  card.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === 'next' && step === 1) show(2);
    else if (action === 'send') send();
    else if (action === 'back') show(1);
    else if (action === 'restart') {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.opt === 'Auto' ? 'true' : 'false'); });
      card.querySelectorAll('input').forEach(function (i) { i.value = ''; });
      show(1);
    }
  });
  function send() {
    const form = card.querySelector('form') || card;
    const required = form.querySelectorAll('[data-step="2"] input[required]');
    for (let i = 0; i < required.length; i++) {
      if (!required[i].reportValidity()) return;
    }
    const data = { coverage: picked().join(', ') };
    card.querySelectorAll('input[name]').forEach(function (i) { data[i.name] = i.value; });
    if (QUOTE_ENDPOINT) {
      fetch(QUOTE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .catch(function () {});
    }
    show(3);
  }
  show(1);
});

// ---- Scroll reveal fallback (Safari / Firefox) ----
(function () {
  const supported = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (supported || reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js-reveal');
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();

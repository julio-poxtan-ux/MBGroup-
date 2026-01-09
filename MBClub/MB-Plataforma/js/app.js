/* MB eLearning - Vanilla JS interactions
   Contract: keep selectors stable for QA and future scaling.
*/
(function () {
  'use strict';

  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ----- Utilities -----
  function setActiveCard(card) {
    const group = card?.closest('[data-active-group]');
    if (!group) return;
    qsa('.mb-card.is-active', group).forEach(el => el.classList.remove('is-active'));
    card.classList.add('is-active');
  }

  function navigateIfHref(el) {
    const href = el.getAttribute('data-href');
    if (href) window.location.href = href;
  }

  // ----- Scroll rows -----
  qsa('[data-scroll-row]').forEach((row) => {
    const prevBtn = qs('[data-scroll-prev]', row.parentElement);
    const nextBtn = qs('[data-scroll-next]', row.parentElement);

    const scrollBy = () => Math.max(260, Math.floor(row.clientWidth * 0.9));
    prevBtn?.addEventListener('click', () => row.scrollBy({ left: -scrollBy(), behavior: 'smooth' }));
    nextBtn?.addEventListener('click', () => row.scrollBy({ left: scrollBy(), behavior: 'smooth' }));
  });

  // ----- Card clicks -----
  qsa('[data-card]').forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't hijack native links/buttons
      const isInteractive = (e.target.closest('a, button, input, label, .dropdown-menu'));
      if (isInteractive) return;

      setActiveCard(card);
      navigateIfHref(card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveCard(card);
        navigateIfHref(card);
      }
    });
  });

  // ----- Switches (Profile page) -----
  qsa('[data-switch]').forEach((sw) => {
    sw.addEventListener('click', () => {
      const next = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', String(next));
    });
    sw.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const next = sw.getAttribute('aria-checked') !== 'true';
        sw.setAttribute('aria-checked', String(next));
      }
    });
  });

  // ----- Profile: photo preview -----
  const photoInput = qs('#mbPhotoInput');
  const photoImg = qs('#mbPhotoPreview');
  const photoBtn = qs('[data-photo-pick]');
  if (photoInput && photoBtn) {
    photoBtn.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', () => {
      const file = photoInput.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      if (photoImg) photoImg.src = url;
    });
  }

  // ----- Form validation (Bootstrap) -----
  qsa('.needs-validation').forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // ----- Course page interactions -----
  const lessonEls = qsa('[data-lesson]');
  const progressBar = qs('[data-progress-bar]');
  const progressText = qs('[data-progress-text]');
  const lessonCountText = qs('[data-lesson-count]');
  const prevLessonBtn = qs('[data-prev-lesson]');
  const nextLessonBtn = qs('[data-next-lesson]');

  function setLessonActive(idx) {
    if (!lessonEls.length) return;

    const max = lessonEls.length;
    const clamped = Math.min(Math.max(idx, 0), max - 1);

    lessonEls.forEach((el, i) => el.classList.toggle('is-active', i === clamped));
    const pct = Math.round(((clamped + 1) / max) * 100);

    if (progressBar) progressBar.style.width = pct + '%';
    if (progressText) progressText.textContent = pct + '% Completado';
    if (lessonCountText) lessonCountText.textContent = `${clamped + 1} de ${max} lecciones`;

    prevLessonBtn?.toggleAttribute('disabled', clamped === 0);
    nextLessonBtn?.toggleAttribute('disabled', clamped === max - 1);

    // Update the top "Tema" pill text if present
    const currentLessonTitle = lessonEls[clamped]?.getAttribute('data-lesson-title');
    const currentLessonTime = lessonEls[clamped]?.getAttribute('data-lesson-time');
    const heroTitle = qs('[data-course-hero-title]');
    const heroMeta = qs('[data-course-hero-meta]');
    if (heroTitle && currentLessonTitle) heroTitle.textContent = currentLessonTitle;
    if (heroMeta && currentLessonTime) heroMeta.textContent = currentLessonTime;
  }

  if (lessonEls.length) {
    let activeIdx = Math.max(0, lessonEls.findIndex(el => el.classList.contains('is-active')));
    if (activeIdx === -1) activeIdx = 0;

    setLessonActive(activeIdx);

    lessonEls.forEach((el, i) => {
      el.addEventListener('click', () => {
        activeIdx = i;
        setLessonActive(activeIdx);
      });
    });

    prevLessonBtn?.addEventListener('click', () => {
      activeIdx = Math.max(0, activeIdx - 1);
      setLessonActive(activeIdx);
    });

    nextLessonBtn?.addEventListener('click', () => {
      activeIdx = Math.min(lessonEls.length - 1, activeIdx + 1);
      setLessonActive(activeIdx);
    });
  }

})();

// Bootstrap validation + password toggle
(() => {
  'use strict';

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Password toggle
  const btn = document.querySelector('[data-toggle-password]');
  const input = document.getElementById('password');
  if (btn && input) {
    btn.addEventListener('click', () => {
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';

      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-eye', !isPwd);
        icon.classList.toggle('bi-eye-slash', isPwd);
      }
    });
  }
  // Plan card selection (single select)
  const planCards = document.querySelectorAll('.mk-plan-card');
  if (planCards.length) {
    const selectedLabel = 'Seleccionada';
    const defaultLabel = 'Seleccionar';
    const selectedIcon = '<i class="bi bi-check-lg" aria-hidden="true"></i>';

    const setSelected = selectedCard => {
      planCards.forEach(card => {
        const btn = card.querySelector('.mk-plan-card__btn');
        const isSelected = card === selectedCard;
        card.classList.toggle('is-selected', isSelected);
        if (btn) {
          btn.innerHTML = isSelected ? `${selectedIcon} ${selectedLabel}` : defaultLabel;
          btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        }
      });
    };

    planCards.forEach(card => {
      const btn = card.querySelector('.mk-plan-card__btn');
      if (!btn) return;
      btn.addEventListener('click', () => setSelected(card));
    });

    const initialSelected = Array.from(planCards).find(card => card.classList.contains('is-selected')) || planCards[0];
    if (initialSelected) setSelected(initialSelected);
  }

})();

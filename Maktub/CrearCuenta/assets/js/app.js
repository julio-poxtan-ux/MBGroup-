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
  const toggleButtons = document.querySelectorAll('[data-toggle-password]');
  if (toggleButtons.length) {
    toggleButtons.forEach(button => {
      const wrapper = button.closest('.mk-input--password');
      const input = wrapper ? wrapper.querySelector('input') : null;
      if (!input) return;

      button.addEventListener('click', () => {
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';

        const icon = button.querySelector('i');
        if (icon) {
          icon.classList.toggle('bi-eye', !isPwd);
          icon.classList.toggle('bi-eye-slash', isPwd);
        }
      });
    });
  }

  // Password confirmation match
  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('password-confirm');
  if (password && passwordConfirm) {
    const form = passwordConfirm.closest('form');
    const continueBtn = document.getElementById('btn-continuar');

    const validateMatch = () => {
      if (passwordConfirm.value && password.value !== passwordConfirm.value) {
        passwordConfirm.setCustomValidity('Las contraseñas no coinciden.');
      } else {
        passwordConfirm.setCustomValidity('');
      }
    };

    password.addEventListener('input', validateMatch);
    passwordConfirm.addEventListener('input', validateMatch);

    if (continueBtn && form) {
      continueBtn.addEventListener('click', event => {
        validateMatch();
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      });
    }
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


  // Payment token copy
  const copyButtons = document.querySelectorAll('.mk-pay__copy');
  if (copyButtons.length) {
    copyButtons.forEach(button => {
      let timeoutId;

      const showMessage = () => {
        const tooltip = button.querySelector('.mk-pay__tooltip');
        if (!tooltip) return;
        tooltip.classList.add('is-visible');
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          tooltip.classList.remove('is-visible');
        }, 2000);
      };

      button.addEventListener('click', async () => {
        const targetSelector = button.getAttribute('data-copy-target');
        const target = targetSelector ? document.querySelector(targetSelector) : null;
        if (!target) return;
        const value = target.value || target.textContent || '';
        if (!value) return;

        const fallbackCopy = () => {
          target.focus();
          target.select();
          try {
            document.execCommand('copy');
          } catch (err) {
            return;
          }
          target.setSelectionRange(0, 0);
        };

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(value);
          } else {
            fallbackCopy();
          }
        } catch (err) {
          fallbackCopy();
        }

        showMessage();
      });
    });
  }

  // Custom modal toggle (opened via data-bs-toggle to avoid Bootstrap modal markup)
  const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
  const modals = document.querySelectorAll('.mk-modal');

  const getModalTarget = trigger => {
    const selector = trigger.getAttribute('data-bs-target') || trigger.getAttribute('href');
    if (!selector || !selector.startsWith('#')) return null;
    return document.querySelector(selector);
  };

  const openModal = modal => {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = modal => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  if (modalTriggers.length) {
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        openModal(getModalTarget(trigger));
      });
    });
  }

  if (modals.length) {
    modals.forEach(modal => {
      modal.addEventListener('click', event => {
        if (event.target === modal) closeModal(modal);
      });

      const closeButtons = modal.querySelectorAll('[data-mk-close]');
      if (closeButtons.length) {
        closeButtons.forEach(button => {
          button.addEventListener('click', event => {
            event.preventDefault();
            closeModal(modal);
          });
        });
      }
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const activeModal = document.querySelector('.mk-modal.is-open');
    if (activeModal) closeModal(activeModal);
  });

})();

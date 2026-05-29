/**
 * American Fintech — Auth page UI enhancements
 * Card animations · Input focus polish
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const card = document.querySelector('.auth-card');
    if (card) {
      card.addEventListener('animationend', function onEnd(e) {
        if (e.animationName === 'auth-card-in') {
          card.style.animation = 'auth-float 8s ease-in-out infinite';
        }
      }, { once: true });
    }

    document.querySelectorAll('.auth-page .apex-input').forEach(function (input) {
      input.addEventListener('focus', function () {
        this.closest('.auth-field')?.classList.add('is-focused');
      });
      input.addEventListener('blur', function () {
        this.closest('.auth-field')?.classList.remove('is-focused');
      });
    });
  });
})();

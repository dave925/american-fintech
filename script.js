/**
 * American Fintech — Landing Page Scripts
 * Navbar scroll · Mobile menu · Scroll reveal · Smooth anchor · Toast
 */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const brandLink = document.getElementById('brandLink');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  /* --------------------------------------------------------------------------
     Sticky navbar on scroll
     -------------------------------------------------------------------------- */
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* --------------------------------------------------------------------------
     Mobile menu toggle
     -------------------------------------------------------------------------- */
  function closeMobileMenu() {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.classList.remove('nav-menu-open');
  }

  function openMobileMenu() {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.classList.add('nav-menu-open');
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  /* --------------------------------------------------------------------------
     Smooth scroll for anchor links
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* --------------------------------------------------------------------------
     Scroll reveal (fade-in on scroll)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  /* --------------------------------------------------------------------------
     Toast notification
     -------------------------------------------------------------------------- */
  let toastTimer;

  function showToast(message, duration = 4000) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  window.showLandingToast = showToast;

  /* --------------------------------------------------------------------------
     Logged-in user: point brand to dashboard
     -------------------------------------------------------------------------- */
  function updateBrandLink() {
    if (!brandLink) return;
    try {
      const user = JSON.parse(localStorage.getItem('apexCurrentUser') || '{}');
      if (user && user.email) {
        brandLink.href = 'home.html';
      }
    } catch (_) {
      /* ignore parse errors */
    }
  }

  updateBrandLink();

  /* --------------------------------------------------------------------------
     Welcome toast on first visit (session)
     -------------------------------------------------------------------------- */
  window.addEventListener('load', () => {
    const welcomed = sessionStorage.getItem('af_landing_welcomed');
    if (!welcomed) {
      sessionStorage.setItem('af_landing_welcomed', '1');
      setTimeout(() => {
        showToast('Welcome to American Fintech — your premium digital banking experience.');
      }, 1200);
    }
  });

  /* --------------------------------------------------------------------------
     Escape key closes mobile menu
     -------------------------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* --------------------------------------------------------------------------
     Resize: close mobile menu on desktop breakpoint
     -------------------------------------------------------------------------- */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
})();

(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const placeholderMap = {
    garage: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#10131a"/>
            <stop offset="100%" stop-color="#242833"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="900" fill="url(#g)"/>
        <rect x="80" y="80" width="1040" height="740" rx="40" fill="#151821" stroke="#3a404f" stroke-width="3"/>
        <path d="M180 560h840l-70-180H250z" fill="#0d0f14" opacity="0.85"/>
        <circle cx="380" cy="610" r="68" fill="#1f2430"/>
        <circle cx="820" cy="610" r="68" fill="#1f2430"/>
        <text x="600" y="420" fill="#f5f7fb" font-size="54" text-anchor="middle" font-family="Arial, sans-serif">Fast Detailing</text>
        <text x="600" y="485" fill="#c6ccd9" font-size="28" text-anchor="middle" font-family="Arial, sans-serif">Image temporaire</text>
      </svg>
    `),
    interieur: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#14151d"/><text x="600" y="440" fill="#f5f7fb" font-size="52" text-anchor="middle" font-family="Arial, sans-serif">Intérieur</text><text x="600" y="500" fill="#aab0bd" font-size="28" text-anchor="middle" font-family="Arial, sans-serif">Photo temporaire</text></svg>`),
    phares: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#11131a"/><text x="600" y="440" fill="#f5f7fb" font-size="52" text-anchor="middle" font-family="Arial, sans-serif">Phares</text><text x="600" y="500" fill="#aab0bd" font-size="28" text-anchor="middle" font-family="Arial, sans-serif">Photo temporaire</text></svg>`),
    exterieur: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#10131a"/><text x="600" y="440" fill="#f5f7fb" font-size="52" text-anchor="middle" font-family="Arial, sans-serif">Extérieur</text><text x="600" y="500" fill="#aab0bd" font-size="28" text-anchor="middle" font-family="Arial, sans-serif">Photo temporaire</text></svg>`),
    sieges: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#13161d"/><text x="600" y="440" fill="#f5f7fb" font-size="52" text-anchor="middle" font-family="Arial, sans-serif">Sièges</text><text x="600" y="500" fill="#aab0bd" font-size="28" text-anchor="middle" font-family="Arial, sans-serif">Photo temporaire</text></svg>`),
    moto: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#11131a"/><text x="600" y="440" fill="#f5f7fb" font-size="52" text-anchor="middle" font-family="Arial, sans-serif">Moto</text><text x="600" y="500" fill="#aab0bd" font-size="28" text-anchor="middle" font-family="Arial, sans-serif">Photo temporaire</text></svg>`)
  };

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  document.querySelectorAll('img:not([decoding])').forEach((img) => {
    img.decoding = 'async';
  });

  document.querySelectorAll('img:not([loading])').forEach((img) => {
    if (!img.closest('.hero') && !img.closest('.brand')) {
      img.loading = 'lazy';
    }
  });

  if (menuToggle && nav) {
    const syncNavAria = () => {
      const isMobile = window.innerWidth <= 1080;
      const isOpen = nav.classList.contains('is-open');
      nav.setAttribute('aria-hidden', isMobile ? String(!isOpen) : 'false');
    };

    syncNavAria();

    const closeMenu = () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'Menu';
      document.body.classList.remove('nav-open');
      syncNavAria();
    };

    const setMenuState = (isOpen) => {
      nav.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? 'Fermer' : 'Menu';
      document.body.classList.toggle('nav-open', isOpen);
      syncNavAria();
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = !nav.classList.contains('is-open');
      setMenuState(isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('is-open')) {
        return;
      }

      if (nav.contains(event.target) || menuToggle.contains(event.target)) {
        return;
      }

      closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080 && nav.classList.contains('is-open')) {
        closeMenu();
        return;
      }

      syncNavAria();
    });

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const targetPath = href.split('#')[0];
      if (targetPath === currentPath) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    img.addEventListener('error', () => {
      const key = img.dataset.fallback || 'garage';
      img.src = placeholderMap[key] || placeholderMap.garage;
    }, { once: true });
  });

  document.querySelectorAll('[data-before-after]').forEach((card) => {
    const range = card.querySelector('.before-after-range');
    const after = card.querySelector('.media-after');
    const separator = card.querySelector('.before-after-separator');
    const sideBySideMode = document.body.classList.contains('before-after-side-by-side');

    if (!range || !after) {
      return;
    }

    if (sideBySideMode) {
      after.style.clipPath = 'none';
      return;
    }

    const update = () => {
      const value = Number(range.value);
      after.style.clipPath = `inset(0 0 0 ${value}%)`;
      if (separator) {
        separator.style.left = `${value}%`;
      }
    };

    range.addEventListener('input', update);
    update();
  });

  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('#galleryGrid .gallery-card');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = lightbox ? lightbox.querySelector('.lightbox-image') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      galleryItems.forEach((item) => {
        const visible = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-fading-out', !visible);
        item.classList.toggle('is-fading-in', visible);
        window.setTimeout(() => {
          item.classList.toggle('is-hidden', !visible);
          item.classList.remove('is-fading-out');
        }, visible ? 0 : 180);
      });
    });
  });

  if (lightbox && lightboxImage) {
    const openLightbox = (src, alt) => {
      lightboxImage.src = src;
      lightboxImage.alt = alt || 'Photo réalisation';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('nav-open');
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
      document.body.classList.remove('nav-open');
    };

    galleryItems.forEach((item) => {
      const img = item.querySelector('img');
      if (!img) {
        return;
      }

      item.style.cursor = 'zoom-in';
      item.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  const reviewsGrid = document.getElementById('reviews-list');
  if (reviewsGrid) {
    const escapeHtml = (value) => String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const setupReviewToggles = (container) => {
      const toggleButtons = container.querySelectorAll('.review-toggle');
      toggleButtons.forEach((button) => {
        const targetId = button.getAttribute('aria-controls');
        const textWrap = targetId ? document.getElementById(targetId) : null;
        if (!textWrap) {
          return;
        }

        const reviewText = textWrap.querySelector('.review-text');
        if (!reviewText) {
          return;
        }

        const lineHeight = parseFloat(window.getComputedStyle(reviewText).lineHeight) || 24;
        const collapsedMaxHeight = Math.round(lineHeight * 4 + 2);
        const expandedMaxHeight = reviewText.scrollHeight;

        if (expandedMaxHeight <= collapsedMaxHeight + 8) {
          textWrap.style.maxHeight = 'none';
          reviewText.classList.remove('is-collapsed');
          button.remove();
          return;
        }

        textWrap.style.maxHeight = `${collapsedMaxHeight}px`;

        button.addEventListener('click', () => {
          const isExpanded = button.getAttribute('aria-expanded') === 'true';
          const nextExpanded = !isExpanded;
          button.setAttribute('aria-expanded', String(nextExpanded));
          button.textContent = nextExpanded ? 'Voir moins' : 'Voir plus';
          reviewText.classList.toggle('is-collapsed', !nextExpanded);
          textWrap.style.maxHeight = nextExpanded ? `${reviewText.scrollHeight}px` : `${collapsedMaxHeight}px`;
        });
      });
    };

    fetch('data/reviews.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Reviews JSON unavailable');
        }
        return response.json();
      })
      .then((reviews) => {
        if (!Array.isArray(reviews)) {
          return;
        }

        const reviewsMarkup = reviews.map((review, index) => {
          const name = escapeHtml(review.name || 'Client');
          const location = escapeHtml(review.location || 'Gisors');
          const source = escapeHtml(review.source || 'Google');
          const fullText = escapeHtml(review.fullText || review.shortText || '');
          const shortText = escapeHtml(review.shortText || '');
          const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
          const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
          const initial = name.charAt(0).toUpperCase();
          const textId = `review-text-${index + 1}`;

          return `<article class="review-card"><div class="review-head"><span class="review-avatar" aria-hidden="true">${initial}</span><div><strong>${name}</strong><p>${location}</p></div><span class="review-source">${source}</span></div><p class="review-stars" role="img" aria-label="Note ${rating} sur 5">${stars}</p><div class="review-text-wrap" id="${textId}"><p class="review-text is-collapsed">${fullText}</p></div><button type="button" class="review-toggle" aria-expanded="false" aria-controls="${textId}" aria-label="Afficher plus de l'avis de ${name}">Voir plus</button><p class="review-summary" hidden>${shortText}</p></article>`;
        }).join('');

        reviewsGrid.innerHTML = reviewsMarkup;
        setupReviewToggles(reviewsGrid);
      })
      .catch(() => {
        reviewsGrid.innerHTML = '<p class="review-fallback">Les avis seront affichés très prochainement.</p>';
      });
  }

  if (!prefersReducedMotion) {
    const revealItems = document.querySelectorAll('.reveal');
    if (revealItems.length > 0) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16 });

      revealItems.forEach((item) => revealObserver.observe(item));
    }

    const parallaxTarget = document.querySelector('.hero-cinematic .hero-card img');
    if (parallaxTarget && window.innerWidth > 720) {
      window.addEventListener('scroll', () => {
        const offset = Math.min(window.scrollY * 0.08, 30);
        parallaxTarget.style.transform = `scale(1.06) translateY(${offset}px)`;
      }, { passive: true });
    }
  } else {
    document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
  }

  const contactForm = document.getElementById('contactForm');
  const contactPostalCodeInput = document.getElementById('contactPostalCode');

  if (contactPostalCodeInput) {
    const urlParams = new URLSearchParams(window.location.search);
    const cpParam = (urlParams.get('cp') || '').replace(/\D/g, '').slice(0, 5);
    if (cpParam) {
      contactPostalCodeInput.value = cpParam;
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name') || 'Nom non renseigné';
      const phone = formData.get('phone') || 'Téléphone non renseigné';
      const postalCode = formData.get('postalCode') || 'Code postal non renseigné';
      const email = formData.get('email') || 'Email non renseigné';
      const vehicle = formData.get('vehicle') || 'Type de véhicule non renseigné';
      const service = formData.get('service') || 'Prestation à préciser';
      const message = formData.get('message') || 'Message non renseigné';

      const subject = encodeURIComponent(`Demande de devis Fast Detailing - ${service}`);
      const body = encodeURIComponent(`Nom: ${name}\nTéléphone: ${phone}\nCode postal: ${postalCode}\nEmail: ${email}\nType de véhicule: ${vehicle}\nPrestation: ${service}\n\nMessage:\n${message}`);

      window.location.href = `mailto:fastdetailing27140@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
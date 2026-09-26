/**
 * MASTER CARPENTER & WOODCRAFT - INTERACTIVE ENGINE
 * Pure Vanilla JavaScript (Zero External Dependencies)
 * 15+ Years Craftsmanship Business Website
 */

// ==========================================================================
// BUSINESS CONFIGURATION (Easy to customize in 1 minute!)
// ==========================================================================
const BIZ_CONFIG = {
  carpenterName: "Master Carpenter (15+ Years Experience)",
  businessName: "Vishwakarma Woodcrafts & Interiors",
  phoneNumber: "+91 98765 43210",
  rawPhone: "+919876543210",
  whatsappNumber: "919876543210", // International format without '+'
  locationArea: "Serving City & All Surrounding Villages",
  experienceYears: 15
};

// ==========================================================================
// DOM READY INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initStickyHeader();
  initBackToTop();
  initScrollAnimations();
  initBeforeAfterSlider();
  initGalleryFiltersAndLightbox();
  initCostEstimator();
  initVillageChips();
  initContactForms();
  initModals();
});

// ==========================================================================
// 1. THEME TOGGLE (DARK / LIGHT CRAFT THEME)
// ==========================================================================
function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem("carpenter_theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", savedTheme);

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("carpenter_theme", newTheme);
  });
}

// ==========================================================================
// 2. MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileNav() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburgerBtn.classList.toggle("active", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
  });

  // Close when clicking nav links
  navMenu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburgerBtn.classList.remove("active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("open") && 
        !navMenu.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
      navMenu.classList.remove("open");
      hamburgerBtn.classList.remove("active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ==========================================================================
// 3. STICKY HEADER & SCROLL BEHAVIOR
// ==========================================================================
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

// ==========================================================================
// 4. BACK TO TOP BUTTON
// ==========================================================================
function initBackToTop() {
  const topBtn = document.getElementById("backToTopBtn");
  if (!topBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      topBtn.classList.add("visible");
    } else {
      topBtn.classList.remove("visible");
    }
  }, { passive: true });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==========================================================================
// 5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
// ==========================================================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-in-up");
  if (!animatedElements.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add("appear"));
  }
}

// ==========================================================================
// 6. BEFORE & AFTER INTERACTIVE SLIDER
// ==========================================================================
function initBeforeAfterSlider() {
  const container = document.querySelector(".ba-slider-wrapper");
  if (!container) return;

  const overlay = container.querySelector(".ba-overlay");
  const handle = container.querySelector(".ba-handle");
  if (!overlay || !handle) return;

  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let positionX = clientX - rect.left;
    if (positionX < 0) positionX = 0;
    if (positionX > rect.width) positionX = rect.width;

    const percentage = (positionX / rect.width) * 100;
    overlay.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  const onStart = (e) => {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateSlider(clientX);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateSlider(clientX);
  };

  const onEnd = () => {
    isDragging = false;
  };

  handle.addEventListener("mousedown", onStart);
  container.addEventListener("mousedown", onStart);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onEnd);

  handle.addEventListener("touchstart", onStart, { passive: true });
  container.addEventListener("touchstart", onStart, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchend", onEnd);
}

// ==========================================================================
// 7. GALLERY CATEGORY FILTERS & ACCESSIBLE LIGHTBOX
// ==========================================================================
let currentGalleryItems = [];
let activeIndex = 0;

function initGalleryFiltersAndLightbox() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightboxModal");

  // Filtering Logic
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute("data-category");
          if (filter === "all" || itemCategory === filter) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // Lightbox Logic
  if (lightbox && galleryItems.length) {
    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const lightboxTitle = lightbox.querySelector(".lightbox-title");
    const lightboxMeta = lightbox.querySelector(".lightbox-meta");
    const lightboxWaBtn = lightbox.querySelector(".lightbox-wa-btn");
    const closeBtn = lightbox.querySelector(".modal-close-btn");

    currentGalleryItems = Array.from(galleryItems);

    const openLightbox = (index) => {
      activeIndex = index;
      const item = currentGalleryItems[activeIndex];
      const imgSrc = item.getAttribute("data-full-img") || item.querySelector("img").src;
      const title = item.getAttribute("data-title") || "Custom Furniture Project";
      const meta = item.getAttribute("data-meta") || "Handcrafted by Master Carpenter";

      lightboxImg.src = imgSrc;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightboxMeta.textContent = meta;

      // Update WhatsApp link for this specific design
      if (lightboxWaBtn) {
        const text = encodeURIComponent(`Hello Master Carpenter! I saw your work "${title}" on your website. I want similar furniture made for my place. Can you share estimate & details?`);
        lightboxWaBtn.href = `https://wa.me/${BIZ_CONFIG.whatsappNumber}?text=${text}`;
      }

      lightbox.showModal();
    };

    galleryItems.forEach((item, idx) => {
      item.addEventListener("click", () => openLightbox(idx));
      // Keyboard support
      item.setAttribute("tabindex", "0");
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => lightbox.close());
    }

    // Close on backdrop click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.close();
      }
    });

    // Keyboard navigation (Arrow left, Arrow right, Escape)
    document.addEventListener("keydown", (e) => {
      if (!lightbox.open) return;
      if (e.key === "ArrowRight") {
        activeIndex = (activeIndex + 1) % currentGalleryItems.length;
        openLightbox(activeIndex);
      } else if (e.key === "ArrowLeft") {
        activeIndex = (activeIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
        openLightbox(activeIndex);
      }
    });
  }
}

// ==========================================================================
// 8. WOODWORK ESTIMATOR / CALCULATOR
// ==========================================================================
function initCostEstimator() {
  const typeSelect = document.getElementById("calcType");
  const materialSelect = document.getElementById("calcMaterial");
  const sizeRange = document.getElementById("calcSize");
  const sizeDisplay = document.getElementById("calcSizeVal");
  const priceDisplay = document.getElementById("calcPriceDisplay");
  const waBtn = document.getElementById("calcWaBtn");

  if (!typeSelect || !materialSelect || !sizeRange || !priceDisplay) return;

  const baseRates = {
    kitchen: 1400, // per running/sq ft
    wardrobe: 1250,
    bed: 24000,    // base unit rate
    tvunit: 850,
    doors: 11000
  };

  const materialMultipliers = {
    standard: 1.0,
    bwp_ply: 1.25,
    teak_wood: 2.1,
    acrylic_pu: 1.6
  };

  const calculateEstimate = () => {
    const type = typeSelect.value;
    const material = materialSelect.value;
    const size = parseFloat(sizeRange.value);

    if (sizeDisplay) {
      sizeDisplay.textContent = type === "bed" || type === "doors" ? `${size} Units` : `${size} ft`;
    }

    const baseRate = baseRates[type] || 1200;
    const multiplier = materialMultipliers[material] || 1.0;

    let minPrice = 0;
    let maxPrice = 0;

    if (type === "bed" || type === "doors") {
      minPrice = Math.round(baseRate * size * multiplier * 0.9);
      maxPrice = Math.round(baseRate * size * multiplier * 1.15);
    } else {
      minPrice = Math.round(baseRate * size * multiplier * 0.95);
      maxPrice = Math.round(baseRate * size * multiplier * 1.2);
    }

    const formatINR = (val) => "₹" + val.toLocaleString("en-IN");
    priceDisplay.textContent = `${formatINR(minPrice)} - ${formatINR(maxPrice)}`;

    if (waBtn) {
      const typeText = typeSelect.options[typeSelect.selectedIndex].text;
      const materialText = materialSelect.options[materialSelect.selectedIndex].text;
      const sizeText = sizeDisplay ? sizeDisplay.textContent : `${size}`;
      
      const msg = encodeURIComponent(
        `Hello Master Carpenter! I used your online estimator:\n` +
        `• Work: ${typeText}\n` +
        `• Material: ${materialText}\n` +
        `• Size: ${sizeText}\n` +
        `• Estimated Ballpark: ${formatINR(minPrice)} - ${formatINR(maxPrice)}\n\n` +
        `Can you visit my place for exact measurement and finalized quote?`
      );
      waBtn.href = `https://wa.me/${BIZ_CONFIG.whatsappNumber}?text=${msg}`;
    }
  };

  typeSelect.addEventListener("change", calculateEstimate);
  materialSelect.addEventListener("change", calculateEstimate);
  sizeRange.addEventListener("input", calculateEstimate);

  // Initial calculation
  calculateEstimate();
}

// ==========================================================================
// 9. ANIMATED VILLAGE CHIPS
// ==========================================================================
function initVillageChips() {
  const chips = document.querySelectorAll(".village-chip");
  const quoteModal = document.getElementById("quoteModal");
  const villageInput = document.getElementById("quoteVillage");

  if (!chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const villageName = chip.getAttribute("data-village") || chip.textContent.trim();
      
      if (quoteModal) {
        if (villageInput) {
          villageInput.value = villageName;
        }
        quoteModal.showModal();
      } else {
        // Direct WhatsApp redirection if on a page without modal
        const msg = encodeURIComponent(`Hello Master Carpenter, do you take carpentry & furniture work in ${villageName}? I have a requirement.`);
        window.open(`https://wa.me/${BIZ_CONFIG.whatsappNumber}?text=${msg}`, "_blank");
      }
    });
  });
}

// ==========================================================================
// 10. CONTACT & ESTIMATE FORMS (VALIDATION + WHATSAPP GENERATOR)
// ==========================================================================
function initContactForms() {
  const forms = [
    document.getElementById("mainContactForm"),
    document.getElementById("quoteModalForm")
  ];

  forms.forEach(form => {
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      const name = form.querySelector("[name='name']");
      const phone = form.querySelector("[name='phone']");
      const village = form.querySelector("[name='village']");
      const workType = form.querySelector("[name='workType']");
      const message = form.querySelector("[name='message']");

      // Simple validation
      [name, phone, village].forEach(input => {
        if (!input) return;
        if (!input.value.trim()) {
          input.classList.add("error");
          isValid = false;
        } else {
          input.classList.remove("error");
        }
      });

      if (phone && phone.value.trim().length < 8) {
        phone.classList.add("error");
        isValid = false;
      }

      if (!isValid) return;

      // Construct WhatsApp link
      const workVal = workType ? workType.value : "Custom Woodwork";
      const villageVal = village ? village.value.trim() : "Nearby Village";
      const notesVal = message && message.value.trim() ? `\n• Notes: ${message.value.trim()}` : "";

      const waMessage = encodeURIComponent(
        `🔨 *NEW INQUIRY FROM WEBSITE* 🔨\n` +
        `• Name: ${name.value.trim()}\n` +
        `• Phone: ${phone.value.trim()}\n` +
        `• Village / Location: ${villageVal}\n` +
        `• Work Required: ${workVal}${notesVal}\n\n` +
        `Please call me back or send details.`
      );

      // Open WhatsApp
      window.open(`https://wa.me/${BIZ_CONFIG.whatsappNumber}?text=${waMessage}`, "_blank");

      // Visual confirmation in UI
      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>✓ Opening WhatsApp...</span>`;
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          form.reset();
          const modal = form.closest("dialog");
          if (modal) modal.close();
        }, 2500);
      }
    });
  });
}

// ==========================================================================
// 11. GENERAL MODAL OPEN/CLOSE
// ==========================================================================
function initModals() {
  const openModalBtns = document.querySelectorAll("[data-open-modal]");
  
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-open-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        // Check if button passed a default service
        const defaultService = btn.getAttribute("data-service");
        const serviceSelect = modal.querySelector("[name='workType']");
        if (defaultService && serviceSelect) {
          serviceSelect.value = defaultService;
        }
        modal.showModal();
      }
    });
  });

  const closeBtns = document.querySelectorAll("dialog .modal-close-btn");
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest("dialog");
      if (modal) modal.close();
    });
  });

  document.querySelectorAll("dialog").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  });
}

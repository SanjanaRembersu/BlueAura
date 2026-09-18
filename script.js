// ==========================================================================
// RUNWAY SPOTLIGHT & HERO TRACKING
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('runwayHero');
  const overlay = document.getElementById('spotlightOverlay');

  if (hero && overlay) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      overlay.style.setProperty('--mouse-x', `${x}%`);
      overlay.style.setProperty('--mouse-y', `${y}%`);
    });

    hero.addEventListener('mouseleave', () => {
      overlay.style.setProperty('--mouse-x', '50%');
      overlay.style.setProperty('--mouse-y', '50%');
    });
  }

  // Initialize Cart Count on Page Load
  updateCartCount();
});

// ==========================================================================
// AURA SLIDESHOW LOGIC
// ==========================================================================
const auraSlides = document.querySelectorAll('.aura-slide');
const auraNext = document.querySelector('.next');
const auraPrev = document.querySelector('.prev');
const auraDots = document.querySelectorAll('.dot');
let currentAuraSlide = 0;

function showSlide(index) {
  if (!auraSlides.length) return;

  auraSlides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });

  auraDots.forEach((dot, i) => {
    dot.classList.remove('active-dot');
    if (i === index) dot.classList.add('active-dot');
  });

  currentAuraSlide = index;
}

if (auraSlides.length) {
  if (auraNext) {
    auraNext.addEventListener('click', () => {
      currentAuraSlide = (currentAuraSlide + 1) % auraSlides.length;
      showSlide(currentAuraSlide);
    });
  }

  if (auraPrev) {
    auraPrev.addEventListener('click', () => {
      currentAuraSlide = (currentAuraSlide - 1 + auraSlides.length) % auraSlides.length;
      showSlide(currentAuraSlide);
    });
  }

  auraDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index') || '0', 10);
      showSlide(index);
    });
  });

  // Auto-play slideshow
  setInterval(() => {
    currentAuraSlide = (currentAuraSlide + 1) % auraSlides.length;
    showSlide(currentAuraSlide);
  }, 5000);

  showSlide(0);
}

// ==========================================================================
// PRODUCT FILTERING
// ==========================================================================
function filterProducts(category) {
  const cards = document.querySelectorAll('.product-card');
  const buttons = document.querySelectorAll('.filter-buttons button');

  buttons.forEach((btn) => btn.classList.remove('active'));

  const activeBtn = document.querySelector(`.filter-buttons button[onclick*="${category}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  cards.forEach((card) => {
    const match = category === 'all' || card.getAttribute('data-category') === category;
    card.style.display = match ? 'block' : 'none';
  });
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================
function openQuickView(image, title, desc) {
  const qvImage = document.getElementById('quickViewImage');
  const qvTitle = document.getElementById('quickViewTitle');
  const qvDesc = document.getElementById('quickViewDesc');
  const qvModal = document.getElementById('quickView');

  if (qvImage) qvImage.src = image;
  if (qvTitle) qvTitle.innerText = title;
  if (qvDesc) qvDesc.innerText = desc;
  if (qvModal) qvModal.classList.add('show');
}

function closeQuickView() {
  const qvModal = document.getElementById('quickView');
  if (qvModal) qvModal.classList.remove('show');
}

const quickViewModal = document.getElementById('quickView');
if (quickViewModal) {
  quickViewModal.addEventListener('click', (e) => {
    if (e.target.id === 'quickView') {
      closeQuickView();
    }
  });
}

function buyNow() {
  const titleEl = document.getElementById('quickViewTitle');
  const productName = titleEl ? titleEl.innerText : 'Product';
  const whatsappMessage = `Hi BlueAura, I want to buy the "${productName}".`;
  const whatsappURL = `https://wa.me/919561461687?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappURL, '_blank');
}

// ==========================================================================
// CART MANAGEMENT
// ==========================================================================
let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

function addToCart(productName, productImage, productPrice) {
  cartItems.push({
    name: productName,
    image: productImage,
    price: productPrice
  });

  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartCount();
  alert(`🛒 "${productName}" has been added to your cart.`);
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.innerText = cartItems.length;
  }
}

function addToCartWithVariant(name, image, price, sizeId, colorId, qtyId) {
  const sizeEl = document.getElementById(sizeId);
  const colorEl = document.getElementById(colorId);
  const qtyEl = document.getElementById(qtyId);

  const size = sizeEl ? sizeEl.value : 'M';
  const color = colorEl ? colorEl.value : 'Default';
  const quantity = qtyEl ? parseInt(qtyEl.value, 10) : 1;

  const item = {
    name: name,
    image: image,
    price: price,
    size: size,
    color: color,
    quantity: quantity
  };

  cartItems.push(item);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartCount();
  alert(`🛒 ${quantity} × "${name}" (${size}, ${color}) added to cart.`);
}

// Color Swatch Selection
document.querySelectorAll('.color-options').forEach((optionGroup) => {
  optionGroup.querySelectorAll('.color-circle').forEach((circle) => {
    circle.addEventListener('click', () => {
      optionGroup.querySelectorAll('.color-circle').forEach((c) => c.classList.remove('selected'));
      circle.classList.add('selected');
      const color = circle.getAttribute('data-color');
      const hiddenInput = optionGroup.nextElementSibling;
      if (hiddenInput) hiddenInput.value = color;
    });
  });
});

// ==========================================================================
// REVIEW CAROUSEL
// ==========================================================================
const reviewTrack = document.querySelector('.carousel-track');
const reviewSlides = document.querySelectorAll('.carousel-slide');
const reviewNextBtn = document.querySelector('.carousel-btn.next');
const reviewPrevBtn = document.querySelector('.carousel-btn.prev');

let reviewIndex = 0;

function updateReviewCarousel() {
  if (!reviewTrack || !reviewSlides.length) return;
  const slideWidth = reviewSlides[0].offsetWidth;
  reviewTrack.style.transform = `translateX(-${reviewIndex * slideWidth}px)`;
}

if (reviewTrack && reviewSlides.length && reviewNextBtn && reviewPrevBtn) {
  reviewNextBtn.addEventListener('click', () => {
    reviewIndex = (reviewIndex + 1) % reviewSlides.length;
    updateReviewCarousel();
  });

  reviewPrevBtn.addEventListener('click', () => {
    reviewIndex = (reviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
    updateReviewCarousel();
  });

  window.addEventListener('resize', updateReviewCarousel);
  updateReviewCarousel();
}
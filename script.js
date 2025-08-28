const slides = document.querySelectorAll('.aura-slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const dots = document.querySelectorAll('.dot');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });

  dots.forEach((dot, i) => {
    dot.classList.remove('active-dot');
    if (i === index) dot.classList.add('active-dot');
  });

  current = index;
}

next.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

prev.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    showSlide(index);
  });
});

// Auto-play
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);

// Initial display
showSlide(0);

function filterProducts(category) {
  const cards = document.querySelectorAll('.product-card');
  const buttons = document.querySelectorAll('.filter-buttons button');

  // Remove active from all buttons
  buttons.forEach(btn => btn.classList.remove('active'));

  // Add active to clicked button
  document.querySelector(`.filter-buttons button[onclick*="${category}"]`).classList.add('active');

  // Show/hide cards
  cards.forEach(card => {
    const match = category === 'all' || card.getAttribute('data-category') === category;
    if (match) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}



function openQuickView(image, title, desc) {
  document.getElementById('quickViewImage').src = image;
  document.getElementById('quickViewTitle').innerText = title;
  document.getElementById('quickViewDesc').innerText = desc;
  document.getElementById('quickView').classList.add('show');
}


function closeQuickView() {
  document.getElementById('quickView').classList.remove('show');
}

document.getElementById('quickView').addEventListener('click', function (e) {
  if (e.target.id === 'quickView') {
    closeQuickView();
  }
});
document.getElementById('quickView').addEventListener('click', function (e) {
  if (e.target.id === 'quickView') {
    closeQuickView();
  }
});



function buyNow() {
  const productName = document.getElementById('quickViewTitle').innerText;
  const whatsappMessage = `Hi BlueAura, I want to buy the "${productName}".`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const phoneNumber = "919561461687"; // ✅ Your WhatsApp number in international format
  const whatsappURL = `https://wa.me/919561461687?text=Hi%20BlueAura%2C%20I%20want%20to%20buy%20the%20"${productName}"

`;
  window.open(whatsappURL, "_blank");
}

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, productImage, productPrice) {
  cartItems.push({
    name: productName,
    image: productImage,
    price: productPrice
  });

  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCount();
  alert(`🛒 "${productName}" has been added to your cart.`);
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.innerText = cartItems.length;
  }
}

function addToCartWithVariant(name, image, price, sizeId, colorId, qtyId) {
  const size = document.getElementById(sizeId).value;
  const color = document.getElementById(colorId).value;
  const quantity = parseInt(document.getElementById(qtyId).value);

  const item = {
    name: name,
    image: image,
    price: price,
    size: size,
    color: color,
    quantity: quantity
  };

  cartItems.push(item);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCount();
  alert(`🛒 ${quantity} × "${name}" (${size}, ${color}) added to cart.`);
}



document.querySelectorAll('.color-options').forEach(optionGroup => {
  optionGroup.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      optionGroup.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
      circle.classList.add('selected');
      const color = circle.getAttribute('data-color');
      const hiddenInput = optionGroup.nextElementSibling;
      hiddenInput.value = color;
    });
  });
});


// Review Carousel Script
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

function updateCarousel() {
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

if (track && slides.length && nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}












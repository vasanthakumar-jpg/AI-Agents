const carousel = document.getElementById("carousel");
const dots = document.getElementById("dots").children;
const slides = carousel.children;
const totalSlides = slides.length - 2; // Excluding cloned slides
let currentIndex = 1; // Start at the first real slide
let isTransitioning = false;

// Update active dot
function updateDots(index) {
  Array.from(dots).forEach((dot, i) => {
    dot.classList.toggle("bg-blue-500", i === index - 1);
    dot.classList.toggle("bg-gray-300", i !== index - 1);
  });
}

// Navigate to the next slide
function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex++;
  updateCarouselPosition();

  // Handle infinite scroll reset
  if (currentIndex > totalSlides) {
    setTimeout(() => {
      currentIndex = 1;
      resetWithoutTransition();
    }, 300);
  }
}

// Navigate to the previous slide
function prevSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex--;
  updateCarouselPosition();

  // Handle infinite scroll reset
  if (currentIndex < 1) {
    setTimeout(() => {
      currentIndex = totalSlides;
      resetWithoutTransition();
    }, 300);
  }
}

// Go to a specific slide
function goToSlide(index) {
  currentIndex = index;
  updateCarouselPosition();
}

// Update carousel position
function updateCarouselPosition() {
  const slideWidth = carousel.firstElementChild.offsetWidth;
  carousel.style.transition = "transform 0.3s ease";
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  updateDots(currentIndex > totalSlides ? 1 : currentIndex < 1 ? totalSlides : currentIndex);
}

// Reset position without transition (for infinite scrolling)
function resetWithoutTransition() {
  const slideWidth = carousel.firstElementChild.offsetWidth;
  carousel.style.transition = "none";
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  updateDots(currentIndex);
  isTransitioning = false;
}

// Initialize carousel on page load
function initializeCarousel() {
  const slideWidth = carousel.firstElementChild.offsetWidth;
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  updateDots(currentIndex);
}

// Handle resize event
window.addEventListener("resize", initializeCarousel);

// Initialize on page load
initializeCarousel();

// Reset transitioning flag after animation
carousel.addEventListener("transitionend", () => {
  isTransitioning = false;
});
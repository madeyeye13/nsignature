////HEADER

const header = document.querySelector('header');
        const menuIcon = document.querySelector('.menu-icon');
        const menuIconI = document.querySelector('.menu-icon i');

        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            header.classList.toggle('expanded');
            
            // Toggle between menu and close icon
            if (menuIconI.classList.contains('ti-menu')) {
                menuIconI.classList.remove('ti-menu');
                menuIconI.classList.add('ti-close');
            } else {
                menuIconI.classList.remove('ti-close');
                menuIconI.classList.add('ti-menu');
            }
});


//HERO VIDEO

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    
    video.play();

    video.addEventListener('timeupdate', function() {
        if (video.currentTime >= 52) {
            video.currentTime = 0;
            video.play();
        }
    });
});



////////////TESTIMONIAL


let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
let autoplayInterval;
let isTransitioning = false;

function showTestimonial(index) {
  if (isTransitioning) return;
  isTransitioning = true;

  testimonials.forEach(t => {
    t.classList.remove('active');
  });
  
  currentTestimonial = index;
  if (currentTestimonial >= testimonials.length) currentTestimonial = 0;
  if (currentTestimonial < 0) currentTestimonial = testimonials.length - 1;
  
  testimonials[currentTestimonial].classList.add('active');

  // Allow next transition after current one completes
  setTimeout(() => {
    isTransitioning = false;
  }, 500);
}

function nextTestimonial() {
  if (!isTransitioning) {
    showTestimonial(currentTestimonial + 1);
    resetAutoplay();
  }
}

function prevTestimonial() {
  if (!isTransitioning) {
    showTestimonial(currentTestimonial - 1);
    resetAutoplay();
  }
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

function startAutoplay() {
  autoplayInterval = setInterval(nextTestimonial, 7000);
}

// Start autoplay when the page loads
startAutoplay();


////REVEAL ANIMATIONS

const observerOptions = {
    threshold: 0.25
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.classList.contains('count-number')) {
          startCounting(entry.target);
        }
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.querySelectorAll('.count-number').forEach(el => observer.observe(el));
  
  // Counting animation
  function startCounting(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepDuration = duration / steps;
    let current = 0;
  
    const increment = target / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + (element.parentElement.querySelector('.count-label').textContent.includes('SATISFACTION') ? '%' : '+');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (element.parentElement.querySelector('.count-label').textContent.includes('SATISFACTION') ? '%' : '+');
      }
    }, stepDuration);
  }
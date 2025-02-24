




///////SCROLL TO THE TOP

const scrollTop = document.querySelector('.scroll-top');
        const progressCircle = document.querySelector('.scroll-progress circle');
        const circumference = progressCircle.getTotalLength();

        // Show/hide scroll button and update progress
        window.addEventListener('scroll', () => {
            const scrollPercent = (document.documentElement.scrollTop || document.body.scrollTop) / 
                ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight);
            
            const scrolled = Math.min(Math.max(scrollPercent, 0), 1);
            const offset = circumference - (scrolled * circumference);
            
            progressCircle.style.strokeDashoffset = offset;

            if (scrolled > 0.1) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        // Smooth scroll to top when clicked
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        
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


////////////ACTIVE LINK

document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop(); // Get the current page name
  const navLinks = document.querySelectorAll(".nav-menu ul li a");

  navLinks.forEach(link => {
      const linkPath = link.getAttribute("href").split("/").pop(); // Get the link's target page name
      if (linkPath === currentPath) {
          link.classList.add("active");
      } else {
          link.classList.remove("active");
      }
  });
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


  //FREQUENTLY ASKED QUESTIONS


  document.querySelectorAll(".faq-question").forEach(item => {
    item.addEventListener("click", function() {
        let answer = this.nextElementSibling;
        let icon = this.querySelector(".toggle-icon");
        
        if (answer.style.display === "block") {
            answer.style.display = "none";
            icon.textContent = "+";
        } else {
            document.querySelectorAll(".faq-answer").forEach(ans => ans.style.display = "none");
            document.querySelectorAll(".toggle-icon").forEach(ic => ic.textContent = "+");
            
            answer.style.display = "block";
            icon.textContent = "-";
        }
    });
});



/////BOOKING

document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const spinner = form.querySelector('.spinner-dots');
  const modal = document.getElementById('successModal');
  const messageText = modal.querySelector('.message-text');

  // Show loading animation
  spinner.classList.add('active');
  submitBtn.disabled = true;

  try {
      const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
          // Get the name from the form
          const name = form.querySelector('input[name="groom_name"]').value || 
                       form.querySelector('input[name="bride_name"]').value || 
                       'Guest';

          // Show modal
          messageText.innerHTML = `Thanks ${name}, we received your form and will get back to you soon!<br><br>If this is urgent, reach us on WhatsApp.`;

          modal.style.display = 'flex';

          // Reset form
          form.reset();
      } else {
          throw new Error('Form submission failed');
      }
  } catch (error) {
      alert('There was a problem submitting your form. Please try again.');
  } finally {
      // Hide loading animation
      spinner.classList.remove('active');
      submitBtn.disabled = false;
  }
});

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('successModal').style.display = 'none';
});



//////////////BOOKING PAGE CONTACT SCROLL REVEAL


function revealOnScroll() {
  const contact = document.getElementById("contact");
  const scrollY = window.scrollY;
  const sectionTop = contact.offsetTop - window.innerHeight + 100;

  if (scrollY > sectionTop) {
      contact.classList.add("show");
  }
}

window.addEventListener("scroll", revealOnScroll);


////////////GALLERY PAGE REVEAL ON SCROLL

document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll("[data-reveal]");
  
  function revealOnScroll() {
      revealElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.9) {
              el.classList.add("animate-fade-in");
          }
      });
  }
  
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});


//////LIGHTBOX

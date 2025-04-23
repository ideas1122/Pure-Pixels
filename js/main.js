document.addEventListener('DOMContentLoaded', function() {
    /**
     * Mobile nav toggle
     */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('#navbar');
    
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function(e) {
        e.preventDefault();
        navbar.classList.toggle('navbar-mobile');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    }
  
    /**
     * Scrolled header
     */
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        document.querySelector('.navbar').classList.add('scrolled');
      } else {
        document.querySelector('.navbar').classList.remove('scrolled');
      }
    });
  
    /**
     * Smooth scroll for navigation links
     */
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
          e.preventDefault();
          return;
        }
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navbar.classList.contains('navbar-mobile')) {
            navbar.classList.remove('navbar-mobile');
            mobileNavToggle.classList.toggle('bi-list');
            mobileNavToggle.classList.toggle('bi-x');
          }
        }
      });
    });
  
    /**
     * Clients carousel (using Owl Carousel)
     */
    if (document.querySelector('.clients-carousel')) {
      $('.clients-carousel').owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        responsive: {
          0: { items: 2 },
          576: { items: 3 },
          768: { items: 4 },
          992: { items: 6 }
        }
      });
    }
  
    /**
     * Portfolio isotope and filter
     */
    if (document.querySelector('.portfolio-container')) {
      const portfolioIsotope = new Isotope('.portfolio-container', {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });
  
      document.querySelectorAll('.portfolio-filters li').forEach(function(filterItem) {
        filterItem.addEventListener('click', function() {
          document.querySelector('.portfolio-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        });
      });
    }
  
    /**
     * Portfolio lightbox (using GLightbox)
     */
    if (document.querySelectorAll('.portfolio-lightbox')) {
      GLightbox({
        selector: '.portfolio-lightbox'
      });
    }
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    });
  
    // Contact form handling
document.querySelector('.contact-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  try {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      alert('Thank you! Your message has been sent successfully.');
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    alert('There was a problem sending your message. Please try again later.');
    console.error('Error:', error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
});
  // Add this to your existing JavaScript file
if (document.querySelector('.work-process')) {
    // Animate steps on scroll
    const steps = document.querySelectorAll('.work-process .step');
    
    steps.forEach((step, index) => {
      step.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // This works with AOS (Animate On Scroll) library
    // Make sure you've included AOS as shown in previous instructions
  }

  
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      // Update thumb position on mouse move
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;

          // Ensure the scrollbar thumb stays within bounds
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }

      // Remove event listeners on mouse up
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }

      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });

   // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);


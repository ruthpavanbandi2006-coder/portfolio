// Portfolio Scripts for B. Ruth Pavan

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Functionality ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    document.body.classList.add('light-theme');
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    document.body.classList.remove('light-theme');
    themeIcon.className = 'fa-solid fa-moon';
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLightTheme = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    themeIcon.className = isLightTheme ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });

  // --- Mobile Menu Toggle ---
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu when a link is clicked
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = mobileMenuToggle.querySelector('i');
      icon.className = 'fa-solid fa-bars';
    });
  });

  // --- Header Navigation Scroll Styling ---
  const navbar = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Typing Animation ---
  const typingElement = document.getElementById('typing-element');
  const roles = [
    "B.Tech Student",
    "Developer",
    "Photographer",
    "AI Enthusiast"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start the typing animation
  if (typingElement) {
    typeEffect();
  }

  // --- Navigation Intersection Observer for Active Link ---
  const sections = document.querySelectorAll('section, header');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // --- Contact Form Submission ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      // Premium UI Feedback: Replace button text with spinner/sending status
      const submitBtn = document.getElementById('btn-submit-contact');
      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

      // Mock sending (simulate API delay)
      setTimeout(() => {
        // Show success visual state
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
        submitBtn.style.background = 'linear-gradient(90deg, #10b981, #059669)'; // Emerald gradient
        
        // Reset form
        contactForm.reset();

        // Alert user nicely
        setTimeout(() => {
          alert(`Thank you, ${name}! Your message has been sent successfully.`);
          // Reset button back to original state
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
          submitBtn.style.background = ''; // reset to default CSS
        }, 1000);
      }, 1500);
    });
  }
});

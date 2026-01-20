// Cursor tracking line effect in hero section
class HeroCursorEffect {
  constructor() {
    this.canvas = document.getElementById('heroCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.isHeroHovered = false;
    
    this.setupCanvas();
    this.attachEventListeners();
    this.animate();
  }
  
  setupCanvas() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const rect = hero.getBoundingClientRect();
    this.canvas.width = window.innerWidth;
    this.canvas.height = rect.height;
    this.canvasTop = rect.top + window.scrollY;
  }
  
  attachEventListeners() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    hero.addEventListener('mouseenter', () => {
      this.isHeroHovered = true;
    });
    
    hero.addEventListener('mouseleave', () => {
      this.isHeroHovered = false;
    });
    
    hero.addEventListener('mousemove', (e) => {
      if (!this.isHeroHovered) return;
      
      const hero = document.querySelector('.hero');
      const rect = hero.getBoundingClientRect();
      
      this.mouseX = e.clientX;
      this.mouseY = e.clientY - rect.top;
      
      // Create particles
      for (let i = 0; i < 2; i++) {
        this.particles.push({
          x: this.mouseX,
          y: this.mouseY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
          maxLife: 1
        });
      }
    });
    
    window.addEventListener('resize', () => this.setupCanvas());
  }
  
  drawLine(x1, y1, x2, y2, opacity) {
    this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.particles.length > 0) {
      // Draw lines between particles
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.4;
            this.drawLine(
              this.particles[i].x,
              this.particles[i].y,
              this.particles[j].x,
              this.particles[j].y,
              opacity
            );
          }
        }
      }
    }
    
    // Update and draw particles
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      
      if (p.life > 0) {
        const size = 3 * p.life;
        this.ctx.fillStyle = `rgba(255, 0, 255, ${p.life * 0.7})`;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(255, 0, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        return true;
      }
      return false;
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize cursor effect when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HeroCursorEffect();
});

// Smooth scroll functionality
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Form validation utility
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\d\s\-\+\(\)]+$/;
  return !phone || re.test(phone); // Optional field
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  let errorElement = formGroup.querySelector('.error-message');
  
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    formGroup.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message');
  
  if (errorElement) {
    errorElement.remove();
  }
  
  input.classList.remove('error');
  input.removeAttribute('aria-invalid');
}

function showSuccess(form, message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  successDiv.setAttribute('role', 'alert');
  successDiv.setAttribute('aria-live', 'polite');
  
  form.insertBefore(successDiv, form.firstChild);
  
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

function setLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
    button.classList.add('loading');
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText;
    button.classList.remove('loading');
  }
}

// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('#contact .contact-form');
  
  if (contactForm) {
    // Real-time validation
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const phoneInput = contactForm.querySelector('#phone');
    const messageInput = contactForm.querySelector('#message');
    
    // Clear errors on input
    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => clearError(input));
        input.addEventListener('blur', () => validateField(input));
      }
    });
    
    function validateField(input) {
      if (!input.value.trim() && input.required) {
        showError(input, 'This field is required');
        return false;
      }
      
      if (input.type === 'email' && !validateEmail(input.value)) {
        showError(input, 'Please enter a valid email address');
        return false;
      }
      
      if (input.type === 'tel' && !validatePhone(input.value)) {
        showError(input, 'Please enter a valid phone number');
        return false;
      }
      
      clearError(input);
      return true;
    }
    
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Validate all fields
      let isValid = true;
      [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        if (input && !validateField(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
          firstError.focus();
        }
        return;
      }
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      setLoading(submitBtn, true);
      
      try {
        // Simulate form submission (replace with actual API call)
        const formData = new FormData(contactForm);
        
        // For Netlify forms, this will work automatically
        // For custom backend, replace with:
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   body: formData
        // });
        
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        
        showSuccess(contactForm, '✓ Thank you! Your message has been sent successfully.');
        contactForm.reset();
        
      } catch (error) {
        console.error('Form submission error:', error);
        showError(submitBtn, 'Failed to send message. Please try again.');
      } finally {
        setLoading(submitBtn, false);
      }
    });
  }
  
  // CV form handler
  const cvForm = document.querySelector('#cv .cv-form');
  
  if (cvForm) {
    const fileInput = cvForm.querySelector('#cv-upload');
    const uploadArea = cvForm.querySelector('.upload-area');
    
    // Drag and drop functionality
    if (uploadArea && fileInput) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
      });
      
      function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
          uploadArea.classList.add('drag-over');
        }, false);
      });
      
      ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
          uploadArea.classList.remove('drag-over');
        }, false);
      });
      
      uploadArea.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        updateFileName(files[0]);
      }, false);
      
      fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
          updateFileName(e.target.files[0]);
        }
      });
      
      function updateFileName(file) {
        const fileName = uploadArea.querySelector('p');
        if (file) {
          const fileSize = (file.size / 1024 / 1024).toFixed(2);
          fileName.textContent = `${file.name} (${fileSize} MB)`;
        }
      }
    }
    
    cvForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (!fileInput.files.length) {
        showError(fileInput, 'Please select a CV file to upload');
        return;
      }
      
      const file = fileInput.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (file.size > maxSize) {
        showError(fileInput, 'File size must be less than 5MB');
        return;
      }
      
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        showError(fileInput, 'Please upload a PDF or DOC file');
        return;
      }
      
      const submitBtn = cvForm.querySelector('.submit-btn');
      setLoading(submitBtn, true);
      
      try {
        const formData = new FormData(cvForm);
        
        // Simulate upload
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showSuccess(cvForm, '✓ CV uploaded successfully! We will review your application.');
        cvForm.reset();
        uploadArea.querySelector('p').textContent = 'or click to browse';
        
      } catch (error) {
        console.error('CV upload error:', error);
        showError(submitBtn, 'Failed to upload CV. Please try again.');
      } finally {
        setLoading(submitBtn, false);
      }
    });
  }
  
  // Sticky navbar on scroll
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        scrollToSection(targetId);
      }
    });
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  document.querySelectorAll('.card, .project-card, .section-header').forEach(el => {
    observer.observe(el);
  });
  
  // Handle project overlay on mobile/touch devices
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const imageContainer = card.querySelector('.project-image-container');
    const overlay = card.querySelector('.project-overlay');
    
    // On touch devices, toggle overlay visibility on click
    imageContainer.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
      }
    });
    
    // Close overlay when clicking outside on mobile
    card.addEventListener('mouseleave', function() {
      if (window.innerWidth <= 768) {
        overlay.style.opacity = '0';
      }
    });
  });
});
/* ============================================
   BREW & BLOOM CAFÉ - Main JavaScript
   Interactive features and functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on load

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString() + '+';
                }
            };

            updateCounter();
        });
    }

    // Start counters when hero is in view
    const heroSection = document.querySelector('.hero');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                setTimeout(animateCounters, 500);
            }
        });
    }, { threshold: 0.5 });

    if (heroSection) counterObserver.observe(heroSection);

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll(
        '.section-header, .about-card, .menu-item, .feature-item, ' +
        '.gallery-item, .testimonial-card, .contact-info-item, .booking-feature'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        revealObserver.observe(el);
    });

    // ============================================
    // MENU TABS
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuPanels = document.querySelectorAll('.menu-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            menuPanels.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-card').length;

    function getSlidesPerView() {
        return window.innerWidth > 768 ? 2 : 1;
    }

    function updateSlider() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        const maxSlide = totalSlides - slidesPerView;

        if (currentSlide > maxSlide) currentSlide = maxSlide;
        if (currentSlide < 0) currentSlide = 0;

        track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    nextBtn.addEventListener('click', () => {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;
        currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;
        currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Auto-slide
    let autoSlideInterval = setInterval(() => {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;
        currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
        updateSlider();
    }, 5000);

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            const slidesPerView = getSlidesPerView();
            const maxSlide = totalSlides - slidesPerView;
            currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
            updateSlider();
        }, 5000);
    });

    window.addEventListener('resize', updateSlider);

    // ============================================
    // BOOKING FORM
    // ============================================
    const bookingForm = document.getElementById('bookingForm');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showToast('Reservation Confirmed!', 
                `Thank you, ${data.name}! Your table for ${data.guests} on ${data.date} at ${data.time} has been reserved.`);

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.reset();
        }, 1500);
    });

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;

        showToast('Subscribed!', 
            `Welcome aboard! ${email} has been added to our newsletter.`);

        this.reset();
    });

    // ============================================
    // TOAST NOTIFICATION
    // ============================================
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastClose = document.getElementById('toastClose');
    let toastTimeout;

    function showToast(title, message) {
        toast.querySelector('h4').textContent = title;
        toastMessage.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    toastClose.addEventListener('click', () => {
        toast.classList.remove('show');
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.4;
            hero.style.backgroundPositionY = `${rate}px`;
        }
    });

    // ============================================
    // GALLERY LIGHTBOX (Simple)
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay span').textContent;

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${title}">
                    <span class="lightbox-title">${title}</span>
                    <button class="lightbox-close"><i class="fas fa-times"></i></button>
                </div>
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Animate in
            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
            });

            // Close handlers
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            };

            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

            // Close on escape
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        });
    });

    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ============================================
    // TYPING EFFECT FOR HERO TITLE (Optional)
    // ============================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--secondary), var(--accent));
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // ============================================
    // CURSOR FOLLOWER (Desktop only)
    // ============================================
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--secondary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transition: transform 0.1s ease, opacity 0.3s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        cursorDot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--secondary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transition: transform 0.05s ease;
        `;
        document.body.appendChild(cursorDot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX - 3 + 'px';
            cursorDot.style.top = mouseY - 3 + 'px';
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .menu-item, .gallery-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.borderColor = 'var(--accent)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--secondary)';
            });
        });
    }

    // ============================================
    // CONFETTI ON FORM SUBMIT
    // ============================================
    function createConfetti() {
        const colors = ['#D4A574', '#C75B39', '#6B3A1E', '#E8C9A0', '#F5E6D3'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                z-index: 99999;
                pointer-events: none;
            `;
            document.body.appendChild(confetti);

            const duration = Math.random() * 2 + 1;
            const rotation = Math.random() * 720 - 360;

            confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(${window.innerHeight + 20}px) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }
    }

    // Override toast to include confetti
    const originalShowToast = showToast;
    window.showToast = function(title, message) {
        originalShowToast(title, message);
        createConfetti();
    };

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS (Enhanced)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // PRELOADER (Optional enhancement)
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    console.log('%c🍵 Brew & Bloom Café', 'font-size: 24px; font-weight: bold; color: #6B3A1E;');
    console.log('%cWebsite loaded successfully! Enjoy your virtual coffee experience.', 'font-size: 14px; color: #D4A574;');
});

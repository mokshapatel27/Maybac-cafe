// ========================================
// MAYBAC CAFE - MODERN WEBSITE SCRIPTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE DETECTION & OPTIMIZATION
    // ========================================
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    
    // Disable parallax effects on mobile for performance
    if (isMobile || isSmallScreen) {
        document.body.classList.add('mobile-device');
    }
    
    // ========================================
    // PRELOADER
    // ========================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    });
    
    // ========================================
    // NAVIGATION
    // ========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth scroll and active link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            navMenu.classList.remove('active');
            if (hamburger) {
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
    
    // ========================================
    // ANIMATED COUNTERS
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounters = () => {
        if (hasAnimated) return;
        
        const aboutSection = document.querySelector('.about');
        if (!aboutSection) return;
        
        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            hasAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (current > target) current = target;
                        
                        if (target % 1 !== 0) {
                            stat.textContent = current.toFixed(1);
                        } else {
                            stat.textContent = Math.ceil(current);
                        }
                        
                        setTimeout(updateCounter, 20);
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    
    // ========================================
    // PORTRAIT GALLERY SLIDER
    // ========================================
    const slideWrappers = document.querySelectorAll('.slide-wrapper');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    
    if (slideWrappers.length > 0) {
        let currentIndex = 0;
        
        // Create dots
        slideWrappers.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        
        // Show 3 slides at a time on desktop (prev, current, next)
        function updateSliderView() {
            const isMobile = window.innerWidth <= 1024;
            
            slideWrappers.forEach((wrapper, index) => {
                wrapper.classList.remove('active');
                
                if (isMobile) {
                    // Mobile: show only current slide
                    if (index === currentIndex) {
                        wrapper.classList.add('active');
                        wrapper.style.display = 'block';
                    } else {
                        wrapper.style.display = 'none';
                    }
                } else {
                    // Desktop: show 3 slides (prev, current, next)
                    const prevIndex = (currentIndex - 1 + slideWrappers.length) % slideWrappers.length;
                    const nextIndex = (currentIndex + 1) % slideWrappers.length;
                    
                    if (index === currentIndex) {
                        wrapper.classList.add('active');
                        wrapper.style.order = '2';
                        wrapper.style.display = 'block';
                    } else if (index === prevIndex) {
                        wrapper.style.order = '1';
                        wrapper.style.display = 'block';
                    } else if (index === nextIndex) {
                        wrapper.style.order = '3';
                        wrapper.style.display = 'block';
                    } else {
                        wrapper.style.display = 'none';
                    }
                }
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSliderView();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideWrappers.length;
            updateSliderView();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideWrappers.length) % slideWrappers.length;
            updateSliderView();
        }
        
        if (prevArrow) prevArrow.addEventListener('click', prevSlide);
        if (nextArrow) nextArrow.addEventListener('click', nextSlide);
        
        // Auto-advance
        setInterval(nextSlide, 4000);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Update on resize
        window.addEventListener('resize', updateSliderView);
        
        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const sliderContainer = document.querySelector('.slider-container');
        
        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left - next slide
                        nextSlide();
                    } else {
                        // Swipe right - previous slide
                        prevSlide();
                    }
                }
            }
        }
        
        // Initial setup
        updateSliderView();
    }
    
    // ========================================
    // PARALLAX EFFECT - EXPERIENCE IMAGE (Desktop Only)
    // ========================================
    const parallaxImage = document.querySelector('.parallax-image');
    
    if (parallaxImage && !isMobile && !isSmallScreen) {
        const experienceImage = document.querySelector('.experience-image');
        
        experienceImage.addEventListener('mousemove', (e) => {
            const rect = experienceImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 10;
            const moveY = (y - centerY) / centerY * 10;
            
            parallaxImage.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
        
        experienceImage.addEventListener('mouseleave', () => {
            parallaxImage.style.transform = 'scale(1.1) translate(0, 0)';
        });
    }
    
    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));
    
    // ========================================
    // PARALLAX HERO BACKGROUND (Desktop Only)
    // ========================================
    if (!isMobile && !isSmallScreen) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const hero = document.querySelector('.hero');
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }
    
    // ========================================
    // SMOOTH SECTION REVEAL
    // ========================================
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-gold) 0%, var(--dark-gold) 100%);
        color: var(--dark-maroon);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1) translateY(-5px)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1) translateY(0)';
    });
    
    // ========================================
    // MOMENT CARDS STAGGER ANIMATION
    // ========================================
    const momentCards = document.querySelectorAll('.moment-card');
    
    momentCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // ========================================
    // FEATURE ITEMS HOVER
    // ========================================
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // ========================================
    // CONTACT CARDS REVEAL
    // ========================================
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // ========================================
    // IMAGE LAZY LOAD
    // ========================================
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
    
    console.log('🎉 Maybac Cafe - Modern Website Loaded!');
    console.log('✨ Enjoy the premium experience!');
});

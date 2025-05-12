/**
 * Katarungan Partners - Main JavaScript
 * Handles responsive navigation and language toggle functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const langEN = document.getElementById('lang-en');
    const langTL = document.getElementById('lang-tl');
    const enElements = document.querySelectorAll('.en');
    const tlElements = document.querySelectorAll('.tl');
    const header = document.getElementById('header');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Language toggle functionality
    if (langEN && langTL) {
        // English language
        langEN.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                langTL.classList.remove('active');
                
                // Show English content, hide Tagalog
                enElements.forEach(el => {
                    el.style.display = 'block';
                });
                tlElements.forEach(el => {
                    el.style.display = 'none';
                });
                
                // Store preference in localStorage
                localStorage.setItem('language', 'en');
            }
        });
        
        // Tagalog language
        langTL.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                langEN.classList.remove('active');
                
                // Show Tagalog content, hide English
                tlElements.forEach(el => {
                    el.style.display = 'block';
                });
                enElements.forEach(el => {
                    el.style.display = 'none';
                });
                
                // Store preference in localStorage
                localStorage.setItem('language', 'tl');
            }
        });
        
        // Check for saved language preference
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage === 'tl') {
            langTL.click();
        } else {
            langEN.click();
        }
    }

    // Shrink header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '15px 0';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Simple testimonial rotation for mobile screens
    if (window.innerWidth < 768) {
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length > 1) {
            let currentTestimonial = 0;
            
            // Hide all testimonials except the first one
            testimonials.forEach((testimonial, index) => {
                if (index !== 0) {
                    testimonial.style.display = 'none';
                }
            });
            
            // Create navigation dots
            const sliderNav = document.createElement('div');
            sliderNav.className = 'slider-nav';
            
            testimonials.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = index === 0 ? 'dot active' : 'dot';
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                });
                sliderNav.appendChild(dot);
            });
            
            const testimonialSlider = document.querySelector('.testimonial-slider');
            testimonialSlider.parentNode.insertBefore(sliderNav, testimonialSlider.nextSibling);
            
            // Auto rotate testimonials
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
            
            function showTestimonial(index) {
                testimonials.forEach((testimonial, i) => {
                    testimonial.style.display = i === index ? 'block' : 'none';
                    document.querySelectorAll('.dot')[i].className = i === index ? 'dot active' : 'dot';
                });
                currentTestimonial = index;
            }
        }
    }
}); 
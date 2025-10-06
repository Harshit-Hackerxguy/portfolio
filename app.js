// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initProjectFilters();
    initContactForm();
    initParticleAnimations();
    initSkillCardAnimations();
    initImageLoading();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - (targetId === 'hero' ? 0 : 80); // No offset for hero section
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typingText) return;
    
    const text = "Hi, I'm Harshit Agarwal";
    let i = 0;
    
    // Clear initial text
    typingText.textContent = '';
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        } else {
            // Start blinking cursor after typing is complete
            cursor.style.animation = 'blink 1s infinite';
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for skill cards
                if (entry.target.classList.contains('skills-grid')) {
                    const skillCards = entry.target.querySelectorAll('.skill-card');
                    skillCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Add staggered animation for project cards
                if (entry.target.classList.contains('projects-grid')) {
                    const projectCards = entry.target.querySelectorAll('.project-card:not(.hidden)');
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.section-header, .skills-grid, .projects-grid, .contact-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Initialize skill cards with hidden state
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Initialize project cards with hidden state
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
}

// Project filtering functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                    // Animate in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.classList.add('hidden');
                    // Hide after animation
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form functionality (UI only)
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        
        // Simulate form submission
        setTimeout(() => {
            // Show success state
            btnLoading.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #06ffa5 0%, #00d4ff 100%)';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                btnText.classList.remove('hidden');
                btnLoading.classList.add('hidden');
                btnLoading.textContent = 'Sending...';
                submitBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            }, 2000);
        }, 2000);
    });
    
    // Form validation styling
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#06ffa5';
                this.style.boxShadow = '0 0 0 2px rgba(6, 255, 165, 0.1)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#00d4ff';
            this.style.boxShadow = '0 0 0 3px rgba(0, 212, 255, 0.1)';
        });
    });
}

// Enhanced particle animations
function initParticleAnimations() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Create additional particles for more dynamic effect
    for (let i = 6; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        // Random particle colors
        const colors = ['#00d4ff', '#8b5cf6', '#06ffa5', '#ff6b6b'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
    
    // Mouse interaction with particles
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.01;
            const x = (e.clientX * speed);
            const y = (e.clientY * speed);
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Skill card animations
function initSkillCardAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(0, 212, 255, 0.3);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Image loading initialization
function initImageLoading() {
    // Handle skill logos
    const skillLogos = document.querySelectorAll('.skill-logo');
    skillLogos.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                console.warn('Failed to load skill logo:', this.src);
                this.style.opacity = '0.3';
                this.style.filter = 'grayscale(100%)';
            });
        }
    });
    
    // Handle project images
    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                console.warn('Failed to load project image:', this.src);
                // Replace with placeholder emoji if image fails
                const placeholder = document.createElement('div');
                placeholder.className = 'project-placeholder';
                placeholder.textContent = '🖼️';
                placeholder.style.fontSize = '4rem';
                placeholder.style.opacity = '0.7';
                this.parentNode.replaceChild(placeholder, this);
            });
        }
    });
    
    // Handle social logos
    const socialLogos = document.querySelectorAll('.social-logo');
    socialLogos.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                console.warn('Failed to load social logo:', this.src);
                this.style.display = 'none';
            });
        }
    });
}

// Parallax scrolling effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
    });
});

// Smooth reveal animation for elements
function revealElements() {
    const reveals = document.querySelectorAll('.fade-in:not(.visible)');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealElements);

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    // Fade in all images after page load
    const allImages = document.querySelectorAll('.skill-logo, .project-img, .social-logo');
    allImages.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = '1';
        }, index * 100);
    });
});

// Resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust particle positions on resize
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
    });
});

// Intersection Observer for performance optimization
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Lazy load animations
const lazyAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            lazyAnimationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should have lazy animations
document.querySelectorAll('.particle, .skill-card, .project-card').forEach(el => {
    el.style.animationPlayState = 'paused';
    lazyAnimationObserver.observe(el);
});

// Enhanced scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide scroll indicator when user starts scrolling
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Add Easter egg - Konami code
let konamiCode = [];
const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === correctCode.toString()) {
        // Easter egg: Extra particle explosion
        const particlesContainer = document.querySelector('.particles-container');
        if (particlesContainer) {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.top = '50%';
                particle.style.left = '50%';
                particle.style.background = '#ff6b6b';
                particle.style.animation = `explode 2s ease-out ${i * 0.1}s forwards`;
                particlesContainer.appendChild(particle);
                
                setTimeout(() => particle.remove(), 2000);
            }
        }
        
        konamiCode = []; // Reset
    }
});

// Add explode animation
const explodeStyle = document.createElement('style');
explodeStyle.textContent = `
    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explodeStyle);

// Enhanced hover effects for skill logos
document.addEventListener('DOMContentLoaded', function() {
    const skillLogos = document.querySelectorAll('.skill-logo');
    
    skillLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.filter = 'brightness(1.2) saturate(1.3) drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1) saturate(1)';
        });
    });
});

// Add project image hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectImages = document.querySelectorAll('.project-img');
    
    projectImages.forEach(img => {
        const card = img.closest('.project-card');
        
        card.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.1)';
            img.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1)';
            img.style.filter = 'brightness(1) contrast(1)';
        });
    });
});

// Social media logo hover effects
document.addEventListener('DOMContentLoaded', function() {
    const socialLogos = document.querySelectorAll('.social-logo');
    
    socialLogos.forEach(logo => {
        const link = logo.closest('.social-link');
        
        link.addEventListener('mouseenter', function() {
            logo.style.transform = 'scale(1.1)';
            logo.style.filter = 'brightness(1.2) contrast(1.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            logo.style.transform = 'scale(1)';
            logo.style.filter = 'brightness(0.8) contrast(1.2)';
        });
    });
});
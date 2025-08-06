// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate skill progress bars when they come into view
const observeSkills = () => {
    const skillBars = document.querySelectorAll('.progress-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percent = progressBar.getAttribute('data-percent');
                progressBar.style.width = percent + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
};

// Scroll animations
const observeElements = () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
};

// Add animation classes to elements
const addAnimationClasses = () => {
    // Hero section
    document.querySelector('.hero-content').classList.add('slide-in-left');
    document.querySelector('.hero-image').classList.add('slide-in-right');
    
    // About section
    document.querySelector('.about-text').classList.add('slide-in-left');
    document.querySelector('.about-image').classList.add('slide-in-right');
    
    // Skills
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Projects
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Contact
    document.querySelector('.contact-info').classList.add('slide-in-left');
    document.querySelector('.contact-form').classList.add('slide-in-right');
};

// Contact form submission
const handleContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập email hợp lệ!');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Đang gửi...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Tin nhắn đã được gửi thành công! Tôi sẽ liên hệ lại với bạn sớm nhất có thể.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
};

// Typing animation for hero title
const typeWriter = () => {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.innerHTML;
    const nameSpan = titleElement.querySelector('.highlight');
    
    if (nameSpan) {
        const name = nameSpan.textContent;
        const prefix = 'Xin chào, tôi là ';
        
        titleElement.innerHTML = prefix;
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < name.length) {
                if (i === 0) {
                    titleElement.innerHTML = prefix + '<span class="highlight">' + name[i];
                } else {
                    titleElement.querySelector('.highlight').textContent += name[i];
                }
                
                if (i === name.length - 1) {
                    titleElement.querySelector('.highlight').textContent += '</span>';
                }
                i++;
            } else {
                clearInterval(typeInterval);
                titleElement.innerHTML = originalText;
            }
        }, 150);
    }
};

// Parallax effect for hero section
const parallaxEffect = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
};

// Add loading animation
const addLoadingAnimation = () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
};

// Active navigation highlighting
const highlightActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
};

// Scroll to top functionality
const addScrollToTop = () => {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Add hover effects to project cards
const addProjectHoverEffects = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
};

// Create floating particles background
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 20 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// Handle profile icon (updated from image to icon)
const handleProfileIcon = () => {
    const profileIcon = document.getElementById('profile-icon');
    
    // Icon is already set, no need for error handling like images
    if (profileIcon) {
        // Add hover effect
        profileIcon.addEventListener('mouseenter', () => {
            profileIcon.style.transform = 'scale(1.1)';
            profileIcon.style.transition = 'transform 0.3s ease';
        });
        
        profileIcon.addEventListener('mouseleave', () => {
            profileIcon.style.transform = 'scale(1)';
        });
    }
};

// Handle project icons (updated from images to colored backgrounds with icons)
const handleProjectIcons = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectIcon = card.querySelector('.project-icon i');
        
        if (projectIcon) {
            // Add hover effects to project icons
            card.addEventListener('mouseenter', () => {
                projectIcon.style.transform = 'scale(1.2)';
                projectIcon.style.color = 'rgba(255, 255, 255, 1)';
                projectIcon.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                projectIcon.style.transform = 'scale(1)';
                projectIcon.style.color = 'rgba(255, 255, 255, 0.9)';
                projectIcon.style.textShadow = 'none';
            });
        }
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addLoadingAnimation();
    addAnimationClasses();
    observeElements();
    observeSkills();
    handleContactForm();
    highlightActiveNav();
    addScrollToTop();
    addProjectHoverEffects();
    createParticles();
    handleProfileIcon();
    handleProjectIcons();
    
    // Initialize type writer effect after a short delay
    setTimeout(typeWriter, 1000);
    
    // Add parallax effect
    parallaxEffect();
});

// Add some utility functions for future enhancements
const utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Generate random color
    randomColor: () => {
        return `hsl(${Math.random() * 360}, 70%, 60%)`;
    }
};

// Export utils for global use
window.portfolioUtils = utils;

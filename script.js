document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dynamic Typing Effect ---
    const dynamicTextElement = document.querySelector('.dynamic-text');
    const roles = ['Project Manager', 'Laravel Developer', 'Mobile Developer', 'Quality Assurance'];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove a character
            dynamicTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Add a character
            dynamicTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Normal typing speed
        }
        
        // If finished typing the word
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end of word
        } 
        // If finished deleting the word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Move to next word
            typingSpeed = 500; // Pause before typing new word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    // --- Smooth Scrolling for Navbar Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust scroll position for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Simulating sending
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.background = '#00F0FF';
                btn.style.color = '#000';
                btn.style.opacity = '1';
                
                // Reset form
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // --- 3D Tilt Effect for Hero Card ---
    const tiltCard = document.getElementById('tilt-card');
    if (tiltCard) {
        // Disabled per user request
    }

    // --- Certificate Modal Logic ---
    const certModal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    const prevModalBtn = document.querySelector('.prev-modal-img');
    const nextModalBtn = document.querySelector('.next-modal-img');
    
    const modalTriggers = document.querySelectorAll('.cert-img img, .project-modal-trigger');

    let currentGallery = [];
    let currentIndex = 0;

    const updateModalImage = () => {
        if (currentGallery.length > 0) {
            const imgData = currentGallery[currentIndex];
            modalImg.src = imgData.src;
            modalImg.alt = imgData.alt;
            if (imgData.isProfessional) {
                modalImg.classList.add('professional-screenshot');
            } else {
                modalImg.classList.remove('professional-screenshot');
            }
            modalImg.classList.remove('zoomed');
            
            if (currentGallery.length > 1) {
                if (prevModalBtn) prevModalBtn.style.display = 'flex';
                if (nextModalBtn) nextModalBtn.style.display = 'flex';
            } else {
                if (prevModalBtn) prevModalBtn.style.display = 'none';
                if (nextModalBtn) nextModalBtn.style.display = 'none';
            }
        }
    };

    if (certModal && modalImg && closeModal) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                
                const container = trigger.closest('.swipeable-container, .certifications-grid');
                currentGallery = [];
                
                if (container) {
                    const siblings = container.querySelectorAll('.cert-img img, .project-modal-trigger');
                    siblings.forEach(sib => {
                        const img = sib.tagName === 'IMG' ? sib : sib.querySelector('img');
                        if (img) {
                            currentGallery.push({
                                src: img.src,
                                alt: img.alt,
                                isProfessional: img.classList.contains('professional-screenshot') || (sib.tagName !== 'IMG' && sib.querySelector('.professional-screenshot'))
                            });
                        }
                    });
                } else {
                    const img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
                    if (img) {
                        currentGallery.push({
                            src: img.src,
                            alt: img.alt,
                            isProfessional: img.classList.contains('professional-screenshot') || (trigger.tagName !== 'IMG' && trigger.querySelector('.professional-screenshot'))
                        });
                    }
                }
                
                const clickedImg = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
                if (clickedImg) {
                    currentIndex = currentGallery.findIndex(g => g.src === clickedImg.src);
                    if (currentIndex === -1) currentIndex = 0;
                }
                
                updateModalImage();
                certModal.classList.add('show');
            });
        });

        const closeFunc = () => {
            certModal.classList.remove('show');
            modalImg.classList.remove('zoomed');
            setTimeout(() => { modalImg.src = ''; }, 300);
        };

        const showNext = (e) => {
            if (e) e.stopPropagation();
            if (currentGallery.length > 1) {
                currentIndex = (currentIndex + 1) % currentGallery.length;
                updateModalImage();
            }
        };

        const showPrev = (e) => {
            if (e) e.stopPropagation();
            if (currentGallery.length > 1) {
                currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                updateModalImage();
            }
        };

        closeModal.addEventListener('click', closeFunc);
        if (nextModalBtn) nextModalBtn.addEventListener('click', showNext);
        if (prevModalBtn) prevModalBtn.addEventListener('click', showPrev);
        
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeFunc();
            }
        });

        modalImg.addEventListener('click', () => {
            modalImg.classList.toggle('zoomed');
        });

        document.addEventListener('keydown', (e) => {
            if (certModal.classList.contains('show')) {
                if (e.key === 'ArrowRight') showNext();
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'Escape') closeFunc();
            }
        });
    }

    // --- Swipeable Container Logic (Drag to Scroll & Auto Slider) ---
    const swipeables = document.querySelectorAll('.swipeable-container');
    
    swipeables.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoPlayInterval;

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                if (slider.scrollWidth - slider.scrollLeft <= slider.clientWidth + 10) {
                    slider.scrollLeft = 0;
                } else {
                    slider.scrollLeft += slider.clientWidth;
                }
            }, 3000);
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Start autoplay on load
        startAutoPlay();

        // Pause on interaction
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('dragging');
            startAutoPlay();
        });
        slider.addEventListener('touchstart', stopAutoPlay);
        slider.addEventListener('touchend', startAutoPlay);

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('dragging');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('dragging');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    // Small trick to re-trigger reveal animation
                    setTimeout(() => item.classList.add('active'), 50);
                } else {
                    item.classList.add('hide');
                    item.classList.remove('active');
                }
            });
        });
    });

    // --- Projects Carousel Logic ---
    const projectsCarousel = document.getElementById('projects-carousel');
    const btnPrevProject = document.querySelector('.prev-project');
    const btnNextProject = document.querySelector('.next-project');

    if (projectsCarousel && btnPrevProject && btnNextProject) {
        btnNextProject.addEventListener('click', () => {
            const cardWidth = projectsCarousel.clientWidth;
            projectsCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        btnPrevProject.addEventListener('click', () => {
            const cardWidth = projectsCarousel.clientWidth;
            projectsCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    // --- Internationalization (i18n) Logic ---
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        // Check local storage for saved language
        const savedLang = localStorage.getItem('portfolio_lang') || 'en';
        langSelector.value = savedLang;
        
        const updateLanguage = (lang) => {
            if (typeof translations === 'undefined' || !translations[lang]) return;
            
            const trans = translations[lang];
            const elements = document.querySelectorAll('[data-i18n]');
            
            elements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (trans[key]) {
                    el.innerHTML = trans[key]; // use innerHTML to support span/strong tags
                }
            });
            
            // Save preference
            localStorage.setItem('portfolio_lang', lang);
        };
        
        // Initial load
        updateLanguage(savedLang);
        
        // On change
        langSelector.addEventListener('change', (e) => {
            updateLanguage(e.target.value);
        });
    }
});


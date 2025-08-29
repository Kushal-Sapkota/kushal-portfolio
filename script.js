
        document.addEventListener('DOMContentLoaded', function() {
            const glass = document.getElementById('glass');
            const glass2 = document.getElementById('glass2');
            const container = document.querySelector('.magnifier-container');
            const blurredImage = document.querySelector('.blurred-image');
            
            
            function initMagnifier(glassElement, containerElement) {
                if (!glassElement || !containerElement) return;
                
                containerElement.addEventListener('mousemove', function(e) {
                    moveMagnifier(e, glassElement, containerElement);
                });
                
                containerElement.addEventListener('mouseenter', function() {
                    glassElement.style.opacity = '1';
                    const blurredImg = containerElement.querySelector('.blurred-image');
                    if (blurredImg) {
                        blurredImg.style.filter = 'blur(0)';
                    }
                });
                
                containerElement.addEventListener('mouseleave', function() {
                    glassElement.style.opacity = '0';
                    const blurredImg = containerElement.querySelector('.blurred-image');
                    if (blurredImg) {
                        blurredImg.style.filter = 'blur(12px)';
                    }
                });
            }
            
            function moveMagnifier(e, glassElement, containerElement) {
                e.preventDefault();
                
                const containerRect = containerElement.getBoundingClientRect();
                const glassSize = glassElement.offsetWidth;
                
                
                let x = e.clientX - containerRect.left;
                let y = e.clientY - containerRect.top;
                
                
                if (x < glassSize / 2) x = glassSize / 2;
                if (x > containerRect.width - glassSize / 2) x = containerRect.width - glassSize / 2;
                if (y < glassSize / 2) y = glassSize / 2;
                if (y > containerRect.height - glassSize / 2) y = containerRect.height - glassSize / 2;
                
                
                glassElement.style.left = x + 'px';
                glassElement.style.top = y + 'px';
            }
            
            
            initMagnifier(glass, document.querySelector('.magnifier-container'));
            initMagnifier(glass2, document.querySelectorAll('.magnifier-container')[1]);
            
            // Sticky Header
            window.addEventListener('scroll', function() {
                const header = document.getElementById('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            
            const menuBtn = document.querySelector('.menu-btn');
            const navLinks = document.querySelector('.nav-links');
            
            if (menuBtn && navLinks) {
                menuBtn.addEventListener('click', function() {
                    navLinks.classList.toggle('active');
                    
                    if (navLinks.classList.contains('active')) {
                        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
                
                
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('active');
                        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    });
                });
            }
            
            
            const contactForm = document.getElementById('contactForm');
                if (contactForm) {
                    contactForm.addEventListener('submit', async function(e) {
                        e.preventDefault();

                const formData = new FormData(this);

                        try {
                            const response = await fetch('https://formspree.io/f/mqadejpj', {
                        method: 'POST',
                        body: formData,
                        headers: {
                     'Accept': 'application/json'
                        }
                    });

            if (response.ok) {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
                } catch (error) {
                    alert('Error submitting form. Check your internet connection or try later.');
                                }
            });
        }     
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });

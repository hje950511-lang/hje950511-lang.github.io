document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Scroll Animations (Intersection Observer) ---
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                // If element has a custom delay, apply it
                if (el.style.getPropertyValue('--delay')) {
                    el.style.transitionDelay = el.style.getPropertyValue('--delay');
                }
                displayScrollElement(el);
            }
        });
    }

    // Initial check on load
    handleScrollAnimation();

    // Check on scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Adjust for fixed header height
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Modal Logic ---
    function setupModal(btnId, modalId, closeBtnId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeBtnId);
        
        if (btn && modal && closeBtn) {
            const iframe = modal.querySelector('iframe');
            const originalSrc = iframe ? iframe.src : '';

            function openModal(e) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function closeModal() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                if (iframe) iframe.src = originalSrc; // Reset iframe src to stop video playback
            }

            btn.addEventListener('click', openModal);
            closeBtn.addEventListener('click', closeModal);

            // Close modal on outside click
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
    }

    // Initialize Modals
    setupModal('btn-hanbando', 'modalHanbando', 'closeModal');
    setupModal('btn-dutayeon', 'modalDutayeon', 'closeModalDutayeon');
    setupModal('btn-museum', 'modalMuseum', 'closeModalMuseum');

    // --- Language Toggle Logic ---
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const htmlTag = document.documentElement;
            if (htmlTag.lang === 'ko') {
                htmlTag.lang = 'en';
                langToggleBtn.textContent = 'ENG';
            } else {
                htmlTag.lang = 'ko';
                langToggleBtn.textContent = 'KOR';
            }
        });
    }
});

// --- Weather Widget Date ---
document.addEventListener('DOMContentLoaded', () => {
    const weatherDateEl = document.getElementById('weather-date');
    if (weatherDateEl) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        weatherDateEl.textContent = `${year}. ${month}. ${day}.`;
    }

    // --- Chatbot Logic ---
    const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatOptionBtns = document.querySelectorAll('.chat-option-btn');

    if (chatbotToggleBtn && chatbotWindow && chatbotCloseBtn) {
        chatbotToggleBtn.addEventListener('click', () => {
            chatbotWindow.classList.add('active');
            chatbotToggleBtn.style.display = 'none';
        });

        chatbotCloseBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
            chatbotToggleBtn.style.display = 'flex';
        });

        chatOptionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = btn.getAttribute('data-target');
                const menuTextKo = btn.querySelector('.lang-ko') ? btn.querySelector('.lang-ko').innerText : btn.innerText;
                const menuTextEn = btn.querySelector('.lang-en') ? btn.querySelector('.lang-en').innerText : btn.innerText;
                
                // Add User Message
                const userMsg = document.createElement('div');
                userMsg.className = 'chat-message user';
                userMsg.innerHTML = `<span class="lang-ko">${menuTextKo} 메뉴를 보고 싶어요.</span><span class="lang-en">I want to see the ${menuTextEn} menu.</span>`;
                chatbotMessages.appendChild(userMsg);
                
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

                // Simulate Bot Response delay
                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'chat-message bot';
                    
                    let responseKo = '';
                    let responseEn = '';

                    if (targetId === '#about') {
                        responseKo = '양구 소개 코너로 안내해 드리겠습니다. 잠시만 기다려주세요!';
                        responseEn = 'I will guide you to the About section. Please wait a moment!';
                    } else if (targetId === '#attractions') {
                        responseKo = '양구의 주요 명소 코너로 이동합니다. 양구의 아름다움을 느껴보세요!';
                        responseEn = 'Moving to the Attractions section. Experience the beauty of Yanggu!';
                    } else if (targetId === '#restaurants') {
                        responseKo = '양구의 맛집 코너로 안내합니다. 맛있는 식사 되세요!';
                        responseEn = 'Guiding you to the Restaurants section. Enjoy a delicious meal!';
                    } else if (targetId === '#accommodations') {
                        responseKo = '양구의 숙박시설 코너로 이동합니다. 편안한 휴식 되세요!';
                        responseEn = 'Moving to the Accommodations section. Have a relaxing stay!';
                    } else if (targetId === '#map') {
                        responseKo = '양구 관광안내지도를 엽니다.';
                        responseEn = 'Opening the Yanggu Tour Map.';
                    } else {
                        responseKo = '해당 코너로 이동합니다.';
                        responseEn = 'Moving to the section.';
                    }

                    botMsg.innerHTML = `<span class="lang-ko">${responseKo}</span><span class="lang-en">${responseEn}</span>`;
                    chatbotMessages.appendChild(botMsg);
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

                    // Scroll to target
                    setTimeout(() => {
                        const targetElement = document.querySelector(targetId);
                        if(targetElement) {
                            const headerHeight = document.getElementById('header') ? document.getElementById('header').offsetHeight : 0;
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 500);

                }, 600);
            });
        });
    }
});

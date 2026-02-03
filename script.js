document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor interaction
    const links = document.querySelectorAll('button, .image-container');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            outline.style.transform = 'scale(1.5)';
            outline.style.backgroundColor = 'rgba(255, 77, 109, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            outline.style.transform = 'scale(1)';
            outline.style.backgroundColor = 'transparent';
        });
    });

    // Scroll Progress Bar
    const progressBar = document.querySelector('.progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // Scroll Reveal Logic (Advanced Staggered Reveal)
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.9) {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, index * 100);
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Runaway "NO" Button Logic
    const noBtn = document.getElementById('noBtn');
    const moveButton = () => {
        const randomX = Math.random() * (window.innerWidth - 150);
        const randomY = Math.random() * (window.innerHeight - 80);

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';
        noBtn.style.transition = 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)';
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });

    // "YES" Button Celebration
    const yesBtn = document.getElementById('yesBtn');
    const successOverlay = document.getElementById('success-overlay');

    yesBtn.addEventListener('click', () => {
        successOverlay.classList.remove('hidden');
        setTimeout(() => {
            successOverlay.classList.add('visible');
            triggerConfetti();
        }, 10);
    });

    function triggerConfetti() {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 6000, colors: ['#ff4d6d', '#ff758f', '#ffccd5'] };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 60 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // 3D Tilt Effect for Photo Cards
    const cards = document.querySelectorAll('.image-container');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Sparkle Mouse Trail
    window.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.1) return; // Limit particles for performance
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    });

    // Love Letter Reveal
    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
        });
    }

    // Floating Hearts Background
    const createHeart = () => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '110vh';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.2;
        heart.style.zIndex = '-1';
        heart.style.pointerEvents = 'none';
        heart.style.transition = `transform ${Math.random() * 10 + 10}s linear, top ${Math.random() * 10 + 10}s linear`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.top = '-10vh';
            heart.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 20000);
    };

    setInterval(createHeart, 800);

    // Initial check
    revealOnScroll();
});

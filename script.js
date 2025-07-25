document.addEventListener('DOMContentLoaded', function () {
    // ======================
    // Mobile Menu Functionality
    // ======================
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const icon = mobileMenuButton?.querySelector('i');

    // Toggle menu function
    function toggleMenu() {
        if (!navLinks || !icon) return;

        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';

        // Change icon
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
            mobileMenuButton.setAttribute('aria-expanded', 'true');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    }

    // Click/touch event for menu button
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMenu);

        // Touch feedback
        mobileMenuButton.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.9)';
        });

        mobileMenuButton.addEventListener('touchend', function () {
            this.style.transform = '';
        });
    }

    // Close menu when clicking on nav items
    document.querySelectorAll('.left-nav a, .right-nav a, .right-nav button').forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // ======================
    // Partner Logo Interaction
    // ======================
    const partnerLogos = document.querySelectorAll('.partner-logo');

    partnerLogos.forEach(logo => {
        logo.addEventListener('click', function () {
            partnerLogos.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ======================
    // Sentiment Value Animation
    // ======================
    const sentimentValue = document.querySelector('.sentiment-value');
    if (sentimentValue) {
        let current = 0;
        const target = 92;
        const interval = setInterval(() => {
            current++;
            sentimentValue.textContent = current + '%';
            if (current >= target) {
                clearInterval(interval);
            }
        }, 20);
    }

    // ======================
    // Hero Section Video Animation
    // ======================
    const videos = document.querySelectorAll('.bg-video');
    if (videos.length > 0) {
        let currentVideo = 0;
        const videoCount = videos.length;

        // Preload all videos
        videos.forEach(video => {
            video.load();
            video.addEventListener('loadeddata', function () {
                this.classList.add('loaded');
            });
        });

        // Show first video
        videos[currentVideo].classList.add('active');

        // Rotate videos every 5 seconds
        function rotateVideos() {
            if (videoCount > 1) {
                videos[currentVideo].classList.remove('active');
                currentVideo = (currentVideo + 1) % videoCount;
                videos[currentVideo].classList.add('active');
            }
        }

        // Start rotation if we have multiple videos
        if (videoCount > 1) {
            const videoRotator = setInterval(rotateVideos, 5000);

            // Pause rotation when tab is inactive
            document.addEventListener('visibilitychange', function () {
                if (document.hidden) {
                    clearInterval(videoRotator);
                    videos.forEach(video => video.pause());
                } else {
                    setInterval(rotateVideos, 5000);
                    videos.forEach(video => video.play());
                }
            });
        }

        // Pause videos when tab is inactive to save resources
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                videos.forEach(video => video.pause());
            } else {
                videos.forEach(video => video.play());
            }
        });
    }

    // ======================
    // Close menu when clicking outside
    // ======================
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 &&
            navLinks && navLinks.classList.contains('active') &&
            !e.target.closest('.nav-links') &&
            !e.target.closest('.mobile-menu-button')) {
            toggleMenu();
        }
    });

    // ======================
    // Hero Button Hover Effects
    // ======================
    const primaryButtons = document.querySelectorAll('.primary-button');
    primaryButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(255, 62, 130, 0.3)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});
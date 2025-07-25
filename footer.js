document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for footer links
    document.querySelectorAll('.footer-column a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // CTA button animation
    const ctaButton = document.querySelector('.footer-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });

        ctaButton.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    }
});
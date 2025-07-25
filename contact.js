const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            })
        });

        const data = await response.json();

        if (data.success) {
            submitBtn.textContent = 'Message Sent!';
            contactForm.reset();
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Frontend Error:', error);
        submitBtn.textContent = 'Error - Try Again';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
});

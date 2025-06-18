// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Smooth scrolling and parallax effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    // Move airplanes based on scroll
    const airplanes = document.querySelectorAll('.airplane');
    airplanes.forEach((airplane, index) => {
        const speed = (index + 1) * 0.3;
        airplane.style.transform += ` translateY(${scrolled * speed * 0.1}px)`;
    });
    
    // Move clouds based on scroll
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        const speed = (index + 1) * 0.2;
        cloud.style.transform += ` translateY(${scrolled * speed * 0.05}px)`;
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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .destination-card, .testimonial-card, .news-card, .contact-card, .tour-type-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Form submission
document.querySelector('.inquiry-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !phone || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show success message
    alert('Thank you for your inquiry! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Add to contact functionality
document.querySelector('.contact-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create vCard data
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:M. THANIGAIVEL
ORG:THANIGAIVEL Property Development Services
TITLE:Architect (B.Arch, M.Plan)
TEL:+91-95147 79659
EMAIL:thanigaivel.architect@gmail.com
URL:www.THANIGAIVELPropertyDevelopmentServices.in
ADR:;;97A, 2nd Floor, 3rd Street, Sabari Nagar;Porur;Chennai;600116;India
NOTE:Council of Architecture (CoA Regd.) - Regn. No: CA/2019/112709. Building Plan | Layout Approval | Plot Services
END:VCARD`;
    
    // Create blob and download
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'M_THANIGAIVEL_Architect.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

// Share functionality
document.querySelector('.share-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    if (navigator.share) {
        navigator.share({
            title: 'M. THANIGAIVEL - Architect',
            text: 'Professional Architect - Building Plan | Layout Approval | Plot Services',
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
    }
});

// QR Code functionality
document.querySelector('.scan-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create QR code modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const qrContainer = document.createElement('div');
    qrContainer.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        max-width: 300px;
    `;
    
    qrContainer.innerHTML = `
        <h3 style="margin-bottom: 20px; color: #333;">Scan QR Code</h3>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}" alt="QR Code" style="width: 200px; height: 200px;">
        <p style="margin-top: 15px; color: #666; font-size: 14px;">Scan to view business card</p>
        <button onclick="this.closest('.modal').remove()" style="margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 10px; cursor: pointer;">Close</button>
    `;
    
    modal.className = 'modal';
    modal.appendChild(qrContainer);
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
});

// Slider functionality for testimonials and destinations
function initializeSliders() {
    const sliders = document.querySelectorAll('.destinations-slider, .testimonials-slider');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSliders);

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .destination-card, .testimonial-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Language selector functionality
document.querySelector('.language-selector select').addEventListener('change', function() {
    const selectedLang = this.value;
    // Here you would implement language switching logic
    console.log('Language changed to:', selectedLang);
});

// Add loading animation to buttons
document.querySelectorAll('button, .cta-button, .action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.textContent;
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
            this.style.opacity = '1';
            this.style.pointerEvents = 'auto';
        }, 1000);
    });
});
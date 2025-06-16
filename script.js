document.addEventListener('DOMContentLoaded', function() {
    // Profile photo upload functionality
    const profilePhoto = document.getElementById('profilePhoto');
    const photoUpload = document.getElementById('photoUpload');
    
    photoUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profilePhoto.src = event.target.result;
                // Save to localStorage
                localStorage.setItem('profilePhoto', event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Load saved profile photo if exists
    const savedProfilePhoto = localStorage.getItem('profilePhoto');
    if (savedProfilePhoto) {
        profilePhoto.src = savedProfilePhoto;
    }

    // Game images upload functionality
    const setupImageUpload = (imageId, uploadId) => {
        const image = document.getElementById(imageId);
        const upload = document.getElementById(uploadId);
        
        upload.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    image.src = event.target.result;
                    // Save to localStorage
                    localStorage.setItem(imageId, event.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        // Load saved image if exists
        const savedImage = localStorage.getItem(imageId);
        if (savedImage) {
            image.src = savedImage;
        }
    };

    // Setup upload for all game images
    setupImageUpload('mlImage', 'mlUpload');
    setupImageUpload('pgrImage1', 'pgrUpload1');
    setupImageUpload('pgrImage2', 'pgrUpload2');
    setupImageUpload('hsrImage', 'hsrUpload');
    
    // Smooth scrolling for navigation dots
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('.full-page');
    
    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
            // Update active dot
            dots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Scroll spy to update active dot
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${currentSection}`) {
                dot.classList.add('active');
            }
        });
    });
    
    // Scroll down button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.getElementById('about').offsetTop,
                behavior: 'smooth'
            });
        });
    }
    
    // Page transition animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
});
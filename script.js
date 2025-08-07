document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    // Ban đầu thêm class trong suốt
    if (window.scrollY === 0) {
        navbar.classList.add('navbar-transparent');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Khi cuộn xuống, xóa class trong suốt và thêm class có màu nền
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-scrolled');
        } else {
            // Khi ở trên cùng, làm ngược lại
            navbar.classList.add('navbar-transparent');
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // --- Fade-in on Scroll Effect ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.3, // Hiện ra khi 30% phần tử lọt vào màn hình
        rootMargin: "0px 0px -50px 0px" // Giảm vùng nhận diện một chút
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});
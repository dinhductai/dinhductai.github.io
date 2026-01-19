document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect
    const textElement = document.querySelector('.typing-text');
    const texts = ["Java Backend Developer", "Microservices Enthusiast", "Spring Boot Expert"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        textElement.textContent = letter;

        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Wait 2s before typing next
        } else {
            setTimeout(type, 100); // Typing speed
        }
    })();

    // 2. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3. Mobile Menu Toggle (Optional logic if you want to expand menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Simple toggle logic for mobile (requires CSS update for .active class if fully implemented)
            // For now, this is a placeholder or you can add:
            // navLinks.classList.toggle('active');
            alert("Mobile menu clicked! (Add .active CSS to expand menu)");
        });
    }
});
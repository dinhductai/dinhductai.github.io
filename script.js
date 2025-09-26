document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const visibleInput = document.getElementById('input'); // <span> để hiển thị
    const hiddenInput = document.getElementById('hidden-input'); // <input> ẩn để xử lý
    const terminal = document.getElementById('terminal');

    let commandHistory = [];
    let historyIndex = -1;

    // ----- PHẦN NỘI DUNG (GIỮ NGUYÊN) ----- //
    const commands = {
        help: `
Available commands:
  <span style="color: var(--green);">about</span>      - Who I am
  <span style="color: var(--green);">skills</span>     - My technical skills
  <span style="color: var(--green);">projects</span>   - My featured projects
  <span style="color: var(--green);">certs</span>      - My certificates
  <span style="color: var(--green);">contact</span>    - How to reach me
  <span style="color: var(--green);">clear</span>      - Clear the terminal screen
        `,
        about: `
Hello! I'm Dinh Duc Tai, a final-year Software Engineering student.
I am a Java Backend Developer with hands-on experience developing projects with both monolithic (Spring Boot) and Microservices architectures (Spring Cloud, RabbitMQ, Docker).
I am passionate about building scalable, real-world systems and continuously expanding my technical knowledge.
        `,
        skills: `
<span style="color: var(--blue);">Languages:</span>
  - Java

<span style="color: var(--blue);">Frameworks/Libraries:</span>
  - Spring Boot, Spring Security (JWT), Spring Cloud, Spring AI, Hibernate/JPA

<span style="color: var(--blue);">Databases:</span>
  - MySQL, PostgreSQL

<span style="color: var(--blue);">Infrastructure & Middleware:</span>
  - Docker, RabbitMQ

<span style="color: var(--blue);">API & Tools:</span>
  - RESTful API, WebSocket, Postman, Swagger, Git, Cloudinary
        `,
        projects: `
1. <a href="https://github.com/dinhductai/E_Commerce" target="_blank">E-Commerce Microservices</a>
   - Description: An e-commerce system built on a Microservices architecture.
   - Architecture: Microservices, Event-Driven
   - Key Tech: Spring Cloud (Gateway, Eureka), RabbitMQ, Docker, Saga Pattern.

2. VChat - Social Network
   - Description: A social media app with real-time chat, posts, and AI integration.
   - Links: <a href="https://github.com/dinhductai/VChat_BE" target="_blank">Backend (Spring Boot)</a> | <a href="https://github.com/dinhductai/VChat_FE" target="_blank">Frontend (HTML CSS JS)</a>
   - Architecture: Monolithic
   - Key Tech: Spring Boot, WebSocket, Spring AI, Vanilla JS, Bootstrap 5.

3. <a href="https://github.com/QuangLe1710/Laptop-Store-LeMinhQuang/tree/Dev2" target="_blank">LaptopStore - E-commerce Website</a>
   - Description: A complete monolithic e-commerce project for a course assignment.
   - Architecture: Monolithic
   - Key Tech: Spring Boot, Spring Security, MySQL.
        `,
        certs: `
<span style="color: var(--blue);">Core Java & Computer Science:</span>
  - <a href="https://www.coursera.org/account/accomplishments/specialization/certificate/SFZEEL0PIPVJ" target="_blank">IBM Java Developer - IBM</a>
  - <a href="https://www.coursera.org/account/accomplishments/certificate/5WHMVUFXC3LM" target="_blank">Object Oriented Programming in Java - IBM</a>
  - <a href="https://www.coursera.org/account/accomplishments/certificate/14YQUVK8T046" target="_blank">Object Oriented Programming in Java - UC San Diego</a>
  - <a href="https://www.coursera.org/account/accomplishments/specialization/certificate/UBPEI565STW1" target="_blank">Data Structures and Algorithms - UC San Diego</a>

<span style="color: var(--blue);">Backend Development & Databases:</span>
  - <a href="https://www.coursera.org/account/accomplishments/certificate/Y8EF6D3D0AW7" target="_blank">Spring Framework for Java Development - SkillUp Online</a>
  - <a href="https://www.coursera.org/account/accomplishments/certificate/XFVVGX34PGT3" target="_blank">Database Structures and Management with MySQL - Meta</a>

<span style="color: var(--blue);">Frontend Development & JavaScript:</span>
  - <a href="https://www.freecodecamp.org/certification/DinhDucTai/javascript-algorithms-and-data-structures" target="_blank">Legacy JavaScript Algorithms and Data Structures - freeCodeCamp</a>
  - <a href="https://www.freecodecamp.org/certification/DinhDucTai/responsive-web-design" target="_blank">Responsive Web Design - freeCodeCamp</a>
  - <a href="https://www.freecodecamp.org/certification/DinhDucTai/front-end-development-libraries" target="_blank">Front End Development Libraries - freeCodeCamp</a>

<span style="color: var(--blue);">English Language:</span>
  - <a href="https://drive.google.com/file/d/1SRH8ntFfnaW_RQVIyuCWuJEti1IABzEh/view?usp=drive_link" target="_blank">TOEIC Listening and Reading Certificate (580) - IIG Vietnam</a>
        `,
        contact: `
You can reach me via:
- Email:     <a href="mailto:dinhductai2501@gmail.com">dinhductai2501@gmail.com</a>
- LinkedIn:  <a href="https://www.linkedin.com/in/ductai2501/" target="_blank">linkedin.com/in/ductai2501</a>
- GitHub:    <a href="https://github.com/dinhductai" target="_blank">github.com/dinhductai</a>
- FaceBook:  <a href="https://www.facebook.com/dinhductai12?locale=vi_VN" target="_blank">facebook.com/dinhductai</a>
        `
    };
    
    const welcomeMessage = `Welcome to Dinh Duc Tai's portfolio\n------------------------------------\nType 'help' to see a list of commands.`;

    // ----- BẮT ĐẦU PHẦN LOGIC ĐÃ CẬP NHẬT ----- //

    // Khi click vào terminal, focus vào input ẩn để kích hoạt bàn phím
    terminal.addEventListener('click', () => {
        hiddenInput.focus();
    });

    // Đồng bộ nội dung từ input ẩn sang span hiển thị
    hiddenInput.addEventListener('input', () => {
        visibleInput.textContent = hiddenInput.value;
    });

    // Xử lý các phím chức năng (Enter, Up, Down)
    hiddenInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                updateInputFromHistory();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                updateInputFromHistory();
            } else {
                historyIndex = -1;
                hiddenInput.value = '';
                visibleInput.textContent = '';
            }
        }
    });

    function updateInputFromHistory() {
        const command = commandHistory[historyIndex];
        hiddenInput.value = command;
        visibleInput.textContent = command;
    }

    function executeCommand() {
        const command = hiddenInput.value.trim().toLowerCase();
        output.innerHTML += `\n<span class="prompt">guest@dinhductai.io:~$</span> ${command}`;

        if (command) {
            commandHistory.unshift(command);
            historyIndex = -1;
            processCommand(command);
        }

        hiddenInput.value = '';
        visibleInput.textContent = '';
        output.scrollTop = output.scrollHeight;
    }

    function processCommand(command) {
        if (command === 'clear') {
            output.innerHTML = '';
        } else {
            const response = commands[command] || `Command not found: ${command}. Type 'help' to see available commands.`;
            output.innerHTML += `\n${response}\n`;
        }
        output.scrollTop = output.scrollHeight;
    }

    function typeWriter(text, i = 0) {
        if (i < text.length) {
            output.innerHTML += text.charAt(i).replace('\n', '<br>');
            output.scrollTop = output.scrollHeight;
            setTimeout(() => typeWriter(text, i + 1), 10);
        }
    }

    // Khởi chạy
    typeWriter(welcomeMessage);
    hiddenInput.focus();
});
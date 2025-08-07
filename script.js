document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    let commandHistory = [];
    let historyIndex = -1;

    // ----- PHẦN BẠN CẦN CHỈNH SỬA ----- //
    const commands = {
        help: `
Commands available:
  <span style="color: var(--green);">about</span>    - About me
  <span style="color: var(--green);">skills</span>   - My skills
  <span style="color: var(--green);">projects</span> - My projects
  <span style="color: var(--green);">contact</span>  - Contact infomation
  <span style="color: var(--green);">clear</span>    - Clear screen
        `,
        about: `
Hello! I am Dinh Duc Tai.
A Java Backend developer with a passion for building robust and scalable web systems.
I enjoy solving complex problems and am always looking for opportunities to learn and grow.
        `,
        skills: `
Languages: Java, SQL, JavaScript
Frameworks: Spring Boot, Spring MVC, Spring AI, Spring Security, Spring Data JPA, Hibernate
Databases: MySQL, PostgreSQL
Tools: Git, Docker, Postman, Cloudinary
        `,
        projects: `
1. <a href="[LINK-REPO-1]" target="_blank">API Quản lý Thư viện</a>
   - Mô tả: Hệ thống RESTful API xây dựng bằng Spring Boot cho phép thực hiện các tác vụ CRUD cho Sách và Người mượn. 
   - Công nghệ: Spring Security, JWT.

2. <a href="[LINK-REPO-2]" target="_blank">Ứng dụng Blog cá nhân</a>
   - Mô tả: Backend cho một trang blog đơn giản, cho phép người dùng đăng bài, bình luận.
   - Công nghệ: Spring MVC, PostgreSQL.
        `,
        contact: `
Bạn có thể liên hệ với tôi qua:
- Email:    <a href="mailto:[dinhductai2501@gmail.com]"> dinhductai2501@gmail.com</a>
- LinkedIn: <a href="[https://www.linkedin.com/in/ductai2501/]" target="_blank">linkedin.com/in/ductai2501/</a>
- GitHub:   <a href="https://github.com/dinhductai" target="_blank">github.com/dinhductai</a>
- Facebook: <a href="https://www.facebook.com/dinhductai12" target="_blank">facebook.com/dinhductai12</a>
        `
    };
    // ----- KẾT THÚC PHẦN CHỈNH SỬA ----- //


    const welcomeMessage = `
Welcome to Dinh Duc Tai's portfolio
------------------------------------
Type 'help' to see a list of commands.
    `;

    function typeWriter(text, i = 0) {
        if (i < text.length) {
            output.innerHTML += text.charAt(i);
            output.scrollTop = output.scrollHeight;
            setTimeout(() => typeWriter(text, i + 1), 10);
        }
    }
    
    function processCommand(command) {
        commandHistory.unshift(command);
        historyIndex = -1;

        const response = commands[command] || `Command does not exist: ${command}. Type 'help' to see available commands.`;
        output.innerHTML += `\n${response}\n`;
    }
    
    function executeCommand() {
        const command = input.textContent.trim();
        output.innerHTML += `\n<span class="prompt">guest@dinhductai.io:~$</span> ${command}`;

        if (command === 'clear') {
            output.innerHTML = '';
        } else if (command) {
            processCommand(command);
        }

        input.textContent = '';
        output.scrollTop = output.scrollHeight;
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand();
        } else if (e.key === 'Backspace') {
            input.textContent = input.textContent.slice(0, -1);
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            input.textContent += e.key;
        } else if (e.key === 'ArrowUp') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.textContent = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
             if (historyIndex > 0) {
                historyIndex--;
                input.textContent = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                input.textContent = '';
            }
        }
    });

    typeWriter(welcomeMessage);
});
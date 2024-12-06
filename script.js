document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= (sectionTop + sectionHeight)) {
                current = section.getAttribute('id');
            }
        });

        // Special case for last section (Contact)
        const lastSection = sections[sections.length - 1];
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        // If we're near the bottom of the page, activate the Contact section
        if (windowHeight + scrollTop >= documentHeight - 100) {
            current = lastSection.getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }

            // Here you would typically send the form data to a backend service
            // For now, we'll just show a success message
            alert('Thank you for your message, ' + name + '! I will get back to you soon.');
            
            // Reset the form
            this.reset();
        });
    }

    // Add subtle animations to sections on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

    // Add animation to sections
    document.querySelectorAll('.about, .projects, .contact').forEach(section => {
        scrollObserver.observe(section);
    });

    // Terminal Animation
    const terminalCommands = [
        {
            command: 'cd projects',
            output: 'Navigating to projects directory...'
        },
        {
            command: 'ls',
            output: `📁 meogjachips-app\n📁 kivymd-setup\n📁 kokoronomoto\n📁 personal-website`
        },
        {
            command: 'cat about.txt',
            output: 'Hi! I\'m Ilmal Sabda Fathir, a passionate software developer from Indonesia.\nI love creating innovative solutions and learning new technologies.'
        },
        {
            command: 'python3 show_skills.py',
            output: '🚀 Python\n💻 JavaScript\n📱 Mobile Development\n🎨 UI/UX Design\n🔧 Problem Solving'
        },
        {
            command: 'git status',
            output: 'On branch master\nAll commits are up to date\nReady to collaborate!'
        }
    ];

    const commandElement = document.querySelector('.command');
    const outputElement = document.querySelector('.terminal-output');
    let currentCommandIndex = 0;

    async function typeCommand(text) {
        commandElement.classList.add('typing');
        for (let i = 0; i < text.length; i++) {
            commandElement.textContent = text.substring(0, i + 1);
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        commandElement.classList.remove('typing');
    }

    async function showOutput(text) {
        const output = document.createElement('div');
        output.textContent = text;
        outputElement.appendChild(output);
        await new Promise(resolve => setTimeout(resolve, 1000));
        outputElement.innerHTML = '';
    }

    async function runTerminalAnimation() {
        while (true) {
            const { command, output } = terminalCommands[currentCommandIndex];
            await typeCommand(command);
            await new Promise(resolve => setTimeout(resolve, 500));
            await showOutput(output);
            currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
            await new Promise(resolve => setTimeout(resolve, 1500));
            commandElement.textContent = '';
        }
    }

    runTerminalAnimation();
});

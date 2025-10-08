document.addEventListener('DOMContentLoaded', () => {

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    const html = document.documentElement;

    const themes = {
        light: {
            background: 'linear-gradient(135deg, #f9fafb, #e2e8f0)',
            color: '#1e293b',
            accent: '#3b82f6'
        },
        dark: {
            background: '#222222',
            color: '#f1f1f1',
            accent: '#ff9800'
        },
        solarized: {
            background: '#fdf6e3',
            color: '#657b83',
            accent: '#b58900'
        }
    };

    const applyTheme = (themeName) => {
        const theme = themes[themeName];
        document.body.style.background = theme.background;
        document.body.style.color = theme.color;
        document.body.style.setProperty('--accent', theme.accent);

        if (themeName === 'dark') {
            html.classList.add('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            html.classList.remove('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    };

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    const select = document.getElementById('theme-select');
    if (select) {
        select.addEventListener('change', function () {
            applyTheme(this.value);
        });
        applyTheme(select.value); // Apply default theme
    }

    // --- SCROLL PROGRESS ---
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (totalScroll / windowHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    });

    // --- SMOOTH SCROLLING & MOBILE MENU ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const handleLinkClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    };

    document.querySelectorAll('a.nav-link, a.mobile-nav-link, header a[href="#hero"]').forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });



});

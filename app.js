console.log('liar line 43.')
class ThemeSwitcher {

    constructor(body, h1) {
        this.body = body;
        this.h1 = h1
    }

    light() {
        this.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }

    dark() {
        this.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

const body = document.body;
const h1 = document.querySelector('h1');

const theme = localStorage.getItem('theme');

if (theme === 'dark') {
    body.classList.add('dark');
}

const lightThemeBtn = document.querySelector('#lightThemeBtn');
lightThemeBtn.addEventListener('click', () => {
    const lightMode = new ThemeSwitcher(body, h1);
    lightMode.light();
    h1.innerText = 'JOUR ☀️'
});

const darkThemeBtn = document.querySelector('#darkThemeBtn');
darkThemeBtn.addEventListener('click', () => {
    const darkMode = new ThemeSwitcher(body, h1);
    darkMode.dark();
    h1.innerText = 'NUIT 🌑'
});

console.log('i love js')
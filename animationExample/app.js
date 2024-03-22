const buttonForDarkMode = document.querySelector('.buttonForDarkmode')
let isDark = window.matchMedia('(prefers-color-scheme:dark)').matches // 기본이 dark => true
let windowTheme = document.querySelector('html').style;

function updateTheme() {
    windowTheme.backgroundColor = isDark ? 'black' : 'white';
}

buttonForDarkMode.addEventListener('click', () => {
    isDark = !isDark;
    updateTheme();
});

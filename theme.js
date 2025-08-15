document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme') || 'light-mode';
    document.body.setAttribute('data-theme', theme);
});
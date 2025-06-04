const hamburger = document.getElementById('ham');
const nav = document.getElementById('moNav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('close');
});
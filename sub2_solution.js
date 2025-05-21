// video 3개 슬라이드

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentIndex = 0;

document.querySelector('.arrow.left').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
});

document.querySelector('.arrow.right').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
});

function updateSlider() {
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
}
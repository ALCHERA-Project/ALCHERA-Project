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

// con3
// 모든 화살표에 클릭 이벤트 추가
  document.querySelectorAll('.arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
      const nextBox = arrow.nextElementSibling;
      if (nextBox && nextBox.classList.contains('txt-box')) {
        nextBox.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    });
  });

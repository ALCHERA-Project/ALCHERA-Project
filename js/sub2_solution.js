// con2
// video 3개 슬라이드
// const slider = document.querySelector('.slider');
// const slides = document.querySelectorAll('.slide');
// const totalSlides = slides.length;
// let currentIndex = 0;

// document.querySelector('.arrow.left').addEventListener('click', () => {
//     currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
//     updateSlider();
// });

// document.querySelector('.arrow.right').addEventListener('click', () => {
//     currentIndex = (currentIndex + 1) % totalSlides;
//     updateSlider();
// });

// function updateSlider() {
//     const offset = -currentIndex * 100;
//     slider.style.transform = `translateX(${offset}%)`;
// }

const slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.slide');

// clone 생성
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add('clone');
lastClone.classList.add('clone');

slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

slides = document.querySelectorAll('.slide');

let index = 1;
const slideWidth = 100;

slider.style.transform = `translateX(-${slideWidth * index}%)`;

document.querySelector('.arrow.right').addEventListener('click', () => {
  if (index >= slides.length - 1) return;
  index++;
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(-${slideWidth * index}%)`;
});

document.querySelector('.arrow.left').addEventListener('click', () => {
  if (index <= 0) return;
  index--;
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(-${slideWidth * index}%)`;
});

slider.addEventListener('transitionend', () => {
  if (slides[index].classList.contains('clone')) {
    slider.style.transition = 'none';

    if (index === slides.length - 1) {
      index = 1;
    }
    if (index === 0) {
      index = slides.length - 2;
    }

    slider.style.transform = `translateX(-${slideWidth * index}%)`;
  }
});




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

  
// 스크롤하면 투명도 1로 변경, 위로 떠오르는 이벤트
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const titleElements = gsap.utils.toArray('.con1-subTitle, .con1-title, .txt-box, .con2-subTitle, .con2-title, .con3-subTitle, .con3-title, .arrow, .con4-subTitle, .con4-title, .list');

  titleElements.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 50 });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
        markers: false
      }
    });
  });
});
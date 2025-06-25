// 부드러운 스크롤 전체 적용
const lenis = new Lenis({
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// loading
  window.addEventListener('load', () => {
    gsap.to("#loading-overlay", {
      y: "-100%",
      duration: 1.3,
      ease: "power2.inOut"
    });
  });


// intro - about 스크롤 
gsap.registerPlugin(ScrollTrigger);

// 텍스트 서서히 사라지기
gsap.to(".intro-title", {
  opacity: 0,
  // scale: 1.2,
  scrollTrigger: {
    trigger: ".intro",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// 배경 비디오 어둡게 만들고 싶다면 추가
gsap.to(".intro video", {
  filter: "brightness(0)",
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",  // about이 보이기 시작할 때
    end: "top top",    // 화면의 중간까지 왔을 때
    scrub: true
  }
});

// 🔹 1. intro 섹션을 pin (고정)
ScrollTrigger.create({
  trigger: ".intro",
  start: "top top",
  end: "bottom top", // intro의 끝이 뷰포트 상단에 닿을 때 고정 해제
  pin: true,
  pinSpacing: false // 고정된 동안 아래 콘텐츠 밀리지 않게
});



// about-video
  gsap.registerPlugin(ScrollTrigger);

  // 🎥 영상 패럴럭스 (선택사항)
  gsap.to(".about-video video", {
    y: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".about-video",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  // ✨ 텍스트 stagger 등장 + 사라짐
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-video",
      start: "top 40%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
      // markers: true // 디버깅 원할 때 켜기
    }
  });

  tl.from(".about-video ul li h4, .about-video ul li p", {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.7,
    ease: "power2.out"
  });


// 2-solution 모바일 메뉴
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.img-slide');
  if (!slider) return;

  let isDragging = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add('dragging');
  });

  slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add('dragging');
  }, { passive: true });

  slider.addEventListener('touchend', () => {
    isDragging = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  }, { passive: true });
});


// 2-solution PC 메뉴
document.addEventListener('DOMContentLoaded', () => {
  const listItems = document.querySelectorAll('.img-menu-wrapper li');
  listItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      listItems.forEach(li => li.classList.remove('active'));
      item.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('active');
    });
  });
});




// press slide
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.press-slide');
  if (!slider) return;

  let isDragging = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add('dragging');
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      slider.classList.remove('dragging');
    }
  });

  slider.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      slider.classList.remove('dragging');
    }
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;  // 현재 위치에서 시작 위치 차이 계산
    slider.scrollLeft = scrollLeft - walk;  // 시작 스크롤 위치에서 차이만큼 이동
  });
});


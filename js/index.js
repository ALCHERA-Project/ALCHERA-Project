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
  // GSAP 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // PC 버전에서만 실행
  if (window.innerWidth > 390) {
    // 텍스트 서서히 사라지기
    gsap.to(".intro-title", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".intro",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 배경 비디오 어두워지기
    gsap.to(".intro video", {
      filter: "brightness(0)",
      scrollTrigger: {
        trigger: ".about",
        start: "top 70%",
        end: "top top",
        scrub: true
      }
    });
  }

// 🔹 1. intro 섹션을 pin (고정)
// ScrollTrigger.create({
//   trigger: ".intro",
//   // trigger: ".pin-spacer",
//   start: "top top",
//   end: "bottom top", // intro의 끝이 뷰포트 상단에 닿을 때 고정 해제
//   pin: true,
//   pinSpacing: false // 고정된 동안 아래 콘텐츠 밀리지 않게
// });

ScrollTrigger.matchMedia({
  "(min-width: 1200px)": function () {
    ScrollTrigger.create({
      trigger: ".intro",
      start: "top top",
      end: "bottom top", // intro의 끝이 뷰포트 상단에 닿을 때 고정 해제
      pin: true,
      pinSpacing: false // 고정된 동안 아래 콘텐츠 밀리지 않게
    });
  }
});

ScrollTrigger.matchMedia({
  "(min-width: 1280px)": function () {
    gsap.fromTo(".about .about-txt img",
      { "--logo-reveal": "100%" },
      {
        "--logo-reveal": "0%",
        ease: "none",
        scrollTrigger: {
          trigger: ".about .about-txt img",
          start: "top 85%",
          end: "center 35%",
          scrub: 1.2
        }
      }
    );
  }
});



// about-video
gsap.registerPlugin(ScrollTrigger);

  // 비디오 천천히 위로 이동 (패럴럭스 느낌) — 모바일만
  ScrollTrigger.matchMedia({
    "(max-width: 1279px)": function () {
      gsap.to(".about-video video", {
        y: -500,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-video",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  });

  // 텍스트 리스트 등장 애니메이션
// 1. 텍스트를 글자 단위로 쪼개서 <span>으로 감싸기
function splitTextToSpans(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    const text = el.textContent;
    el.innerHTML = "";

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.opacity = 0;
      el.appendChild(span);
    });
  });
}

// 적용: h4, p에 한글자씩 span 씌우기
splitTextToSpans(".about-video ul li h4");
splitTextToSpans(".about-video ul li p");

// 2. 각 li 단위로 글자 애니메이션 적용
document.querySelectorAll(".about-video ul li").forEach((li) => {
  const spans = li.querySelectorAll("span");

  gsap.to(spans, {
    opacity: 1,
    stagger: 0.03, // 작을수록 빠르게
    ease: "none",  // 자연스럽게 등장만 (움직임 없음)
    scrollTrigger: {
      trigger: li,
      start: "top 80%",
      end: "top 60%",
      scrub: true
    }
  });
});


// 2-solution 모바일 메뉴
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.img-menu-wrapper');
  if (!slider) return;

  const canScroll = window.matchMedia('(max-width: 1279px)');
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let frame = 0;

  const stopGlide = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  const glide = () => {
    if (Math.abs(velocity) < 0.4) {
      frame = 0;
      return;
    }
    slider.scrollLeft -= velocity;
    velocity *= 0.94;
    frame = requestAnimationFrame(glide);
  };

  slider.addEventListener('mousedown', e => {
    if (!canScroll.matches) return;
    stopGlide();
    isDragging = true;
    startX = e.pageX;
    lastX = e.pageX;
    lastTime = performance.now();
    scrollLeft = slider.scrollLeft;
    velocity = 0;
    slider.classList.add('dragging');
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    slider.classList.remove('dragging');
    frame = requestAnimationFrame(glide);
  };

  slider.addEventListener('mouseleave', endDrag);
  slider.addEventListener('mouseup', endDrag);

  slider.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const now = performance.now();
    const dt = now - lastTime || 16;
    velocity = (e.pageX - lastX) / dt * 16;
    lastX = e.pageX;
    lastTime = now;
    slider.scrollLeft = scrollLeft - (e.pageX - startX);
  });
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
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.press-slide');
  if (!slider) return;

  let isDragging = false;
  let startX;
  let scrollLeft;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let frame = 0;

  const SCROLL_SPEED = 1.5; // ← 드래그 가속도 조절

  const stopGlide = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  const glide = () => {
    if (Math.abs(velocity) < 0.4) {
      frame = 0;
      return;
    }
    slider.scrollLeft -= velocity;
    velocity *= 0.94;
    frame = requestAnimationFrame(glide);
  };

  const onMouseMove = e => {
    if (!isDragging) return;
    e.preventDefault();
    const now = performance.now();
    const dt = now - lastTime || 16;
    velocity = (e.pageX - lastX) / dt * 16 * SCROLL_SPEED;
    lastX = e.pageX;
    lastTime = now;
    slider.scrollLeft = scrollLeft - (e.pageX - startX) * SCROLL_SPEED;
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    slider.classList.remove('dragging');
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', endDrag);
    frame = requestAnimationFrame(glide);
  };

  slider.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    e.preventDefault();
    stopGlide();
    isDragging = true;
    startX = e.pageX;
    lastX = e.pageX;
    lastTime = performance.now();
    scrollLeft = slider.scrollLeft;
    velocity = 0;
    slider.classList.add('dragging');
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', endDrag);
  });

  // 터치 이벤트
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
    const walk = (x - startX) * SCROLL_SPEED; // ← 여기도 동일하게
    slider.scrollLeft = scrollLeft - walk;
  }, { passive: true });
});


// tech slide 스크롤 이벤트
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  // ✅ PC 환경에서만 작동 (1280px 이상)
  ScrollTrigger.matchMedia({
    "(min-width: 1280px)": function () {
      const techAi = document.querySelector('.tech_ai');
      const techScroll = document.querySelector('.tech-scroll');

      if (techAi && techScroll) {
        // 너비 줄이기
        gsap.to(techAi, {
          width: "50%",
          scrollTrigger: {
            trigger: techAi,
            start: "top top",
            end: "+=400",
            scrub: true
          }
        });

        // 오른쪽 콘텐츠 등장
        gsap.to(techScroll, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: techScroll,
            start: "top bottom",
            end: "top center",
            scrub: true
          }
        });
      }
    }
  });
});


// photoDump
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".solution",
    start: "top top",
    endTrigger: ".img-slide",
    end: "top 100%", 
    pin: ".photoDump-title",
    pinSpacing: true,
    scrub: true
  });

  const photoScroll = () => ({
    trigger: ".solution",
    start: "top top",
    endTrigger: ".img-slide",
    end: "top 80%",
    scrub: true,
    invalidateOnRefresh: true
  });

  const travel = () => document.querySelector(".photoDump-wrapper").offsetHeight * 0.5;

  const risePhotos = (speeds) => {
    document.querySelectorAll(".photoDump li").forEach((item, index) => {
      gsap.to(item, {
        y: () => -travel() * speeds[index],
        ease: "none",
        scrollTrigger: photoScroll()
      });
    });
  };

  ScrollTrigger.matchMedia({
    "(max-width: 1279px)": function () {
      risePhotos([0.55, 1.65, 1, 1.45, 0.95, 0.85]);
    },
    "(min-width: 1280px)": function () {
      risePhotos([0.55, 1.65, 1, 1.45, 0.95, 1.5]);
    }
  });
});


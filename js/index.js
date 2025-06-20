
// about-video 영역 text 이벤트
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const listItems = gsap.utils.toArray('.about-video ul li');
  if (!listItems.length) return;

  gsap.set(listItems, { opacity: 0, y: 20 });

  listItems.forEach((li) => {
    gsap.to(li, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: li,
        start: "top 50%",   // li가 화면 아래 90%에 닿을 때 시작
        toggleActions: "play none none reverse",
        markers: false,
      }
    });
  });
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
document.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector('.img-menu-wrapper');
  if (!ul) {
    console.error('ul.img-menu-wrapper가 존재하지 않습니다.');
    return;
  }

  const lis = ul.querySelectorAll('li');
  const totalItems = lis.length;

  function onMouseEnter(e) {
    if (window.innerWidth < 1280) return; // 1280px 미만일 땐 작동 안 함
    const li = e.currentTarget;
    lis.forEach((item) => {
      if (item === li) {
        item.style.flex = '1.8';
      } else {
        item.style.flex = (4 / (totalItems - 1)).toString();
      }
    });
  }

  function onMouseLeave() {
    lis.forEach((item) => {
      item.style.flex = '1';
    });
  }

  lis.forEach((li) => {
    li.addEventListener('mouseenter', onMouseEnter);
    li.addEventListener('mouseleave', onMouseLeave);
  });

  window.addEventListener('resize', () => {
    // 윈도우가 작아지면 flex 초기화
    if (window.innerWidth < 1280) {
      lis.forEach(li => li.style.flex = '1');
    }
  });
});


// press slide
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.press-slide');
  if (!slider) return;

  let isDragging = false;
  let startX;
  let scrollLeft;

  const SCROLL_SPEED = 1.5; // ← 드래그 가속도 조절

  // 마우스 이벤트
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
    if (e.buttons === 0) {
      isDragging = false;
      slider.classList.remove('dragging');
      return;
    }
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * SCROLL_SPEED; // ← 여기 적용
    slider.scrollLeft = scrollLeft - walk;
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
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  const title = document.querySelector('.photoDump-title');

  // 타이틀 고정/해제 제어
  ScrollTrigger.create({
    trigger: '.photoDump',
    start: 'top 50%',
    endTrigger: '.photoDump-wrapper',
    end: 'bottom bottom',
    onEnter: () => {
      title.classList.add('fixed');
      title.classList.remove('released');
    },
    onLeave: () => {
      title.classList.remove('fixed');
      title.classList.add('released');
    },
    onEnterBack: () => {
      title.classList.add('fixed');
      title.classList.remove('released');
    },
    onLeaveBack: () => {
      title.classList.remove('fixed');
      title.classList.remove('released');
    }
  });

  // 이미지 등장 (스크롤 따라 올라오는 느낌)
  gsap.utils.toArray('.photoDump-img').forEach((img) => {
    gsap.fromTo(img,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: img,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true
        }
      }
    );
  });
});

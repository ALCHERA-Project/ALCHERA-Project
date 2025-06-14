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


// 스크롤하면 투명도 1로 변경, 위로 떠오르는 이벤트
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const titleElements = gsap.utils.toArray('.contents-title, .con1 .txt-box, .con2 img, .con2 .txt-wrapper, .con3 ul li, .con4 ul li');

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

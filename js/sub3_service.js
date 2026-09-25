// 스크롤하면 투명도 1로 변경, 위로 떠오르는 이벤트
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const titleElements = gsap.utils.toArray(
    ".con1 .list1-subTitle, .con1 .list1-title, .con1 .list1 > p, .con1 .txt-box, .con1 .list2-title, .con1 .list2 > p, .con1 .img-box1, .con1 .img-box2, .con1 .img-box3, .con1 .img-box4, .con2 .con2-title, .con2 > p, .con3 .list1-subTitle, .con3 .list1-title, .con3 .list1 > p, .con3 .img-box1, .con3 .img-box2, .con3 .img-box3, .con3 .img-box4, .con3 .list2-title, .con3 .video-wrapper, .con4 .con4-subTitle, .con4 .con4-title, .con4 > p, .con4 .txt-box, .con4 .arrow, .con5 .con5-subTitle, .con5 .con5-title, .con5 .readmore-btn, .con5 .list"
  );

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

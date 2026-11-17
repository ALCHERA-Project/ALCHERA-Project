// 스크롤하면 투명도 1로 변경, 위로 떠오르는 이벤트
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const titleElements = gsap.utils.toArray(
    ".con1 .con1-subTitle, .con1 .con1-title, .con1 .img-box, .con2 .list1-subTitle, .con2 .list1-title, .con2 .list1 img, .con2 .list2-title, .con2 .list2 > p, .con2 .list2-wrapper img, .con2 .list2 .txt-wrapper, .con2 .list3-title, .con2 .list3 > p, .con2 .list3-wrapper img, .con2 .list3 .txt-wrapper, .con3 .con3-subTitle, .con3 .con3-title, .con3 .img-box, .con4 .con4-title, .con4 .solution-info li"
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

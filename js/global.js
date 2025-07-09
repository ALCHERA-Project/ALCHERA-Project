// go to top scroll
document.addEventListener("DOMContentLoaded", function () {
    const goToTopBtn = document.getElementById("goToTopBtn");

    goToTopBtn.addEventListener("click", function (e) {
      e.preventDefault(); // a 태그 기본 동작 막기
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

  
document.addEventListener("DOMContentLoaded", function () {
  // 햄버거 메뉴 토글 (모바일용)
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const slideMenu = document.getElementById('slide-menu');

  hamburgerMenu.addEventListener('click', function () {
    slideMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  });

  // 데스크탑 서브메뉴 slide
  const menuItems = document.querySelectorAll(".main-menu > li");
  menuItems.forEach((item) => {
    const submenu = item.querySelector(".sub-menu");
    if (!submenu) return;

    // 초기 상태
    submenu.style.maxHeight = "0";
    submenu.style.overflow = "hidden";
    submenu.style.transition = "max-height 0.8s ease";

    // 마우스 오버 시 서브메뉴 펼치기
    item.addEventListener("mouseenter", () => {
      submenu.style.maxHeight = submenu.scrollHeight + "px";
    });

    // 마우스 아웃 시 서브메뉴 닫기
    item.addEventListener("mouseleave", () => {
      submenu.style.maxHeight = "0";
    });
  });

  // 모바일 메뉴 toggle
  const hamburger = document.getElementById('ham');
  const moNav = document.getElementById('moNav');

  hamburger.addEventListener('click', () => {
    moNav.classList.toggle('active');
    hamburger.classList.toggle('close');
  });

  // 스크롤 시 헤더 숨김/표시
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // 아래로 스크롤하면 숨김
      header.classList.add("hide");
    } else {
      // 위로 스크롤하면 보임
      header.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
  });
});





// footer family-site
document.addEventListener('DOMContentLoaded', function () {
  const familySite = document.querySelector('.family-site');
  const activeItem = familySite.querySelector('.active');

  activeItem.addEventListener('click', function () {
    familySite.classList.toggle('open');
  });
});

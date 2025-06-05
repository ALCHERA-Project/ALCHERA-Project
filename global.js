/* header 햄버거 메뉴 */
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const menu = document.getElementById('slide-menu');

  hamburgerMenu.addEventListener('click', function () {
    menu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  });
});

// menu scroll
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".main-menu > li");
  menuItems.forEach((item) => {
    const submenu = item.querySelector(".sub-menu");
    if (!submenu) return;
    // 초기 상태 설정
    submenu.style.maxHeight = "0";
    submenu.style.overflow = "hidden";
    submenu.style.transition = "max-height 0.8s ease";
    // 마우스 진입
    item.addEventListener("mouseenter", () => {
      submenu.style.maxHeight = submenu.scrollHeight + "px";
    });
    // 마우스 떠남
    item.addEventListener("mouseleave", () => {
      submenu.style.maxHeight = "0";
    });
  });
});

// menu mobile
const hamburger = document.getElementById('ham');
const nav = document.getElementById('moNav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('close');
});
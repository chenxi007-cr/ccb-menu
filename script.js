document.addEventListener('DOMContentLoaded', function () {
  // 设置当前页面导航状态
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active', 'clicked');
    }

    // 点击导航链接效果
    link.addEventListener('click', function (e) {
      if (this.classList.contains('active')) {
        e.preventDefault(); // 阻止跳转当前页面
        return;
      }

      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('clicked'));
      this.classList.add('clicked');
    });
  });

  // 初始化 Swiper
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
  });
});

function switchLang(lang) {
  const contents = document.querySelectorAll('.lang-content');
  const buttons = document.querySelectorAll('.lang-toggle button');
  
  contents.forEach(p => {
    p.style.display = p.getAttribute('data-lang') === lang ? 'block' : 'none';
  });

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(lang));
  });
}